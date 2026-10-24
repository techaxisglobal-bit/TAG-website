export const siteConfig = {
  name: "TechAxis Global LLC",
  shortName: "TAG",
  tagline: "Enterprise IT Consulting & Solutions",
  heroHeading: "We manage your IT,\nso you can manage\nyour business.",
  heroSubheading: "Take charge of your business continuity with innovative IT solutions. Helping enterprises modernize data, ERP, cybersecurity, and cloud platforms with trusted consulting expertise.",
  description: "Enterprise IT consulting firm delivering digital transformation, ERP solutions, managed services, cybersecurity, and advanced data analytics for global organizations.",
  contact: {
    email: "contact@techaxisglobal.com",
    phone: "+1 434-285-4949",
    phoneUS: "+1 434-285-4949",
    hours: "Mon–Fri, 9am–6pm EST",
    address: "8401 Mayland Dr, Ste S, Richmond, VA 23294, USA",
    addressUS: "8401 Mayland Dr, Ste S, Richmond, VA 23294, USA"
  },
  links: {
    linkedin: "https://linkedin.com/company/techaxisglobal",
    twitter: "https://x.com/techaxisglobal",
    facebook: "https://facebook.com/techaxisglobal",
    instagram: "https://instagram.com/techaxisglobal",
    youtube: "https://youtube.com/@techaxisglobal"
  }
};

export const navLinks = [
  { name: "Home", href: "/" },
  { 
    name: "Solutions", 
    href: "/services",
    submenu: [
      { name: "Business Intelligence & Analytics", href: "/services", desc: "Power BI dashboards & advanced enterprise reporting" },
      { name: "Data Engineering & Cloud", href: "/services", desc: "SQL architectures, data pipelines & cloud lakes" },
      { name: "Qlik to Power BI Migration", href: "/services", desc: "Proven, minimal disruption migration methodology" },
      { name: "Reporting Modernization", href: "/services", desc: "Modernize legacy systems and enhance reporting efficiency" },
      { name: "IT Consulting & Staffing", href: "/services", desc: "Tailored IT talent & dedicated enterprise architects" },
      { name: "Enterprise Analytics & Cloud", href: "/services", desc: "Predictive models & future-ready cloud data platforms" }
    ]
  },
  { 
    name: "Industries", 
    href: "/industries",
    submenu: [
      { name: "Automotive", href: "/industries#automotive" },
      { name: "Manufacturing", href: "/industries#manufacturing" },
      { name: "Healthcare & Life Sciences", href: "/industries#healthcare" },
      { name: "Finance Services", href: "/industries#finance" },
      { name: "Consumer Goods & Retail", href: "/industries#retail" },
      { name: "Real Estate & Logistics", href: "/industries#real-estate" }
    ]
  },
  { 
    name: "Company", 
    href: "/about-us",
    submenu: [
      { name: "About Us", href: "/about-us" },
      { name: "Why TAG", href: "/about-us#why-us" },
      { name: "Partners & Certifications", href: "/about-us#partnerships" },
      { name: "Careers", href: "/careers" }
    ]
  },
  { name: "Careers", href: "/careers" },
  { name: "Contact Us", href: "/contact-us" }
];

export const heroStats = [
  { value: "12+", label: "Years Experience", desc: "Delivering enterprise excellence" },
  { value: "99%", label: "Customer Satisfaction", desc: "Across Fortune 500 & mid-market" },
  { value: "100+", label: "Clients Served", desc: "Enterprise partnerships worldwide" },
  { value: "2", label: "Continents Served", desc: "USA & India global delivery" }
];

