// Per-module content for the visual "how this fits into the full AI & ML programme" section on
// each /courses/ai-ml/:subSlug page. Deliberately kept separate from coursesData.js's
// aiMlSubCourses (title/blurb/bullets used in the page header) — this file is the much larger
// dataset behind the module roadmap, projects, skills, outcomes, career roles, salary bands and
// FAQs, which genuinely differ per module. Sourced from the AI Engineering brochure.
//
// Mirrors cyberSecurityJourneys.js's shape exactly so both feed the same SpecializationJourney
// component. The four pedagogical-arc constants are shared design-system elements, not
// module-specific content — see journeyFlowConstants.js.
export {
    learningFlowStages,
    jobReadyProfileSteps,
    projectPresentationFlow,
    achievementSnapshotStages,
} from './journeyFlowConstants';

const HYDERABAD_LOCATIONS = 'Hyderabad, Madhapur, Hitech City and Gachibowli';

export const aiMlJourneys = {
    'python-technical-foundations-course': {
        icon: 'Terminal',
        tint: 'from-slate-600 to-slate-800',
        metaTitle: 'Python & Technical Foundations Course in Hyderabad | AI & ML',
        metaDescription:
            'Learn Python, Git and command-line fundamentals in Hyderabad — the foundation every AI engineering role assumes. Part of our AI & ML programme with live labs.',
        modules: [
            { step: '01', title: 'Fundamentals', icon: 'BookOpen', detail: 'Python syntax, data structures, control flow and why software fundamentals come before AI.' },
            { step: '02', title: 'Core Skills', icon: 'Code2', detail: 'Functions, object-oriented programming, error handling and writing resilient code.' },
            { step: '03', title: 'Tools & Techniques', icon: 'Terminal', detail: 'Git, GitHub, Linux command line, virtual environments and REST APIs.' },
            { step: '04', title: 'Practical Labs', icon: 'FlaskConical', detail: 'Write and debug real Python programs, then version-control them properly.' },
            { step: '05', title: 'Real Projects', icon: 'FolderGit2', detail: 'A Python application built on APIs, data pipelines and automation scripts.' },
            { step: '06', title: 'Career Readiness', icon: 'BadgeCheck', detail: 'A documented GitHub portfolio, ready to host every project in the programme.' },
        ],
        projects: [
            { name: 'Python AI Application', oneLiner: 'Build Python applications using APIs, data pipelines and automation scripts.', skills: ['Python', 'API Integration'], tools: ['Python', 'REST APIs'], demonstrates: 'Core software engineering fluency before any AI concept is introduced.' },
            { name: 'GitHub Portfolio Setup', oneLiner: 'Set up a documented GitHub repository ready to host every project ahead.', skills: ['Version Control', 'Documentation'], tools: ['Git', 'GitHub'], demonstrates: 'Professional development workflow from day one.' },
            { name: 'CLI Automation Script', oneLiner: 'Automate a repetitive task using the Linux command line and Python.', skills: ['Automation', 'Linux'], tools: ['Bash', 'Python'], demonstrates: 'Command-line fluency every engineering role assumes.' },
            { name: 'REST API Client', oneLiner: 'Call and parse a real REST API, handling errors gracefully.', skills: ['HTTP', 'Error Handling'], tools: ['Postman', 'Python'], demonstrates: 'The integration skill every later module builds on.' },
        ],
        skills: ['Python Programming', 'Object-Oriented Design', 'Git & GitHub', 'Linux CLI', 'REST APIs', 'JSON', 'Debugging', 'Virtual Environments'],
        outcomes: [
            { label: 'Understand', icon: 'BookOpen', detail: 'Python fundamentals and object-oriented design.' },
            { label: 'Perform', icon: 'Terminal', detail: 'Git, GitHub and Linux command-line workflows.' },
            { label: 'Build', icon: 'FolderGit2', detail: 'A working Python application that calls a real API.' },
            { label: 'Document', icon: 'FileText', detail: 'Clear technical documentation and a GitHub portfolio.' },
            { label: 'Present', icon: 'Presentation', detail: 'Your code and workflow choices in interviews.' },
            { label: 'Apply', icon: 'Briefcase', detail: 'A software foundation for every AI engineering module ahead.' },
        ],
        careerRoles: ['Python Developer (Trainee)', 'Backend Developer (Junior)', 'Software Engineer (Trainee)', 'AI Engineer — foundation track', 'Junior Developer'],
        salary: { fresher: '₹3.5 – 5.5 LPA', midLevel: '₹5.5 – 9 LPA', experienced: '₹9 – 16 LPA' },
        faqs: [
            { question: 'Is this Python & Technical Foundations course suitable for complete beginners in Hyderabad?', answer: `Yes. No prior coding experience is assumed — we start from Python syntax itself, with classroom and live-online batches from our ${HYDERABAD_LOCATIONS} centres.` },
            { question: 'Do I need a computer science degree to start this module?', answer: 'No. Graduates from mechanical, electrical, commerce and science backgrounds complete this module regularly. What matters is time to practise.' },
            { question: 'Will I get real hands-on coding practice, not just theory?', answer: 'Yes — every concept is paired with lab work, and the module closes with a Python application you build, version-control and document yourself.' },
            { question: 'How does this module connect to the full AI & ML programme?', answer: 'It is the foundation module inside the 8-month AI & ML programme — every later module, from backend development to Generative AI, assumes this Python and Git fluency.' },
            { question: 'Is placement support available after completing the full programme?', answer: 'Yes, career guidance, interview preparation and placement support are part of the complete AI & ML programme this module belongs to.' },
        ],
    },

    'python-backend-development-ai-course': {
        icon: 'Server',
        tint: 'from-blue-600 to-cyan-500',
        metaTitle: 'Python Backend Development with AI Course in Hyderabad | FastAPI',
        metaDescription:
            'Learn FastAPI, PostgreSQL and Docker in Hyderabad — build production-grade backend services for AI systems. Part of our AI & ML programme with live labs.',
        modules: [
            { step: '01', title: 'Fundamentals', icon: 'BookOpen', detail: 'Advanced Python and modular application architecture for real services.' },
            { step: '02', title: 'Core Skills', icon: 'Server', detail: 'FastAPI development, RESTful API design and authentication.' },
            { step: '03', title: 'Tools & Techniques', icon: 'Database', detail: 'PostgreSQL, MongoDB, Redis and Docker containerisation.' },
            { step: '04', title: 'Practical Labs', icon: 'FlaskConical', detail: 'Build, test and secure a real backend API against a live database.' },
            { step: '05', title: 'Real Projects', icon: 'FolderGit2', detail: 'A production-style backend service deployed with CI/CD.' },
            { step: '06', title: 'Career Readiness', icon: 'BadgeCheck', detail: 'Explain your API and deployment decisions like a working backend engineer.' },
        ],
        projects: [
            { name: 'Backend API Service', oneLiner: 'Build and deploy a secure, production-style REST API with FastAPI, PostgreSQL/MongoDB, authentication and Docker.', skills: ['API Design', 'Authentication'], tools: ['FastAPI', 'Docker'], demonstrates: 'The infrastructure layer every deployed AI feature runs on.' },
            { name: 'Database-Backed Service', oneLiner: 'Design and query a relational and a NoSQL database from the same service.', skills: ['PostgreSQL', 'MongoDB'], tools: ['SQL', 'MongoDB'], demonstrates: 'Practical database design decisions.' },
            { name: 'CI/CD Pipeline Setup', oneLiner: 'Automate testing and deployment for a backend service.', skills: ['CI/CD', 'Testing'], tools: ['GitHub Actions', 'Pytest'], demonstrates: 'Shipping code the way production teams do.' },
            { name: 'Background Job Queue', oneLiner: 'Offload slow work to a Redis-backed background queue.', skills: ['Async Processing', 'Redis'], tools: ['Redis', 'FastAPI'], demonstrates: 'Building services that stay responsive under load.' },
        ],
        skills: ['FastAPI', 'RESTful API Design', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'CI/CD', 'API Security'],
        outcomes: [
            { label: 'Understand', icon: 'BookOpen', detail: 'Modular backend architecture for AI-serving systems.' },
            { label: 'Perform', icon: 'Server', detail: 'FastAPI development with authentication and role-based access.' },
            { label: 'Build', icon: 'FolderGit2', detail: 'A secure, tested, containerised backend service.' },
            { label: 'Document', icon: 'FileText', detail: 'API documentation and deployment runbooks.' },
            { label: 'Present', icon: 'Presentation', detail: 'Your architecture and database choices in interviews.' },
            { label: 'Apply', icon: 'Briefcase', detail: 'Entry-level backend and API developer roles.' },
        ],
        careerRoles: ['Backend Developer', 'API Developer', 'Python Developer', 'Software Engineer', 'AI Engineer — backend track'],
        salary: { fresher: '₹4 – 6.5 LPA', midLevel: '₹6.5 – 11 LPA', experienced: '₹11 – 19 LPA' },
        faqs: [
            { question: 'Is this Python Backend Development course beginner-friendly in Hyderabad?', answer: `It builds directly on the Python Foundations module, with classroom and live-online batches from our ${HYDERABAD_LOCATIONS} centres. Basic Python is assumed.` },
            { question: 'Which backend framework does this module teach?', answer: 'FastAPI — the framework most widely used to serve AI and Machine Learning models in production today, alongside PostgreSQL, MongoDB and Redis.' },
            { question: 'Will I deploy real services, or just build them locally?', answer: 'You will containerise your service with Docker and deploy it with an automated CI/CD pipeline using GitHub Actions.' },
            { question: 'How does this module connect to the full AI & ML programme?', answer: 'It is the backend-engineering module inside the 8-month AI & ML programme — every AI and ML model built later needs to be served through a backend exactly like this.' },
            { question: 'Is job assistance included for Hyderabad-based learners?', answer: 'Yes, career guidance, interview preparation and placement support are part of the complete AI & ML programme this module belongs to.' },
        ],
    },

    'machine-learning-engineering-course': {
        icon: 'Brain',
        tint: 'from-emerald-500 to-teal-500',
        metaTitle: 'Machine Learning Engineering Course in Hyderabad | Scikit-learn, PyTorch',
        metaDescription:
            'Train, evaluate and deploy Machine Learning models in Hyderabad — Scikit-learn, PyTorch, MLflow and Docker. Part of our AI & ML programme with live labs.',
        modules: [
            { step: '01', title: 'Fundamentals', icon: 'BookOpen', detail: 'Machine learning fundamentals — supervised and unsupervised learning.' },
            { step: '02', title: 'Core Skills', icon: 'Brain', detail: 'Feature engineering, model training, evaluation and deep learning basics.' },
            { step: '03', title: 'Tools & Techniques', icon: 'Cpu', detail: 'Scikit-learn, PyTorch, MLflow and building end-to-end ML pipelines.' },
            { step: '04', title: 'Practical Labs', icon: 'FlaskConical', detail: 'Train and evaluate real models on genuine datasets, not toy examples.' },
            { step: '05', title: 'Real Projects', icon: 'FolderGit2', detail: 'A trained, served and monitored Machine Learning model.' },
            { step: '06', title: 'Career Readiness', icon: 'BadgeCheck', detail: 'Defend your model choices and metrics the way an ML engineer does.' },
        ],
        projects: [
            { name: 'Machine Learning Service', oneLiner: 'Train, evaluate and deploy Machine Learning models as production-ready services.', skills: ['Model Training', 'Evaluation'], tools: ['Scikit-learn', 'FastAPI'], demonstrates: 'The full ML engineering pipeline, not just a notebook.' },
            { name: 'Feature Engineering Pipeline', oneLiner: 'Build a repeatable feature engineering pipeline for a real dataset.', skills: ['Feature Engineering', 'Data Prep'], tools: ['Pandas', 'NumPy'], demonstrates: 'The unglamorous work that decides model quality.' },
            { name: 'Model Experiment Tracking', oneLiner: 'Track and compare multiple model experiments using MLflow.', skills: ['Experiment Tracking', 'Model Registry'], tools: ['MLflow'], demonstrates: 'Reproducible, auditable ML experimentation.' },
            { name: 'Deep Learning Baseline', oneLiner: 'Train a baseline neural network and compare it against classical ML.', skills: ['Deep Learning', 'PyTorch'], tools: ['PyTorch', 'Jupyter'], demonstrates: 'Judgement on when deep learning is actually warranted.' },
        ],
        skills: ['Supervised Learning', 'Unsupervised Learning', 'Feature Engineering', 'Model Evaluation', 'Deep Learning Basics', 'Scikit-learn', 'PyTorch', 'MLflow'],
        outcomes: [
            { label: 'Understand', icon: 'Brain', detail: 'How to develop, evaluate and package ML models correctly.' },
            { label: 'Perform', icon: 'Cpu', detail: 'Model training, evaluation and deep learning fundamentals.' },
            { label: 'Build', icon: 'FolderGit2', detail: 'A production-ready ML service end to end.' },
            { label: 'Document', icon: 'FileText', detail: 'Model evaluation reports and experiment logs.' },
            { label: 'Present', icon: 'Presentation', detail: 'Your metric choices and model trade-offs in interviews.' },
            { label: 'Apply', icon: 'Briefcase', detail: 'Entry-level Machine Learning engineering roles.' },
        ],
        careerRoles: ['Machine Learning Engineer', 'AI Engineer', 'Machine Learning Developer', 'MLOps Engineer — foundation track', 'Data Scientist (ML-focused)'],
        salary: { fresher: '₹4.5 – 7 LPA', midLevel: '₹7 – 12 LPA', experienced: '₹12 – 22 LPA' },
        faqs: [
            { question: 'Is this Machine Learning Engineering course suitable for beginners in Hyderabad?', answer: `It builds on the Python and backend modules, with classroom and live-online batches from our ${HYDERABAD_LOCATIONS} centres. Working Python is assumed.` },
            { question: 'Will I use both Scikit-learn and PyTorch?', answer: 'Yes — classical ML with Scikit-learn for structured data, and PyTorch for deep learning fundamentals, so you are not locked out of either half of the job market.' },
            { question: 'Do I need a maths background for this module?', answer: 'Basic statistics helps, but the module introduces the maths you need alongside its application, rather than as a separate prerequisite.' },
            { question: 'How does this module fit into the full AI & ML programme?', answer: 'It is the core Machine Learning module inside the 8-month programme, sitting between backend engineering and the Generative AI / Agentic AI modules that follow.' },
            { question: 'Is placement support included?', answer: 'Yes, career guidance, interview preparation and placement support are part of the complete AI & ML programme this module belongs to.' },
        ],
    },

    'generative-ai-llm-application-course': {
        icon: 'Sparkles',
        tint: 'from-indigo-500 to-purple-500',
        metaTitle: 'Generative AI & LLM Application Course in Hyderabad | RAG, LangChain',
        metaDescription:
            'Build LLM-powered applications in Hyderabad — prompt engineering, embeddings and Retrieval-Augmented Generation (RAG). Part of our AI & ML programme.',
        modules: [
            { step: '01', title: 'Fundamentals', icon: 'BookOpen', detail: 'Generative AI fundamentals and how large language models actually work.' },
            { step: '02', title: 'Core Skills', icon: 'Sparkles', detail: 'LLM APIs, prompt engineering and structured outputs.' },
            { step: '03', title: 'Tools & Techniques', icon: 'Search', detail: 'Embeddings, vector databases, document chunking and reranking.' },
            { step: '04', title: 'Practical Labs', icon: 'FlaskConical', detail: 'Build a document ingestion pipeline and query it with retrieval.' },
            { step: '05', title: 'Real Projects', icon: 'FolderGit2', detail: 'A full Retrieval-Augmented Generation (RAG) application.' },
            { step: '06', title: 'Career Readiness', icon: 'BadgeCheck', detail: 'Explain your retrieval and grounding choices like a GenAI engineer.' },
        ],
        projects: [
            { name: 'Generative AI / RAG Application', oneLiner: 'Build LLM-powered apps with RAG, vector search and document understanding.', skills: ['RAG', 'Vector Search'], tools: ['LangChain', 'pgvector'], demonstrates: 'A working, grounded LLM application, not a raw API call.' },
            { name: 'Prompt Engineering Library', oneLiner: 'Design and test a reusable library of structured prompts.', skills: ['Prompt Engineering', 'Structured Outputs'], tools: ['LLM APIs'], demonstrates: 'Treating prompting as engineering, not guesswork.' },
            { name: 'Document Q&A Assistant', oneLiner: 'Answer questions grounded in a real set of uploaded documents.', skills: ['RAG', 'Document Chunking'], tools: ['LangChain', 'Vector DBs'], demonstrates: 'Reducing hallucination with real retrieval.' },
            { name: 'RAG Evaluation Harness', oneLiner: 'Measure and improve retrieval quality with reranking.', skills: ['Evaluation', 'Reranking'], tools: ['Python', 'Vector DBs'], demonstrates: 'The discipline most GenAI courses skip entirely.' },
        ],
        skills: ['Prompt Engineering', 'LLM APIs', 'Embeddings', 'Vector Databases', 'RAG', 'LangChain', 'pgvector', 'RAG Evaluation'],
        outcomes: [
            { label: 'Understand', icon: 'Sparkles', detail: 'How LLMs, embeddings and context windows actually work.' },
            { label: 'Perform', icon: 'Search', detail: 'Prompt engineering, retrieval and reranking.' },
            { label: 'Build', icon: 'FolderGit2', detail: 'A full RAG application grounded in real documents.' },
            { label: 'Document', icon: 'FileText', detail: 'Retrieval architecture and evaluation results.' },
            { label: 'Present', icon: 'Presentation', detail: 'Your RAG design decisions in interviews.' },
            { label: 'Apply', icon: 'Briefcase', detail: 'Entry-level Generative AI and LLM application roles.' },
        ],
        careerRoles: ['Generative AI Engineer', 'GenAI Application Engineer', 'LLM Application Developer', 'AI Application Developer', 'Prompt Engineer'],
        salary: { fresher: '₹5 – 8 LPA', midLevel: '₹8 – 14 LPA', experienced: '₹14 – 24 LPA' },
        faqs: [
            { question: 'Is this Generative AI & LLM course suitable for beginners in Hyderabad?', answer: `It builds on the Machine Learning module, with classroom and live-online batches from our ${HYDERABAD_LOCATIONS} centres. Working Python is assumed.` },
            { question: 'Will I just call an API, or actually understand how LLMs work?', answer: 'Both — the module starts with how transformers, tokenisation and embeddings actually work, because prompting techniques change constantly while the mechanism underneath does not.' },
            { question: 'What is RAG, and why does this module spend so much time on it?', answer: 'Retrieval-Augmented Generation grounds an LLM’s answers in your own documents instead of its training data — it is the single most in-demand GenAI application pattern in production today.' },
            { question: 'How does this module fit into the full AI & ML programme?', answer: 'It is the Generative AI module inside the 8-month programme, sitting right before Agentic AI Engineering, which builds on the same LLM foundations.' },
            { question: 'Is placement support included?', answer: 'Yes, career guidance, interview preparation and placement support are part of the complete AI & ML programme this module belongs to.' },
        ],
    },

    'agentic-ai-engineering-course': {
        icon: 'Bot',
        tint: 'from-violet-600 to-fuchsia-500',
        metaTitle: 'Agentic AI Engineering Course in Hyderabad | LangGraph, MCP',
        metaDescription:
            'Build autonomous AI agents in Hyderabad — tool calling, multi-step workflows and the Model Context Protocol (MCP). Part of our AI & ML programme.',
        modules: [
            { step: '01', title: 'Fundamentals', icon: 'BookOpen', detail: 'AI agent fundamentals and architecture — what makes a system "agentic".' },
            { step: '02', title: 'Core Skills', icon: 'Bot', detail: 'Tool calling, state and memory management, multi-agent patterns.' },
            { step: '03', title: 'Tools & Techniques', icon: 'Workflow', detail: 'LangGraph, the Model Context Protocol (MCP) and agent routing.' },
            { step: '04', title: 'Practical Labs', icon: 'FlaskConical', detail: 'Build an agent that calls tools and maintains state across steps.' },
            { step: '05', title: 'Real Projects', icon: 'FolderGit2', detail: 'A multi-step AI agent that safely completes a real task.' },
            { step: '06', title: 'Career Readiness', icon: 'BadgeCheck', detail: 'Explain your agent’s guardrails and failure handling in interviews.' },
        ],
        projects: [
            { name: 'Agentic AI Application', oneLiner: 'Build intelligent agents that use tools, make decisions and execute multi-step tasks.', skills: ['Agent Design', 'Tool Calling'], tools: ['LangGraph', 'MCP'], demonstrates: 'An AI system that reasons and acts, not just answers.' },
            { name: 'Multi-Agent Workflow', oneLiner: 'Coordinate two or more agents on a shared task with handoffs.', skills: ['Multi-Agent Systems', 'Routing'], tools: ['LangGraph'], demonstrates: 'Orchestration beyond a single agent loop.' },
            { name: 'MCP Tool Integration', oneLiner: 'Connect an agent to external tools and data using the Model Context Protocol.', skills: ['MCP', 'Tool Integration'], tools: ['MCP', 'FastAPI'], demonstrates: 'The emerging standard for agent-to-tool connectivity.' },
            { name: 'Guardrailed Agent', oneLiner: 'Add retries, fallbacks and prompt-injection defence to an agent.', skills: ['Guardrails', 'Reliability'], tools: ['Python', 'LLM APIs'], demonstrates: 'Building agents that fail safely in production.' },
        ],
        skills: ['AI Agent Architecture', 'Tool Calling', 'State & Memory Management', 'LangGraph', 'Model Context Protocol', 'Multi-Agent Patterns', 'Guardrails', 'Agent Evaluation'],
        outcomes: [
            { label: 'Understand', icon: 'Bot', detail: 'What makes an AI system agentic, and where it can fail.' },
            { label: 'Perform', icon: 'Workflow', detail: 'Tool calling, routing and multi-step agent workflows.' },
            { label: 'Build', icon: 'FolderGit2', detail: 'A working agent that completes a real, multi-step task.' },
            { label: 'Document', icon: 'FileText', detail: 'Agent architecture, guardrails and evaluation results.' },
            { label: 'Present', icon: 'Presentation', detail: 'Your agent’s design and safety decisions in interviews.' },
            { label: 'Apply', icon: 'Briefcase', detail: 'Entry-level Agentic AI and AI automation roles.' },
        ],
        careerRoles: ['Agentic AI Engineer', 'AI Agent Developer', 'AI Automation Engineer', 'AI Workflow Developer', 'GenAI Application Engineer'],
        salary: { fresher: '₹5.5 – 9 LPA', midLevel: '₹9 – 15 LPA', experienced: '₹15 – 26 LPA' },
        faqs: [
            { question: 'Is this Agentic AI Engineering course beginner-friendly in Hyderabad?', answer: `It builds directly on the Generative AI & LLM module, with classroom and live-online batches from our ${HYDERABAD_LOCATIONS} centres.` },
            { question: 'What is the difference between this and the Generative AI module?', answer: 'Generative AI covers single-shot LLM applications like RAG. This module covers agents — systems that reason across multiple steps, call tools and maintain state autonomously.' },
            { question: 'What is MCP, and why does this module teach it?', answer: 'The Model Context Protocol is the emerging standard for connecting AI agents to external tools and data sources — increasingly listed as a required skill in AI engineering job postings.' },
            { question: 'How does this module fit into the full AI & ML programme?', answer: 'It is the agentic-AI module inside the 8-month programme, building directly on the LLM and RAG foundations from the Generative AI module before it.' },
            { question: 'Is placement support included?', answer: 'Yes, career guidance, interview preparation and placement support are part of the complete AI & ML programme this module belongs to.' },
        ],
    },

    'mlops-llmops-ai-platform-course': {
        icon: 'Cloud',
        tint: 'from-amber-500 to-orange-500',
        metaTitle: 'MLOps, LLMOps & AI Platform Engineering Course in Hyderabad',
        metaDescription:
            'Learn to operationalize AI systems in Hyderabad — experiment tracking, CI/CD, observability and cost control. Part of our AI & ML programme.',
        modules: [
            { step: '01', title: 'Fundamentals', icon: 'BookOpen', detail: 'Why a model that only works in a notebook isn’t a production AI system.' },
            { step: '02', title: 'Core Skills', icon: 'Activity', detail: 'Experiment tracking, model and prompt versioning, regression testing.' },
            { step: '03', title: 'Tools & Techniques', icon: 'Cloud', detail: 'MLflow, CI/CD pipelines, cloud IAM and observability tooling.' },
            { step: '04', title: 'Practical Labs', icon: 'FlaskConical', detail: 'Set up tracing and monitoring for a deployed AI system.' },
            { step: '05', title: 'Real Projects', icon: 'FolderGit2', detail: 'An AI platform operationalized end to end — versioned, tested and monitored.' },
            { step: '06', title: 'Career Readiness', icon: 'BadgeCheck', detail: 'Talk through cost, latency and reliability trade-offs like an MLOps engineer.' },
        ],
        projects: [
            { name: 'AI Platform Operationalization', oneLiner: 'Apply MLOps/LLMOps practices — versioning, CI/CD, observability — to an existing AI service.', skills: ['MLOps', 'Observability'], tools: ['MLflow', 'GitHub Actions'], demonstrates: 'Running AI in production, not just building it.' },
            { name: 'Experiment Tracking Dashboard', oneLiner: 'Track, compare and register multiple model versions.', skills: ['Experiment Tracking', 'Model Registry'], tools: ['MLflow'], demonstrates: 'Reproducibility discipline across a team.' },
            { name: 'AI Regression Test Suite', oneLiner: 'Catch quality drops in an AI/RAG system before they ship.', skills: ['Regression Testing', 'AI Evaluation'], tools: ['Pytest', 'Python'], demonstrates: 'Treating AI quality like a real engineering metric.' },
            { name: 'Cost & Latency Monitor', oneLiner: 'Track inference cost and latency for a deployed model.', skills: ['Cost Management', 'Monitoring'], tools: ['Cloud Platform', 'Monitoring Tools'], demonstrates: 'Owning the economics of a production AI system.' },
        ],
        skills: ['Experiment Tracking', 'Model & Prompt Versioning', 'CI/CD for AI', 'Observability', 'Cloud IAM', 'Cost & Latency Management', 'AI Security', 'Rollback Strategy'],
        outcomes: [
            { label: 'Understand', icon: 'Cloud', detail: 'What breaks when an AI system moves from notebook to production.' },
            { label: 'Perform', icon: 'Activity', detail: 'Experiment tracking, CI/CD and observability for AI systems.' },
            { label: 'Build', icon: 'FolderGit2', detail: 'A fully operationalized, monitored AI platform.' },
            { label: 'Document', icon: 'FileText', detail: 'Versioning history, test coverage and cost reports.' },
            { label: 'Present', icon: 'Presentation', detail: 'Your reliability and cost decisions in interviews.' },
            { label: 'Apply', icon: 'Briefcase', detail: 'Entry-level MLOps and AI platform engineering roles.' },
        ],
        careerRoles: ['MLOps Engineer', 'LLMOps Engineer', 'AI Platform Engineer', 'AI Infrastructure Engineer', 'DevOps Engineer (AI-focused)'],
        salary: { fresher: '₹5 – 8 LPA', midLevel: '₹8 – 14 LPA', experienced: '₹14 – 25 LPA' },
        faqs: [
            { question: 'Is this MLOps & LLMOps course beginner-friendly in Hyderabad?', answer: `It builds on the Machine Learning and Generative AI modules, with classroom and live-online batches from our ${HYDERABAD_LOCATIONS} centres.` },
            { question: 'What is the difference between MLOps and LLMOps?', answer: 'MLOps covers operationalizing classical ML models — training, versioning, deployment. LLMOps applies the same discipline to LLM and RAG systems, including prompt versioning and RAG-specific evaluation.' },
            { question: 'Will I work with real cloud platforms?', answer: 'Yes — you will configure cloud IAM, secrets management and monitoring on a real cloud platform, alongside MLflow for experiment tracking.' },
            { question: 'How does this module fit into the full AI & ML programme?', answer: 'It is the production-operations module inside the 8-month programme, taking the Machine Learning and Generative AI systems built earlier and making them reliable enough for real users.' },
            { question: 'Is placement support included?', answer: 'Yes, career guidance, interview preparation and placement support are part of the complete AI & ML programme this module belongs to.' },
        ],
    },

    'ai-solutions-engineering-course': {
        icon: 'Rocket',
        tint: 'from-rose-500 to-pink-500',
        metaTitle: 'AI Solutions Engineering Course in Hyderabad | Capstone Project',
        metaDescription:
            'Learn to scope, architect and deliver a complete AI solution in Hyderabad — from client discovery to live demonstration. Capstone module of our AI & ML programme.',
        modules: [
            { step: '01', title: 'Fundamentals', icon: 'BookOpen', detail: 'Client discovery, requirement gathering and workflow mapping.' },
            { step: '02', title: 'Core Skills', icon: 'Search', detail: 'AI solution architecture, data and system integration.' },
            { step: '03', title: 'Tools & Techniques', icon: 'Network', detail: 'API integration, security, PII handling and solution prototyping.' },
            { step: '04', title: 'Practical Labs', icon: 'FlaskConical', detail: 'Prototype a client-ready AI solution and run it through UAT.' },
            { step: '05', title: 'Real Projects', icon: 'FolderGit2', detail: 'A complete end-to-end AI solution, deployed and demonstrated live.' },
            { step: '06', title: 'Career Readiness', icon: 'BadgeCheck', detail: 'Present architecture diagrams and defend design decisions to stakeholders.' },
        ],
        projects: [
            { name: 'End-to-End AI Solution (Capstone)', oneLiner: 'Design and build a complete AI solution from requirements to deployment and live demonstration.', skills: ['Solution Architecture', 'Client Delivery'], tools: ['Python', 'Cloud Platform'], demonstrates: 'The full journey from client problem to shipped AI system.' },
            { name: 'Requirement-to-Architecture Brief', oneLiner: 'Turn a client discovery conversation into a technical architecture document.', skills: ['Requirement Gathering', 'Architecture Diagrams'], tools: ['Documentation'], demonstrates: 'The scoping skill most engineers are never taught.' },
            { name: 'Secure API Integration', oneLiner: 'Integrate a third-party API into a solution with proper PII handling.', skills: ['API Integration', 'Security'], tools: ['REST APIs', 'PostgreSQL'], demonstrates: 'Production-grade integration and data-handling discipline.' },
            { name: 'Client Demonstration', oneLiner: 'Present a finished solution live, the way a consultant would.', skills: ['Presentation', 'Stakeholder Communication'], tools: ['Architecture Diagrams'], demonstrates: 'The communication skill that closes real engagements.' },
        ],
        skills: ['Requirement Gathering', 'AI Solution Architecture', 'System & API Integration', 'Security & PII Handling', 'Solution Prototyping', 'UAT', 'Cost Estimation', 'Client Demonstrations'],
        outcomes: [
            { label: 'Understand', icon: 'Search', detail: 'How to scope an AI solution from a real client problem.' },
            { label: 'Perform', icon: 'Network', detail: 'System integration, security review and prototyping.' },
            { label: 'Build', icon: 'FolderGit2', detail: 'A complete, deployed, client-ready AI solution.' },
            { label: 'Document', icon: 'FileText', detail: 'Architecture diagrams and technical documentation.' },
            { label: 'Present', icon: 'Presentation', detail: 'Your solution live, to technical and non-technical stakeholders.' },
            { label: 'Apply', icon: 'Briefcase', detail: 'Entry-level AI solutions and implementation roles.' },
        ],
        careerRoles: ['AI Solutions Engineer', 'AI Integration Engineer', 'AI Implementation Engineer', 'AI Consultant', 'Technical Solutions Consultant'],
        salary: { fresher: '₹5.5 – 9 LPA', midLevel: '₹9 – 16 LPA', experienced: '₹16 – 28 LPA' },
        faqs: [
            { question: 'Is this AI Solutions Engineering course suitable for beginners in Hyderabad?', answer: `This is the capstone module of the AI & ML programme, so it assumes the six modules before it. Classroom and live-online batches run from our ${HYDERABAD_LOCATIONS} centres.` },
            { question: 'Is this just a portfolio project, or a real client-style engagement?', answer: 'It is run as a real client-style engagement — discovery, architecture, prototyping, UAT and a live demonstration — the same lifecycle a consulting AI engineer works through.' },
            { question: 'What makes this different from the earlier modules?', answer: 'Earlier modules build individual technical skills. This module teaches you to combine all of them — backend, ML, GenAI, agents and MLOps — into one coherent, client-ready solution.' },
            { question: 'How does this module conclude the full AI & ML programme?', answer: 'It is the final, capstone module of the 8-month programme, immediately followed by the 2-month real-time internship.' },
            { question: 'Is placement support included?', answer: 'Yes, career guidance, interview preparation and placement support are part of the complete AI & ML programme, including the internship phase after this module.' },
        ],
    },
};

export const getAiMlJourneyBySlug = (slug) => aiMlJourneys[slug];
