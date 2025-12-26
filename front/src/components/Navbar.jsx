import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { t, toggleLanguage, language } = useLanguage();
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        logout();
        toggleMenu(); // Close mobile menu if open
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo"><img src="/vite.svg" alt="vite logo" /></Link>

                <div className={`navbar-toggle ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>

                <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
                    {user ? (
                        <>
                            <Link to="/" className="nav-item" onClick={toggleMenu}>{t.nav.services}</Link>
                            <Link to="/about" className="nav-item" onClick={toggleMenu}>{t.nav.about}</Link>
                            <Link to="/contact" className="nav-item" onClick={toggleMenu}>{t.nav.contact}</Link>
                            <div className="nav-separator"></div>
                            <button className="nav-item" onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>
                                {t.nav.logout}
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-item" onClick={toggleMenu}>{t.nav.login}</Link>
                            <Link to="/register" className="nav-item" onClick={toggleMenu}>{t.nav.signup}</Link>
                        </>
                    )}
                    <button onClick={() => { toggleLanguage(); toggleMenu(); }} className="lang-toggle">
                        {language === 'en' ? 'عربي' : 'English'}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
