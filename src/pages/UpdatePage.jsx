import React, { useEffect, useState } from "react";
import "./create.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";


const UpdatePage = () => {

  const [blog, setBlog] = useState({});
  const id= useParams().id;
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  
 
  const [inputs, setInputs] = useState({});


  //get bLog Detail

  const getBlogDetail = async () => {
    try {
      const response = await fetch(`http://localhost:8800/blog/get-blog/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch blog details");
      }
      const data = await response.json();
      if (data?.success) {
        setBlog(data.blog);
        setInputs({
          title: data?.blog.title,
          content: data?.blog.content,
          image: data?.blog.image,
        });
      } else {
        throw new Error("Failed to fetch blog details");
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(()=>{
    getBlogDetail();
  },[id])

 


  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const UpdatePost = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8800/blog/update-blog/${id}`, {
      method: "PUT",
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
      console.error("Failed to update blog:", data.message);
    }
    }
     catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h2>Update Blog</h2>
      <form onSubmit={UpdatePost}>
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
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default UpdatePage
