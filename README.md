# DreamStays

A full-stack Airbnb-like web application for listing, searching, and wishlisting rental properties.

---

## 🚀 Features
- User authentication (signup, login, logout)
- Add, edit, and delete property listings
- Search and filter listings by location, price, and number of guests
- Wishlist: add/remove listings to your personal wishlist
- View your wishlist from the navbar
- Responsive, modern UI
- Flash messages for user feedback

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Frontend:** EJS, CSS, Bootstrap, FontAwesome
- **Authentication:** Passport.js

---

## ⚙️ Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jahnavi-MN496/DreamStays.git
   cd DreamStays
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up MongoDB:**
   - Make sure MongoDB is running locally on `mongodb://127.0.0.1:27017/wanderlustinfo` (or update the connection string in `init/index.js` and `app.js` if needed).
4. **Initialize the database with sample data:**
   ```bash
   node ./init/index.js
   ```
5. **Start the server:**
   ```bash
   npm start
   # or
   node app.js
   ```
6. **Visit in your browser:**
   - Go to [http://localhost:3000/listings](http://localhost:3000/listings)

---

## 📚 API Endpoints & Functions

### **Authentication**
- `GET /signup` — Render signup form
- `POST /signup` — Register a new user
- `GET /login` — Render login form
- `POST /login` — Log in user
- `GET /logout` — Log out user

### **Listings**
- `GET /listings` — View all listings (with search/filter)
- `GET /listings/new` — Render form to add a new listing (auth required)
- `POST /listings` — Create a new listing (auth required)
- `GET /listings/:id` — View a single listing (auth required)
- `GET /listings/:id/edit` — Edit a listing (owner only)
- `PUT /listings/:id` — Update a listing (owner only)
- `DELETE /listings/:id` — Delete a listing (owner only)

### **Wishlist**
- `GET /wishlist` — View your wishlist (auth required)
- `POST /wishlist/add/:id` — Add a listing to your wishlist (auth required)
- `POST /wishlist/remove/:id` — Remove a listing from your wishlist (auth required)

### **Reviews**
- `POST /listings/:id/reviews` — Add a review to a listing (auth required)
- `DELETE /listings/:id/reviews/:reviewId` — Delete a review (author only)

---

## 📝 Contribution
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License
This project is open source and available under the [MIT License](LICENSE). 