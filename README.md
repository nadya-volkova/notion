# Multi-User Note-Taking Application

## Project Description

This multi-user note-taking application allows users to register, log in, and manage their personal notes. Users can create, edit, and delete their notes, ensuring a personalized and organized experience. The application leverages modern web technologies for a seamless user experience.

<img src="https://github.com/user-attachments/assets/754cba48-3629-4872-b3e7-3da53790be1b" alt="Notion" width="600"/>

### Key Features

- **User Registration:** Allows new users to sign up with email and password.
- **User Login:** Authenticates existing users and provides access to their notes.
- **Note Management:** Users can create, edit, and delete their notes.
- **Dynamic Routing:** Utilizes URL parameters to manage user sessions and note details.
- **Error Handling:** Provides clear error messages for invalid inputs and actions.

## Routing Overview

The application uses `react-router-dom` to define the following routes:

- `/` - Redirects to `/login`.
- `/register` - Registration page.
- `/login` - Login page.
- `/home` - Home page (requires authentication).
- `/notes` - Notes page (requires authentication).
- `/notes/create` - Create note page (requires authentication).
- `/notes/:noteId` - View note page (requires authentication).
- `/notes/:noteId/edit` - Edit note page (requires authentication).
- `*` - 404 Not Found page.

## Technologies Used

- **React:** For building the user interface.
- **react-router-dom:** For managing navigation and routing in the application.
- **Tailwind CSS:** For styling the application.
- **Zod:** For data validation.
- **Json-Server:** For simulating a backend API.

## Installation and Setup

   ```bash
