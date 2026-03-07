'use server'

import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export async function startCheckoutSession(cartItems, customerInfo) {
  if (!cartItems || cartItems.length === 0) {
    throw new Error('Cart is empty')
  }

  if (!customerInfo || !customerInfo.email) {
    throw new Error('Customer information is required')
  }

  console.log('Starting checkout with:', { cartItems, customerInfo })

  try {
    // Build line items from cart with size information in metadata
    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          description: item.category || 'Product',
          metadata: {
            sizes: item.tshirtSizes ? item.tshirtSizes.join(', ') : 'No sizes selected',
            item_id: item.id,
          },
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
      metadata: {
        tshirt_sizes: item.tshirtSizes ? JSON.stringify(item.tshirtSizes) : '[]',
      },
    }))

    // Calculate total amount
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + Math.round(item.price * 100) * item.quantity,
      0
    )

    // Create Checkout Sessions from body params
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      redirect_on_completion: 'never',
      customer_email: customerInfo.email,
      line_items: lineItems,
      mode: 'payment',
      metadata: {
        customer_name: `${customerInfo.firstName} ${customerInfo.lastName}`,
        customer_chapter: customerInfo.chapter,
        customer_phone: customerInfo.phone,
        customer_address: `${customerInfo.address}, ${customerInfo.city}, ${customerInfo.state} ${customerInfo.zipCode}`,
        cart_summary: JSON.stringify(cartItems.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          sizes: item.tshirtSizes || []
        }))),
      },
    })

    console.log('Stripe session created:', session.id)

    // Create order with customer information and t-shirt sizes
    const order = await prisma.order.create({
      data: {
        stripeSessionId: session.id,
        email: customerInfo.email,
        amount: totalAmount,
        status: 'pending',
        customerInfo: customerInfo,
        items: {
          create: cartItems.map((item) => ({
            productId: item.id,
            productName: item.name,
            productCategory: item.category,
            quantity: item.quantity,
            price: Math.round(item.price * 100),
            tshirtSizes: item.tshirtSizes || [],
          })),
        },
      },
      include: {
        items: true,
      },
    })

    console.log('Order created with PENDING status:', order.id)
    console.log('Order items with sizes:', order.items)

    return {
      clientSecret: session.client_secret,
      orderId: order.id,
    }
  } catch (error) {
    console.error('Error in startCheckoutSession:', error)
    throw error
  }
}

export async function getCheckoutSessionStatus(sessionId) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    
    console.log("Stripe session retrieved:", session.id)
    console.log("Payment status:", session.payment_status)
    
    // Find the order
    const order = await prisma.order.findUnique({
      where: { stripeSessionId: sessionId },
      include: { items: true },
    })

    if (!order) {
      console.log('No order found for session:', sessionId)
      return {
        status: session.payment_status,
        session: session,
        order: null,
      }
    }

    // If payment is successful and order is still pending, update it
    if (session.payment_status === 'paid' && order.status === 'pending') {
      const updatedOrder = await prisma.order.update({
        where: { id: order.id },
        data: {
          status: 'completed',
          stripePaymentId: session.payment_intent,
        },
        include: { items: true },
      })
      
      console.log(`✅ Order ${order.id} updated to COMPLETED!`)
      
      return {
        status: 'paid',
        session: session,
        order: updatedOrder,
      }
    }

    // Return the order as is
    return {
      status: order.status === 'completed' ? 'paid' : session.payment_status,
      session: session,
      order: order,
    }
  } catch (error) {
    console.error('Error getting session status:', error)
    throw error
  }
}

export async function getOrderDetails(orderId) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: true,
      },
    })
    
    if (order) {
      return {
        ...order,
        items: order.items.map(item => ({
          ...item,
          tshirtSizes: item.tshirtSizes || [],
        })),
      }
    }
    
    return null
  } catch (error) {
    console.error('Error getting order details:', error)
    throw error
  }
}

// Simple function to manually update order status (if needed)
export async function updateOrderStatus(orderId, status) {
  try {
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status },
      include: { items: true },
    })
    console.log(`✅ Order ${orderId} manually updated to ${status}`)
    return updatedOrder
  } catch (error) {
    console.error('Error updating order:', error)
    throw error
  }
}