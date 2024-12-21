# Multi-User Note-Taking Application

## Project Description

This multi-user note-taking application allows users to register, log in, and manage their personal notes. Users can create, edit, and delete their notes, ensuring a personalized and organized experience. The application leverages modern web technologies for a seamless user experience.

<img src="https://github.com/user-attachments/assets/example-screenshot.png" alt="Note-Taking App" width="600"/>

### Key Features

- **User Registration:** Allows new users to sign up with email and password.
- **User Login:** Authenticates existing users and provides access to their notes.
- **Note Management:** Users can create, edit, and delete their notes.
- **Dynamic Routing:** Utilizes URL parameters to manage user sessions and note details.
- **Error Handling:** Provides clear error messages for invalid inputs and actions.

## Pages

### 1. Registration

- **Fields:**
  - Email (validated as a proper email address).
  - Password (validated for strength: at least 8 characters, one uppercase, one lowercase, and one digit).
  - Confirm Password (must match the password).
- **Validation:**
  - Uses [Zod](https://zod.dev/) for validation.
  - Displays error messages for invalid inputs.
- **Actions:**
  - On successful registration, the user can be redirected to the login page or directly to the home page.

### 2. Login

- **Fields:**
  - Email.
  - Password.
- **Actions:**
  - On successful login, the user is redirected to the home page.
  - Displays error messages for invalid credentials.

### 3. Home Page

- **Content:**
  - Displays the user's registration date.
  - Link to the notes page.

### 4. Notes Page

- **Content:**
  - Displays a list of notes created by the user.
  - Notes are sorted by creation date (newest first).
  - Each note includes:
    - Title.
    - Creation date.
    - Edit icon (✍️).
    - Delete icon (🗑).
- **Actions:**
  - Create a new note (redirects to the "Create Note" page).
  - View a note (redirects to the "View Note" page).
  - Edit a note (redirects to the "Edit Note" page).
  - Delete a note (with a confirmation prompt).

### 5. Create Note

- **Fields:**
  - Title (required, single-line input).
  - Body (optional, multi-line input).
- **Actions:**
  - Create a note and redirect to the "View Note" page.
  - Displays error messages for invalid inputs.

### 6. Edit Note

- **Fields:**
  - Title (required, single-line input).
  - Body (optional, multi-line input).
- **Actions:**
  - Save changes and redirect to the "View Note" page.
  - Displays error messages for invalid inputs.

### 7. View Note

- **Content:**
  - Displays the note's title and body.
  - Edit icon (✍️) to redirect to the "Edit Note" page.
  - Delete icon (🗑) to delete the note (with a confirmation prompt).

### 8. 404 Not Found

- **Content:**
  - Friendly error page for unknown routes.
  - Redirects to the home page (if authenticated) or the login page (if not authenticated).

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