export const valueProps = [
  {
    id: "cost",
    title: "Cost-effectiveness",
    subtitle: "Engineered ROI & Transparent Cloud Optimization",
    description: "We offer affordable IT solutions that help you reduce overhead, maximize cloud efficiency, and optimize bottom-line ROI.",
    icon: "TrendingDown",
    benchmark: "Up to 35% reduction in enterprise IT total cost of ownership (TCO) through workload right-sizing, proactive automation, and transparent blended delivery.",
    metric: { value: "35%", label: "Average TCO Reduction" },
    pillars: [
      { label: "FinOps & Cloud Optimization", desc: "Automated workload profiling and license consolidation across AWS, Azure, and private clouds." },
      { label: "Predictable Blended Delivery", desc: "US enterprise architecture leadership paired with high-throughput dual-continent delivery centers." },
      { label: "Transparent SLA Pricing", desc: "Zero hidden fees, milestone-backed contracts, and clear resource allocation." },
      { label: "Waste & Zombie Elimination", desc: "Proactive audits to eliminate unused SaaS seats, idle servers, and redundant software subscriptions." }
    ],
    ctaText: "Schedule a Cost Audit",
    ctaHref: "/contact-us?service=Cost%20Optimization"
  },
  {
    id: "tech",
    title: "Innovative Technology",
    subtitle: "Future-Proof Architecture & AI-Driven Acceleration",
    description: "We stay at the frontier of technology trends, deploying AI, low-code frameworks, and modern architectures to keep you ahead.",
    icon: "Cpu",
    benchmark: "Zero-technical-debt engineering standards deploying secure enterprise AI, cloud-native microservices, and modern low-code frameworks.",
    metric: { value: "4x", label: "Faster Deployment Velocity" },
    pillars: [
      { label: "Enterprise AI & Machine Learning", desc: "Private LLM deployment, predictive workflow analytics, and secure corporate knowledge bases." },
      { label: "Modern Cloud-Native Stack", desc: "Kubernetes containerization, event-driven architectures, and scalable serverless compute." },
      { label: "Low-Code Enterprise Agility", desc: "Rapid prototype-to-production using Microsoft Power Platform and PEGA Systems." },
      { label: "Rigorous Code Governance", desc: "Automated CI/CD pipelines, 90%+ test coverage, and strict branch security policies." }
    ],
    ctaText: "Explore Technology Services",
    ctaHref: "/services"
  },
  {
    id: "industry",
    title: "Industry Expertise",
    subtitle: "Vertical Compliance & Proven Domain Know-How",
    description: "We specialize in tailored domain solutions for automotive, finance, manufacturing, and healthcare with deep compliance know-how.",
    icon: "Award",
    benchmark: "100% regulatory compliance and tailored sector workflows built from 12+ years of Fortune 500 and mid-market enterprise execution.",
    metric: { value: "100%", label: "Audit Readiness Guarantee" },
    pillars: [
      { label: "Healthcare & Life Sciences", desc: "HIPAA, HITECH, and HITRUST certified data pipelines with encrypted EHR interoperability." },
      { label: "Financial Services & Banking", desc: "SOC 1/2 Type II, PCI-DSS Level 1 compliance, and low-latency transactional integrity." },
      { label: "Automotive & Manufacturing", desc: "Supply chain telemetry, IoT shop-floor integration, and strict IATF/ISO adherence." },
      { label: "Retail & Consumer Goods", desc: "Omnichannel inventory synchronization and high-concurrency order management." }
    ],
    ctaText: "View Industry Solutions",
    ctaHref: "/industries"
  },
  {
    id: "scale",
    title: "Scalability",
    subtitle: "Resilient High-Throughput Distributed Infrastructure",
    description: "Our solutions are architected to scale seamlessly with your organizational growth, guaranteeing long-term sustainable value.",
    icon: "Maximize",
    benchmark: "Guaranteed 99.98% SLA availability with zero-downtime horizontal scaling and active-active geo-redundancy.",
    metric: { value: "99.98%", label: "SLA Availability Standard" },
    pillars: [
      { label: "Elastic Auto-Scaling", desc: "Dynamic capacity bursting handling 10x traffic spikes with automated resource provisioning." },
      { label: "Zero-Downtime Deployments", desc: "Blue-green and canary release pipelines ensuring 24/7 continuous business continuity." },
      { label: "Multi-Region Disaster Recovery", desc: "Sub-minute RTO and RPO targets across geographically isolated global data centers." },
      { label: "Enterprise ERP Scaling", desc: "High-concurrency performance tuning for mission-critical SAP S/4HANA and Oracle Fusion platforms." }
    ],
    ctaText: "Consult with an Architect",
    ctaHref: "/contact-us"
  }
];

export const comprehensiveServices = [
  {
    id: "bi-analytics",
    category: "Business Intelligence",
    title: "Business Intelligence & Analytics",
    description: "Enterprise-grade BI solutions with Power BI, dashboard development, and advanced analytics to drive decision making.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    href: "/services",
    features: ["Power BI", "Executive Dashboards", "DAX & Tabular Modeling"]
  },
  {
    id: "data-engineering",
    category: "Data Platforms",
    title: "Data Engineering & Cloud Solutions",
    description: "Robust data engineering services including SQL, cloud data platforms, and modern data architecture for scalability.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    href: "/services",
    features: ["SQL Warehousing", "ETL Pipelines", "Cloud Lakehouses"]
  },
  {
    id: "qlik-powerbi",
    category: "Migration",
    title: "Qlik to Power BI Migration",
    description: "Streamlined migration from Qlik to Power BI with proven methodologies and minimal business disruption.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    href: "/services",
    features: ["Report Conversion", "Data Validation", "Zero Downtime"]
  },
  {
    id: "reporting-modernization",
    category: "Modernization",
    title: "Reporting Modernization",
    description: "Modernize legacy reporting platforms, improve data accuracy, and enhance reporting efficiency.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    href: "/services",
    features: ["Legacy Modernization", "Data Accuracy", "Automated Workflows"]
  }
];

