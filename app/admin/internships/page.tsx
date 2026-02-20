"use client"

import { useEffect, useState } from "react"
import { getInternshipApplications, deleteInternshipApplication } from "@/actions/admin"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Users,
    Mail,
    Phone,
    Briefcase,
    Calendar,
    Trash2,
    ExternalLink,
    ChevronRight,
    RefreshCw,
    Search
} from "lucide-react"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"

export default function AdminDashboard() {
    const [applications, setApplications] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")

    const fetchApps = async () => {
        setLoading(true)
        const data = await getInternshipApplications()
        setApplications(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchApps()
    }, [])

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this application?")) {
            const result = await deleteInternshipApplication(id)
            if (result.success) {
                toast.success("Application deleted successfully")
                fetchApps()
            } else {
                toast.error("Failed to delete application")
            }
        }
    }

    const filteredApps = applications.filter(app =>
        `${app.firstName} ${app.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.position.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                            Internship <span className="text-emerald-600">Applications</span>
                        </h1>
                        <p className="text-slate-500 font-medium">Manage and review grassroots talent for HAPEF</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Search applicants..."
                                className="pl-10 w-64 bg-white border-slate-200"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button
                            variant="outline"
                            onClick={fetchApps}
                            disabled={loading}
                            className="bg-white border-slate-200 hover:bg-slate-50"
                        >
                            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                            Refresh
                        </Button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <Card className="border-0 shadow-sm bg-indigo-600 text-white">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-indigo-100 text-sm font-medium mb-1">Total Applications</p>
                                    <h3 className="text-3xl font-bold">{applications.length}</h3>
                                </div>
                                <div className="p-3 bg-white/10 rounded-xl">
                                    <Users className="h-6 w-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-sm bg-emerald-600 text-white">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-emerald-100 text-sm font-medium mb-1">Active Positions</p>
                                    <h3 className="text-3xl font-bold">1</h3>
                                </div>
                                <div className="p-3 bg-white/10 rounded-xl">
                                    <Briefcase className="h-6 w-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-sm bg-slate-900 text-white">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-400 text-sm font-medium mb-1">New this week</p>
                                    <h3 className="text-3xl font-bold">
                                        {applications.filter(app => {
                                            const date = new Date(app.createdAt)
                                            const now = new Date()
                                            const diff = now.getTime() - date.getTime()
                                            return diff < 7 * 24 * 60 * 60 * 1000
                                        }).length}
                                    </h3>
                                </div>
                                <div className="p-3 bg-white/10 rounded-xl">
                                    <Calendar className="h-6 w-6" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Table/List */}
                <div className="space-y-4">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm">
                            <RefreshCw className="h-10 w-10 text-emerald-500 animate-spin mb-4" />
                            <p className="text-slate-500 font-medium">Connecting to MongoDB...</p>
                        </div>
                    ) : filteredApps.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm">
                            <div className="p-4 bg-slate-50 rounded-full mb-4">
                                <Users className="h-10 w-10 text-slate-300" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">No Applications Yet</h3>
                            <p className="text-slate-500 max-w-sm text-center">
                                Once users start applying through the Get Involved page, their data will appear here.
                            </p>
                        </div>
                    ) : (
                        filteredApps.map((app) => (
                            <Card key={app._id} className="group hover:shadow-md transition-all duration-300 border-slate-100">
                                <CardContent className="p-6">
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl font-bold text-slate-900">
                                                    {app.firstName} {app.lastName}
                                                </h3>
                                                <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-0">
                                                    {app.position}
                                                </Badge>
                                            </div>

                                            <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                                                <span className="flex items-center gap-1.5 font-medium">
                                                    <Mail className="h-4 w-4" />
                                                    {app.email}
                                                </span>
                                                {app.phone && (
                                                    <span className="flex items-center gap-1.5 font-medium">
                                                        <Phone className="h-4 w-4" />
                                                        {app.phone}
                                                    </span>
                                                )}
                                                <span className="flex items-center gap-1.5 font-medium">
                                                    <Calendar className="h-4 w-4" />
                                                    {new Date(app.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>

                                            {app.coverLetter && (
                                                <p className="mt-4 text-slate-600 line-clamp-2 text-sm italic">
                                                    "{app.coverLetter}"
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-3">
                                            {app.portfolio && (
                                                <a href={app.portfolio} target="_blank" rel="noreferrer">
                                                    <Button variant="outline" size="sm" className="bg-white border-slate-200">
                                                        <ExternalLink className="h-4 w-4 mr-2" />
                                                        Portfolio
                                                    </Button>
                                                </a>
                                            )}
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(app._id)}
                                                className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border-0 transition-all shadow-none"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="group-hover:translate-x-1 transition-transform">
                                                <ChevronRight className="h-5 w-5 text-slate-400" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
