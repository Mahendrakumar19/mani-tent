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
        "We provide complete tent solutions including frame structures, waterproof coverings, sidewalls, flooring options, and climate control for guest comfort.",
      ],
      hi: [
        "शादी के आयोजन में टेंट की व्यवस्था पूरे कार्यक्रम के माहौल का एक महत्वपूर्ण हिस्सा होती है। MANI TENT HOUSE बिलासपुर और आसपास के क्षेत्रों में वेडिंग टेंट सेटअप के लिए enquiries आमंत्रित करता है।",
        "टेंट की व्यवस्था आयोजन स्थल, कार्यक्रम की जरूरतों और आपकी योजना पर निर्भर करती है। अपने आयोजन की तारीख, स्थान और जरूरतें साझा करें, ताकि जरूरी विवरणों पर चर्चा की जा सके।",
        "हम फ्रेम संरचना, वॉटरप्रूफ कवरिंग, साइडवॉल, फ्लोरिंग विकल्प और मेहमानों के आराम के लिए क्लाइमेट कंट्रोल सहित पूर्ण टेंट समाधान प्रदान करते हैं।",
      ],
    },
    checklist: {
      en: [
        "Event date and venue details",
        "Type of wedding occasion",
        "Tent arrangement requirements",
        "Preferred look and overall setting",
        "Guest count for sizing",
      ],
      hi: [
        "आयोजन की तारीख और स्थान",
        "शादी के कार्यक्रम का प्रकार",
        "टेंट व्यवस्था की जरूरतें",
        "पसंदीदा लुक और माहौल",
        "मेहमानों की संख्या",
      ],
    },
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "mandap-decoration",
    slug: {
      en: "mandap-decoration",
      hi: "mandap-decoration",
    },
    title: {
      en: "Mandap Decoration",
      hi: "मंडप सजावट",
    },
    seoTitle: {
      en: "Mandap Decoration in Bilaspur | Traditional & Modern Designs",
      hi: "बिलासपुर में मंडप सजावट | पारंपरिक और आधुनिक डिजाइन",
    },
    metaDescription: {
      en: "Elegant mandap decoration services for weddings in Bilaspur. Traditional, floral, and contemporary mandap designs by MANI TENT HOUSE.",
      hi: "बिलासपुर में शादियों के लिए सुंदर मंडप सजावट सेवाएं। MANI TENT HOUSE द्वारा पारंपरिक, फूलों और समकालीन मंडप डिजाइन।",
    },
    shortDescription: {
      en: "Sacred mandap setups crafted with fresh flowers, drapes, and traditional motifs for your wedding ceremonies.",
      hi: "ताजे फूलों, ड्रेप्स और पारंपरिक रूपांकनों के साथ बने पवित्र मंडप सेटअप।",
    },
    fullDescription: {
      en: [
        "The mandap is the sacred heart of a Hindu wedding ceremony. MANI TENT HOUSE designs and executes mandap decorations that honour tradition while reflecting your personal style.",
        "From classic four-pillar structures with marigold and rose garlands to contemporary minimalist designs with orchids and crystal accents, we create mandaps that become the focal point of your celebration.",
        "Our team coordinates with your pandit for ritual requirements and ensures the mandap dimensions, orientation, and sacred elements are perfectly aligned.",
      ],
      hi: [
        "मंडप हिंदू विवाह समारोह का पवित्र केंद्र होता है। MANI TENT HOUSE मंडप सजावट डिजाइन करता है जो परंपरा का सम्मान करते हुए आपकी व्यक्तिगत शैली को दर्शाता है।",
        "गेंदे और गुलाब की माला वाले क्लासिक चार-स्तंभ ढांचे से लेकर ऑर्किड और क्रिस्टल एक्सेंट वाले समकालीन न्यूनतम डिजाइन तक, हम ऐसे मंडप बनाते हैं जो आपके समारोह का केंद्र बिंदु बन जाते हैं।",
        "हमारी टीम आपके पंडित के साथ अनुष्ठान आवश्यकताओं के लिए समन्वय करती है और सुनिश्चित करती है कि मंडप के आयाम, अभिविन्यास और पवित्र तत्व पूरी तरह से संरेखित हों।",
      ],
    },
    checklist: {
      en: [
        "Preferred flower types and colors",
        "Traditional vs contemporary style",
        "Mandap size and guest seating",
        "Ritual-specific requirements",
        "Backdrop and pillar preferences",
      ],
      hi: [
        "पसंदीदा फूलों के प्रकार और रंग",
        "पारंपरिक बनाम समकालीन शैली",
        "मंडप का आकार और मेहमानों की बैठक",
        "अनुष्ठान-विशिष्ट आवश्यकताएं",
        "बैकड्रॉप और स्तंभ प्राथमिकताएं",
      ],
    },
    image: "https://images.unsplash.com/photo-1597790048605-7e6b49c70c1a?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "stage-decoration",
    slug: {
      en: "stage-decoration",
      hi: "stage-decoration",
    },
    title: {
      en: "Stage & Backdrop Decoration",
      hi: "स्टेज और बैकड्रॉप सजावट",
    },
    seoTitle: {
      en: "Wedding Stage Decoration in Bilaspur | MANI TENT HOUSE",
      hi: "बिलासपुर में शादी स्टेज सजावट | MANI TENT HOUSE",
    },
    metaDescription: {
      en: "Stunning wedding stage and backdrop designs for receptions and ceremonies. Custom themes, LED walls, floral installations by MANI TENT HOUSE.",
      hi: "रिसेप्शन और समारोहों के लिए शानदार वेडिंग स्टेज और बैकड्रॉप डिजाइन। MANI TENT HOUSE द्वारा कस्टम थीम, LED वॉल, फ्लोरल इंस्टॉलेशन।",
    },
    shortDescription: {
      en: "Grand stage setups with custom backdrops, lighting, and floral installations — the perfect focal point for photos and ceremonies.",
      hi: "कस्टम बैकड्रॉप, लाइटिंग और फ्लोरल इंस्टॉलेशन के साथ भव्य स्टेज सेटअप — फोटो और समारोहों के लिए आदर्श केंद्र बिंदु।",
    },
    fullDescription: {
      en: [
        "The stage is where memories are made — from the jaimala to the speeches, every eye is on this space. MANI TENT HOUSE creates stage designs that command presence.",
        "We offer custom backdrop fabrication including 3D floral walls, LED video walls, mirror panels, draped fabrics with crystal beading, and projection-mapped surfaces.",
        "Integrated lighting design with moving heads, wash lights, pin spots on floral arrangements, and programmable color scenes for each ceremony moment.",
      ],
      hi: [
        "स्टेज वह जगह है जहां यादें बनती हैं — जयमाला से लेकर भाषण तक, हर नजर इसी जगह पर होती है। MANI TENT HOUSE ऐसे स्टेज डिजाइन बनाता है जो उपस्थिति दर्ज कराते हैं।",
        "हम कस्टम बैकड्रॉप निर्माण प्रदान करते हैं जिसमें 3D फ्लोरल वॉल, LED वीडियो वॉल, मिरर पैनल, क्रिस्टल बीडिंग वाले ड्रेप्ड फैब्रिक और प्रोजेक्शन-मैप्ड सतहें शामिल हैं।",
        "मूविंग हेड्स, वॉश लाइट्स, फ्लोरल अरेंजमेंट पर पिन स्पॉट्स और प्रत्येक समारोह क्षण के लिए प्रोग्रामेबल कलर सीन्स के साथ इंटीग्रेटेड लाइटिंग डिजाइन।",
      ],
    },
    checklist: {
      en: [
        "Theme and color palette",
        "Backdrop type (floral, LED, fabric, mirror)",
        "Stage dimensions and height",
        "Lighting requirements",
        "Seating for couple and parents",
      ],
      hi: [
        "थीम और रंग पैलेट",
        "बैकड्रॉप प्रकार (फ्लोरल, LED, फैब्रिक, मिरर)",
        "स्टेज के आयाम और ऊंचाई",
        "लाइटिंग आवश्यकताएं",
        "दूल्हा-दुल्हन और माता-पिता के लिए बैठक",
      ],
    },
    image: "https://images.unsplash.com/photo-1583939003579-782e3f92f9b3?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "reception-decoration",
    slug: {
      en: "reception-decoration",
      hi: "reception-decoration",
    },
    title: {
      en: "Reception & Banquet Decoration",
      hi: "रिसेप्शन और बैंक्वेट सजावट",
    },
    seoTitle: {
      en: "Reception Decoration in Bilaspur | Wedding Banquet Setup",
      hi: "बिलासपुर में रिसेप्शन सजावट | वेडिंग बैंक्वेट सेटअप",
    },
    metaDescription: {
      en: "Luxury reception and banquet hall decoration for weddings. Table layouts, centerpieces, entrance decor, and ambient lighting by MANI TENT HOUSE.",
      hi: "शादियों के लिए लक्जरी रिसेप्शन और बैंक्वेट हॉल सजावट। टेबल लेआउट, सेंटरपीस, प्रवेश द्वार सजावट और एम्बिएंट लाइटिंग MANI TENT HOUSE द्वारा।",
    },
    shortDescription: {
      en: "Complete banquet transformation — elegant table settings, grand entrance, lounge areas, and mood lighting for an unforgettable evening.",
      hi: "पूर्ण बैंक्वेट परिवर्तन — सुंदर टेबल सेटिंग्स, भव्य प्रवेश, लाउंज क्षेत्र और अविस्मरणीय शाम के लिए मूड लाइटिंग।",
    },
    fullDescription: {
      en: [
        "The reception is where guests spend the most time. MANI TENT HOUSE designs complete banquet experiences — from the entrance arch to the last table centerpiece.",
        "Services include: guest table layouts with linen and crockery coordination, floral centerpieces at varied heights, sweetheart table styling, cake table design, lounge seating areas with sofas and ottomans, entrance arches and welcome signage, ambient lighting with fairy lights, chandeliers, and uplighting.",
        "We coordinate with your caterer and venue for seamless execution on the day.",
      ],
      hi: [
        "रिसेप्शन वह जगह है जहां मेहमान सबसे अधिक समय बिताते हैं। MANI TENT HOUSE पूर्ण बैंक्वेट अनुभव डिजाइन करता है — प्रवेश द्वार से लेकर अंतिम टेबल सेंटरपीस तक।",
        "सेवाओं में शामिल हैं: लिनन और क्रॉकरी समन्वय के साथ मेहमान टेबल लेआउट, विभिन्न ऊंचाइयों पर फ्लोरल सेंटरपीस, स्वीटहार्ट टेबल स्टाइलिंग, केक टेबल डिजाइन, सोफे और ओटोमैन के साथ लाउंज बैठक क्षेत्र, प्रवेश द्वार और स्वागत साइनेज, फेयरी लाइट्स, झूमर और अपलाइटिंग के साथ एम्बिएंट लाइटिंग।",
        "हम आपके कैटरर और वेन्यू के साथ समन्वय करते हैं ताकि दिन निर्बाध रूप से चले।",
      ],
    },
    checklist: {
      en: [
        "Guest count and table layout preference",
        "Color theme and flower choices",
        "Entrance and welcome area design",
        "Lounge seating requirements",
        "Lighting mood (warm, cool, colorful)",
      ],
      hi: [
        "मेहमानों की संख्या और टेबल लेआउट प्राथमिकता",
        "रंग थीम और फूलों के विकल्प",
        "प्रवेश और स्वागत क्षेत्र डिजाइन",
        "लाउंज बैठक आवश्यकताएं",
        "लाइटिंग मूड (गर्म, ठंडा, रंगीन)",
      ],
    },
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0f4c6?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "lighting-sound",
    slug: {
      en: "lighting-sound",
      hi: "lighting-sound",
    },
    title: {
      en: "Lighting & Sound Systems",
      hi: "लाइटिंग और साउंड सिस्टम",
    },
    seoTitle: {
      en: "Professional Lighting & Sound for Events in Bilaspur",
      hi: "बिलासपुर में इवेंट्स के लिए प्रोफेशनल लाइटिंग और साउंड",
    },
    metaDescription: {
      en: "Professional event lighting and sound rental in Bilaspur. LED walls, moving heads, DJ systems, wireless mics by MANI TENT HOUSE.",
      hi: "बिलासपुर में प्रोफेशनल इवेंट लाइटिंग और साउंड रेंटल। LED वॉल, मूविंग हेड्स, DJ सिस्टम, वायरलेस माइक्स MANI TENT HOUSE द्वारा।",
    },
    shortDescription: {
      en: "Professional-grade lighting, LED walls, and sound systems to elevate your event atmosphere — operated by our technical team.",
      hi: "आपके इवेंट के माहौल को ऊंचा उठाने के लिए प्रोफेशनल-ग्रेड लाइटिंग, LED वॉल और साउंड सिस्टम — हमारी तकनीकी टीम द्वारा संचालित।",
    },
    fullDescription: {
      en: [
        "Lighting and sound transform a venue from ordinary to extraordinary. MANI TENT HOUSE provides end-to-end technical production for weddings and events.",
        "Inventory includes: LED video walls (P2.5, P3.9), moving head fixtures (beam, spot, wash), par cans and uplights, follow spots, haze/fog machines, line array sound systems, wireless microphone systems, DJ consoles and controllers, trussing and rigging.",
        "Our in-house technicians handle setup, programming, live operation, and strike — so you don't need to coordinate multiple vendors.",
      ],
      hi: [
        "लाइटिंग और साउंड एक वेन्यू को साधारण से असाधारण में बदल देते हैं। MANI TENT HOUSE शादियों और इवेंट्स के लिए एंड-टू-एंड तकनीकी प्रोडक्शन प्रदान करता है।",
        "इन्वेंटरी में शामिल हैं: LED वीडियो वॉल (P2.5, P3.9), मूविंग हेड फिक्स्चर (बीम, स्पॉट, वॉश), पार कैन और अपलाइट्स, फॉलो स्पॉट्स, हेज/फॉग मशीन, लाइन एरे साउंड सिस्टम, वायरलेस माइक्रोफोन सिस्टम, DJ कंसोल और कंट्रोलर, ट्रसिंग और रिगिंग।",
        "हमारे इन-हाउस तकनीशियन सेटअप, प्रोग्रामिंग, लाइव ऑपरेशन और स्ट्राइक संभालते हैं — इसलिए आपको कई वेंडर्स के साथ समन्वय करने की आवश्यकता नहीं है।",
      ],
    },
    checklist: {
      en: [
        "Venue dimensions and power availability",
        "Event type and schedule",
        "LED wall size and position",
        "Sound coverage area",
        "Live operator requirement",
      ],
      hi: [
        "वेन्यू के आयाम और बिजली उपलब्धता",
        "इवेंट का प्रकार और शेड्यूल",
        "LED वॉल का आकार और स्थिति",
        "साउंड कवरेज क्षेत्र",
        "लाइव ऑपरेटर आवश्यकता",
      ],
    },
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: "floral-decoration",
    slug: {
      en: "floral-decoration",
      hi: "floral-decoration",
    },
    title: {
      en: "Floral & Theme Decoration",
      hi: "फ्लोरल और थीम सजावट",
    },
    seoTitle: {
      en: "Floral Decoration Services in Bilaspur | Wedding Flowers",
      hi: "बिलासपुर में फ्लोरल सजावट सेवाएं | वेडिंग फ्लावर्स",
    },
    metaDescription: {
      en: "Complete floral decoration for weddings in Bilaspur. Fresh flowers, garlands, bouquets, floral arches, and thematic installations by MANI TENT HOUSE.",
      hi: "बिलासपुर में शादियों के लिए पूर्ण फ्लोरल सजावट। ताजे फूल, माला, गुलदस्ते, फ्लोरल आर्च और थीमैटिक इंस्टॉलेशन MANI TENT HOUSE द्वारा।",
    },
    shortDescription: {
      en: "Fresh flower arrangements, garlands, bouquets, and large-scale floral installations — sourced daily, designed uniquely for your celebration.",
      hi: "ताजे फूलों की व्यवस्था, माला, गुलदस्ते और बड़े पैमाने पर फ्लोरल इंस्टॉलेशन — दैनिक रूप से प्राप्त, आपके समारोह के लिए विशिष्ट रूप से डिजाइन किए गए।",
    },
    fullDescription: {
      en: [
        "Flowers bring life, fragrance, and color to every celebration. MANI TENT HOUSE sources fresh flowers daily from trusted suppliers and designs arrangements that last through your event.",
        "We create: bridal bouquets and party corsages, jaimala/varmala sets, floral arches and entrance gates, mandap floral draping, table centerpieces and runners, hanging floral installations, flower petal pathways, car decoration for the couple.",
        "Seasonal flower recommendations and budget-friendly alternatives are provided during consultation.",
      ],
      hi: [
        "फूल हर समारोह में जीवन, सुगंध और रंग लाते हैं। MANI TENT HOUSE विश्वसनीय आपूर्तिकर्ताओं से दैनिक ताजे फूल प्राप्त करता है और ऐसे अरेंजमेंट डिजाइन करता है जो आपके इवेंट तक चलते हैं।",
        "हम बनाते हैं: दुल्हन के गुलदस्ते और पार्टी कॉर्सेज, जयमाला/वरमाला सेट, फ्लोरल आर्च और प्रवेश द्वार, मंडप फ्लोरल ड्रेपिंग, टेबल सेंटरपीस और रनर्स, हैंगिंग फ्लोरल इंस्टॉलेशन, फूलों की पंखुड़ियों के रास्ते, जोड़े के लिए कार सजावट।",
        "परामर्श के दौरान मौसमी फूलों की सिफारिशें और बजट-अनुकूल विकल्प प्रदान किए जाते हैं।",
      ],
    },
    checklist: {
      en: [
        "Preferred flowers and color palette",
        "Arrangements needed (bouquets, arches, centerpieces)",
        "Fragrance preferences",
        "Budget range",
        "Delivery and setup timeline",
      ],
      hi: [
        "पसंदीदा फूल और रंग पैलेट",
        "आवश्यक अरेंजमेंट (गुलदस्ते, आर्च, सेंटरपीस)",
        "सुगंध प्राथमिकताएं",
        "बजट रेंज",
        "डिलीवरी और सेटअप टाइमलाइन",
      ],
    },
    image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&q=80&w=1600",
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

