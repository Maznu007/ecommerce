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
<img width="444" height="454" alt="image" src="https://github.com/user-attachments/assets/c30383d8-512c-4898-b75f-fcc55629973a" />

Edit profile (name + profile picture)
<img width="1085" height="428" alt="image" src="https://github.com/user-attachments/assets/2b578bdf-dcaf-4f4a-8980-276057fd23ce" />


Image uploads (Cloudinary)

Manage wishlist
<img width="1112" height="681" alt="image" src="https://github.com/user-attachments/assets/98a68cbe-4eca-4276-9d8d-6c73d59a4697" />

View orders

Checkout with stored shipping address
<img width="1087" height="663" alt="image" src="https://github.com/user-attachments/assets/94dc5e63-ff8e-4ac8-9912-b9a2114fb32d" />

🛠️ Admin Features (CMS)

Admin account = admin@yourdomain.com

(Admin role auto-detected based on email)

✔ Admin Dashboard
<img width="1913" height="321" alt="image" src="https://github.com/user-attachments/assets/22a6f0a4-017e-4541-a27e-7f27061614fc" />
Revenue

Orders count

Users count

Product count

✔ Manage Products
<img width="1906" height="584" alt="image" src="https://github.com/user-attachments/assets/ef154165-4609-471d-9524-9e5d1e174cd8" />

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

Images are uploaded via:

/api/upload

Admin can upload:

Product images

User profile picture

Cloudinary returns:

secure_url → saved as image path
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
