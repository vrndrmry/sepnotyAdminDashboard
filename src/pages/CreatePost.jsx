import React, { useState } from "react";
import "./create.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CreatePost = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  
 
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    image: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const createNewPost = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8800/blog/createPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({
        title: inputs.title,
        content: inputs.content,
        image: inputs.image,
        user: currentUser.id, 
      }),
    });
    const data = await response.json();
    if (response.ok && data.success) {
    
      navigate(`/${currentUser.id}/dashboard/${currentUser.id}/blog`);
    } else {
    
      console.error("Failed to create blog:", data.message);
    }
    }
     catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h2>Create new post</h2>
      <form onSubmit={createNewPost}>
        <input
          type="title"
          name="title"
          placeholder="Title"
          value={inputs.title}
          onChange={handleChange}
        />

        <input
          type="text"
          name="image"
          value={inputs.image}
          placeholder="imageurl"
          onChange={handleChange}
        />
        <textarea
          style={{ width: "80%", height: "200px" }}
          placeholder="content"
          value={inputs.content}
          onChange={handleChange}
          type="text"
          name="content"
        />
        <button type="submit" style={{ margin: "5px" }}>
          Create post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
