📦 ShopHub — Modern Minimal E-Commerce Platform 📦

ShopHub is a fully-featured, clean, minimal e-commerce platform built with Next.js, MongoDB, TailwindCSS, and Next-Auth.
It includes a complete user shopping experience + a full Admin CMS.

------------------------------------------------------------------------------------------------------------------------

✨ Features at a Glance ✨
---------------------------
🧑‍💻 User Features 🧑‍💻
--------------------

Create an account / Login / Logout

Edit profile (name + image via Cloudinary)

Wishlist system

Shopping cart

Product browsing & categories

Checkout flow with address

View past orders

------------------------------------------------------------------------------------------------------------------------

🛠️ Admin CMS 🛠️
-----------------

Admin auto-detected using admin@yourdomain.com

Dashboard with:

Total revenue

Orders count

Products count

Users count

Manage Products (Create, Edit, Delete + Image Uploads)

Manage Users

Manage Orders + Status updates

Real-time updates across the site

------------------------------------------------------------------------------------------------------------------------

🧱 Tech Stack 🧱
------------------
Frontend
---------
Next.js 13+

React

TailwindCSS

Framer Motion

Lucide Icons

Backend

Next.js API Routes

MongoDB + Mongoose

Next-Auth (JWT strategy)

Cloudinary (image uploads)

------------------------------------------------------------------------------------------------------------------------

🔐 Authentication 🔐
-------------------

Credentials Provider (email + password)

Password hashing using bcrypt

JWT-based sessions

Automatic session refresh

Admin role handled by email match

------------------------------------------------------------------------------------------------------------------------

📁 Project Structure 📁
----------------------

/pages
  /account
    index.js          → Login / Signup / Dashboard
    edit.js           → Edit profile

------------------------------------------------------------------------------------------------------------------------

☁️ Environment Variables ☁️
--------------------------- 
Create a .env.local file:

MONGODB_URL=your_mongodb_connection
NEXTAUTH_SECRET=your_secret_key

CLOUDINARY_CLOUD=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
📸 Image Uploads

Uses Cloudinary to upload:

User profile images

Product images

Supports large image sizes automatically.

------------------------------------------------------------------------------------------------------------------------

🛒 E-Commerce Logic 🛒
---------------------
Cart

Add / remove items

Update quantity

Auto total calculation

Orders

Each order contains:

User reference

Product list

Quantity & pricing

Shipping address

Status (pending → shipped → delivered)

Payment status (Stripe-ready)

------------------------------------------------------------------------------------------------------------------------

🚀 Installation 🚀
----------------
1️⃣ Clone the Repository
git clone https://github.com/yourusername/shophub.git
cd shophub
2️⃣ Install Dependencies
npm install
3️⃣ Add Environment Variables

Create .env.local (see above).

4️⃣ Run Development Server
npm run dev

App runs at:

👉 http://localhost:3000

🔑 Admin Access

Login using:

Email: admin@yourdomain.com
Password: (any password you used during signup)

Admin privileges unlock the full CMS.

------------------------------------------------------------------------------------------------------------------------

🧩 API Endpoints Overview 🧩
---------------------------
| Method   | Endpoint          | Description            |
| -------- | ----------------- | ---------------------- |
| GET      | /api/products     | Fetch all products     |
| POST     | /api/products     | Create product         |
| PUT      | /api/products?id= | Update product         |
| DELETE   | /api/products?id= | Delete product         |
| GET      | /api/orders       | Get all orders (admin) |
| GET      | /api/orders?id=   | Get one order          |
| POST     | /api/auth/signup  | Register new user      |
| POST     | /api/upload       | Upload image           |
| GET/POST | /api/wishlist     | Wishlist operations    |

------------------------------------------------------------------------------------------------------------------------

📈 Planned Improvements 📈
-------------------------

🔵 Stripe payments

🌓 Dark Mode

📊 Admin dashboard charts

📦 Inventory tracking

🛰️ Order tracking & shipping updates

👥 Role-based admin permissions

------------------------------------------------------------------------------------------------------------------------
 
🏁 Conclusion 🏁
--------------

ShopHub is a modern, production-ready e-commerce starter designed with clean UI, smooth UX, scalable architecture, and a complete admin dashboard.

Admin role handled by email match

📁 Project Structure
