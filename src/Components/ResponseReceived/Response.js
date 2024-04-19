import React, { useContext, useEffect, useState } from "react";
import "./response.css";
import { UserContext } from "../../Context/userContext";
import { useSelector } from "react-redux";
import Pagination from "../Pagination/Pagination";

export default function Response() {
  // const { userInfo } = useContext(UserContext);
  const [contactUsData, setContactUsData] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [messageStatus, setMessageStatus] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const fetchContactUsData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8800/${currentUser?.id}/dashboard/${currentUser?.id}/response?page=${page}`,
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
  
      setContactUsData(data.recievedData);
      
        setTotal(data.total);
        setItemsPerPage(data.itemsPerPage);
    } catch (error) {
      console.log(error);
    }
    
  };

  const calculateSerialNumber = (index) => {
    return (page - 1) * itemsPerPage + index + 1;
  };
  useEffect(() => {
    fetchContactUsData();
  }, [page]);

  const handleNextPage = () => {
    setPage(page + 1);
  };
  const handlePreviousPage = () => {
    setPage(page - 1);
  };
  return (
    <div className="response">
      <h1>Responsed Recieved</h1>
      <div className="contactTable">
        <table>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Name</th>
              <th>Company Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Subject</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {contactUsData.map((elem, index) => (
              <tr key={elem._id}>
                <td>{calculateSerialNumber(index)}</td>
                <td>{elem.username}</td>
                <td>{elem.company}</td>
                <td>{elem.email}</td>
                <td>{elem.phone}</td>
                <td>{elem.subject}</td>
                <td>
                  {!messageStatus && (
                    <p onClick={() => setMessageStatus(!messageStatus)}>
                      See Message
                    </p>
                  )}
                  {messageStatus && elem.message}
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
