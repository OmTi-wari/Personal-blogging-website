import { Github, Twitter, Linkedin, Mail } from "lucide-react"

const About = () => {
  return (
    <main className="main">
      <div className="container">
        <div className="about-page">
          <div className="about-header">
            <div className="profile-image">
              <img src="/placeholder.svg?height=200&width=200" alt="Profile" />
            </div>
            <div className="profile-info">
              <h1>Hi, I'm [Your Name]</h1>
              <p className="tagline">A passionate developer sharing insights on technology, programming, and life.</p>
            </div>
          </div>

          <section className="about-section">
            <h2>My Journey</h2>
            <p>
              Welcome to my personal blog! I'm a software developer with a passion for creating meaningful digital
              experiences and sharing knowledge with the community. My journey in technology started several years ago,
              and since then, I've been continuously learning and growing in this ever-evolving field.
            </p>
            <p>
              Through this blog, I share my experiences, insights, and learnings from various projects, technologies,
              and challenges I encounter. Whether it's a new framework I'm exploring, a problem I've solved, or thoughts
              on industry trends, you'll find it all here.
            </p>
          </section>

          <section className="about-section">
            <h2>What I Write About</h2>
            <ul className="topics-list">
              <li>Web Development & Modern Frameworks</li>
              <li>JavaScript, React, Node.js, and more</li>
              <li>Software Architecture & Best Practices</li>
              <li>Personal Projects & Case Studies</li>
              <li>Industry Insights & Technology Trends</li>
              <li>Career Development & Learning Resources</li>
            </ul>
          </section>

          <section className="about-section">
            <h2>Beyond Code</h2>
            <p>
              When I'm not coding, you can find me exploring new places, reading books, or working on personal projects.
              I believe in continuous learning and enjoy experimenting with new technologies and ideas.
            </p>
            <p>
              I'm always open to connecting with fellow developers, discussing interesting projects, or collaborating on
              meaningful work. Feel free to reach out through the contact information below!
            </p>
          </section>

          <section className="about-section">
            <h2>Let's Connect</h2>
            <div className="social-links-large">
              <a href="mailto:your@email.com" className="social-link">
                <Mail size={24} />
                <span>Email</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <Twitter size={24} />
                <span>Twitter</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <Linkedin size={24} />
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <Github size={24} />
                <span>GitHub</span>
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default About
