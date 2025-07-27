# 🏛️ WAI Digital Governance Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.12.0-2D3748?style=flat&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-316192?style=flat&logo=postgresql)](https://www.postgresql.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **Empowering Rural Governance Through Digital Transformation**

A comprehensive digital governance platform designed specifically for Panchayat Samitis and rural administrative bodies in Maharashtra, India. Transform traditional paper-based processes into efficient, transparent, and citizen-friendly digital services.

## 🎯 Project Overview

The WAI Digital Governance Platform is a modern, full-stack web application built for Panchayat Samiti Wai, Satara District, Maharashtra. It serves as a complete digital transformation solution for rural governance, enabling seamless management of government schemes, citizen services, departmental operations, and public information dissemination.

### ✨ Key Highlights

- **🌐 Bilingual Support**: Full support for Marathi and English languages
- **🔐 Role-Based Access Control**: Secure admin dashboard with department-wise permissions
- **📱 Mobile-First Design**: Responsive design optimized for all devices
- **🏛️ Government-Grade Security**: Implements security best practices for government applications
- **🚀 Modern Tech Stack**: Built with Next.js 15, TypeScript, and PostgreSQL

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15.3.4 with App Router
- **Language**: TypeScript 5.0
- **Styling**: TailwindCSS 4.0 + PostCSS
- **UI Components**: Radix UI + Custom components
- **Icons**: Lucide React
- **Internationalization**: next-intl
- **State Management**: React Hooks + Server Actions

### Backend

- **Database**: PostgreSQL with Prisma ORM 6.12.0
- **Authentication**: Clerk Authentication
- **File Storage**: Cloudinary for images and documents
- **Server Actions**: Next.js Server Actions for API endpoints

### DevOps & Tools

- **Package Manager**: npm
- **Code Quality**: ESLint + Prettier
- **Database Migrations**: Prisma Migrate
- **Build Tool**: Next.js with Turbopack
- **Deployment**: Vercel-ready configuration

## 🚀 Features

### 🌟 Public Portal Features

- **📢 Announcements & Notifications**: Real-time updates and alerts
- **📋 Government Schemes Directory**: Comprehensive scheme listings with multilingual support
- **🏢 Department Information**: Detailed department profiles and contact information
- **📞 Contact Management**: Dynamic contact directory with Grampanchayat listings
- **🔍 Advanced Search**: Powerful search functionality across all content
- **🌍 Multilingual Content**: Seamless Marathi-English language switching

### 🔒 Admin Dashboard Features

- **👥 User Management**: Role-based access control (Admin, Moderators)
- **📝 Content Management System**:
  - Scheme management with bilingual support
  - Announcement creation and publishing
  - Department profile management
  - Homepage content editing
- **📊 Grampanchayat Management**:
  - Village-level contact management
  - CSV import/export functionality
  - Searchable directory
- **🖼️ Media Management**:
  - Image uploads with Cloudinary integration
  - Gallery management for schemes and departments
- **🔄 Real-time Updates**: Instant content updates across the platform

### 🌐 Internationalization Features

- **🔄 Translation Assistance**: AI-powered translation suggestions
- **📝 Bilingual Forms**: Side-by-side Marathi and English content editing
- **🌏 Locale-aware Routing**: URL-based language switching
- **📱 Responsive Text**: Language-aware typography and spacing

## 📸 Screenshots

_Coming Soon - Screenshots will be added once the application is deployed_

## ⚡ Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Cloudinary account (for image management)
- Clerk account (for authentication)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/AmeyaBadge/wai_ps.git
cd wai_ps
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/wai_ps"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/admin/login
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/admin/dashboard

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Site Configuration
SITE_TITLE="Panchayat Samiti Wai"
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. **Database Setup**

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed database with sample data
npx prisma db seed
```

5. **Run the development server**

```bash
npm run dev
```

6. **Open the application**
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
wai_ps/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/          # Internationalized routes
│   │   ├── admin/             # Admin dashboard
│   │   ├── api/               # API endpoints
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable components
│   │   ├── admin/             # Admin-specific components
│   │   ├── public/            # Public-facing components
│   │   └── ui/                # Base UI components
│   ├── actions/               # Server actions
│   │   ├── admin/             # Admin operations
│   │   ├── client/            # Client operations
│   │   └── public/            # Public operations
│   ├── lib/                   # Utility libraries
│   ├── messages/              # Internationalization files
│   ├── constants/             # Static data and configurations
│   └── types/                 # TypeScript type definitions
├── prisma/                    # Database schema and migrations
├── public/                    # Static assets
└── docs/                      # Documentation files
```

