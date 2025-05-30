# Kanban Board App 🎓

---

## Project Description 🧾

This app is a **fully interactive Kanban task board** built with **JavaScript, HTML, and CSS**. It allows users to view, create, edit, and delete tasks across different workflow stages. The app also integrates local storage, API data fetching, responsive design, and a dark/light theme toggle.

---

## Technologies Used 👨🏽‍💻

<img src="./assets/image.png" alt="alt HTML" width="50" height="50" />

<img src="./assets/image-1.png" alt="alt HTML" width="50" height="50" />

<img src="./assets/image-4.png" alt="alt HTML" width="50" height="50" />

<img src="./assets/image-2.png" alt="alt HTML" width="50" height="50" />

---

## Features 🛠️

### 📥 Fetching & Saving Tasks

- Tasks are **initially fetched from a remote API**.
- Data is then **persisted locally** using `localStorage` for offline use and performance.
- On first load (or reload), tasks are fetched and stored locally.

### 📝 Create, Edit & Delete Tasks

- Click the **“+ Add Task”** button to open the modal form.
- Tasks can be created with:
  - Title
  - Description
  - Status (To Do, Doing, Done)
- **Editing** a task allows updating its content and status.
- Tasks can be **deleted** via a confirmation dialog.

### 🖼️ Modal Interactions

- Modal appears when creating or editing a task.
- The modal supports:
  - Full keyboard and mouse interaction
  - Smooth closing and cleanup
  - Dynamic button visibility depending on task state

### 🌓 Light/Dark Mode Toggle

- A toggle switch is provided to enable **dark mode** or revert to **light mode**.
- The current theme is saved in local storage and persisted on reload.
- Theme toggle is available in both **desktop and mobile menu**.

### 📱 Responsive Layout

- Fully responsive layout:
  - **Sidebar collapses on smaller screens**
  - **Mobile navigation menu** is accessible with a backdrop
  - Font and element sizes adjust for readability on all devices

### 📂 Sidebar Navigation

- Toggle sidebar open/closed with dedicated buttons.
- Supports:
  - Desktop show/hide toggle
  - Mobile menu integration with backdrop
- Sidebar state is remembered in `localStorage`.

---

## Setup Instructions 🧩

### Installation

1. Visit the website via Netlify:
   ```bash
   git clone https://github.com/yourusername/career-dev-plan.git
   ```
2. Browse the website and start achieving goals

## First Run

The app will automatically:

- Attempt to fetch tasks from the API

- Fall back to local storage if offline

- Initialize with empty state if no data exists

- No build tools or dependencies required

---

## Usage Instructions 🪄

### General Access

1. **Open the app in your browser** (via the provided website url).
2. The app will fetch tasks from the API and store them locally.

### Managing Tasks

| **Action**    | **Desktop**              | **Mobile**               |
| ------------- | ------------------------ | ------------------------ |
| Add Task      | Click `+ Add New Task`   | Tap `+` button           |
| Edit Task     | Click any task card      | Tap any task card        |
| Delete Task   | Edit → `Delete` button   | Edit → `Delete` button   |
| Change Status | Edit → `Status` dropdown | Edit → `Status` dropdown |

### UI Controls

| **Feature**    | **How to Access**                                                  |
| -------------- | ------------------------------------------------------------------ |
| Sidebar Toggle | 🖥️ Desktop: Hide/Show buttons<br>📱 Mobile: Tap the logo in header |
| Dark Mode      | Use the toggle switch in the sidebar or mobile menu                |
| Mobile Menu    | 📱 Tap the mobile logo (top-left of header)                        |

### Offline Usage

- Works fully offline after initial load

- Changes sync to local storage automatically

- Network status indicator in bottom-right

---

## 📖 Future Enhancements

✅ Drag and drop between columns

✅ Subtasks support

✅ Task priority or due dates

✅ User authentication

✅ Sync with a backend database (instead of just localStorage)
