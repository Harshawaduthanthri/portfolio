import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Send, Phone } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../icons/SocialIcons'
import emailjs from '@emailjs/browser'
import './Contact.css'

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'harshawaduthanthri@gmail.com',
    href: 'mailto:harshawaduthanthri@gmail.com',
    color: '#00d4ff',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+9471 7794 973',
    href: 'tel:+94717794973',
    color: '#00ff88',
  },
  {
    icon: GithubIcon,
    label: 'GitHub',
    value: 'github.com/Harshawaduthanthri',
    href: 'https://github.com/Harshawaduthanthri',
    color: '#7b2ff7',
  },
  {
    icon: LinkedinIcon,
    label: 'LinkedIn',
    value: 'Harsha Waduthanthri',
    href: 'https://linkedin.com/in/harsha-waduthanthri-356bb9309/',
    color: '#00d4ff',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)

    const SERVICE_ID = 'service_jkpraq5'
    const TEMPLATE_ID = 'template_9m5c5km'
    const PUBLIC_KEY = 'cYlkob7Gi26-e6B_v'

    const templateParams = {
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
      time: new Date().toLocaleString(),
      reply_to: form.email,
    }

    try {
      const response = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        {
          publicKey: PUBLIC_KEY,
        }
      )

      console.log('SUCCESS!', response.status, response.text)

      setSent(true)
      setForm({
        name: '',
        email: '',
        subject: '',
        message: '',
      })
    } catch (error) {
      console.error('FULL EMAILJS ERROR:', error)
      console.error('Status:', error?.status)
      console.error('Text:', error?.text)

      alert(
        `Error: ${error?.text || 'Failed to send message'}.\n\n` +
        `Please verify in EmailJS Dashboard:\n` +
        `1. Service ID is EXACTLY: ${SERVICE_ID}\n` +
        `2. Template ID is EXACTLY: ${TEMPLATE_ID}\n` +
        `3. Public Key is EXACTLY: ${PUBLIC_KEY}`
      )
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="section contact" id="contact" ref={ref}>
      <div className="contact__glow-1" />
      <div className="contact__glow-2" />

      <div className="container">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Get In Touch</p>
          <h2 className="section-title">
            Let's <span className="gradient-text">Work Together</span>
          </h2>
          <p className="section-subtitle">
            I'm actively seeking full-time opportunities in Data Analytics and
            Data Engineering. Feel free to reach out regarding job
            openings or professional opportunities.
          </p>
        </motion.div>

        <div className="contact__inner">
          <motion.div
            className="contact__info"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="contact__available glass-card">
              <div className="contact__available-dot">
                <span className="glow-dot" />
              </div>
              <div>
                <h3 className="contact__available-title">Available for Work</h3>
                <p className="contact__available-sub">
                  Currently seeking full-time roles and graduate opportunities.
                </p>
              </div>
            </div>

            <div className="contact__info-cards">
              {contactInfo.map(({ icon: Icon, label, value, href, color }) => (
                <a
                  key={label}
                  href={href || undefined}
                  target={href?.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className={`contact__info-card glass-card ${href ? 'contact__info-card--link' : ''
                    }`}
                >
                  <div
                    className="contact__info-icon"
                    style={{
                      background: `${color}15`,
                      border: `1.5px solid ${color}30`,
                    }}
                  >
                    <Icon size={18} style={{ color }} />
                  </div>

                  <div>
                    <p className="contact__info-label">{label}</p>
                    <p className="contact__info-value">{value}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="contact__form-col"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            {sent ? (
              <div className="contact__success glass-card">
                <div className="contact__success-icon">✓</div>
                <h3>Message Sent!</h3>
                <p>Thanks for reaching out. Harsha will get back to you soon.</p>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setSent(false)}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form className="contact__form glass-card" onSubmit={handleSubmit}>
                <h3 className="contact__form-title">Send a Message</h3>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-name">Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-email">Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-subject">Subject</label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    placeholder="What's this about?"
                    value={form.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={6}
                    placeholder="Tell me about your project or opportunity..."
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary contact__submit"
                  disabled={sending}
                >
                  {sending ? (
                    <span className="contact__spinner" />
                  ) : (
                    <>
                      <Send size={16} /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}