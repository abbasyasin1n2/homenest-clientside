# HomeNest - Real Estate Listing Portal

**Live Site:** https://homenest-clientside.web.app/

HomeNest is a real estate platform built for the Bangladesh market where property owners can list their properties for sale or rent, and users can browse, search, and review listings. The platform handles everything from residential plots to commercial office spaces and apartments.

---

## Key Features

- **Advanced Property Search** – Users can search properties by name, filter by category (Land/Plot, Commercial, Apartment) and listing type (Sale/Rent), plus sort by newest, oldest, or price range.

- **Smart Listing Forms** – When adding a property, the form automatically shows relevant fields based on what type of property you're listing. For example, apartments show bedroom/bathroom fields while commercial spaces show floor details.

- **User Authentication** – Secure login system using Firebase Authentication with email/password and Google Sign-In options. All property management features are protected and require authentication.

- **Property Management Dashboard** – Property owners can view all their listings in one place, edit details through an inline dialog, or delete properties they no longer want to list.

- **Review System** – Authenticated users can leave star ratings (1-5) and written reviews on any property. Users can also view all their submitted reviews and delete them if needed.

---

## How It Works

The platform uses Firebase for user authentication. When you sign up, your account is created in Firebase, and you get a secure token that's used for all protected actions.

On the property listing side, everything is stored in MongoDB. When you add a property, the form adapts to show the right fields - if you're listing an apartment, you'll see fields for bedrooms and bathrooms; if it's a commercial plot, you'll get different options. This keeps the data organized and makes sure each property has the information buyers need.

For browsing properties, the search bar checks property names, and you can narrow down results using the category and listing type filters. The sorting options let you view newest listings first, oldest first, or sort by price. All of this filtering happens on the backend, so it's fast even with lots of properties.

The review system lets anyone leave feedback on properties they've seen. Reviews include a 1-5 star rating and written comments. Your reviews are stored with your email and the property ID, so you can manage them later from your "My Ratings" page.

Behind the scenes, the React frontend talks to an Express.js backend API. Every request to protected routes includes your Firebase token, which the server verifies using Firebase Admin SDK before allowing the action. This prevents unauthorized users from modifying or deleting properties they don't own.

---

## Technologies Used

**Frontend:**
- React with React Router for navigation
- Tailwind CSS and shadcn/ui components for styling
- Firebase Authentication for user accounts
- TanStack Query for data fetching and caching
- Axios for API requests
- SweetAlert2 for notifications
- Swiper.js for image sliders
- @smastrom/react-rating for star ratings
- date-fns for date formatting

**Backend:**
- Express.js REST API
- MongoDB for database
- Firebase Admin SDK for token verification
- CORS for cross-origin requests

The frontend automatically caches property data, so if you visit a property page and then go back, it loads instantly without making another request. When you add, edit, or delete a property, the cache updates immediately so you see your changes right away.

---

## Project Structure

```
homenest-clientside/
├── src/
│   ├── api/              # Axios configuration
│   ├── components/       # UI components
│   │   ├── home/         # Home page sections
│   │   ├── layout/       # Navbar and Footer
│   │   └── ui/           # Reusable shadcn components
│   ├── contexts/         # AuthContext and ThemeContext
│   ├── hooks/            # Custom hooks for properties and ratings
│   ├── pages/            # All route pages
│   ├── routes/           # PrivateRoute component
│   └── main.jsx          # App entry point
└── public/
    └── staticassets/     # Images for hero slider and team section
```

The backend has a similar structure with `index.js` handling all routes, and a `scripts` folder containing a seed script to populate the database with sample properties.
