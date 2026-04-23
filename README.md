# Invoice Management App

A professional, fully functional Invoice Management Application built with **React**, **Vite**, and **Tailwind CSS**. This application allows users to create, view, edit, and delete invoices while maintaining persistence through `localStorage`.

## 🚀 Features

- **Full CRUD Operations**: Create, Read, Update, and Delete invoices.
- **Draft System**: Save invoices as drafts to edit and complete later.
- **Status Filtering**: Filter your invoice list by status (Draft, Pending, Paid).
- **Dark Mode**: Fully implemented theme toggle with persistent user preference.
- **Responsive Design**: Optimized for Mobile, Tablet, and Desktop screen sizes.
- **Form Validation**: Robust form handling and validation using Formik and Yup.
- **Dynamic ID Generation**: Automatically generates unique invoice IDs (e.g., #AB1234).
- **Persistence**: All data is saved to `localStorage`, so your invoices stay even after a page refresh.

## 🛠️ Tech Stack

- **Frontend**: React 19 (Plain JavaScript)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (Utility-first and `@layer components`)
- **Routing**: React Router v7
- **Form Management**: Formik
- **Validation**: Yup
- **Date Handling**: date-fns
- **Icons**: Heroicons

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/KoliOyama/HNG-Stage-2.git
   ```

2. Navigate to the project directory:
   ```bash
   cd invoice-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## 🎨 Design System

The application follows a strict 8px grid system and uses a curated color palette as defined in the `tailwind.config.js`. Dark mode is handled via CSS variables and the `.dark` class on the root element.

- **Typography**: League Spartan
- **Design Tokens**: Custom tokens for surfaces, content, and interactive states.

## 🏗️ Architecture & Implementation

The application is structured to be modular and scalable:
- **State Management**: Uses React Context (`InvoiceContext`) to handle CRUD operations centrally, ensuring data consistency across the list and detail views.
- **Persistence Layer**: A custom `useLocalStorage` hook synchronizes the state with the browser's storage on every change.
- **Form Handling**: Leveraging **Formik** with a **Yup** validation schema ensures robust data entry and centralized error handling.
- **Component Pattern**: Shared UI components (Buttons, Badges, Modals) are built using Tailwind's `@layer components` for reusability and design consistency.
- **Portals**: The `Drawer` and `DeleteModal` utilize React Portals to ensure they are rendered outside the main DOM tree, preventing z-index and stacking context issues.

## ♿ Accessibility Features

- **Keyboard Support**: Full keyboard navigation support, including `Escape` key handlers to close modals and drawers.
- **Focus Management**: The `DeleteModal` traps focus when open to prevent background interaction and returns focus to the trigger element upon closing.
- **Semantic HTML**: Use of semantic tags like `<main>`, `<section>`, `<aside>`, and `<header>` for better screen reader support.
- **Form Accessibility**: Every input is associated with a label, and validation errors are communicated clearly via ARIA-friendly patterns.

## ⚖️ Technical Trade-offs

- **localStorage vs Database**: To meet the local-only requirement, `localStorage` was chosen for its simplicity. While it limits data size and cross-device syncing, it provides a fast, zero-latency user experience for this stage of the project.
- **Formik vs Native Form API**: Formik was chosen over native forms to handle complex nested objects (like invoice addresses and item lists) and to simplify real-time validation feedback.
- **Tailwind CSS**: Utility-first styling was used to speed up development while maintaining a strict design system. The trade-off is slightly larger HTML files, but the performance gain from CSS purging outweighs this.

## 📄 License

This project was built as part of the HNG Stage 2 task.
