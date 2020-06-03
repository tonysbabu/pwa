import React from "react";
import "./styles.css";
export default function Users({ user, removeUser }) {
  return (
    <div className="user-card">
      <div className="image-preview">
        {user && user.imagePath ? (
          <img src={user.imagePath} alt="avatar" />
        ) : (
          <img src={"/assets/images/avatar-placeholder.jpg"} alt="avatar" />
        )}
      </div>
      <div className="details-container">
        <p>{`Name: ${user.name}`}</p>
        <p>{`Email: ${user.email}`}</p>
        <button
          className="remove-btn"
          type="button"
          onClick={() => removeUser(user)}
        >
          Remove User
        </button>
      </div>
    </div>
  );
}
