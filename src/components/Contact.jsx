import { useRef, useState } from 'react';

const links = [
  { href: 'https://github.com/amiitdev', icon: 'fa-brands fa-github', label: 'GitHub' },
  {
    href: 'https://www.linkedin.com/in/amit1924',
    icon: 'fa-brands fa-linkedin-in',
    label: 'LinkedIn',
  },
  { href: 'https://amiitdev.github.io/portfolio/', icon: 'fa-solid fa-globe', label: 'Portfolio' },
];

export default function Contact() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const formRef = useRef(null);

  const openForm = () => setOpen(true);
  const closeForm = () => setOpen(false);

  const submit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSent(true);
      setTimeout(() => setSent(false), 3000);
      e.target.reset();
    }, 1500);
  };

  return (
    <>
      <div className={`hub-overlay ${open ? 'active' : ''}`} onClick={closeForm}></div>

      <section
        id="contact"
        className="py-12 sm:py-16 lg:py-20 px-4 bg-dark-light/50 flex justify-center scroll-mt-20"
      >
        <div className="max-w-6xl w-full">
          <div className="text-center mb-12">
            <p className="text-primary text-sm tracking-widest uppercase mb-2">
              <i className="fa-solid fa-envelope mr-2"></i>Connect
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold">Get In Touch</h2>
          </div>

          <div className="contact-hub">
            <div className="hub-ring">
              <div className="hub-ring-glow"></div>
              <div className="hub-ring-inner"></div>

              <div className="hub-orbit">
                {links.slice(0, 3).map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="hub-node"
                    style={{ animationDelay: `${i * 0.5}s` }}
                    title={link.label}
                  >
                    <i className={link.icon}></i>
                  </a>
                ))}
              </div>
              <div className="hub-orbit">
                {links.slice(0, 3).map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="hub-node"
                    style={{ animationDelay: `${i * 0.3}s` }}
                    title={link.label}
                  >
                    <i className={link.icon}></i>
                  </a>
                ))}
              </div>

              <div className="hub-center">
                <div className="hub-avatar">
                  <i className="fa-solid fa-user"></i>
                </div>
                <div className="hub-name">Amit Kumar</div>
                <div className="hub-title">Full Stack Developer</div>
                <div className="hub-email">
                  <i className="fa-solid fa-envelope"></i>
                  <span>amitkumar.devnode@gmail.com</span>
                </div>
              </div>
            </div>

            <div className={`hub-beam ${open ? 'active' : ''}`}></div>

            <button className="hub-btn" onClick={openForm}>
              <i className="fa-solid fa-paper-plane"></i>
              <span>Send a Message</span>
            </button>
          </div>
        </div>
      </section>

      <div className={`hub-form-panel ${open ? 'active' : ''}`}>
        <div className="hub-form-header">
          <button className="hub-form-close" onClick={closeForm}>
            <i className="fa-solid fa-xmark"></i>
          </button>
          <h3 className="text-lg font-bold">New Message</h3>
          <div className="w-8"></div>
        </div>
        <form ref={formRef} onSubmit={submit} className="hub-form-body">
          <div className="hub-field">
            <label>
              <i className="fa-solid fa-user mr-2 text-primary"></i>Name
            </label>
            <input type="text" name="name" required placeholder="Your name" />
          </div>
          <div className="hub-field">
            <label>
              <i className="fa-solid fa-envelope mr-2 text-primary"></i>Email
            </label>
            <input type="email" name="email" required placeholder="your@email.com" />
          </div>
          <div className="hub-field">
            <label>
              <i className="fa-solid fa-message mr-2 text-primary"></i>Message
            </label>
            <textarea
              name="message"
              rows={5}
              required
              placeholder="Write your message..."
            ></textarea>
          </div>
          <button type="submit" disabled={submitting} className="hub-submit-btn">
            {submitting ? (
              <i className="fa-solid fa-spinner fa-spin mr-2"></i>
            ) : (
              <i className="fa-solid fa-paper-plane mr-2"></i>
            )}
            <span>{submitting ? 'Sending...' : 'Send Message'}</span>
          </button>
        </form>
      </div>

      {sent && (
        <div className="hub-toast">
          <i className="fa-solid fa-check-circle"></i>
          <span>Message sent! Thank you.</span>
        </div>
      )}
    </>
  );
}
