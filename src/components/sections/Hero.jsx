import { useState, useEffect } from 'react'
import { HeroCanvas } from '../canvas/HeroCanvas'
import { ArrowDown, Download, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../icons/SocialIcons'
import './Hero.css'

const roles = [
  'Data Science Specialist',
  'AI/ML Developer',
  'Data Engineering',
  'Data Analyst',
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]
    let timeout

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200)
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 45)
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false)
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, roleIndex])

  return (
    <section className="hero" id="home">
      <div className="hero__canvas-wrapper">
        <HeroCanvas />
        <div className="hero__gradient-overlay" />
      </div>

      <div className="container hero__content">
        <div className="hero__badge">
          <span className="glow-dot" />
          <span>Available for opportunities</span>
        </div>

        <p className="hero__greeting">Hi, I'm</p>
        <h1 className="hero__name">
          Harsha<br />
          <span className="gradient-text">Waduthanthri</span>
        </h1>

        <div className="hero__role">
          <span className="hero__role-text">{displayed}</span>
          <span className="hero__cursor">|</span>
        </div>

        <p className="hero__description">
          4th-year Data Science undergraduate at SLIIT, passionate about machine learning, AI, and data-driven solutions. 
          Experienced in building ML models, BI analytics, and intelligent systems.
        </p>

        <div className="hero__cta">
          <a href="#projects" className="btn-primary" onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}>
            View My Work <ArrowDown size={16} />
          </a>
          <a href="/Harsha_Waduthanthri_CV.pdf" download className="btn-secondary">
            Download CV <Download size={16} />
          </a>
        </div>

        <div className="hero__socials">
          <a href="https://github.com/Harshawaduthanthri" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GithubIcon size={20} /></a>
          <a href="https://linkedin.com/in/harsha-waduthanthri-356bb9309/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedinIcon size={20} /></a>
          <a href="mailto:harshawaduthanthri@gmail.com" aria-label="Email"><Mail size={20} /></a>
        </div>
      </div>

      <div className="hero__scroll-indicator" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  )
}
