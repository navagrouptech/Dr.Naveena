// ==========================================================================
// Dr. Naveena's Skin Clinic — Interactive Script
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer Toggle
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.textContent = isOpen ? '✕' : '☰';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('open') && !nav.contains(e.target) && !menuToggle.contains(e.target)) {
        nav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.textContent = '☰';
      }
    });

    // Close menu when pressing Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.textContent = '☰';
      }
    });

    // Close menu when clicking any nav link
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.textContent = '☰';
      });
    });
  }

  // 2. Active Navigation Scroll Spy
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav a[href^="#"]');

  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // 3. Appointment Form Handling with Interactive Feedback
  const form = document.getElementById('appointmentForm');
  const statusBox = document.getElementById('formStatus');

  if (form && statusBox) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('fullName');
      const phoneInput = document.getElementById('phoneNumber');
      const dateInput = document.getElementById('preferredDate');
      const serviceSelect = document.getElementById('consultationType');

      // Simple Validation
      if (!nameInput.value.trim() || !phoneInput.value.trim()) {
        statusBox.className = 'form-status show';
        statusBox.style.background = '#fef2f2';
        statusBox.style.color = '#991b1b';
        statusBox.style.border = '1px solid #fecaca';
        statusBox.textContent = 'Please provide both your name and phone number so the clinic coordinator can reach you.';
        return;
      }

      const clientName = nameInput.value.trim();
      const chosenService = serviceSelect ? serviceSelect.value : 'Consultation';
      const chosenDate = dateInput && dateInput.value ? ` for ${dateInput.value}` : '';

      // Success Notification
      statusBox.className = 'form-status show success';
      statusBox.innerHTML = `
        <strong>Thank you, ${clientName}!</strong><br>
        Your enquiry for <em>${chosenService}</em>${chosenDate} has been prepared. 
        <small style="display:block; margin-top:4px; opacity:0.85;">(Demo preview: This is a front-end showcase; clinic details and slots will be verified before official publishing.)</small>
      `;

      // Scroll smoothly to feedback
      statusBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  // 4. Dynamic Year in Footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
