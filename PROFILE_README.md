# User Profile Feature

## Overview
The user profile feature allows users to manage their personal information, view their burnout assessment history, and upload profile pictures.

## Features

### 🏠 **Profile Page** (`/profile`)
- **Personal Information Display**: Shows user's name, email, bio, location, company, and position
- **Profile Picture Upload**: Users can upload and change their profile pictures
- **Edit Mode**: Toggle to edit profile information
- **Assessment Statistics**: Display total assessments, latest score, and average score
- **Assessment History**: View detailed history of all burnout assessments
- **Responsive Design**: Works perfectly on desktop and mobile devices

### 🖼️ **Image Upload (Multer)**
- **File Types**: Supports all common image formats (JPEG, PNG, GIF, etc.)
- **File Size Limit**: Maximum 5MB per image
- **Storage**: Images are stored in `server/uploads/profiles/`
- **Security**: File type validation and size limits
- **Unique Naming**: Each uploaded file gets a unique name to prevent conflicts

### 🔐 **Authentication**
- **Protected Route**: Profile page requires user authentication
- **Token-based**: Uses JWT tokens for secure access
- **Auto-redirect**: Redirects to login if not authenticated

### 🎨 **Enhanced Navbar**
- **User Dropdown Menu**: Click on user name to access profile options
- **Profile Link**: Easy access to profile page
- **Responsive**: Mobile-friendly dropdown menu
- **Smooth Animations**: Enhanced with hover effects and transitions

## Backend API Endpoints

### Profile Management
- `GET /api/profile` - Get user profile information
- `PUT /api/profile` - Update user profile information
- `GET /api/profile/statistics` - Get user's assessment statistics

### Image Upload
- `POST /api/profile/upload-avatar` - Upload profile picture
  - Accepts: `multipart/form-data` with `avatar` field
  - Returns: Updated avatar URL

## Frontend Components

### Profile Page (`src/pages/Profile.tsx`)
- Complete profile management interface
- Image upload with preview
- Edit form with validation
- Statistics dashboard
- Assessment history timeline

### Enhanced Navbar (`src/components/Navbar.tsx`)
- User dropdown menu
- Profile navigation link
- Improved mobile menu

## Database Schema

### User Model Updates
```javascript
{
  // ... existing fields
  bio: String,           // User bio/description
  location: String,      // User location
  company: String,       // User's company
  position: String,      // User's job position
  avatar: String,        // Profile picture URL
}
```

## Installation & Setup

1. **Install Dependencies**:
   ```bash
   cd server
   npm install multer
   ```

2. **Create Upload Directories**:
   ```bash
   mkdir -p server/uploads/profiles
   ```

3. **Add Profile Route**: Already added to routing system

4. **Start Development**:
   ```bash
   # Start backend
   cd server && npm start
   
   # Start frontend
   cd rekindle && npm run dev
   ```

## Usage

1. **Login** to your account
2. **Click** on your name in the navbar
3. **Select** "My Profile" from the dropdown
4. **View** your profile information and statistics
5. **Click** "Edit Profile" to update information
6. **Click** the camera icon to upload a new profile picture
7. **View** your assessment history and trends

## Features in Detail

### Profile Picture Upload
- Click the camera icon on your profile picture
- Select an image file (max 5MB)
- Image automatically uploads and updates
- Supports JPEG, PNG, GIF, and other image formats

### Profile Information
- **Name**: Your display name
- **Email**: Contact email address
- **Bio**: Personal description or bio
- **Location**: Current location
- **Company**: Current employer
- **Position**: Job title or role

### Assessment Statistics
- **Total Assessments**: Number of completed burnout assessments
- **Latest Score**: Most recent burnout risk score
- **Average Score**: Overall average across all assessments
- **Visual Progress Bars**: Color-coded risk level indicators

### Assessment History
- **Chronological List**: All assessments ordered by date
- **Detailed Information**: Shows designation, resource allocation, mental fatigue
- **Risk Level Indicators**: Color-coded badges and progress bars
- **Interactive Cards**: Hover effects and smooth animations

## Design Features
- **Glassmorphism Effects**: Modern translucent backgrounds
- **Gradient Colors**: Beautiful color transitions
- **Smooth Animations**: Hover effects and transitions
- **Responsive Design**: Works on all screen sizes
- **Loading States**: Elegant loading animations
- **Error Handling**: User-friendly error messages

## Security Features
- **File Type Validation**: Only image files allowed
- **Size Limits**: 5MB maximum file size
- **Authentication Required**: All endpoints require valid JWT token
- **Unique File Names**: Prevents file conflicts and overwrites 