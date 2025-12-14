# 🛒 GoCart - E-Commerce Platform

A modern, full-featured e-commerce platform built with Next.js 15, Firebase, and Redux.

## ✨ Features

### 👥 User Features
- **Authentication**: Secure signup and login with Firebase
- **Product Browsing**: Browse products by category
- **Shopping Cart**: Add/remove items, quantity management
- **Product Details**: View detailed product information
- **Search**: Search products by name
- **Orders**: Track order history
- **User Profile**: Manage account settings

### 👨‍💼 Admin Features
- **Admin Dashboard**: Overview of products, orders, stores
- **Product Management**: Add, edit, delete products
- **Store Management**: Approve and manage stores
- **Coupon Management**: Create and manage discount coupons
- **Order Management**: View and process orders

### 🏪 Store Owner Features
- **Store Dashboard**: Manage your store
- **Product Management**: Add and manage your products
- **Order Management**: View and fulfill orders
- **Store Settings**: Update store information

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/gocart.git
   cd gocart
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your Firebase configuration values.

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password)
3. Create Firestore Database
4. Enable Storage
5. Copy configuration to `.env.local`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed setup instructions.

### Admin Setup

1. Create admin user in Firebase Authentication
2. Add user UID to Firestore `admins` collection
3. See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for details

## 📁 Project Structure

```
gocart/
├── app/                    # Next.js app directory
│   ├── (public)/          # Public routes
│   ├── admin/             # Admin routes
│   ├── store/             # Store owner routes
│   ├── api/               # API routes
│   └── lib/               # Firebase config
├── components/            # React components
├── lib/                  # Redux store, utilities
├── assets/               # Static assets
└── prisma/              # Database schema
```

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment guide.

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **UI**: React 19, Tailwind CSS
- **State Management**: Redux Toolkit
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🔐 Security

- Firebase Security Rules for Firestore
- Firebase Storage Rules
- Environment variables for sensitive data
- Admin authentication checks

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, email support@yourdomain.com or open an issue.

---

Built with ❤️ using Next.js and Firebase

