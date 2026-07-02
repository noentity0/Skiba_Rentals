# SkibaRentals

**A Full-Stack Accommodation Booking Platform**

SkibaRentals is a comprehensive, full-stack web application designed for booking rental properties. Built with a robust Node.js and Express backend, it features a responsive front-end rendered using EJS templates. The platform enables users to discover, list, and review properties seamlessly.

## Key Features

- **User Authentication & Authorization**: Secure user registration, login, and session management using Passport.js. Role-based permissions ensure that only property owners can edit or delete their listings, and only review authors can manage their feedback.
- **Property Management (CRUD)**: Complete Create, Read, Update, and Delete functionality for rental listings. Users can add new properties with rich details including pricing, location, and descriptions.
- **Cloud Image Uploads**: Integrated with Cloudinary and Multer to handle image uploads efficiently. Images are securely hosted in the cloud rather than locally.
- **Interactive Reviews & Ratings**: Users can leave detailed reviews and ratings on properties they've visited.
- **Data Validation & Error Handling**: Server-side data validation using Joi ensures all incoming data is properly structured before database insertion. Custom error-handling middleware provides user-friendly error messages.
- **Persistent Sessions**: Sessions are securely stored in MongoDB using `connect-mongo`, ensuring users stay logged in even during server restarts.
- **Map Integration**: Utilizes Mapbox SDK to visualize property locations geographically.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS (Embedded JavaScript templating), HTML5, CSS3, ejs-mate
- **Database**: MongoDB (Atlas Cloud)
- **Object Data Modeling (ODM)**: Mongoose
- **Authentication**: Passport.js (Local Strategy)
- **File Storage**: Cloudinary, Multer
- **Validation**: Joi
- **Deployment**: Render

## Links

- **Live Website**: [https://skiba-rentals.onrender.com](https://skiba-rentals.onrender.com)
- **GitHub Repository**: [https://github.com/noentity0/Skiba_Rentals](https://github.com/noentity0/Skiba_Rentals)

## Architecture

The application follows the **MVC (Model-View-Controller)** design pattern:
- **Models**: Defines database schemas for Users, Listings, and Reviews using Mongoose.
- **Views**: EJS templates structured for a clean and responsive user interface.
- **Routes / Controllers**: Express routers handling the business logic, middleware checks, and API endpoints modularly.
