'use server'

import { stripe } from '@/lib/stripe'
import { PRODUCTS } from '@/lib/products'
import { prisma } from '@/lib/prisma'

export async function startCheckoutSession(cartItems, email) {
  if (!cartItems || cartItems.length === 0) {
    throw new Error('Cart is empty')
  }

  // Build line items from cart
  const lineItems = cartItems.map((item) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
        description: item.category || 'Product',
      },
      unit_amount: Math.round(item.price * 100), // Convert to cents
    },
    quantity: item.quantity,
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
    customer_email: email,
    line_items: lineItems,
    mode: 'payment',
  })

  // Create order in database with pending status
  const order = await prisma.order.create({
    data: {
      stripeSessionId: session.id,
      email,
      amount: totalAmount,
      status: 'pending',
      items: {
        create: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: Math.round(item.price * 100),
        })),
      },
    },
    include: {
      items: true,
    },
  })

  return {
    clientSecret: session.client_secret,
    orderId: order.id,
  }
}

export async function getCheckoutSessionStatus(sessionId) {
  const session = await stripe.checkout.sessions.retrieve(sessionId)
  
  // Update order status based on payment status
  if (session.payment_status === 'paid') {
    const order = await prisma.order.findUnique({
      where: { stripeSessionId: sessionId },
    })

    if (order && order.status !== 'completed') {
      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: 'completed',
          stripePaymentId: session.payment_intent,
        },
      })
    }
  }

  return {
    status: session.payment_status,
    session: session,
  }
}

export async function getOrderDetails(orderId) {
  return prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: true,
    },
  })
}
