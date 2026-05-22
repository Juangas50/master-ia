import { useState, useEffect } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const BLOQUES = [
  {
    id: "B0", nombre: "PREPARACIÓN", periodo: "Jun – Ago 2026", semanas: "12 semanas",
    color: "#9B59B6", descripcion: "Base técnica antes de empezar",
    modulos: [
      {
        id: "P1", num: "PREP 1", titulo: "Git + GitHub", semanas: 4, periodo: "Junio 2026",
        objetivo: "Flujo completo: commit, branch, merge, PR sin ayuda.",
        teoria: [
          { item: "Fundamentos de control de versiones", recurso: "YouTube: 'Git for Everybody – freeCodeCamp'" },
          { item: "GitFlow vs GitHub Flow", recurso: "learngitbranching.js.org (interactivo)" },
          { item: "CI/CD conceptual", recurso: "docs.github.com/es" },
        ],
        practica: [
          "Subir el script fichar.py a un repo en GitHub con README",
          "Crear branch, modificar código y hacer PR hacia main",
          "Provocar y resolver un merge conflict a propósito",
          "Explorar un GitHub Action de ejemplo en un repo público",
        ],
        proyecto: "Repo personal en GitHub con al menos 3 proyectos organizados y documentados.",
        claude: "Te propongo ejercicios de Git, te explico los errores que te salgan y reviso tu flujo de trabajo.",
        checkpoint: "Haces clone → branch → commit → PR → merge sin mirar documentación.",
      },
      {
        id: "P2", num: "PREP 2", titulo: "Python OOP + APIs", semanas: 4, periodo: "Julio 2026",
        objetivo: "Escribir clases, consumir APIs con requests, servicio básico con FastAPI.",
        teoria: [
          { item: "Clases, herencia, encapsulamiento, polimorfismo", recurso: "YouTube: 'Python OOP – Corey Schafer' (8 episodios)" },
          { item: "REST APIs: GET, POST, headers, JSON", recurso: "docs.python-requests.org" },
          { item: "FastAPI: endpoints, Swagger UI, validación Pydantic", recurso: "fastapi.tiangolo.com/tutorial/" },
        ],
        practica: [
          "Reescribir fichar.py como clase con métodos y atributos",
          "Clase 'CampañaPrepago' con herencia: Recarga, Bienvenida, Retención",
          "Script que consume la API pública de Open-Meteo",
          "API FastAPI con 3 endpoints que simulen datos de la Nueva App Prepago",
        ],
        proyecto: "API REST funcional en local que expone métricas simuladas de una app prepago.",
        claude: "Reviso tu código línea a línea, te explico errores, propongo refactors y simulo ser el cliente de tu API.",
        checkpoint: "Tu API arranca, responde en Swagger UI y tiene al menos una clase con herencia.",
      },
      {
        id: "P3", num: "PREP 3", titulo: "Cloud + ML Conceptual", semanas: 4, periodo: "Agosto 2026",
        objetivo: "Vocabulario sólido de cloud e IA antes del día 1 del bloque técnico.",
        teoria: [
          { item: "VM vs contenedor, imagen Docker, Dockerfile", recurso: "YouTube: 'Docker in 100 Seconds – Fireship'" },
          { item: "AWS Cloud Practitioner Essentials (módulos 1-3)", recurso: "explore.skillbuilder.aws (gratuito)" },
          { item: "Supervisado, no supervisado, refuerzo – redes neuronales", recurso: "YouTube: '3Blue1Brown Neural Networks' (4 episodios)" },
        ],
        practica: [
          "Crear cuenta AWS free tier y explorar la consola",
          "Ver un Dockerfile de ejemplo y leer qué hace cada instrucción",
          "Identificar qué servicios AWS usa cada módulo del máster",
          "Simular 3 noches seguidas de 18:30-21:00 para validar el ritmo",
        ],
        proyecto: "Mapa conceptual propio: servicios AWS ↔ Azure ↔ qué módulo del máster los usa.",
        claude: "Te hago preguntas tipo quiz para validar que los conceptos están asentados.",
        checkpoint: "Puedes explicar qué es serverless, Docker, supervisado vs no supervisado sin leer notas.",
      },
    ],
  },
  {
    id: "B1", nombre: "INFRAESTRUCTURA", periodo: "Sep – Oct 2026", semanas: "8 semanas",
    color: "#E8521A", descripcion: "Código, contenedores y DevOps",
    modulos: [
      {
        id: "M1", num: "MÓDULO 1", titulo: "Git Avanzado + CI/CD", semanas: 2, periodo: "Sep sem 1-2",
        objetivo: "GitHub Actions funcional para un proyecto de IA.",
        teoria: [
          { item: "GitHub Actions: workflows, jobs, steps, triggers", recurso: "docs.github.com/actions" },
          { item: "Jenkins y GitLab CI: conceptos y diferencias", recurso: "jenkins.io/doc/book/getting-started/" },
          { item: "Pipelines CI/CD para modelos de ML", recurso: "neptune.ai blog: 'MLOps CI/CD Pipelines'" },
        ],
        practica: [
          "Workflow en GitHub Actions que ejecute tests de Python automáticamente",
          "Pipeline que lintea código con flake8 en cada push",
          "Step que construye imagen Docker automáticamente",
          "Badge de estado en el README",
        ],
        proyecto: "Repo con pipeline CI/CD completo: push → test → lint → build Docker.",
        claude: "Te ayudo a debuggear los YAML de Actions, te explico cada error de pipeline.",
        checkpoint: "Tienes un pipeline que se ejecuta solo en cada push y ves el resultado en GitHub.",
      },
      {
        id: "M2", num: "MÓDULO 2", titulo: "Python Avanzado para IA", semanas: 3, periodo: "Sep sem 3-5",
        objetivo: "Python de nivel producción: tipado, testing, async, librerías de datos.",
        teoria: [
          { item: "Type hints, dataclasses, Pydantic", recurso: "realpython.com/python-type-checking/" },
          { item: "Testing con pytest: unitarios, fixtures, mocks", recurso: "docs.pytest.org/en/stable/" },
          { item: "NumPy, Pandas, Matplotlib", recurso: "kaggle.com/learn/pandas (gratuito)" },
          { item: "Programación asíncrona con asyncio", recurso: "realpython.com/async-io-python/" },
        ],
        practica: [
          "Añadir type hints y tests pytest a tu API FastAPI",
          "Analizar dataset CSV de clientes prepago con Pandas (datos sintéticos)",
          "Visualización de DAU/MAU con Matplotlib replicando tu dashboard",
          "Endpoint async en FastAPI que simule una llamada a Adobe Analytics",
        ],
        proyecto: "Script de análisis de datos prepago: carga CSV, limpia, visualiza y exporta informe.",
        claude: "Reviso tu código, propongo refactors, pongo retos adicionales si avanzas rápido.",
        checkpoint: "Tu script analiza datos, tiene tests que pasan y usa type hints en todas las funciones.",
      },
      {
        id: "M3", num: "MÓDULO 3", titulo: "Docker + Kubernetes", semanas: 2, periodo: "Oct sem 1-2",
        objetivo: "Contenerizar una aplicación Python y desplegarla con Docker Compose.",
        teoria: [
          { item: "Dockerfile: instrucciones, capas, optimización", recurso: "YouTube: 'Docker Tutorial – TechWorld with Nana'" },
          { item: "Docker Compose: servicios, redes, volúmenes", recurso: "docs.docker.com/compose/" },
          { item: "Kubernetes: Pods, Deployments, Services", recurso: "kubernetes.io/docs/tutorials/kubernetes-basics/" },
        ],
        practica: [
          "Contenerizar tu API FastAPI con un Dockerfile propio",
          "Docker Compose con tu API + PostgreSQL",
          "Publicar imagen en Docker Hub",
          "Explorar Minikube: desplegar contenedor en cluster local",
        ],
        proyecto: "Stack completo en Docker Compose: API FastAPI + PostgreSQL + interfaz básica.",
        claude: "Te ayudo con los errores de Docker y revisamos el Dockerfile juntos.",
        checkpoint: "docker-compose up levanta todo tu stack y la API responde en localhost.",
      },
      {
        id: "M4", num: "MÓDULO 4", titulo: "DevOps Aplicado", semanas: 1, periodo: "Oct sem 3",
        objetivo: "Ciclo DevOps completo con monitoreo básico implementado.",
        teoria: [
          { item: "Cultura DevOps: principios, métricas DORA", recurso: "acceleratedevops.com" },
          { item: "Grafana + Prometheus: métricas y alertas", recurso: "grafana.com/docs/grafana/latest/getting-started/" },
          { item: "Logging estructurado en Python con loguru", recurso: "loguru.readthedocs.io" },
        ],
        practica: [
          "Logging estructurado en tu API FastAPI",
          "Grafana + Prometheus con Docker Compose",
          "Dashboard Grafana con peticiones por segundo a tu API",
          "Documentar el ciclo completo: dev → test → deploy → monitor",
        ],
        proyecto: "API FastAPI monitorizada con Grafana, logs estructurados y pipeline CI/CD activo.",
        claude: "Revisamos el stack completo, te explico qué métrica mirar primero.",
        checkpoint: "Tienes un dashboard Grafana mostrando métricas reales de tu API en local.",
      },
    ],
  },
  {
    id: "B2", nombre: "MACHINE LEARNING", periodo: "Nov 2026 – Ene 2027", semanas: "10 semanas",
    color: "#1A5CE8", descripcion: "ML clásico, Deep Learning y LLMs",
    modulos: [
      {
        id: "M5", num: "MÓDULO 5", titulo: "Machine Learning + Deep Learning", semanas: 6, periodo: "Nov – Dic 2026",
        objetivo: "Entrenar, evaluar y desplegar modelos con scikit-learn y PyTorch.",
        teoria: [
          { item: "Supervisado: regresión, clasificación, árboles, SVM, ensembles", recurso: "Libro: 'Hands-On ML' – Aurélien Géron (PDF legal en GitHub)" },
          { item: "No supervisado: K-means, DBSCAN, PCA, t-SNE", recurso: "scikit-learn.org/stable/user_guide.html" },
          { item: "Redes neuronales: perceptrón, backprop, activaciones", recurso: "YouTube: 'Neural Networks from Scratch – Sentdex'" },
          { item: "CNN, RNN, Embeddings", recurso: "pytorch.org/tutorials/ (tutorial oficial)" },
        ],
        practica: [
          "Clasificador de churn de clientes prepago (datos sintéticos)",
          "Clustering de usuarios por comportamiento de uso con K-means",
          "Red neuronal simple con PyTorch para clasificación binaria",
          "Pipeline completo: carga → preprocesa → entrena → evalúa → exporta",
        ],
        proyecto: "Modelo de churn prediction prepago con endpoint FastAPI que sirve predicciones.",
        claude: "Soy tu sparring: te explico por qué overfita, cómo interpretar la matriz de confusión.",
        checkpoint: "Tienes un modelo en producción local que recibe datos de cliente y devuelve probabilidad de churn.",
      },
      {
        id: "M6", num: "MÓDULO 6", titulo: "Large Language Models", semanas: 2, periodo: "Ene 2027 sem 1-2",
        objetivo: "Entender LLMs y usarlos programáticamente con APIs.",
        teoria: [
          { item: "Arquitectura Transformer: attention, encoder-decoder, tokens", recurso: "YouTube: 'Attention is All You Need – Yannic Kilcher'" },
          { item: "Fine-tuning vs prompt engineering vs RAG", recurso: "Blog: 'A Survey of LLMs – Hugging Face'" },
          { item: "APIs: OpenAI, Anthropic, Mistral – parámetros clave", recurso: "docs.anthropic.com / platform.openai.com/docs" },
        ],
        practica: [
          "Llamada a API de Claude/OpenAI desde Python con diferentes system prompts",
          "Comparar respuestas de distintos modelos al mismo prompt",
          "Implementar streaming de respuestas en FastAPI",
          "Chatbot básico con memoria de conversación",
        ],
        proyecto: "Chatbot de atención prepago: responde preguntas sobre tarifas, saldo y recarga.",
        claude: "Trabajo contigo como colega técnico. Comparamos prompts, analizamos outputs, debuggeamos APIs.",
        checkpoint: "Tu chatbot prepago funciona en local, mantiene contexto y responde con coherencia.",
      },
      {
        id: "M7", num: "MÓDULO 7", titulo: "Modelos de Generación de Imagen", semanas: 2, periodo: "Ene 2027 sem 3-4",
        objetivo: "Entender GANs y modelos de difusión. Fine-tuning básico con Hugging Face.",
        teoria: [
          { item: "GANs: generador vs discriminador, modo collapse", recurso: "YouTube: 'GANs from Scratch – Aladdin Persson'" },
          { item: "Modelos de difusión: DDPM, difusión latente", recurso: "Blog: 'The Illustrated Stable Diffusion – Jay Alammar'" },
          { item: "Hugging Face Diffusers: pipeline de generación", recurso: "huggingface.co/docs/diffusers/index" },
        ],
        practica: [
          "Explorar Stable Diffusion con diffusers de Hugging Face",
          "Generar imágenes con diferentes prompts y analizar parámetros",
          "Fine-tuning con LoRA en Google Colab (gratuito)",
          "Pipeline de banners para campañas prepago",
        ],
        proyecto: "Pipeline de generación de banners publicitarios para campañas prepago con Stable Diffusion.",
        claude: "Te explico la matemática de difusión a nivel conceptual y reviso tu código de Hugging Face.",
        checkpoint: "Generas imágenes custom desde Python con parámetros controlados.",
      },
    ],
  },
  {
    id: "B3", nombre: "IA GENERATIVA", periodo: "Feb – Mar 2027", semanas: "7 semanas",
    color: "#D4A017", descripcion: "Prompt Engineering, herramientas y bases vectoriales",
    modulos: [
      {
        id: "M8", num: "MÓDULO 8", titulo: "Prompt Engineering", semanas: 2, periodo: "Feb 2027 sem 1-2",
        objetivo: "Diseñar prompts que funcionen de forma consistente y medible.",
        teoria: [
          { item: "Estructura de un prompt: role, contexto, instrucción, formato, ejemplos", recurso: "learnprompting.org (guía gratuita completa)" },
          { item: "Técnicas: zero-shot, few-shot, chain-of-thought", recurso: "promptingguide.ai" },
          { item: "Evaluación de prompts: métricas, A/B testing", recurso: "Blog: 'Prompt Engineering Guide – DAIR.AI'" },
        ],
        practica: [
          "5 variantes del mismo prompt para el chatbot prepago y medir diferencias",
          "Chain-of-thought para que el chatbot razone antes de responder",
          "Sistema de few-shot examples dinámico",
          "Evaluación automática de calidad con otro LLM como juez",
        ],
        proyecto: "Librería de prompts documentada para casos de uso prepago: atención, ventas, retención.",
        claude: "Soy el campo de pruebas. Prueba tus prompts conmigo, analizamos qué falla y por qué.",
        checkpoint: "Tienes una librería de prompts versionada en GitHub con métricas de efectividad.",
      },
      {
        id: "M9", num: "MÓDULO 9", titulo: "Herramientas IA Generativa", semanas: 2, periodo: "Feb 2027 sem 3-4",
        objetivo: "Dominar las herramientas generativas más demandadas en entornos profesionales.",
        teoria: [
          { item: "GPT, Claude, Mistral, Gemini – diferencias y cuándo usar cada uno", recurso: "artificialanalysis.ai – benchmarks actualizados" },
          { item: "Generación de imagen: Midjourney, DALL-E, Stable Diffusion", recurso: "Documentación oficial de cada herramienta" },
          { item: "Audio/voz: ElevenLabs, Whisper – APIs y casos de uso", recurso: "platform.openai.com/docs/guides/speech-to-text" },
        ],
        practica: [
          "Pipeline que genera texto + imagen para campañas captación prepago",
          "Integrar Whisper en tu API para comandos de voz",
          "Automatizar generación de PowerPoints con python-pptx + IA",
          "Comparar 3 modelos para el mismo caso de uso y documentar",
        ],
        proyecto: "Suite generativa para marketing prepago: dado un briefing genera copy + imagen + PDF.",
        claude: "Te ayudo a elegir la herramienta correcta para cada caso y revisamos los códigos de integración.",
        checkpoint: "Pipeline funcional: briefing de campaña → copy + imagen + PDF automáticamente.",
      },
      {
        id: "M10", num: "MÓDULO 10", titulo: "Bases de Datos Vectoriales", semanas: 3, periodo: "Mar 2027",
        objetivo: "Implementar búsqueda semántica con embeddings y bases de datos vectoriales.",
        teoria: [
          { item: "Qué son los embeddings: representación vectorial del significado", recurso: "Blog: 'The Illustrated Word2Vec – Jay Alammar'" },
          { item: "Bases vectoriales: Pinecone, Chroma, Weaviate, Qdrant", recurso: "docs.trychroma.com" },
          { item: "Búsqueda por similitud: cosine similarity, ANN, HNSW", recurso: "pinecone.io/learn/vector-database/" },
        ],
        practica: [
          "Embeddings de FAQs de Vodafone Prepago con API de Anthropic/OpenAI",
          "Almacenar en ChromaDB y hacer búsqueda semántica",
          "Comparar búsqueda keyword vs semántica en el mismo dataset",
          "Medir latencia y relevancia con distintos parámetros",
        ],
        proyecto: "Motor de búsqueda semántica de FAQs prepago: encuentra respuesta relevante ante cualquier pregunta.",
        claude: "Te explico la geometría de los embeddings de forma intuitiva y analizamos los resultados juntos.",
        checkpoint: "Tu buscador devuelve resultados relevantes incluso con preguntas mal escritas o sinónimos.",
      },
    ],
  },
  {
    id: "B4", nombre: "CLOUD", periodo: "Abr – May 2027", semanas: "6 semanas",
    color: "#16A34A", descripcion: "AWS y Azure para proyectos de IA",
    modulos: [
      {
        id: "M11", num: "MÓDULO 11", titulo: "Cloud Computing con AWS", semanas: 3, periodo: "Abr 2027",
        objetivo: "Desplegar API y modelos en AWS con servicios serverless y gestionados.",
        teoria: [
          { item: "IAM, VPC, regiones: fundamentos de seguridad AWS", recurso: "AWS Skill Builder: 'AWS Cloud Practitioner Essentials' (completo)" },
          { item: "Lambda + API Gateway: arquitectura serverless", recurso: "docs.aws.amazon.com/lambda/" },
          { item: "S3: almacenamiento de modelos y datasets", recurso: "docs.aws.amazon.com/s3/" },
          { item: "AWS Bedrock: LLMs gestionados, playground, fine-tuning", recurso: "docs.aws.amazon.com/bedrock/" },
        ],
        practica: [
          "Desplegar API FastAPI en App Runner desde imagen en ECR",
          "Lambda que procesa evento S3 (llegada fichero → análisis)",
          "Cargar modelo de churn desde S3 en la Lambda",
          "CloudWatch: alertas y dashboards para la API desplegada",
        ],
        proyecto: "API de churn prediction en AWS: App Runner + S3 para modelos + CloudWatch para monitoreo.",
        claude: "Te ayudo a navegar la consola AWS, revisamos permisos IAM y debuggeamos despliegues.",
        checkpoint: "Tu API está accesible en URL pública de AWS y el modelo se carga desde S3.",
      },
      {
        id: "M12", num: "MÓDULO 12", titulo: "Cloud Computing con Azure", semanas: 3, periodo: "May 2027",
        objetivo: "Replicar arquitectura AWS en Azure y entender equivalencias entre plataformas.",
        teoria: [
          { item: "Azure Resource Groups, subscriptions, ARM", recurso: "learn.microsoft.com/azure (Microsoft Learn, gratuito)" },
          { item: "Azure Functions: equivalente a Lambda", recurso: "docs.microsoft.com/azure/azure-functions/" },
          { item: "Azure OpenAI Service: GPT-4, embeddings, fine-tuning", recurso: "azure.microsoft.com/products/ai-services/openai-service" },
        ],
        practica: [
          "Desplegar la misma API FastAPI en Azure App Service",
          "Azure Function que replica la Lambda de AWS",
          "Integrar Azure OpenAI en tu chatbot prepago",
          "Comparar costes estimados: misma arquitectura en AWS vs Azure",
        ],
        proyecto: "Arquitectura multi-cloud: chatbot prepago funciona en AWS y Azure con cambio mínimo de config.",
        claude: "Te ayudo a mapear cada servicio AWS → Azure y revisamos las diferencias reales.",
        checkpoint: "Misma aplicación desplegada en ambos clouds. Sabes cuándo elegirías uno u otro.",
      },
    ],
  },
  {
    id: "B5", nombre: "IA AVANZADA", periodo: "Jun 2027", semanas: "4 semanas",
    color: "#C0392B", descripcion: "IA clásica, arquitecturas complejas y ética",
    modulos: [
      {
        id: "M13", num: "MÓDULO 13", titulo: "Herramientas de IA Clásica", semanas: 1, periodo: "Jun 2027 sem 1",
        objetivo: "Dominar herramientas de IA pre-LLM que siguen siendo estándar en producción.",
        teoria: [
          { item: "Dialogflow: intents, entities, fulfillment, webhooks", recurso: "cloud.google.com/dialogflow/docs" },
          { item: "OCR: Tesseract y Google Vision API", recurso: "github.com/tesseract-ocr/tesseract" },
          { item: "Whisper STT + ElevenLabs TTS", recurso: "openai.com/research/whisper" },
          { item: "Regex avanzado para NLP", recurso: "regexone.com + realpython.com/regex-python/" },
        ],
        practica: [
          "Agente Dialogflow para gestión de consultas de saldo prepago",
          "Script OCR que extrae datos de una factura en imagen",
          "Transcriptor de audio con Whisper + resumen con LLM",
          "Extracción de MSISDNs e ICCIDs de textos con Regex",
        ],
        proyecto: "Pipeline: imagen → OCR → extracción datos con Regex → LLM para resumen.",
        claude: "Revisamos las expresiones regulares paso a paso y te ayudo a integrar Dialogflow con tu stack.",
        checkpoint: "Pipeline funcional que procesa un documento físico y extrae datos estructurados.",
      },
      {
        id: "M14", num: "MÓDULO 14", titulo: "Arquitecturas con IA", semanas: 2, periodo: "Jun 2027 sem 2-3",
        objetivo: "Diseñar sistemas complejos: RAG, agentes, chatbots multiturno, voicebots.",
        teoria: [
          { item: "RAG completo: arquitectura, cuándo usarlo vs fine-tuning", recurso: "Blog: 'RAG vs Fine-tuning – Towards Data Science'" },
          { item: "LangChain: chains, agents, tools, memory", recurso: "python.langchain.com/docs/get_started/" },
          { item: "Agentes autónomos: ReAct, function calling", recurso: "Blog: 'Building LLM Agents – Lilian Weng (OpenAI)'" },
        ],
        practica: [
          "Sistema RAG: PDF de condiciones tarifas prepago → embeddings → respuestas precisas",
          "Agente LangChain: consulta saldo, hace recarga y crea ticket",
          "Chatbot multiturno con memoria persistente",
          "Arquitectura voicebot: audio → Whisper → LLM → TTS → respuesta",
        ],
        proyecto: "Asistente Vodafone Prepago con RAG + agente + voz: atiende, consulta saldo y escala a humano.",
        claude: "Trabajamos como arquitectos juntos. Propongo la arquitectura, tú la implementas, yo la critico.",
        checkpoint: "Tu asistente responde de documentos reales, recuerda contexto y llama a herramientas externas.",
      },
      {
        id: "M15", num: "MÓDULO 15", titulo: "Legislación y Ética en IA", semanas: 1, periodo: "Jun 2027 sem 4",
        objetivo: "Marco regulatorio europeo y principios éticos aplicados a tus proyectos.",
        teoria: [
          { item: "EU AI Act: categorías de riesgo, obligaciones, plazos", recurso: "artificialintelligenceact.eu" },
          { item: "GDPR aplicado a IA: datos personales, consentimiento", recurso: "gdpr.eu/what-is-gdpr/" },
          { item: "Sesgos: tipos, cómo detectarlos, LIME y SHAP", recurso: "shap.readthedocs.io" },
        ],
        practica: [
          "Auditar modelo de churn: detectar sesgo por tipo de cliente o tarifa",
          "Aplicar SHAP para explicar features más influyentes en churn",
          "Clasificar proyectos del máster según nivel de riesgo AI Act",
          "Redactar política de uso responsable de IA para un caso prepago",
        ],
        proyecto: "Informe de auditoría ética del modelo de churn: sesgo, explicabilidad y cumplimiento AI Act.",
        claude: "Debatimos los dilemas éticos reales en telco: scoring, segmentación, personalización vs privacidad.",
        checkpoint: "Puedes clasificar cualquier sistema IA según el AI Act y explicar sus obligaciones.",
      },
    ],
  },
];

