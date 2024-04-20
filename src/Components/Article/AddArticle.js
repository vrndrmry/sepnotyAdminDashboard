import { useState } from "react";
import "./addArticle.css";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import {toast} from 'react-toastify'
const AddArticle = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [isPending, setIsPending] = useState(false)

  const handleImageChange = (e) => {
    const fileReader = new FileReader();
    setFile(e.target.files[0]);
    fileReader.onload = () => {
      setImagePreview(fileReader.result);
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!title || !content || !imagePreview) {
      toast.error("Please fill all the fields",{theme: "dark"});
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("imageUrl", file);
    setIsPending(true);
    try {
      const response = await fetch(
        `http://localhost:8800/article/createArticle`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
          },
          body: formData,
        }
      );
      if (!response.ok) {
        toast.error("Error adding article");
        return;
      }
      toast.success("Article added successfully",{theme:"dark"});
      navigate(`/${userId}/dashboard/${userId}/article`);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsPending(false);
    }
  };
  return (
    <div className="container">
      <h1>Add Article</h1>
      <form onSubmit={submitHandler} className="articleForm">
        <label>
          Title
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="articleInput"
            type="text"
            name="title"
          />
        </label>
        <label>
          Content
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="articleTextarea"
          ></textarea>
        </label>
        {imagePreview && (
          <label>
            <span>Preview:</span>
            <img className="previewImg" src={imagePreview} />
          </label>
        )}

        <label>
          Choose an Image
          <i className="bi bi-card-image fileIcon"></i>
          <input type="file"  onChange={handleImageChange} />
        </label>
        <button disabled={isPending} className="Btn" type="submit">
         {isPending ?  <Loader/> : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddArticle;
