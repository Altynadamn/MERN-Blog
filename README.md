# MERN Blog Project

## Overview
A full-stack blog application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. Users can create, edit, delete, and view blog posts with authentication and authorization.

## Features
- User authentication (JWT-based login/register)
- CRUD operations for blog posts
- Rich text editor for writing posts
- Image upload functionality
- Pagination and search for blog posts
- Protected routes for authenticated users
- Responsive design

## Tech Stack
- **Frontend:** React.js, React Router, Axios, TailwindCSS (or any preferred CSS framework)
- **Backend:** Node.js, Express.js, MongoDB (Mongoose ODM)
- **Authentication:** JSON Web Tokens (JWT), bcrypt for password hashing
- **Storage:** Cloudinary / Multer for image uploads (optional)

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/Altynadamn/mern-blog.git
   cd mern-blog
   ```
2. Install dependencies for both frontend and backend:
   ```sh
   cd client
   npm install
   cd ../server
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the `server` directory with the following:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     CLOUDINARY_NAME=your_cloudinary_name (if using image upload)
     CLOUDINARY_API_KEY=your_api_key
     CLOUDINARY_API_SECRET=your_api_secret
     ```
4. Start the backend server:
   ```sh
   cd server
   npm start
   ```
5. Start the frontend:
   ```sh
   cd client
   npm start
   ```

## API Endpoints
### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/auth/user` - Get current user data

### Blog Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get a single post by ID
- `POST /api/posts` - Create a new post (authenticated)
- `PUT /api/posts/:id` - Update a post (authenticated)
- `DELETE /api/posts/:id` - Delete a post (authenticated)

## Folder Structure
```
mern-blog/
├── frontend/
│   ├── favicon/
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/      
│   ├── models/
│   ├── routes/
│   ├── images/
│   ├── index.js
│   ├──package.json
│   ├── package-lock.json
│   ├── package.json
│   └── verifyToken.js
└── README.md
```

## Contributing
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`.
3. Commit changes: `git commit -m "Add new feature"`.
4. Push the branch: `git push origin feature-branch`.
5. Submit a pull request.

## License
This project is licensed under the MIT License.

