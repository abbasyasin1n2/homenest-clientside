# 🏠 HomeNest - Real Estate Listing Portal

<div align="center">

![HomeNest Banner](https://img.shields.io/badge/HomeNest-Real%20Estate%20Platform-10b981?style=for-the-badge&logo=home&logoColor=white)

**A modern, full-featured real estate platform for the Bangladesh market**

[![Live Site](https://img.shields.io/badge/🌐%20Live%20Site-Visit%20Now-10b981?style=for-the-badge)](https://homenest-clientside.web.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/abbasyasin1n2/homenest-clientside)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Demo Credentials](#-demo-credentials)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Contributing](#-contributing)

---

## 🌟 Overview

HomeNest is a production-ready real estate platform where property owners can list their properties for sale or rent, while users can browse, search, filter, compare, and review listings. The platform covers everything from residential plots to commercial office spaces and apartments.

### ✨ Highlights

- 🌓 **Dark/Light Mode** - Full theme support with smooth transitions
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ⚡ **Fast & Optimized** - React Query caching for instant navigation
- 🔒 **Secure** - Firebase Authentication with protected routes
- 🎨 **Modern UI** - Built with Tailwind CSS and shadcn/ui components

---

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| User | `user@homenest.com` | `User123!` |

---

## 🚀 Features

### 🏘️ Property Management
| Feature | Description |
|---------|-------------|
| **Smart Listing Forms** | Dynamic forms that adapt based on property type (Apartment shows bedrooms, Commercial shows floor details) |
| **Add/Edit Properties** | Full CRUD operations with image URLs, pricing, and detailed specifications |
| **Property Categories** | Land/Plot, Commercial, and Apartment with sub-types |
| **Listing Types** | Support for both Sale and Rent properties |

### 🔍 Search & Discovery
| Feature | Description |
|---------|-------------|
| **Advanced Search** | Search by property name with real-time filtering |
| **Smart Filters** | Filter by category, listing type, price range |
| **Sorting Options** | Sort by newest, oldest, or price (low/high) |
| **Map View** | Interactive map to visualize property locations |
| **Property Comparison** | Compare up to 4 properties side by side |

### 👤 User Dashboard
| Feature | Description |
|---------|-------------|
| **Overview** | Stats cards and charts showing your activity |
| **My Properties** | Manage all your listed properties |
| **Wishlist** | Save properties for later viewing |
| **My Ratings** | View and manage your reviews |
| **Inquiries** | Send and receive messages about properties |
| **Profile** | Manage your account information |

### ⭐ Reviews & Ratings
| Feature | Description |
|---------|-------------|
| **Star Ratings** | 1-5 star rating system |
| **Written Reviews** | Detailed feedback on properties |
| **Review Management** | Edit or delete your reviews |

### 🔐 Authentication
| Feature | Description |
|---------|-------------|
| **Email/Password** | Traditional signup and login |
| **Google Sign-In** | One-click authentication |
| **Protected Routes** | Secure access to dashboard features |

---

## 📸 Screenshots

<details>
<summary>Click to view screenshots</summary>

### Home Page
- Hero carousel with property highlights
- Featured properties section
- How it works guide
- Testimonials and FAQ

### Property Listing
- Grid view with property cards
- Filter sidebar
- Search functionality

### Dashboard
- Overview with charts
- Property management table
- Sidebar navigation

</details>

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| ![React](https://img.shields.io/badge/React%2018-61DAFB?style=flat-square&logo=react&logoColor=black) | UI Framework |
| ![React Router](https://img.shields.io/badge/React%20Router%20v7-CA4245?style=flat-square&logo=react-router&logoColor=white) | Navigation |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS%20v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white) | Styling |
| ![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=flat-square&logo=shadcnui&logoColor=white) | UI Components |
| ![TanStack Query](https://img.shields.io/badge/TanStack%20Query-FF4154?style=flat-square&logo=reactquery&logoColor=white) | Data Fetching |
| ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black) | Authentication |
| ![Framer Motion](https://img.shields.io/badge/Framer%20Motion-0055FF?style=flat-square&logo=framer&logoColor=white) | Animations |

### Backend
| Technology | Purpose |
|------------|---------|
| ![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white) | REST API |
| ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white) | Database |
| ![Firebase Admin](https://img.shields.io/badge/Firebase%20Admin-FFCA28?style=flat-square&logo=firebase&logoColor=black) | Token Verification |

### Additional Libraries
- **Axios** - HTTP client
- **SweetAlert2** - Beautiful alerts
- **Swiper.js** - Touch sliders
- **ApexCharts** - Dashboard charts
- **Leaflet** - Interactive maps
- **date-fns** - Date formatting
- **@smastrom/react-rating** - Star ratings

---

## 🏁 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- MongoDB database
- Firebase project

### Installation

```bash
# Clone the repository
git clone https://github.com/abbasyasin1n2/homenest-clientside.git

# Navigate to project directory
cd homenest-clientside

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Start development server
pnpm run dev
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_URL=your_backend_url
```

---

## 📁 Project Structure

```
homenest-clientside/
├── 📂 public/
│   └── 📂 staticassets/       # Static images
├── 📂 src/
│   ├── 📂 api/                # Axios configuration
│   ├── 📂 components/
│   │   ├── 📂 home/           # Home page sections
│   │   ├── 📂 layout/         # Navbar, Footer
│   │   └── 📂 ui/             # shadcn components
│   ├── 📂 contexts/           # React contexts
│   │   ├── AuthContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── ComparisonContext.jsx
│   ├── 📂 hooks/              # Custom hooks
│   │   ├── useProperties.js
│   │   ├── useRatings.js
│   │   ├── useWishlist.js
│   │   └── useInquiries.js
│   ├── 📂 layouts/            # Layout components
│   │   ├── MainLayout.jsx
│   │   └── DashboardLayout.jsx
│   ├── 📂 pages/              # Route pages
│   └── 📄 main.jsx            # App entry point
├── 📄 package.json
├── 📄 tailwind.config.js
└── 📄 vite.config.js
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/properties` | Get all properties (with filters) |
| `GET` | `/properties/:id` | Get single property |
| `GET` | `/properties/user/:email` | Get user's properties |
| `POST` | `/properties` | Create new property |
| `PUT` | `/properties/:id` | Update property |
| `DELETE` | `/properties/:id` | Delete property |
| `GET` | `/ratings/:propertyId` | Get property ratings |
| `POST` | `/ratings` | Add rating |
| `DELETE` | `/ratings/:id` | Delete rating |
| `GET` | `/wishlist/:email` | Get user wishlist |
| `POST` | `/wishlist` | Add to wishlist |
| `DELETE` | `/wishlist/:id` | Remove from wishlist |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is for educational purposes as part of the **Programming Hero Web Development Course**.

---

<div align="center">

Made with ❤️ by [Abbas Yasin](https://github.com/abbasyasin1n2)

⭐ Star this repo if you found it helpful!

</div>