export const specializedStaffing = [
  {
    id: "it-consulting-staffing",
    category: "Consulting & Staffing",
    title: "IT Consulting & Staffing",
    description: "Specialized IT consulting and staffing services for enterprise projects, ensuring the right expertise and ongoing support.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&q=80",
    href: "/contact-us?service=IT%20Consulting%20%26%20Staffing",
    features: ["Certified Enterprise Architects", "Flexible Staff Augmentation", "US E-Verified Firm"]
  },
  {
    id: "enterprise-analytics",
    category: "Analytics & Growth",
    title: "Enterprise Analytics",
    description: "Modern analytics and reporting for business growth, executive visibility, and operational efficiency.",
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&w=900&q=80",
    href: "/contact-us?service=Enterprise%20Analytics",
    features: ["Predictive Analytics", "Operational Visibility", "KPI Monitoring"]
  },
  {
    id: "cloud-data-solutions",
    category: "Cloud Infrastructure",
    title: "Cloud Data Solutions",
    description: "Cloud-based data platforms and engineering for scalable, future-ready enterprise applications.",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=900&q=80",
    href: "/contact-us?service=Cloud%20Data%20Solutions",
    features: ["Multi-Cloud Architecture", "Distributed Data Scaling", "SLA Guarantees"]
  }
];

export const solutions = [
  ...comprehensiveServices,
  ...specializedStaffing
];

export const industries = [
  {
    id: "automotive",
    title: "Automotive",
    description: "Connected vehicle data telemetry, smart dealership ERP, and real-time parts logistics.",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
    highlight: "Telematics & Supply Chain",
    icon: "Car"
  },
  {
    id: "manufacturing",
    title: "Manufacturing",
    description: "Predictive asset maintenance, IoT shop-floor tracking, and automated supply chains.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    highlight: "Smart Factory & Industry 4.0",
    icon: "Factory"
  },
  {
    id: "healthcare",
    title: "Healthcare",
    description: "HIPAA-compliant EHR pipelines, clinical telemetry analytics, and medical diagnostics platforms.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    highlight: "Patient Care & Compliance",
    icon: "Activity"
  },
  {
    id: "finance",
    title: "Finance Services",
    description: "High-throughput core banking analytics, fraud detection AI, and regulatory risk reporting.",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80",
    highlight: "Fintech & Risk Analytics",
    icon: "DollarSign"
  },
  {
    id: "retail",
    title: "Consumer Goods & Retail",
    description: "Omni-channel supply optimization, dynamic price engines, and real-time inventory tracking.",
    image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=800&q=80",
    highlight: "Omnichannel Logistics",
    icon: "ShoppingBag"
  },
  {
    id: "real-estate",
    title: "Real Estate & Logistics",
    description: "Smart facility telemetry, automated lease management, and predictive property analytics.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    highlight: "Smart Property Tech",
    icon: "Building2"
  }
];

