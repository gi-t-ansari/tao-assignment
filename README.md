## Overview
This is a task management system built using Vite, React, and Firebase. It allows users to create, update, delete, and manage tasks efficiently. The application features batch actions, filtering, task history tracking, and a responsive UI.

## Features
- **User Authentication**: Sign up and log in using Firebase authentication.
- **Task Management**:
  - Create, edit, and delete tasks.
  - Mark tasks as completed or pending.
  - View task details and due dates.
- **Batch Actions**:
  - Select multiple tasks for bulk updates or deletions.
- **Filtering**:
  - Filter tasks by category and search (can filter by title, category & satus).
- **History and Logs**:
  - Maintain a task history for tracking updates.
- **Responsive Design**:
  - Optimized for both mobile and desktop users.

## Installation & Setup
1. **Install Dependencies**
   ```sh
   npm install
   # OR
   yarn install
   ```
2. **Start the Development Server**
   ```sh
   npm run dev
   ```
   The app will be available at `http://localhost:5173/`.

## Challenges Faced & Solutions
### 1. **User Authentication Implementation**
   - **Challenge**: Setting up Firebase authenticationwas totally new for me.
   - **Solution**: Spend a lay learning and then implementing it by using Firebase Authentication hooks to handle login/logout functionality seamlessly.

### 2. **State Management for Task Selection**
   - **Challenge**: Handling multiple task selections for batch operations.
   - **Solution**: Implemented `useState` to track selected tasks and `useEffect` to update UI accordingly.

### 3. **Performance Optimization**
   - **Challenge**: Handling multiple API calls efficiently.
   - **Solution**: Used `React Query` for caching and updating task data asynchronously, reducing unnecessary re-renders.

## Future Enhancements
- Manage profile.
- Custom date pickers.
- Sorting based on due date.
- A file upload feature in the task creation/editing form and display the attached files in the task detail view.
- Filtering by date range.
- Task history updation on batch and other than status update.
- Addition of drag-and-drop functionality for task reordering.
- Conversion to Typescript

## Contributing
Feel free to fork the project and submit pull requests for improvements.

## License
This project is licensed under the MIT License.

