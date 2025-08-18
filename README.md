# Next.js Full-Stack E-Commerce (Admin & Client)

A **full-stack e-commerce platform** built with **Next.js 15**, **TypeScript**, and **MongoDB**.  
Includes separate **Admin Dashboard** for product/collection management and a **Client Storefront** for customers.  

---

## ✨ Features

### 🛒 Client Side
- Modern storefront with **Next.js App Router**
- Dynamic product & collection pages
- Responsive UI with **TailwindCSS**
- Carousel & gallery with **Embla Carousel** / **React Multi Carousel**
- User authentication with **Clerk**
- Cart & checkout flow with **Stripe**
- Global state management with **Zustand**
- Optimized images with **Next Cloudinary**
- Animations with **tw-animate-css**

### 🖥️ Admin Dashboard
- Secure **authentication with Clerk**
- Manage:
  - Products (CRUD)
  - Collections (CRUD)
  - Orders
  - Customers
- Data tables with **TanStack Table**
- Forms powered by **React Hook Form + Zod**
- File upload (Cloudinary integration)
- Analytics dashboards with **Recharts**
- Toast notifications with **React Hot Toast**

### ⚙️ Tech Stack
- **Framework**: Next.js 15 (App Router, TypeScript, Turbopack)  
- **Database**: MongoDB + Mongoose  
- **Auth**: Clerk  
- **Payments**: Stripe  
- **UI**: TailwindCSS, Radix UI, ShadCN components, Lucide Icons  
- **State**: Zustand (client)  
- **Validation**: Zod  

---

## 📂 Project Structure
├── src/
│ ├── app/
│ │ ├── (auth)/ # Authentication pages
│ │ ├── (dashboard)/ # Admin dashboard
│ │ │ ├── collections/
│ │ │ ├── customers/
│ │ │ ├── orders/
│ │ │ └── products/
│ │ ├── (root)/ # Client storefront routes
│ │ ├── api/ # API routes
│ │ ├── error.tsx
│ │ ├── loading.tsx
│ │ └── unauthorized.tsx
│ ├── components/ # Reusable UI + sections
│ │ ├── customer-review/
│ │ ├── footer/
│ │ ├── news-letter/
│ │ ├── ui/
│ │ └── ...
│ └── styles/
│
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
