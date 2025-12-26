import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../environment';
import { useLanguage } from '../context/LanguageContext';
import './Services.css';

const ServiceDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t, language } = useLanguage();
    const [service, setService] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    // Helper to get localized text
    const getLocalized = (obj) => {
        if (!obj) return 'Unknown';
        if (typeof obj === 'string') return obj;
        return obj[language] || obj['en'] || 'Unknown';
    };

    const handleBookNow = async () => {
        const token = Cookies.get('token');
        if (!token) {
            alert(t.servicesPage?.loginRequired || "Please login to book a service");
            navigate('/login');
            return;
        }

        try {
            await axios.post(
                `${API_BASE_URL}/bookings`,
                { serviceId: id },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert(t.servicesPage?.bookingSuccess || "Booking successful!");
            navigate('/');
        } catch (error) {
            console.error("Booking failed:", error);
            alert(t.servicesPage?.bookingError || "Failed to book service. Please try again.");
        }
    };

    React.useEffect(() => {
        const fetchService = async () => {
            const token = Cookies.get('token');
            try {
                // Assuming services can be viewed publicly or with token. Using token if valid.
                // If endpoint requires auth, header is needed.
                const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
                const response = await axios.get(`${API_BASE_URL}/services/${id}`, config);
                setService(response.data);
            } catch (error) {
                console.error("Error fetching service details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchService();
        }
    }, [id]);

    if (loading) {
        return <div style={{ paddingTop: '100px', textAlign: 'center' }}>Loading...</div>;
    }

    if (!service) {
        return <div style={{ paddingTop: '100px', textAlign: 'center' }}>Service not found</div>;
    }

    return (
        <div className="services-container">
            <Link to="/" style={{ display: 'inline-block', marginBottom: '1rem', color: '#718096', textDecoration: 'none' }}>
                &larr; {t.servicesPage.backToServices}
            </Link>

            <div className="service-card" style={{ maxWidth: '800px', margin: '0 auto', flexDirection: 'row', flexWrap: 'wrap' }}>
                <img
                    src={service.image || 'https://placehold.co/600x400/e2e8f0/4a5568?text=Service'}
                    alt={getLocalized(service.name || service.title)}
                    className="service-image"
                    style={{ height: '300px', width: '100%', objectFit: 'cover' }}
                />
                <div className="service-content">
                    <h1 className="service-title" style={{ fontSize: '2rem' }}>{getLocalized(service.name || service.title)}</h1>
                    <div className="service-price" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                        {service.price} {t.servicesPage.currency}
                    </div>

                    <h3 style={{ color: '#4a5568', marginBottom: '0.5rem' }}>{t.servicesPage.description}</h3>
                    <p className="service-description" style={{ fontSize: '1.1rem' }}>
                        {getLocalized(service.description)}
                    </p>

                    <button
                        className="service-button"
                        style={{ marginTop: '2rem', maxWidth: '200px' }}
                        onClick={handleBookNow}
                    >
                        {t.servicesPage.bookNow}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetails;
