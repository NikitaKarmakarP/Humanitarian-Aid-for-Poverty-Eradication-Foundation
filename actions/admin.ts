"use server"

import { supabase } from "@/lib/supabase"

export async function getInternshipApplications() {
    try {
        const { data, error } = await supabase
            .from('internships')
            .select('*') // Select all columns
            .order('created_at', { ascending: false }) // Use order instead of sort for Supabase

        if (error) throw error

        // Map snake_case to camelCase for the frontend
        return (data || []).map((app: any) => ({
            _id: app.id,
            firstName: app.first_name,
            lastName: app.last_name,
            email: app.email,
            phone: app.phone,
            position: app.position,
            experience: app.experience,
            resumeName: app.resume_name,
            coverLetter: app.cover_letter,
            portfolio: app.portfolio,
            source: app.source,
            createdAt: app.created_at
        }))
    } catch (error) {
        console.error("Error fetching applications:", error)
        return []
    }
}

export async function deleteInternshipApplication(id: string) {
    try {
        const { error } = await supabase
            .from('internships')
            .delete()
            .eq('id', id)

        if (error) throw error
        return { success: true }
    } catch (error) {
        console.error("Error deleting application:", error)
        return { success: false }
    }
}
