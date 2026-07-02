# SkibaRentals

A full-stack property rental booking platform where users can browse, list, and review rental properties.

**Live:** [skiba-rentals.onrender.com](https://skiba-rentals.onrender.com)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js, Express.js |
| Frontend | EJS, EJS-Mate, HTML, CSS |
| Database | MongoDB (Atlas) |
| ODM | Mongoose |
| Auth | Passport.js (Local Strategy) |
| Image Storage | Cloudinary + Multer |
| Maps | Mapbox SDK |
| Sessions | express-session + connect-mongo |
| Validation | Joi |
| Deployment | Render |

---

## Features

### Authentication & Authorization
- User signup, login, and logout using Passport.js with Local Strategy.
- Sessions are stored in MongoDB via `connect-mongo` so sessions persist across server restarts.
- Protected routes redirect unauthenticated users to login, then back to their original destination after login.

### Listings (Full CRUD)
- Any logged-in user can create a new rental listing with a title, description, price, location, country, and an image.
- Listings store geolocation coordinates (GeoJSON `Point`) fetched via Mapbox for map display.
- Only the **owner** of a listing can edit or delete it — enforced by the `isOwner` middleware.
- When a listing is deleted, all associated reviews are automatically deleted via a Mongoose `post` middleware hook.

### Image Uploads
- Images are uploaded directly to **Cloudinary** using `multer-storage-cloudinary`.
- The image URL and filename are saved to the listing document in MongoDB.

### Reviews
- Logged-in users can post reviews on any listing.
- Only the **author** of a review can delete it — enforced by the `isReviewAuthor` middleware.

### Validation & Error Handling
- All incoming listing and review data is validated server-side using **Joi** schemas before touching the database.
- A custom `ExpressError` class and `wrapAsync` utility handle async errors cleanly without repetitive try-catch blocks.
- A custom 404 handler catches any undefined routes and renders a user-friendly error page.

### Maps
- Each listing displays an interactive map powered by **Mapbox** showing the exact property location.

---

## Project Structure

```
├── app.js              # Entry point, middleware setup, DB connection
├── cloudConfig.js      # Cloudinary & Multer storage config
├── middleware.js        # isLoggedIn, isOwner, isReviewAuthor, validation
├── schema.js           # Joi validation schemas
├── controllers/        # Business logic (listings, reviews, users)
├── models/             # Mongoose schemas (Listing, Review, User)
├── routes/             # Express routers (listing, review, user)
├── views/              # EJS templates
├── public/             # Static assets (CSS, JS)
└── utils/              # ExpressError, wrapAsync helpers
```

---

## Environment Variables

Create a `.env` file in the root with:

```
ATLASDB_URL=your_mongodb_atlas_url
SECRET=your_session_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
MAP_TOKEN=your_mapbox_token
```
