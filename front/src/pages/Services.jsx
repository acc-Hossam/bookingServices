import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../environment';
import { useLanguage } from '../context/LanguageContext';
import ServiceCard from '../components/ServiceCard';
import './Services.css';

const Services = () => {
    const { t, language } = useLanguage();
    const [subscriptions, setSubscriptions] = React.useState([]);
    const [services, setServices] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const getLocalized = (obj) => {
        if (!obj) return '';
        if (typeof obj === 'string') return obj; // Handle non-localized strings
        return obj[language] || obj['en'];
    };

    React.useEffect(() => {
        const fetchData = async () => {
            const token = Cookies.get('token');
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const config = { headers: { Authorization: `Bearer ${token}` } };

                // Fetch both in parallel
                const [subsRes, servicesRes] = await Promise.all([
                    axios.get(`${API_BASE_URL}/bookings`, config),
                    axios.get(`${API_BASE_URL}/services`, config)
                ]);

                setSubscriptions(subsRes.data);
                setServices(servicesRes.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="services-container">
            {/* Subscriptions Section */}
            <h2 className="section-title">{t.servicesPage.mySubscriptions}</h2>
            {loading ? (
                <p>Loading...</p>
            ) : subscriptions.length > 0 ? (
                <div className="subscriptions-list">
                    {subscriptions.map(sub => (
                        <div key={sub._id} className="subscription-card">
                            {/* Fallback image or use service image if available */}
                            <img
                                src={sub.service?.image || 'https://placehold.co/100x100?text=Service'}
                                alt={getLocalized(sub.service?.name || 'Service')}
                                className="sub-image"
                            />
                            <div className="sub-info">
                                <h4>{getLocalized(sub.service?.name)}</h4>
                                <div className="sub-date">{t.servicesPage.bookedOn}: {new Date(sub.createdAt).toLocaleDateString()}</div>
                                <div style={{ fontSize: '0.8rem', color: '#666' }}>Price: ${sub.service?.price}</div>
                            </div>
                            <div className={`status-badge status-${sub.status}`}>
                                {t.servicesPage.status[sub.status] || sub.status}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p style={{ color: '#718096', marginBottom: '3rem' }}>{t.servicesPage.noSubscriptions}</p>
            )}

            {/* All Services Section */}
            <h2 className="section-title">{t.servicesPage.allServices}</h2>
            <div className="services-grid">
                {services.map(service => (
                    <ServiceCard key={service._id} service={service} />
                ))}
            </div>
        </div>
    );
};

export default Services;
