# TODO APP

This is a simple ToDo application. It allows users to sign up, sign in, connect their wallet, view their todos, add new todos, and delete existing todos.

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
- **Connect Wallet:** Users can connect their crypto wallet using Web3.js or Ethers.js.
- **Test Cases:** The application includes test cases written using Jest/Enzyme for reliable functionality testing.
- **EdgeChain Integration:** The project integrates EdgeChain.js for enhanced blockchain interactions.

## Technologies Used

- **MongoDB:** Used as the database to store user information and todos.
- **Express.js:** Backend framework for handling HTTP requests and routes.
- **React.js:** Frontend framework for building the user interface.
- **Node.js:** JavaScript runtime environment for running server-side code.
- **Web3.js/Ethers.js:** For blockchain wallet integration.
- **Jest/Enzyme:** Used for writing and running test cases.
- **EdgeChain.js:** Library for efficient blockchain interactions.

## Installation
Run the following command to clone the repository:

```sh
git clone https://github.com/shrxyeh/reactjs-sample-0225.git
```

Go to the `frontend` and `backend` directories to install the required packages:

```sh
cd frontend
npm i
```

```sh
cd backend
npm i
```

## Configuration
Create a `.env` file inside the `backend` directory and copy the following configuration:

```sh
MONGO_URI=Your_mongodb_URI
PORT=8000
JWT_SECRET=A_random_secret_key (e.g., thisisasecretkey)
```

## Running the Application
Navigate to the `backend` and `frontend` directories separately and start the servers:

```sh
cd backend
node server.js
```

```sh
cd frontend
npm run dev
```

## Testing
Run the following command to execute test cases using Jest/Enzyme:



## Blockchain Wallet Connection
To enable Web3 integration, ensure that you have Metamask installed and configured. The app will prompt users to connect their wallets when required.

---
This project is actively maintained and open to contributions. Feel free to raise issues or suggest improvements!

