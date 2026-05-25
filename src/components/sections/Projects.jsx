import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { GithubIcon } from '../icons/SocialIcons'
import { ExternalLink, Cpu, Globe, CreditCard, Activity, Layout } from 'lucide-react'
import './Projects.css'

// Importing images
import dataWarehouseCube from '../../assets/projects/Data warehousing project/cube.jfif'
import dataWarehouseD1 from '../../assets/projects/Data warehousing project/dashboard1.jfif'
import dataWarehouseD2 from '../../assets/projects/Data warehousing project/dashboard2.jfif'
import dataWarehouseD3 from '../../assets/projects/Data warehousing project/dashboard3.jfif'

import iotRpm from '../../assets/projects/IoT-Based Predictive Maintenance System for Industrial Sewing Machines/rpm.jpeg'
import iotVib from '../../assets/projects/IoT-Based Predictive Maintenance System for Industrial Sewing Machines/vib.jpeg'
import iotStitch from '../../assets/projects/IoT-Based Predictive Maintenance System for Industrial Sewing Machines/stitch.jpeg'
import iotStitchh from '../../assets/projects/IoT-Based Predictive Maintenance System for Industrial Sewing Machines/stitchh.jpeg'
import iotVibr from '../../assets/projects/IoT-Based Predictive Maintenance System for Industrial Sewing Machines/vibr.jpeg'

import sewMetrics1 from '../../assets/projects/SewMetrics Analytics Dashboard with AI Assistant/vuad1.jpeg'
import sewMetrics2 from '../../assets/projects/SewMetrics Analytics Dashboard with AI Assistant/vaud2.jpeg'

const projects = [
  {
    title: 'Data Warehousing Project',
    description: 'Designed and implemented an end-to-end BI solution with ETL, data modeling, and reporting. Built SSIS ETL workflows with SCD Type 2 for historical data tracking and Snowflake Schema for scalable analytics.',
    icon: Layout,
    images: [dataWarehouseCube, dataWarehouseD1, dataWarehouseD2, dataWarehouseD3],
    color: '#00d4ff',
    gradient: 'linear-gradient(135deg, rgba(0,212,255,0.12), rgba(0,212,255,0.03))',
    tags: ['SQL Server', 'SSIS', 'SSAS', 'Power BI', 'Visual Studio', 'Excel'],
    github: 'https://github.com/Harshawaduthanthri',
    live: null,
    featured: true,
    status: 'Completed',
  },
  {
    title: 'IoT-Based Predictive Maintenance System for Industrial Sewing Machines',
    description: 'Real-time multi-sensor data monitoring (RPM, vibration, temperature) using ESP32 and MQTT. Built machine learning models for anomaly detection and machine degradation analysis.',
    icon: Cpu,
    images: [iotRpm, iotVib, iotStitch, iotStitchh, iotVibr],
    color: '#7b2ff7',
    gradient: 'linear-gradient(135deg, rgba(123,47,247,0.12), rgba(123,47,247,0.03))',
    tags: ['ESP32', 'MQTT', 'Python', 'scikit-learn', 'React.js', 'Node.js', 'MongoDB', 'WebSocket'],
    github: 'https://github.com/Harshawaduthanthri',
    live: null,
    featured: true,
    status: 'Completed',
  },
  {
    title: 'SewMetrics Analytics Dashboard with AI Assistant',
    description: 'Analytics dashboard for textile manufacturing with an AI-powered chatbot for natural language queries and troubleshooting. Real-time analytics and visualization using FastAPI.',
    icon: Globe,
    images: [sewMetrics1, sewMetrics2],
    color: '#00ff88',
    gradient: 'linear-gradient(135deg, rgba(0,255,136,0.12), rgba(0,255,136,0.03))',
    tags: ['React.js', 'FastAPI', 'Pandas', 'PyTorch', 'HuggingFace', 'Recharts'],
    github: 'https://github.com/Harshawaduthanthri',
    live: null,
    featured: true,
    status: 'Completed',
  },
  {
    title: 'Video Game Sales Prediction',
    description: 'Streamlit-based web application that predicts global video game sales using a Random Forest model. Includes extensive data preprocessing and feature engineering for high-accuracy predictions.',
    icon: Activity,
    color: '#00ff88',
    gradient: 'linear-gradient(135deg, rgba(0,255,136,0.12), rgba(0,255,136,0.03))',
    tags: ['Python', 'Streamlit', 'Random Forest', 'Jupyter', 'Pandas'],
    github: 'https://github.com/Harshawaduthanthri',
    live: null,
    featured: false,
    status: 'Deployed',
  },
  {
    title: 'Full-Stack E-Commerce System',
    description: 'Comprehensive MERN stack platform with user authentication, role-based access, admin dashboard, and real-time search/filter functionality.',
    icon: CreditCard,
    color: '#ff6b6b',
    gradient: 'linear-gradient(135deg, rgba(255,107,107,0.12), rgba(255,107,107,0.03))',
    tags: ['MERN Stack', 'MongoDB', 'Express', 'React', 'Node'],
    github: 'https://github.com/Harshawaduthanthri',
    live: null,
    featured: false,
    status: 'Completed',
  },
  {
    title: 'Web-Based Learning Platform',
    description: 'Educational platform enabling course management, progress tracking, and certificate generation. Built using Spring Boot and React.',
    icon: Globe,
    color: '#00d4ff',
    gradient: 'linear-gradient(135deg, rgba(0,212,255,0.12), rgba(0,212,255,0.03))',
    tags: ['Spring Boot', 'React', 'MongoDB', 'REST API'],
    github: 'https://github.com/Harshawaduthanthri',
    live: null,
    featured: false,
    status: 'Completed',
  },
]

