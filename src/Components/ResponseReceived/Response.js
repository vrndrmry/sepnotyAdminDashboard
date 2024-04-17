import React, { useContext, useEffect, useState } from "react";
import "./response.css";
import { UserContext } from "../../Context/userContext";

export default function Response() {
  const { userInfo } = useContext(UserContext);
  const [contactUsData,setContactUsData] = useState([])

  const fetchContactUsData = async () => {
    const data = await fetch(
      `http://localhost:8800/${userInfo.userId}/dashboard/${userInfo.userId}/response`,{
        method:"GET",
        headers:{
          "Content-Type": "application/json",
          credentials:'include'
        }
      }
    )
    console.log(data)
  }

  useEffect(() => {
    fetchContactUsData();
    console.log(contactUsData)
  },[]);

  return (
    <div className="response">
      <h1>Responsed Recieved</h1>
      <div className="contactTable">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Company Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Subject</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Virender</td>
              <td>Sepnoty</td>
              <td>vrndrmry@gmail.com</td>
              <td>9654238734</td>
              <td>Software Development Loresjkshdkjkjhkhjkjjj</td>
              <td>
                The oldest classical British and Latin writing had little or no
                space between words and could be written in boustrophedon
                (alternating directions). Over time, text direction (left to
                right) became standardized. Word dividers and terminal
                punctuation became common. The first way to divide sentences
                into groups was the original paragraphos, similar to an
                underscore at the beginning of the new group.[2] The Greek
                parágraphos evolved into the pilcrow (¶), which in English
                manuscripts in the Middle Ages can be seen inserted inline
                between sentences.
              </td>
            </tr>
            <tr>
              <td>Virender</td>
              <td>Sepnoty</td>
              <td>vrndrmry@gmail.com</td>
              <td>9654238734</td>
              <td>Software Development</td>
              <td>Price for developing software</td>
            </tr>
            <tr>
              <td>Virender</td>
              <td>Sepnoty</td>
              <td>vrndrmry@gmail.com</td>
              <td>9654238734</td>
              <td>Software Development</td>
              <td>Price for developing software</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
