export interface ServiceItem {
  id: string;
  slug: {
    en: string;
    hi: string;
  };
  title: {
    en: string;
    hi: string;
  };
  seoTitle: {
    en: string;
    hi: string;
  };
  metaDescription: {
    en: string;
    hi: string;
  };
  shortDescription: {
    en: string;
    hi: string;
  };
  fullDescription: {
    en: string[];
    hi: string[];
  };
  checklist: {
    en: string[];
    hi: string[];
  };
  image: string;
}

export const CONFIRMED_SERVICES: ServiceItem[] = [
  {
    id: "wedding-tent-setup",
    slug: {
      en: "wedding-tent-house",
      hi: "wedding-tent-house",
    },
    title: {
      en: "Wedding Tent Setup",
      hi: "वेडिंग टेंट सेटअप",
    },
    seoTitle: {
      en: "Wedding Tent House in Bilaspur | MANI TENT HOUSE",
      hi: "बिलासपुर वेडिंग टेंट हाउस | MANI TENT HOUSE",
    },
    metaDescription: {
      en: "Explore wedding tent setup services in Bilaspur, Chhattisgarh. Contact MANI TENT HOUSE to discuss tent arrangements for your wedding venue.",
      hi: "बिलासपुर, छत्तीसगढ़ में शादी के टेंट सेटअप के लिए MANI TENT HOUSE से संपर्क करें। अपने आयोजन की तारीख, स्थान और जरूरतें साझा करें।",
    },
    shortDescription: {
      en: "Thoughtfully planned tent arrangements for wedding celebrations, with attention to the venue, layout and overall setting.",
      hi: "शादी के आयोजन, स्थान और जरूरतों को ध्यान में रखकर टेंट व्यवस्था की योजना।",
    },
    fullDescription: {
      en: [
        "A well-planned tent arrangement helps establish the setting for a wedding celebration. MANI TENT HOUSE welcomes enquiries for wedding tent setup in Bilaspur and nearby areas.",
        "The right arrangement depends on the venue, event requirements and the overall plan for the celebration. Share your event location, date and requirements so the details can be discussed.",
      ],
      hi: [
        "शादी के आयोजन में टेंट की व्यवस्था पूरे कार्यक्रम के माहौल का एक महत्वपूर्ण हिस्सा होती है। MANI TENT HOUSE बिलासपुर और आसपास के क्षेत्रों में वेडिंग टेंट सेटअप के लिए enquiries आमंत्रित करता है।",
        "टेंट की व्यवस्था आयोजन स्थल, कार्यक्रम की जरूरतों और आपकी योजना पर निर्भर करती है। अपने आयोजन की तारीख, स्थान और जरूरतें साझा करें, ताकि जरूरी विवरणों पर चर्चा की जा सके।",
      ],
    },
    checklist: {
      en: [
        "Event date and venue details",
        "Type of wedding occasion",
        "Tent arrangement requirements",
        "Preferred look and overall setting",
      ],
      hi: [
        "आयोजन की तारीख और स्थान",
        "शादी के कार्यक्रम का प्रकार",
        "टेंट व्यवस्था की जरूरतें",
        "पसंदीदा लुक और माहौल",
      ],
    },
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200",
  },
];

export interface BlogPost {
  slug: string;
  title: {
    en: string;
    hi: string;
  };
  summary: {
    en: string;
    hi: string;
  };
  content: {
    en: string;
    hi: string;
  };
  published: boolean;
}

