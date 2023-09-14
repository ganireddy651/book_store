import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div>
      <button type="button" className="social-button">
        <FaGoogle className="social-icons" />
      </button>
      <button type="button" className="social-button">
        <FaTwitter className="social-icons" />
      </button>
      <button type="button" className="social-button">
        <FaInstagram className="social-icons" />
      </button>
      <button type="button" className="social-button">
        <FaYoutube className="social-icons" />
      </button>
    </div>
    <p className="contact-us">Contact Us</p>
  </div>
)

export default Footer
