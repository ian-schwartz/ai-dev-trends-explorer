# Agent Context: AI Dev Trends Explorer

## 1. Project Overview

Next.js application that maps the modern AI developer ecosystem. The site includes: **tools directory** and **tool detail pages**, **workflows** page, **comparison** page, **trend radar**, and **AI Dev Buzz** (Hacker News feed).

## 2. Tech Stack

- **Next.js App Router**, **TypeScript**, **Tailwind CSS**
- **Lucide** icons
- **Server components** where possible
- **Framer Motion** for subtle UI animations

## 3. Design Principles

- Dark, developer-focused aesthetic
- Minimal color usage; avoid flashy UI
- Subtle hover animations
- Primary layout patterns: **cards** and **grids**

## 4. Coding Conventions

- Prefer simple, readable implementations
- Avoid adding unnecessary dependencies
- Maintain consistent component structure
- Keep server/client rendering consistent to avoid hydration issues

## 5. Performance

- Server-side data fetching when possible
- Use Next.js revalidation for API calls (e.g. Hacker News feed)
- Avoid unnecessary client state

## 6. Feature Philosophy

New features should improve developer usefulness and connect tools, workflows, and ecosystem signals—not add gimmicks.

## 7. Instructions for AI Agents

**Before making changes**, review existing patterns in the codebase and follow established design and architectural conventions. See `AGENTS.md` for implementation guidelines and project structure.
