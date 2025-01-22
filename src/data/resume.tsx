import {Icons} from "@/components/icons";
import {HomeIcon, NotebookIcon} from "lucide-react";

export const DATA = {
    name: "Evgenii Ostrovskii",
    initials: "EO",
    url: "https://evgenii.org",
    location: "Oporto, Portugal",
    locationLink: "https://www.google.com/maps/place/porto",
    description:
        "soul in 🇬🇪, body in 🇵🇹, glory to 🇺🇦!",
    summary:
        "THIS is 1995 Jonathunky and today, I’m going to show you all of his quirks and features:\n" +
        "\n" +
        "Nuclear & wild person with positive vibes and incredible proficiency in computer systems\n" +
        "\n" +
        "Who passionately loves & enjoys:\n" +
        "\n" +
        "* Formula 1 Racing\n" +
        "* Competitive Tetris\n" +
        "* Moosic — drum and bass, dub, modern indie rock & pop, and so much more!\n" +
        "* Rose-coloured things + flashy looks\n" +
        "* Healthy lifestyle\n" +
        "* \\* this place is vacant for a single person, haha *\n" +
        "\n" +
        "And fully support urbanism, micromobility, and right to repair movement\n" +
        "\n" +
        "Also doesn't really like capitalism and patriarchy, but we'll deal with them later, shall we?",
    avatarUrl: "/me.JPG",
    skills: [
        "JS & React",
        "Python & bash scripting",
        "AWS & cloud engineering",
        "Average Docker & Kubernetes enjoyer",
        "Linux",
        "Presentation crafting"
    ],
    navbar: [
        {href: "/", icon: HomeIcon, label: "Home"},
        //{ href: "/blog", icon: NotebookIcon, label: "Blog" },
    ],
    contact: {
        //email: "hello@example.com",
        //tel: "+123456789",
        social: {
            GitHub: {
                name: "GitHub",
                url: "https://github.com/JonathanSeriesX",
                icon: Icons.github,
                navbar: true,
            },
            LinkedIn: {
                name: "LinkedIn",
                url: "https://linkedin.com/in/jonathunky",
                icon: Icons.linkedin,
                navbar: true,
            },
            Twitter: {
                name: "Twitter",
                url: "https://twitter.com/JonathanSeriesX",
                icon: Icons.twitter,
                navbar: true,
            },
            Youtube: {
                name: "Youtube",
                url: "https://www.youtube.com/@intensifiedhipster",
                icon: Icons.youtube,
                navbar: true,
            }/*,
            email: {
                name: "Send Email",
                url: "null@evgenii.org",
                icon: Icons.email,
                navbar: false,
            },*/
        },
    },
    work: [
        {
            company: "Atomic Finance",
            href: "https://atomic.finance",
            badges: [],
            location: "Remote",
            title: "Bitcoin Protocol Engineer",
            logoUrl: "/atomic.png",
            start: "May 2021",
            end: "Oct 2022",
            description:
                "Implemented the Bitcoin discreet log contract (DLC) protocol specifications as an open source Typescript SDK. Dockerized all microservices and setup production kubernetes cluster. Architected a data lake using AWS S3 and Athena for historical backtesting of bitcoin trading strategies. Built a mobile app using react native and typescript.",
        }
    ],
    education: [
        {
            school: "Buildspace",
            href: "https://buildspace.so",
            degree: "s3, s4, sf1, s5",
            logoUrl: "/buildspace.jpg",
            start: "2023",
            end: "2024",
        }
    ],
    projects: [
        {
            title: "Chat Collect",
            href: "https://chatcollect.com",
            dates: "Jan 2024 - Feb 2024",
            active: true,
            description:
                "With the release of the [OpenAI GPT Store](https://openai.com/blog/introducing-the-gpt-store), I decided to build a SaaS which allows users to collect email addresses from their GPT users. This is a great way to build an audience and monetize your GPT API usage.",
            technologies: [
                "Next.js",
                "Typescript",
                "PostgreSQL",
                "Prisma",
                "TailwindCSS",
                "Stripe",
                "Shadcn UI",
                "Magic UI",
            ],
            links: [
                {
                    type: "Website",
                    href: "https://chatcollect.com",
                    icon: <Icons.globe className="size-3"/>,
                },
            ],
            image: "",
            video:
                "https://pub-83c5db439b40468498f97946200806f7.r2.dev/chat-collect.mp4",
        },
        {
            title: "Magic UI",
            href: "https://magicui.design",
            dates: "June 2023 - Present",
            active: true,
            description:
                "Designed, developed and sold animated UI components for developers.",
            technologies: [
                "Next.js",
                "Typescript",
                "PostgreSQL",
                "Prisma",
                "TailwindCSS",
                "Stripe",
                "Shadcn UI",
                "Magic UI",
            ],
            links: [
                {
                    type: "Website",
                    href: "https://magicui.design",
                    icon: <Icons.globe className="size-3"/>,
                },
                {
                    type: "Source",
                    href: "https://github.com/magicuidesign/magicui",
                    icon: <Icons.github className="size-3"/>,
                },
            ],
            image: "",
            video: "https://cdn.magicui.design/bento-grid.mp4",
        },
        {
            title: "llm.report",
            href: "https://llm.report",
            dates: "April 2023 - September 2023",
            active: true,
            description:
                "Developed an open-source logging and analytics platform for OpenAI: Log your ChatGPT API requests, analyze costs, and improve your prompts.",
            technologies: [
                "Next.js",
                "Typescript",
                "PostgreSQL",
                "Prisma",
                "TailwindCSS",
                "Shadcn UI",
                "Magic UI",
                "Stripe",
                "Cloudflare Workers",
            ],
            links: [
                {
                    type: "Website",
                    href: "https://llm.report",
                    icon: <Icons.globe className="size-3"/>,
                },
                {
                    type: "Source",
                    href: "https://github.com/dillionverma/llm.report",
                    icon: <Icons.github className="size-3"/>,
                },
            ],
            image: "",
            video: "https://cdn.llm.report/openai-demo.mp4",
        },
        {
            title: "Automatic Chat",
            href: "https://automatic.chat",
            dates: "April 2023 - March 2024",
            active: true,
            description:
                "Developed an AI Customer Support Chatbot which automatically responds to customer support tickets using the latest GPT models.",
            technologies: [
                "Next.js",
                "Typescript",
                "PostgreSQL",
                "Prisma",
                "TailwindCSS",
                "Shadcn UI",
                "Magic UI",
                "Stripe",
                "Cloudflare Workers",
            ],
            links: [
                {
                    type: "Website",
                    href: "https://automatic.chat",
                    icon: <Icons.globe className="size-3"/>,
                },
            ],
            image: "",
            video:
                "https://pub-83c5db439b40468498f97946200806f7.r2.dev/automatic-chat.mp4",
        },
    ],
} as const;
