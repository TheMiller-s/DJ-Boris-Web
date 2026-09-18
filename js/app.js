/**
 * Main Application Orchestrator
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Subsystems
  const genreManager = new window.GenreManager();
  const requestManager = new window.RequestManager();
  window.requestManagerInstance = requestManager; // Expose for toasts

  const qrManager = new window.QRManager();
  const audioPlayer = new window.DJAudioPlayer();
  const djPanel = new window.DJBoothPanel(genreManager, requestManager);

  // 2. Mobile Nav Toggle
  const navToggle = document.getElementById('mobile-nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.style.display === 'flex';
      navLinks.style.display = isOpen ? 'none' : 'flex';
      if (!isOpen) {
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '72px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'rgba(10, 10, 14, 0.98)';
        navLinks.style.padding = '1.5rem 2rem';
        navLinks.style.borderBottom = '1px solid var(--border-gold)';
      }
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navLinks.style.display = 'none';
        }
      });
    });
  }

  // 3. Navbar scroll effect & active indicator
  const nav = document.getElementById('site-nav');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.8)';
      nav.style.borderBottomColor = 'rgba(212, 175, 55, 0.2)';
    } else {
      nav.style.boxShadow = 'none';
      nav.style.borderBottomColor = 'var(--border-subtle)';
    }

    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

      if (targetLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetLink.classList.add('active');
        } else {
          targetLink.classList.remove('active');
        }
      }
    });
  });

  // 4. Booking WhatsApp Form Generator
  const bookingBtn = document.getElementById('booking-whatsapp-btn');
  if (bookingBtn) {
    bookingBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('booking-name');
      const dateInput = document.getElementById('booking-date');
      const typeInput = document.getElementById('booking-type');
      const guestsInput = document.getElementById('booking-guests');
      const notesInput = document.getElementById('booking-notes');

      const name = nameInput ? nameInput.value.trim() : '';
      const date = dateInput ? dateInput.value.trim() : '';
      const type = typeInput ? typeInput.value : 'Boda / Evento Privado';
      const guests = guestsInput ? guestsInput.value.trim() : '';
      const notes = notesInput ? notesInput.value.trim() : '';

      // Universal emojis via Unicode escapes (100% compatible on PC Windows, Mac, Android, and iOS)
      const emojiUser = '\u{1F464}';       // 👤
      const emojiEvent = '\u{1F389}';      // 🎉
      const emojiDate = '\u{1F4C5}';       // 📅
      const emojiGuests = '\u{1F465}';     // 👥
      const emojiLocation = '\u{1F4CD}';   // 📍

      let message = 'Hola buenas noches estoy interesado en esta cotizacion.';
      const details = [];
      if (name) details.push(`${emojiUser} *Anfitrion / Nombre:* ${name}`);
      if (type) details.push(`${emojiEvent} *Tipo de Evento:* ${type}`);
      if (date) details.push(`${emojiDate} *Fecha Tentativa:* ${date}`);
      if (guests) details.push(`${emojiGuests} *Aforo Estimado:* ${guests}`);
      if (notes) details.push(`${emojiLocation} *Locacion o Requerimientos:* ${notes}`);

      if (details.length > 0) {
        message += '\n\n' + details.join('\n');
      }

      const savedPhone = localStorage.getItem('dj_whatsapp_phone');
      const targetPhone = (savedPhone && savedPhone !== '593999999999') ? savedPhone : '593988242058';
      const cleanPhone = targetPhone.replace(/[^0-9]/g, '');
      window.open(`https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(message)}`, '_blank');
    });
  }

  console.log('DJ Platform Initialized successfully. Welcome to the booth.');
});
