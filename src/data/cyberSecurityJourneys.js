// Per-specialization content for the visual "how this fits into the full Cyber Security
// programme" section on each /courses/cyber-security/:subSlug page. Deliberately kept separate
// from coursesData.js's cyberSecuritySubCourses (title/blurb/bullets used in the page header) —
// this file is the much larger dataset behind the module roadmap, projects, skills, outcomes,
// career roles, salary bands and FAQs, which genuinely differ per specialization.

// Shared across all six pages on purpose: this is the pedagogical arc every specialization is
// taught through, not specialization-specific content, so reusing it isn't "duplicate content" —
// it's one consistent design-system element (see the module instructions: "the overall design
// system can remain consistent across all six pages").
export const learningFlowStages = [
    { label: 'Beginner', detail: 'Start with zero assumed background.' },
    { label: 'Foundation', detail: 'Core concepts explained from first principles.' },
    { label: 'Hands-on Practice', detail: 'Guided exercises in a live lab.' },
    { label: 'Intermediate Skills', detail: 'Combine concepts into real workflows.' },
    { label: 'Real-world Project', detail: 'Apply everything to a full project.' },
    { label: 'Advanced Application', detail: 'Handle edge cases like a working analyst.' },
    { label: 'Career Ready', detail: 'Portfolio, reporting and interview-ready.' },
];

// Same reasoning as learningFlowStages — one shared six-step "job-ready profile" formula and
// one shared project-presentation framework, reused across pages by design.
export const jobReadyProfileSteps = ['Skills', 'Projects', 'Portfolio', 'Resume', 'Interview Explanation'];
export const projectPresentationFlow = ['Problem', 'Approach', 'Tools', 'What I Did', 'Result', 'What I Learned'];

export const achievementSnapshotStages = [
    { label: 'Knowledge', detail: 'Core concepts understood' },
    { label: 'Hands-on', detail: 'Practical labs completed' },
    { label: 'Projects', detail: 'Portfolio-ready projects' },
    { label: 'Documentation', detail: 'Professional reports' },
    { label: 'Presentation', detail: 'Interview-ready explanation' },
    { label: 'Career', detail: 'Entry-level career direction' },
];

const HYDERABAD_LOCATIONS = 'Hyderabad, Madhapur, Hitech City and Gachibowli';

