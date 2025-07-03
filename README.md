# Personal Blog Website

A full-stack personal blog website built with React, Express.js, Node.js, and MongoDB. Features a public blog interface and a secure admin panel for content management.

## Features

### Public Features
- 📖 Browse and read blog posts
- 🔍 Search posts by title and content
- 🏷️ Filter posts by categories and tags
- 💬 Comment on posts (with moderation)
- 📱 Responsive design
- 🌙 Dark/Light theme toggle
- 📄 Pagination for posts
- 📊 Post view tracking

### Admin Features
- 🔐 Secure admin authentication
- ✍️ Create, edit, and delete posts
- 📝 Markdown support for post content
- 🏷️ Manage categories and tags
- 💬 Moderate comments (approve/reject/delete)
- 📊 Analytics dashboard
- 📈 View post statistics
- 👀 Preview posts before publishing

## Tech Stack

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Markdown** - Markdown rendering
- **Lucide React** - Icons
- **CSS3** - Styling with CSS variables for theming

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Setup

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd personal-blog
   \`\`\`

2. **Install server dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Install client dependencies**
   \`\`\`bash
   npm run install-client
   \`\`\`

4. **Environment Configuration**
   \`\`\`bash
   cp .env.example .env
   \`\`\`
   
   Update the `.env` file with your configuration:
   \`\`\`env
   MONGODB_URI=mongodb://localhost:27017/personal-blog
   JWT_SECRET=your-super-secret-jwt-key-here
   NODE_ENV=development
   PORT=5000
   \`\`\`

5. **Create Admin User**
   
   You'll need to create an admin user manually in MongoDB or create a setup script. Here's an example document to insert into the `users` collection:
   
   \`\`\`javascript
   // The password will be hashed automatically by the pre-save middleware
   {
     username: "admin",
     email: "admin@example.com",
     password: "your-password", // This will be hashed
     role: "admin"
   }
   \`\`\`

6. **Start the application**
   
   For development:
   \`\`\`bash
   npm run dev
   \`\`\`
   
   For production:
   \`\`\`bash
   npm run build
   npm start
   \`\`\`

## Usage

### Development
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Admin Panel: http://localhost:3000/admin

### Production
The app serves the built React app from the Express server on the configured PORT.

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user

### Posts
- `GET /api/posts` - Get published posts (public)
- `GET /api/posts/:slug` - Get single post by slug (public)
- `GET /api/posts/admin/all` - Get all posts (admin)
- `POST /api/posts` - Create post (admin)
- `PUT /api/posts/:id` - Update post (admin)
- `DELETE /api/posts/:id` - Delete post (admin)

### Comments
- `GET /api/comments/post/:postId` - Get approved comments for post
- `POST /api/comments` - Create comment (public)
- `GET /api/comments/admin/all` - Get all comments (admin)
- `PUT /api/comments/:id/status` - Update comment status (admin)
- `DELETE /api/comments/:id` - Delete comment (admin)

### Analytics
- `GET /api/analytics` - Get blog analytics (admin)

## Project Structure

\`\`\`
personal-blog/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   └── App.js          # Main app component
│   └── package.json
├── models/                 # MongoDB models
├── routes/                 # Express routes
├── middleware/             # Custom middleware
├── server.js              # Express server
└── package.json           # Server dependencies
\`\`\`

## Key Features Explained

### Theme System
The app includes a complete dark/light theme system using CSS variables and React context.

### Authentication
JWT-based authentication with protected routes for admin functionality.

### Content Management
- Rich text editing with Markdown support
- Image upload support via URL
- Draft and published post states
- SEO-friendly slugs

### Comment System
- Public commenting with email verification
- Admin moderation (approve/reject/delete)
- Nested comment support structure

### Analytics
- Post view tracking
- Comment engagement metrics
- Popular posts identification
- Admin dashboard with key statistics

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected admin routes
- Input validation and sanitization
- CORS configuration
- Rate limiting ready (middleware included)

## Customization

### Styling
The app uses CSS variables for easy theming. Modify the variables in `client/src/App.css`:

\`\`\`css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #6b7280;
  /* ... other variables */
}
\`\`\`

### Content
- Update the about page content in `client/src/pages/About.js`
- Modify the hero section in `client/src/pages/Home.js`
- Change social links in the footer component

## Deployment

### Environment Variables for Production
\`\`\`env
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
PORT=5000
\`\`\`

### Build for Production
\`\`\`bash
npm run build
\`\`\`

This creates an optimized build in the `client/build` folder.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the repository or contact the maintainer.