const PROYECTO_FINAL = {
  id: "PFM", num: "PFM", titulo: "Proyecto Júpiter", semanas: 6, periodo: "Jul – Ago 2027",
  objetivo: "Solución completa de IA aplicada a telco prepago. Desplegada, documentada y demostrable.",
  teoria: [{ item: "Revisión de arquitecturas vistas en el máster", recurso: "Tu propio portfolio en GitHub" }],
  practica: [
    "Sem 1-2: Definir problema, proponer arquitectura, validar con Claude",
    "Sem 3-4: Implementar el sistema completo: modelo + API + cloud + frontend",
    "Sem 5: Tests de integración, documentación, README, diagrama de arquitectura",
    "Sem 6: Demo grabada + presentación ejecutiva de 10 slides",
  ],
  proyecto: "Sistema completo desplegado en AWS/Azure con documentación técnica y demo pública.",
  claude: "Soy tu jurado, tu arquitecto y tu revisor. Esto es el examen final de todo lo aprendido.",
  checkpoint: "Demo grabada de 5 min funcionando + código público en GitHub + presentación de 10 slides.",
};

const ALL_MODULOS = [
  ...BLOQUES.flatMap(b => b.modulos.map(m => ({ ...m, bloqueColor: b.color, bloqueNombre: b.nombre }))),
  { ...PROYECTO_FINAL, bloqueColor: "#8B5CF6", bloqueNombre: "PROYECTO FINAL" },
];

