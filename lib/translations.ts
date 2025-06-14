export const translations = {
  en: {
    // Navigation
    home: 'Home',
    browseGigs: 'Browse Gigs',
    createGig: 'Create Gig',
    messages: 'Messages',
    profile: 'Profile',
    login: 'Login',
    signup: 'Sign Up',
    logout: 'Logout',
    
    // Home page
    heroTitle: 'Connect with Skilled Female Artisans',
    heroSubtitle: 'Discover talented women offering traditional crafts, stitching, embroidery, and tailoring services',
    getStarted: 'Get Started',
    joinAsFreelancer: 'Join as Freelancer',
    featuredGigs: 'Featured Gigs',
    howItWorks: 'How It Works',
    
    // Gig related
    gigTitle: 'Gig Title',
    gigDescription: 'Description',
    pricing: 'Pricing',
    skills: 'Skills',
    category: 'Category',
    createNewGig: 'Create New Gig',
    viewGig: 'View Gig',
    orderNow: 'Order Now',
    contactFreelancer: 'Contact Freelancer',
    
    // Categories
    stitching: 'Stitching',
    embroidery: 'Embroidery',
    tailoring: 'Tailoring',
    designing: 'Designing',
    alterations: 'Alterations',
    
    // Auth
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    fullName: 'Full Name',
    location: 'Location',
    iAmA: 'I am a',
    freelancer: 'Freelancer',
    client: 'Client',
    
    // Common
    save: 'Save',
    cancel: 'Cancel',
    submit: 'Submit',
    search: 'Search',
    filter: 'Filter',
    loading: 'Loading...',
    success: 'Success',
    error: 'Error',
    
    // Chat
    sendMessage: 'Send Message',
    typeMessage: 'Type your message...',
    online: 'Online',
    offline: 'Offline',
  },
  ur: {
    // Navigation
    home: 'گھر',
    browseGigs: 'گگز دیکھیں',
    createGig: 'گگ بنائیں',
    messages: 'پیغامات',
    profile: 'پروفائل',
    login: 'لاگ ان',
    signup: 'سائن اپ',
    logout: 'لاگ آؤٹ',
    
    // Home page
    heroTitle: 'ہنر مند خواتین کاریگروں سے جڑیں',
    heroSubtitle: 'روایتی دستکاری، سلائی، کڑھائی، اور درزی کی خدمات فراہم کرنے والی باصلاحیت خواتین کو دریافت کریں',
    getStarted: 'شروع کریں',
    joinAsFreelancer: 'فری لانسر کے طور پر شامل ہوں',
    featuredGigs: 'نمایاں گگز',
    howItWorks: 'یہ کیسے کام کرتا ہے',
    
    // Gig related
    gigTitle: 'گگ کا عنوان',
    gigDescription: 'تفصیل',
    pricing: 'قیمت',
    skills: 'مہارت',
    category: 'قسم',
    createNewGig: 'نیا گگ بنائیں',
    viewGig: 'گگ دیکھیں',
    orderNow: 'آرڈر کریں',
    contactFreelancer: 'فری لانسر سے رابطہ کریں',
    
    // Categories
    stitching: 'سلائی',
    embroidery: 'کڑھائی',
    tailoring: 'درزی',
    designing: 'ڈیزائننگ',
    alterations: 'تبدیلی',
    
    // Auth
    email: 'ای میل',
    password: 'پاس ورڈ',
    confirmPassword: 'پاس ورڈ کی تصدیق',
    fullName: 'پورا نام',
    location: 'مقام',
    iAmA: 'میں ہوں',
    freelancer: 'فری لانسر',
    client: 'کلائنٹ',
    
    // Common
    save: 'محفوظ کریں',
    cancel: 'منسوخ',
    submit: 'جمع کریں',
    search: 'تلاش',
    filter: 'فلٹر',
    loading: 'لوڈ ہو رہا ہے...',
    success: 'کامیابی',
    error: 'خرابی',
    
    // Chat
    sendMessage: 'پیغام بھیجیں',
    typeMessage: 'اپنا پیغام ٹائپ کریں...',
    online: 'آن لائن',
    offline: 'آف لائن',
  }
};

export type Language = 'en' | 'ur';
export type TranslationKey = keyof typeof translations.en;