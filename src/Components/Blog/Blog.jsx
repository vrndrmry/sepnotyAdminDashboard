import React, { useEffect, useState } from "react";
import "./blog.css";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import {  toast } from 'react-toastify';



const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  

  const getBlogs = async () => {
    try {
      const res = await fetch(
        `http://localhost:8800/blog/user-blog/${currentUser.id}?page=${currentPage}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch blogs");
      }
      const data = await res.json();
      setBlogs(data?.blogs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogs();
  }, [currentUser.id, currentPage]);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if(blogs.length > 0){
      setCurrentPage(currentPage + 1);
    }
  };

const handleUpdate = (id) =>{
  navigate(`/updatePost/${id}`)
}

const handleDelete = async (id) => {
  try {
    const response = await fetch(`http://localhost:8800/blog/delete-blog/${id}`, {
      method: "DELETE"
    });
    if (!response.ok) {
      throw new Error("Failed to delete blog");
    }
    const data = await response.json();
    if (data?.success) {
      toast('Blog deleted');
      window.location.reload()
    }
  } catch (error) {
    console.log(error);
  }
};

  return (
    <main className="main">
      <header>
        <a
          className="myblog"
          href={`/${currentUser.id}/dashboard/${currentUser.id}/blog`}
        >
          My Blog
        </a>

        
        <a className="createb" href="/createPost">
          Create A Blog
        </a>
      </header>

      <div style={{marginBottom:"10px"}}>
        {blogs.length === 0 ? (
          <p>Loading blogs...</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog._id} 
             className="post">
              <div className="image">
                <img src={blog.image} alt="blogimage" />
              </div>
              <div className="text">
                <h3>{blog.title}</h3>
                <p className="info">
                  <span className="author">{blog.user.username}</span>
                  <time>{blog.createdAt}</time>
                </p>
                <p className="summary">{blog.content}</p>
              <span onClick={()=>handleUpdate(blog._id)} style={{marginRight:"9px" , fontWeight:"bold", cursor:"pointer" }}>Update Blog</span>
              <span onClick={()=>handleDelete(blog._id) } style={{fontWeight:"bold",  cursor:"pointer"}}>Delete Blog</span>
              </div>
            </div>
          ))
        )}
        <div
          style={{
            display: "flex",
            marginTop: "10px",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          <button
            style={{ width: "15%" }}
            onClick={handlePrevClick}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span style={{ fontWeight: "bold", padding: "4px" }}>
            Page {currentPage}
          </span>
          <button
            style={{ width: "10%", float: "right" }}
            onClick={handleNextClick}
            
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
};

export default Blog;
