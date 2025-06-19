"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// Grade points mapping
const gradePoints = {
  O: 10,
  "A+": 9,
  A: 8,
  "B+": 7,
  B: 6,
  C: 5,
  RA: 0,
} as const

type Grade = keyof typeof gradePoints
type CourseType = "Core" | "Elective" | "Audit Course" | "Mandatory Course"

interface Course {
  code: string
  name: string
  credits: number
  type: CourseType
}

interface Semester {
  semester: number
  title: string
  courses: Course[]
}

// Course data for each semester
const semesterData: Semester[] = [
  {
    semester: 1,
    title: "Semester I",
    courses: [
      { code: "U18EEI1201", name: "BASIC ELECTRICAL AND ELECTRONICS ENGINEERING", credits: 4, type: "Core" },
      { code: "U18PHI1202", name: "ENGINEERING PHYSICS", credits: 4, type: "Core" },
      { code: "U18MAI1202", name: "LINEAR ALGEBRA AND CALCULUS", credits: 4, type: "Core" },
      { code: "U18CSI1201", name: "STRUCTURED PROGRAMMING USING C", credits: 4, type: "Core" },
      { code: "U18INI1600", name: "ENGINEERING CLINIC -I", credits: 3, type: "Core" },
      { code: "U18TLR1001", name: "HERITAGE OF TAMILS", credits: 1, type: "Core" },
      { code: "U18CSR1001", name: "DISRUPTIVE TECHNOLOGIES", credits: 2, type: "Audit Course" },
      // Language elective - student chooses one
      { code: "U18JAI2201", name: "JAPANESE LEVEL I", credits: 3, type: "Elective" },
      { code: "U18HII2201", name: "HINDI LEVEL I", credits: 3, type: "Elective" },
      { code: "U18GEI2201", name: "GERMAN LEVEL I", credits: 3, type: "Elective" },
      { code: "U18FRI2201", name: "FRENCH LEVEL I", credits: 3, type: "Elective" },
    ],
  },
  {
    semester: 2,
    title: "Semester II",
    courses: [
      { code: "U18MAI2201", name: "ADVANCED CALCULUS AND LAPLACE TRANSFORMS", credits: 4, type: "Core" },
      { code: "U18CSI2202", name: "DIGITAL LOGIC AND MICROPROCESSOR", credits: 4, type: "Core" },
      { code: "U18BTI2201", name: "COMPUTATIONAL BIOLOGY", credits: 4, type: "Core" },
      { code: "U18INI2600", name: "ENGINEERING CLINIC -II", credits: 3, type: "Core" },
      { code: "U18CSI2201", name: "PYTHON PROGRAMMING", credits: 3, type: "Core" },
      { code: "U18ENI0202", name: "PROFESSIONAL COMMUNICATION", credits: 3, type: "Core" },
      { code: "U18TLR2001", name: "TAMILS AND TECHNOLOGY", credits: 1, type: "Core" },
      { code: "U18MAR0003", name: "TECH FOR GOOD: ACHIEVING THE SDGs BY THE ROLE OF ICT", credits: 2, type: "Audit Course" },
      { code: "U18PED0001", name: "PHYSICAL EDUCATION", credits: 0, type: "Mandatory Course" },
      { code: "U17MENTOR-1", name: "U17MENTOR-1", credits: 0, type: "Mandatory Course" },
    ],
  },
  {
    semester: 3,
    title: "Semester III",
    courses: [
      { code: "U18MAT3102", name: "DISCRETE MATHEMATICS", credits: 4, type: "Core" },
      { code: "U18CSI3201", name: "DATA STRUCTURES", credits: 4, type: "Core" },
      { code: "U18CSI3202", name: "OBJECT ORIENTED PROGRAMMING", credits: 4, type: "Core" },
      { code: "U18CSI3204", name: "DATABASE MANAGEMENT SYSTEMS", credits: 4, type: "Core" },
      { code: "U18CSI6201", name: "INTERNET AND WEB PROGRAMMING", credits: 4, type: "Core" },
      { code: "U18CST3003", name: "COMPUTER ARCHITECTURE", credits: 3, type: "Core" },
      { code: "U18INI3600", name: "ENGINEERING CLINIC -III", credits: 3, type: "Core" },
    ],
  },
  {
    semester: 4,
    title: "Semester IV",
    courses: [
      { code: "U18CSI2202", name: "DIGITAL LOGIC AND MICROPROCESSOR", credits: 4, type: "Core" },
      { code: "U18MAI4201", name: "PROBABILITY AND STATISTICS", credits: 4, type: "Core" },
      { code: "U18CSI4202", name: "OPERATING SYSTEMS", credits: 4, type: "Core" },
      { code: "U18CSI4204", name: "SOFTWARE ENGINEERING", credits: 4, type: "Core" },
      { code: "U18CSI5201", name: "Computer Networks", credits: 4, type: "Core" },
      { code: "U18CSI5203", name: "No SQL databases", credits: 4, type: "Core" },
      { code: "U18CST4001", name: "DESIGN AND ANALYSIS OF ALGORITHMS", credits: 3, type: "Core" },
      { code: "U18INI4600", name: "ENGINEERING CLINIC-IV", credits: 3, type: "Core" },
    ],
  },
]