## 🗄️ Database Schema

The application uses PostgreSQL with Prisma ORM. Key models include:

### Core Models

- **User**: Authentication and user management
- **Department**: Government departments
- **Scheme**: Government schemes with multilingual support
- **Announcement**: Public announcements and notifications
- **Grampanchayat**: Village-level administrative units
- **ContactInfo**: Contact directory
- **Gallery**: Media management

### Key Features

- **Multilingual Support**: All content models include English variants (`_en` fields)
- **Soft Deletes**: Important records use `isActive` flags
- **Audit Trails**: `createdAt` and `updatedAt` timestamps
- **Relationships**: Proper foreign key relationships with cascade deletes

## 🔧 Usage Instructions

### For End Users (Public Portal)

1. **Browse Content**: Navigate through schemes, departments, and announcements
2. **Language Switching**: Use the language toggle for Marathi/English content
3. **Search**: Use the search functionality to find specific information
4. **Contact**: Access Grampanchayat and department contact information

### For Administrators

1. **Login**: Access `/admin/login` with Clerk authentication
2. **Dashboard**: Use the admin dashboard to manage content
3. **Content Creation**: Create and edit schemes, announcements, and departments
4. **User Management**: Manage user roles and permissions
5. **Data Import**: Use CSV import for bulk data operations

## 🌐 API Endpoints

The application uses Next.js Server Actions instead of traditional REST APIs:

### Public Actions

- `getPublicSchemes()` - Fetch public schemes
- `getPublicDepartments()` - Fetch department information
- `getActiveGrampanchayats()` - Fetch active Grampanchayats

### Admin Actions

- `createScheme()` / `updateScheme()` - Scheme management
- `createAnnouncement()` - Announcement management
- `importGrampanchayatsFromCSV()` - Bulk data import

## 🤝 Contributing

We welcome contributions to improve the WAI Digital Governance Platform!

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**

```bash
git checkout -b feature/your-feature-name
```

3. **Make your changes**
4. **Test thoroughly**
5. **Commit with conventional commits**

```bash
git commit -m "feat: add new feature description"
```

6. **Push and create a Pull Request**

### Code Style Guidelines

- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Write meaningful commit messages
- Add comments for complex logic
- Ensure responsive design compatibility

### Testing

- Test all features in both Marathi and English
- Verify responsive design on mobile devices
- Test admin functionalities with different user roles

## 🐛 Known Issues & Roadmap

### Current Known Issues

- Translation feature needs improvement for complex content
- File upload functionality needs enhancement for application forms
- Performance optimization needed for large datasets

### Upcoming Features

- **📊 Analytics Dashboard**: Usage statistics and insights
- **📋 Application Tracking**: Citizen application status tracking
- **💰 Payment Integration**: Online fee payment system
- **📱 Mobile App**: Native mobile application
- **🔔 SMS/Email Notifications**: Automated communication system
- **📈 Reporting System**: Comprehensive reporting tools

### Long-term Roadmap

- **🏢 Multi-tenant Support**: Support for multiple Panchayat Samitis
- **🤖 AI Integration**: Automated content translation and assistance
- **📊 Business Intelligence**: Advanced analytics and dashboards
- **🔗 API Gateway**: Public APIs for third-party integrations

## 👨‍💻 Credits & Authors

### Development Team

- **Lead Developer**: [Ameya Badge](https://github.com/AmeyaBadge)
- **Project Owner**: Panchayat Samiti Wai, Maharashtra

### Acknowledgments

- **Inspiration**: Government of Maharashtra's Digital India initiatives
- **Community**: Next.js and React communities for excellent documentation
- **UI/UX**: Inspired by modern government portal designs

### Special Thanks

- Clerk for authentication services
- Cloudinary for media management
- Vercel for hosting platform
- Prisma team for excellent database tools

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Panchayat Samiti Wai

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🔗 Important Links

- **🌐 Live Demo**: _Coming Soon_
- **📧 Contact**: ameyabadge@gmail.com , chetanjain281@gmail.com
- **🐛 Report Issues**: [GitHub Issues](https://github.com/AmeyaBadge/wai_ps/issues)
- **📖 Documentation**: [Project Wiki](https://github.com/AmeyaBadge/wai_ps/wiki)

---

<div align="center">

**🏛️ Built with ❤️ for Digital India Initiative**

_Empowering Rural Governance Through Technology_

[⭐ Star this repository](https://github.com/AmeyaBadge/wai_ps) if you find it helpful!

</div>
