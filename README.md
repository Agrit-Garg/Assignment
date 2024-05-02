# News Portal
News Portal is a full-stack web application that allows users to view the latest news articles. It features user authentication, email verification, password reset, and fetching news articles from an external API.



## Tech Stack

- **Frontend**: React JS, Tailwind CSS, Context API
- **Backend**: Node.js, Express.js, MongoDB
- **Others**: Axios, Bcrypt, JSON Web Token (JWT), Nodemailer



## Features

- Implemented user authentication and authorization.
- Implemented password reset functionality.
- Integrated email verification for signup.
- Added password visibility toggle on the login page.
- Implemented rate limiting middleware in the login route to prevent brute force attacks by restricting login attempts to 5 within 5 minutes per IP address.
- Used Framer Motion React libraries to enhance user experience.
- Fetching and displaying news posts using News API.



## Installation

To run the project, follow these steps:

### Backend Setup:

1. Navigate to the backend directory in your terminal.
2. Install dependencies by running:
    ```bash
    npm install
    ```
3. Start the server by running:
    ```bash
    npm run dev
    ```

### Frontend Setup:

1. Navigate to the frontend directory in your terminal.
2. Install dependencies by running:
    ```bash
    npm install
    ```
3. Run the frontend part by executing:
    ```bash
    npm run dev
    ```

### Accessing the Application:

Once the backend and frontend are running, open your browser and go to localhost:5173 to see the application.




## Usage

To use the application, follow these steps:

### Sign In:

1. Open the application in your browser.
2. If you are not already signed in, click on the "Sign In" option.
3. Enter your credentials and sign in.

### Email Verification:

1. After signing in, a verification email will be sent to your email address.
2. Check your email inbox for the verification email.
3. Click on the verification link provided in the email to verify your email address.
   - (Note: Email verification is not mandatory.)

### Login:

1. Once you sign up, you can proceed to log in.
2. Enter your credentials and log in.

### View Posts:

1. After successfully logging in, you will be redirected to the Posts page.
2. The Posts page displays news posts fetched from a news API.
3. You can view the latest news posts here.

### Forgot Password:

1. If you forget your password, you can reset it by clicking on the "Forgot Password" option on the login page.
2. Enter your email address and submit the form.
3. An email with a reset password link will be sent to your email address.
4. Click on the reset password link in the email.
   - (Note: The reset password link is valid for 15 minutes.)

### Reset Password:

1. After clicking the reset password link, you will be redirected to the Reset Password page.
2. Enter your new password and confirm it.
3. Submit the form to update your password.
4. Your password is now updated.

### Logout:

1. To log out of the application, click on the "Logout" option.

### Restricted Access:

- You can only access the Posts page if you are logged in.
- If you try to access the Posts page without logging in, you will be redirected to the Login page.