export default function CGPACalculator() {
  const [grades, setGrades] = useState<Record<string, Grade>>({})

  const handleGradeChange = (courseCode: string, grade: Grade) => {
    setGrades((prev) => ({
      ...prev,
      [courseCode]: grade,
    }))
  }

  const calculateSGPA = (semester: Semester) => {
    let totalCredits = 0
    let totalGradePoints = 0

    semester.courses.forEach((course) => {
      // Skip audit courses and mandatory courses in GPA calculation
      if (course.type === "Audit Course" || course.type === "Mandatory Course") return

      const grade = grades[course.code]
      if (grade) {
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
        // Skip audit courses and mandatory courses in GPA calculation
        if (course.type === "Audit Course" || course.type === "Mandatory Course") return

        const grade = grades[course.code]
        if (grade) {
          totalCredits += course.credits
          totalGradePoints += gradePoints[grade] * course.credits
        }
      })
    })

    return totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : "0.00"
  }, [grades])

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
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">CGPA Calculator</h1>
            <p className="text-gray-600 mt-2">KCT Style - Calculate your Semester GPA and Cumulative GPA</p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Semester Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {semesterData.map((semester) => (
            <Card key={semester.semester} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
                <CardTitle className="text-xl font-semibold">{semester.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {semester.courses.map((course) => (
                    <div
                      key={course.code}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{course.code}</p>
                        <p className="text-sm text-gray-600 truncate">{course.name}</p>
                        <div className="mt-1 space-x-2">
                          <Badge variant="secondary" className="text-xs">
                            {course.credits} Credits
                          </Badge>
                          <Badge variant="secondary" className={`text-xs ${getTypeColor(course.type)}`}>
                            {course.type}
                          </Badge>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <Select
                          value={grades[course.code] || ""}
                          onValueChange={(value) => handleGradeChange(course.code, value as Grade)}
                        >
                          <SelectTrigger className="w-20 h-10">
                            <SelectValue placeholder="Grade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="O">O</SelectItem>
                            <SelectItem value="A+">A+</SelectItem>
                            <SelectItem value="A">A</SelectItem>
                            <SelectItem value="B+">B+</SelectItem>
                            <SelectItem value="B">B</SelectItem>
                            <SelectItem value="C">C</SelectItem>
                            <SelectItem value="RA">RA</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}
                </div>

                {/* SGPA Display */}
                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Semester GPA:</span>
                    <span className="text-2xl font-bold text-green-600">{calculateSGPA(semester)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CGPA Display */}
        <Card className="bg-white shadow-xl border-2 border-blue-200">
          <CardContent className="p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Overall CGPA</h2>
              <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg">
                <span className="text-4xl font-bold text-white">{calculateCGPA}</span>
              </div>
              <p className="text-gray-600 mt-4">Cumulative Grade Point Average</p>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 CGPA Calculator - KCT Style. Built for academic excellence.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
