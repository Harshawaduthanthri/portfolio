import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Certifications.css'

// Importing images
import aimlEngineerStage1 from '../../assets/Certifications/aiml-engineer-stage-1-sliit.png'
import sqlCert from '../../assets/Certifications/Hacker Rank-SQL certificate.png'
import pbiCert1 from '../../assets/Certifications/Power BI Beginner to Pro Workshop– Pragmatic Works.png'
import pbiCert2 from '../../assets/Certifications/Power BI for Beginners– Simplilearn.png'
import pythonCert from '../../assets/Certifications/Python For Beginners– University of Moratuwa.png'

const certifications = [
  {
    title: 'AIML Engineer - Stage 1',
    issuer: 'SLIIT',
    image: aimlEngineerStage1,
    color: '#7b2ff7'
  },
  {
    title: 'SQL Gold Medal Certificate',
    issuer: 'HackerRank',
    image: sqlCert,
    color: '#00ff88'
  },
  {
    title: 'Power BI Beginner to Pro workshop',
    issuer: 'Pragmatic Works',
    image: pbiCert1,
    color: '#00d4ff'
  },
  {
    title: 'Power BI for Beginners',
    issuer: 'Simplilearn',
    image: pbiCert2,
    color: '#f5a623'
  },
  {
    title: 'Python For Beginners',
    issuer: 'University of Moratuwa',
    image: pythonCert,
    color: '#4ecdc4'
  }
]

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }

function CertificationCard({ cert, index, inView }) {
  return (
    <motion.div
      className="cert-card glass-card"
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeUp}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="cert-card__image-wrapper">
        <img src={cert.image} alt={cert.title} className="cert-card__image" />
        <div className="cert-card__overlay" style={{ background: `linear-gradient(to top, ${cert.color}40, transparent)` }} />
      </div>
      <div className="cert-card__content">
        <p className="cert-card__issuer">{cert.issuer}</p>
        <h3 className="cert-card__title">{cert.title}</h3>
      </div>
    </motion.div>
  )
}

export default function Certifications() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="section certifications" id="certifications" ref={ref}>
      <div className="container">
        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp} transition={{ duration: 0.6 }}>
          <p className="section-label">My Credentials</p>
          <h2 className="section-title">Professional <span className="gradient-text">Certifications</span></h2>
          <p className="section-subtitle">Verified certifications from top institutions and platforms.</p>
        </motion.div>

        <div className="certifications__grid">
          {certifications.map((cert, i) => (
            <CertificationCard key={cert.title} cert={cert} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
