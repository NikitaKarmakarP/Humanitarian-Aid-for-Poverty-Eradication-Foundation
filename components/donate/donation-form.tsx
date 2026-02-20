"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Heart,
  CreditCard,
  Smartphone,
  Building,
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Award,
  Zap,
  CheckCircle,
  Loader2,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { processDonation } from "@/actions/donate"

export function DonationForm() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState("")
  const [donationType, setDonationType] = useState<"one-time" | "monthly">("one-time")
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "bank">("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()

  const predefinedAmounts = [
    { amount: 500, popular: false },
    { amount: 1000, popular: false },
    { amount: 2000, popular: true },
    { amount: 5000, popular: false },
    { amount: 10000, popular: false },
    { amount: 25000, popular: false },
  ]

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount("")
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    setSelectedAmount(null)
  }

  const getFinalAmount = () => {
    return selectedAmount || Number.parseInt(customAmount) || 0
  }

  const handleDonation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsProcessing(true)

    const formData = new FormData(e.currentTarget)
    const result = await processDonation(formData)

    setIsProcessing(false)

    if (result.success) {
      toast({
        title: "Donation Successful!",
        description: result.message,
      })
      // Reset form or redirect if needed
      setSelectedAmount(null)
      setCustomAmount("")
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      })
    }
  }

  return (
    <section id="donation-form" className="py-24 bg-gradient-to-br from-gray-50 to-green-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-green-200 shadow-sm mb-6">
            <Zap className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-semibold text-gray-800">Quick & Secure Donation</span>
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Make Your
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {" "}
              Impact
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your donation amount and see the immediate impact you'll create
          </p>
        </div>

        <Card className="shadow-2xl border-0 overflow-hidden bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-700 opacity-50"></div>
            <CardTitle className="relative flex items-center gap-3 text-3xl">
              <div className="p-2 bg-white/20 rounded-xl">
                <Heart className="h-8 w-8 animate-pulse" />
              </div>
              Donation Details
              <div className="ml-auto flex items-center gap-2 text-sm bg-white/20 px-3 py-1 rounded-full">
                <Shield className="h-4 w-4" />
                Secure
              </div>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-10">
            <form onSubmit={handleDonation} className="space-y-10">
              {/* Hidden State Inputs */}
              <input type="hidden" name="amount" value={getFinalAmount()} />
              <input type="hidden" name="type" value={donationType} />
              <input type="hidden" name="paymentMethod" value={paymentMethod} />

              {/* Donation Type with Enhanced Design */}
              <div className="space-y-6">
                <label className="block text-lg font-semibold text-gray-800 mb-4">Choose Donation Type</label>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { type: "one-time", title: "One-time Donation", desc: "Make a single contribution", icon: "💝" },
                    { type: "monthly", title: "Monthly Donation", desc: "Recurring monthly support", icon: "🔄" },
                  ].map((option) => (
                    <button
                      key={option.type}
                      type="button"
                      onClick={() => setDonationType(option.type as "one-time" | "monthly")}
                      className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 ${donationType === option.type
                        ? "border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg scale-105"
                        : "border-gray-200 hover:border-green-300 hover:shadow-md hover:scale-102"
                        }`}
                    >
                      <div className="text-3xl mb-3">{option.icon}</div>
                      <div className="font-bold text-lg text-gray-900 mb-2">{option.title}</div>
                      <div className="text-sm text-gray-600">{option.desc}</div>
                      {donationType === option.type && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Enhanced Amount Selection */}
              <div className="space-y-6">
                <label className="block text-lg font-semibold text-gray-800">Select Amount (₹)</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {predefinedAmounts.map((item) => (
                    <button
                      key={item.amount}
                      type="button"
                      onClick={() => handleAmountSelect(item.amount)}
                      className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 ${selectedAmount === item.amount
                        ? "border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg scale-105"
                        : "border-gray-200 hover:border-green-300 hover:shadow-md hover:scale-102"
                        }`}
                    >
                      {item.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          POPULAR
                        </div>
                      )}
                      <div className="font-bold text-2xl text-gray-900 mb-2">₹{item.amount.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">
                        {item.amount === 500 && "Provided educational support to a student"}
                        {item.amount === 1000 && "Provided educational support to 2 students"}
                        {item.amount === 2000 && "Supported a family with mushroom seeds and equipment"}
                        {item.amount === 5000 && "Supported kitchen garden kits to 5 families"}
                        {item.amount === 10000 && "Sets up complete mushroom unit"}
                        {item.amount === 25000 && "Transform a village"}
                      </div>
                      {selectedAmount === item.amount && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <Input
                    type="number"
                    placeholder="Enter custom amount (min ₹100)"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    className="text-xl p-6 rounded-2xl border-2 border-gray-200 focus:border-green-500 transition-colors duration-300"
                    min="100"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">₹</div>
                </div>
              </div>

              {/* Enhanced Payment Method */}
              <div className="space-y-6">
                <label className="block text-lg font-semibold text-gray-800">Choose Payment Method</label>
                <div className="grid grid-cols-3 gap-6">
                  {[
                    {
                      method: "card",
                      icon: CreditCard,
                      title: "Card Payment",
                      desc: "Credit/Debit Card",
                      color: "blue",
                    },
                    { method: "upi", icon: Smartphone, title: "UPI Payment", desc: "Quick & Easy", color: "green" },
                    {
                      method: "bank",
                      icon: Building,
                      title: "Bank Transfer",
                      desc: "Direct Transfer",
                      color: "purple",
                    },
                  ].map((option) => (
                    <button
                      key={option.method}
                      type="button"
                      onClick={() => setPaymentMethod(option.method as "card" | "upi" | "bank")}
                      className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 ${paymentMethod === option.method
                        ? `border-${option.color}-500 bg-gradient-to-br from-${option.color}-50 to-${option.color}-100 shadow-lg scale-105`
                        : "border-gray-200 hover:border-gray-300 hover:shadow-md hover:scale-102"
                        }`}
                    >
                      <option.icon
                        className={`h-8 w-8 mx-auto mb-3 ${paymentMethod === option.method ? `text-${option.color}-600` : "text-gray-400"
                          } group-hover:scale-110 transition-transform duration-300`}
                      />
                      <div className="font-bold text-gray-900 mb-1">{option.title}</div>
                      <div className="text-sm text-gray-600">{option.desc}</div>
                      {paymentMethod === option.method && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Enhanced Donor Information */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">Your Information</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { id: "fullName", label: "Full Name", icon: User, type: "text", required: true },
                    { id: "email", label: "Email Address", icon: Mail, type: "email", required: true },
                    { id: "phone", label: "Phone Number", icon: Phone, type: "tel", required: false },
                    { id: "city", label: "City", icon: MapPin, type: "text", required: false },
                  ].map((field) => (
                    <div key={field.id} className="relative">
                      <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-2">
                        <field.icon className="inline h-4 w-4 mr-2" />
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </label>
                      <Input
                        id={field.id}
                        name={field.id}
                        type={field.type}
                        required={field.required}
                        placeholder={`Enter your ${field.label.toLowerCase()}`}
                        className="p-4 rounded-xl border-2 border-gray-200 focus:border-green-500 transition-colors duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Personal Message (Optional)
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Share why you're supporting HAPEF or any specific program you'd like to support..."
                  className="p-4 rounded-xl border-2 border-gray-200 focus:border-green-500 transition-colors duration-300"
                />
              </div>

              {/* Enhanced Summary */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="h-6 w-6 text-green-600" />
                  <h3 className="font-bold text-xl text-gray-900">Donation Summary</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-lg">
                    <span className="text-gray-700">
                      {donationType === "monthly" ? "Monthly" : "One-time"} Donation:
                    </span>
                    <span className="font-bold text-2xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      ₹{getFinalAmount().toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Tax Deduction (50%):</span>
                    <span className="font-semibold">₹{Math.floor(getFinalAmount() * 0.5).toLocaleString()}</span>
                  </div>
                  {donationType === "monthly" && (
                    <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                      💡 You can cancel your monthly donation anytime by contacting us.
                    </div>
                  )}
                </div>
              </div>

              {/* Enhanced Submit Button */}
              <Button
                type="submit"
                disabled={getFinalAmount() < 100 || isProcessing}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span>Processing Your Donation...</span>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                ) : (
                  <span className="flex items-center gap-3">
                    <Heart className="h-6 w-6 animate-pulse" />
                    Donate ₹{getFinalAmount().toLocaleString()} {donationType === "monthly" ? "Monthly" : "Now"}✨
                  </span>
                )}
              </Button>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 text-center text-sm text-gray-600">
                <div className="flex items-center justify-center gap-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span>🔒 Secure & Encrypted</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Award className="h-4 w-4 text-blue-600" />
                  <span>📧 Instant Receipt</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="h-4 w-4 text-purple-600" />
                  <span>💰 Tax Deductible</span>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