const statusColors = {
  Production: '#00ff88',
  Deployed: '#00ff88',
  Completed: '#00d4ff',
  'In Progress': '#f5a623',
}

const fadeUp = { hidden: { opacity: 0, y: 35 }, visible: { opacity: 1, y: 0 } }

function ProjectCard({ project, index, inView }) {
  const [hovered, setHovered] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const Icon = project.icon
  const projectImages = project.images || (project.image ? [project.image] : [])
  const hasImages = Array.isArray(projectImages) && projectImages.length > 0

  useEffect(() => {
    if (hasImages && projectImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % projectImages.length)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [hasImages, projectImages.length])

  return (
    <motion.div
      className={`project-card glass-card ${project.featured ? 'project-card--featured' : ''} ${hasImages ? 'project-card--has-image' : ''}`}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeUp}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: hovered && !hasImages ? project.gradient : undefined, borderColor: hovered ? `${project.color}50` : undefined }}
    >
      {hasImages ? (
        <div className="project-card__image-container">
          <div className="project-card__slideshow" style={{ position: 'relative', width: '100%', height: '100%' }}>
            {projectImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${project.title} ${i}`}
                className="project-card__image"
                style={{ 
                  position: 'absolute', 
                  top: 0, 
                  left: 0, 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  opacity: i === currentImageIndex ? 1 : 0,
                  transition: 'opacity 0.5s ease',
                  zIndex: i === currentImageIndex ? 1 : 0
                }}
              />
            ))}
          </div>
          <div className="project-card__image-overlay" style={{ zIndex: 2 }}>
            <div className="project-card__badges project-card__badges--overlay">
              <span className="project-card__status" style={{ color: statusColors[project.status], borderColor: `${statusColors[project.status]}40`, background: 'rgba(5, 8, 22, 0.8)' }}>
                ● {project.status}
              </span>
              {project.featured && <span className="project-card__featured">Featured</span>}
            </div>
            {projectImages.length > 1 && (
              <div className="project-card__indicators">
                {projectImages.map((_, i) => (
                  <div 
                    key={i} 
                    className={`project-card__indicator ${i === currentImageIndex ? 'project-card__indicator--active' : ''}`}
                    style={{ background: i === currentImageIndex ? project.color : 'rgba(255,255,255,0.3)' }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="project-card__header">
          <div className="project-card__icon" style={{ background: `${project.color}15`, border: `1.5px solid ${project.color}40` }}>
            {Icon ? <Icon size={22} style={{ color: project.color }} /> : <Layout size={22} style={{ color: project.color }} />}
          </div>
          <div className="project-card__badges">
            <span className="project-card__status" style={{ color: statusColors[project.status], borderColor: `${statusColors[project.status]}40`, background: `${statusColors[project.status]}10` }}>
              ● {project.status}
            </span>
            {project.featured && <span className="project-card__featured">Featured</span>}
          </div>
        </div>
      )}

      <div className="project-card__content">
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__desc">{project.description}</p>

        <div className="project-card__tags">
          {project.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
        </div>

        <div className="project-card__links">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-card__link">
            <GithubIcon size={16} /> GitHub
          </a>
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-card__link project-card__link--live">
              <ExternalLink size={16} /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="section projects" id="projects" ref={ref}>
      <div className="container">
        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp} transition={{ duration: 0.6 }}>
          <p className="section-label">What I've Built</p>
          <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
          <p className="section-subtitle">A selection of real-world projects I've designed, built, and shipped from scratch.</p>
        </motion.div>

        <div className="projects__grid">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} inView={inView} />
          ))}
        </div>

        <motion.div
          className="projects__cta"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <a href="https://github.com/Harshawaduthanthri" target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <GithubIcon size={18} /> View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
