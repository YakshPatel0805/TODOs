# Redux Saga Next - Todo Application

A modern full-stack todo application built with Next.js, Redux Saga, MongoDB, and Mongoose. Features user authentication, task management with due dates and priorities, and real-time notifications.

## 🚀 Features

- **User Authentication**
  - Sign up with email and password
  - Secure login with bcrypt password hashing
  - Forgot password functionality
  - Session management

- **Todo Management**
  - Create, read, update, and delete todos
  - Add descriptions to tasks
  - Set due dates and priority levels (Low, Medium, High)
  - Mark tasks as complete/incomplete
  - Search and filter tasks (All, Active, Done)

- **Notifications**
  - Real-time notification bell in top navigation
  - Shows tasks due within 3 days
  - Notification badge with count
  - Click outside to close notification panel

- **User Profile**
  - View user statistics (Total, Done, Pending tasks)
  - Progress bar showing completion percentage
  - Beautiful UI with gradient design

## 📁 Project Structure

```
redux-saga-next/
├── pages/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── signup.js          # User registration endpoint
│   │   │   ├── login.js           # User login endpoint
│   │   │   └── forgot-password.js # Password reset endpoint
│   │   └── todos/
│   │       ├── index.js           # GET (fetch all), POST (create), PUT (update)
│   │       └── [id].js            # DELETE endpoint (legacy)
│   ├── _app.js                    # Redux store provider & global setup
│   ├── index.js                   # Home/landing page
│   ├── login.js                   # Login page
│   ├── signup.js                  # Sign up page
│   ├── forgot-password.js         # Forgot password page
│   ├── profile.js                 # Main dashboard with todos & notifications
│   ├── logout.js                  # Logout handler
│   └── _document.js               # (optional) Custom document
│
├── store/
│   ├── store.js                   # Redux store configuration
│   ├── rootReducer.js             # Combine all reducers
│   ├── rootSaga.js                # Combine all sagas
│   ├── auth/
│   │   ├── authActions.js         # Auth action creators
│   │   ├── authReducer.js         # Auth state reducer
│   │   └── authSaga.js            # Auth side effects (login, signup)
│   ├── todos/
│   │   ├── todoActions.js         # Todo action creators
│   │   ├── todoReducer.js         # Todo state reducer
│   │   └── todoSaga.js            # Todo side effects (CRUD operations)
│   └── slices/
│       ├── authSlice.js           # (optional) Redux Toolkit auth slice
│       └── todoSlice.js           # (optional) Redux Toolkit todo slice
│
├── lib/
│   ├── db.js                      # MongoDB connection setup
│   └── models/
│       ├── User.js                # User schema with bcrypt hashing
│       └── Todo.js                # Todo schema with userId reference
│
├── public/
│   └── (static assets)
│
├── .env.local                     # Environment variables (MongoDB URI, etc.)
├── .gitignore                     # Git ignore rules
├── package.json                   # Project dependencies
├── package-lock.json              # Dependency lock file
├── next.config.ts                 # Next.js configuration
├── tsconfig.json                  # TypeScript configuration
├── eslint.config.mjs              # ESLint configuration
├── postcss.config.mjs             # PostCSS configuration
├── DATABASE_SETUP.md              # Database setup instructions
└── README.md                      # This file
```

## 🗄️ Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed with bcrypt),
  createdAt: Date,
  updatedAt: Date
}
```

### Todo Model
```javascript
{
  _id: ObjectId,
  userId: ObjectId (reference to User),
  title: String (required),
  description: String (optional),
  completed: Boolean (default: false),
  dueDate: Date (optional),
  priority: String (enum: 'low', 'medium', 'high', default: 'medium'),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔧 Tech Stack

- **Frontend**: React 19, Next.js 16
- **State Management**: Redux, Redux Saga
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: bcryptjs for password hashing
- **Styling**: CSS-in-JS with custom styles
- **HTTP Client**: Axios
- **Build Tool**: Next.js with TypeScript support

## 📦 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd redux-saga-next
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:
```
MONGODB_URI=mongodb://localhost:27017/redux-saga-next
NODE_ENV=development
```

4. **Start MongoDB**
```bash
# Make sure MongoDB is running on your system
mongod
```

5. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Getting Started

### 1. Sign Up
- Navigate to `/signup`
- Enter name, email, and password
- Password is hashed with bcrypt (10 salt rounds)
- Redirects to login on success

### 2. Login
- Navigate to `/login`
- Enter email and password
- Session stored in Redux state
- Redirects to profile on success

### 3. Manage Todos
- Click "+ Add" button to create a new todo
- Fill in title (required), description, due date, and priority
- View all todos in the list
- Use search bar to filter tasks
- Use filter tabs (All, Active, Done) to view specific tasks

### 4. Task Actions
- **Check button**: Mark task as complete/incomplete
- **Eye icon**: View task details (status, priority, due date, description)
- **Edit icon**: Update task title, description, due date, priority
- **Delete icon**: Remove task from database

### 5. Notifications
- Click the bell icon (🔔) in top right corner
- View all tasks due within 3 days
- Click a task to view its details
- Badge shows count of upcoming tasks

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Reset password

### Todos
- `GET /api/todos` - Fetch all todos for user
- `POST /api/todos` - Create new todo
- `PUT /api/todos` - Update todo by title
- `DELETE /api/todos` - Delete todo by title

## 🔐 Security Features

- Passwords hashed with bcryptjs (10 salt rounds)
- Password excluded from JSON responses
- User ID validation on all todo operations
- Environment variables for sensitive data

## 📊 Redux State Structure

```javascript
{
  auth: {
    user: {
      id: String,
      email: String,
      name: String
    },
    loading: Boolean,
    error: String
  },
  todos: {
    todos: Array,
    loading: Boolean,
    error: String
  }
}
```

## 🎨 UI Components

- **Profile Page**: Main dashboard with sidebar and todo panel
- **Modals**: Create, Edit, and Details modals for tasks
- **Notification Panel**: Dropdown showing upcoming tasks
- **Search Bar**: Filter todos by title
- **Filter Tabs**: View todos by status
- **Progress Bar**: Visual representation of completion percentage

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Check `MONGODB_URI` in `.env.local`
- Verify connection string format

### Authentication Issues
- Clear browser cookies/localStorage
- Check Redux state in browser DevTools
- Verify user exists in database

### Todo Operations Not Working
- Check browser console for errors
- Verify user is logged in
- Check Redux Saga middleware is configured
- Ensure MongoDB indexes are created

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Redux Documentation](https://redux.js.org)
- [Redux Saga Documentation](https://redux-saga.js.org)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Mongoose Documentation](https://mongoosejs.com)

## 🚀 Deployment

### Deploy to Vercel
```bash
npm run build
vercel deploy
```

### Environment Variables for Production
- Set `MONGODB_URI` to your production MongoDB instance
- Set `NODE_ENV=production`
- Configure other environment variables as needed

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues and questions, please open an issue on the repository.
