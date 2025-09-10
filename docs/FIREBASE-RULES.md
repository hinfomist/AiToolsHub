# Firebase Security Rules

This document contains the recommended Firebase Security Rules for your blog system.

## Firestore Rules

Add these rules in the Firebase Console > Firestore Database > Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to published blogs for everyone
    match /blogs/{blogId} {
      allow read: if resource.data.status == 'published';
      allow read, write: if request.auth != null; // Authenticated users can read/write all blogs
    }
    
    // Allow read access to categories and tags for everyone
    match /blogCategories/{categoryId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    match /blogTags/{tagId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Allow test collection for testing connectivity
    match /test/{docId} {
      allow read, write: if true;
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
    // Allow authenticated users to upload blog images
    match /blog-images/{allPaths=**} {
      allow read: if true; // Anyone can read images
      allow write: if request.auth != null; // Only authenticated users can upload
    }
    
    match /blog-featured/{allPaths=**} {
      allow read: if true; // Anyone can read featured images
      allow write: if request.auth != null; // Only authenticated users can upload
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