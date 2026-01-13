"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

import { Code2, Cpu, Database, GraduationCap, Calculator, BookOpen, Cloud } from "lucide-react"
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
      { code: "U18EEI1201", name: "Basic Electrical and Electronics Engineering", credits: 4, type: "Core", requirement: "Embedded TL - 3+1" },
      { code: "U18PHI1202", name: "Engineering Physics", credits: 4, type: "Core", requirement: "Embedded TL - 3+1" },
      { code: "U18MAI1202", name: "Linear Algebra and Calculus", credits: 4, type: "Core", requirement: "Embedded TL - 3+1" },
      { code: "U18CSI1201", name: "Structured Programming using C", credits: 4, type: "Core", requirement: "Embedded TL - 3+1" },
      { code: "U18INI1600", name: "Engineering Clinic-I", credits: 3, type: "Core", requirement: "Practical" },
      { code: "U18CSR1001", name: "Disruptive Technologies", credits: 2, type: "Audit Course", requirement: "Theory" },
    ],
    languageElectives: [
      { code: "U18JAI2201", name: "Japanese Level I", credits: 3, type: "Elective", requirement: "Embedded TL - 3+1" },
      { code: "U18HII2201", name: "Hindi Level I", credits: 3, type: "Elective", requirement: "Embedded TL - 3+1" },
      { code: "U18GEI2201", name: "German Level I", credits: 3, type: "Elective", requirement: "Embedded TL - 3+1" },
      { code: "U18FRI2201", name: "French Level I", credits: 3, type: "Elective", requirement: "Embedded TL - 3+1" },
    ],
  },
  {
    semester: 2,
    title: "Semester II",
    icon: <Code2 className="w-5 h-5" />,
    color: "from-slate-600 to-slate-700",
    courses: [
      { code: "U18MAI2201", name: "Advanced Calculus and Laplace Transforms", credits: 4, type: "Core", requirement: "Embedded TL - 3+1" },
      { code: "U18CSI2202", name: "Digital Logic and Microprocessor", credits: 4, type: "Core", requirement: "Embedded TL - 3+1" },
      { code: "U18BTI2201", name: "Computational Biology", credits: 4, type: "Core", requirement: "Embedded TL - 3+1" },
      { code: "U18INI2600", name: "Engineering Clinic-II", credits: 3, type: "Core", requirement: "Practical" },
      { code: "U18CSI2201", name: "Python Programming", credits: 3, type: "Core", requirement: "Embedded TL - 3+1" },
      { code: "U18ENI0202", name: "Professional Communication", credits: 3, type: "Core", requirement: "Embedded TL - 3+1" },
    ],
  },
  {
    semester: 3,
    title: "Semester III",
    icon: <Database className="w-5 h-5" />,
    color: "from-slate-800 to-slate-900",
    courses: [
      { code: "U18CSI3201", name: "Data Structures", credits: 4, type: "Core", requirement: "Embedded TL - 3+1" },
      { code: "U18CSI3202", name: "Object Oriented Programming", credits: 4, type: "Core", requirement: "Embedded TL - 3+1" },
      { code: "U18CSI3204", name: "Database Management Systems", credits: 4, type: "Core", requirement: "Embedded TL - 3+1" },
      { code: "U18CSI6201", name: "Internet and Web Programming", credits: 4, type: "Core", requirement: "Embedded TL - 3+1" },
      { code: "U18CST3003", name: "Computer Architecture", credits: 3, type: "Core", requirement: "Theory" },
      { code: "U18INI3600", name: "Engineering Clinic-III", credits: 3, type: "Core", requirement: "Project" },
      { code: "U18MAT3102", name: "Discrete Mathematics", credits: 4, type: "Core", requirement: "Theory" },
    ],
  },
  {
    semester: 4,
    title: "Semester IV",
    icon: <Cpu className="w-5 h-5" />,
    color: "from-slate-700 to-slate-800",
    courses: [
      { code: "U18MAI4201", name: "Probability and Statistics", credits: 4, type: "Core", requirement: "Embedded TL - 3+1" },
      { code: "U18CSI4202", name: "Operating Systems", credits: 4, type: "Core", requirement: "Embedded TL - 3+1" },
      { code: "U18CSI4204", name: "Software Engineering", credits: 4, type: "Core", requirement: "Embedded TL - 3+1" },
      { code: "U18CSI5201", name: "Computer Networks", credits: 4, type: "Core", requirement: "Embedded TL - 3+1" },
      { code: "U18CSI5203", name: "No SQL Databases", credits: 4, type: "Core", requirement: "Embedded TL - 3+1" },
      { code: "U18CST4001", name: "Design and Analysis of Algorithms", credits: 3, type: "Core", requirement: "Theory" },
      { code: "U18INI4600", name: "Engineering Clinic-IV", credits: 3, type: "Core", requirement: "Practical" },
    ],
  },
  {
    semester: 5,
    title: "Semester V",
    icon: <Cloud className="w-5 h-5" />,
    color: "from-slate-600 to-slate-700",
    courses: [
      { code: "U18CSE1XXX", name: "Elective I", credits: 3, type: "Elective", requirement: "Theory" },
      { code: "U18CSE2XXX", name: "Elective II", credits: 3, type: "Elective", requirement: "Theory" },
      { code: "U18CSI6203", name: "Data Warehousing and Data Mining", credits: 4, type: "Core", requirement: "Embedded TL - 3+1" },
      { code: "U18CSI7201", name: "Cloud Computing", credits: 4, type: "Core", requirement: "Embedded TL - 3+1" },
      { code: "U18CST4003", name: "Theory of Computation", credits: 3, type: "Core", requirement: "Theory" },
      { code: "U18CST5002", name: "Agile Software Development", credits: 3, type: "Core", requirement: "Theory" },
      { code: "U18CST5004", name: "Social Media Marketing", credits: 3, type: "Core", requirement: "Theory" },
      { code: "U18CST6002", name: "Wireless Networks and Mobile Systems", credits: 3, type: "Core", requirement: "Theory" },
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
  const [selectedLanguage, setSelectedLanguage] = useState(
    Array.isArray(semesterData[0].languageElectives) && semesterData[0].languageElectives.length > 0
      ? semesterData[0].languageElectives[0].code
      : ""
  )
  const [courseData, setCourseData] = useState(semesterData)
  const [editingCourse, setEditingCourse] = useState<{ semesterIndex: number; courseIndex: number } | null>(null)
  const [editForm, setEditForm] = useState({
    code: "",
    name: "",
    credits: 0,
    type: "Core" as CourseType,
    requirement: "Theory" as SubjectRequirement,
  })

  const handleGradeChange = (courseCode: string, grade: Grade) => {
    setGrades((prev) => ({
      ...prev,
      [courseCode]: grade,
    }))
  }

  const addCourse = (semesterIndex: number) => {
    const newCourse = {
      code: `NEW${Date.now()}`,
      name: "New Course",
      credits: 3,
      type: "Core" as CourseType,
      requirement: "Theory" as SubjectRequirement,
    }
    setCourseData((prev) => {
      const updated = [...prev]
      updated[semesterIndex] = {
        ...updated[semesterIndex],
        courses: [...updated[semesterIndex].courses, newCourse],
      }
      return updated
    })
  }

  const deleteCourse = (semesterIndex: number, courseIndex: number) => {
    const courseCode = courseData[semesterIndex].courses[courseIndex].code
    setCourseData((prev) => {
      const updated = [...prev]
      updated[semesterIndex] = {
        ...updated[semesterIndex],
        courses: updated[semesterIndex].courses.filter((_, idx) => idx !== courseIndex),
      }
      return updated
    })
    setGrades((prev) => {
      const updated = { ...prev }
      delete updated[courseCode]
      return updated
    })
  }

  const startEditCourse = (semesterIndex: number, courseIndex: number) => {
    const course = courseData[semesterIndex].courses[courseIndex]
    setEditForm({
      code: course.code,
      name: course.name,
      credits: course.credits,
      type: course.type as CourseType,
      requirement: course.requirement as SubjectRequirement,
    })
    setEditingCourse({ semesterIndex, courseIndex })
  }
  const saveEditCourse = () => {
    if (!editingCourse) return
    const oldCourseCode = courseData[editingCourse.semesterIndex].courses[editingCourse.courseIndex].code
    setCourseData((prev) => {
      const updated = [...prev]
      updated[editingCourse.semesterIndex].courses[editingCourse.courseIndex] = {
        ...editForm,
        credits: Number(editForm.credits),
      }
      return updated
    })
    if (oldCourseCode !== editForm.code) {
      setGrades((prev) => {
        const updated = { ...prev }
        if (updated[oldCourseCode]) {
          updated[editForm.code] = updated[oldCourseCode]
          delete updated[oldCourseCode]
        }
        return updated
      })
    }
    setEditingCourse(null)
  }
  const cancelEdit = () => {
    setEditingCourse(null)
    setEditForm({ code: "", name: "", credits: 0, type: "Core", requirement: "Theory" })
  }

  const calculateSGPA = (semester: (typeof courseData)[0], semesterIdx?: number) => {
    let totalCredits = 0
    let totalGradePoints = 0
    let raCount = 0

    // For Semester 1, include the selected language elective if present
    if (semester.semester === 1 && Array.isArray(semester.languageElectives)) {
      const lang = semester.languageElectives.find(l => l.code === selectedLanguage)
      const langGrade = grades[selectedLanguage]
      if (lang && langGrade && isValidGrade(langGrade)) {
        if (langGrade === "RA") {
          raCount++
        } else {
          totalCredits += lang.credits
          totalGradePoints += gradePoints[langGrade] * lang.credits
        }
      }
    }

    semester.courses.forEach((course) => {
      // Skip only mandatory courses, not audit or RA
      if (course.type === "Mandatory Course") return
      const grade = grades[course.code]
      if (grade && isValidGrade(grade)) {
        if (grade === "RA") {
          raCount++
        } else {
          totalCredits += course.credits
          totalGradePoints += gradePoints[grade] * course.credits
        }
      }
    })

    return {
      sgpa: totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(4) : "0.0000",
      raCount,
    }
  }

  const calculateCGPA = useMemo(() => {
    let totalCredits = 0
    let totalGradePoints = 0
    let raCount = 0
    
    courseData.forEach((semester) => {
      // Include language electives for Semester 1
      if (semester.semester === 1 && Array.isArray(semester.languageElectives)) {
        const lang = semester.languageElectives.find(l => l.code === selectedLanguage)
        const langGrade = grades[selectedLanguage]
        if (lang && langGrade && isValidGrade(langGrade)) {
          if (langGrade === "RA") {
            raCount++
          } else {
            totalCredits += lang.credits
            totalGradePoints += gradePoints[langGrade] * lang.credits
          }
        }
      }
      
      // Include regular courses
      semester.courses.forEach((course) => {
        if (course.type === "Mandatory Course") return
        const grade = grades[course.code]
        if (grade && isValidGrade(grade)) {
          if (grade === "RA") raCount++
          totalCredits += course.credits
          totalGradePoints += gradePoints[grade] * course.credits
        }
      })
    })
    
    return {
      cgpa: totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(4) : "0.0000",
      raCount,
    }
  }, [grades, courseData, selectedLanguage])

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
          {courseData.map((semester, semesterIdx) => (
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
                {semester.semester === 1 && Array.isArray(semester.languageElectives) && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Language Elective</label>
                    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                      <SelectTrigger className="w-full h-10 bg-white border-slate-300 focus:ring-slate-400">
                        <SelectValue>
                          {semester.languageElectives?.find(l => l.code === selectedLanguage)?.name || "Select Language"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className="bg-white border-2 border-slate-200 shadow-lg">
                        {semester.languageElectives?.map(lang => (
                          <SelectItem key={lang.code} value={lang.code} className="hover:bg-slate-100 focus:bg-slate-100 cursor-pointer font-medium">
                            <span>{lang.name}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="mt-4 flex flex-col space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-800">{semester.languageElectives?.find(l => l.code === selectedLanguage)?.code}</p>
                        <p className="text-sm text-slate-600 line-clamp-2">{semester.languageElectives?.find(l => l.code === selectedLanguage)?.name}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <Badge variant="secondary" className="text-xs">{semester.languageElectives?.find(l => l.code === selectedLanguage)?.credits} Credits</Badge>
                          <Badge variant="secondary" className={`text-xs ${getTypeColor("Elective")}`}>Elective</Badge>
                          <Badge variant="secondary" className={`text-xs ${getRequirementColor("Theory")}`}>Theory</Badge>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <Select
                          value={grades[selectedLanguage] || "NOT_GRADED"}
                          onValueChange={(value: Grade) => {
                            if (value === "NOT_GRADED") {
                              const newGrades = { ...grades }
                              delete newGrades[selectedLanguage]
                              setGrades(newGrades)
                            } else {
                              handleGradeChange(selectedLanguage, value)
                            }
                          }}
                        >
                          <SelectTrigger className="w-full h-10 bg-white border-slate-300 focus:ring-slate-400">
                            <SelectValue>
                              {grades[selectedLanguage] ? (
                                <span className={`font-medium ${
                                  grades[selectedLanguage] === "O" ? "text-green-600" :
                                  grades[selectedLanguage] === "A+" ? "text-blue-600" :
                                  grades[selectedLanguage] === "A" ? "text-blue-500" :
                                  grades[selectedLanguage] === "B+" ? "text-yellow-600" :
                                  grades[selectedLanguage] === "B" ? "text-yellow-500" :
                                  grades[selectedLanguage] === "C" ? "text-orange-500" :
                                  grades[selectedLanguage] === "RA" ? "text-red-500" :
                                  "text-slate-400"
                                }`}>
                                  {grades[selectedLanguage]}
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
                  </div>
                )}
                {semester.courses.map((course, courseIdx) => (
                  <div key={course.code}>
                    {editingCourse?.semesterIndex === semesterIdx && editingCourse?.courseIndex === courseIdx ? (
                      <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200 space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-slate-700 mb-1">Course Code</label>
                            <input
                              type="text"
                              placeholder="Course Code"
                              value={editForm.code}
                              onChange={(e) => setEditForm((prev) => ({ ...prev, code: e.target.value }))}
                              className="px-3 py-2 border border-slate-300 rounded-lg text-sm w-full"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-slate-700 mb-1">Credits</label>
                            <input
                              type="number"
                              placeholder="Credits"
                              value={editForm.credits}
                              onChange={(e) => setEditForm((prev) => ({ ...prev, credits: Number(e.target.value) }))}
                              className="px-3 py-2 border border-slate-300 rounded-lg text-sm w-full"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">Course Name</label>
                          <input
                            type="text"
                            placeholder="Course Name"
                            value={editForm.name}
                            onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
                            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-slate-700 mb-1">Type</label>
                            <select
                              value={editForm.type}
                              onChange={(e) => setEditForm((prev) => ({ ...prev, type: e.target.value as CourseType }))}
                              className="px-3 py-2 border border-slate-300 rounded-lg text-sm w-full"
                            >
                              <option value="Core">Core</option>
                              <option value="Elective">Elective</option>
                              <option value="Audit Course">Audit Course</option>
                              <option value="Mandatory Course">Mandatory Course</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-slate-700 mb-1">Requirement</label>
                            <select
                              value={editForm.requirement}
                              onChange={(e) => setEditForm((prev) => ({ ...prev, requirement: e.target.value as SubjectRequirement }))}
                              className="px-3 py-2 border border-slate-300 rounded-lg text-sm w-full"
                            >
                              <option value="Embedded TL - 3+1">Embedded TL - 3+1</option>
                              <option value="Embedded TL - 2+1">Embedded TL - 2+1</option>
                              <option value="Theory">Theory</option>
                              <option value="Practical">Practical</option>
                              <option value="Project">Project</option>
                              <option value="Non Academic">Non Academic</option>
                            </select>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={saveEditCourse}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="px-4 py-2 bg-gray-500 text-white rounded-lg text-sm hover:bg-gray-600 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-slate-100 transition-all duration-300 group/course">
                        <div className="flex-1 min-w-0 mb-3 sm:mb-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <p className="text-sm font-bold text-slate-800 group-hover/course:text-slate-900 transition-colors">
                              {course.code}
                            </p>
                            <Badge variant="outline" className="text-xs bg-slate-100 text-slate-600">
                              {course.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 group-hover/course:text-slate-700 transition-colors line-clamp-2 mb-1">
                            {course.name}
                          </p>
                          <div className="flex items-center space-x-3">
                        <Badge variant="secondary" className="text-xs">
                          {course.credits} Credits
                        </Badge>
                        <Badge variant="secondary" className={`text-xs ${getRequirementColor(course.requirement as SubjectRequirement)}`}>
                          {course.requirement}
                        </Badge>
                      </div>
                    </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => startEditCourse(semesterIdx, courseIdx)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                            title="Edit Course"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => deleteCourse(semesterIdx, courseIdx)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                            title="Delete Course"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
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
                              <SelectTrigger className="w-full h-10 bg-white border-slate-300 focus:ring-slate-400 rounded-lg">
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
                              <SelectContent className="bg-white border-2 border-slate-200 shadow-lg rounded-lg">
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
                      </div>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => addCourse(semesterIdx)}
                  className="w-full p-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-600 hover:border-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="font-medium">Add Course</span>
                </button>
                <div className="mt-6 p-4 bg-gradient-to-r from-slate-100 to-slate-50 backdrop-blur-sm rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600">Semester GPA:</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-slate-600 rounded-full animate-pulse"></div>
                      <span className="text-2xl font-bold text-slate-800">{calculateSGPA(semester, semesterIdx).sgpa}</span>
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
                <div className="w-56 h-56 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full shadow-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse"></div>
                  <span className="text-4xl md:text-5xl font-bold text-white relative z-10 break-words text-center" style={{wordBreak: 'break-all'}}>{calculateCGPA.cgpa}</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-slate-600 rounded-full animate-bounce"></div>
              </div>
              <p className="text-slate-600 mt-6 text-lg">Cumulative Grade Point Average</p>
              {calculateCGPA.raCount > 0 && (
                <p className="text-red-600 mt-2 text-base font-semibold">RA Count: {calculateCGPA.raCount}</p>
              )}
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
            <p className="text-slate-500 text-xs mt-2">
              Made by <span className="font-semibold">ManiKandan M (23BCS082)</span> &bull; 
              <a href="https://manikandan-m-portfolio.netlify.app/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">Portfolio</a> &bull; 
              <a href="https://www.linkedin.com/in/19manikandan-m/" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">LinkedIn</a>
            </p>
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
