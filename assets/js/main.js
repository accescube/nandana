/**
 * NANDANA SREEKUMAR | CONSULTANT PSYCHOLOGIST
 * Interactive Scripts & Features
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navbar Effect
  const navbar = document.querySelector('.navbar');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 2. Mobile Navigation Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('active', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking any link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Active Link Tracking on Scroll
  const sections = document.querySelectorAll('section[id]');
  const highlightNavLink = () => {
    // If in the Hero / Top area, no specific section link is active
    if (window.pageYOffset < 260) {
      navLinks.forEach(link => link.classList.remove('active'));
      return;
    }

    const scrollY = window.pageYOffset + 140;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

      if (targetNavLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLinks.forEach(link => link.classList.remove('active'));
          targetNavLink.classList.add('active');
        }
      }
    });
  };
  window.addEventListener('scroll', highlightNavLink, { passive: true });
  highlightNavLink();

  // 4. Smooth Scroll Reveal Animations
  const revealElements = document.querySelectorAll(
    '.service-card, .value-card, .philosophy-reflection-card, .booking-card, .contact-info-panel, .contact-form-panel, .quote-highlight-banner'
  );

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    });

    revealElements.forEach(el => {
      el.classList.add('reveal-on-scroll');
      revealObserver.observe(el);
    });
  }

  // 6. Interactive Consultation Booking Forms & Modal
  const successModal = document.getElementById('successModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalOkBtn = document.getElementById('modalOkBtn');
  const modalWhatsappBtn = document.getElementById('modalWhatsappBtn');
  const clientNameSpan = document.getElementById('summaryClientName');
  const serviceSpan = document.getElementById('summaryService');

  const setupBookingForm = (formId) => {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Retrieve form values
      const name = (form.querySelector('[name="clientName"]') || form.querySelector('#clientName') || {}).value?.trim() || '';
      const phone = (form.querySelector('[name="clientPhone"]') || form.querySelector('#clientPhone') || {}).value?.trim() || '';
      const email = (form.querySelector('[name="clientEmail"]') || form.querySelector('#clientEmail') || {}).value?.trim() || '';
      const service = (form.querySelector('[name="clientService"]') || form.querySelector('#clientService') || {}).value || '';
      const mode = (form.querySelector('[name="consultationMode"]') || form.querySelector('#consultationMode') || {}).value || 'Online Video Session';
      const message = (form.querySelector('[name="clientMessage"]') || form.querySelector('#clientMessage') || {}).value?.trim() || '';

      if (!name || !phone || !service) {
        alert('Please fill in your name, contact number, and select an area of interest.');
        return;
      }

      // Update Modal content
      if (clientNameSpan) clientNameSpan.textContent = name;
      if (serviceSpan) serviceSpan.textContent = service;

      // Construct WhatsApp message URL
      const therapistPhone = '919876543210';
      const whatsappText = encodeURIComponent(
        `Hello Nandana Sreekumar,\n\nMy name is ${name}.\nI would like to request a consultation session.\n\n*Service/Area:* ${service}\n*Preferred Mode:* ${mode}\n*Contact:* ${phone}${email ? ' / ' + email : ''}\n*Notes:* ${message || 'None'}\n\nLooking forward to hearing from you. Thank you!`
      );
      const whatsappUrl = `https://wa.me/${therapistPhone}?text=${whatsappText}`;

      if (modalWhatsappBtn) {
        modalWhatsappBtn.href = whatsappUrl;
      }

      // Open Modal
      if (successModal) {
        successModal.classList.add('open');
      }

      // Reset form
      form.reset();
    });
  };

  setupBookingForm('heroBookingForm');
  setupBookingForm('consultationForm');

  // Modal Close Handlers
  const closeModal = () => {
    if (successModal) successModal.classList.remove('open');
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOkBtn) modalOkBtn.addEventListener('click', closeModal);
  if (successModal) {
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) closeModal();
    });
  }
});
