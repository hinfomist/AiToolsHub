# 📚 Complete Setup Guide

## 🎯 Prerequisites

Before starting, ensure you have:
- **Node.js 18+** installed ([Download here](https://nodejs.org/))
- **npm** or **yarn** package manager
- **Firebase account** (free tier works perfectly)
- **Code editor** (VS Code recommended)
- **Git** installed for version control

## 🚀 Step 1: Project Setup

### Download & Extract
1. Download the project files from your purchase
2. Extract to your desired directory
3. Open terminal in the project folder

### Install Dependencies
```bash
# Navigate to project directory
cd ai-tools-directory

# Install all dependencies
npm install

# Verify installation
npm list --depth=0
```

## 🔥 Step 2: Firebase Configuration

### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name (e.g., "ai-tools-directory")
4. Enable Google Analytics (optional)
5. Wait for project creation

### Enable Required Services

#### 2.1 Firestore Database
1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (we'll secure it later)
4. Select your preferred location
5. Click "Done"

#### 2.2 Authentication
1. Go to "Authentication" → "Sign-in method"
2. Enable "Email/Password" provider
3. Save the changes

#### 2.3 Create Admin User
1. Go to "Authentication" → "Users"
2. Click "Add user"
3. Email: `hamza@gmail.com` (or your preferred admin email)
4. Password: Create a strong password
5. Save the user

### Get Firebase Configuration
1. Go to Project Settings (gear icon)
2. Scroll to "Your apps"
3. Click "Web app" icon
4. Register your app with a name
5. Copy the configuration object

## ⚙️ Step 3: Configure Application

### Update Firebase Config
Open `src/lib/firebase.js` and replace the configuration:

```javascript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
```

### Update Admin Email (Optional)
If you used a different admin email, update these files:

**File: `src/components/ProtectedRoute.tsx`**
```typescript
// Line 34: Change the admin email
if (!user || user.email !== 'your-admin-email@domain.com') {
  return <Navigate to="/auth" replace />;
}
```

**File: `src/pages/Auth.tsx`**
```typescript
// Line 40: Update validation (optional)
if (formData.email !== 'your-admin-email@domain.com') {
  setError('Unauthorized access');
  return;
}
```

## 🎨 Step 4: Customization (Optional)

### Brand Colors
Edit `src/index.css` to match your brand:

```css
:root {
  --primary: 262 91% 58%;        /* Your primary color */
  --secondary: 220 14% 96%;      /* Secondary color */
  --accent: 262 91% 58%;         /* Accent color */
  --background: 0 0% 100%;       /* Background */
  --foreground: 222 91% 9%;      /* Text color */
}
```

### Site Title & Meta
Update `index.html`:

```html
<title>Your AI Tools Directory</title>
<meta name="description" content="Your custom description">
```

### Logo & Branding
1. Replace `public/favicon.ico` with your favicon
2. Update any logo references in components
3. Customize the header text in `src/pages/Index.tsx`

## 🚀 Step 5: First Run

### Start Development Server
```bash
npm run dev
```

### Access the Application
1. Open browser to `http://localhost:5173`
2. Verify homepage loads correctly
3. Test navigation between pages

### Test Admin Access
1. Go to `http://localhost:5173/auth`
2. Login with your admin credentials
3. Verify admin panel access at `/admin/tools`

## 📊 Step 6: Populate Sample Data

### Load Sample Tools
1. In admin panel, click "Populate Sample Tools"
2. Wait for completion (adds 50+ tools across all categories)
3. Verify tools appear on homepage and category pages

### Add Custom Tools
1. Go to "Add New Tool" in admin panel
2. Fill in tool information:
   - Name, description, category
   - Website URL, logo URL
   - Tags and highlights
3. Save and verify on frontend

## 🔒 Step 7: Security Configuration

### Firestore Security Rules
In Firebase Console → Firestore → Rules, replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all tools
    match /tools/{document} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == 'your-admin-email@domain.com';
    }
    
    // Allow read access to all reviews
    match /reviews/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Authentication Settings
1. Go to Authentication → Settings
2. Set up authorized domains for production
3. Configure password policy if needed

## 💰 Step 8: Ad Integration

### Replace Sample Ad Codes
In `src/components/AdSlot.tsx`, replace the comments with your actual ad codes:

```typescript
// Replace this comment with your actual ad script:
// Example for Adsterra:
/*
<script type="text/javascript">
  atOptions = {
    'key' : 'your-ad-key-here',
    'format' : 'iframe',
    'height' : 250,
    'width' : 300,
    'params' : {}
  };
</script>
<script type="text/javascript" src="//www.highperformanceformat.com/your-key/invoke.js"></script>
*/
```

## 🌐 Step 9: Production Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options

#### Option 1: Vercel (Recommended)
1. Push code to GitHub
2. Connect GitHub repo to Vercel
3. Deploy automatically

#### Option 2: Netlify
1. Create build: `npm run build`
2. Drag `dist` folder to Netlify
3. Configure redirects if needed

#### Option 3: Firebase Hosting
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login and initialize
firebase login
firebase init hosting

# Deploy
firebase deploy
```

## ✅ Step 10: Final Verification

### Test All Features
- [ ] Homepage loads correctly
- [ ] Category pages work
- [ ] Search functionality
- [ ] Tool detail pages
- [ ] Admin login
- [ ] Tool management (add/edit/delete)
- [ ] Sample tools populated
- [ ] Mobile responsiveness
- [ ] Ad placements visible

### Performance Check
- [ ] Page load times under 3 seconds
- [ ] Images optimized and loading
- [ ] No console errors
- [ ] Responsive on all devices

## 🆘 Troubleshooting

### Common Issues

**Firebase Connection Errors:**
- Double-check configuration in `firebase.js`
- Ensure Firebase project is active
- Verify API keys are correct

**Admin Login Issues:**
- Check admin email in Firebase Authentication
- Verify email in ProtectedRoute component
- Ensure password is correct

**Build Errors:**
- Run `npm install` again
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version compatibility

**Deployment Issues:**
- Ensure all environment variables are set
- Check build output for errors
- Verify deployment platform configuration

## 📞 Support

If you encounter any issues during setup:
1. Check the FAQ section in documentation
2. Review error messages carefully
3. Verify all steps were completed
4. Contact support with specific error details

---

**Congratulations! Your AI Tools Directory is now ready to launch and start generating revenue!** 🎉