import React, { useEffect, useState } from "react";
import "./article.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Pagination from "../Pagination/Pagination";

{
  /* add loading indiactor in buttons all article pages  */
}
export default function Article() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  const fetchArticlesData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8800/article/getArticles?page=${page}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        setArticles([]);
        return;
      }

      setTotal(data.total);
      setItemsPerPage(data.itemsPerPage);

      setArticles(data.articles);
    } catch (error) {
      setArticles([]);
    }
  };

  const calculateSerialNumber = (index) => {
    return (page - 1) * itemsPerPage + index + 1;
  };

  const handleDeleteArticle = async (articleId) => {
    try {
      const response = await fetch(
        `http://localhost:8800/article/deleteArticle/${articleId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      if (!response.ok) return;
      fetchArticlesData();
    } catch (error) {
      console.log(error);
    }
  };
  const truncate = (string) =>
    string.length > 8 ? string.slice(0, 10) + "..." : string;

  const handleNextPage = () => {
    setPage(page + 1);
  };
  const handlePreviousPage = () => {
    setPage(page - 1);
  };
  useEffect(() => {
    fetchArticlesData();
  }, [page]);
  return (
    <div className="container">
      <div className="articleTopSection">
        <h1>My Articles</h1>
        <button
          onClick={() => navigate(`/${currentUser.id}/dashboard/article/add`)}
          className="articleBtn"
        >
          Want to add ??
        </button>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Title</th>
              <th>Content</th>
              <th>Image</th>
              <th>Author</th>
              <th>View</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {articles?.length > 0 &&
              articles.map((article, index) => (
                <tr key={article._id}>
                  <td>
                    <span>{calculateSerialNumber(index)}</span>
                  </td>
                  <td>{truncate(article.title)}</td>
                  <td>{truncate(article.content)}</td>
                  <td>
                    <img className="articleImg" src={article.imageUrl} />
                  </td>
                  <td>{article.author}</td>
                  <td>
                    <span
                      onClick={() =>
                        navigate(
                          `/${currentUser.id}/dashboard/article/view/${article._id}`,
                          { state: { article } }
                        )
                      }
                    >
                      <i className="bi bi-eye-fill viewIcon"></i>
                    </span>
                  </td>
                  <td>
                    <span className="actionBtns">
                      <span
                        onClick={() =>
                          navigate(
                            `/${currentUser.id}/dashboard/article/update/${article._id}`,
                            { state: { article } }
                          )
                        }
                      >
                        <i className="bi bi-pencil-fill updateIcon"></i>
                      </span>
                      <i
                        onClick={() => handleDeleteArticle(article._id)}
                        className="bi bi-trash-fill deleteIcon"
                      ></i>
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Pagination
        page={page}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        total={total}
      />
    </div>
  );
}
