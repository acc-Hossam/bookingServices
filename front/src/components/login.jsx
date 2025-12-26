import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Login = () => {
    const { t } = useLanguage();
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        const result = await login(email, password);

        if (result.success) {
            navigate('/');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">{t.auth.welcome}</h2>
                {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
                <form onSubmit={handleLogin}>
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
                            placeholder={t.auth.passwordPlaceholder}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="auth-button">
                        {t.auth.signIn}
                    </button>
                    <a href="#" className="auth-link">{t.auth.forgotPassword}</a>
                    <Link to="/register" className="auth-link">
                        {t.auth.noAccount}
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Login;
