# FreeAPI Auth App

A simple authentication project built with HTML, CSS, and JavaScript. The app uses the FreeAPI user authentication endpoints to register users, log them in, protect the home page, show the current user's username, and log users out.

## Features

- User registration with username, email, password, and role
- User login using username and password
- Access token saved in `localStorage`
- Protected home page that redirects unauthenticated users to login
- Current user fetch using a Bearer token
- Logout flow that removes the saved access token

## Project Structure

```text
01_Freeapi Auth/
+-- css/
|   +-- style.css
+-- images/
+-- home.html
+-- index.html
+-- login.html
+-- register.html
+-- README.md
```

## Pages

- `index.html` checks whether an `accessToken` exists and redirects the user to either `home.html` or `login.html`.
- `register.html` allows a new user to create an account.
- `login.html` allows an existing user to sign in and stores the returned access token.
- `home.html` verifies the saved token, displays the logged-in user's username, and provides a logout button.

## API Endpoints Used

Base URL:

```text
https://api.freeapi.app/api/v1/users
```

| Action | Method | Endpoint |
| --- | --- | --- |
| Register | `POST` | `/register` |
| Login | `POST` | `/login` |
| Current User | `GET` | `/current-user` |
| Logout | `POST` | `/logout` |

## How to Run

1. Open the project folder.
2. Open `index.html` in a browser.
3. Register a new account from the register page.
4. Log in with your username and password.
5. After login, the app redirects to the protected home page.

## Authentication Flow

1. The user registers through `register.html`.
2. After successful registration, the user is redirected to `login.html`.
3. On login, the app stores `data.data.accessToken` in `localStorage`.
4. `home.html` reads the saved token and sends it in the `Authorization` header:

```js
authorization: `Bearer ${accessToken}`
```

5. If the token is missing or invalid, the user is redirected back to `login.html`.
6. On logout, the app removes `accessToken` from `localStorage`.

## Tech Stack

- HTML
- CSS
- JavaScript
- FreeAPI
