# Firebase Security Rules

This document contains the recommended Firebase Security Rules for your blog system.

## Firestore Rules

Add these rules in the Firebase Console > Firestore Database > Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // --------------------------
    // TOOLS
    // --------------------------
    match /tools/{toolId} {
      allow read: if true;
      allow write, update, delete: if request.auth != null 
        && request.auth.token.email == "hamza@gmail.com";
    }

    // --------------------------
    // CATEGORIES (shared by tools + blogs)
    // --------------------------
    match /categories/{catId} {
      allow read: if true;
      allow write, update, delete: if request.auth != null 
        && request.auth.token.email == "hamza@gmail.com";
    }

    // --------------------------
    // REVIEWS
    // --------------------------
    match /reviews/{reviewId} {
      allow create: if true;
      allow read: if true;
      allow update, delete: if request.auth != null 
        && request.auth.token.email == "hamza@gmail.com";
    }

    // --------------------------
    // BLOGS
    // --------------------------
    match /blogs/{blogId} {
      // Anyone can read published blogs
      allow read: if resource.data.status == "published";

      // Admin can create, edit, delete
      allow create, update, delete: if request.auth != null
        && request.auth.token.email == "hamza@gmail.com";

      // Admin can also read drafts
      allow read: if request.auth != null
        && request.auth.token.email == "hamza@gmail.com";
    }

    // --------------------------
    // TAGS (for blogs)
    // --------------------------
    match /tags/{tagId} {
      allow read: if true;
      allow write, update, delete: if request.auth != null
        && request.auth.token.email == "hamza@gmail.com";
    }
  }
}
```

## Storage Rules

Add these rules in the Firebase Console > Storage > Rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /blogImages/{allPaths=**} {
      // Anyone can view blog images
      allow read: if true;

      // Only admin can upload or delete
      allow write, delete: if request.auth != null
        && request.auth.token.email == "hamza@gmail.com";
    }
  }
}
```

## Authentication Setup

1. Go to Firebase Console > Authentication
2. Enable the "Email/Password" sign-in method
3. Add your admin user manually or use the sign-up functionality

## Testing Rules

Run the test script to verify your Firebase connection:

```bash
node src/scripts/testFirebase.js
```

## Common Issues

### Permission Denied Errors
- Check that your Firestore rules allow the operation
- Ensure user is authenticated for write operations
- Verify the document path matches your rules

### Storage Upload Failures
- Check Storage rules allow uploads for authenticated users
- Verify file size limits (max 5MB in our implementation)
- Ensure proper file types are being uploaded

### Connection Timeouts
- Check your internet connection
- Verify Firebase project configuration
- Try refreshing the page and retrying