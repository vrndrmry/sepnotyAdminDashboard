import React, { useEffect, useState } from "react";
import "./article.css";

export default function Article() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(0);

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
      if (!total) {
        setTotal(data.total);
        setItemsPerPage(data.itemsPerPage);
      }

      setArticles(data.articles);
    } catch (error) {
      setArticles([]);
    }
  };

  const calculateSerialNumber = (index) => {
    return (page - 1) * itemsPerPage + index + 1;
  };
  useEffect(() => {
    fetchArticlesData();
  }, [page]);
  return (
    <div className="container">
      <div className="articleTopSection">
        <h1>My Articles</h1>
        <button
        
        className="articleBtn">Want to add ??</button>
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
                
                 <>
                 <tr>
                  <td >
                    <span>{calculateSerialNumber(index)}</span>
                  </td>
                  <td>{article.title}</td>
                  <td>{article.content}</td>
                  <td>{article.imageUrl}</td>
                  <td>{article.author}</td>
                  <td>link</td>
                  <td>action</td>
                </tr>

                <tr>
                  <td className="serialNo">
                    <span>{calculateSerialNumber(index)}</span>
                  </td>
                  <td>{article.title}</td>
                  <td>{article.content}</td>
                  <td>{article.imageUrl}</td>
                  <td>{article.author}</td>
                  <td>link</td>
                  <td>action</td>
                </tr>
                 </>
                
               
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
