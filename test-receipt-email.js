import { sendReceiptEmail } from "@/lib/resend"

// Add this temporarily in any component for testing

const TestEmailButton = () => {
  const [sending, setSending] = useState(false)
  const [result, setResult] = useState(null)

  const handleTestEmail = async () => {
    setSending(true)
    setResult(null)
    
    try {
      const testData = {
        to: 'njigouhrazak@iut-dhaka.edu',
        subject: 'Test Email from BMCA',
        orderId: 'test_order_123',
        customerInfo: {
          firstName: 'Test',
          lastName: 'User',
          email: 'your-email@gmail.com',
          address: '123 Test St',
          city: 'Test City',
          state: 'TS',
          zipCode: '12345',
          country: 'USA',
          phone: '555-123-4567',
          chapter: 'Test Chapter'
        },
        order: {
          id: 'test_order_123',
          status: 'confirmed',
          amount: 5000,
          items: [
            {
              productName: 'Test Product',
              quantity: 1,
              price: 5000,
              tshirtSizes: []
            }
          ]
        }
      }

      const result = await sendReceiptEmail(testData)
      setResult(result)
      
      if (result.success) {
        alert('✅ Test email sent! Check your inbox.')
      } else {
        alert('❌ Failed: ' + result.error)
      }
    } catch (error) {
      alert('❌ Error: ' + error.message)
    } finally {
      setSending(false)
    }
  }

  return (
    <button
      onClick={handleTestEmail}
      disabled={sending}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      {sending ? 'Sending...' : ' Send Test Email'}
    </button>
  )
}