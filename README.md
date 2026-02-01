# Full-Stack Personal Expense Tracker 💰

A responsive, full-stack application built as a technical challenge. The app features a clean "Pinterest-style" aesthetic and provides a seamless way to track, filter, and manage daily expenses.

## 🚀 Live Links
- **Live Application:** [PASTE_YOUR_VERCEL_LINK_HERE]
- **API Endpoint:** [PASTE_YOUR_RENDER_LINK_HERE]/api/expenses

> **Note:** The backend is hosted on a Free Tier instance. If the app is inactive, it may take 30–60 seconds to "wake up" on the first load.

---

## 📝 Project Summary
This project demonstrates a complete development lifecycle, from creating a Spring Boot REST API to a containerized deployment. 

### **Key Features**
- **Real-time Totals:** Automatically sums up all expenses in the dashboard.
- **Smart Filtering:** Server-side category filtering (Food, Travel, Work, etc.).
- **Modern UI:** Built with Tailwind CSS v4 for a responsive, card-based layout.
- **Containerization:** Fully Dockerized backend for consistent environment staging.

---

## 🛠️ Technical Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18 (Vite), Tailwind CSS v4, Axios |
| **Backend** | Java 21, Spring Boot 3, Spring Data JPA |
| **Database** | H2 In-Memory Database |
| **Deployment** | Vercel (Frontend), Render (Backend) |
| **DevOps** | Docker, GitHub Actions |

---

## 🏗️ Architecture & Deployment

The project follows a decoupled architecture:
1.  **Backend (Render):** A Dockerized Spring Boot application that handles RESTful requests and persists data in an H2 database.
2.  **Frontend (Vercel):** A React SPA that communicates with the Render API.
3.  **CORS:** Configured to allow secure communication between the two distinct domains.

---

## ⚙️ Local Development

### **Backend**
```bash
./mvnw spring-boot:run
