import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Register = () => {
    const { t } = useLanguage();
    const { register } = useAuth();
    const navigate = useNavigate();
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [error, setError] = React.useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        const result = await register(name, email, password);

        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">{t.auth.createAccount}</h2>
                {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">{t.auth.name}</label>
                        <input
                            type="text"
                            id="name"
                            className="form-input"
                            placeholder={t.auth.namePlaceholder}
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">{t.auth.email}</label>
                        <input
                            type="email"
                            id="email"
                            className="form-input"
                            placeholder={t.auth.emailPlaceholder}
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="password">{t.auth.password}</label>
                        <input
                            type="password"
                            id="password"
                            className="form-input"
                            placeholder={t.auth.createPasswordPlaceholder}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="auth-button">
                        {t.auth.signUp}
                    </button>
                    <Link to="/login" className="auth-link">
                        {t.auth.hasAccount}
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Register;
