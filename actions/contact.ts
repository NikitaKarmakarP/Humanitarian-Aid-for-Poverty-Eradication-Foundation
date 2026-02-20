"use server"

import { supabase } from "@/lib/supabase"

export async function submitContactForm(formData: FormData) {
    try {
        const contactData = {
            first_name: formData.get("firstName") as string,
            last_name: formData.get("lastName") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string || null,
            subject: formData.get("subject") as string,
            message: formData.get("message") as string,
            created_at: new Date().toISOString()
        }

        const { data, error } = await supabase
            .from('contacts')
            .insert([contactData])
            .select()

        if (error) throw error

        console.log("New Contact Message saved to Supabase:", data[0].id)

        return {
            success: true,
            message: "Your message has been sent successfully!"
        }
    } catch (error) {
        console.error("Supabase Error:", error)
        return {
            success: false,
            message: "An error occurred while sending your message. Please try again later."
        }
    }
}
