import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
    en: {
        nav: {
            services: 'Services',
            about: 'About Us',
            contact: 'Contact',
            login: 'Login',
            signup: 'Sign Up',
            logout: 'Logout'
        },
        auth: {
            welcome: 'Welcome Back',
            createAccount: 'Create Account',
            name: 'Name',
            email: 'Email',
            password: 'Password',
            signIn: 'Sign In',
            signUp: 'Sign Up',
            forgotPassword: 'Forgot Password?',
            noAccount: "Don't have an account? Sign Up",
            hasAccount: "Already have an account? Sign In",
            namePlaceholder: 'Your Name',
            emailPlaceholder: 'name@example.com',
            passwordPlaceholder: 'Enter your password',
            createPasswordPlaceholder: 'Create a password'
        },
        pages: {
            services: 'Our Services',
            about: 'About Us',
            contact: 'Contact Us',
            content: 'Content for '
        },
        footer: {
            followUs: 'Follow Us',
            addressTitle: 'Our Location',
            addressText: '123 Main Street, City, Country'
        },
        servicesPage: {
            allServices: 'All Services',
            mySubscriptions: 'My Subscriptions',
            bookNow: 'Book Now',
            viewDetails: 'View Details',
            price: 'Price',
            currency: '$',
            backToServices: 'Back to Services',
            description: 'Description',
            bookedOn: 'Booked on',
            noSubscriptions: 'You have no active subscriptions.',
            status: {
                confirmed: 'Confirmed',
                in_progress: 'In Progress',
                completed: 'Completed',
                cancelled: 'Cancelled'
            }
        }
    },
    ar: {
        nav: {
            services: 'الخدمات',
            about: 'من نحن',
            contact: 'تواصل معنا',
            login: 'دخول',
            signup: 'تسجيل',
            logout: 'خروج'
        },
        auth: {
            welcome: 'مرحباً بك',
            createAccount: 'إنشاء حساب',
            name: 'الاسم',
            email: 'البريد الإلكتروني',
            password: 'كلمة المرور',
            signIn: 'تسجيل الدخول',
            signUp: 'تسجيل حساب',
            forgotPassword: 'نسيت كلمة المرور؟',
            noAccount: "ليس لديك حساب؟ سجل الآن",
            hasAccount: "لديك حساب بالفعل؟ سجل دخولك",
            namePlaceholder: 'اسمك',
            emailPlaceholder: 'name@example.com',
            passwordPlaceholder: 'اكتب كلمة المرور ',
            createPasswordPlaceholder: 'أنشئ كلمة مرور'
        },
        pages: {
            services: 'خدماتنا',
            about: 'من نحن',
            contact: 'تواصل معنا',
            content: 'محتوى صفحة '
        },
        footer: {
            followUs: 'تابعنا',
            addressTitle: 'عنواننا',
            addressText: '١٢٣ شارع الرئيسي، المدينة، الدولة'
        },
        servicesPage: {
            allServices: 'جميع الخدمات',
            mySubscriptions: 'اشتراكاتي',
            bookNow: 'احجز الآن',
            viewDetails: 'التفاصيل',
            price: 'السعر',
            currency: 'د.إ',
            backToServices: 'عودة للخدمات',
            description: 'الوصف',
            bookedOn: 'تم الحجز في',
            noSubscriptions: 'لا يوجد لديك اشتراكات نشطة.',
            status: {
                confirmed: 'مؤكد',
                in_progress: 'قيد التنفيذ',
                completed: 'مكتمل',
                cancelled: 'ملغي'
            }
        }
    }
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        const savedLanguage = localStorage.getItem('language');
        return savedLanguage || 'ar';
    });

    const toggleLanguage = () => {
        setLanguage((prev) => {
            const newLang = prev === 'en' ? 'ar' : 'en';
            localStorage.setItem('language', newLang);
            return newLang;
        });
    };

    const value = {
        language,
        toggleLanguage,
        t: translations[language],
        dir: language === 'ar' ? 'rtl' : 'ltr'
    };

    return (
        <LanguageContext.Provider value={value}>
            <div dir={value.dir} style={{ direction: value.dir }}>
                {children}
            </div>
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    return useContext(LanguageContext);
};
