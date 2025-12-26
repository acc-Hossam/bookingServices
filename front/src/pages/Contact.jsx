import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Contact = () => {
    const { t } = useLanguage();
    return (
        <div style={{ paddingTop: '100px', textAlign: 'center' }}>
            <h1>{t.pages.contact}</h1>
            <p>{t.pages.content} {t.pages.contact}</p>
        </div>
    );
};
export default Contact;
