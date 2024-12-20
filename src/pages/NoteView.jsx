import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchNoteById, deleteNoteById } from "../services/api";

function NoteView() {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.user);

  useEffect(() => {
    const loadNote = async () => {
      try {
        const noteData = await fetchNoteById(id);

        setNote(noteData);
      } catch (error) {
        setError(error.message);
      }
    };

    loadNote();
  }, [id, currentUser.id, dispatch]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await deleteNoteById(id);
        navigate("/notes");
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (!note)
    return (
      <div className="flex items-center justify-center mt-8 text-black-100">
        Loading...
      </div>
    );

  return (
    <div className="flex flex-col items-center bg-gray-800 p-4 rounded-lg w-full md:w-3/4 lg:w-1/2 mx-auto">
      <div className="flex justify-between items-center w-full mb-4">
        <Link
          to="/notes"
          className="w-10 h-10 flex items-center justify-center bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition-colors"
        >
          ←
        </Link>
        <div className="flex space-x-2">
          <Link
            to={`/notes/edit/${id}`}
            className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          >
            ✍️
          </Link>
          <button
            onClick={handleDelete}
            className="w-10 h-10 flex items-center justify-center bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-colors"
          >
            🗑
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center w-full mb-4">
        <h1 className="flex-grow text-3xl font-bold text-gray-100 text-center whitespace-pre-wrap break-words min-h-[100px] overflow-y-hidden">
          {note.title}
        </h1>
      </div>
      <pre className="bg-gray-700 p-4 rounded-lg w-full mb-4 text-gray-100 whitespace-pre-wrap break-words min-h-[100px] overflow-y-hidden">
        {note.body}
      </pre>
    </div>
  );
}

export default NoteView;
