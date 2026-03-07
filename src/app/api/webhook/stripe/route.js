import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  let event

  try {
    // Verify webhook signature
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error(`❌ Webhook signature verification failed:`, err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  console.log(`✅ Webhook received: ${event.type}`)

  try {
    // Handle checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      
      console.log('💰 Checkout session completed:', session.id)
      console.log('Payment status:', session.payment_status)
      console.log('Customer email:', session.customer_email)

      // Find the order in our database
      const order = await prisma.order.findUnique({
        where: { stripeSessionId: session.id }
      })

      if (!order) {
        console.error(`❌ Order not found for session: ${session.id}`)
        return NextResponse.json({ error: 'Order not found' }, { status: 404 })
      }

      console.log(`📦 Found order: ${order.id} with status: ${order.status}`)

      // Update order status to Paid
      if (order.status !== 'Paid') {
        const updatedOrder = await prisma.order.update({
          where: { id: order.id },
          data: {
            status: 'Paid',
            stripePaymentId: session.payment_intent,
          },
        })

        console.log(`✅✅✅ Order ${order.id} UPDATED TO Paid via webhook!`)
        console.log(`New status: ${updatedOrder.status}`)
        console.log(`Payment ID: ${updatedOrder.stripePaymentId}`)

        // TODO: Send confirmation email here
        // await sendOrderConfirmationEmail(updatedOrder, session)
      } else {
        console.log(`Order ${order.id} already completed`)
      }
    }

    // Handle payment failed
    if (event.type === 'checkout.session.async_payment_failed') {
      const session = event.data.object
      
      const order = await prisma.order.findUnique({
        where: { stripeSessionId: session.id }
      })

      if (order) {
        await prisma.order.update({
          where: { id: order.id },
          data: { status: 'failed' },
        })
        console.log(`❌ Order ${order.id} marked as FAILED`)
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}