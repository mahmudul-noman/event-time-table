# 📅 Event Time Table

A modern, responsive event scheduling application with multi-venue support and real-time visual management. Built for **Selise** to streamline event planning and venue coordination.

---

## ✨ Features

- **📆 Weekly Calendar View** - Horizontally scrollable date tabs for easy navigation
- **🏢 Multi-Venue Support** - Create events across multiple venues simultaneously
- **⏰ Time-Based Scheduling** - Visual timeline with customizable time slots (9 AM - 6 PM)
- **🎨 Color-Coded Events** - Assign custom colors to events for better organization
- **💾 Persistent Storage** - LocalStorage integration for data persistence
- **📱 Responsive Design** - Optimized for desktop and tablet devices
- **🔄 Synchronized Scrolling** - Smooth horizontal and vertical scroll synchronization
- **✏️ Event Management** - Create, edit, and delete events with an intuitive dialog interface
- **🏟️ Venue Management** - Add and remove venues dynamically

---

## 🛠️ Tech Stack

### Core
- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety

### UI & Styling
- **[Material-UI (MUI)](https://mui.com/)** - Component library
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS
- **[Emotion](https://emotion.sh/)** - CSS-in-JS styling
- **[Lucide React](https://lucide.dev/)** - Icon library

### Utilities
- **clsx** - Conditional className utility
- **tailwind-merge** - Tailwind class merging
- **date-fns** - Date manipulation

---

## 📁 Project Structure

```
event-time-table/
├── app/
│   ├── globals.css           # Global styles & Tailwind directives
│   ├── layout.tsx            # Root layout with metadata
│   └── page.tsx              # Home page with Scheduler
│
├── components/
│   ├── scheduler/
│   │   ├── scheduler.tsx     # Main scheduler component
│   │   ├── day-tabs.tsx      # Horizontal date navigation
│   │   ├── event-dialog.tsx  # Event creation/edit dialog
│   │   ├── event-card.tsx    # Individual event display
│   │   ├── event-grid.tsx    # Event grid layout
│   │   ├── venue-header.tsx  # Venue column headers
│   │   ├── venue-dialog.tsx  # Venue creation dialog
│   │   └── time-column.tsx   # Time slot column
│   └── theme-provider.tsx    # MUI theme configuration
│
├── hooks/
│   ├── use-scheduler.ts      # Scheduler state management
│   ├── use-toast.ts          # Toast notifications
│   └── use-mobile.ts         # Mobile detection
│
├── lib/
│   ├── scheduler-utils.ts    # Scheduler helper functions
│   └── utils.ts              # General utilities (cn)
│
├── types/
│   └── scheduler.ts          # TypeScript interfaces
│
├── public/
│   └── logo.png              # Application logo
│
├── .gitignore                # Git ignore rules
├── package.json              # Dependencies & scripts
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # This file
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.x or higher
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mahmudul-noman/event-time-table.git
   cd event-time-table
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

---

## 📝 Usage

### Creating an Event
1. Click the **"Add Event"** button
2. Enter event details:
   - **Title** - Event name
   - **Venues** - Select one or multiple venues (checkboxes)
   - **Start Time** - Event start time
   - **End Time** - Event end time
   - **Color** - Choose a color for visual identification
3. Click **"Save"**

### Managing Venues
1. Click **"+ Add Venue"** in the venue header
2. Enter venue name
3. Click **"Add"**

### Editing/Deleting Events
- Click on any event card to open the edit dialog
- Modify details or click **"Delete"** to remove

---

## 📄 License & Copyright

**Copyright © 2025 Mahmudul Hasan Noman. All rights reserved.**

This project is proprietary software developed for Selise.  
Unauthorized copying, distribution, or modification is prohibited.

---

## 👨‍💻 Development

Built using modern web technologies for optimal performance and user experience.

**Last Updated:** December 2025