// Testimonials data
export interface Testimonial {
  id: string;
  name: string;
  location: string;
  eventType: string;
  rating: number;
  text: {
    en: string;
    hi: string;
  };
  image?: string;
  date: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Rajesh & Priya Sharma",
    location: "Bilaspur",
    eventType: "Wedding",
    rating: 5,
    text: {
      en: "MANI TENT HOUSE transformed our wedding venue into a dream. The mandap was breathtaking, the stage lighting perfect, and the team handled everything so professionally. Our guests are still talking about it!",
      hi: "MANI TENT HOUSE ने हमारे वेडिंग वेन्यू को सपने जैसा बना दिया। मंडप लाजवाब था, स्टेज लाइटिंग परफेक्ट थी, और टीम ने सब कुछ इतने प्रोफेशनली संभाला। हमारे मेहमान आज भी उसकी तारीफ करते हैं!",
    },
    image: "https://images.unsplash.com/photo-1583939003579-782e3f92f9b3?auto=format&fit=crop&q=80&w=400",
    date: "February 2025",
  },
  {
    id: "2",
    name: "Amit Verma",
    location: "Korba",
    eventType: "Reception",
    rating: 5,
    text: {
      en: "Booked them for my sister's reception. The tent setup was sturdy despite rain, the floral work was fresh and fragrant, and the pricing was transparent. Highly recommend for any function in Bilaspur region.",
      hi: "बहन के रिसेप्शन के लिए बुक किया था। बारिश के बावजूद टेंट सेटअप मजबूत था, फ्लोरल वर्क ताजा और सुगंधित था, और प्राइसिंग ट्रांसपेरेंट थी। बिलासपुर क्षेत्र में किसी भी फंक्शन के लिए हाईली रिकमेंड।",
    },
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=400",
    date: "November 2024",
  },
  {
    id: "3",
    name: "Dr. Sunita Rao",
    location: "Raipur",
    eventType: "Engagement",
    rating: 5,
    text: {
      en: "We had a small engagement ceremony but they treated it like a grand wedding. The attention to detail in the floral arrangements and the warm lighting made our intimate event feel magical. Thank you team!",
      hi: "हमारा छोटा सा एंगेजमेंट था लेकिन उन्होंने उसे ग्रैंड वेडिंग जैसा ट्रीट किया। फ्लोरल अरेंजमेंट्स में डिटेल पर ध्यान और गर्म लाइटिंग ने हमारे इंटीमेट इवेंट को मैजिकल बना दिया। शुक्रिया टीम!",
    },
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0f4c6?auto=format&fit=crop&q=80&w=400",
    date: "January 2025",
  },
  {
    id: "4",
    name: "Vikram Singh",
    location: "Bilaspur",
    eventType: "Wedding",
    rating: 5,
    text: {
      en: "Best decision was hiring MANI TENT HOUSE. They handled the complete setup - tent, mandap, stage, lighting, sound, flowers. One vendor, zero stress. The LED wall on stage was a showstopper!",
      hi: "सबसे अच्छा फैसला था MANI TENT HOUSE को हायर करना। उन्होंने पूरा सेटअप संभाला - टेंट, मंडप, स्टेज, लाइटिंग, साउंड, फ्लावर्स। एक वेंडर, जीरो स्ट्रेस। स्टेज पर LED वॉल शोस्टॉपर था!",
    },
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=400",
    date: "December 2024",
  },
];

