import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const ServiceCard = ({ service }) => {
    const { t, language } = useLanguage();

    // Helper to get localized text
    const getLocalized = (obj) => {
        if (!obj) return 'Unknown';
        if (typeof obj === 'string') return obj;
        return obj[language] || obj['en'] || 'Unknown';
    };

    return (
        <div className="service-card">
            <img
                src={service.image || 'https://placehold.co/600x400/e2e8f0/4a5568?text=Service'}
                alt={getLocalized(service.name || service.title)}
                className="service-image"
            />
            <div className="service-content">
                <h3 className="service-title">{getLocalized(service.name || service.title)}</h3>
                <div className="service-price">
                    {service.price} {t.servicesPage.currency}
                </div>
                <p className="service-description">
                    {getLocalized(service.description)}
                </p>
                <Link to={`/service/${service._id}`} className="service-button">
                    {t.servicesPage.viewDetails}
                </Link>
            </div>
        </div>
    );
};

export default ServiceCard;
