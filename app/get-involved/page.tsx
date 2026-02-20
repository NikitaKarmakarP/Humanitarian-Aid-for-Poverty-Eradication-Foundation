"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { submitInternshipApplication } from "@/actions/internship"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Users,
  Briefcase,
  MapPinIcon,
  Calendar,
  DollarSign,
  Filter,
  Upload,
  ArrowRight,
  Heart,
  TrendingUp,
  Shield,
  Target,
  CheckCircle,
  CheckCircle2,
  Loader2,
  Send,
  ExternalLink
} from "lucide-react"

export default function GetInvolvedPage() {
  const [formPosition, setFormPosition] = useState("")
  const [formExperience, setFormExperience] = useState("")
  const [formSource, setFormSource] = useState("")
  const [formFileName, setFormFileName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { toast } = useToast()

  const handleApplicationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    // Add controlled component values
    formData.append("position", formPosition)
    formData.append("experience", formExperience)
    formData.append("hearAbout", formSource)
    if (formFileName) {
      formData.append("resume-name", formFileName)
    }

    try {
      const result = await submitInternshipApplication(formData)
      if (result.success) {
        setIsSuccess(true)
        toast({
          title: "Application Submitted!",
          description: result.message,
        })
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments")
  const [selectedType, setSelectedType] = useState("All Types")
  const [selectedLocation, setSelectedLocation] = useState("All Locations")

  const jobPositions = [
    {
      id: 2,
      title: "Development Internship Trainee",
      department: "Programs",
      location: "Pakur, Jharkhand",
      type: "Duration - Two Months, Onsite/Remote",
      salary: "Unpaid",
      experience: "UG/PG/Doctorate (All Disciplines)",
      posted: "16/12/2026",
      urgent: true,
      remote: true,
      description: "Are you passionate about social development, grassroots engagement, and creating meaningful impact? Join HAPEF to work closely with communities and gain hands-on field experience.",
      fullDescription: "🌱 We Are Hiring Interns | HAPEF | Onsite/Remote Opportunity 🌱\n\nAre you passionate about social development, grassroots engagement, and creating meaningful impact? Here’s your chance to work closely with communities and gain hands-on field experience!\n\n📍 Location: Pakur, Jharkhand\n🕒 Mode: Onsite / Remote\n⏳ Minimum Duration: 2 Months\n⏰ Flexible Timings\n\nWe are inviting applications from UG/PG/Doctorate students (all disciplines) who are eager to contribute to the social sector. This internship offers a valuable opportunity to work at the grassroots level, understand development challenges, and contribute to sustainable community initiatives.",
      skills: [
        "Students from all types of disciplines pursuing UG/PG/Doctorate or equivalent can apply.",
        "Proven experience in social sector will be a plus point. Although, freshers are also welcome.",
        "Excellent written and verbal communication skills.",
        "Ability to think creatively and strategically.",
        "Strong analytical skills and proficiency in data analysis tools will be desirable.",
        "Team player with strong interpersonal skills."
      ],
      applyForm: "https://forms.gle/AmNtarMgsrTwT3zVA",
      applyEmail: "info.hapef@gmail.com"
    }
  ]

  const filteredPositions = jobPositions.filter(job => {
    const matchesDepartment = selectedDepartment === "All Departments" || job.department === selectedDepartment;
    const matchesType = selectedType === "All Types" || job.type.includes(selectedType);
    const matchesLocation = selectedLocation === "All Locations" ||
      (selectedLocation === "Remote/Onsite" ? job.remote : job.location.includes(selectedLocation));
    return matchesDepartment && matchesType && matchesLocation;
  });

  const applicationSteps = [
    {
      step: 1,
      title: "Submit Application",
      duration: "5 minutes",
      description: "Fill out our online application form with your details and upload your resume"
    },
    {
      step: 2,
      title: "Application Review",
      duration: "3-5 business days",
      description: "Our HR team reviews your application and qualifications"
    },
    {
      step: 3,
      title: "Initial Interview",
      duration: "30-45 minutes",
      description: "Phone or video interview to discuss your background and interest"
    },
    {
      step: 4,
      title: "Final Interview",
      duration: "1-2 hours",
      description: "In-person or video interview with the hiring manager and team"
    },
    {
      step: 5,
      title: "Offer & Onboarding",
      duration: "1-2 weeks",
      description: "Receive offer letter and begin the onboarding process"
    }
  ]

  const applicationTips = [
    "Tailor your cover letter to the specific position and our mission",
    "Highlight relevant experience in rural development or NGO sector",
    "Include specific examples of your impact in previous roles",
    "Demonstrate your passion for community development"
  ]

  const benefits = [
    {
      icon: <Heart className="h-8 w-8 text-emerald-600" />,
      title: "Purpose-Driven Work",
      description: "Every day, you'll contribute to meaningful change in rural communities",
      features: [
        "Direct impact on community development",
        "Work with passionate professionals",
        "Continuous learning opportunities"
      ]
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
      title: "Growth & Development",
      description: "Advance your career while making a positive impact",
      features: [
        "Professional development programs",
        "Mentorship and training opportunities",
        "Career advancement pathways"
      ]
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-600" />,
      title: "Supportive Environment",
      description: "Work in a collaborative and inclusive team culture",
      features: [
        "Flexible work arrangements",
        "Inclusive and diverse workplace"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-emerald-300 rounded-full opacity-60"></div>
          <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-blue-300 rounded-full opacity-40"></div>
          <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-purple-300 rounded-full opacity-50"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-emerald-200 shadow-lg mb-8">
              <Briefcase className="h-5 w-5 text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-800 tracking-wide">Join Our Mission</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-8">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-green-600 to-blue-700 drop-shadow-lg">
                Build Your Career
              </span>
              <span className="block text-gray-900 text-4xl lg:text-5xl mt-4 font-bold">
                With Purpose
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto mb-12">
              Join our dedicated team working to transform rural communities through sustainable development, innovative agricultural programs, and community empowerment initiatives.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                size="lg"
                className="group bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                onClick={() => document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="flex items-center gap-2">
                  View Open Positions
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="group border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-4 rounded-xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                onClick={() => document.getElementById('how-to-apply')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="flex items-center gap-2">
                  <Target className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  Learn How to Apply
                </span>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">10+</div>
                <div className="text-sm text-gray-600 font-medium">Team Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                <div className="text-sm text-gray-600 font-medium">Remote/Onsite Friendly</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">{jobPositions.length}</div>
                <div className="text-sm text-gray-600 font-medium">Open Positions</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="open-positions" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 mb-6 group cursor-default shadow-sm">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Exciting Opportunities</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              <span className="text-gray-900">Open </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600">
                Positions
              </span>
            </h2>

            <div className="w-24 h-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 mx-auto rounded-full mb-8"></div>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
              Join our team and make a difference in rural communities across India. Find the perfect role that matches your skills and passion.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-12 p-6 bg-gray-50 rounded-2xl">
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Departments">All Departments</SelectItem>
                <SelectItem value="Programs">Programs</SelectItem>
                <SelectItem value="Agriculture">Agriculture</SelectItem>
                <SelectItem value="Community Development">Community Development</SelectItem>
                <SelectItem value="Communications">Communications</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Types">All Types</SelectItem>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Internship">Internship</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Locations">All Locations</SelectItem>
                <SelectItem value="Remote/Onsite">Remote/Onsite Friendly</SelectItem>
                <SelectItem value="Pakur, Jharkhand">Pakur, Jharkhand</SelectItem>
                <SelectItem value="Kolkata, West Bengal">Kolkata, West Bengal</SelectItem>
                <SelectItem value="Multiple Locations">Multiple Locations</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="text-gray-600">
              Clear Filters
            </Button>
          </div>

          {/* Job Listings */}
          <div className="space-y-6 mb-12">
            {filteredPositions.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-emerald-500">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-2xl font-bold text-gray-900">{job.title}</h3>
                        {job.urgent && (
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                            Urgent
                          </Badge>
                        )}
                        {job.remote && (
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                            Remote/Onsite
                          </Badge>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" />
                          {job.department}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPinIcon className="h-4 w-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {job.type}
                        </div>

                      </div>

                      <p className="text-gray-700 mb-4">{job.description}</p>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{job.experience}</span>
                        <span>Posted {job.posted}</span>
                      </div>
                    </div>

                    <div className="lg:ml-8">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full lg:w-auto bg-emerald-600 hover:bg-emerald-700">
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="border-emerald-200 text-emerald-700 bg-emerald-50">{job.department}</Badge>
                              {job.urgent && <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-0">Urgent</Badge>}
                            </div>
                            <DialogTitle className="text-2xl font-bold text-gray-900">{job.title}</DialogTitle>
                            <DialogDescription className="text-gray-500 flex flex-wrap gap-x-4 gap-y-2 mt-2">
                              <span className="flex items-center gap-1"><MapPinIcon className="h-4 w-4" /> {job.location}</span>
                              <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {job.type}</span>
                            </DialogDescription>
                          </DialogHeader>

                          <div className="space-y-6 py-4">
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">About the Role</h4>
                              {job.fullDescription ? (
                                <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                                  {job.fullDescription}
                                </div>
                              ) : (
                                <p className="text-gray-600 leading-relaxed">{job.description}</p>
                              )}
                            </div>

                            {job.skills && (
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-2">Key Highlights & Requirements</h4>
                                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                                  {job.skills.map((skill, idx) => (
                                    <li key={idx}>{skill}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2">Job Details</h4>
                              <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm text-gray-600">
                                <p><span className="font-medium text-gray-900">Experience/Eligibility:</span> {job.experience}</p>
                                <p><span className="font-medium text-gray-900">Location:</span> {job.location}</p>
                                <p><span className="font-medium text-gray-900">Type:</span> {job.type}</p>
                              </div>
                            </div>

                            {(job.applyForm || job.applyEmail) && (
                              <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                                <h4 className="font-bold text-emerald-900 mb-4 flex items-center gap-2">
                                  <Send className="h-5 w-5" />
                                  How to Apply
                                </h4>
                                <div className="space-y-4">
                                  {job.applyForm && (
                                    <div className="flex flex-col gap-2">
                                      <p className="text-sm text-emerald-800">Fill out the official Google Form:</p>
                                      <a
                                        href={job.applyForm}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-emerald-700 font-bold hover:underline break-all"
                                      >
                                        {job.applyForm}
                                        <ExternalLink className="h-4 w-4" />
                                      </a>
                                    </div>
                                  )}
                                  {job.applyEmail && (
                                    <div className="flex flex-col gap-2">
                                      <p className="text-sm text-emerald-800">Or send your CV to:</p>
                                      <a
                                        href={`mailto:${job.applyEmail}`}
                                        className="inline-flex items-center gap-2 text-emerald-700 font-bold hover:underline"
                                      >
                                        {job.applyEmail}
                                        <Mail className="h-4 w-4" />
                                      </a>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="flex justify-end gap-3 pt-4 border-t">
                            <Button className="bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto" onClick={() => {
                              document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
                            }}>
                              Apply via Website
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>


        </div>
      </section>

      {/* How to Apply Section */}
      <section id="how-to-apply" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-100 mb-6 group cursor-default shadow-sm">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">Joining HAPEF</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              <span className="text-gray-900">How to </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                Apply
              </span>
            </h2>

            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-8"></div>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
              Our application process is designed to be simple and transparent. Follow these steps to join our team and make a difference.
            </p>
          </div>

          {/* Application Process */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-gray-900 mb-12 text-center relative inline-block w-full">
              <span className="relative z-10">Application Process</span>
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-emerald-100 -mb-2 rounded-full"></span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {applicationSteps.map((step, index) => (
                <div key={step.step} className="text-center relative">
                  {index < applicationSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-emerald-200 transform -translate-y-1/2 z-0"></div>
                  )}
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                      {step.step}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h4>
                    <p className="text-sm text-emerald-600 font-medium mb-2">{step.duration}</p>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Application Tips */}
          <div className="relative mt-20">
            {/* Background Accent */}
            <div className="absolute inset-0 bg-emerald-600/5 rounded-[3rem] -rotate-1 transform -z-10"></div>

            <div className="bg-white/80 backdrop-blur-md rounded-[2.5rem] p-12 shadow-2xl border border-emerald-100/50">
              <div className="flex flex-col items-center text-center gap-6 mb-12">
                <div className="bg-emerald-100/50 p-4 rounded-2xl w-fit">
                  <Heart className="h-8 w-8 text-emerald-600 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-4xl font-extrabold mb-3 tracking-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-green-600 to-blue-600">
                      Application Tips
                    </span>
                  </h3>
                  <div className="w-20 h-1 bg-gradient-to-r from-emerald-600 to-blue-600 mx-auto rounded-full mb-4"></div>
                  <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
                    Follow these insights to make your application truly stand out
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {applicationTips.map((tip, index) => (
                  <div
                    key={index}
                    className="group flex items-start gap-5 p-6 rounded-2xl bg-white border border-transparent hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-600 transition-all duration-300">
                      <CheckCircle className="h-6 w-6 text-emerald-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1 group-hover:text-emerald-700 transition-colors">
                        Tip #{index + 1}
                      </h4>
                      <p className="text-gray-700 leading-relaxed font-light">
                        {tip}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Quick Application Form */}
      <section id="application-form" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full border border-purple-100 mb-6 group cursor-default shadow-sm">
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-bold text-purple-700 uppercase tracking-widest">Begin Your Journey</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              <span className="text-gray-900">Quick </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">
                Application
              </span>
            </h2>

            <div className="w-24 h-1.5 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full mb-8"></div>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
              Start your application process by filling out this form. We look forward to hearing from you!
            </p>
          </div>

          <Card className="shadow-xl">
            <CardContent className="p-8">
              {isSuccess ? (
                <div className="py-12 flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
                  <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-8">
                    <CheckCircle2 className="h-12 w-12 text-emerald-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Application Received!</h3>
                  <p className="text-xl text-gray-600 mb-10 max-w-md">
                    Thank you for your interest in joining HAPEF. Our HR team will review your application and get in touch if your profile matches our requirements.
                  </p>
                  <Button
                    onClick={() => {
                      setIsSuccess(false)
                      setFormFileName("")
                    }}
                    className="rounded-full bg-emerald-600 hover:bg-emerald-700 px-8 py-6 text-lg shadow-lg hover:shadow-emerald-500/25 transition-all"
                  >
                    Submit Another Application
                  </Button>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleApplicationSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        className="mt-1"
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        className="mt-1"
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        className="mt-1"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="mt-1"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="position" className="text-sm font-medium text-gray-700">
                        Position of Interest *
                      </Label>
                      <Select value={formPosition} onValueChange={setFormPosition}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select a position" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="development-internship-trainee">Development Internship Trainee</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="experience" className="text-sm font-medium text-gray-700">
                        Years of Experience *
                      </Label>
                      <Select value={formExperience} onValueChange={setFormExperience}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-1">0-1 years</SelectItem>
                          <SelectItem value="2-4">2-4 years</SelectItem>
                          <SelectItem value="5-8">5-8 years</SelectItem>
                          <SelectItem value="8+">8+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="resume" className="text-sm font-medium text-gray-700">
                      Resume/CV *
                    </Label>
                    <label
                      htmlFor="resume-upload"
                      className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-400 transition-colors cursor-pointer block bg-gray-50/50 hover:bg-white"
                    >
                      <input
                        id="resume-upload"
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) setFormFileName(file.name)
                        }}
                      />
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      {formFileName ? (
                        <p className="text-sm text-emerald-600 font-medium break-all">{formFileName}</p>
                      ) : (
                        <>
                          <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                          <p className="text-xs text-gray-500">PDF, DOC, or DOCX (max 5MB)</p>
                        </>
                      )}
                    </label>
                  </div>

                  <div>
                    <Label htmlFor="coverLetter" className="text-sm font-medium text-gray-700">
                      Cover Letter
                    </Label>
                    <Textarea
                      id="coverLetter"
                      name="coverLetter"
                      className="mt-1"
                      rows={4}
                      placeholder="Tell us why you're interested in this position and how you can contribute to our mission..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="portfolio" className="text-sm font-medium text-gray-700">
                      Portfolio/Website (Optional)
                    </Label>
                    <Input
                      id="portfolio"
                      name="portfolio"
                      type="url"
                      className="mt-1"
                      placeholder="https://your-portfolio.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="hearAbout" className="text-sm font-medium text-gray-700">
                      How did you hear about us?
                    </Label>
                    <Select value={formSource} onValueChange={setFormSource}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="website">Our Website</SelectItem>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="indeed">Indeed</SelectItem>
                        <SelectItem value="referral">Employee Referral</SelectItem>
                        <SelectItem value="social">Social Media</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 text-lg disabled:opacity-70 group"
                  >
                    {isSubmitting ? (
                      <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        Submit Application
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    By submitting this application, you agree to our privacy policy and consent to being contacted regarding your application.
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 mb-6 group cursor-default shadow-sm">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">Impact with HAPEF</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              <span className="text-gray-900">Join Our </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-blue-600 to-indigo-600">
                Mission
              </span>
            </h2>

            <div className="w-24 h-1.5 bg-gradient-to-r from-emerald-600 to-indigo-600 mx-auto rounded-full mb-8"></div>

            <h3 className="text-2xl font-semibold text-emerald-800 mb-6 tracking-tight">
              Ready to Make a Difference?
            </h3>

            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
              Join our dedicated team and help us transform rural communities through sustainable development, innovative programs, and community empowerment initiatives.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    {benefit.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                  <p className="text-gray-600 mb-6">{benefit.description}</p>
                  <ul className="space-y-2">
                    {benefit.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4"
                onClick={() => document.getElementById('open-positions')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Open Positions
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-4"
                onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start Application
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Have Questions?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              Our HR team is here to help. Reach out to us for any questions about our positions, application process, or working at HAPEF.
            </p>
            <Link href="/contact">
              <Button size="lg" className="rounded-full bg-emerald-600 hover:bg-emerald-700 px-10 py-6 text-lg shadow-lg hover:shadow-emerald-500/25 transition-all">
                Contact Us Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
                <p className="text-emerald-600 font-medium">info.hapef@gmail.com</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
                <p className="text-blue-600 font-medium">+91 8240374731</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Visit Us</h3>
                <p className="text-purple-600 font-medium">Kolkata, West Bengal</p>
              </CardContent>
            </Card>
          </div>

          {/* Social Media */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Follow us for updates</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Stay connected with us on social media to get the latest updates about new positions, team events, and our impact in rural communities.
            </p>

            <div className="flex justify-center space-x-4">
              <a
                href="https://www.facebook.com/people/Humanitarian-Aid-for-Poverty-Eradication-Foundation/100090807904220/?rdid=Yz6pCIqxdXM67v69&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1BqzZw9X6B%2F"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6 text-blue-600" />
              </a>
              <a href="#" className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors">
                <Twitter className="w-6 h-6 text-blue-600" />
              </a>
              <a href="#" className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center hover:bg-pink-200 transition-colors">
                <Instagram className="w-6 h-6 text-pink-600" />
              </a>
              <a
                href="https://www.linkedin.com/company/humanitarian-aid-for-poverty-eradication-foundation/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6 text-blue-600" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}