// ─── STORAGE (localStorage) ───────────────────────────────────────────────────

function saveProgress(p) { try { localStorage.setItem("master-progress", JSON.stringify(p)); } catch (_) {} }
function loadProgress() { try { const r = localStorage.getItem("master-progress"); return r ? JSON.parse(r) : {}; } catch (_) { return {}; } }
function saveNotes(n) { try { localStorage.setItem("master-notes", JSON.stringify(n)); } catch (_) {} }
function loadNotes() { try { const r = localStorage.getItem("master-notes"); return r ? JSON.parse(r) : {}; } catch (_) { return {}; } }
function saveLog(l) { try { localStorage.setItem("master-log", JSON.stringify(l)); } catch (_) {} }
function loadLog() { try { const r = localStorage.getItem("master-log"); return r ? JSON.parse(r) : []; } catch (_) { return []; } }

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function MasterIA() {
  const [view, setView] = useState("dashboard");
  const [activeBloque, setActiveBloque] = useState(null);
  const [activeModulo, setActiveModulo] = useState(null);
  const [progress, setProgress] = useState(() => loadProgress());
  const [notes, setNotes] = useState(() => loadNotes());
  const [studyLog, setStudyLog] = useState(() => loadLog());
  const [noteInput, setNoteInput] = useState("");
  const [logInput, setLogInput] = useState("");

  const totalModulos = ALL_MODULOS.length;
  const completedModulos = Object.values(progress).filter(Boolean).length;
  const pct = Math.round((completedModulos / totalModulos) * 100);

  function toggleComplete(id) {
    const newP = { ...progress, [id]: !progress[id] };
    setProgress(newP);
    saveProgress(newP);
    if (!progress[id]) {
      const mod = ALL_MODULOS.find(m => m.id === id);
      const newLog = [{ date: new Date().toLocaleDateString("es-ES"), text: `✅ Completado: ${mod?.titulo}` }, ...studyLog].slice(0, 50);
      setStudyLog(newLog);
      saveLog(newLog);
    }
  }

  function addNote(id) {
    if (!noteInput.trim()) return;
    const newNotes = { ...notes, [id]: [...(notes[id] || []), { date: new Date().toLocaleDateString("es-ES"), text: noteInput.trim() }] };
    setNotes(newNotes);
    setNoteInput("");
    saveNotes(newNotes);
  }

  function addLog() {
    if (!logInput.trim()) return;
    const newLog = [{ date: new Date().toLocaleDateString("es-ES"), text: logInput.trim() }, ...studyLog].slice(0, 50);
    setStudyLog(newLog);
    setLogInput("");
    saveLog(newLog);
  }

  const s = {
    page: { minHeight: "100vh", background: "#080808", color: "#E0DBD0", fontFamily: "'Georgia', serif" },
    hdr: { background: "#0F0F0F", borderBottom: "1px solid #1A1A1A", padding: "24px 24px 20px" },
    wrap: { maxWidth: 860, margin: "0 auto" },
    pad: { padding: "24px 24px 80px" },
    nav: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 28 },
    nb: (a) => ({ background: a ? "#E0DBD0" : "#141414", color: a ? "#080808" : "#777", border: `1px solid ${a ? "#E0DBD0" : "#222"}`, borderRadius: 5, padding: "7px 14px", cursor: "pointer", fontSize: 11, fontFamily: "monospace", letterSpacing: "0.1em", textTransform: "uppercase" }),
    card: (bc) => ({ background: "#0F0F0F", border: `1px solid ${bc ? bc + "40" : "#1A1A1A"}`, borderLeft: bc ? `3px solid ${bc}` : "1px solid #1A1A1A", borderRadius: 8, padding: "20px 24px", marginBottom: 12 }),
    tag: (c) => ({ display: "inline-block", background: c + "20", border: `1px solid ${c}44`, color: c, borderRadius: 4, padding: "2px 10px", fontSize: 11, fontFamily: "monospace" }),
    lbl: { fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#555", fontFamily: "monospace", marginBottom: 10 },
    h2: { fontSize: 20, fontWeight: "normal", margin: "0 0 4px", color: "#F0EBE0" },
    back: { background: "none", border: "1px solid #222", borderRadius: 5, padding: "7px 14px", color: "#888", cursor: "pointer", fontSize: 11, fontFamily: "monospace", marginBottom: 24 },
    inp: { background: "#141414", border: "1px solid #252525", borderRadius: 6, padding: "10px 14px", color: "#E0DBD0", fontSize: 13, fontFamily: "Georgia, serif", width: "100%", boxSizing: "border-box", resize: "vertical", minHeight: 70 },
    btn: (c) => ({ background: c ? c + "22" : "#1A1A1A", border: `1px solid ${c ? c + "66" : "#2A2A2A"}`, borderRadius: 5, padding: "8px 16px", color: c || "#AAA", cursor: "pointer", fontSize: 12, fontFamily: "monospace" }),
    dot: (c) => ({ width: 6, height: 6, borderRadius: "50%", background: c || "#444", marginTop: 7, flexShrink: 0 }),
    row: { display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" },
  };

  // MÓDULO DETALLE
  if (view === "modulo" && activeModulo) {
    const c = activeModulo.bloqueColor;
    const done = progress[activeModulo.id];
    const modNotes = notes[activeModulo.id] || [];
    return (
      <div style={s.page}>
        <div style={s.hdr}><div style={s.wrap}>
          <div style={{ fontSize: 10, fontFamily: "monospace", color: c, letterSpacing: "0.15em", marginBottom: 4 }}>{activeModulo.num} · {activeModulo.periodo}</div>
          <h1 style={{ fontSize: 24, fontWeight: "normal", margin: "0 0 4px", color: "#F0EBE0" }}>{activeModulo.titulo}</h1>
          <div style={{ color: "#777", fontSize: 13 }}>{activeModulo.objetivo}</div>
        </div></div>
        <div style={{ ...s.wrap, ...s.pad }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
            <button style={s.back} onClick={() => activeBloque ? setView("bloque") : setView("overview")}>← Volver</button>
            <button onClick={() => toggleComplete(activeModulo.id)} style={s.btn(done ? "#16A34A" : null)}>
              {done ? "✅ Completado" : "○ Marcar completado"}
            </button>
          </div>
          <div style={s.card(null)}>
            <div style={s.lbl}>📖 Teoría — qué estudiar</div>
            {activeModulo.teoria.map((t, i) => (
              <div key={i} style={{ marginBottom: 12, ...s.row }}>
                <div style={s.dot(c)} />
                <div>
                  <div style={{ fontSize: 14, color: "#DDD", marginBottom: 2 }}>{t.item}</div>
                  <div style={{ fontSize: 12, color: "#666", fontFamily: "monospace" }}>{t.recurso}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={s.card(null)}>
            <div style={s.lbl}>💻 Práctica — qué construir</div>
            {activeModulo.practica.map((p, i) => (
              <div key={i} style={s.row}>
                <div style={{ width: 18, height: 18, border: `1px solid ${c}55`, borderRadius: 3, flexShrink: 0, marginTop: 2 }} />
                <div style={{ fontSize: 14, color: "#CCC", lineHeight: 1.5 }}>{p}</div>
              </div>
            ))}
          </div>
          <div style={{ ...s.card(c), background: c + "08" }}>
            <div style={{ fontSize: 10, fontFamily: "monospace", color: c, letterSpacing: "0.15em", marginBottom: 8 }}>🏗️ PROYECTO DEL MÓDULO</div>
            <div style={{ fontSize: 14, color: "#DDD", lineHeight: 1.6 }}>{activeModulo.proyecto}</div>
          </div>
          <div style={s.card(null)}>
            <div style={s.lbl}>🤖 Cómo trabajo contigo en este módulo</div>
            <div style={{ fontSize: 14, color: "#999", lineHeight: 1.7, fontStyle: "italic" }}>"{activeModulo.claude}"</div>
          </div>
          <div style={{ ...s.card(null), borderLeft: `3px solid ${c}` }}>
            <div style={s.lbl}>✅ Checkpoint — no avanzas sin esto</div>
            <div style={{ fontSize: 14, color: "#DDD", lineHeight: 1.6 }}>"{activeModulo.checkpoint}"</div>
          </div>
          <div style={s.card(null)}>
            <div style={s.lbl}>📝 Mis notas</div>
            {modNotes.map((n, i) => (
              <div key={i} style={{ background: "#141414", borderRadius: 5, padding: "10px 14px", marginBottom: 8, fontSize: 13, color: "#CCC" }}>
                <span style={{ color: "#555", fontFamily: "monospace", fontSize: 11, marginRight: 8 }}>{n.date}</span>{n.text}
              </div>
            ))}
            <textarea style={s.inp} placeholder="Escribe una nota, duda o aprendizaje..." value={noteInput} onChange={e => setNoteInput(e.target.value)} />
            <button style={{ ...s.btn(c), marginTop: 8 }} onClick={() => addNote(activeModulo.id)}>Guardar nota</button>
          </div>
        </div>
      </div>
    );
  }

  // BLOQUE
  if (view === "bloque" && activeBloque) return (
    <div style={s.page}>
      <div style={s.hdr}><div style={s.wrap}>
        <div style={{ fontSize: 10, fontFamily: "monospace", color: activeBloque.color, letterSpacing: "0.15em", marginBottom: 4 }}>{activeBloque.id} · {activeBloque.periodo}</div>
        <h1 style={{ fontSize: 24, fontWeight: "normal", margin: 0, color: "#F0EBE0" }}>{activeBloque.nombre}</h1>
      </div></div>
      <div style={{ ...s.wrap, ...s.pad }}>
        <button style={s.back} onClick={() => setView("overview")}>← Volver</button>
        {activeBloque.modulos.map(mod => (
          <div key={mod.id} style={{ ...s.card(activeBloque.color), cursor: "pointer" }}
            onClick={() => { setActiveModulo({ ...mod, bloqueColor: activeBloque.color }); setView("modulo"); }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, fontFamily: "monospace", color: activeBloque.color, letterSpacing: "0.12em", marginBottom: 4 }}>{mod.num} · {mod.periodo}</div>
                <h2 style={s.h2}>{progress[mod.id] ? "✅ " : ""}{mod.titulo}</h2>
                <div style={{ fontSize: 13, color: "#777", marginTop: 3 }}>{mod.objetivo}</div>
              </div>
              <span style={s.tag(activeBloque.color)}>{mod.semanas} sem</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // OVERVIEW
  if (view === "overview") return (
    <div style={s.page}>
      <div style={s.hdr}><div style={s.wrap}>
        <h1 style={{ fontSize: 26, fontWeight: "normal", margin: "0 0 4px", color: "#F0EBE0" }}>Todos los módulos</h1>
        <div style={{ color: "#666", fontSize: 13 }}>6 bloques · 15 módulos · 1 proyecto final</div>
      </div></div>
      <div style={{ ...s.wrap, ...s.pad }}>
        <div style={s.nav}>
          {["dashboard","overview","log"].map(v => <button key={v} style={s.nb(view===v)} onClick={() => setView(v)}>{v==="dashboard"?"Mi progreso":v==="overview"?"Módulos":"Diario"}</button>)}
        </div>
        {BLOQUES.map(b => (
          <div key={b.id} style={{ ...s.card(b.color), cursor: "pointer" }} onClick={() => { setActiveBloque(b); setView("bloque"); }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: 10, fontFamily: "monospace", color: b.color, letterSpacing: "0.12em", marginBottom: 4 }}>{b.id} · {b.periodo}</div>
                <h2 style={s.h2}>{b.nombre}</h2>
                <div style={{ fontSize: 13, color: "#777" }}>{b.descripcion}</div>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <span style={s.tag(b.color)}>{b.semanas}</span>
                <span style={s.tag("#555")}>{b.modulos.filter(m=>progress[m.id]).length}/{b.modulos.length}</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 6, marginTop: 14, flexWrap: "wrap" }}>
              {b.modulos.map(m => (
                <div key={m.id} style={{ background: progress[m.id] ? b.color+"30" : "#141414", border: `1px solid ${progress[m.id] ? b.color+"66" : "#1F1F1F"}`, borderRadius: 4, padding: "4px 10px", fontSize: 11, color: progress[m.id] ? b.color : "#666", fontFamily: "monospace" }}>
                  {progress[m.id]?"✓ ":""}{m.titulo}
                </div>
              ))}
            </div>
          </div>
        ))}
        <div style={{ ...s.card("#8B5CF6"), cursor: "pointer" }} onClick={() => { setActiveModulo({...PROYECTO_FINAL, bloqueColor:"#8B5CF6"}); setActiveBloque(null); setView("modulo"); }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
            <div>
              <div style={{ fontSize: 10, fontFamily: "monospace", color: "#8B5CF6", letterSpacing: "0.12em", marginBottom: 4 }}>PFM · {PROYECTO_FINAL.periodo}</div>
              <h2 style={s.h2}>{progress[PROYECTO_FINAL.id]?"✅ ":""}{PROYECTO_FINAL.titulo}</h2>
              <div style={{ fontSize: 13, color: "#777" }}>{PROYECTO_FINAL.objetivo}</div>
            </div>
            <span style={s.tag("#8B5CF6")}>{PROYECTO_FINAL.semanas} sem</span>
          </div>
        </div>
      </div>
    </div>
  );

  // DASHBOARD
  if (view === "dashboard") return (
    <div style={s.page}>
      <div style={s.hdr}><div style={s.wrap}>
        <div style={{ fontSize: 10, fontFamily: "monospace", color: "#555", letterSpacing: "0.2em", marginBottom: 6 }}>MÁSTER IA · AUTOGUIADO CON CLAUDE</div>
        <h1 style={{ fontSize: 28, fontWeight: "normal", margin: "0 0 4px", color: "#F0EBE0" }}>Mi progreso</h1>
        <div style={{ fontSize: 13, color: "#666" }}>{completedModulos} de {totalModulos} módulos completados</div>
      </div></div>
      <div style={{ ...s.wrap, ...s.pad }}>
        <div style={s.nav}>
          {["dashboard","overview","log"].map(v => <button key={v} style={s.nb(view===v)} onClick={() => setView(v)}>{v==="dashboard"?"Mi progreso":v==="overview"?"Módulos":"Diario"}</button>)}
        </div>
        <div style={s.card(null)}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <span style={{ fontSize: 13, color: "#AAA" }}>Progreso total</span>
            <span style={{ fontSize: 22, color: "#F0EBE0" }}>{pct}%</span>
          </div>
          <div style={{ height: 6, background: "#1A1A1A", borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg,#9B59B6,#E8521A,#1A5CE8)", borderRadius: 3, transition: "width 0.5s" }} />
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 16, flexWrap: "wrap" }}>
            {BLOQUES.map(b => { const d=b.modulos.filter(m=>progress[m.id]).length; return (
              <div key={b.id} style={{ fontSize: 12, color: "#666", fontFamily: "monospace" }}>
                <span style={{ color: b.color }}>{b.nombre.split(" ")[0]}</span> {d}/{b.modulos.length}
              </div>
            );})}
          </div>
        </div>
        {(() => {
          const next = ALL_MODULOS.find(m => !progress[m.id]);
          if (!next) return <div style={{ ...s.card("#16A34A"), background: "#16A34A10", fontSize: 16, color: "#16A34A" }}>🎉 ¡Máster completado!</div>;
          return (
            <div style={{ ...s.card(next.bloqueColor), background: next.bloqueColor+"08", cursor: "pointer" }} onClick={() => { setActiveModulo(next); setView("modulo"); }}>
              <div style={s.lbl}>📍 Módulo actual</div>
              <h2 style={s.h2}>{next.titulo}</h2>
              <div style={{ fontSize: 13, color: "#777", marginTop: 4 }}>{next.objetivo}</div>
              <div style={{ fontSize: 12, color: next.bloqueColor, fontFamily: "monospace", marginTop: 10 }}>Abrir módulo →</div>
            </div>
          );
        })()}
        {completedModulos > 0 && (
          <div style={s.card(null)}>
            <div style={s.lbl}>✅ Completados ({completedModulos})</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {ALL_MODULOS.filter(m=>progress[m.id]).map(m => (
                <div key={m.id} style={{ background: m.bloqueColor+"20", border: `1px solid ${m.bloqueColor}44`, borderRadius: 4, padding: "4px 10px", fontSize: 11, color: m.bloqueColor, fontFamily: "monospace" }}>✓ {m.titulo}</div>
              ))}
            </div>
          </div>
        )}
        {Object.keys(notes).length > 0 && (
          <div style={s.card(null)}>
            <div style={s.lbl}>📝 Últimas notas</div>
            {Object.entries(notes).flatMap(([id,ns])=>ns.map(n=>({...n,modId:id}))).slice(-3).reverse().map((n,i) => {
              const mod = ALL_MODULOS.find(m=>m.id===n.modId);
              return (
                <div key={i} style={{ marginBottom: 10, paddingBottom: 10, borderBottom: "1px solid #141414" }}>
                  <div style={{ fontSize: 11, fontFamily: "monospace", color: "#555", marginBottom: 3 }}>{n.date} · <span style={{ color: mod?.bloqueColor||"#666" }}>{mod?.titulo}</span></div>
                  <div style={{ fontSize: 13, color: "#CCC" }}>{n.text}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  // DIARIO
  return (
    <div style={s.page}>
      <div style={s.hdr}><div style={s.wrap}>
        <h1 style={{ fontSize: 24, fontWeight: "normal", margin: 0, color: "#F0EBE0" }}>Diario de estudio</h1>
      </div></div>
      <div style={{ ...s.wrap, ...s.pad }}>
        <div style={s.nav}>
          {["dashboard","overview","log"].map(v => <button key={v} style={s.nb(view===v)} onClick={() => setView(v)}>{v==="dashboard"?"Mi progreso":v==="overview"?"Módulos":"Diario"}</button>)}
        </div>
        <div style={s.card(null)}>
          <div style={s.lbl}>Nueva entrada</div>
          <textarea style={s.inp} placeholder="¿Qué aprendiste hoy? ¿Qué se te atascó? ¿Qué funciona?" value={logInput} onChange={e => setLogInput(e.target.value)} />
          <button style={{ ...s.btn("#1A5CE8"), marginTop: 8 }} onClick={addLog}>Añadir entrada</button>
        </div>
        {studyLog.length === 0 && <div style={{ color: "#555", fontSize: 14, textAlign: "center", padding: "40px 0", fontFamily: "monospace" }}>Todavía sin entradas.</div>}
        {studyLog.map((e,i) => (
          <div key={i} style={{ ...s.card(null), marginBottom: 8 }}>
            <div style={{ fontSize: 11, fontFamily: "monospace", color: "#555", marginBottom: 6 }}>{e.date}</div>
            <div style={{ fontSize: 14, color: "#CCC", lineHeight: 1.6 }}>{e.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
