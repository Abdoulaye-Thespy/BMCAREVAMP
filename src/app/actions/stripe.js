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
            // Add sizes to Stripe metadata for reference
            sizes: item.tshirtSizes ? item.tshirtSizes.join(', ') : 'No sizes selected',
            item_id: item.id,
          },
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
      // Add custom metadata to the line item itself
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
        // Store all cart items summary in metadata as backup
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
        customerInfo: customerInfo, // Store all customer data as JSON
        items: {
          create: cartItems.map((item) => ({
            productId: item.id,
            productName: item.name,
            productCategory: item.category,
            quantity: item.quantity,
            price: Math.round(item.price * 100),
            // Store t-shirt sizes as JSON array
            tshirtSizes: item.tshirtSizes || [], // This will be stored as JSON in database
          })),
        },
      },
      include: {
        items: true,
      },
    })

    console.log('Order created:', order.id)
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

    console.log("this is session ID", session)
    
    // Update order status based on payment status
    if (session.payment_status === 'paid') {
      const order = await prisma.order.findUnique({
        where: { stripeSessionId: sessionId },
        include: { items: true },
      })

      if (order && order.status !== 'completed') {
        await prisma.order.update({
          where: { id: order.id },
          data: {
            status: 'completed',
            stripePaymentId: session.payment_intent,
          },
        })
        
        console.log('Order completed:', order.id)
        
        // Here you could trigger confirmation emails, inventory updates, etc.
        // await sendOrderConfirmation(order.id)
      }
    }

    return {
      status: session.payment_status,
      session: session,
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
    
    // Format the response to make t-shirt sizes easily accessible
    if (order) {
      return {
        ...order,
        items: order.items.map(item => ({
          ...item,
          // Ensure tshirtSizes is always an array
          tshirtSizes: item.tshirtSizes || [],
        })),
      }
    }
    
    return order
  } catch (error) {
    console.error('Error getting order details:', error)
    throw error
  }
}

// Optional: Helper function to get all orders with specific size requirements
export async function getOrdersBySize(size) {
  try {
    // Note: This query depends on your database's JSON capabilities
    // For PostgreSQL, you might use something like:
    const orders = await prisma.order.findMany({
      where: {
        items: {
          some: {
            // This is a simplified example - actual JSON query syntax may vary
            tshirtSizes: {
              path: '$',
              array_contains: size,
            },
          },
        },
      },
      include: {
        items: true,
      },
    })
    
    return orders
  } catch (error) {
    console.error('Error getting orders by size:', error)
    throw error
  }
}