// Gallery images for lightbox
export interface GalleryImage {
  id: string;
  src: string;
  alt: {
    en: string;
    hi: string;
  };
  category: string;
  width: number;
  height: number;
}

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1600",
    alt: { en: "Wedding tent setup with elegant draping", hi: "सुंदर ड्रेपिंग के साथ वेडिंग टेंट सेटअप" },
    category: "Tent Setup",
    width: 1600,
    height: 1067,
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1597790048605-7e6b49c70c1a?auto=format&fit=crop&q=80&w=1600",
    alt: { en: "Traditional mandap with floral decoration", hi: "फ्लोरल सजावट के साथ पारंपरिक मंडप" },
    category: "Mandap",
    width: 1600,
    height: 1067,
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1583939003579-782e3f92f9b3?auto=format&fit=crop&q=80&w=1600",
    alt: { en: "Grand wedding stage with LED backdrop", hi: "LED बैकड्रॉप के साथ भव्य वेडिंग स्टेज" },
    category: "Stage",
    width: 1600,
    height: 1067,
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1465495976277-4387d4b0f4c6?auto=format&fit=crop&q=80&w=1600",
    alt: { en: "Luxury reception banquet decoration", hi: "लक्जरी रिसेप्शन बैंक्वेट सजावट" },
    category: "Reception",
    width: 1600,
    height: 1067,
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1600",
    alt: { en: "Professional event lighting design", hi: "प्रोफेशनल इवेंट लाइटिंग डिजाइन" },
    category: "Lighting",
    width: 1600,
    height: 1067,
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&q=80&w=1600",
    alt: { en: "Floral arch and entrance decoration", hi: "फ्लोरल आर्च और प्रवेश द्वार सजावट" },
    category: "Floral",
    width: 1600,
    height: 1067,
  },
  {
    id: "7",
    src: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=1600",
    alt: { en: "Outdoor wedding ceremony setup", hi: "आउटडोर वेडिंग सेरेमनी सेटअप" },
    category: "Tent Setup",
    width: 1600,
    height: 1067,
  },
  {
    id: "8",
    src: "https://images.unsplash.com/photo-1511795409834-efee4aa761b1?auto=format&fit=crop&q=80&w=1600",
    alt: { en: "Crystal chandelier and draping detail", hi: "क्रिस्टल झूमर और ड्रेपिंग डिटेल" },
    category: "Reception",
    width: 1600,
    height: 1067,
  },
  {
    id: "9",
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1600",
    alt: { en: "Mandap with marigold and rose garlands", hi: "गेंदे और गुलाब की माला के साथ मंडप" },
    category: "Mandap",
    width: 1600,
    height: 1067,
  },
  {
    id: "10",
    src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=1600",
    alt: { en: "Floral centerpiece on reception table", hi: "रिसेप्शन टेबल पर फ्लोरल सेंटरपीस" },
    category: "Floral",
    width: 1600,
    height: 1067,
  },
  {
    id: "11",
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1600",
    alt: { en: "Evening tent with warm ambient lighting", hi: "गर्म एम्बिएंट लाइटिंग के साथ शाम का टेंट" },
    category: "Lighting",
    width: 1600,
    height: 1067,
  },
  {
    id: "12",
    src: "https://images.unsplash.com/photo-1511795409834-efee4aa761b1?auto=format&fit=crop&q=80&w=1600",
    alt: { en: "Stage with floral backdrop and lighting", hi: "फ्लोरल बैकड्रॉप और लाइटिंग के साथ स्टेज" },
    category: "Stage",
    width: 1600,
    height: 1067,
  },
];