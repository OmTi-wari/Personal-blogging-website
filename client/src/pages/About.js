import { Github, Twitter, Linkedin, Mail } from "lucide-react"

const About = () => {
  return (
    <main className="main">
      <div className="container">
        <div className="about-page">
          <div className="about-header">
            <div className="profile-image">
              <img src="/placeholder-user.jpg" alt="Om Tiwari" />
            </div>
            <div className="profile-info">
              <h1>Om Tiwari – Full Stack Developer | AI/ML Enthusiast | Blockchain Explorer</h1>
              <p className="tagline">I live in Mumbai, Maharashtra, India</p>
              <p className="tagline">Bachelor of Engineering (Computer Engineering), Shree L. R. Tiwari College of Engineering, Batch 2023-2027</p>
            </div>
          </div>

          <section className="about-section">
            <h2>My Journey</h2>
            <p>
              Welcome to my personal blog! I am a full stack developer and an enthusiast in AI/ML and blockchain. I have completed my 10th (SSC, 2021) from Smt J B Khot High School and 12th (HSC, 2023) from Thakur College of Science and Commerce. Currently, I am pursuing a Bachelor of Engineering in Computer Engineering (2023-2027) at Shree L. R. Tiwari College of Engineering.
            </p>
            <p>
              My experience includes in-house internships in blockchain, AI/ML, web development, cybersecurity, and cloud computing. I am an open source contributor and freelancer, having delivered 4+ successful projects to clients.
            </p>
          </section>

          <section className="about-section">
            <h2>What I Write About</h2>
            <ul className="topics-list">
              <li>Web Development, AI/ML, Blockchain, and Cloud Computing</li>
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
              Outside of coding, I enjoy exploring new places, reading, and working on personal projects. I believe in continuous learning and love experimenting with new technologies and ideas.
            </p>
            <p>
              I am always open to connecting with fellow developers, discussing interesting projects, or collaborating on meaningful work. Feel free to reach out!
            </p>
          </section>

          <section className="about-section">
            <h2>Let's Connect</h2>
            <div className="social-links-large">
              <a href="mailto:omtiwari.git@gmail.com" className="social-link">
                <Mail size={24} />
                <span>Email</span>
              </a>
              <a href="https://x.com/ommtiwariii" target="_blank" rel="noopener noreferrer" className="social-link">
                <Twitter size={24} />
                <span>X (Twitter)</span>
              </a>
              <a href="https://www.linkedin.com/in/om-tiwari-471333350/" target="_blank" rel="noopener noreferrer" className="social-link">
                <Linkedin size={24} />
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/OmTi-wari" target="_blank" rel="noopener noreferrer" className="social-link">
                <Github size={24} />
                <span>GitHub</span>
              </a>
              <a href="https://leetcode.com/u/TiwariOm0211/" target="_blank" rel="noopener noreferrer" className="social-link">
                <span>LeetCode</span>
              </a>
              <div className="social-link">
                <span>📱 +91 98921 38536</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default About
