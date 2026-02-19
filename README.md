# 🛍️ Modern E-Commerce Store

A full-stack, modern e-commerce application built with **Next.js**, **MongoDB Atlas**, **Stripe Payments**, and **Tailwind CSS**.

<img width="1111" height="889" alt="ecmrc1" src="https://github.com/user-attachments/assets/cbdca5d5-5ad9-43f6-b2e0-fc0ec5917ccd" />


## ✨ Features

- 🎨 **Modern UI/UX**: Glass-morphism design, smooth animations with Framer Motion
- 📱 **Responsive Design**: Mobile-first approach with floating navigation
- 🔍 **Real-time Search**: Instant product filtering by name
- 🏷️ **Category Filtering**: Dynamic category pills with active states
- 🛒 **Shopping Cart**: Persistent cart with localStorage
- 💳 **Stripe Payments**: Secure checkout with Stripe integration
- ⚡ **Fast Performance**: Next.js SSR with optimized images
- 🗄️ **MongoDB Atlas**: Cloud database for products and orders

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 14 (Pages Router) |
| **Frontend** | React, Tailwind CSS |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Database** | MongoDB Atlas (Mongoose) |
| **Payments** | Stripe Checkout |
| **State Management** | React Context API + localStorage |


## 📁 Project Structure
my-ecommerce/
├── components/
│   ├── footer.js          
│   ├── layout.js          
│   ├── product.js        
│   └── ProductsContext.js 
├── lib/
│   └── mongoose.js         
├── models/
│   ├── Order.js           
│   └── Product.js          
├── pages/
│   ├── api/
│   │   ├── checkout.js     
│   │   ├── products.js     
│   │   └── webhook.js      
│   ├── _app.js            
│   ├── _document.js        
│   ├── checkout.js         
│   └── index.js            
├── public/
│   └── products/           
├── styles/
│   └── globals.css        
├── .env                  
└── package.json
plain
Copy

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/my-ecommerce.git
   cd my-ecommerce
Install dependencies
bash
Copy
npm install
Set up environment variables
Create .env file in root:
env
Copy
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/test-ecommerce
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
Add product images
Place your PNG images in public/products/ folder:
plain
Copy
public/products/
├── iphone.png
├── galaxy.png
├── airpods.png
└── ...
Seed the database
Add products to MongoDB Atlas with this schema:
JSON
Copy
{
  "name": "iPhone 14 Pro",
  "description": "The latest iPhone with advanced features",
  "price": 899,
  "category": "Mobiles",
  "picture": "/products/iphone.png"
}
Run the development server
bash
Copy
npm run dev
Open http://localhost:3000
💳 Stripe Setup
Create Stripe account at stripe.com
Get your API keys from Dashboard → Developers → API keys
Add webhook endpoint for production:
URL: https://yourdomain.com/api/webhook
Events: checkout.session.completed
Update webhook.js with your webhook secret

Product Categories
Categories are dynamically generated from MongoDB. Add products with different category fields to create new sections.
Images
Format: PNG with transparent background recommended
Size: 500x500px or larger
Location: public/products/
Reference: /products/filename.png in MongoDB

<img width="1051" height="756" alt="ecmrc2" src="https://github.com/user-attachments/assets/72
<img width="1123" height="682" alt="ecmrc3" src="https://github.com/user-attachments/assets/475031fb-5164-44c9-9e3e-cede516c3c35" />
7a905d-84ce-4082-9693-cf2c0c2346f6" />
<img width="847" height="661" alt="ecmrc4" src="https://github.com/user-attachments/assets/85a38269-b6d0-4ba9-805b-1293021bc6bc" />
