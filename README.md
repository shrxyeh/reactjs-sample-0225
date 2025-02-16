# TODO APP

This is a simple ToDo application. It allows users to sign up, sign in, connect wallet  view their todos, add new todos, and delete existing todos.

![Screenshot 2025-02-16 130415](https://github.com/user-attachments/assets/f0b684e6-7222-4fc4-8b6f-fe13d29d5483)

![Screenshot 2025-02-16 130450](https://github.com/user-attachments/assets/ef802332-eea2-4bb2-8ac8-40d666ffa153)

![Screenshot 2025-02-16 130522](https://github.com/user-attachments/assets/562077cf-6cf2-420a-a8c4-7a3c37f7f1fd)

![Screenshot 2025-02-16 130633](https://github.com/user-attachments/assets/26723254-b167-4a9a-90c4-94590c5e5454)




## Features

- **Sign Up:** Users can create a new account by providing their email and password.
- **Sign In:** Existing users can sign in to their accounts securely.
- **Get Todos:** Once logged in, users can view their existing todos.
- **Add Todo:** Users can add new todos with a title and description.
- **Delete Todo:** Users can delete todos they no longer need.

## Technologies Used

- **MongoDB:** Used as the database to store user information and todos.
- **Express.js:** Backend framework for handling HTTP requests and routes.
- **React.js:** Frontend framework for building the user interface.
- **Node.js:** JavaScript runtime environment for running server-side code.
  
# Installation
Run the following command to clone the repository
```
git clone https://github.com/shrxyeh/reactjs-sample-0225.git
```
Go to ```frontend``` and ```backend``` directory to install packages
```
cd frontend
npm i
```
```
cd backend
npm i
```
# Configuration
Create ```.env``` file inside ```backend``` directory and copy the following code

```
MONGO_URI=Your mongodb URI
PORT=8000
JWT_SECRET=a random secret key eg. thisisasecretkey
```
# Run the App
Go to ```backend``` and ```frontend``` directory and start the server
```
cd backend
node server.js
```
```
cd frontend
npm run dev
```

