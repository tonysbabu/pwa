import React, { useState, useEffect, useRef } from "react";
import User from "../../components/User/User";
import "./styles.css";
import LoadingIndicator from "../../components/LoadingIndicator";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const fileInput = useRef();

  const createUser = () => {
    let formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("image", image);
    let result = fetch("http://localhost:5000/api/users", {
      method: "POST",
      mode: "cors",
      body: formData
    })
      .then(result => {
        resetForm();
        fetchUsers();
      })
      .catch(error => setLoading(false));
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setImage("");
    setImagePreview("");
  };

  const removeUser = user => {
    fetch(`http://localhost:5000/api/users/${user._id}`, {
      method: "DELETE",
      mode: "cors"
    })
      .then(result => fetchUsers())
      .catch(error => setLoading(false));
  };

  const onImagePicked = event => {
    const file = event.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const fetchUsers = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/users")
      .then(res => res.json())
      .then(res => {
        // setLoading(false);
        setUsers(res.users);
      })
      .catch(error => setLoading(true));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <React.Fragment>
      <nav class="navbar fixed-top  bg-dark">
        <a class="navbar-brand" href="#">
          PWA Application
        </a>
      </nav>
      <div className="home-container">
        <div className="users-container">
          {loading ? (
            <LoadingIndicator />
          ) : users && users.length === 0 ? (
            <h4 className="no-users">Create new users</h4>
          ) : (
            users.map(user => (
              <User key={user._id} user={user} removeUser={removeUser} />
            ))
          )}
        </div>
        <div className="form-container">
          <div className="form-card">
            <div className="image-picker-container">
              <div
                className="image-picker"
                onClick={() => fileInput.current.click()}
              >
                <div className="image-preview">
                  <img
                    src={
                      imagePreview || "/assets/images/avatar-placeholder.jpg"
                    }
                    alt="profile"
                  />
                  <img
                    className="upload-icon"
                    src={"/assets/images/uploading-arrow.svg"}
                    alt="upload"
                  />
                </div>
              </div>
              <input
                type="file"
                ref={fileInput}
                onChange={e => onImagePicked(e)}
              />
            </div>
            <div className="fields-container">
              <div className="field-container">
                <input
                  type="text"
                  placeholder="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="field-container">
                <input
                  type="text"
                  placeholder="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="field-container">
                <button
                  type="button"
                  onClick={createUser}
                  disabled={!name || !email}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
