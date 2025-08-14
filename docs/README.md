# AI Tools Directory - Complete Web Application

A modern, responsive AI tools directory built with React, TypeScript, Firebase, and Tailwind CSS. Perfect for entrepreneurs, developers, and agencies looking to create their own AI tools marketplace.

## 🚀 Features

- **50+ Pre-loaded AI Tools** across 22+ categories
- **Firebase Backend Integration** with Firestore database
- **Complete Admin Panel** with full CRUD operations
- **User Authentication System** with Firebase Auth
- **Tool Submission & Approval Workflow**
- **Rating & Review System**
- **Advanced Search & Filter**
- **Responsive Mobile-First Design**
- **Ad Revenue Integration** (Adsterra ready)
- **SEO Optimized Structure**
- **Modern UI with shadcn/ui Components**

## 📋 Requirements

- Node.js 18+ and npm
- Firebase account (free tier works)
- Modern web browser

## ⚡ Quick Start

### 1. Installation

```bash
# Clone the repository
git clone [your-repo-url]
cd ai-tools-directory

# Install dependencies
npm install
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Firestore Database
4. Enable Authentication (Email/Password)
5. Get your Firebase config

### 3. Configuration

1. Update `src/lib/firebase.js` with your Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to see your application.

### 5. Populate Sample Data

1. Go to `/auth` and login with: `hamza@gmail.com` (set password in Firebase)
2. Navigate to Admin Panel
3. Click "Populate Sample Tools" to load 50+ tools

## 🔧 Admin Credentials

**Default Admin Email**: `hamza@gmail.com`

⚠️ **Important**: Update this email in `src/components/ProtectedRoute.tsx` and `src/pages/Auth.tsx` for production use.

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Deploy automatically

### Netlify
1. Drag and drop the `dist` folder
2. Or connect via Git

### Firebase Hosting
```bash
npm run build
firebase deploy
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── AdSlot.tsx      # Advertisement component
│   ├── AdminLayout.tsx # Admin panel layout
│   └── ProtectedRoute.tsx # Auth protection
├── pages/              # Application pages
│   ├── admin/          # Admin panel pages
│   ├── Index.tsx       # Homepage
│   ├── Categories.tsx  # Categories listing
│   ├── ToolDetail.tsx  # Individual tool page
│   └── Auth.tsx        # Authentication
├── lib/                # Utilities and configs
├── services/           # Firebase services
└── data/               # Static data
```

## 🎨 Customization

### Colors & Branding
Edit `src/index.css` to customize the color scheme:

```css
:root {
  --primary: 262 91% 58%;        /* Purple theme */
  --secondary: 220 14% 96%;      /* Light gray */
  --accent: 262 91% 58%;         /* Accent color */
}
```

### Adding Categories
Update `src/data/toolsData.ts` to add new categories.

### Ad Integration
Replace sample ad codes in `src/components/AdSlot.tsx` with your actual ad network codes.

## 🔒 Security Notes

1. **Change admin email** in production
2. **Set up Firebase security rules**
3. **Enable only necessary authentication methods**
4. **Use environment variables** for sensitive data

## 📞 Support

For support and questions:
- 📧 Email: [your-email]
- 📖 Documentation: See `/docs` folder
- 🐛 Issues: GitHub Issues

## 📄 License

This project is licensed under the [License Type] - see LICENSE file for details.

## 🚀 What's Included

- ✅ Complete source code
- ✅ Firebase configuration
- ✅ 50+ sample AI tools
- ✅ Admin panel
- ✅ User authentication
- ✅ Responsive design
- ✅ SEO optimization
- ✅ Ad integration ready
- ✅ Documentation
- ✅ Free updates for 6 months

---

**Ready to launch your AI tools directory? Start earning revenue from day one!**