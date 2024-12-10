# Online Test Portal

An **Online Test Portal** designed to assess users on various topics like **React**, **JavaScript**, **Python**, and more. This platform enables users to take topic-specific tests, provides a timer-based environment, ensures data validation, and generates instant PDF reports along with email notifications.  

---

## Features

- **Test Categories**: Test your skills on topics like React, JavaScript, Python, and more.  
- **Timer**: Ensure timely test completion with a countdown timer.  
- **Validation**: Input validations for user registration, login, and test submissions.  
- **Report Generation**: Automated PDF report generation after test completion.  
- **Email Notification**: Get an email confirmation with test details upon submission.  
- **User-Friendly UI**: Intuitive design with Material-UI for better user experience.  
- **Admin Panel**: Manage test questions, categories, and user data dynamically.  
- **Secure Authentication**: Implemented with **JWT** for user authentication.  

---

## Tech Stack

### Frontend:
- **React** (Functional Components and Hooks)  
- **TypeScript (TSX)** for type-safe development  
- **Material-UI (MUI)** for component styling  

### Backend:
- **Node.js** (Event-driven runtime)  
- **Express.js** (Framework for building REST APIs)  

### Others:
- **PDFKit** for generating reports  
- **Nodemailer** for email services  
- **JWT** for secure authentication  
- **Axios** for API calls  

---

### Theme Features

 
- Seamlessly switch between Light and Dark modes with just a single click from the top menu.

- The user can pick a quiz topic on the first screen, like JavaScript, React, or General Knowledge.

- There will be a timer running when the quiz starts. If the timer finishes, the quiz will be stopped, and the user will be asked to see the result.

- The template also supports three types of questions, MCQs, True/False, and MAQs.

- The template allows for adding code snippets in questions. You can easily assess the users' programming knowledge and skills.

- The template allows you to create questions with images to enhance user engagement.

- Each question has a score. For example, a difficult question has 10 marks, and an easier one has 5.

- The result screen shows how many questions the user attempted, how much he scored, how long it took, and whether he passed or failed.

- In result screen user can see which question had the right answer and which was wrong. The user can find the correct answer in case of a wrong answer.
  
## Installation and Setup

### Prerequisites
- **Node.js** (v14+ recommended)  
- **MongoDB** (Ensure a running instance of MongoDB)  

### Clone Repository
```bash
git clone https://github.com/<Shubh220904>/online-test-portal.git
cd online-test-portal
```


