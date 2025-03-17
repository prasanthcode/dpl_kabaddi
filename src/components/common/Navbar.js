import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const location = useLocation(); // Track full URL changes
  const path = location.pathname;
  return (
    <div className="buttons">
      <Link to="/" style={{textDecoration:path==="/"?"underline" :"none",textUnderlineOffset: "6px",textDecorationThickness:"2px"}}>
        <FontAwesomeIcon icon={faHome}  />
        {/* <img src={banner} alt="" width={40} style={{borderRadius:"50%"}}/> */}
      </Link>
      <Link to="/live" style={{textDecoration:path==="/live" || path==="/upcoming" || path==="/completed"?"underline" :"none",textUnderlineOffset: "6px",textDecorationThickness:"2px"}}>Matches</Link>
      <Link to="/teams" style={{textDecoration:path==="/teams"?"underline" :"none",textUnderlineOffset: "6px",textDecorationThickness:"2px"}}>Teams</Link>
      <Link to="/standings" style={{textDecoration:path==="/standings"?"underline" :"none",textUnderlineOffset: "6px",textDecorationThickness:"2px"}}>Standings</Link>
      <Link to="/playerstats"  style={{textDecoration:path==="/playerstats"?"underline" :"none",textUnderlineOffset: "6px",textDecorationThickness:"2px"}}>Stats</Link>
      {/* <Link to="/">
        <FontAwesomeIcon icon={faInstagram}  />
      </Link> */}
    </div>
  );
}
