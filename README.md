# 💰 Full-Stack Personal Expense Tracker

A modern, containerized full-stack application designed to help users manage personal finances with a high-performance, aesthetic interface.

## 🚀 Live Links
- **Frontend (Vercel):** [https://fullstack-challange-01-02-26-gvgy.vercel.app/](https://fullstack-challange-01-02-26-gvgy.vercel.app/)
- **Backend (Render):** [https://fullstack-challange-01-02-26-3.onrender.com/api/expenses](https://fullstack-challange-01-02-26-3.onrender.com/api/expenses)

---

## 📋 Project Overview
This assignment solves the problem of manual expense tracking by providing a centralized, responsive dashboard. The goal was to build a scalable architecture that separates concerns between a high-availability API and a performant client-side UI.

### **The Problem it Solves:**
Managing daily expenses often feels like a chore. This app provides:
- **Instant Financial Overview:** Automatically calculates total spending.
- **Contextual Categorization:** Organizes spending into logical groups (Food, Work, Travel).
- **Cross-Platform Accessibility:** Accessible via any device thanks to cloud deployment.

---

## 🛠️ Tech Stack & "The Why"

### **Backend: Spring Boot 3 & Java 21**
- **Why Java 21?** Utilized the latest LTS version for improved performance and modern syntax (Virtual Threads ready).
- **Why Spring Data JPA?** To leverage the Repository pattern, which abstracts the data access layer and makes the code cleaner and more maintainable.
- **Why H2 Database?** Chosen for this challenge to ensure the application is "Plug & Play" for reviewers without requiring complex external DB credentials.

### **Frontend: React 18 & Vite**
- **Why Vite?** Provides a significantly faster development experience and optimized production builds compared to traditional Create React App (CRA).
- **Why Tailwind CSS v4?** Specifically chosen for its "zero-runtime" CSS-in-JS capabilities and modern design tokens, allowing for the "Pinterest-style" aesthetic without bloated CSS files.
- **Why Axios?** For robust HTTP request handling, automatic JSON transformation, and better error interceptors.

### **DevOps: Docker & Multi-Platform Cloud**
- **Why Docker?** To eliminate the "it works on my machine" problem. The backend is fully containerized to ensure consistent behavior across local and cloud environments.
- **Why Vercel + Render?** This hybrid cloud approach demonstrates the ability to manage Cross-Origin Resource Sharing (CORS) and connect distributed systems.

---

## 🏗️ Architecture Summary
The application follows a **Decoupled Client-Server Architecture**:



1.  **RESTful API:** Developed with a Controller-Service-Repository pattern.
2.  **CORS Policy:** Custom-configured to allow secure communication between the Vercel frontend domain and the Render backend.
3.  **State Management:** React hooks (`useState`, `useEffect`) manage the local UI state and sync with the backend via asynchronous API calls.

---

## 🚀 Local Installation

### **1. Clone the Repo**
```bash
git clone [https://github.com/cshruti07/fullstack-challange-01-02-26](https://github.com/cshruti07/fullstack-challange-01-02-26)
