import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { setNotes, deleteNote } from "../redux/actions/notesActions";
import { setUser } from "../redux/actions/userActions";
import {
  fetchNotesByAuthorId,
  deleteNoteById,
  fetchUserById,
} from "../services/api";

function Notes() {
  const dispatch = useDispatch();
  const { user, loading: userLoading } = useSelector((state) => state.user);
  const { notes, loading: notesLoading } = useSelector((state) => state.notes);

  useEffect(() => {
    const loadUser = async () => {
      const id = localStorage.getItem("userId");
      if (id) {
        try {
          const user = await fetchUserById(id);
          dispatch(setUser(user));
        } catch (error) {
          console.error(error);
        }
      }
    };

    if (!user && !userLoading) {
      loadUser();
    }
  }, [user, userLoading, dispatch]);

  useEffect(() => {
    if (!userLoading && user) {
      fetchNotesByAuthorId(user.id)
        .then((notes) => {
          dispatch(setNotes(notes));
        })
        .catch((error) => console.error(error));
    }
  }, [user, userLoading, dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await deleteNoteById(id);
        dispatch(deleteNote(id));
      } catch (error) {
        console.error("Failed to delete note");
      }
    }
  };

  if (userLoading) {
    return <div className="text-gray-100">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (notesLoading) {
    return <div className="text-gray-100">Loading notes...</div>;
  }

  return (
    <div className="container mx-auto p-4 flex flex-col items-center bg-gray-800 rounded-lg w-full md:w-3/4 lg:w-2/3">
      <h1 className="text-3xl font-bold mb-4 text-gray-100">Notes</h1>
      <Link
        to="/notes/create"
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors mb-4"
      >
        Create New Note
      </Link>
      <ul className="w-full">
        {notes.map((note) => (
          <li
            key={note.id}
            className="flex flex-col bg-gray-700 p-4 mb-4 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-start">
              <div className="flex flex-col w-full">
                <Link
                  to={`/notes/${note.id}`}
                  className="text-lg font-bold text-gray-100 w-full break-words"
                >
                  {note.title}
                </Link>
                <span className="text-sm text-gray-400">
                  Created at: {new Date(note.createdAt).toLocaleDateString()}
                </span>
                <p className="text-gray-300 mt-2">{note.description}</p>
              </div>
              <div className="flex items-center">
                <Link
                  to={`/notes/edit/${note.id}`}
                  className="text-gray-100 hover:text-green-500 transition-colors mr-2"
                >
                  ✍️
                </Link>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="text-gray-100 hover:text-red-500 transition-colors"
                >
                  🗑
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notes;
