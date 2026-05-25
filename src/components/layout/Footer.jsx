import { Mail, Heart, ArrowUp } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../icons/SocialIcons'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__top">
          <a href="#" className="footer__logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="gradient-text">HW</span>
          </a>
          <p className="footer__tagline">Building the future, one commit at a time.</p>
          <div className="footer__socials">
            <a href="https://github.com/Harshawaduthanthri" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GithubIcon size={18} /></a>
            <a href="https://linkedin.com/in/harsha-waduthanthri-356bb9309/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedinIcon size={18} /></a>
            <a href="mailto:harshawaduthanthri@gmail.com" aria-label="Email"><Mail size={18} /></a>
          </div>
        </div>

        <div className="footer__bottom">
          <p>Designed & Built by <span className="gradient-text">Harsha Waduthanthri</span> &mdash; &copy; {new Date().getFullYear()}</p>
        </div>
      </div>

      <button className="footer__scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Scroll to top">
        <ArrowUp size={18} />
      </button>
    </footer>
  )
}
