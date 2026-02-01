# 💰 Personal Expense Tracker (Full-Stack)

A robust full-stack application for managing personal finances, built during a technical assessment. This project features a React frontend and a Spring Boot backend, allowing users to track, filter, and total their expenses in real-time.

## 🚀 Features
- **Create Expenses:** Add description, amount, category, and date via a responsive form.
- **Dynamic List:** View all expenses in a clean, categorized table.
- **Real-Time Totals:** Automatically calculates the sum of all expenses.
- **Server-Side Filtering:** Filter transactions by category using optimized JPA query methods.
- **Data Persistence:** Uses an H2 In-Memory database for seamless local development.

## 🛠️ Tech Stack
- **Backend:** Java 21, Spring Boot, Spring Data JPA, Lombok, H2 Database.
- **Frontend:** React 18, Vite, Tailwind CSS v4, Axios.
- **Tools:** PostCSS, Lucide-Icons (if used), Maven.

## 🏁 Getting Started

### 1. Prerequisites
- **Java:** Version 17 or higher (Java 21 recommended).
- **Node.js:** Version 20 or higher (v24.13.0 used in development).
- **Maven:** (Included via `./mvnw`).

### 2. Backend Setup
1. Open the project root in your terminal.
2. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run