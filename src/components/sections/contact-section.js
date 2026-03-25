"use client"

import { useState, useRef } from "react"
import { Mail, MapPin, Plus, CheckCircle, XCircle, Sparkles, RefreshCw, Shield } from "lucide-react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    phoneCode: "US +1",
    honeypot: "", // Honeypot field for bots
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({
    type: null,
    message: ""
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const formRef = useRef(null)
  const [captchaToken, setCaptchaToken] = useState("")
  const [captchaError, setCaptchaError] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePhoneCodeChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      phoneCode: e.target.value,
    }))
  }

  // Simple math CAPTCHA
  const [captchaQuestion, setCaptchaQuestion] = useState({ num1: 0, num2: 0, answer: 0 })
  const [captchaInput, setCaptchaInput] = useState("")

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1
    const num2 = Math.floor(Math.random() * 10) + 1
    setCaptchaQuestion({
      num1,
      num2,
      answer: num1 + num2
    })
    setCaptchaInput("")
    setCaptchaError(false)
  }

  // Initialize captcha on component mount
  useState(() => {
    generateCaptcha()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Honeypot check - if this field has value, it's a bot
    if (formData.honeypot) {
      console.log("Bot detected - form rejected")
      setSubmitStatus({
        type: "error",
        message: "Invalid submission detected.",
      })
      setTimeout(() => {
        setSubmitStatus({ type: null, message: "" })
      }, 3000)
      return
    }

    // CAPTCHA validation
    const userAnswer = parseInt(captchaInput)
    if (isNaN(userAnswer) || userAnswer !== captchaQuestion.answer) {
      setCaptchaError(true)
      generateCaptcha()
      setSubmitStatus({
        type: "error",
        message: "Incorrect CAPTCHA answer. Please try again.",
      })
      setTimeout(() => {
        setSubmitStatus({ type: null, message: "" })
      }, 3000)
      return
    }

    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: `${formData.phoneCode} ${formData.phone}`,
          message: formData.message,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setFormSubmitted(true)
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
          phoneCode: "US +1",
          honeypot: "",
        })
        generateCaptcha() // Generate new CAPTCHA for next submission
      } else {
        throw new Error(data.error || "Something went wrong")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus({
        type: "error",
        message: "Failed to send message. Please try again later or contact us directly at info@bafutfoundation.org",
      })
      setTimeout(() => {
        setSubmitStatus({ type: null, message: "" })
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNewMessage = () => {
    setFormSubmitted(false)
    setSubmitStatus({ type: null, message: "" })
    generateCaptcha()
  }

  // Success Message Component
  if (formSubmitted) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center text-center py-16">
            <div className="bg-green-100 rounded-full p-4 mb-6">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Message Sent Successfully! 🎉</h2>
            <p className="text-lg text-gray-600 mb-6 max-w-md">
              Thank you for reaching out to BMCA. We've received your message and will get back to you within 2-3 business days.
            </p>
            <div className="bg-orange-50 rounded-lg p-6 mb-8 max-w-md">
              <h3 className="font-semibold text-gray-900 mb-2">What happens next?</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>A confirmation email has been sent to your inbox</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Our team will review your message</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>You'll receive a response within 2-3 business days</span>
                </li>
              </ul>
            </div>
            <button
              onClick={handleNewMessage}
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition"
            >
              <RefreshCw className="w-4 h-4" />
              Send Another Message
            </button>
          </div>
        </div>

        {/* Info Cards Section - Still visible after submission */}
        <div className="bg-orange-50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Donations Card */}
              <div className="text-center">
                <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Donations</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Want to make a special donation towards any specific program? Let us know.
                </p>
                <a href="mailto:info@bafutfoundation.org" className="text-orange-500 font-medium text-sm">
                  info@bafutfoundation.org
                </a>
              </div>

              {/* Partnerships Card */}
              <div className="text-center">
                <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Partnerships</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Want to become a partner for our development projects? Let us know.
                </p>
                <a href="mailto:info@bafutfoundation.org" className="text-orange-500 font-medium text-sm">
                  info@bafutfoundation.org
                </a>
              </div>

              {/* Press Card */}
              <div className="text-center">
                <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Plus className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Press</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Writing an article or blog post want BMCA featured in the process? Let us know.
                </p>
                <a href="mailto:info@bafutfoundation.org" className="text-orange-500 font-medium text-sm">
                  info@bafutfoundation.org
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      {/* Main Contact Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Info */}
          <div>
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Contact us</h1>
            <p className="text-gray-600 mb-8">
              Submit a question or comment below and we will get back with you shortly!
            </p>

            {/* Success/Error Message */}
            {submitStatus.type && (
              <div
                className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
                  submitStatus.type === "success"
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                {submitStatus.type === "success" ? (
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                )}
                <p
                  className={`text-sm ${
                    submitStatus.type === "success" ? "text-green-800" : "text-red-800"
                  }`}
                >
                  {submitStatus.message}
                </p>
              </div>
            )}

            {/* Email Section */}
            <div className="mb-10">
              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-3 rounded-lg mt-1">
                  <Mail className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                  <p className="text-gray-600 text-sm mb-2">Our friendly team is here to help.</p>
                  <a href="mailto:info@bafutfoundation.org" className="text-orange-500 font-medium">
                    info@bafutfoundation.org
                  </a>
                </div>
              </div>
            </div>

            {/* Location Section */}
            <div>
              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-3 rounded-lg mt-1">
                  <MapPin className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
                  <p className="text-gray-700 font-medium">BAFUT MANJONG CULTURAL ASSOCIATION</p>
                  <p className="text-gray-700 font-medium">9115 BRIARCHIP ST</p>
                  <p className="text-gray-700 font-medium">LAUREL, MD 20708</p>
                  <p className="text-orange-500 font-medium mt-2">United States</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6" ref={formRef}>
              {/* Honeypot field - hidden from real users, bots will fill it */}
              <div className="hidden">
                <label htmlFor="honeypot">Leave this field empty</label>
                <input
                  type="text"
                  name="honeypot"
                  id="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="First name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder="Last name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="info@bafutfoundation.org"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone number</label>
                <div className="flex gap-2">
                  <select
                    name="phoneCode"
                    value={formData.phoneCode}
                    onChange={handlePhoneCodeChange}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option>US +1</option>
                    <option>CM +237</option>
                    <option>FR +33</option>
                    <option>GB +44</option>
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 000-0000"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell us more about your inquiry..."
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                ></textarea>
              </div>

              {/* CAPTCHA Section */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-5 h-5 text-orange-500" />
                  <span className="text-sm font-medium text-gray-700">Please verify you're human</span>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="bg-white px-4 py-2 rounded-lg border border-gray-300">
                    <span className="text-lg font-semibold">
                      {captchaQuestion.num1} + {captchaQuestion.num2} = ?
                    </span>
                  </div>
                  <input
                    type="text"
                    value={captchaInput}
                    onChange={(e) => {
                      setCaptchaInput(e.target.value)
                      setCaptchaError(false)
                    }}
                    placeholder="Enter answer"
                    className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 w-24 ${
                      captchaError ? "border-red-500 bg-red-50" : "border-gray-300"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={generateCaptcha}
                    className="text-gray-500 hover:text-orange-500 transition"
                    title="New question"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
                {captchaError && (
                  <p className="text-xs text-red-500 mt-2">Incorrect answer. Please try again.</p>
                )}
              </div>

              {/* Privacy Policy */}
              <p className="text-sm text-gray-600">
                By submitting this form, you agree to our{" "}
                <a href="#" className="text-orange-500 font-medium">
                  privacy policy
                </a>
                . We'll never share your information with third parties.
              </p>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2 ${
                  isSubmitting
                    ? "bg-orange-300 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600"
                } text-white`}
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Send message
                  </>
                )}
              </button>

              {/* Trust Badge */}
              <div className="text-center pt-4">
                <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                  <Shield className="w-3 h-3" />
                  Protected by CAPTCHA & bot detection
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Info Cards Section */}
      <div className="bg-orange-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Donations Card */}
            <div className="text-center">
              <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Donations</h3>
              <p className="text-gray-600 text-sm mb-4">
                Want to make a special donation towards any specific program? Let us know.
              </p>
              <a href="mailto:info@bafutfoundation.org" className="text-orange-500 font-medium text-sm">
                info@bafutfoundation.org
              </a>
            </div>

            {/* Partnerships Card */}
            <div className="text-center">
              <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Partnerships</h3>
              <p className="text-gray-600 text-sm mb-4">
                Want to become a partner for our development projects? Let us know.
              </p>
              <a href="mailto:info@bafutfoundation.org" className="text-orange-500 font-medium text-sm">
                info@bafutfoundation.org
              </a>
            </div>

            {/* Press Card */}
            <div className="text-center">
              <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Press</h3>
              <p className="text-gray-600 text-sm mb-4">
                Writing an article or blog post want BMCA featured in the process? Let us know.
              </p>
              <a href="mailto:info@bafutfoundation.org" className="text-orange-500 font-medium text-sm">
                info@bafutfoundation.org
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}