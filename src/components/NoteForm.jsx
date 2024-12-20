import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function NoteForm({ defaultValues, onSubmit }) {
  const { user } = useSelector((state) => state.user);
  const [title, setTitle] = useState(defaultValues?.title || "");
  const [body, setBody] = useState(defaultValues?.body || "");
  const [error, setError] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      setError("Title is required");
      return;
    }

    try {
      const data = {
        title,
        body,
        createdAt: defaultValues?.createdAt || Date.now(),
        authorId: defaultValues?.authorId || user.id,
      };

      await onSubmit(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className="flex flex-col items-center bg-gray-800 p-4 rounded-lg w-full md:w-3/4 lg:w-1/2 mx-auto"
    >
      <div className="flex justify-between items-center w-full mb-4">
        <Link
          to="/notes"
          className="w-10 h-10 flex items-center justify-center bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition-colors"
        >
          ←
        </Link>
      </div>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-2 rounded-md bg-gray-700 text-gray-100 border-none"
      />
      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="w-full p-2 mb-2 rounded-md bg-gray-700 text-gray-100 border-none resize-none h-36 overflow-y-auto"
        style={{
          overflowY: "scroll",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-md bg-blue-600 text-gray-100 hover:bg-blue-500 transition-colors"
      >
        {defaultValues ? "Save" : "Create"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}

export default NoteForm;
