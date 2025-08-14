// import React, { useState } from "react";


// const PlaylistForm = ({ onSubmit, initialData = {}, onCancel }) => {
//   const [name, setName] = useState(initialData.name || "");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!name.trim()) return;
//     onSubmit({ name: name.trim() });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="playlist-form">
//       <h3>{initialData._id ? "Edit Playlist" : "Create Playlist"}</h3>
//       <Input
//         type="text"
//         placeholder="Playlist Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         required
//       />
//       <div className="playlist-form-buttons">
//         <Button type="submit">{initialData._id ? "Update" : "Create"}</Button>
//         {onCancel && (
//           <Button
//             type="button"
//             onClick={onCancel}
//             className="playlist-cancel-button"
//           >
//             Cancel
//           </Button>
//         )}
//       </div>
//     </form>
//   );
// };

// export default PlaylistForm;
import React, { useState, useEffect } from "react";
import Button from "../Common/Button";
import Input from "../Common/Input";

const PlaylistForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setDescription(initialData.description || "");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Playlist name is required");

    onSubmit({ name, description });
  };

  return (
    <form onSubmit={handleSubmit} className="playlist-form">
      <div>
        <label>Playlist Name:</label>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Add playlist Name"
          required
        />
      </div>

      <div>
        <label>Description:</label>
        <Input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Add playlist description"
        />
      </div>

      <div className="form-Buttons">
        <Button type="submit" className="common-Button" children={"save"}/>
          
        <Button type="button" onClick={onCancel} className="common-button cancel" children={"cancel"}/>
      </div>
    </form>
  );
};

export default PlaylistForm;
