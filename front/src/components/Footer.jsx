import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './Footer.css';
import axios from 'axios';

//connections here
const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Social Media Column */}
                <div className="footer-column">
                    <h3 className="footer-heading">{t.footer.followUs}</h3>
                    <div className="social-icons">
                        {/* Facebook Icon */}
                        <a href="#" className="social-link" aria-label="Facebook">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                            </svg>
                        </a>
                        {/* Twitter/X Icon */}
                        <a href="#" className="social-link" aria-label="Twitter">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                            </svg>
                        </a>
                        {/* Instagram Icon */}
                        <a href="#" className="social-link" aria-label="Instagram">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Address Column */}
                <div className="footer-column">
                    <h3 className="footer-heading">{t.footer.addressTitle}</h3>
                    <p className="footer-text">
                        {t.footer.addressText}
                    </p>
                </div>

                {/* Map Column */}
                <div className="footer-column map-column">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158858.47340002653!2d-0.24168120642536509!3d51.52855824202755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2seg!4v1652392451234!5m2!1sen!2seg"
                        width="100%"
                        height="150"
                        style={{ border: 0, borderRadius: '8px' }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Map"
                    ></iframe>
                </div>
            </div>
            <div className="footer-bottom">
                &copy; {new Date().getFullYear()} Logo. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
