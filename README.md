# KCT CSE CGPA Calculator

A modern web application to calculate CGPA and SGPA for students of Kumaraguru College of Technology (KCT), Computer Science & Engineering (CSE) department.

**Live Demo:** [https://kct-cse-cgpa-calculator.netlify.app/](https://kct-cse-cgpa-calculator.netlify.app/)

## Features
- Calculate SGPA for each semester and overall CGPA
- Preloaded with official KCT CSE curriculum (course codes, credits, requirements)
- Supports language electives and audit/mandatory courses
- Responsive, mobile-friendly UI
- Built with Next.js, React, and Tailwind CSS
- Beautiful, branded design with KCT logo and colors

## Semester-wise Course List

### Semester I
**Language Elective (choose one):**

| Course Code   | Course Title         | Credits | Type     | Requirement           |
|--------------|---------------------|---------|----------|----------------------|
| U18JAI2201   | Japanese Level I    | 3       | Elective | Embedded TL - 3+1    |
| U18HII2201   | Hindi Level I       | 3       | Elective | Embedded TL - 3+1    |
| U18GEI2201   | German Level I      | 3       | Elective | Embedded TL - 3+1    |
| U18FRI2201   | French Level I      | 3       | Elective | Embedded TL - 3+1    |

| Course Code   | Course Title                                 | Credits | Type         | Requirement           |
|--------------|----------------------------------------------|---------|--------------|----------------------|
| U18EEI1201   | Basic Electrical and Electronics Engineering  | 4       | Core         | Embedded TL - 3+1    |
| U18PHI1202   | Engineering Physics                          | 4       | Core         | Embedded TL - 3+1    |
| U18MAI1202   | Linear Algebra and Calculus                  | 4       | Core         | Embedded TL - 3+1    |
| U18CSI1201   | Structured Programming using C               | 4       | Core         | Embedded TL - 3+1    |
| U18INI1600   | Engineering Clinic-I                         | 3       | Core         | Practical            |
| U18TLR1001   | Heritage of Tamils                           | 1       | Core         | Theory               |
| U18CSR1001   | Disruptive Technologies                      | 2       | Audit Course | Theory               |

### Semester II
| Course Code   | Course Title                                 | Credits | Type         | Requirement           |
|--------------|----------------------------------------------|---------|--------------|----------------------|
| U18MAI2201   | Advanced Calculus and Laplace Transforms     | 4       | Core         | Embedded TL - 3+1    |
| U18CSI2202   | Digital Logic and Microprocessor             | 4       | Core         | Embedded TL - 3+1    |
| U18BTI2201   | Computational Biology                        | 4       | Core         | Embedded TL - 3+1    |
| U18INI2600   | Engineering Clinic-II                        | 3       | Core         | Practical            |
| U18CSI2201   | Python Programming                           | 3       | Core         | Embedded TL - 3+1    |
| U18ENI0202   | Professional Communication                   | 3       | Core         | Embedded TL - 3+1    |
| U18TLR2001   | Tamils and Technology                        | 1       | Core         | Theory               |
| U18MAR0003   | Tech for Good: Achieving the SDGs by the Role of ICT | 2 | Audit Course | Theory      |

### Semester III
| Course Code   | Course Title                                 | Credits | Type         | Requirement           |
|--------------|----------------------------------------------|---------|--------------|----------------------|
| U18CSI3201   | Data Structures                              | 4       | Core         | Embedded TL - 3+1    |
| U18CSI3202   | Object Oriented Programming                  | 4       | Core         | Embedded TL - 3+1    |
| U18CSI3204   | Database Management Systems                  | 4       | Core         | Embedded TL - 3+1    |
| U18CSI6201   | Internet and Web Programming                 | 4       | Core         | Embedded TL - 3+1    |
| U18CST3003   | Computer Architecture                        | 3       | Core         | Theory               |
| U18INI3600   | Engineering Clinic-III                       | 3       | Core         | Project              |
| U18MAT3102   | Discrete Mathematics                         | 4       | Core         | Theory               |

### Semester IV
| Course Code   | Course Title                                 | Credits | Type         | Requirement           |
|--------------|----------------------------------------------|---------|--------------|----------------------|
| U18MAI4201   | Probability and Statistics                   | 4       | Core         | Embedded TL - 3+1    |
| U18CSI4202   | Operating Systems                            | 4       | Core         | Embedded TL - 3+1    |
| U18CSI4204   | Software Engineering                         | 4       | Core         | Embedded TL - 3+1    |
| U18CSI5201   | Computer Networks                            | 4       | Core         | Embedded TL - 3+1    |
| U18CSI5203   | No SQL Databases                             | 4       | Core         | Embedded TL - 3+1    |
| U18CST4001   | Design and Analysis of Algorithms            | 3       | Core         | Theory               |
| U18INI4600   | Engineering Clinic-IV                        | 3       | Core         | Practical            |

## Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript, React
- **Styling:** Tailwind CSS
- **UI Components:** Custom + Shadcn UI
- **Package Manager:** pnpm

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- pnpm (or npm/yarn)

### Installation
```bash
# Clone the repository
git clone https://github.com/max-mani/cgpa.git
cd cgpa

# Install dependencies
pnpm install
```

### Running Locally
```bash
pnpm run dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production
```bash
pnpm run build
pnpm start
```

## Deployment
This project is ready for deployment on platforms like **Netlify** or **Vercel**.
- **Build command:** `pnpm run build`
- **Publish directory:** `.next`

## Credits
- **Made by:** ManiKandan M (23BCS082)
- [Portfolio](https://manikandan-m-portfolio.netlify.app/)
- [LinkedIn](https://www.linkedin.com/in/19manikandan-m/)

---

> This project is not officially affiliated with KCT. For academic use only.