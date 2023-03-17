# Project Management App

_Project Management App_ is an application which helps a team of developers to track project's tasks.

## Deploy

[https://dashing-phoenix-851f28.netlify.app/](https://dashing-phoenix-851f28.netlify.app/)

![image](https://user-images.githubusercontent.com/83244224/206625049-5e03731f-3fa1-431a-8d0b-726ea0e61f8d.png)

## Tech stack

- React
- TypeScript
- React Router
- React Bootstrap, SASS
- React Hook Form
- React Beautiful DnD
- Vite

## Features

- boards display in a grid with a board preview
  - accessible confirmation modal window on creation, editing, and deletion of a board, a column, a task
- drag & drop for tasks reordering, moving to other columns, and columns reordering
- user registration, authentication & authorization
- editing & deletion of a user profile
- accessible log-in forms with validation
- routes protection
- redirects to the Main page on log-in, or when a user's token expires, or when a user is logged in and tries to reach the log-in form
- a column with a scrollbar in case of tasks overflow
- a header with a changing set of buttons:
  - "Sign up" & "Sign in" for unregistered users,
  - "Create board", "Edit Profile", "Main page", and "Sign out" for logged-in users
- custom 404 page
- custom scrollbars
- user-friendly toast notifications
- adaptive & responsive layout, burger menu

## Build & start the app

### Frontend
Deployed version is **[here](https://dashing-phoenix-851f28.netlify.app/)**.
```markdown
npm install
npm start
```

### Backend

A backend part of the app is developed using NodeJS & Express, and is also deployed. The source code can be found 
[here](https://github.com/foxtrotkilomike/pm-app-backend).
