// import React, { useContext, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import Button from "../components/Common/Button";
// import Input from "../components/Common/Input";


// const ProfilePage = () => {
//   const { user, token, setUser, logout } = useContext(AuthContext);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     avatar: user?.avatar || "",
//     bio: user?.bio || "",
//     location: user?.location || "",
//   });

//   if (!user) {
//     return <p>Please log in to see your profile.</p>;
//   }

//   // Handle form field changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Update user details
//   const handleUpdate = async () => {
//     try {
//       const res = await fetch(`/api/users/${user._id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!res.ok) throw new Error("Failed to update profile");

//       const updatedUser = await res.json();
//       setUser(updatedUser); // update context
//       setIsEditing(false);
//       alert("Profile updated successfully!");
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   // Delete user account
//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete your account? This cannot be undone.")) return;

//     try {
//       const res = await fetch(`/api/users/${user._id}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!res.ok) throw new Error("Failed to delete account");

//       alert("Account deleted successfully.");
//       logout(); // clear context and redirect
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   return (
//     <div className="profile-page">
//       {/* Avatar */}
//       {user.avatar && !isEditing && (
//         <div className="profile-avatar">
//           <img src={user.avatar} alt="Profile" />
//         </div>
//       )}
//       <br />

//       {/* Username */}
//       {!isEditing && <h2>{user.username}</h2>}

//       {/* Profile details */}
//       {!isEditing && (
//         <div className="profile-details">
//           <p><strong>Email:</strong> {user.email}</p>
//           {user.bio && <p><strong>Bio:</strong> {user.bio}</p>}
//           {user.location && <p><strong>Location:</strong> {user.location}</p>}
//           {user.createdAt && (
//             <p>
//               <strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}
//             </p>
//           )}
//         </div>
//       )}

//       {/* Edit form */}
//       {isEditing && (
//         <div className="edit-form">
          
//           <label>
//             Bio:
//             <Input type="text" name="bio" value={formData.bio} onChange={handleChange} />
//           </label>
//           <label>
//             Location:
//             <Input type="text" name="location" value={formData.location} onChange={handleChange} />
//           </label>
//           <Button onClick={handleUpdate}>Save Changes</Button>
//           <Button onClick={() => setIsEditing(false)}>Cancel</Button>
//         </div>
//       )}

//       {/* Action buttons */}
//       {!isEditing && (
//         <div className="profile-actions">
//           <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
//           <Button className="delete-button" onClick={handleDelete}>
//             Delete
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;


import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Button from "../components/Common/Button";
import Input from "../components/Common/Input";
import apiClient from "../api/apiClient";

const ProfilePage = () => {
  const { user, setUser, logout } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    avatar: user?.avatar || "",
    bio: user?.bio || "",
    location: user?.location || "",
  });

  if (!user) {
    return <p>Please log in to see your profile.</p>;
  }

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update user details
  const handleUpdate = async () => {
    try {
      const res = await apiClient.put(`/users/${user._id}`, formData);
      setUser(res.data); // update context
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update profile");
    }
  };

  // Delete user account
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This cannot be undone.")) return;

    try {
      await apiClient.delete(`/users/${user._id}`);
      alert("Account deleted successfully.");
      logout(); // clear context and redirect
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete account");
    }
  };

  return (
    <div className="profile-page">
      {/* Avatar */}
      {user.avatar && !isEditing && (
        <div className="profile-avatar">
          <img src={user.avatar} alt="Profile" />
        </div>
      )}
      <br />

      {/* Username */}
      {!isEditing && <h2>{user.username}</h2>}

      {/* Profile details */}
      {!isEditing && (
        <div className="profile-details">
          <p><strong>Email:</strong> {user.email}</p>
          {user.bio && <p><strong>Bio:</strong> {user.bio}</p>}
          {user.location && <p><strong>Location:</strong> {user.location}</p>}
          {user.createdAt && (
            <p>
              <strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>
      )}

      {/* Edit form */}
      {isEditing && (
        <div className="edit-form">
         <label>
            Bio:
            <Input
              type="text"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            />
          </label>
          <label>
            Location:
            <Input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </label>
          <Button onClick={handleUpdate}>Save Changes</Button>
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>
        </div>
      )}

      {/* Action buttons */}
      {!isEditing && (
        <div className="profile-actions">
          <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          <Button className="delete-button" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
