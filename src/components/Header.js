/*THis componenet renders vanilla header with logo and links */

import React from 'react';

function Header() {
    return (
        <div className="header">
            <div className="logo">
                <img src="images/logo_white.png" alt="Inkerz Logo"></img>
            </div>
            <div className="nav-links">
                <a href="index.html">3D MODELER</a>
                <a href="index.html">WHY INKERZ?</a>
                <a href="index.html">CONTACT</a>
            </div>
        </div>
    )

}

export default Header