'use server'

import { stripe } from '@/lib/stripe'
import { PRODUCTS } from '@/lib/products'
import { prisma } from '@/lib/prisma'

export async function startCheckoutSession(productId, email) {
  const product = PRODUCTS.find((p) => p.id === productId)
  if (!product) {
    throw new Error(`Product with id "${productId}" not found`)
  }

  // Create Checkout Sessions from body params
  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    redirect_on_completion: 'never',
    customer_email: email,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            description: product.description,
          },
          unit_amount: product.priceInCents,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
  })

  // Create order in database with pending status
  const order = await prisma.order.create({
    data: {
      stripeSessionId: session.id,
      email,
      amount: product.priceInCents,
      status: 'pending',
      items: {
        create: [
          {
            productId,
            quantity: 1,
            price: product.priceInCents,
          },
        ],
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
