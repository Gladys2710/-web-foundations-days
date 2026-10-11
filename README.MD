# Web Foundations - Daily Assignments

Welcome to the **Web Foundations** daily assignments repository. This repository tracks coursework, hands-on practice, and structured projects built with semantic HTML5 and modern web fundamentals.

---

## 📌 Project: QuickNotes App

The primary project developed in this repository is the **QuickNotes** informational website. QuickNotes is a lightweight productivity concept designed to help users jot down ideas, save links, and capture images across any screen or application without opening a heavy note file.

### 📁 Repository Structure

```text
web-foundations/
├── practice/
│   ├── index.html            # Setup test and practice playground
│   └── about.html            # Practice about page
├── web-foundations-days/
│   ├── README.md             # Daily assignments index
│   └── Day-1/
│       ├── index.html        # QuickNotes Home Page
│       └── about.html        # QuickNotes About Page
└── README.md                 # Project documentation and overview
```

---

## 🚀 Day 1: HTML5 Foundations & Semantic Structure

The **Day-1** assignment focuses on creating clean, accessible, and standards-compliant HTML5 pages:

1. **Semantic Layout**:
   - Structured with `<header>`, `<nav>`, `<main>`, `<section>`, and `<footer>`.
   - Accessible heading hierarchy (`<h1>`, `<h2>`).

2. **Bidirectional Navigation**:
   - Shared `<header>` and `<nav>` elements across both [`index.html`](web-foundations-days/Day-1/index.html) and [`about.html`](web-foundations-days/Day-1/about.html) enabling smooth two-way navigation.

3. **Step-by-Step Device Guides**:
   - Ordered lists (`<ol>`) detailing how to launch QuickNotes on **iPhone**, **iPad**, and **Mac** via Control Center, Share Sheet, corner gestures, and keyboard shortcuts.

4. **Features Showcase**:
   - Unordered list (`<ul>`) detailing system-wide access, rich content, smart links, creation shortcuts, iCloud syncing, and folder organization.

5. **Keyboard Shortcuts Reference**:
   - Formatted `<table>` with `Shortcut` and `Action` columns, leveraging the `<kbd>` element for semantic hotkey display.

6. **Accessible Feedback Form**:
   - Form containing Name, Email, Subject, Category selection, and Message inputs.
   - Every input and control is paired with an explicit `<label for="...">` matching the input's `id`.

7. **W3C Standards Compliance**:
   - Fully validated against the official **W3C Nu HTML Checker** with **0 Errors and 0 Warnings**.

---
