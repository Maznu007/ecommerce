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

```
/pages
  /account
    index.js          → Login / Signup / Dashboard
    edit.js           → Edit profile
    password.js       → Change password
  /admin
    layout.js         → Admin layout
    index.js          → Admin dashboard
    /products
      index.js        → Product list
      new.js          → Create product
      edit/[id].js    → Edit product
    /orders
      index.js        → All orders
      [id].js         → Order details
    /users
      index.js        → User list

/api
  /auth
    [...nextauth].js  → Auth config
    signup.js         → User signup
  products.js         → CRUD products
  orders.js           → Admin orders API
  wishlist.js         → Wishlist API
  upload.js           → Cloudinary upload

/models
  User.js
  Product.js
  Order.js

/lib
  auth.js
  mongoose.js
```


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

<img width="1091" height="872" alt="image" src="https://github.com/user-attachments/assets/02be18e7-93d4-4cd2-b7ff-19278114bbe9" />

<img width="1084" height="886" alt="image" src="https://github.com/user-attachments/assets/0facb191-0444-441f-9ded-9c283c8419fd" />

<img width="1096" height="815" alt="image" src="https://github.com/user-attachments/assets/e9f42ab4-ee5f-42e5-a21d-b66c941fc3ab" />

<img width="1095" height="695" alt="image" src="https://github.com/user-attachments/assets/11e394dd-a4a3-4d7f-8338-790aa4d84002" />

<img width="1068" height="878" alt="image" src="https://github.com/user-attachments/assets/d6e8a600-ceb5-4d4b-b5f5-f44497becc34" />

<img width="1117" height="457" alt="image" src="https://github.com/user-attachments/assets/881ec233-4f70-4f3d-b13d-761b3e7b835d" />

<img width="1081" height="569" alt="image" src="https://github.com/user-attachments/assets/adf0a83d-694c-4a26-94ac-f5a9e08bd4aa" />

<img width="1191" height="656" alt="image" src="https://github.com/user-attachments/assets/9618ce88-1c56-4be3-ad72-0cbd8872a27e" />

<img width="1896" height="716" alt="image" src="https://github.com/user-attachments/assets/93f61c7f-f03d-405a-a65d-af245c70319f" />

<img width="1652" height="734" alt="image" src="https://github.com/user-attachments/assets/e39c36f8-2a5a-403b-baa3-653268a83803" />

<img width="1671" height="693" alt="image" src="https://github.com/user-attachments/assets/88b071b4-ccab-4aa1-8d6e-adf2297f80c2" />

<img width="1656" height="416" alt="image" src="https://github.com/user-attachments/assets/b8791008-939f-4e92-881f-ab9b5338cbdb" />


