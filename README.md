# ✅ Task Management App

Effortlessly manage and track your tasks with the **Task Management App**! This web-based application allows users to organize their work into three categories: **To-Do, In Progress, and Done**. With secure authentication, real-time updates, and a clean, modern UI, managing tasks has never been easier.

🌐 **[Live Demo](https://mellow-gecko-1d0471.netlify.app/)**

---

## 📖 Description

The **Task Management App** is designed to help users stay productive by keeping their tasks well-organized. Users can create tasks, move them between categories, and mark them as completed. The app ensures security with user authentication, allowing only registered users to manage their tasks. With a **fast React frontend**, **Node.js + Express backend**, and **MongoDB database**, it delivers a seamless and responsive experience.

---

## 🛠️ Tech Stack

| Frontend | Backend | Database | Authentication |
|----------|---------|----------|----------------|
| HTML, React, Tailwind CSS | Node.js, Express.js | MongoDB, Firebase | Firebase Auth |

---

## 🚀 Features

- 🔐 **Secure User Authentication** (Firebase Auth)
- 📝 **Task Categorization**: To-Do, In Progress, Done
- 🌍 **Real-time Data Storage** (MongoDB + Firebase)
- 🎨 **Modern & Responsive UI** (Tailwind CSS)
- ⚡ **Fast Performance** (React, Node.js, Express.js)
- ✅ **Drag & Drop Functionality** _(Coming Soon)_

---

## 🔄 How It Works

1. **User Authentication**:  
   - New users must sign up with Firebase authentication.  
   - Existing users can log in securely.

2. **Creating Tasks**:  
   - Users can add tasks by entering a title and description.  
   - Tasks are stored in the **To-Do** section by default.

3. **Managing Tasks**:  
   - Move tasks between **To-Do, In Progress, and Done** categories.  
   - Tasks automatically update in the database.

4. **Updating & Deleting Tasks**:  
   - Users can edit task details at any time.  
   - Completed tasks can be removed.

5. **Logout & Security**:  
   - Users can log out safely, ensuring data privacy.  


## 🚀 Installation & Setup

Clone the repository and follow these steps:

```bash
# Clone the repo
git clone https://github.com/yourusername/task-management-app.git
cd task-management-app

# Install dependencies (for both frontend & backend)
npm install

# Start the frontend (React)
npm run dev

# Start the backend (Node.js & Express)
cd backend
npm install
npm start

