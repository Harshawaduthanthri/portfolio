import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code2, BrainCircuit, Database, BarChart3, Binary, Layers, Cloud, Settings } from 'lucide-react'
import './Skills.css'

const skillGroups = [
  {
    category: 'Programming',
    icon: Code2,
    color: '#00d4ff',
    skills: ['Python', 'Java', 'C/C++', 'R', 'Kotlin', 'SQL'],
  },
  {
    category: 'Machine Learning',
    icon: BrainCircuit,
    color: '#00ff88',
    skills: ['Supervised Learning', 'Unsupervised Learning', 'NLP', 'Deep Learning', 'Neural Networks'],
  },
  {
    category: 'Databases & Cloud',
    icon: Cloud,
    color: '#7b2ff7',
    skills: ['MySQL', 'MongoDB', 'AWS', 'Microsoft Azure', 'Oracle', 'PostgreSQL'],
  },
  {
    category: 'Data Analysis',
    icon: BarChart3,
    color: '#ff6b6b',
    skills: ['Pandas & NumPy', 'Matplotlib & Seaborn', 'Power BI', 'MS Excel', 'Scikit-Learn'],
  },
  {
    category: 'Frameworks & Tools',
    icon: Settings,
    color: '#00d4ff',
    skills: ['Spring Boot', 'MERN Stack', 'Streamlit', 'Hadoop', 'Git & GitHub', 'PyTorch & TensorFlow'],
  },
]

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section skills grid-bg" id="skills" ref={ref}>
      <div className="container">
        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp} transition={{ duration: 0.6 }}>
          <p className="section-label">Expertise</p>
          <h2 className="section-title">Technical <span className="gradient-text">Proficiency</span></h2>
          <p className="section-subtitle">A comprehensive toolkit specialized in Data Science, AI, and Backend Systems.</p>
        </motion.div>

        <div className="skills__bento">
          {skillGroups.map((group, gi) => {
            const Icon = group.icon
            return (
              <motion.div
                key={group.category}
                className="skills__card glass-card"
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                variants={fadeUp}
                transition={{ duration: 0.6, delay: gi * 0.1 }}
                style={{ '--accent-color': group.color }}
              >
                <div className="skills__card-glow" />
                <div className="skills__card-header">
                  <div className="skills__card-icon-box">
                    <Icon size={24} style={{ color: group.color }} />
                  </div>
                  <h3 className="skills__card-title">{group.category}</h3>
                </div>
                
                <div className="skills__list">
                  {group.skills.map((skill, si) => (
                    <div key={skill} className="skills__item">
                      <span className="skills__item-dot" />
                      <span className="skills__item-name">{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
