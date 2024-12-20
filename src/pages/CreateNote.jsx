import React from "react";
import NoteForm from "../components/NoteForm";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { addNote } from "../redux/actions/notesActions";
import { createNote } from "../services/api";

function CreateNote() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.user);

  if (loading) {
    return <div className="text-gray-100">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleOnSubmit = async (data) => {
    try {
      const newNoteData = {
        ...data,
        createdAt: Date.now(),
        authorId: user.id,
      };

      const newNote = await createNote(newNoteData);
      dispatch(addNote(newNote));
      navigate(`/notes/${newNote.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return <NoteForm onSubmit={handleOnSubmit} />;
}

export default CreateNote;
