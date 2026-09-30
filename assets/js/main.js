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
      mobileToggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking any link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        if (mobileToggle) {
          mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
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

  // 4. Services Filter Tabs
  const filterBtns = document.querySelectorAll('.filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  if (filterBtns.length && serviceCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Active button state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        serviceCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue || category.includes(filterValue)) {
            card.style.display = 'flex';
            card.style.animation = 'fadeIn 0.4s ease forwards';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 5. FAQ Accordion
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all items
      accordionItems.forEach(i => i.classList.remove('active'));

      // If it wasn't active, activate it
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 6. Interactive Consultation Booking Form & Modal
  const bookingForm = document.getElementById('consultationForm');
  const successModal = document.getElementById('successModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalOkBtn = document.getElementById('modalOkBtn');
  const modalWhatsappBtn = document.getElementById('modalWhatsappBtn');
  const clientNameSpan = document.getElementById('summaryClientName');
  const serviceSpan = document.getElementById('summaryService');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Retrieve form values
      const name = document.getElementById('clientName').value.trim();
      const email = document.getElementById('clientEmail').value.trim();
      const phone = document.getElementById('clientPhone').value.trim();
      const service = document.getElementById('clientService').value;
      const mode = document.getElementById('consultationMode').value;
      const message = document.getElementById('clientMessage').value.trim();

      if (!name || !phone || !service) {
        alert('Please fill in your name, contact number, and select the area of interest.');
        return;
      }

      // Update Modal content
      if (clientNameSpan) clientNameSpan.textContent = name;
      if (serviceSpan) serviceSpan.textContent = service;

      // Construct WhatsApp message URL
      const therapistPhone = '919876543210'; // Professional placeholder, customizable
      const whatsappText = encodeURIComponent(
        `Hello Nandana Sreekumar,\n\nMy name is ${name}.\nI would like to request a consultation session.\n\n*Service/Area:* ${service}\n*Preferred Mode:* ${mode}\n*Contact:* ${phone} / ${email}\n*Notes:* ${message || 'None'}\n\nLooking forward to hearing from you. Thank you!`
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
      bookingForm.reset();
    });
  }

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
