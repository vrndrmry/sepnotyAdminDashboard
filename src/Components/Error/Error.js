import React from 'react'
import { Link } from 'react-router-dom'
import './error.css'
export default function Error() {
  return (
    <div className="error">
      <p className="mainHeading">OOPS !</p>
      <p>
        <lord-icon
          src="https://cdn.lordicon.com/mqvldalw.json"
          trigger="loop"
          delay="2000"
          style={{ width: "10vw", height: "10vw" }}
        ></lord-icon>
      </p>
      <p>404</p>
      <p>Page not found</p>
      <Link to="/">
        <button>Go to dashboard</button>
      </Link>
      
    </div>
  );
}
