# Project Pomodoro

This is our final project for the Technigo Bootcamp; a fullstack group project made by Darya Lapata, Birgit Nehrwein and Rebecca Philipson.

Our site is based on the Pomodoro technique, a time management method that helps the user to stay focused while completing tasks. By using this tool you break down your tasks into 25-minute intervals (pomodoros) separated by five-minute breaks. After four completed pomodoros, you take a longer break of 15 minutes. In our project we implemented a settings page where the user can customize the length of the work and break periods. We also added a report page that allows the user to track the amount of completed tasks and pomodoros per day over the last week. On the main page the user can add, edit, delete and complete tasks. In order to start working on a task the user clicks on the task description and it will then be displayed in the timer component. For the timer we added functions that allow the user to start, pause, reset and stop the countdown.

Our goal for this project was to implement the knowledge gained during the boot camp and, at the same time, learn new skills by building a tool that provides an easy way to monitor task execution.

# The process

We started out by creating a Figma design and setting up most of our backend; the user and task schemas and the different endpoints (listed under "Backend description"). Then we continued by adding pages and components to the frontend. We decided to work with the functionalities and the styling in parallel during the remaining weeks.

The website is responsive and tested in Chrome, Firefox and Safari.

If we had more time we would like to add for example a drag-and-drop feature for the task list, music and sound effects for the timer and a modal walkthrough for new users.

# Pages

- Log in/Register
- Main
- Settings
- About us
- Report
- Not found

# Frontend description

For the frontend we used the following technologial stack:

- React
- Redux
- React Router
- Styled components

# Backend description

For the backend we used the following technologial stack:

- Node
- Express
- MongoDB
- Mongoose

The API provides the following endpoints:

- GET '/' -> start
- GET '/endpoints' -> provides all endpoints
- GET '/tasks/:userId' -> endpoint for getting all the tasks of a user
- POST '/tasks' -> endpoint for posting a new task. The body needs a task-description of 5-150 characters and the userId.
- PATCH '/tasks/:taskId/complete' -> endpoint to complete existing tasks
- PATCH '/tasks/:taskId/update' -> endpoint to update the description of an existing task
- POST '/tasks/:userId/pomodoro' -> endpoint for saving the pomodoros of a user
- DELETE '/tasks/:taskId' -> endpoint for deleting a task
- POST '/signup' -> endpoint for registering a new user
- POST '/signin' -> endpoint for login of a registered user

# View it live

- Visit the API: https://final-project-pomodoro-api.herokuapp.com/
- Visit our Pomodoro-App: https://final-project-pomodoro.netlify.app/
