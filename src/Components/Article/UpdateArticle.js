import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./updateArticle.css";
import { useState } from "react";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
const UpdateArticle = () => {
  const location = useLocation();

  const { userId, articleId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState(location.state.article.title);
  const [content, setContent] = useState(location.state.article.content);
  const [file, setFile] = useState("");
  const [imagePreview, setImagePreview] = useState(
    location.state.article.imageUrl
  );
  const [isPending, setIsPending] = useState(false);
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
      alert("Please fill all the fields");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("imageUrl", file);
    
    setIsPending(true);
    try {
      const response = await fetch(
        `http://localhost:8800/article/updateArticle/${articleId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
          },
          body: formData,
        }
      );
      if (!response.ok) {
        toast.error("Error updating article");
        
        return;
      }
      toast.success("Article updated successfully",{theme:"dark"});
      navigate(`/${userId}/dashboard/${userId}/article`);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsPending(false);
    }
  };
  return (
    <div className="container">
      <h1>Update Article</h1>
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
          <input type="file" hidden onChange={handleImageChange} />
        </label>
        <button className="Btn" disabled={isPending} type="submit">
          {isPending ? <Loader /> : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateArticle;
