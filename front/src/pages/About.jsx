import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
    const { t } = useLanguage();
    return (
        <div style={{ paddingTop: '100px', textAlign: 'center' }}>
            <h1>{t.pages.about}</h1>
            <p>{t.pages.content} {t.pages.about}</p>
        </div>
    );
};
export default About;
