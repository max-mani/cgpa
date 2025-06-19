"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

import { Code2, Cpu, Database, GraduationCap, Calculator, BookOpen } from "lucide-react"
import Image from "next/image"

// Grade points mapping
const gradePoints = {
  O: 10,
  "A+": 9,
  A: 8,
  "B+": 7,
  B: 6,
  C: 5,
  RA: 0,
  "NOT_GRADED": null,
} as const

type Grade = keyof typeof gradePoints
type ValidGrade = Exclude<Grade, "NOT_GRADED">

const isValidGrade = (grade: Grade): grade is ValidGrade => {
  return grade !== "NOT_GRADED"
}

type CourseType = "Core" | "Elective" | "Audit Course" | "Mandatory Course"
type SubjectRequirement = "Embedded TL - 3+1" | "Embedded TL - 2+1" | "Theory" | "Practical" | "Project" | "Non Academic"

interface Course {
  code: string
  name: string
  credits: number
  type: CourseType
  requirement: SubjectRequirement
}

// CSE Course data for KCT
const semesterData = [
  {
    semester: 1,
    title: "Semester I",
    icon: <GraduationCap className="w-5 h-5" />,
    color: "from-slate-700 to-slate-800",
    courses: [
      { code: "U18EEI1201", name: "BASIC ELECTRICAL AND ELECTRONICS ENGINEERING", credits: 4, type: "Core", requirement: "Embedded TL - 3+1" },
      { code: "U18PHI1202", name: "ENGINEERING PHYSICS", credits: 4, type: "Core", requirement: "Embedded TL - 3+1" },
      { code: "U18MAI1202", name: "LINEAR ALGEBRA AND CALCULUS", credits: 4, type: "Core", requirement: "Embedded TL - 3+1" },
      { code: "U18CSI1201", name: "STRUCTURED PROGRAMMING USING C", credits: 4, type: "Core", requirement: "Embedded TL - 3+1" },
      { code: "U18INI1600", name: "ENGINEERING CLINIC -I", credits: 3, type: "Core", requirement: "Practical" },
      { code: "U18TLR1001", name: "HERITAGE OF TAMILS", credits: 1, type: "Core", requirement: "Theory" },
      { code: "U18CSR1001", name: "DISRUPTIVE TECHNOLOGIES", credits: 2, type: "Audit Course", requirement: "Theory" },
      // Language electives
      { code: "U18JAI2201", name: "JAPANESE LEVEL I", credits: 3, type: "Elective", requirement: "Theory" },
      { code: "U18HII2201", name: "HINDI LEVEL I", credits: 3, type: "Elective", requirement: "Theory" },
      { code: "U18GEI2201", name: "GERMAN LEVEL I", credits: 3, type: "Elective", requirement: "Theory" },
      { code: "U18FRI2201", name: "FRENCH LEVEL I", credits: 3, type: "Elective", requirement: "Theory" },
    ],
  },
  {
    semester: 2,
    title: "Semester II",
    icon: <Code2 className="w-5 h-5" />,
    color: "from-slate-600 to-slate-700",
    courses: [
      { code: "U18MAI2201", name: "ADVANCED CALCULUS AND LAPLACE TRANSFORMS", credits: 4, type: "Core", requirement: "Embedded TL - 3+1" },
      { code: "U18CSI2202", name: "DIGITAL LOGIC AND MICROPROCESSOR", credits: 4, type: "Core", requirement: "Embedded TL - 3+1" },
      { code: "U18BTI2201", name: "COMPUTATIONAL BIOLOGY", credits: 4, type: "Core", requirement: "Embedded TL - 3+1" },
      { code: "U18INI2600", name: "ENGINEERING CLINIC -II", credits: 3, type: "Core", requirement: "Practical" },
      { code: "U18CSI2201", name: "PYTHON PROGRAMMING", credits: 3, type: "Core", requirement: "Embedded TL - 2+1" },
      { code: "U18ENI0202", name: "PROFESSIONAL COMMUNICATION", credits: 3, type: "Core", requirement: "Embedded TL - 2+1" },
      { code: "U18TLR2001", name: "TAMILS AND TECHNOLOGY", credits: 1, type: "Core", requirement: "Theory" },
      { code: "U18MAR0003", name: "TECH FOR GOOD: ACHIEVING THE SDGs BY THE ROLE OF ICT", credits: 2, type: "Audit Course", requirement: "Theory" },
      { code: "U18PED0001", name: "PHYSICAL EDUCATION", credits: 0, type: "Mandatory Course", requirement: "Non Academic" },
      { code: "U17MENTOR-1", name: "U17MENTOR-1", credits: 0, type: "Mandatory Course", requirement: "Non Academic" },
    ],
  },
  {
    semester: 3,
    title: "Semester III",
    icon: <Database className="w-5 h-5" />,
    color: "from-slate-800 to-slate-900",
    courses: [
      { code: "U18MAT3102", name: "DISCRETE MATHEMATICS", credits: 4, type: "Core", requirement: "Theory" },
      { code: "U18CSI3201", name: "DATA STRUCTURES", credits: 4, type: "Core", requirement: "Embedded TL - 3+1" },
      { code: "U18CSI3202", name: "OBJECT ORIENTED PROGRAMMING", credits: 4, type: "Core", requirement: "Embedded TL - 3+1" },
      { code: "U18CSI3204", name: "DATABASE MANAGEMENT SYSTEMS", credits: 4, type: "Core", requirement: "Embedded TL - 3+1" },
      { code: "U18CSI6201", name: "INTERNET AND WEB PROGRAMMING", credits: 4, type: "Core", requirement: "Embedded TL - 3+1" },
      { code: "U18CST3003", name: "COMPUTER ARCHITECTURE", credits: 3, type: "Core", requirement: "Theory" },
      { code: "U18INI3600", name: "ENGINEERING CLINIC -III", credits: 3, type: "Core", requirement: "Project" },
    ],
  },
  {
    semester: 4,
    title: "Semester IV",
    icon: <Cpu className="w-5 h-5" />,
    color: "from-slate-700 to-slate-800",
    courses: [
      { code: "U18CSI2202", name: "DIGITAL LOGIC AND MICROPROCESSOR", credits: 4, type: "Core", requirement: "Embedded TL - 3+1" },
      { code: "U18MAI4201", name: "PROBABILITY AND STATISTICS", credits: 4, type: "Core", requirement: "Embedded TL - 3+1" },
      { code: "U18CSI4202", name: "OPERATING SYSTEMS", credits: 4, type: "Core", requirement: "Embedded TL - 3+1" },
      { code: "U18CSI4204", name: "SOFTWARE ENGINEERING", credits: 4, type: "Core", requirement: "Embedded TL - 3+1" },
      { code: "U18CSI5201", name: "Computer Networks", credits: 4, type: "Core", requirement: "Embedded TL - 3+1" },
      { code: "U18CSI5203", name: "No SQL databases", credits: 4, type: "Core", requirement: "Embedded TL - 3+1" },
      { code: "U18CST4001", name: "DESIGN AND ANALYSIS OF ALGORITHMS", credits: 3, type: "Core", requirement: "Theory" },
      { code: "U18INI4600", name: "ENGINEERING CLINIC-IV", credits: 3, type: "Core", requirement: "Practical" },
    ],
  },
]

