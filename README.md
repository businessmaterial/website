# PrepGrind - Exam Preparation Platform

PrepGrind is a comprehensive exam preparation platform designed to help students prepare for various competitive exams. The platform offers personalized study plans, practice questions, mock tests, and performance analytics.

## Features

### For Students
- **Personalized Dashboard**: Track your progress, study hours, and performance metrics
- **Study Planner**: Create and follow customized study schedules
- **Practice Questions**: Access a vast bank of questions with detailed explanations
- **Mock Tests**: Take full-length mock tests under exam conditions
- **Performance Analytics**: Get detailed insights into your strengths and weaknesses
- **Topic-wise Learning**: Structured learning path with comprehensive topic coverage
- **Achievement System**: Earn badges and unlock features as you progress

### For Administrators
- **Content Management**: Add and manage exams, topics, and questions
- **User Analytics**: Track user engagement and performance
- **Performance Monitoring**: Monitor platform usage and exam statistics
- **User Management**: Manage user accounts and permissions

## Tech Stack

- **Frontend**: React.js with Material-UI
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **State Management**: React Context API
- **Routing**: React Router v6
- **Charts**: Recharts
- **Authentication**: Firebase Auth with Google Sign-in

## Project Structure

```
exam-planner/
├── exam-planner-user/         # User application
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── context/          # Context providers
│   │   ├── services/         # API services
│   │   ├── utils/            # Utility functions
│   │   └── pages/            # Page components
│   └── public/               # Static files
│
└── exam-planner-admin/       # Admin application
    ├── src/
    │   ├── components/       # React components
    │   ├── context/         # Context providers
    │   ├── services/        # API services
    │   ├── utils/           # Utility functions
    │   └── pages/           # Page components
    └── public/              # Static files
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/exam-planner.git
   cd exam-planner
   ```

2. Install dependencies for both applications:
   ```bash
   # Install user app dependencies
   cd exam-planner-user
   npm install

   # Install admin app dependencies
   cd ../exam-planner-admin
   npm install
   ```

3. Create a Firebase project and add your configuration:
   - Create a new project in Firebase Console
   - Enable Authentication and Firestore
   - Copy your Firebase configuration

4. Create `.env` files in both directories:
   ```env
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

5. Start the development servers:
   ```bash
   # Start user app
   cd exam-planner-user
   npm start

   # Start admin app
   cd ../exam-planner-admin
   npm start
   ```

### Database Setup

1. Import sample data using the admin dashboard:
   - Log in to the admin application
   - Click on "Import Sample Data" button
   - The system will populate the database with sample exams, topics, and questions

### Testing

Run tests for both applications:
```bash
# Test user app
cd exam-planner-user
npm test

# Test admin app
cd ../exam-planner-admin
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Material-UI for the beautiful components
- Firebase for the backend infrastructure
- React community for the amazing tools and libraries 