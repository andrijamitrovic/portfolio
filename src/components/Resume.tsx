import { useEffect, useState, type ReactNode } from "react"
import { Code, Download, Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"

const links = {
    email: "mailto:andrijamitrovic11@gmail.com",
    github: "https://github.com/andrijamitrovic",
    resumePdf: `${import.meta.env.BASE_URL}resume.pdf`,
    sourceCode: "https://github.com/andrijamitrovic/portfolio",
    fittrack: "https://fitcadence.net",
    grepLite: "https://andrijamitrovic.github.io/haskell-grep-lite",
}

export function Resume() {
    const [isDark, setIsDark] = useState(() => {
        const savedTheme = localStorage.getItem("theme")
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

        return savedTheme === "dark" || (!savedTheme && prefersDark)
    })

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDark)
        localStorage.setItem("theme", isDark ? "dark" : "light")
    }, [isDark])

    return (
        <main className="min-h-screen bg-background px-4 py-10 text-foreground">
            <div className="mx-auto mb-4 flex max-w-[850px] flex-wrap justify-end gap-2">
                <Button asChild variant="outline" size="sm">
                    <a href={links.resumePdf} download="Andrija_Mitrovic_CV.pdf">
                        <Download />
                        Download PDF
                    </a>
                </Button>
                <Button asChild variant="outline" size="sm">
                    <a href={links.sourceCode} target="_blank" rel="noreferrer">
                        <Code />
                        Source Code
                    </a>
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    aria-pressed={isDark}
                    onClick={() => setIsDark((current) => !current)}
                >
                    {isDark ? <Sun /> : <Moon />}
                    {isDark ? "Light Theme" : "Dark Theme"}
                </Button>
            </div>

            <article className="mx-auto max-w-[850px] border border-border bg-card px-8 py-10 text-card-foreground shadow-sm sm:px-14">
                <header className="text-center">
                    <h1 className="text-3xl font-semibold tracking-tight">{"Andrija Mitrovi\u0107"}</h1>
                    <div className="mt-3 flex flex-wrap justify-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                        <a href={links.email}>andrijamitrovic11@gmail.com</a>
                        <span>|</span>
                        <span>+381 60 434 0061</span>
                        <span>|</span>
                        <a href={links.github} target="_blank" rel="noreferrer">github.com/andrijamitrovic</a>
                    </div>
                </header>

                <Section title="Education">
                    <Entry title="B.Sc. Computer Science" date="2018 - Present">
                        <p>University of Kragujevac, Faculty of Natural Sciences and Mathematics</p>
                        <p className="text-sm text-muted-foreground">
                            Relevant coursework: Algorithms & Data Structures, Operating Systems,
                            Databases, Software Engineering, Computer Networks
                        </p>
                    </Entry>
                </Section>

                <Section title="Experience">
                    <Entry title="Back End Engineer Intern" date="July 2024 - August 2024" org="ASEE">
                        <Bullets items={[
                            "Developed a REST API for a Personal Finance Management application using .NET and PostgreSQL, enabling users to create, log, and categorise financial transactions by category.",
                            "Implemented filtering endpoints for transaction history and financial reporting, helping users review spending patterns and retrieve relevant records more efficiently.",
                            "Containerised the application with Docker and validated all API endpoints using Postman, ensuring the service worked reliably across environments.",
                        ]} />
                    </Entry>

                    <Entry title="Full Stack Engineer Intern" date="July 2023 - August 2023" org="Inovatec">
                        <Bullets items={[
                            "Collaborated within a 4-person team to develop an internal office asset management tool, streamlining hardware inventory tracking across multiple offices.",
                            "Enabled staff to efficiently report broken or missing items, ensuring an accurate and up-to-date record of office assets.",
                            "Engineered the backend using Spring Boot, utilized PostgreSQL for data management, and implemented the frontend with React.",
                        ]} />
                    </Entry>
                </Section>

                <Section title="Projects">
                    <Entry title="FitTrack" date="2026" link={links.fittrack} linkText="fitcadence.net">
                        <Bullets items={[
                            "Built a full-stack workout logging application allowing users to record, track, and review training sessions, featuring JWT-based authentication and authorization.",
                            "Developed a Java Spring Boot backend with a PostgreSQL database and a React frontend, with unit and integration testing using JUnit and Mockito.",
                            "Implemented end-to-end testing with Selenium to validate key user flows such as authentication, workout creation, and session review.",
                            "Deployed to fitcadence.net using Dockerized services, a Spring Boot backend server, and a React app served via Nginx, secured with HTTPS.",
                            "Established a CI/CD pipeline with GitHub Actions to automatically run tests and deploy the application on every push.",
                        ]} />
                    </Entry>

                    <Entry title="Grep Lite" date="2026" link={links.grepLite} linkText="andrijamitrovic.github.io/haskell-grep-lite">
                        <Bullets items={[
                            "Developed a lightweight grep-like text search tool in Haskell to find lines matching user-provided regular expressions.",
                            "Implemented a custom regex parser converting patterns into an abstract syntax tree, supporting concatenation, alternation, repetition, and grouping.",
                            "Applied Glushkov NFA construction to transform the regex AST into an epsilon-free nondeterministic finite automaton for efficient pattern matching.",
                            "Extended the project for browser use by compiling the Haskell regex engine to WebAssembly, enabling client-side regex matching without a backend server.",
                        ]} />
                    </Entry>
                </Section>

                <Section title="Skills">
                    <Skill label="Languages" value="C#, Java, TypeScript, SQL" />
                    <Skill label="Frameworks" value="Spring Boot, .NET, React, Angular" />
                    <Skill label="Databases" value="PostgreSQL" />
                    <Skill label="Tools & DevOps" value="Docker, Git, GitHub Actions, Postman, REST APIs, JWT" />
                    <Skill label="Certifications" value="C1 Advanced English - Cambridge Final Exam, British Council Belgrade" />
                </Section>
            </article>
        </main>
    )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
    return (
        <section className="mt-7">
            <h2 className="text-sm font-bold uppercase tracking-wide">{title}</h2>
            <div className="mt-2 border-t border-border pt-3">{children}</div>
        </section>
    )
}

type EntryProps = {
    title: string
    date: string
    org?: string
    link?: string
    linkText?: string
    children: ReactNode
}

function Entry({ title, date, org, link, linkText, children }: EntryProps) {
    return (
        <div className="mb-4">
            <div className="flex flex-wrap justify-between gap-x-4 font-semibold">
                <span>{title}</span>
                <span>{date}</span>
            </div>
            {org && <p>{org}</p>}
            {link && (
                <a className="text-sm text-muted-foreground underline" href={link} target="_blank" rel="noreferrer">
                    {linkText}
                </a>
            )}
            <div className="mt-2">{children}</div>
        </div>
    )
}

function Bullets({ items }: { items: string[] }) {
    return <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed">{items.map((item) => <li key={item}>{item}</li>)}</ul>
}

function Skill({ label, value }: { label: string; value: string }) {
    return <p className="text-sm leading-relaxed"><strong>{label}:</strong> {value}</p>
}
