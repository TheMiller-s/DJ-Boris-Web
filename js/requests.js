/**
 * Song Request Engine & Live Ordered Queue
 * Handles conditional version input, VIP rule bypass switch, and live queue ordering.
 */
class RequestManager {
  constructor() {
    this.storageKey = 'dj_live_song_requests';
    this.form = document.getElementById('song-request-form');
    this.queueContainer = document.getElementById('live-requests-queue');
    this.queueCountEl = document.getElementById('queue-count-badge');
    
    // Form Inputs
    this.songTitleInput = document.getElementById('req-song-title');
    this.artistInput = document.getElementById('req-artist');
    this.guestNameInput = document.getElementById('req-guest-name');
    this.tableLocationInput = document.getElementById('req-table-location');
    this.versionOriginalRadio = document.getElementById('version-original');
    this.versionPreferenceRadio = document.getElementById('version-preference');
    this.preferenceDetailsBox = document.getElementById('preference-details-box');
    this.preferenceTextInput = document.getElementById('req-preference-text');
    this.vipToggle = document.getElementById('vip-bypass-toggle');
    this.vipDesc = document.getElementById('vip-bypass-desc');
    
    this.requests = this.loadRequests();
    this.initEvents();
    this.renderQueue();
  }

  loadRequests() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Error reading stored requests:', e);
    }
    
    // Default seed requests so the queue is vibrant and shows the concept on first load
    return [
      {
        id: 101,
        song: 'Losing It',
        artist: 'Fisher',
        guest: 'Mesa VIP 3',
        versionType: 'original', // 'original' | 'preference'
        preferenceDetails: '',
        isVipBypass: false,
        status: 'playing', // 'waiting' | 'accepted' | 'playing' | 'completed'
        timestamp: 'Hace 8 min'
      },
      {
        id: 102,
        song: 'World Hold On',
        artist: 'Bob Sinclar & Fisher',
        guest: 'Barra Principal',
        versionType: 'preference',
        preferenceDetails: 'Rework Extended Mix 2024',
        isVipBypass: true,
        status: 'accepted',
        timestamp: 'Hace 4 min'
      },
      {
        id: 103,
        song: 'Mwaki',
        artist: 'Zerb, Sofiya Nzau',
        guest: 'Zona Lounge 2',
        versionType: 'original',
        preferenceDetails: '',
        isVipBypass: false,
        status: 'waiting',
        timestamp: 'Hace 2 min'
      }
    ];
  }

  saveRequests() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.requests));
    } catch (e) {
      console.warn('Error saving requests:', e);
    }
    this.renderQueue();
    window.dispatchEvent(new CustomEvent('dj:requests-updated', { detail: this.requests }));
  }

  initEvents() {
    // 1. Conditional Version Logic: Toggle visibility of preference text input
    if (this.versionOriginalRadio && this.versionPreferenceRadio) {
      const updateVersionVisibility = () => {
        if (this.versionPreferenceRadio.checked) {
          // Show the input container smoothly
          this.preferenceDetailsBox.classList.add('show');
          this.preferenceTextInput.setAttribute('required', 'true');
          setTimeout(() => this.preferenceTextInput.focus(), 150);
        } else {
          // Hide it completely as requested by the user
          this.preferenceDetailsBox.classList.remove('show');
          this.preferenceTextInput.removeAttribute('required');
          this.preferenceTextInput.value = '';
        }
      };

      this.versionOriginalRadio.addEventListener('change', updateVersionVisibility);
      this.versionPreferenceRadio.addEventListener('change', updateVersionVisibility);
    }

    // 2. VIP Rule Bypass Switch Interaction
    if (this.vipToggle && this.vipDesc) {
      this.vipToggle.addEventListener('change', () => {
        if (this.vipToggle.checked) {
          this.vipDesc.classList.add('visible');
        } else {
          this.vipDesc.classList.remove('visible');
        }
      });
    }

    // 3. Form Submission
    if (this.form) {
      this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSubmit();
      });
    }
  }

  handleSubmit() {
    const song = this.songTitleInput.value.trim();
    const artist = this.artistInput.value.trim();
    const guest = this.guestNameInput.value.trim() || 'Invitado';
    const table = this.tableLocationInput.value.trim() || '';
    const isPreference = this.versionPreferenceRadio.checked;
    const preferenceDetails = isPreference ? this.preferenceTextInput.value.trim() : '';
    const isVipBypass = this.vipToggle ? this.vipToggle.checked : false;

    if (!song) {
      alert('Por favor indica el título de la canción');
      return;
    }

    const guestLocation = table ? `${guest} (${table})` : guest;

    const newRequest = {
      id: Date.now(),
      song,
      artist: artist || 'Artista no especificado',
      guest: guestLocation,
      versionType: isPreference ? 'preference' : 'original',
      preferenceDetails,
      isVipBypass,
      status: isVipBypass ? 'accepted' : 'waiting',
      timestamp: 'Ahora mismo'
    };

    // Add to requests list (FIFO: added to queue)
    this.requests.push(newRequest);
    this.saveRequests();

    // Reset Form
    this.form.reset();
    if (this.versionOriginalRadio) this.versionOriginalRadio.checked = true;
    if (this.preferenceDetailsBox) this.preferenceDetailsBox.classList.remove('show');
    if (this.preferenceTextInput) {
      this.preferenceTextInput.removeAttribute('required');
      this.preferenceTextInput.value = '';
    }
    if (this.vipToggle) this.vipToggle.checked = false;
    if (this.vipDesc) this.vipDesc.classList.remove('visible');

    // Toast feedback
    this.showToast(
      isVipBypass 
        ? '💎 ¡Petición VIP recibida en cabina! Tu tema tiene prioridad.' 
        : '🎵 ¡Petición enviada a cabina con éxito! Se ha añadido a la cola.'
    );

    // Scroll to the queue item smoothly on mobile
    if (window.innerWidth < 768 && this.queueContainer) {
      this.queueContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  renderQueue() {
    if (!this.queueContainer) return;

    if (this.queueCountEl) {
      this.queueCountEl.textContent = `${this.requests.length} en fila`;
    }

    this.queueContainer.innerHTML = '';

    if (this.requests.length === 0) {
      this.queueContainer.innerHTML = `
        <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-dim);">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 0.75rem; opacity: 0.5;"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
          <p style="font-size: 0.95rem;">La cola de la cabina está vacía ahora mismo.</p>
          <p style="font-size: 0.8rem; margin-top: 0.25rem;">¡Sé el primero en enviar tu canción favorita!</p>
        </div>
      `;
      return;
    }

    // Enumerate strictly #1, #2, #3...
    this.requests.forEach((req, index) => {
      const orderNumber = index + 1;
      const isVip = req.isVipBypass;
      const isPlaying = req.status === 'playing';

      const itemEl = document.createElement('div');
      itemEl.className = `queue-item ${isVip ? 'is-vip' : ''} ${isPlaying ? 'is-playing' : ''}`;

      // Status pill config
      let statusLabel = 'En cola';
      let statusClass = 'status-waiting';
      if (req.status === 'playing') {
        statusLabel = '🔥 Sonando';
        statusClass = 'status-playing';
      } else if (req.status === 'accepted') {
        statusLabel = '✅ Aceptada';
        statusClass = 'status-accepted';
      } else if (req.status === 'completed') {
        statusLabel = '✨ Tocada';
        statusClass = 'status-waiting';
      }

      // Version tag display
      const versionTagHtml = req.versionType === 'preference' && req.preferenceDetails
        ? `<span class="queue-tag queue-tag-version">🎧 Versión: ${this.escapeHtml(req.preferenceDetails)}</span>`
        : `<span class="queue-tag">💿 Versión Original</span>`;

      // VIP Bypass tag
      const vipTagHtml = isVip
        ? `<span class="queue-tag queue-tag-vip">💎 VIP Bypass ($)</span>`
        : `<span class="queue-tag">🎶 Género de la Noche</span>`;

      itemEl.innerHTML = `
        <div class="queue-number">#${orderNumber}</div>
        <div class="queue-details">
          <div class="queue-song-title">${this.escapeHtml(req.song)}</div>
          <div class="queue-meta">
            <span><strong>${this.escapeHtml(req.artist)}</strong></span>
            <span>•</span>
            <span>${this.escapeHtml(req.guest)}</span>
            <span>•</span>
            <span>${req.timestamp || 'Hoy'}</span>
          </div>
          <div class="queue-meta" style="margin-top: 0.4rem;">
            ${versionTagHtml}
            ${vipTagHtml}
          </div>
        </div>
        <div class="queue-status ${statusClass}">${statusLabel}</div>
      `;

      this.queueContainer.appendChild(itemEl);
    });
  }

  escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  showToast(message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4af37" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span>${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
}

window.RequestManager = RequestManager;
