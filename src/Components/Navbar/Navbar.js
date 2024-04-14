import React, { useContext, useState } from "react";
import "./navbar.css";
import logo from "../../assets/sepnotyLogo.svg";
import adminProfile from "../../assets/adminprofile.svg";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/userContext.js";
export default function Navbar() {
  const [dashboardStatus, setDashboardStatus] = useState(true);
  const [articleStatus, setArticleStatus] = useState(false);
  const [blogStatus, setBlogStatus] = useState(false);
  const [careerStatus, setCareerStatus] = useState(false);
  const [projectStatus, setProjectsStatus] = useState(false);
  const [eventStatus, setEventeStatus] = useState(false);
  const [responseStatus, setResponseStatus] = useState(false);
  const [userStatus, setUserStatus] = useState(false);
  const [reportStatus, setReportStatus] = useState(false);
  const {userInfo} = useContext(UserContext)

  const statusHandler = (type) => {
    switch (type) {
      case "dashboard":
        setDashboardStatus(true);
        setArticleStatus(false);
        setBlogStatus(false);
        setCareerStatus(false);
        setProjectsStatus(false);
        setEventeStatus(false);
        setResponseStatus(false);
        setUserStatus(false);
        setReportStatus(false);
        break;
      case "article":
        setDashboardStatus(false);
        setArticleStatus(true);
        setBlogStatus(false);
        setCareerStatus(false);
        setProjectsStatus(false);
        setEventeStatus(false);
        setResponseStatus(false);
        setUserStatus(false);
        setReportStatus(false);
        break;

      case "blog":
        setDashboardStatus(false);
        setArticleStatus(false);
        setBlogStatus(true);
        setCareerStatus(false);
        setProjectsStatus(false);
        setEventeStatus(false);
        setResponseStatus(false);
        setUserStatus(false);
        setReportStatus(false);
        break;
      case "career":
        setDashboardStatus(false);
        setArticleStatus(false);
        setBlogStatus(false);
        setCareerStatus(true);
        setProjectsStatus(false);
        setEventeStatus(false);
        setResponseStatus(false);
        setUserStatus(false);
        setReportStatus(false);
        break;

      case "report":
        setDashboardStatus(false);
        setArticleStatus(false);
        setBlogStatus(false);
        setCareerStatus(false);
        setReportStatus(true);
        setProjectsStatus(false);
        setEventeStatus(false);
        setResponseStatus(false);
        setUserStatus(false);
        break;

      case "project":
        setDashboardStatus(false);
        setArticleStatus(false);
        setBlogStatus(false);
        setCareerStatus(false);
        setProjectsStatus(true);
        setEventeStatus(false);
        setResponseStatus(false);
        setUserStatus(false);
        setReportStatus(false);
        break;
      case "event":
        setDashboardStatus(false);
        setArticleStatus(false);
        setBlogStatus(false);
        setCareerStatus(false);
        setProjectsStatus(false);
        setEventeStatus(true);
        setResponseStatus(false);
        setUserStatus(false);
        setReportStatus(false);
        break;
      case "response":
        setDashboardStatus(false);
        setArticleStatus(false);
        setBlogStatus(false);
        setCareerStatus(false);
        setProjectsStatus(false);
        setEventeStatus(false);
        setResponseStatus(true);
        setUserStatus(false);
        setReportStatus(false);
        break;
      case "user":
        setDashboardStatus(false);
        setArticleStatus(false);
        setBlogStatus(false);
        setCareerStatus(false);
        setProjectsStatus(false);
        setEventeStatus(false);
        setResponseStatus(false);
        setUserStatus(true);
        setReportStatus(false);
        break;

      default:
        alert("Wrong option selected");
    }
  };

  return (
    <div className="adminNavbar">
      <div className="logo">
        <img src={logo} alt="Sepnoty" />
      </div>
      <div className="userDetails">
        <img src={adminProfile} alt="user Details" />
        Sepnoty User
      </div>
      <ul>
        <Link to={`/${userInfo.id}/dashboard`}>
          <li
            className={dashboardStatus ? "active" : null}
            onClick={() => statusHandler("dashboard")}
          >
            <span>
              <i className="bi bi-box-fill"></i>
              Dashboard
            </span>
            <span></span>
          </li>
        </Link>
        <Link to={`/${userInfo.id}/dashboard/article`}>
          <li
            className={articleStatus ? "active" : null}
            onClick={() => statusHandler("article")}
          >
            <span>
              <i className="bi bi-newspaper"></i> Articles
            </span>
            <span>
              <i className="bi bi-arrow-bar-right"></i>
            </span>
          </li>
        </Link>

        <Link to={`/${userInfo.id}/dashboard/blog`}>
          <li
            className={blogStatus ? "active" : null}
            onClick={() => statusHandler("blog")}
          >
            <span>
              <i className="bi bi-book"></i>Blogs
            </span>
            <span>
              <i className="bi bi-arrow-bar-right"></i>
            </span>
          </li>
        </Link>

        <Link to={`/${userInfo.id}/dashboard/career`}>
          <li
            className={careerStatus ? "active" : null}
            onClick={() => statusHandler("career")}
          >
            <span>
              <i className="bi bi-person-lines-fill"></i>Career Opportunities
            </span>
            <span>
              <i className="bi bi-arrow-bar-right"></i>
            </span>
          </li>
        </Link>

        <Link to={`/${userInfo.id}/dashboard/report`}>
          <li
            className={reportStatus ? "active" : null}
            onClick={() => statusHandler("report")}
          >
            <span>
              <i className="bi bi-bar-chart-steps"></i> Reports
            </span>
            <span>
              <i className="bi bi-arrow-bar-right"></i>
            </span>
          </li>
        </Link>

        <Link to={`/${userInfo.id}/dashboard/project`}>
          <li
            className={projectStatus ? "active" : null}
            onClick={() => statusHandler("project")}
          >
            <span>
              {" "}
              <i className="bi bi-clipboard-data"></i>Projects
            </span>
            <span>
              <i className="bi bi-arrow-bar-right"></i>
            </span>
          </li>
        </Link>

        <Link to={`/${userInfo.id}/dashboard/event`}>
          <li
            className={eventStatus ? "active" : null}
            onClick={() => statusHandler("event")}
          >
            <span>
              <i className="bi bi-calendar-event"></i>Events and Workshops
            </span>
            <span>
              <i className="bi bi-arrow-bar-right"></i>
            </span>
          </li>
        </Link>

        <Link to={`/${userInfo.id}/dashboard/response`}>
          <li
            className={responseStatus ? "active" : null}
            onClick={() => statusHandler("response")}
          >
            <span>
              <i className="bi bi-plugin"></i>Responses Received
            </span>
            <span>
              <i className="bi bi-arrow-bar-right"></i>
            </span>
          </li>
        </Link>

        <Link to={`/${userInfo.id}/dashboard/users`}>
          <li
            className={userStatus ? "active" : null}
            onClick={() => statusHandler("user")}
          >
            <span>
              <i className="bi bi-person-bounding-box"></i>Users
            </span>
            <span>
              <i className="bi bi-arrow-bar-right"></i>
            </span>
          </li>
        </Link>
        <Link>
          <li>
            <span>
              <i className="bi bi-box-arrow-right"></i>Logout
            </span>
          </li>
        </Link>
      </ul>
    </div>
  );
}
