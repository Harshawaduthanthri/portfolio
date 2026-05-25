import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, Briefcase, Calendar, MapPin } from 'lucide-react'
import './Experience.css'

const timeline = [
  {
    type: 'experience',
    icon: Briefcase,
    title: 'AI & Backend Development Intern',
    org: 'SparQ Corporate',
    period: 'Sep 2025 — Mar 2026',
    location: 'Remote',
    color: '#00ff88',
    description: 'Developed microservice-based backends using Spring Boot and PostgreSQL. Integrated AI components into backend workflows, created chat bots for booking systems, and implemented AI-driven graph description generation. Optimized SQL-backed REST APIs for high performance.',
    tags: ['Spring Boot', 'PostgreSQL', 'Microservices', 'AI Integration', 'Java'],
  },
  {
    type: 'education',
    icon: GraduationCap,
    title: 'BSc (Hons) in IT - Specialization in Data Science',
    org: 'Sri Lanka Institute of Information Technology (SLIIT)',
    period: '2022 — Present',
    location: 'Malabe, Sri Lanka',
    color: '#00d4ff',
    description: 'Currently in the 4th Year, 2nd Semester. Focusing on Machine Learning, Massive Data Processing, and Data Mining. Completed Higher Diploma in IT in July 2024.',
    tags: ['Data Science', 'Machine Learning', 'Big Data', 'Statistics'],
  },
  {
    type: 'education',
    icon: GraduationCap,
    title: 'G.C.E. Advanced Level - Physical Science',
    org: "St. Sylvester's College, Kandy",
    period: '2019 — 2021',
    location: 'Kandy, Sri Lanka',
    color: '#7b2ff7',
    description: 'Combined Mathematics: S | Physics: S | Chemistry: C. Gained fundamental knowledge in physical sciences and mathematics.',
    tags: ['Mathematics', 'Physics', 'Chemistry'],
  },
]

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section experience" id="experience" ref={ref}>
      <div className="container">
        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp} transition={{ duration: 0.6 }}>
          <p className="section-label">My Journey</p>
          <h2 className="section-title">Experience & <span className="gradient-text">Education</span></h2>
          <p className="section-subtitle">A timeline of my growth as a developer and the milestones that shaped me.</p>
        </motion.div>

        <div className="timeline">
          <div className="timeline__line" />
          {timeline.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={i}
                className={`timeline__item ${i % 2 === 0 ? 'timeline__item--left' : 'timeline__item--right'}`}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                variants={fadeUp}
                transition={{ duration: 0.65, delay: i * 0.18 }}
              >
                <div className="timeline__connector">
                  <div className="timeline__icon" style={{ background: `${item.color}20`, border: `2px solid ${item.color}`, boxShadow: `0 0 20px ${item.color}40` }}>
                    <Icon size={18} style={{ color: item.color }} />
                  </div>
                </div>

                <div className="timeline__card glass-card">
                  <div className="timeline__card-header">
                    <div>
                      <h3 className="timeline__title">{item.title}</h3>
                      <p className="timeline__org" style={{ color: item.color }}>{item.org}</p>
                    </div>
                  </div>
                  <div className="timeline__meta">
                    <span className="timeline__meta-item">
                      <Calendar size={13} />
                      {item.period}
                    </span>
                    <span className="timeline__meta-item">
                      <MapPin size={13} />
                      {item.location}
                    </span>
                  </div>
                  <p className="timeline__desc">{item.description}</p>
                  <div className="timeline__tags">
                    {item.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
