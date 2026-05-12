import React, { useState, useEffect } from "react";
import Button from "../Common/Button";
import Input from "../Common/Input";

interface PlaylistFormData {
  _id?: string;
  name?: string;
  description?: string;
}

interface PlaylistFormProps {
  initialData?: PlaylistFormData;
  onSubmit: (data: { name: string; description: string }) => void;
  onCancel?: () => void;
}

const PlaylistForm: React.FC<PlaylistFormProps> = ({ initialData = {}, onSubmit, onCancel }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setDescription(initialData.description || "");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
          placeholder="Add playlist description"
        />
      </div>

      <div className="form-Buttons">
        <Button type="submit" className="common-Button">save</Button>
        <Button type="button" onClick={onCancel} className="common-button cancel">cancel</Button>
      </div>
    </form>
  );
};

export default PlaylistForm;
