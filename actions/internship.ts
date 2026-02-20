import { supabase } from "@/lib/supabase"

export type InternshipApplication = {
    firstName: string
    lastName: string
    email: string
    phone?: string
    position: string
    experience: string
    resumeName?: string
    coverLetter?: string
    portfolio?: string
    source: string
}

export async function submitInternshipApplication(formData: FormData) {
    try {
        // 1. Prepare data for Supabase
        const applicationData = {
            first_name: formData.get("firstName") as string,
            last_name: formData.get("lastName") as string,
            email: formData.get("email") as string,
            phone: formData.get("phone") as string || null,
            position: formData.get("position") as string,
            experience: formData.get("experience") as string,
            resume_name: formData.get("resume-name") as string || null,
            cover_letter: formData.get("coverLetter") as string || null,
            portfolio: formData.get("portfolio") as string || null,
            source: formData.get("hearAbout") as string,
            created_at: new Date().toISOString()
        }

        // 2. Insert into 'internships' table
        const { data, error } = await supabase
            .from('internships')
            .insert([applicationData])
            .select()

        if (error) throw error

        console.log("New Internship Application saved to Supabase:", data[0].id)

        return {
            success: true,
            message: "Your application submitted successfully! Best of luck!",
            applicationId: data[0].id.toString()
        }
    } catch (error) {
        console.error("Supabase Error:", error)
        return {
            success: false,
            message: "An error occurred while submitting your application. Please try again later."
        }
    }
}
