📦 ShopHub – Modern Minimal E-Commerce Platform (Full Stack)

A fully-featured e-commerce web application built with Next.js, MongoDB, TailwindCSS, and Next-Auth, featuring:

🔐 User Authentication (Login, Signup, Profile Editing)

🛍️ Product Catalog with Categories

🛒 Cart System

❤️ Wishlist

🚚 Checkout Flow

📦 Order Management

🛠️ Full Admin CMS (Products, Users, Orders, Stats)


☁️ Cloudinary Image Upload


⭐ Live Features Overview
🧑‍🤝‍🧑 User Features

Create account
Login / Logout
Edit profile (name + profile picture)
Image uploads (Cloudinary)
Manage wishlist
View orders
Checkout with stored shipping address

🛠️ Admin Features (CMS)

Admin account = admin@yourdomain.com
(Admin role auto-detected based on email)

✔ Admin Dashboard

Revenue
Orders count
Users count
Product count

✔ Manage Products
Create new product
Edit existing product
Delete product
Upload product images
Real-time update across homepage

✔ Manage Users

View all registered users

✔ Manage Orders

View all orders
View order details
Order status updates (pending → shipped → delivered)

🖥️ Tech Stack
Frontend

Next.js 13+
React
TailwindCSS
Framer Motion (animations)
Lucide Icons

Backend / API

Next.js API Routes
MongoDB + Mongoose
Next-Auth (JWT strategy)
Cloudinary (image uploads)

🔐 Authentication System
✔ Uses Next-Auth Credentials provider
✔ Passwords hashed with bcrypt
✔ JWT-based sessions
✔ Admin detected by email
✔ Session auto-refresh with updated name/image

🛠️ Project Structure

/pages
  /account
    index.js          → Login / Signup / Dashboard
    edit.js           → Edit profile
    password.js       → Change password
  /admin
    layout.js         → Admin layout wrapper
    index.js          → Admin dashboard
    /products
      index.js        → List products
      new.js          → Create product
      edit/[id].js    → Edit product
    /orders
      index.js        → All orders
      [id].js         → Order details
    /users
      index.js        → All users
  /api
    /auth
      [...nextauth].js → Authentication
      signup.js        → User signup
    upload.js          → Cloudinary upload
    products.js        → CRUD products
    orders.js          → Admin orders API
    wishlist.js        → User wishlist API

/models
  User.js
  Product.js
  Order.js

/lib
  auth.js
  mongoose.js

☁️ Environment Variables

Create a .env.local file:

MONGODB_URL=your_mongodb_connection
NEXTAUTH_SECRET=your_secret_key
CLOUDINARY_CLOUD=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
📸 Image Uploads (Cloudinary)

🛒 E-Commerce Logic

✔ Add to cart
✔ Update quantities
✔ Remove from cart
✔ Auto total calculation

📦 Orders System

Order schema includes:
User ID
Products list
Quantities
Prices
Shipping address
Order status
Payment status
Stripe session ID (future-ready)

🛠️ Installation & Setup
1. Clone the Repository
git clone https://github.com/yourusername/shophub.git
cd shophub
2. Install Packages
npm install
3. Add Environment Variables

Create .env.local (see above).

4. Run Project
npm run dev

Project runs at:

👉 http://localhost:3000

🔑 Admin Login

Use this email:

admin@yourdomain.com

Any password set during signup.


🧩 API Endpoints Overview
| Method   | Endpoint          | Description            |
| -------- | ----------------- | ---------------------- |
| GET      | /api/products     | Fetch all products     |
| POST     | /api/products     | Create new product     |
| PUT      | /api/products?id= | Update product         |
| DELETE   | /api/products?id= | Delete product         |
| GET      | /api/orders       | Get all orders (admin) |
| GET      | /api/orders?id=   | Get single order       |
| POST     | /api/auth/signup  | Create new user        |
| POST     | /api/upload       | Upload image           |
| GET/POST | /api/wishlist     | User wishlist          |


📈 Future Improvements (Optional)

Stripe Payments (fullt working)

Inventory tracking

Admin roles and permissions

Dark mode

Dashboard charts

Admin Dashboard upgrade

Order Tracking (admin)

etc