export const DRAFT_BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-choose-wedding-tent-house-bilaspur",
    title: {
      en: "How to Choose the Right Wedding Tent House in Bilaspur",
      hi: "बिलासपुर में सही वेडिंग टेंट हाउस कैसे चुनें?",
    },
    summary: {
      en: "A guide on selecting the best tent house services for your special day in Bilaspur.",
      hi: "बिलासपुर में अपने खास दिन के लिए सही टेंट हाउस सेवाओं का चयन करने के लिए गाइड।",
    },
    content: {
      en: "Draft article content pending editorial review and local verification.",
      hi: "ड्राफ्ट लेख सामग्री संपादकीय समीक्षा और स्थानीय सत्यापन के लिए लंबित है।",
    },
    published: false,
  },
  {
    slug: "wedding-decoration-ideas-indian-weddings",
    title: {
      en: "Wedding Decoration Ideas for Indian Weddings",
      hi: "भारतीय शादियों के लिए वेडिंग डेकोरेशन के विचार",
    },
    summary: {
      en: "Inspiration and traditional floral setup ideas for grand Indian celebrations.",
      hi: "भव्य भारतीय आयोजनों के लिए प्रेरणा और पारंपरिक फूलों की सजावट के विचार।",
    },
    content: {
      en: "Draft article content pending editorial review and local verification.",
      hi: "ड्राफ्ट लेख सामग्री संपादकीय समीक्षा और स्थानीय सत्यापन के लिए लंबित है।",
    },
    published: false,
  },
  {
    slug: "beautiful-mandap-decoration-ideas",
    title: {
      en: "Beautiful Mandap Decoration Ideas for Your Wedding",
      hi: "शादी के लिए सुंदर मंडप सजावट के विचार",
    },
    summary: {
      en: "Explore sacred and elegant mandap setups for memorable sacred vows.",
      hi: "यादगार पवित्र फेरों के लिए सुंदर मंडप सेटअप की खोज करें।",
    },
    content: {
      en: "Draft article content pending editorial review and local verification.",
      hi: "ड्राफ्ट लेख सामग्री संपादकीय समीक्षा और स्थानीय सत्यापन के लिए लंबित है।",
    },
    published: false,
  },
  {
    slug: "how-to-plan-wedding-reception-setup",
    title: {
      en: "How to Plan a Wedding Reception Setup",
      hi: "वेडिंग रिसेप्शन की तैयारी कैसे करें?",
    },
    summary: {
      en: "Essential steps to arrange a comfortable and luxurious reception area for guests.",
      hi: "मेहमानों के लिए आरामदायक और शानदार रिसेप्शन क्षेत्र की व्यवस्था करने के महत्वपूर्ण कदम।",
    },
    content: {
      en: "Draft article content pending editorial review and local verification.",
      hi: "ड्राफ्ट लेख सामग्री संपादकीय समीक्षा और स्थानीय सत्यापन के लिए लंबित है।",
    },
    published: false,
  },
  {
    slug: "wedding-stage-decoration-ideas",
    title: {
      en: "Wedding Stage Decoration Ideas and Inspiration",
      hi: "शादी के स्टेज डेकोरेशन के आकर्षक विचार",
    },
    summary: {
      en: "Creating impressive stage focal points with backdrops and floral motifs.",
      hi: "बैकड्रॉप और फूलों के थीम के साथ प्रभावशाली स्टेज फोकल प्वाइंट बनाएं।",
    },
    content: {
      en: "Draft article content pending editorial review and local verification.",
      hi: "ड्राफ्ट लेख सामग्री संपादकीय समीक्षा और स्थानीय सत्यापन के लिए लंबित है।",
    },
    published: false,
  },
  {
    slug: "important-things-to-discuss-before-booking-tent-house",
    title: {
      en: "Important Things to Discuss Before Booking a Tent House",
      hi: "टेंट हाउस बुक करने से पहले किन बातों पर चर्चा करें?",
    },
    summary: {
      en: "A comprehensive checklist for venue dimensions, date availability, and decoration requirements.",
      hi: "स्थान की माप, तारीख की उपलब्धता और सजावट की जरूरतों के लिए एक संपूर्ण चेकलिस्ट।",
    },
    content: {
      en: "Draft article content pending editorial review and local verification.",
      hi: "ड्राफ्ट लेख सामग्री संपादकीय समीक्षा और स्थानीय सत्यापन के लिए लंबित है।",
    },
    published: false,
  },
];