export const vendorEcosystem = [
  {
    category: "ERP & Enterprise Platforms",
    badge: "Core Enterprise",
    lead: "At our company, we specialize in providing integrated solutions using SAP, Oracle, Microsoft, and PEGA platforms.",
    description: "We leverage SAP’s ERP for operational efficiency, Oracle’s cloud for scalable data management, Microsoft applications for enhanced collaboration, and PEGA’s low-code platform for accelerated process automation.",
    technologies: [
      { name: "SAP S/4 HANA", role: "Next-gen Cloud ERP" },
      { name: "SAP ECC & ABAP", role: "Core Enterprise Upgrades" },
      { name: "Oracle Fusion", role: "Financials & Supply Chain" },
      { name: "Microsoft Dynamics 365", role: "Connected CRM & Operations" },
      { name: "PEGA Systems", role: "Low-code Process Automation" }
    ]
  },
  {
    category: "Automation & Artificial Intelligence",
    badge: "Next-Gen AI",
    lead: "Comprehensive automation solutions creating a synergistic intelligent enterprise ecosystem.",
    description: "We deploy AI for predictive analytics, Robotic Process Automation (RPA) for high-volume task handling, and NLP to transform customer interactions and internal operations.",
    technologies: [
      { name: "Artificial Intelligence (AI)", role: "Predictive Models" },
      { name: "Robotic Process Automation (RPA)", role: "UiPath & Power Automate" },
      { name: "Machine Learning (ML)", role: "Algorithmic Insights" },
      { name: "Internet of Things (IoT)", role: "Telemetry Streaming" },
      { name: "Generative AI & LLMs", role: "Enterprise Knowledge" }
    ]
  },
  {
    category: "Cybersecurity & Governance",
    badge: "Zero Trust",
    lead: "Tailored cybersecurity solutions protecting enterprise infrastructure and critical customer data.",
    description: "We provide comprehensive vulnerability assessments, real-time SOC monitoring, incident response frameworks, AI-driven threat mitigation, and robust encryption to ensure complete regulatory compliance.",
    technologies: [
      { name: "Threat Assessment", role: "Penetration & Risk Audits" },
      { name: "Network Security", role: "Firewalls & Micro-segmentation" },
      { name: "Endpoint Protection", role: "EDR & Zero-Trust Defense" },
      { name: "SOC2 & ISO Compliance", role: "Audit Readiness" }
    ]
  },
  {
    category: "Managed Application Support",
    badge: "24/7 SLA",
    lead: "Dedicated global support optimizing and maintaining critical enterprise applications.",
    description: "Our certified engineering team provides 24/7 proactive troubleshooting, regular system upgrades, database tuning, and performance optimization to ensure seamless business continuity.",
    technologies: [
      { name: "SAP Basis & NetWeaver", role: "24/7 Platform Health" },
      { name: "Oracle Database & Middleware", role: "High-Availability Clusters" },
      { name: "Azure & AWS Cloud", role: "Cloud Ops & DevOps CI/CD" },
      { name: "SLA Incident Response", role: "15-minute Critical SLA" }
    ]
  }
];

export const clientPartners = [
  {
    name: "Microsoft",
    category: "Cloud, AI & Solutions",
    role: "Azure Cloud, Microsoft 365, Power BI & Enterprise Modernization",
    badge: "Cloud & AI Partner",
    logo: "/assets/logos/microsoft.svg"
  },
  {
    name: "Nvidia",
    category: "AI Computing & GPUs",
    role: "Accelerated Enterprise AI Computing & High-Performance Infrastructure",
    badge: "AI Partner",
    logo: "/assets/logos/nvidia.svg"
  },
  {
    name: "AWS",
    category: "Cloud Infrastructure",
    role: "Amazon Web Services Scalable Architecture, Serverless & DevOps",
    badge: "Cloud Partner",
    logo: "/assets/logos/aws.svg"
  },
  {
    name: "Ekipit",
    category: "Strategic Alliance",
    role: "Global Enterprise Delivery & Scalable IT Infrastructure Services",
    badge: "Strategic Partner",
    logo: "/assets/logos/ekipit.png"
  },
  {
    name: "HCL Tech",
    category: "Digital Engineering",
    role: "Enterprise Technology Consulting & Large-Scale Systems Integration",
    badge: "Technology Partner",
    logo: "/assets/logos/hcltech.svg"
  },
  {
    name: "Cognizant",
    category: "Core Modernization",
    role: "Business Architecture Transformation & Enterprise Advisory",
    badge: "Enterprise Partner",
    logo: "/assets/logos/cognizant.svg"
  },
  {
    name: "Capgemini",
    category: "Global Transformation",
    role: "Cloud Engineering, Systems Modernization & Industry Solutions",
    badge: "Global Partner",
    logo: "/assets/logos/capgemini.svg"
  },
  {
    name: "An E-verified US Firm",
    category: "Federal DHS Authorization",
    role: "Official U.S. Department of Homeland Security E-Verify Program Participant",
    badge: "Federal Compliance",
    isEVerify: true,
    logo: "/e-verify.png"
  }
];

export const consultationBenefits = [
  "Client-oriented dedicated account team",
  "Independent & vendor-agnostic advisory",
  "Competent, certified platform engineers",
  "Results-driven SLA commitments",
  "Proactive problem-solving culture",
  "Transparent pricing with no hidden costs"
];

export const consultationSteps = [
  {
    number: "01",
    title: "Schedule at your convenience",
    description: "Book an introductory consultation with our senior solutions architect at a time that works for you."
  },
  {
    number: "02",
    title: "Discovery & consulting meeting",
    description: "We analyze your existing IT architecture, business pain points, roadmap targets, and budget constraints."
  },
  {
    number: "03",
    title: "Tailored proposal & roadmap",
    description: "We deliver a comprehensive solution blueprint, milestone timeline, transparent pricing, and projected ROI."
  }
];

export const services = solutions;
