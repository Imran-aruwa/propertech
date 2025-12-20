# ============================================
// FILE: README.md
// ============================================
# PROPERTECH SOFTWARE - Smarter Property Management, Anywhere

Modern property management SaaS platform built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Multi-Role Portal System**
  - 👨‍💼 Owner Portal: Property analytics, rent tracking, and comprehensive reporting
  - 🏢 Agent Portal: Commission tracking and property management
  - 🔑 Caretaker Portal: Rent collection, maintenance, and tenant management
  - 🏠 Tenant Portal: Payment history and maintenance requests
  - 👮 Security Portal: Incident reporting and attendance tracking
  - 🌿 Gardener Portal: Task management and equipment tracking

- **Payment Integration**
  - Paystack payment gateway integration
  - Automated rent collection
  - Payment history tracking
  - Receipt generation

- **Advanced Analytics**
  - Real-time revenue tracking
  - Occupancy rate monitoring
  - Property performance metrics
  - Custom report generation

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Paystack account (for payment processing)
- PostgreSQL database (for production)

## 🛠️ Installation

### 1. Clone and Install

```bash
# Install dependencies
npm install
```

### 2. Environment Setup

Create `.env.local` file in the root directory:

```env
# Project Configuration
PROJECT_NAME=Propertech Software
NODE_ENV=development

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Paystack Configuration (Get from https://dashboard.paystack.com)
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_your_test_key_here

# Database (for production)
DATABASE_URL="postgresql://user:password@localhost:5432/propertech"

# NextAuth (generate with: openssl rand -base64 32)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# Optional: Analytics
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
propertech/
├── app/                          # Next.js 14 App Router
│   ├── owner/                   # Owner portal pages
│   ├── agent/                   # Agent portal pages
│   ├── caretaker/              # Caretaker portal pages
│   ├── tenant/                 # Tenant portal pages
│   ├── staff/                  # Staff portals (security, gardener)
│   ├── api/                    # API routes
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Landing page
│   └── globals.css             # Global styles
├── components/                  # React components
│   ├── ui/                     # UI components
│   ├── layout/                 # Layout components
│   ├── payments/               # Payment components
│   ├── properties/             # Property components
│   ├── staff/                  # Staff components
│   └── incidents/              # Incident components
├── lib/                        # Utility functions
│   ├── auth.ts                 # Authentication utilities
│   ├── db.ts                   # Database utilities
│   ├── utils.ts                # General utilities
│   └── prisma.ts               # Prisma client
├── types/                      # TypeScript type definitions
│   ├── index.ts                # Main types
│   ├── database.ts             # Database types
│   └── api.ts                  # API types
├── public/                     # Static assets
└── [config files]              # Configuration files
```

## 🎨 Customization

### Update Brand Colors

Edit `tailwind.config.ts`:

```typescript
primary: {
  500: '#1A89FF', // Your brand color
  600: '#0070F3', // Darker shade
}
```

### Configure Payment Gateway

1. Sign up at [Paystack](https://paystack.com)
2. Get your API keys from the dashboard
3. Add keys to `.env.local`:
   ```env
   NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_your_key
   ```

### Add Custom Logo

Replace the logo in `app/page.tsx` with your SVG or image component.

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Check TypeScript types

# Database (when using Prisma)
npx prisma migrate dev    # Run migrations
npx prisma studio         # Open Prisma Studio
```

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables:
   - `NEXT_PUBLIC_API_URL`
   - `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`
   - `NEXT_PUBLIC_SITE_URL`
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
5. Deploy!

### Production Environment Variables

```env
PROJECT_NAME=Propertech Software
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.propertechsoftware.com
NEXT_PUBLIC_SITE_URL=https://propertechsoftware.com
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_your_live_key
NEXT_PUBLIC_ENABLE_ANALYTICS=true
DATABASE_URL=your_production_database_url
NEXTAUTH_URL=https://propertechsoftware.com
NEXTAUTH_SECRET=your_secure_production_secret
```

## 🔒 Security Best Practices

- ✅ Never commit `.env` files to version control
- ✅ Use environment variables for all sensitive data
- ✅ Enable HTTPS in production
- ✅ Implement proper authentication and authorization
- ✅ Validate and sanitize all user inputs
- ✅ Keep dependencies updated regularly

## 🧪 Testing

```bash
# Add testing commands when implemented
npm run test         # Run unit tests
npm run test:e2e     # Run end-to-end tests
```

## 📚 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/ui
- **Charts:** Recharts
- **Icons:** Lucide React
- **Authentication:** NextAuth.js
- **Database:** PostgreSQL with Prisma ORM
- **Payments:** Paystack
- **Deployment:** Vercel

## 🗺️ Roadmap

- [x] Landing page
- [x] Multi-role portal system
- [x] Property management module
- [x] Tenant management
- [x] Financial tracking
- [x] Maintenance requests
- [x] Payment integration (Paystack)
- [ ] SMS notifications
- [ ] Email notifications
- [ ] Mobile app (React Native)
- [ ] Advanced reporting
- [ ] Document management
- [ ] Lease management

## 🤝 Support

- **Email:** support@propertechsoftware.com
- **Website:** https://propertechsoftware.com
- **Documentation:** https://docs.propertechsoftware.com

## 📄 License

Proprietary - All rights reserved © 2025 PROPERTECH SOFTWARE

---

Built with ❤️ for landlords and property managers worldwide.
