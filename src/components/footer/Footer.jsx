import React from "react";
import './footer.css';
import { GrLink } from "react-icons/gr";

 

const Footer = () => {
  return (
   <footer>
    <div className="footer-content">
        <p>
            &copy; 2025 Your E-Learning Platform. All rights reserved.
            <br />made with ❤️ <a href="">by M & K      </a>
        </p>
        <div className="social-links">
          <a href="https://allmylinks.com/med-and-kos-team"><GrLink />
          

          </a>
        </div>
    </div>
   </footer>
  )
}

export default Footer
