import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Code2, Cpu, Globe, Users } from 'lucide-react'
import './About.css'

const stats = [
  { icon: Code2, value: '15+', label: 'Projects Built' },
  { icon: Globe, value: '4+', label: 'Years Coding' },
  { icon: Cpu, value: '10+', label: 'Certificates' },
  { icon: Users, value: '100%', label: 'Dedication' },
]

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } } }

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section about grid-bg" id="about" ref={ref}>
      <div className="container">

        {/* Heading — left-aligned, same as Skills section */}
        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp} transition={{ duration: 0.6 }}>
          <p className="section-label">About Me</p>
          <h2 className="section-title">Crafting <span className="gradient-text">Digital</span> Experiences</h2>
          <p className="section-subtitle">Passionate about turning data into insights and building intelligent systems.</p>
        </motion.div>

        {/* Bio paragraphs */}
        <motion.div className="about__bio-block" initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp} transition={{ delay: 0.15 }}>
          <p className="about__bio">
            I'm <strong style={{ color: 'var(--text-primary)' }}>Harsha Waduthanthri</strong>, a passionate, enthusiastic, and dedicated Data Science graduate from{' '}
            <strong style={{ color: 'var(--accent-cyan)' }}>SLIIT, Malabe</strong>, currently awaiting final results. I have a keen interest in data analysis, machine learning, and data engineering.
          </p>
          <p className="about__bio">
            I've built ML prediction models, BI data warehouse solutions, and data-driven applications, gaining hands-on
            experience as an <strong style={{ color: 'var(--accent-green)' }}>AI &amp; Backend Development Intern at SparQ Corporate</strong>, working with Spring Boot microservices and PostgreSQL.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div className="about__stats" initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp} transition={{ delay: 0.25 }}>
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="about__stat glass-card">
              <Icon size={22} className="about__stat-icon" />
              <span className="about__stat-value gradient-text">{value}</span>
              <span className="about__stat-label">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Info grid */}
        <motion.div className="about__info-grid" initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp} transition={{ delay: 0.35 }}>
          <div className="about__info-item"><span className="about__info-key">Education</span><span>BSc (Hons) IT — SLIIT</span></div>
          <div className="about__info-item"><span className="about__info-key">Specialization</span><span>Data Science</span></div>
          <div className="about__info-item"><span className="about__info-key">Location</span><span>Sri Lanka 🇱🇰</span></div>
          <div className="about__info-item"><span className="about__info-key">Status</span><span style={{ color: 'var(--accent-green)' }}>Open to Opportunities</span></div>
        </motion.div>

      </div>
    </section>
  )
}
