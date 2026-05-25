import React, { useEffect, useState } from 'react';
import './Navbar.css';

const links = ['About', 'Skills', 'Experience', 'Projects', 'Contact'];

export default function Navbar() {
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = document.querySelectorAll('section[id]');
      let current = '';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 200) current = s.getAttribute('id');
      });
      setActive(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <ul className="nav-links">
        {links.map(link => (
          <li key={link}>
            <a
              href={`#${link.toLowerCase()}`}
              className={active === link.toLowerCase() ? 'active' : ''}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
