# ManageIt - Smart Budget Management

ManageIt is a modern budget management application that helps users manage their finances using the 50/30/20 rule. This application provides an intuitive interface for tracking expenses, setting financial goals, and maintaining a healthy budget.

## Features

- **50/30/20 Budget Rule Implementation**
  - Needs (50%): Essential expenses like housing, utilities, groceries, and healthcare
  - Wants (30%): Non-essential purchases like entertainment, dining out, and hobbies
  - Savings (20%): Emergency fund, retirement, and future financial goals

- **Smart Expense Tracking**
  - Easy transaction categorization
  - Real-time spending insights
  - Monthly budget overview
  - Custom category management
  - Transaction history and trends

- **Goal Setting & Tracking**
  - Create custom financial goals
  - Track progress with visual indicators
  - Set target dates and amounts
  - Get personalized recommendations
  - Milestone celebrations

- **User-Friendly Features**
  - Clean, intuitive interface
  - Mobile-responsive design
  - Quick transaction entry
  - Automated categorization
  - Visual budget breakdowns
  - Monthly progress reports

## UI Overview
![image](https://github.com/user-attachments/assets/cab2e648-ff38-4786-9077-d35eed9c4131)

![image](https://github.com/user-attachments/assets/7fda4d2c-8e43-4b2f-b9b3-a8f455a045bc)

## Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- NextJS for build tooling
- React Router for navigation
- React Query for data management

### Backend
- NestJS framework
- MongoDB database
- JWT authentication
- RESTful API architecture

## API Endpoints

### Authentication
- POST `/auth/signup` - Create new account
- POST `/auth/login` - User login
- POST `/auth/logout` - User logout
- GET `/auth/profile` - Get user profile

### Transactions
- GET `/transactions` - List all transactions
- GET `/transactions/:id` - Get transaction details
- POST `/transactions` - Create new transaction
- PATCH `/transactions/:id` - Update transaction
- DELETE `/transactions/:id` - Delete transaction

### Budgets
- GET `/budgets` - Get user's budget overview
- POST `/budgets` - Create new budget
- PATCH `/budgets/:id` - Update budget settings
- GET `/budgets/summary` - Get budget summary

### Categories
- GET `/categories` - List all categories
- POST `/categories` - Create custom category
- PATCH `/categories/:id` - Update category
- DELETE `/categories/:id` - Delete category

## Future Improvement
This project has plans for future improvements and implementations to cater the needs of budget management. This project is open for feedbacks and collaboration.

## License
This project is licensed under the MIT License
