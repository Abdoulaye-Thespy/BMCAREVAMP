"use client"

import { useState } from "react"
import { Check } from "lucide-react"

const CHAPTERS = [
  "Dalles",
  "Puebla",
  "New England",
  "Great Lakes",
  "United Chapter",
  "United Chapter West Coast",
  "Minnesota",
  "DC Metro",
  "Delaware",
  "North Carolina",
  "East",
  "Los Angeles",
]

const steps = [
  { number: 1, name: "Chapter" },
  { number: 2, name: "Beneficiary" },
  { number: 3, name: "Member" },
  { number: 4, name: "Confirm" },
]

export default function KiteuhForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const [formData, setFormData] = useState({
    chapter: "",
    beneficiaryFirstName: "",
    beneficiaryLastName: "",
    beneficiaryAddress: "",
    beneficiaryResidence: "",
    beneficiaryEmail: "",
    beneficiaryPhone: "",
    memberFirstName: "",
    memberLastName: "",
    memberDateOfBirth: "",
    memberAddress: "",
    memberResidence: "",
    memberEmail: "",
    memberPhone: "",
    memberId: "",
    memberName: "",
    memberDate: "",
    termsAccepted: false,
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    } else if (currentStep === 4) {
      setShowConfirmModal(true)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    console.log("Form submitted:", formData)
    setShowConfirmModal(false)
    // Reset form or redirect
    setCurrentStep(1)
    setFormData({
      chapter: "",
      beneficiaryFirstName: "",
      beneficiaryLastName: "",
      beneficiaryAddress: "",
      beneficiaryResidence: "",
      beneficiaryEmail: "",
      beneficiaryPhone: "",
      memberFirstName: "",
      memberLastName: "",
      memberDateOfBirth: "",
      memberAddress: "",
      memberResidence: "",
      memberEmail: "",
      memberPhone: "",
      memberId: "",
      memberName: "",
      memberDate: "",
      termsAccepted: false,
    })
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
            <p className="text-gray-600 mb-4">Bafut Mbonjing Cultural Association subscription program for members</p>
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
            </div>
          </div>
        )}

        {/* Step 2: Beneficiary Information */}
        {currentStep === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-orange-600 mb-6">Beneficiary Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="beneficiaryFirstName"
                placeholder="Beneficiary's First Name"
                value={formData.beneficiaryFirstName}
                onChange={handleInputChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="text"
                name="beneficiaryLastName"
                placeholder="Beneficiary's First Name"
                value={formData.beneficiaryLastName}
                onChange={handleInputChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 block mb-2">Address</label>
              <input
                type="text"
                name="beneficiaryAddress"
                placeholder="City of residence"
                value={formData.beneficiaryAddress}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mb-2"
              />
              <input
                type="text"
                name="beneficiaryResidence"
                placeholder="State of residence"
                value={formData.beneficiaryResidence}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 block mb-2">Email address</label>
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
              <label className="text-sm font-medium text-gray-700 block mb-2">Phone number</label>
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
          </div>
        )}

        {/* Step 3: Member Information */}
        {currentStep === 3 && (
          <div>
            <h2 className="text-2xl font-bold text-orange-600 mb-6">Member Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="memberFirstName"
                placeholder="First name"
                value={formData.memberFirstName}
                onChange={handleInputChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="text"
                name="memberLastName"
                placeholder="Last Name"
                value={formData.memberLastName}
                onChange={handleInputChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 block mb-2">Date of birth</label>
              <input
                type="date"
                name="memberDateOfBirth"
                value={formData.memberDateOfBirth}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 block mb-2">Address</label>
              <input
                type="text"
                name="memberAddress"
                placeholder="City of residence"
                value={formData.memberAddress}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mb-2"
              />
              <input
                type="text"
                name="memberResidence"
                placeholder="State of residence"
                value={formData.memberResidence}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 block mb-2">Email address</label>
              <input
                type="email"
                name="memberEmail"
                placeholder="Email address"
                value={formData.memberEmail}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 block mb-2">Phone number</label>
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
            </div>
          </div>
        )}

        {/* Step 4: Official Use Only */}
        {currentStep === 4 && (
          <div>
            <h2 className="text-2xl font-bold text-orange-600 mb-6">For Official Use Only</h2>

            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 block mb-2">Member-ID</label>
              <input
                type="text"
                name="memberId"
                placeholder="000-000-000-00"
                value={formData.memberId}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 block mb-2">Full Name</label>
              <input
                type="text"
                name="memberName"
                placeholder="Enter Full name"
                value={formData.memberName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 block mb-2">Date</label>
              <input
                type="date"
                name="memberDate"
                value={formData.memberDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="flex items-start gap-3 mb-6">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleInputChange}
                className="mt-1"
              />
              <label className="text-sm text-gray-700">
                I have read, understood, and agree to the terms and conditions of the Kiteuh Insurance Fund and certify
                that the information provided above is true.
              </label>
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
          disabled={currentStep === 1 && !formData.chapter}
          className="px-8 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold"
        >
          {currentStep === 4 ? "Submit Form" : "Next"}
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-6 h-6 text-green-600" />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-center mb-2">Submit Form ?</h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to submit this form? Once submitted, you can modify it later.
            </p>

            {/* Display Form Data */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 max-h-64 overflow-y-auto text-sm">
              <div className="space-y-2">
                {formData.chapter && (
                  <p>
                    <strong>Chapter:</strong> {formData.chapter}
                  </p>
                )}
                {formData.beneficiaryFirstName && (
                  <p>
                    <strong>Beneficiary:</strong> {formData.beneficiaryFirstName} {formData.beneficiaryLastName}
                  </p>
                )}
                {formData.beneficiaryEmail && (
                  <p>
                    <strong>Email:</strong> {formData.beneficiaryEmail}
                  </p>
                )}
                {formData.memberFirstName && (
                  <p>
                    <strong>Member:</strong> {formData.memberFirstName} {formData.memberLastName}
                  </p>
                )}
                {formData.memberDateOfBirth && (
                  <p>
                    <strong>DOB:</strong> {formData.memberDateOfBirth}
                  </p>
                )}
                {formData.memberId && (
                  <p>
                    <strong>Member ID:</strong> {formData.memberId}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
