"use server"

import { supabase } from "@/lib/supabase"

interface DonationData {
  amount: number
  type: "one-time" | "monthly"
  payment_method: "card" | "upi" | "bank"
  full_name: string
  email: string
  phone?: string
  city?: string
  message?: string
}

export async function processDonation(formData: FormData) {
  try {
    const donationData: DonationData = {
      amount: Number.parseInt(formData.get("amount") as string),
      type: formData.get("type") as "one-time" | "monthly",
      payment_method: formData.get("paymentMethod") as "card" | "upi" | "bank",
      full_name: formData.get("fullName") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || undefined,
      city: (formData.get("city") as string) || undefined,
      message: (formData.get("message") as string) || undefined,
    }

    console.log("Processing Donation for:", donationData.full_name, "Amount:", donationData.amount)

    // 1. Simulate payment processing (in reality, you'd integrate Razorpay/Stripe here)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // 2. Save to Supabase
    const { data, error } = await supabase
      .from('donations')
      .insert([{
        ...donationData,
        created_at: new Date().toISOString(),
        status: 'completed' // In a real app, this would depend on payment gateway response
      }])
      .select()

    if (error) throw error

    return {
      success: true,
      donationId: data[0].id,
      full_name: donationData.full_name,
      message: `Thank you ${donationData.full_name}! Your ${donationData.type} donation of ₹${donationData.amount.toLocaleString()} has been processed successfully.`,
      receiptEmail: donationData.email,
    }
  } catch (error) {
    console.error("Donation Error:", error)
    return {
      success: false,
      message: "An error occurred while processing your donation. Please try again later."
    }
  }
}
