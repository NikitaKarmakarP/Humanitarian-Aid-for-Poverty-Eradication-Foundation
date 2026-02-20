"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, CheckCircle2, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

import { submitContactForm } from "@/actions/contact"

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const result = await submitContactForm(formData)

    setIsSubmitting(false)

    if (result.success) {
      setIsSuccess(true)
      toast({
        title: "Message Sent!",
        description: result.message,
      })
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      })
    }
  }

  if (isSuccess) {
    return (
      <div className="p-10 lg:p-16 bg-white rounded-3xl shadow-xl border border-green-100 flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="h-10 w-10 text-green-600" />
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h3>
        <p className="text-gray-600 mb-8 max-w-sm">
          Your message has been sent successfully! Our team will review your enquiry and contact you shortly.
        </p>
        <Button
          onClick={() => setIsSuccess(false)}
          variant="outline"
          className="rounded-full border-green-200 text-green-700 hover:bg-green-50"
        >
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <section className="p-10 lg:p-16 bg-white rounded-3xl shadow-xl border border-gray-100">
      <form className="space-y-6 max-w-2xl mx-auto" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 ml-1">
              First Name *
            </label>
            <Input
              id="firstName"
              name="firstName"
              required
              placeholder="Enter your first name"
              className="h-12 text-base rounded-xl border-gray-200 focus:border-green-500 transition-all bg-gray-50/50"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 ml-1">
              Last Name *
            </label>
            <Input
              id="lastName"
              name="lastName"
              required
              placeholder="Enter your last name"
              className="h-12 text-base rounded-xl border-gray-200 focus:border-green-500 transition-all bg-gray-50/50"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 ml-1">
            Email Address *
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Enter your email address"
            className="h-12 text-base rounded-xl border-gray-200 focus:border-green-500 transition-all bg-gray-50/50"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 ml-1">
            Phone Number
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Enter your phone number"
            className="h-12 text-base rounded-xl border-gray-200 focus:border-green-500 transition-all bg-gray-50/50"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 ml-1">
            Subject *
          </label>
          <Input
            id="subject"
            name="subject"
            required
            placeholder="What is this regarding?"
            className="h-12 text-base rounded-xl border-gray-200 focus:border-green-500 transition-all bg-gray-50/50"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-semibold text-gray-700 ml-1">
            Message *
          </label>
          <Textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Tell us more about your enquiry…"
            className="text-base rounded-xl border-gray-200 focus:border-green-500 transition-all bg-gray-50/50"
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-6 text-lg font-bold rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-green-500/25 transition-all duration-300 disabled:opacity-70 group"
        >
          {isSubmitting ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <>
              Send Message
              <Send className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </>
          )}
        </Button>
      </form>
    </section>
  )
}
