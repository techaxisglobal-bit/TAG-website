export const siteConfig = {
  name: "TechAxis Global LLC",
  shortName: "TAG",
  tagline: "Complexity Simplified",
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
      { name: "Digital Transformation", href: "/services#digital-transformation", desc: "Agile modern IT infrastructure & cloud transition" },
      { name: "ERP Solutions", href: "/services#erp-solutions", desc: "SAP, Oracle Fusion, Microsoft Dynamics implementations" },
      { name: "Managed Services", href: "/services#managed-services", desc: "24/7 proactive monitoring & enterprise application support" },
      { name: "Cyber Security", href: "/services#cyber-security", desc: "Threat assessments, SOC monitoring & endpoint resilience" },
      { name: "Intelligent Automation", href: "/services#automation", desc: "RPA, AI workflows, and process optimization" },
      { name: "Data Engineering & BI", href: "/services#data-bi", desc: "Power BI, Microsoft Fabric, snowflake & modern analytics" }
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
    description: "We offer affordable IT solutions that help you reduce overhead, maximize cloud efficiency, and optimize bottom-line ROI.",
    icon: "TrendingDown"
  },
  {
    id: "tech",
    title: "Innovative Technology",
    description: "We stay at the frontier of technology trends, deploying AI, low-code frameworks, and modern architectures to keep you ahead.",
    icon: "Cpu"
  },
  {
    id: "industry",
    title: "Industry Expertise",
    description: "We specialize in tailored domain solutions for automotive, finance, manufacturing, and healthcare with deep compliance know-how.",
    icon: "Award"
  },
  {
    id: "scale",
    title: "Scalability",
    description: "Our solutions are architected to scale seamlessly with your organizational growth, guaranteeing long-term sustainable value.",
    icon: "Maximize"
  }
];

export const solutions = [
  {
    id: "digital-transformation",
    category: "Modernization",
    title: "Digital Transformation",
    description: "In a digital world that is evolving quickly, digital transformation helps firms become more competitive, efficient, and customer-centric through cloud, API, and workflow innovation.",
    href: "/services",
    icon: "Sparkles",
    features: ["Cloud Migration", "API Integration", "Legacy Modernization"]
  },
  {
    id: "erp-solutions",
    category: "Enterprise Systems",
    title: "ERP Solutions",
    description: "Expert ERP solutions across SAP S/4 HANA, Oracle Fusion, and Microsoft Dynamics 365. We optimize core enterprise resource planning for peak operational efficiency.",
    href: "/services",
    icon: "Database",
    features: ["SAP S/4 HANA", "Oracle Fusion", "Microsoft Dynamics"]
  },
  {
    id: "managed-services",
    category: "Support & SLA",
    title: "Managed Services",
    description: "By partnering with our dedicated 24/7 managed IT services, enterprises reduce downtime, maintain continuous system health, and free in-house teams to focus on strategy.",
    href: "/services",
    icon: "ShieldCheck",
    features: ["24/7 Monitoring", "SLA Guarantees", "Application Maintenance"]
  },
  {
    id: "cyber-security",
    category: "Defense & Risk",
    title: "Cyber Security",
    description: "Safeguard networks, critical systems, and confidential data against evolving threats with real-time risk assessment, AI threat detection, and rigorous compliance governance.",
    href: "/services",
    icon: "Lock",
    features: ["Threat Monitoring", "Penetration Testing", "SOC2 Compliance"]
  },
  {
    id: "automation",
    category: "AI & Workflows",
    title: "Intelligent Automation",
    description: "Leverage advanced technologies like AI predictive analytics, Robotic Process Automation (RPA), and NLP to eliminate repetitive tasks and create an agile automation ecosystem.",
    href: "/services",
    icon: "Zap",
    features: ["Robotic Process Automation", "Predictive AI", "PEGA Low-Code"]
  },
  {
    id: "data-bi",
    category: "Analytics & Cloud",
    title: "Data Engineering & BI",
    description: "Enterprise data pipelines, Power BI & Microsoft Fabric dashboards, SQL warehouse architectures, and seamless migration from legacy platforms like Qlik to Power BI.",
    href: "/services",
    icon: "BarChart3",
    features: ["Power BI Dashboards", "Data Pipelines", "Qlik Migration"]
  }
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
  { name: "SAP Partner", category: "Alliance Partner" },
  { name: "Microsoft Gold", category: "Cloud & Solutions" },
  { name: "Oracle Partner", category: "Fusion & Database" },
  { name: "AWS Partner", category: "Cloud Infrastructure" },
  { name: "Eviden", category: "Technology Partner" },
  { name: "HP Enterprise", category: "Infrastructure" },
  { name: "Proaxia", category: "Automotive Solutions" },
  { name: "Yash Technologies", category: "Implementation Partner" },
  { name: "Prodigi", category: "Digital Services" },
  { name: "Wiselink", category: "Enterprise Partner" }
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
