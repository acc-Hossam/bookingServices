export const mockServices = [
    {
        id: 1,
        title: { en: 'House Cleaning', ar: 'تنظيف المنازل' },
        price: 50,
        description: {
            en: 'Professional house cleaning service including dusting, vacuuming, and mopping.',
            ar: 'خدمة تنظيف منازل احترافية تشمل إزالة الغبار والكنس والمسح.'
        },
        image: 'https://placehold.co/600x400/e2e8f0/4a5568?text=Cleaning'
    },
    {
        id: 2,
        title: { en: 'Plumbing Repair', ar: 'صيانة السباكة' },
        price: 80,
        description: {
            en: 'Expert plumbing repair for leaks, clogs, and pipe installations.',
            ar: 'صيانة سباكة خبيرة للتسريبات، الانسدادات، وتركيب الأنابيب.'
        },
        image: 'https://placehold.co/600x400/e2e8f0/4a5568?text=Plumbing'
    },
    {
        id: 3,
        title: { en: 'Electrical Maintenance', ar: 'صيانة كهربائية' },
        price: 75,
        description: {
            en: 'Certified electricians for wiring, repairs, and safety inspections.',
            ar: 'كهربائيون معتمدون للتمديدات، الإصلاحات، وفحوصات السلامة.'
        },
        image: 'https://placehold.co/600x400/e2e8f0/4a5568?text=Electrical'
    },
    {
        id: 4,
        title: { en: 'Gardening', ar: 'تنسيق الحدائق' },
        price: 60,
        description: {
            en: 'Complete gardening service including lawn mowing, pruning, and planting.',
            ar: 'خدمة تنسيق حدائق متكاملة تشمل قص العشب، التقليم، والزراعة.'
        },
        image: 'https://placehold.co/600x400/e2e8f0/4a5568?text=Gardening'
    }
];

export const mockSubscriptions = [
    {
        id: 1,
        serviceId: 1,
        date: '2023-11-15',
        status: 'completed'
    },
    {
        id: 2,
        serviceId: 3,
        date: '2023-12-01',
        status: 'in_progress'
    },
    {
        id: 3,
        serviceId: 2,
        date: '2023-12-05',
        status: 'confirmed'
    }
];