const getTypeColor = (type: CourseType) => {
  switch (type) {
    case "Core":
      return "bg-blue-100 text-blue-800"
    case "Elective":
      return "bg-purple-100 text-purple-800"
    case "Audit Course":
      return "bg-amber-100 text-amber-800"
    case "Mandatory Course":
      return "bg-gray-100 text-gray-800"
  }
}

const getRequirementColor = (requirement: SubjectRequirement) => {
  switch (requirement) {
    case "Embedded TL - 3+1":
      return "bg-green-100 text-green-800"
    case "Embedded TL - 2+1":
      return "bg-emerald-100 text-emerald-800"
    case "Theory":
      return "bg-sky-100 text-sky-800"
    case "Practical":
      return "bg-indigo-100 text-indigo-800"
    case "Project":
      return "bg-violet-100 text-violet-800"
    case "Non Academic":
      return "bg-slate-100 text-slate-800"
  }
}

export default function KCTCSECGPACalculator() {
  const [grades, setGrades] = useState<Record<string, Grade>>({})

  const handleGradeChange = (courseCode: string, grade: Grade) => {
    setGrades((prev) => ({
      ...prev,
      [courseCode]: grade,
    }))
  }

  const calculateSGPA = (semester: (typeof semesterData)[0]) => {
    let totalCredits = 0
    let totalGradePoints = 0

    semester.courses.forEach((course) => {
      // Skip audit courses, mandatory courses, and not graded courses
      if (course.type === "Audit Course" || course.type === "Mandatory Course") return
      
      const grade = grades[course.code]
      if (grade && isValidGrade(grade)) {
        totalCredits += course.credits
        totalGradePoints += gradePoints[grade] * course.credits
      }
    })

    return totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : "0.00"
  }

  const calculateCGPA = useMemo(() => {
    let totalCredits = 0
    let totalGradePoints = 0

    semesterData.forEach((semester) => {
      semester.courses.forEach((course) => {
        // Skip audit courses, mandatory courses, and not graded courses
        if (course.type === "Audit Course" || course.type === "Mandatory Course") return

        const grade = grades[course.code]
        if (grade && isValidGrade(grade)) {
          totalCredits += course.credits
          totalGradePoints += gradePoints[grade] * course.credits
        }
      })
    })

    return totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : "0.00"
  }, [grades])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-100 to-slate-200">
      {/* Header with KCT Logo */}
      <header>
        <div className="relative z-20 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">              <div className="flex items-center space-x-4">
                {/* KCT LOGO */}
                <div className="w-16 h-16 relative">
                  <Image
                    src="/images/kct-logo.jpeg"
                    alt="Kumaraguru College of Technology Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-800">CGPA Calculator</h1>
                  <p className="text-slate-600 text-sm md:text-base">KCT - Computer Science & Engineering</p>
                  <p className="text-slate-500 text-xs italic">{"Character is life"}</p>
                </div>
              </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {semesterData.map((semester, index) => (
            <Card
              key={semester.semester}
              className="bg-white/95 backdrop-blur-sm border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] group"
            >
              <CardHeader className={`bg-gradient-to-r ${semester.color} text-white rounded-t-lg relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10"></div>
                <CardTitle className="text-xl font-bold flex items-center space-x-3 relative z-10">
                  {semester.icon}
                  <span>{semester.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {semester.courses.map((course) => (
                  <div
                    key={course.code}
                    className="flex flex-col space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-slate-100 transition-all duration-300"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-800">{course.code}</p>
                      <p className="text-sm text-slate-600 line-clamp-2">{course.name}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {course.credits} Credits
                        </Badge>
                        <Badge variant="secondary" className={`text-xs ${getTypeColor(course.type)}`}>
                          {course.type}
                        </Badge>
                        <Badge variant="secondary" className={`text-xs ${getRequirementColor(course.requirement)}`}>
                          {course.requirement}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <Select
                        value={grades[course.code] || "NOT_GRADED"}
                        onValueChange={(value: Grade) => {
                          if (value === "NOT_GRADED") {
                            const newGrades = { ...grades }
                            delete newGrades[course.code]
                            setGrades(newGrades)
                          } else {
                            handleGradeChange(course.code, value)
                          }
                        }}
                      >
                        <SelectTrigger className="w-full h-10 bg-white border-slate-300 focus:ring-slate-400">
                          <SelectValue>
                            {grades[course.code] ? (
                              <span className={`font-medium ${
                                grades[course.code] === "O" ? "text-green-600" :
                                grades[course.code] === "A+" ? "text-blue-600" :
                                grades[course.code] === "A" ? "text-blue-500" :
                                grades[course.code] === "B+" ? "text-yellow-600" :
                                grades[course.code] === "B" ? "text-yellow-500" :
                                grades[course.code] === "C" ? "text-orange-500" :
                                grades[course.code] === "RA" ? "text-red-500" :
                                "text-slate-400"
                              }`}>
                                {grades[course.code]}
                              </span>
                            ) : (
                              <span className="text-slate-400">Grade</span>
                            )}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent className="bg-white border-2 border-slate-200 shadow-lg">
                          <SelectItem value="NOT_GRADED" className="hover:bg-slate-100 focus:bg-slate-100 cursor-pointer font-medium">
                            <span className="text-slate-400">Not Graded</span> <span className="text-slate-400">(N/A)</span>
                          </SelectItem>
                          <SelectItem value="O" className="hover:bg-slate-100 focus:bg-slate-100 cursor-pointer font-medium">
                            <span className="text-green-600">O</span> <span className="text-slate-600">(10)</span>
                          </SelectItem>
                          <SelectItem value="A+" className="hover:bg-slate-100 focus:bg-slate-100 cursor-pointer font-medium">
                            <span className="text-blue-600">A+</span> <span className="text-slate-600">(9)</span>
                          </SelectItem>
                          <SelectItem value="A" className="hover:bg-slate-100 focus:bg-slate-100 cursor-pointer font-medium">
                            <span className="text-blue-500">A</span> <span className="text-slate-600">(8)</span>
                          </SelectItem>
                          <SelectItem value="B+" className="hover:bg-slate-100 focus:bg-slate-100 cursor-pointer font-medium">
                            <span className="text-yellow-600">B+</span> <span className="text-slate-600">(7)</span>
                          </SelectItem>
                          <SelectItem value="B" className="hover:bg-slate-100 focus:bg-slate-100 cursor-pointer font-medium">
                            <span className="text-yellow-500">B</span> <span className="text-slate-600">(6)</span>
                          </SelectItem>
                          <SelectItem value="C" className="hover:bg-slate-100 focus:bg-slate-100 cursor-pointer font-medium">
                            <span className="text-orange-500">C</span> <span className="text-slate-600">(5)</span>
                          </SelectItem>
                          <SelectItem value="RA" className="hover:bg-slate-100 focus:bg-slate-100 cursor-pointer font-medium">
                            <span className="text-red-500">RA</span> <span className="text-slate-600">(0)</span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}

                {/* SGPA Display */}
                <div className="mt-6 p-4 bg-gradient-to-r from-slate-100 to-slate-50 backdrop-blur-sm rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600">Semester GPA:</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-slate-600 rounded-full animate-pulse"></div>
                      <span className="text-2xl font-bold text-slate-800">{calculateSGPA(semester)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 🎯 3D CGPA BACKGROUND - Place rotating academic symbols or KCT emblem here */}
        <Card className="bg-white/95 backdrop-blur-sm border border-slate-200 shadow-2xl relative overflow-hidden">
          <CardContent className="p-8 relative z-10">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center justify-center space-x-3">
                <Calculator className="w-8 h-8 text-slate-600" />
                <span>Overall CGPA</span>
              </h2>
              <div className="relative inline-block">
                <div className="w-40 h-40 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full shadow-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse"></div>
                  <span className="text-5xl font-bold text-white relative z-10">{calculateCGPA}</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-slate-600 rounded-full animate-bounce"></div>
              </div>
              <p className="text-slate-600 mt-6 text-lg">Cumulative Grade Point Average</p>
              <div className="mt-4 flex justify-center space-x-4 text-sm text-slate-500">
                <span>KCT CSE</span>
                <span>•</span>
                <span>Est. 1984</span>
                <span>•</span>
                <span>Character is life</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Grade Legend */}
        <Card className="bg-white/95 backdrop-blur-sm border border-slate-200 shadow-xl mt-8">
          <CardHeader className="border-b border-slate-200">
            <CardTitle className="text-xl font-semibold text-slate-800 flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>KCT Grading System</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-3">
                <h3 className="font-semibold text-slate-700 mb-2">Outstanding</h3>
                <div className="flex items-center space-x-2 p-2 bg-green-50 rounded-lg border border-green-100">
                  <span className="text-green-600 font-bold text-lg">O</span>
                  <span className="text-slate-600">=</span>
                  <span className="text-green-600 font-bold">10</span>
                  <span className="text-slate-500 text-sm">(90-100)</span>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-slate-700 mb-2">Excellent</h3>
                <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg border border-blue-100">
                  <span className="text-blue-600 font-bold text-lg">A+</span>
                  <span className="text-slate-600">=</span>
                  <span className="text-blue-600 font-bold">9</span>
                  <span className="text-slate-500 text-sm">(80-89)</span>
                </div>
                <div className="flex items-center space-x-2 p-2 bg-blue-50/70 rounded-lg border border-blue-100">
                  <span className="text-blue-500 font-bold text-lg">A</span>
                  <span className="text-slate-600">=</span>
                  <span className="text-blue-500 font-bold">8</span>
                  <span className="text-slate-500 text-sm">(70-79)</span>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-slate-700 mb-2">Good</h3>
                <div className="flex items-center space-x-2 p-2 bg-yellow-50 rounded-lg border border-yellow-100">
                  <span className="text-yellow-600 font-bold text-lg">B+</span>
                  <span className="text-slate-600">=</span>
                  <span className="text-yellow-600 font-bold">7</span>
                  <span className="text-slate-500 text-sm">(60-69)</span>
                </div>
                <div className="flex items-center space-x-2 p-2 bg-yellow-50/70 rounded-lg border border-yellow-100">
                  <span className="text-yellow-500 font-bold text-lg">B</span>
                  <span className="text-slate-600">=</span>
                  <span className="text-yellow-500 font-bold">6</span>
                  <span className="text-slate-500 text-sm">(50-59)</span>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-slate-700 mb-2">Average/Fail</h3>
                <div className="flex items-center space-x-2 p-2 bg-orange-50 rounded-lg border border-orange-100">
                  <span className="text-orange-500 font-bold text-lg">C</span>
                  <span className="text-slate-600">=</span>
                  <span className="text-orange-500 font-bold">5</span>
                  <span className="text-slate-500 text-sm">(40-49)</span>
                </div>
                <div className="flex items-center space-x-2 p-2 bg-red-50 rounded-lg border border-red-100">
                  <span className="text-red-500 font-bold text-lg">RA</span>
                  <span className="text-slate-600">=</span>
                  <span className="text-red-500 font-bold">0</span>
                  <span className="text-slate-500 text-sm">(&lt;40)</span>
                </div>
                <div className="flex items-center space-x-2 p-2 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-400 font-bold text-lg">-</span>
                  <span className="text-slate-400">=</span>
                  <span className="text-slate-400 font-bold">N/A</span>
                  <span className="text-slate-400 text-sm">(Not Graded)</span>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <h4 className="font-semibold text-slate-700 mb-2">Important Notes:</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• RA = Reappearance required for marks below 40</li>
                <li>• Grades are based on end semester examination (ESE) and continuous assessment (CA)</li>
                <li>• Minimum passing grade is 'C' (5 grade points)</li>
                <li>• For practical/project courses, minimum pass mark is 50%</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer with KCT Branding */}
      <footer className="relative z-10 bg-white/90 backdrop-blur-md border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-8 h-8 relative">
                <Image src="/images/kct-logo.jpeg" alt="KCT Logo" fill className="object-contain" />
              </div>
              <span className="text-slate-700 font-medium">Kumaraguru College of Technology</span>
            </div>
            <p className="text-slate-600 text-sm">
              &copy; {new Date().getFullYear()} CGPA Calculator - KCT CSE. Built with dedication for academic excellence.
            </p>
            <p className="text-slate-500 text-xs mt-2">Computer Science & Engineering Department • Character is life</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}
