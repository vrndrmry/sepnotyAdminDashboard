import React from "react";
import "./viewArticle.css";
import { useLocation } from "react-router-dom";

const ViewArticle = () => {
  const { state } = useLocation();

  return (
    <div className="viewArticleContainer">
      <h1>Article Details</h1>
      <div className="grid">
        <div className="leftSection">
          <img className="articleViewImage" src={state?.article?.imageUrl} />
        </div>
        <div className="rightSection">
          
          <div>
            <div className="authorDiv">
             <span>Author:</span>
              <p>{state?.article?.author}</p>
            </div>
          </div>
          <div>
            <div>
             <span> Title:</span>
              <p>{state?.article?.title}</p>
            </div>
          </div>
          <div>
            <div>
            <span> Content:</span>
              <p>{state?.article?.content}</p>
            </div>
          </div>
          <div >
            <div className="createdAtDiv">
              <span>Created At:</span>
              <p>{new Date(state?.article?.createdAt).toDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewArticle;