export const cyberSecurityJourneys = {
    'ethical-hacking-penetration-testing-course': {
        icon: 'Terminal',
        tint: 'from-red-500 to-orange-500',
        metaTitle: 'Ethical Hacking & Penetration Testing Course in Hyderabad',
        metaDescription:
            'Learn ethical hacking and penetration testing in Hyderabad with live labs — reconnaissance, exploitation, privilege escalation and client-ready reporting. Part of our 5-month Cyber Security programme.',
        modules: [
            { step: '01', title: 'Fundamentals', icon: 'BookOpen', detail: 'The ethical hacking mindset, legal boundaries and how authorized testing actually works.' },
            { step: '02', title: 'Core Skills', icon: 'Search', detail: 'Reconnaissance, scanning and vulnerability identification across networks and web apps.' },
            { step: '03', title: 'Tools & Techniques', icon: 'Terminal', detail: 'Kali Linux, Nmap, Burp Suite and Metasploit for real attack simulations.' },
            { step: '04', title: 'Practical Labs', icon: 'FlaskConical', detail: 'Exploit intentionally vulnerable machines inside an isolated lab environment.' },
            { step: '05', title: 'Real Projects', icon: 'FolderGit2', detail: 'A full web app assessment and network penetration test, start to finish.' },
            { step: '06', title: 'Career Readiness', icon: 'BadgeCheck', detail: 'Turn lab work into a client-ready penetration test report.' },
        ],
        projects: [
            { name: 'Web Application Security Assessment', oneLiner: 'Assess a live web app for OWASP Top 10 vulnerabilities.', skills: ['Web App Testing', 'OWASP Top 10'], tools: ['Burp Suite', 'OWASP ZAP'], demonstrates: 'Finding and documenting real web vulnerabilities.' },
            { name: 'Vulnerability Assessment Lab', oneLiner: 'Scan a lab network and rank vulnerabilities by severity.', skills: ['Vulnerability Analysis', 'Risk Prioritisation'], tools: ['Nessus', 'Nmap'], demonstrates: 'A structured vulnerability assessment methodology.' },
            { name: 'Penetration Testing Report', oneLiner: 'Document a full engagement the way clients expect to receive it.', skills: ['Technical Writing', 'Risk Communication'], tools: ['Report templates', 'Metasploit'], demonstrates: 'Professional reporting — the deliverable clients actually pay for.' },
            { name: 'Network Security Testing Lab', oneLiner: 'Simulate an internal network attack from access to lateral movement.', skills: ['Network Exploitation', 'Lateral Movement'], tools: ['Kali Linux', 'Metasploit'], demonstrates: 'End-to-end attack-path thinking, not single exploits.' },
        ],
        skills: ['Reconnaissance & OSINT', 'Vulnerability Scanning', 'Web App Exploitation', 'Network Penetration Testing', 'Privilege Escalation', 'Burp Suite', 'Metasploit', 'Report Writing'],
        outcomes: [
            { label: 'Understand', icon: 'BookOpen', detail: 'How real attackers find and chain vulnerabilities.' },
            { label: 'Perform', icon: 'Search', detail: 'Reconnaissance, scanning and exploitation on lab targets.' },
            { label: 'Build', icon: 'FolderGit2', detail: 'A documented web app and network penetration test.' },
            { label: 'Document', icon: 'FileText', detail: 'A client-ready penetration test report.' },
            { label: 'Present', icon: 'Presentation', detail: 'Your testing methodology and findings in interviews.' },
            { label: 'Apply', icon: 'Briefcase', detail: 'Entry-level penetration testing and security analyst work.' },
        ],
        careerRoles: ['Penetration Testing Trainee', 'Security Analyst', 'Vulnerability Assessment Analyst', 'Junior Ethical Hacker', 'Cyber Security Analyst'],
        salary: { fresher: '₹3.5 – 5.5 LPA', midLevel: '₹5.5 – 9 LPA', experienced: '₹9 – 16 LPA' },
        faqs: [
            { question: 'Is this Ethical Hacking and Penetration Testing course in Hyderabad suitable for beginners?', answer: `Yes. We start from cyber security fundamentals before moving into hands-on penetration testing, so no prior security experience is assumed. Classroom and live-online batches both run out of our ${HYDERABAD_LOCATIONS} training centres.` },
            { question: 'Do I need a programming background to learn ethical hacking?', answer: 'Basic familiarity with networks and Linux helps, but it is not mandatory. The course builds up scripting and tooling skills as part of the curriculum.' },
            { question: 'Will I get real hands-on lab practice, not just theory?', answer: 'Yes — every module pairs concepts with lab work on intentionally vulnerable targets using tools like Nmap, Burp Suite and Metasploit inside a safe, isolated environment.' },
            { question: 'Does this course help with CEH or OSCP certification preparation?', answer: 'The curriculum covers the core skills those certifications test — reconnaissance, exploitation and reporting — though this course itself leads to a Skill IT Education completion certificate, not the CEH/OSCP credential directly.' },
            { question: 'Is placement support available for learners based in Hyderabad?', answer: 'Yes, career guidance, interview preparation and placement support are part of the full 5-month Cyber Security programme this specialisation belongs to.' },
        ],
    },

    'network-security-course': {
        icon: 'Network',
        tint: 'from-blue-600 to-cyan-500',
        metaTitle: 'Network Security Course in Hyderabad | Firewalls, VPNs & Monitoring',
        metaDescription:
            'Learn practical network security in Hyderabad — firewalls, VPNs, segmentation and traffic monitoring in live labs. Part of our 5-month Cyber Security programme with placement support.',
        modules: [
            { step: '01', title: 'Fundamentals', icon: 'BookOpen', detail: 'How networks are built, and the core principles behind securing them.' },
            { step: '02', title: 'Core Skills', icon: 'Shield', detail: 'Firewall rules, VPN configuration and network segmentation strategy.' },
            { step: '03', title: 'Tools & Techniques', icon: 'Router', detail: 'Wireshark, firewalls and IDS/IPS platforms for packet-level analysis.' },
            { step: '04', title: 'Practical Labs', icon: 'FlaskConical', detail: 'Configure and defend a simulated corporate network in a live lab.' },
            { step: '05', title: 'Real Projects', icon: 'FolderGit2', detail: 'Design and secure a full network architecture end to end.' },
            { step: '06', title: 'Career Readiness', icon: 'BadgeCheck', detail: 'Present network hardening decisions the way a hiring manager expects.' },
        ],
        projects: [
            { name: 'Secure Network Architecture', oneLiner: 'Design a segmented network for a fictional company.', skills: ['Network Design', 'Segmentation'], tools: ['VLANs', 'Network diagrams'], demonstrates: 'Architecture-level security thinking.' },
            { name: 'Firewall Configuration Lab', oneLiner: 'Configure firewall rules to block simulated attacks.', skills: ['Rule Writing', 'Access Control'], tools: ['pfSense', 'iptables'], demonstrates: 'Hands-on firewall administration.' },
            { name: 'Network Monitoring Project', oneLiner: 'Set up continuous traffic monitoring and flag anomalies.', skills: ['Traffic Analysis', 'Anomaly Detection'], tools: ['Wireshark', 'SNMP tools'], demonstrates: 'Real-time network visibility skills.' },
            { name: 'Network Vulnerability Assessment', oneLiner: 'Scan a network for open ports and weak configurations.', skills: ['Vulnerability Scanning', 'Risk Ranking'], tools: ['Nmap', 'Nessus'], demonstrates: 'Structured network risk assessment.' },
        ],
        skills: ['Firewall Configuration', 'VPN Setup', 'Network Segmentation', 'IDS/IPS', 'Packet Analysis', 'Zero-Trust Fundamentals', 'Wireless Security', 'Traffic Monitoring'],
        outcomes: [
            { label: 'Understand', icon: 'BookOpen', detail: 'How networks are attacked and how defences map to them.' },
            { label: 'Perform', icon: 'Router', detail: 'Firewall, VPN and segmentation configuration.' },
            { label: 'Build', icon: 'FolderGit2', detail: 'A full secure network architecture.' },
            { label: 'Document', icon: 'FileText', detail: 'Network diagrams and hardening decisions.' },
            { label: 'Present', icon: 'Presentation', detail: 'Why your architecture is secure, in interviews.' },
            { label: 'Apply', icon: 'Briefcase', detail: 'Entry-level network security and SOC-adjacent work.' },
        ],
        careerRoles: ['Network Security Analyst', 'Security Analyst', 'SOC Analyst', 'Network Administrator (Security Focus)', 'IT Security Support Engineer'],
        salary: { fresher: '₹3 – 5 LPA', midLevel: '₹5 – 8.5 LPA', experienced: '₹8.5 – 15 LPA' },
        faqs: [
            { question: 'Is this Network Security course available for beginners in Hyderabad?', answer: `Yes. We teach networking fundamentals before securing anything, and both classroom and live-online batches run from our ${HYDERABAD_LOCATIONS} centres.` },
            { question: 'Do I need networking certifications like CCNA before joining?', answer: 'No — the course covers the networking concepts you need before introducing security controls on top of them.' },
            { question: 'What tools will I actually use in the labs?', answer: 'You will configure real tools including firewalls (pfSense/iptables), Wireshark for packet analysis, and vulnerability scanners like Nmap and Nessus.' },
            { question: 'How is this different from a general cyber security course?', answer: 'This specialisation goes deep on infrastructure-level defence — firewalls, VPNs, segmentation and monitoring — as one focused track inside the full 5-month Cyber Security programme.' },
            { question: 'Is job assistance included for Hyderabad-based learners?', answer: 'Yes, career guidance, interview preparation and placement support are part of the complete programme this specialisation belongs to.' },
        ],
    },

    'soc-threat-intelligence-course': {
        icon: 'Radar',
        tint: 'from-emerald-500 to-teal-500',
        metaTitle: 'SOC Analyst & Threat Intelligence Course in Hyderabad',
        metaDescription:
            'Train as a SOC analyst in Hyderabad — SIEM monitoring, alert triage, MITRE ATT&CK and threat intelligence in live labs. Part of our 5-month Cyber Security programme.',
        modules: [
            { step: '01', title: 'Fundamentals', icon: 'BookOpen', detail: 'The role of a SOC, the alert lifecycle, and why continuous monitoring matters.' },
            { step: '02', title: 'Core Skills', icon: 'Activity', detail: 'Log analysis, alert triage and severity classification.' },
            { step: '03', title: 'Tools & Techniques', icon: 'ScanSearch', detail: 'SIEM platforms, MITRE ATT&CK mapping and threat intelligence feeds.' },
            { step: '04', title: 'Practical Labs', icon: 'FlaskConical', detail: 'Investigate simulated alerts inside a live SIEM dashboard.' },
            { step: '05', title: 'Real Projects', icon: 'FolderGit2', detail: 'Run a full incident investigation from alert to closure.' },
            { step: '06', title: 'Career Readiness', icon: 'BadgeCheck', detail: 'Document and present investigations the way a SOC team lead expects.' },
        ],
        projects: [
            { name: 'SOC Monitoring Lab', oneLiner: 'Monitor live simulated traffic for suspicious activity.', skills: ['Monitoring', 'Triage'], tools: ['SIEM dashboard'], demonstrates: 'Real-time monitoring discipline.' },
            { name: 'Threat Detection Investigation', oneLiner: 'Trace a simulated attack from first alert to root cause.', skills: ['Investigation', 'Correlation'], tools: ['SIEM', 'MITRE ATT&CK'], demonstrates: 'End-to-end investigative thinking.' },
            { name: 'SIEM Alert Investigation', oneLiner: 'Triage a queue of alerts and separate real threats from noise.', skills: ['Alert Triage', 'Prioritisation'], tools: ['SIEM platform'], demonstrates: 'Practical day-one SOC analyst workflow.' },
            { name: 'Threat Intelligence Report', oneLiner: 'Research a threat actor or technique and brief the findings.', skills: ['Threat Research', 'Reporting'], tools: ['OSINT', 'ATT&CK Navigator'], demonstrates: 'Turning intel into actionable guidance.' },
        ],
        skills: ['SIEM Monitoring', 'Log Correlation', 'Alert Triage', 'Threat Intelligence', 'MITRE ATT&CK Mapping', 'Incident Escalation', 'Playbook Execution', 'Anomaly Detection'],
        outcomes: [
            { label: 'Understand', icon: 'BookOpen', detail: 'How a SOC monitors, triages and escalates threats.' },
            { label: 'Perform', icon: 'Activity', detail: 'Alert triage and investigation inside a SIEM.' },
            { label: 'Build', icon: 'FolderGit2', detail: 'A documented incident investigation.' },
            { label: 'Document', icon: 'FileText', detail: 'Threat intelligence and investigation reports.' },
            { label: 'Present', icon: 'Presentation', detail: 'Your investigation timeline to a team lead.' },
            { label: 'Apply', icon: 'Briefcase', detail: 'Entry-level SOC analyst (L1) responsibilities.' },
        ],
        careerRoles: ['SOC Analyst (L1)', 'Cyber Security Analyst', 'Threat Intelligence Analyst', 'Security Monitoring Analyst', 'Incident Response Trainee'],
        salary: { fresher: '₹3.5 – 5.5 LPA', midLevel: '₹5.5 – 9 LPA', experienced: '₹9 – 16 LPA' },
        faqs: [
            { question: 'Is this SOC Analyst course beginner-friendly for students in Hyderabad?', answer: `Yes. We teach the SOC analyst workflow from the ground up, with classroom and live-online batches available from our ${HYDERABAD_LOCATIONS} centres.` },
            { question: 'Which SIEM tools will I get hands-on practice with?', answer: 'You will practice log correlation, alert triage and investigation inside a live SIEM dashboard, alongside MITRE ATT&CK-based threat mapping.' },
            { question: 'What does a SOC analyst do on a typical day?', answer: 'Monitors alerts, triages them by severity, investigates suspicious activity and escalates real incidents — this course is built directly around that workflow.' },
            { question: 'Is this a good starting point for a cyber security career with no experience?', answer: 'Yes — SOC analyst (L1) roles are one of the most common entry points into cyber security, and this specialisation is built for exactly that transition.' },
            { question: 'Does Skill IT Education help with placements after this course?', answer: 'Yes, placement support, mock interviews and resume guidance are part of the full 5-month Cyber Security programme this specialisation belongs to.' },
        ],
    },

    'ai-in-cybersecurity-course': {
        icon: 'Brain',
        tint: 'from-indigo-500 to-purple-500',
        metaTitle: 'AI in Cybersecurity Course in Hyderabad | Threat Detection with AI',
        metaDescription:
            'Learn to apply AI to cyber security in Hyderabad — anomaly detection, phishing analysis and automated triage. Hands-on labs, part of our 5-month Cyber Security programme.',
        modules: [
            { step: '01', title: 'Fundamentals', icon: 'BookOpen', detail: 'Where AI genuinely fits into security operations, and where it does not.' },
            { step: '02', title: 'Core Skills', icon: 'Cpu', detail: 'Anomaly detection concepts and how ML models flag suspicious behaviour.' },
            { step: '03', title: 'Tools & Techniques', icon: 'Sparkles', detail: 'AI-assisted SOC tools, phishing detection models and automation scripting.' },
            { step: '04', title: 'Practical Labs', icon: 'FlaskConical', detail: 'Apply AI-assisted tools to real log and phishing datasets.' },
            { step: '05', title: 'Real Projects', icon: 'FolderGit2', detail: 'Build a working detection model and evaluate its accuracy.' },
            { step: '06', title: 'Career Readiness', icon: 'BadgeCheck', detail: 'Explain AI-driven findings clearly to a non-technical security team.' },
        ],
        projects: [
            { name: 'AI-Based Threat Detection', oneLiner: 'Train a basic model to flag anomalous network behaviour.', skills: ['Anomaly Detection', 'Data Prep'], tools: ['Python', 'scikit-learn'], demonstrates: 'Applying ML to a real security use case.' },
            { name: 'Security Log Analysis', oneLiner: 'Use AI-assisted tools to surface patterns across large log sets.', skills: ['Log Analysis', 'Pattern Recognition'], tools: ['Python', 'SIEM + AI plugin'], demonstrates: 'Handling security data at scale.' },
            { name: 'Phishing Detection Model', oneLiner: 'Build a classifier that flags likely phishing emails.', skills: ['Text Classification', 'Feature Engineering'], tools: ['Python', 'NLP libraries'], demonstrates: 'AI applied to a daily SOC pain point.' },
            { name: 'Automated Security Analysis', oneLiner: 'Automate a repetitive triage task using AI-assisted scripting.', skills: ['Automation', 'Workflow Design'], tools: ['Python', 'AI APIs'], demonstrates: 'Reducing manual SOC workload with AI.' },
        ],
        skills: ['Anomaly Detection', 'Phishing Analysis', 'Security Log Analysis', 'ML Model Basics', 'Automated Triage', 'Behavioural Analytics', 'AI-Assisted Investigation', 'AI Tool Evaluation'],
        outcomes: [
            { label: 'Understand', icon: 'BookOpen', detail: 'What AI can and cannot reliably do in security.' },
            { label: 'Perform', icon: 'Cpu', detail: 'Anomaly detection and AI-assisted log analysis.' },
            { label: 'Build', icon: 'FolderGit2', detail: 'A working phishing or threat detection model.' },
            { label: 'Document', icon: 'FileText', detail: 'Model accuracy and detection findings.' },
            { label: 'Present', icon: 'Presentation', detail: 'AI-driven findings to a non-technical audience.' },
            { label: 'Apply', icon: 'Briefcase', detail: 'Entry-level roles using AI-assisted security tooling.' },
        ],
        careerRoles: ['Security Analyst (AI-Assisted Tools)', 'SOC Analyst', 'Junior Threat Detection Analyst', 'Security Automation Analyst', 'Cyber Security Analyst'],
        salary: { fresher: '₹4 – 6 LPA', midLevel: '₹6 – 10 LPA', experienced: '₹10 – 18 LPA' },
        faqs: [
            { question: 'Do I need machine learning experience before this AI in Cybersecurity course?', answer: 'No — the course introduces the AI/ML concepts you need alongside their application to security use cases, taught in person and live-online from our Hyderabad centres.' },
            { question: 'Will I write actual code, or just use pre-built AI tools?', answer: 'Both. You will use AI-assisted security tools and also build simple models yourself in Python, including a phishing detection classifier.' },
            { question: 'Is AI replacing cyber security analysts?', answer: 'No — AI is increasingly used to assist analysts with detection and triage, not replace them. This course teaches you to use AI as a force-multiplier in a security role.' },
            { question: 'How does this fit into the full Cyber Security programme?', answer: 'It is one specialisation inside the 5-month Cyber Security programme, applying AI to the same detection and monitoring problems covered elsewhere in the course.' },
            { question: 'Is this course useful if I want to work in Hyderabad’s growing security + AI job market?', answer: 'Yes — AI-assisted security tooling is increasingly listed as a preferred skill by Hyderabad-based security teams, and this specialisation is built around exactly that overlap.' },
        ],
    },

    'mobile-application-security-course': {
        icon: 'Smartphone',
        tint: 'from-fuchsia-500 to-pink-500',
        metaTitle: 'Mobile & Application Security Course in Hyderabad | OWASP, API Testing',
        metaDescription:
            'Learn mobile app and API security testing in Hyderabad — OWASP Top 10, static/dynamic analysis and secure code review. Part of our 5-month Cyber Security programme.',
        modules: [
            { step: '01', title: 'Fundamentals', icon: 'BookOpen', detail: 'How mobile apps and APIs are structured, and where they typically get attacked.' },
            { step: '02', title: 'Core Skills', icon: 'ShieldAlert', detail: 'The OWASP Mobile and Web Top 10, and secure code review basics.' },
            { step: '03', title: 'Tools & Techniques', icon: 'ScanLine', detail: 'Static/dynamic analysis tools and API testing platforms.' },
            { step: '04', title: 'Practical Labs', icon: 'FlaskConical', detail: 'Test real Android apps and REST APIs in a controlled lab.' },
            { step: '05', title: 'Real Projects', icon: 'FolderGit2', detail: 'Run a full mobile and API security assessment end to end.' },
            { step: '06', title: 'Career Readiness', icon: 'BadgeCheck', detail: 'Turn findings into a developer-ready remediation report.' },
        ],
        projects: [
            { name: 'Mobile Application Security Assessment', oneLiner: 'Assess an Android app for storage, auth and communication flaws.', skills: ['Mobile Testing', 'Static/Dynamic Analysis'], tools: ['MobSF', 'ADB'], demonstrates: 'Practical mobile app security testing.' },
            { name: 'API Security Testing', oneLiner: 'Test a REST API for broken authentication and data exposure.', skills: ['API Testing', 'Auth Testing'], tools: ['Postman', 'Burp Suite'], demonstrates: 'API-layer security assessment skill.' },
            { name: 'OWASP-Based Security Assessment', oneLiner: 'Run a structured test against the OWASP Top 10 checklist.', skills: ['Methodology', 'Risk Rating'], tools: ['OWASP ZAP'], demonstrates: 'Industry-standard testing methodology.' },
            { name: 'Secure Application Review', oneLiner: 'Review application code and config for common security anti-patterns.', skills: ['Secure Code Review', 'Remediation'], tools: ['Static analysis tools'], demonstrates: 'Developer-facing security review skill.' },
        ],
        skills: ['OWASP Mobile Top 10', 'OWASP Web Top 10', 'Static Analysis', 'Dynamic Analysis', 'API Security Testing', 'Authentication Testing', 'Secure Code Review', 'Vulnerability Reporting'],
        outcomes: [
            { label: 'Understand', icon: 'BookOpen', detail: 'The most common mobile and API vulnerability classes.' },
            { label: 'Perform', icon: 'ScanLine', detail: 'Static and dynamic testing on real apps and APIs.' },
            { label: 'Build', icon: 'FolderGit2', detail: 'A full mobile + API security assessment.' },
            { label: 'Document', icon: 'FileText', detail: 'A developer-ready remediation report.' },
            { label: 'Present', icon: 'Presentation', detail: 'Your findings and OWASP-based methodology.' },
            { label: 'Apply', icon: 'Briefcase', detail: 'Entry-level application security testing work.' },
        ],
        careerRoles: ['Application Security Analyst', 'Mobile Security Analyst', 'Junior Security Tester', 'API Security Analyst', 'Cyber Security Analyst'],
        salary: { fresher: '₹3.5 – 5.5 LPA', midLevel: '₹5.5 – 9.5 LPA', experienced: '₹9.5 – 17 LPA' },
        faqs: [
            { question: 'Is this Mobile & Application Security course suitable for beginners in Hyderabad?', answer: `Yes. The course starts from how mobile apps and APIs are built before testing them, with classroom and live-online batches from our ${HYDERABAD_LOCATIONS} centres.` },
            { question: 'Do I need app development experience first?', answer: 'No — basic familiarity with how apps work is helpful, but the course teaches the testing methodology from the ground up.' },
            { question: 'Will I test real apps or only theory?', answer: 'You will run hands-on assessments on real Android apps and REST APIs using tools like MobSF, Burp Suite and OWASP ZAP.' },
            { question: 'How is this different from web application security?', answer: 'It covers both — mobile app-specific risks (storage, permissions) and the API layer behind most modern apps, using the OWASP Mobile and Web Top 10 as the shared framework.' },
            { question: 'Is placement support included for this specialisation?', answer: 'Yes, career guidance and placement support are part of the full 5-month Cyber Security programme this specialisation belongs to.' },
        ],
    },

    'digital-forensics-incident-response-course': {
        icon: 'FileSearch',
        tint: 'from-slate-600 to-slate-800',
        metaTitle: 'Digital Forensics & Incident Response (DFIR) Course in Hyderabad',
        metaDescription:
            'Learn digital forensics and incident response in Hyderabad — evidence handling, disk and memory forensics, and IR reporting. Part of our 5-month Cyber Security programme.',
        modules: [
            { step: '01', title: 'Fundamentals', icon: 'BookOpen', detail: 'Evidence types, chain of custody and the incident response lifecycle.' },
            { step: '02', title: 'Core Skills', icon: 'HardDrive', detail: 'Disk imaging, memory analysis and timeline reconstruction.' },
            { step: '03', title: 'Tools & Techniques', icon: 'Fingerprint', detail: 'Forensic imaging, memory analysis and log correlation tools.' },
            { step: '04', title: 'Practical Labs', icon: 'FlaskConical', detail: 'Investigate a simulated breach using real forensic artefacts.' },
            { step: '05', title: 'Real Projects', icon: 'FolderGit2', detail: 'Run a full incident response engagement from detection to report.' },
            { step: '06', title: 'Career Readiness', icon: 'BadgeCheck', detail: 'Present forensic findings to technical and non-technical stakeholders.' },
        ],
        projects: [
            { name: 'Digital Evidence Investigation', oneLiner: 'Collect and preserve evidence from a simulated compromised system.', skills: ['Evidence Handling', 'Imaging'], tools: ['FTK Imager', 'Write-blockers'], demonstrates: 'Forensically sound evidence collection.' },
            { name: 'Incident Investigation Case', oneLiner: 'Reconstruct the timeline of a simulated breach.', skills: ['Timeline Analysis', 'Correlation'], tools: ['Log analysis tools'], demonstrates: 'End-to-end incident reconstruction.' },
            { name: 'Disk/Memory Forensics Lab', oneLiner: 'Extract artefacts from disk and memory images.', skills: ['Disk Forensics', 'Memory Forensics'], tools: ['Autopsy', 'Volatility'], demonstrates: 'Core forensic analysis technique.' },
            { name: 'Incident Response Report', oneLiner: 'Write up findings for both technical and executive audiences.', skills: ['Reporting', 'Stakeholder Communication'], tools: ['Report templates'], demonstrates: 'Professional-grade IR documentation.' },
        ],
        skills: ['Evidence Handling', 'Chain of Custody', 'Disk Forensics', 'Memory Forensics', 'Log Correlation', 'Timeline Reconstruction', 'Incident Response Lifecycle', 'Forensic Reporting'],
        outcomes: [
            { label: 'Understand', icon: 'BookOpen', detail: 'The incident response lifecycle and evidence integrity rules.' },
            { label: 'Perform', icon: 'Fingerprint', detail: 'Disk and memory forensic analysis on real artefacts.' },
            { label: 'Build', icon: 'FolderGit2', detail: 'A reconstructed incident timeline and investigation case.' },
            { label: 'Document', icon: 'FileText', detail: 'A professional incident response report.' },
            { label: 'Present', icon: 'Presentation', detail: 'Findings to technical and executive stakeholders.' },
            { label: 'Apply', icon: 'Briefcase', detail: 'Entry-level DFIR and incident response work.' },
        ],
        careerRoles: ['DFIR Analyst Trainee', 'Incident Response Analyst', 'Digital Forensics Analyst', 'SOC Analyst', 'Cyber Security Analyst'],
        salary: { fresher: '₹3.5 – 6 LPA', midLevel: '₹6 – 10 LPA', experienced: '₹10 – 18 LPA' },
        faqs: [
            { question: 'Is this DFIR course suitable for beginners in Hyderabad?', answer: `Yes. The course starts from evidence-handling fundamentals before moving into forensic analysis, with classroom and live-online batches from our ${HYDERABAD_LOCATIONS} centres.` },
            { question: 'What forensic tools will I actually use?', answer: 'You will work with tools including FTK Imager, Autopsy and Volatility for disk and memory forensics, alongside log correlation tools for timeline reconstruction.' },
            { question: 'Is DFIR a good specialisation for someone who enjoys investigation-style work?', answer: 'Yes — if you like methodically reconstructing what happened from evidence, DFIR is one of the more investigative specialisations inside cyber security.' },
            { question: 'How does DFIR fit into the full Cyber Security programme?', answer: 'It is the incident-response-focused specialisation inside the 5-month programme, picking up after detection (covered in the SOC specialisation) to investigate and document what happened.' },
            { question: 'Does completing this course include placement support?', answer: 'Yes, placement support and interview preparation are part of the complete 5-month Cyber Security programme this specialisation belongs to.' },
        ],
    },
};

export const getCyberSecurityJourneyBySlug = (slug) => cyberSecurityJourneys[slug];
