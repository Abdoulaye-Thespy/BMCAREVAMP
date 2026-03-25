"use client"

import { useState, useEffect } from "react"
import { Check, Loader2 } from "lucide-react"

const CHAPTERS = [
  "Houston Chapter",
  "Dallas Chapter",
  "Florida Chapter",
  "New England Chapter",
  "Great Lakes Chapter",
  "Los Angeles Chapter",
  "United Chapter",
  "United Chapter West Coast",
  "Minnesota Chapter",
  "DC Metro Chapter",
  "Delaware Chapter",
  "Mid West Chapter",
  "North Carolina Chapter",
  "North East Chapter"
]

const steps = [
  { number: 1, name: "Chapter" },
  { number: 2, name: "Member" },
  { number: 3, name: "Beneficiary" },
  { number: 4, name: "Submit" },
]

export default function KiteuhForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [useSameAddress, setUseSameAddress] = useState(false)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [applicationNumber, setApplicationNumber] = useState("")

  const [formData, setFormData] = useState({
    chapter: "",
    memberFirstName: "",
    memberMiddleName: "",
    memberLastName: "",
    memberDateOfBirth: "",
    memberAddress: "",
    memberCity: "",
    memberState: "",
    memberZipCode: "",
    memberEmail: "",
    memberPhone: "",
    beneficiaryFirstName: "",
    beneficiaryMiddleName: "",
    beneficiaryLastName: "",
    beneficiaryEmail: "",
    beneficiaryPhone: "",
    beneficiaryAddress: "",
    beneficiaryCity: "",
    beneficiaryState: "",
    beneficiaryZipCode: "",
  })

  const validateStep = (step) => {
    const newErrors = {}

    if (step === 1) {
      if (!formData.chapter.trim()) {
        newErrors.chapter = "Chapter selection is required"
      }
    }

    if (step === 2) {
      if (!formData.memberFirstName.trim()) {
        newErrors.memberFirstName = "First name is required"
      }
      if (!formData.memberLastName.trim()) {
        newErrors.memberLastName = "Last name is required"
      }
      if (!formData.memberDateOfBirth.trim()) {
        newErrors.memberDateOfBirth = "Date of birth is required"
      }
      if (!formData.memberEmail.trim()) {
        newErrors.memberEmail = "Email is required"
      } else if (!/\S+@\S+\.\S+/.test(formData.memberEmail)) {
        newErrors.memberEmail = "Email is invalid"
      }
      if (!formData.memberPhone.trim()) {
        newErrors.memberPhone = "Phone number is required"
      } else if (!/^\d{10,}$/.test(formData.memberPhone.replace(/\D/g, ''))) {
        newErrors.memberPhone = "Phone number is invalid"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleUseSameAddressChange = (e) => {
    const checked = e.target.checked
    setUseSameAddress(checked)
    
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        beneficiaryAddress: prev.memberAddress,
        beneficiaryCity: prev.memberCity,
        beneficiaryState: prev.memberState,
        beneficiaryZipCode: prev.memberZipCode,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        beneficiaryAddress: "",
        beneficiaryCity: "",
        beneficiaryState: "",
        beneficiaryZipCode: "",
      }))
    }
  }

  const handleNext = () => {
    if (currentStep === 3) {
      setShowConfirmModal(true)
      return
    }

    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch("/api/kiteuh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setApplicationNumber(data.applicationNumber)
        setSubmitted(true)
        setShowConfirmModal(false)
      } else {
        throw new Error(data.error || "Failed to submit")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Failed to submit application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Success screen
  if (submitted) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg p-8 text-center">
          <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted Successfully!</h2>
          <p className="text-gray-600 mb-4">
            Thank you for applying to the Kiteuh Mutual Assurance Program.
          </p>
          <div className="bg-orange-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600 mb-2">Your Application Number:</p>
            <p className="text-2xl font-bold text-orange-600">{applicationNumber}</p>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            A confirmation email has been sent to your email address. Our admin team will review your application
            and assign your member ID within 2-3 business days.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-12">
      {/* Progress Steps */}
      <div className="mb-12">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg transition-all ${
                  currentStep >= step.number ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {currentStep > step.number ? <Check className="w-6 h-6" /> : step.number}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-4 transition-all ${
                    currentStep > step.number ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-orange-50 rounded-lg p-8 mb-8">
        {/* Step 1: Chapter Selection */}
        {currentStep === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-orange-600 mb-6">Kiteuh Mutual Assurance Program</h2>
            <p className="text-gray-600 mb-4">Bafut Manjong Cultural Association subscription program for members</p>
            <p className="text-orange-600 font-semibold mb-4">Choose your members chapter</p>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Members Chapters</label>
              <select
                name="chapter"
                value={formData.chapter}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Select your members chapter</option>
                {CHAPTERS.map((chapter) => (
                  <option key={chapter} value={chapter}>
                    {chapter}
                  </option>
                ))}
              </select>
              {errors.chapter && <p className="text-red-500 text-sm mt-1">{errors.chapter}</p>}
            </div>
          </div>
        )}

        {/* Step 2: Member Information */}
        {currentStep === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-orange-600 mb-6">Member Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <input
                  type="text"
                  name="memberFirstName"
                  placeholder="First Name *"
                  value={formData.memberFirstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                {errors.memberFirstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.memberFirstName}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="memberMiddleName"
                  placeholder="Middle Name or MI"
                  value={formData.memberMiddleName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="memberLastName"
                  placeholder="Last Name *"
                  value={formData.memberLastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                {errors.memberLastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.memberLastName}</p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 block mb-2">Date of Birth *</label>
              <input
                type="date"
                name="memberDateOfBirth"
                value={formData.memberDateOfBirth}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.memberDateOfBirth && (
                <p className="text-red-500 text-sm mt-1">{errors.memberDateOfBirth}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 block mb-2">Address</label>
              <input
                type="text"
                name="memberAddress"
                placeholder="Street Address"
                value={formData.memberAddress}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mb-2"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <input
                  type="text"
                  name="memberCity"
                  placeholder="City"
                  value={formData.memberCity}
                  onChange={handleInputChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                  type="text"
                  name="memberState"
                  placeholder="State"
                  value={formData.memberState}
                  onChange={handleInputChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <input
                  type="text"
                  name="memberZipCode"
                  placeholder="ZIP Code"
                  value={formData.memberZipCode}
                  onChange={handleInputChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 block mb-2">Email Address *</label>
              <input
                type="email"
                name="memberEmail"
                placeholder="Email Address"
                value={formData.memberEmail}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.memberEmail && <p className="text-red-500 text-sm mt-1">{errors.memberEmail}</p>}
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 block mb-2">Phone Number *</label>
              <div className="flex gap-2">
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option>US +1</option>
                </select>
                <input
                  type="tel"
                  name="memberPhone"
                  placeholder="+1 (555) 000-0000"
                  value={formData.memberPhone}
                  onChange={handleInputChange}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              {errors.memberPhone && <p className="text-red-500 text-sm mt-1">{errors.memberPhone}</p>}
            </div>
          </div>
        )}

        {/* Step 3: Beneficiary Information */}
        {currentStep === 3 && (
          <div>
            <h2 className="text-2xl font-bold text-orange-600 mb-6">Beneficiary Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                name="beneficiaryFirstName"
                placeholder="First Name"
                value={formData.beneficiaryFirstName}
                onChange={handleInputChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="text"
                name="beneficiaryMiddleName"
                placeholder="Middle Name or MI"
                value={formData.beneficiaryMiddleName}
                onChange={handleInputChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="text"
                name="beneficiaryLastName"
                placeholder="Last Name"
                value={formData.beneficiaryLastName}
                onChange={handleInputChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 block mb-2">Email Address</label>
              <input
                type="email"
                name="beneficiaryEmail"
                placeholder="Beneficiary's Email Address"
                value={formData.beneficiaryEmail}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 block mb-2">Phone Number</label>
              <div className="flex gap-2">
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                  <option>US +1</option>
                </select>
                <input
                  type="tel"
                  name="beneficiaryPhone"
                  placeholder="+1 (555) 000-0000"
                  value={formData.beneficiaryPhone}
                  onChange={handleInputChange}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-start gap-3 mb-3">
                <input
                  type="checkbox"
                  checked={useSameAddress}
                  onChange={handleUseSameAddressChange}
                  className="mt-1"
                />
                <label className="text-sm text-gray-700">
                  Use same address as member
                </label>
              </div>

              <label className="text-sm font-medium text-gray-700 block mb-2">Address</label>
              <input
                type="text"
                name="beneficiaryAddress"
                placeholder="Street Address"
                value={formData.beneficiaryAddress}
                onChange={handleInputChange}
                disabled={useSameAddress}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mb-2 disabled:bg-gray-100 disabled:text-gray-500"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <input
                  type="text"
                  name="beneficiaryCity"
                  placeholder="City"
                  value={formData.beneficiaryCity}
                  onChange={handleInputChange}
                  disabled={useSameAddress}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100 disabled:text-gray-500"
                />
                <input
                  type="text"
                  name="beneficiaryState"
                  placeholder="State"
                  value={formData.beneficiaryState}
                  onChange={handleInputChange}
                  disabled={useSameAddress}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100 disabled:text-gray-500"
                />
                <input
                  type="text"
                  name="beneficiaryZipCode"
                  placeholder="ZIP Code"
                  value={formData.beneficiaryZipCode}
                  onChange={handleInputChange}
                  disabled={useSameAddress}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100 disabled:text-gray-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 justify-between">
        <button
          onClick={handleBack}
          disabled={currentStep === 1}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="px-8 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold"
        >
          {currentStep === 3 ? "Review & Submit" : "Next"}
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-center mb-4">Review Your Application</h3>
            <div className="bg-gray-50 rounded-lg p-4 mb-6 max-h-64 overflow-y-auto text-sm">
              <div className="space-y-2">
                <p><strong>Chapter:</strong> {formData.chapter}</p>
                <p><strong>Member:</strong> {formData.memberFirstName} {formData.memberMiddleName} {formData.memberLastName}</p>
                <p><strong>DOB:</strong> {formData.memberDateOfBirth}</p>
                <p><strong>Email:</strong> {formData.memberEmail}</p>
                <p><strong>Phone:</strong> {formData.memberPhone}</p>
                {formData.beneficiaryFirstName && (
                  <p><strong>Beneficiary:</strong> {formData.beneficiaryFirstName} {formData.beneficiaryLastName}</p>
                )}
              </div>
            </div>
            <p className="text-gray-600 text-center mb-6">
              Please review your information. Once submitted, you'll receive a confirmation email.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-semibold"
              >
                Edit
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  "Confirm & Submit"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}