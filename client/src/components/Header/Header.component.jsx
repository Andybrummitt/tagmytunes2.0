import React from 'react';
import "./header.styles.scss";

const Header = () => {
  return (
    <div className="header text-center d-flex align-items-center justify-content-center">
        <span>&#127911;</span>
        <h1 className="text-white mt-3 mb-3">TagMyTunes.com</h1>
        <span>&#127911;</span>
    </div>
  )
}

export default Header