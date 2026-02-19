import { LandingPageBlock, LandingPage } from "./types";

const LANDING_PAGES_STORAGE_KEY = "landing_pages";

export const createHeaderBlock = (): LandingPageBlock => ({
  id: `header-${Date.now()}`,
  type: "header",
  properties: {
    logoUrl: "",
    logoText: "Logo",
    navigationLinks: [
      { label: "Home", href: "#home" },
      { label: "Features", href: "#features" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
    ],
    ctaButtonText: "Sign Up",
    ctaButtonLink: "#signup",
  },
});

export const createHeroBlock = (): LandingPageBlock => ({
  id: `hero-${Date.now()}`,
  type: "hero",
  properties: {
    backgroundImage: "",
    backgroundColor: "#f3f4f6",
    headline: "Transform Your Creativity Today!",
    subheading: "Unlock new tools and grow your skills",
    headlineWidth: "100%",
    headlineHeight: "auto",
    subheadingWidth: "100%",
    subheadingHeight: "auto",
    ctaButtonText: "Start Your Free Trial",
    ctaButtonLink: "#signup",
    ctaButtonColor: "#FF6A00",
    minHeight: "500px",
  },
});

export const createFeaturesBlock = (): LandingPageBlock => ({
  id: `features-${Date.now()}`,
  type: "features",
  properties: {
    heading: "Why Choose Us",
    description: "Discover the key features that make our product special",
    features: [
      {
        id: "feature-1",
        icon: "⚡",
        title: "Lightning Fast",
        description:
          "Optimized performance that keeps your projects running smoothly",
      },
      {
        id: "feature-2",
        icon: "🎨",
        title: "Beautiful Design",
        description: "Create stunning visuals with our intuitive design tools",
      },
      {
        id: "feature-3",
        icon: "🔒",
        title: "Secure",
        description: "Enterprise-grade security to protect your data",
      },
      {
        id: "feature-4",
        icon: "🌐",
        title: "Scalable",
        description: "Grows with your business needs",
      },
    ],
    backgroundColor: "#ffffff",
    columns: 4,
  },
});

export const createTestimonialsBlock = (): LandingPageBlock => ({
  id: `testimonials-${Date.now()}`,
  type: "testimonials",
  properties: {
    heading: "What Our Customers Say",
    backgroundColor: "#f9fafb",
    testimonials: [
      {
        id: "testimonial-1",
        quote:
          '"This product has transformed the way we work. Highly recommended!"',
        author: "Sarah Johnson",
        role: "CEO, Tech Startup",
        avatarUrl: "",
      },
      {
        id: "testimonial-2",
        quote:
          '"Amazing experience from start to finish. Best investment we made this year."',
        author: "Michael Chen",
        role: "Product Manager, Digital Agency",
        avatarUrl: "",
      },
      {
        id: "testimonial-3",
        quote: '"The support team is incredible. They go above and beyond."',
        author: "Emma Williams",
        role: "Designer, Creative Studio",
        avatarUrl: "",
      },
    ],
  },
});

export const createContentImageBlock = (): LandingPageBlock => ({
  id: `content-image-${Date.now()}`,
  type: "content-image",
  properties: {
    title: "Some title here",
    description: "From 25€\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy eirmod tempor incididunt ut labore et dolore magna aliquyam erat, sed diam voluptua.",
    imageUrl: "https://via.placeholder.com/300x250?text=Product+Image",
    buttonText: "Call to action",
    buttonLink: "#",
    imagePosition: "left", // "left" or "right"
    backgroundColor: "#ffffff",
  },
});

export const createAboutBlock = (): LandingPageBlock => ({
  id: `about-${Date.now()}`,
  type: "about",
  properties: {
    heading: "About Us",
    content:
      "We are a team of passionate professionals dedicated to creating innovative solutions that make a difference. With over a decade of experience in the industry, we've helped thousands of businesses achieve their goals.",
    imageUrl: "",
    imagePosition: "right", // 'left' or 'right'
    backgroundColor: "#ffffff",
    cta: {
      text: "Learn More",
      link: "#more-info",
    },
  },
});

export const createContactFormBlock = (): LandingPageBlock => ({
  id: `contact-${Date.now()}`,
  type: "contact-form",
  properties: {
    heading: "Get In Touch",
    description: "We'd love to hear from you. Send us a message!",
    fields: [
      { id: "name", label: "Name", type: "text", placeholder: "Your name" },
      {
        id: "email",
        label: "Email",
        type: "email",
        placeholder: "Your email",
      },
      {
        id: "message",
        label: "Message",
        type: "textarea",
        placeholder: "Your message",
      },
    ],
    submitButtonText: "Send Message",
    submitButtonColor: "#FF6A00",
    backgroundColor: "#f3f4f6",
  },
});

export const createFooterBlock = (): LandingPageBlock => ({
  id: `footer-${Date.now()}`,
  type: "footer",
  properties: {
    companyName: "Your Company Name",
    companyDescription: "Building amazing products since 2024",
    quickLinks: [
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Terms of Service", href: "#terms" },
      { label: "Contact Us", href: "#contact" },
    ],
    contactInfo: {
      email: "hello@company.com",
      phone: "+1 (555) 123-4567",
    },
    socialLinks: [
      { platform: "Facebook", url: "#facebook" },
      { platform: "Instagram", url: "#instagram" },
      { platform: "Twitter", url: "#twitter" },
      { platform: "LinkedIn", url: "#linkedin" },
    ],
    backgroundColor: "#1f2937",
    textColor: "#ffffff",
  },
});

export const createSectionSpacerBlock = (): LandingPageBlock => ({
  id: `spacer-${Date.now()}`,
  type: "section-spacer",
  properties: {
    height: "60px",
  },
});

export const createPricingBlock = (): LandingPageBlock => ({
  id: `pricing-${Date.now()}`,
  type: "pricing",
  properties: {
    heading: "Pricing",
    subheading: "Subtitle.",
    backgroundColor: "#ffffff",
    pricingTiers: [
      {
        id: "tier-1",
        name: "Starter",
        price: "$0",
        description: "Features",
        features: ["1 User", "5 Projects", "Basic Support"],
        buttonText: "Sign up",
        buttonColor: "#f3f4f6",
        buttonTextColor: "#111827",
      },
      {
        id: "tier-2",
        name: "Professional",
        price: "$20",
        description: "Features",
        features: ["5 Users", "50 Projects", "Priority Support"],
        buttonText: "Get In",
        buttonColor: "#111827",
        buttonTextColor: "#ffffff",
        isHighlighted: true,
      },
      {
        id: "tier-3",
        name: "Enterprise",
        price: "$40",
        description: "Features",
        features: ["Unlimited Users", "Unlimited Projects", "24/7 Support"],
        buttonText: "Sign up",
        buttonColor: "#f3f4f6",
        buttonTextColor: "#111827",
      },
    ],
  },
});

export const createFaqBlock = (): LandingPageBlock => ({
  id: `faq-${Date.now()}`,
  type: "faq",
  properties: {
    heading: "Frequently Asked Questions",
    backgroundColor: "#ffffff",
    faqs: [
      {
        id: "faq-1",
        question: "How do frames work?",
        answer:
          "Frames are containers that help you organize and structure your designs. They work by grouping related elements together.",
      },
      {
        id: "faq-2",
        question: "How do code pages?",
        answer:
          "Code pages allow you to write custom code for advanced functionality. You can add HTML, CSS, and JavaScript.",
      },
      {
        id: "faq-3",
        question: "How do features work?",
        answer:
          "Features are built-in functionalities that you can enable or disable based on your needs.",
      },
    ],
  },
});

export const createSignupBlock = (): LandingPageBlock => ({
  id: `signup-${Date.now()}`,
  type: "signup",
  properties: {
    heading: "Stay in the loop.",
    subheading: "Sign up now.",
    backgroundColor: "#ffffff",
    inputPlaceholder: "Enter your email",
    buttonText: "Sign up",
    buttonColor: "#111827",
    buttonTextColor: "#ffffff",
  },
});

export const createPricingFooterBlock = (): LandingPageBlock => ({
  id: `pricing-footer-${Date.now()}`,
  type: "pricing-footer",
  properties: {
    backgroundColor: "#ffffff",
    columns: [
      {
        id: "col-1",
        title: "Product",
        links: [
          { label: "Solutions", href: "#" },
          { label: "Contacts", href: "#" },
        ],
      },
      {
        id: "col-2",
        title: "Resources",
        links: [
          { label: "Docs", href: "#" },
          { label: "Help", href: "#" },
        ],
      },
      {
        id: "col-3",
        title: "Company",
        links: [
          { label: "Support", href: "#" },
          { label: "Blog", href: "#" },
        ],
      },
    ],
  },
});

export const createHeadingBlock = (level: "h1" | "h2" | "h3" = "h1"): LandingPageBlock => ({
  id: `heading-${Date.now()}`,
  type: "heading",
  properties: {
    text: "Your Heading Here",
    level,
    textColor: "#1f2937",
    fontSize: level === "h1" ? "3rem" : level === "h2" ? "2rem" : "1.5rem",
    fontWeight: "bold",
    textAlign: "left",
    backgroundColor: "#ffffff",
    padding: "20px",
  },
});

export const createParagraphBlock = (): LandingPageBlock => ({
  id: `paragraph-${Date.now()}`,
  type: "paragraph",
  properties: {
    text: "This is a paragraph block. Add your body text, descriptions, or any other content here.",
    textColor: "#4b5563",
    fontSize: "1rem",
    lineHeight: "1.6",
    textAlign: "left",
    backgroundColor: "#ffffff",
    padding: "20px",
  },
});

export const createRichTextBlock = (): LandingPageBlock => ({
  id: `rich-text-${Date.now()}`,
  type: "rich-text",
  properties: {
    text: "<p>This is a <strong>rich text</strong> block with <em>formatting options</em>. You can add <u>underlined</u> text, <a href=\"#\">links</a>, and more.</p><ul><li>Bullet point 1</li><li>Bullet point 2</li></ul>",
    textColor: "#4b5563",
    fontSize: "1rem",
    lineHeight: "1.6",
    textAlign: "left",
    backgroundColor: "#ffffff",
    padding: "20px",
  },
});

export const createQuoteBlock = (): LandingPageBlock => ({
  id: `quote-${Date.now()}`,
  type: "quote",
  properties: {
    quoteText: "The only way to do great work is to love what you do.",
    authorName: "Steve Jobs",
    textColor: "#1f2937",
    quoteSize: "1.5rem",
    authorSize: "0.875rem",
    backgroundColor: "#f3f4f6",
    borderColor: "#FF6A00",
    borderWidth: "4px",
    borderPosition: "left",
    padding: "24px",
  },
});

export const createDynamicContentBlock = (): LandingPageBlock => ({
  id: `dynamic-content-${Date.now()}`,
  type: "dynamic-content",
  properties: {
    heading: "Dynamic Content",
    description: "Add dynamic content that changes based on user input or data",
    contentType: "text", // 'text', 'form', 'list'
    backgroundColor: "#ffffff",
    textColor: "#1f2937",
    padding: "24px",
    borderColor: "#e5e7eb",
    borderWidth: "1px",
    items: [
      { id: "item-1", label: "Item 1", value: "Content 1" },
      { id: "item-2", label: "Item 2", value: "Content 2" },
      { id: "item-3", label: "Item 3", value: "Content 3" },
    ],
  },
});

export const createProductBlock = (): LandingPageBlock => ({
  id: `product-${Date.now()}`,
  type: "product",
  properties: {
    heading: "Featured Product",
    description: "Showcase your product with image and details",
    backgroundColor: "#ffffff",
    products: [
      {
        id: "product-1",
        name: "Product Name",
        description: "Product description goes here",
        price: "$99.99",
        imageUrl: "",
        buttonText: "Buy Now",
        buttonLink: "#purchase",
        buttonColor: "#FF6A00",
      },
    ],
    columns: 1,
    showPrice: true,
    showDescription: true,
  },
});

export const createNavigationBlock = (): LandingPageBlock => ({
  id: `navigation-${Date.now()}`,
  type: "navigation",
  properties: {
    heading: "Navigation",
    description: "Add navigation links for users",
    backgroundColor: "#1f2937",
    textColor: "#ffffff",
    orientation: "horizontal", // 'horizontal' or 'vertical'
    links: [
      { id: "nav-1", label: "Home", href: "#home" },
      { id: "nav-2", label: "About", href: "#about" },
      { id: "nav-3", label: "Services", href: "#services" },
      { id: "nav-4", label: "Contact", href: "#contact" },
    ],
    alignment: "center",
    padding: "16px",
  },
});

// Template block creators that return arrays of blocks
export const createMeetFramerTemplate = (): LandingPageBlock[] => [
  createHeroBlock(),
];

export const createMeetFramerWithButtonsTemplate = (): LandingPageBlock[] => [
  {
    id: `hero-with-buttons-${Date.now()}`,
    type: "hero",
    properties: {
      backgroundImageUrl: "",
      backgroundType: "color",
      backgroundColor: "#ffffff",
      gradientStart: "#ffffff",
      gradientEnd: "#f3f4f6",
      headline: "Meet Framer",
      subheading: "Internet canvas.",
      ctaButtonText: "Sign Up",
      ctaButtonLink: "#signup",
      ctaButtonColor: "#111827",
      minHeight: "400px",
      secondaryButtonText: "Download",
      secondaryButtonLink: "#download",
      secondaryButtonColor: "#f3f4f6",
      secondaryButtonTextColor: "#111827",
    },
  },
];

export const createLogoTemplate = (): LandingPageBlock[] => [
  createFeaturesBlock(),
];

export const createInfiniteCanvasTemplate = (): LandingPageBlock[] => [
  createAboutBlock(),
];

export const createInfiniteCanvasTwoColumnTemplate = (): LandingPageBlock[] => [
  createAboutBlock(),
];

export const createCanvasPublishTemplate = (): LandingPageBlock[] => [
  createFeaturesBlock(),
];

export const createThreeColumnTemplate = (): LandingPageBlock[] => [
  createFeaturesBlock(),
];

export const createStatisticsTemplate = (): LandingPageBlock[] => [
  createHeaderBlock(),
];

export const createTestimonialTemplate = (): LandingPageBlock[] => [
  createTestimonialsBlock(),
];

export const createPricingTemplate = (): LandingPageBlock[] => [
  createPricingBlock(),
];

export const createFaqTemplate = (): LandingPageBlock[] => [createFaqBlock()];

export const createSignupTemplate = (): LandingPageBlock[] => [
  createSignupBlock(),
];

export const createPricingFooterTemplate = (): LandingPageBlock[] => [
  createPricingFooterBlock(),
];

// Local storage functions
export const getLandingPagesFromLocalStorage = (): LandingPage[] => {
  try {
    const stored = localStorage.getItem(LANDING_PAGES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveLandingPageToLocalStorage = (page: LandingPage): void => {
  const pages = getLandingPagesFromLocalStorage();
  const index = pages.findIndex((p) => p.id === page.id);

  if (index >= 0) {
    pages[index] = page;
  } else {
    pages.push(page);
  }

  localStorage.setItem(LANDING_PAGES_STORAGE_KEY, JSON.stringify(pages));
};

export const deleteLandingPageFromLocalStorage = (id: string): void => {
  const pages = getLandingPagesFromLocalStorage();
  const filtered = pages.filter((p) => p.id !== id);
  localStorage.setItem(LANDING_PAGES_STORAGE_KEY, JSON.stringify(filtered));
};

export const createNewLandingPage = (
  name: string,
  description: string,
): LandingPage => ({
  id: `lp-${Date.now()}`,
  name,
  description,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  blocks: [
    createHeaderBlock(),
    createHeroBlock(),
    createFeaturesBlock(),
    createTestimonialsBlock(),
    createAboutBlock(),
    createContactFormBlock(),
    createFooterBlock(),
  ],
});
