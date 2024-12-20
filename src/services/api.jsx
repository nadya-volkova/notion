const API_URL = "http://localhost:5001";

export const checkEmailExists = async (email) => {
  try {
    const response = await fetch(`${API_URL}/users?email=${email}`);
    const users = await response.json();
    return users.length > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const registerUser = async (email, password, createdAt) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        createdAt,
      }),
    });

    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred during registration");
  }
};

export const fetchNotesByAuthorId = async (authorId) => {
  try {
    const response = await fetch(`${API_URL}/notes?authorId=${authorId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch notes");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchNoteById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/notes/${id}`);
    if (!response.ok) {
      throw new Error("Note not found");
    }

    const noteData = await response.json();
    return noteData;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteNoteById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/notes/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete note");
    }

    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(
      `${API_URL}/users?email=${email}&password=${password}`
    );
    if (!response.ok) {
      throw new Error("Login failed");
    }
    const users = await response.json();
    if (users.length === 0) {
      throw new Error("Invalid credentials");
    }
    return users[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchUserById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/users?id=${id}`);
    if (!response.ok) {
      throw new Error("User not found");
    }
    const users = await response.json();
    if (users.length === 0) {
      throw new Error("User not found");
    }
    return users[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createNote = async (noteData) => {
  try {
    const response = await fetch(`${API_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteData),
    });

    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create note");
    }
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred during note creation");
  }
};

export const updateNoteById = async (id, noteData) => {
  try {
    const response = await fetch(`${API_URL}/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteData),
    });

    if (response.ok) {
      return await response.json();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update note");
    }
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred during note update");
  }
};
