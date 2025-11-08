"use client"

import { useState } from "react"
import { Mail, MapPin, Plus } from "lucide-react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Add form submission logic here
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    })
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
                  <p className="text-gray-600 text-sm mb-2">Come say hello at our office.</p>
                  <p className="text-gray-700 font-medium">Yaounde</p>
                  <p className="text-gray-700 font-medium">Cameroon</p>
                  <p className="text-orange-500 font-medium mt-2">United States</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="info@bafutfoundation.org"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone number</label>
                <div className="flex gap-2">
                  <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your inquiry..."
                  rows="5"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                ></textarea>
              </div>

              {/* Privacy Policy */}
              <p className="text-sm text-gray-600">
                You agree to our terms{" "}
                <a href="#" className="text-orange-500 font-medium">
                  privacy policy
                </a>
              </p>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition"
              >
                Send message
              </button>
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
