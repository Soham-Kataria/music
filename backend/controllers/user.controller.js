// backend/controllers/user.controller.js
import User from "../models/user.models.js";

// @desc Update user details (except password)
// @route PUT /api/users/:id
// @access Private (user must be logged in)
// backend/controllers/user.controller.js

// Allowed fields for update (prevent unwanted updates)
const allowedUpdates = ["username", "email", "avatar", "bio", "location"];

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.body.password) {
      return res.status(400).json({ message: "Password cannot be updated here" });
    }

    // Filter only allowed fields
    const updates = {};
    for (let key of allowedUpdates) {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No valid fields provided for update" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// @desc Delete user
// @route DELETE /api/users/:id
// @access Private (user must be logged in)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error" });
  }
};
