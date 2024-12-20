import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchNoteById, updateNoteById } from "../services/api";
import NoteForm from "../components/NoteForm";
import { updateNote } from "../redux/actions/notesActions";

function EditNote() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const noteData = await fetchNoteById(id);
        setNote(noteData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchNote();
  }, [id]);

  const handleOnSubmit = async (data) => {
    try {
      const updatedNote = await updateNoteById(id, {
        ...data,
        createdAt: note.createdAt,
        authorId: note.authorId,
      });
      dispatch(updateNote(updatedNote));
      navigate(`/notes/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  if (error) {
    return <NotFound />;
  }

  if (!note) return <div className="text-gray-100">Loading...</div>;

  return (
    <div className="flex flex-col items-center p-4 rounded-lg w-180 mx-auto">
      <NoteForm defaultValues={note} onSubmit={handleOnSubmit} />
    </div>
  );
}

export default EditNote;
