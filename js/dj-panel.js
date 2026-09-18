/**
 * DJ Booth Quick Control Panel (Modo Cabina)
 * Protected with quick PIN. Allows on-the-fly genre updates & live request queue management.
 */
class DJBoothPanel {
  constructor(genreManager, requestManager) {
    this.genreManager = genreManager;
    this.requestManager = requestManager;
    this.defaultPin = '1234';
    this.isUnlocked = false;

    this.modal = document.getElementById('dj-booth-modal');
    this.openBtn = document.getElementById('open-booth-btn');
    this.openFooterBtn = document.getElementById('open-booth-footer-btn');
    this.closeBtn = document.getElementById('close-booth-btn');

    this.pinScreen = document.getElementById('booth-pin-screen');
    this.panelScreen = document.getElementById('booth-panel-screen');
    this.pinInput = document.getElementById('booth-pin-input');
    this.pinSubmitBtn = document.getElementById('booth-pin-submit');

    // Controls
    this.venueInput = document.getElementById('booth-venue-input');
    this.noteInput = document.getElementById('booth-note-input');
    this.saveSettingsBtn = document.getElementById('booth-save-settings');
    this.genreChipsContainer = document.getElementById('booth-genre-chips');
    this.customGenreInput = document.getElementById('booth-custom-genre');
    this.addCustomGenreBtn = document.getElementById('booth-add-genre-btn');
    this.queueAdminContainer = document.getElementById('booth-queue-admin-list');
    this.clearQueueBtn = document.getElementById('booth-clear-queue-btn');

    this.initEvents();
  }

  initEvents() {
    const openModal = () => {
      this.modal.classList.add('open');
      if (this.isUnlocked) {
        this.showPanel();
      } else {
        this.showPinScreen();
      }
    };

    if (this.openBtn) this.openBtn.addEventListener('click', openModal);
    if (this.openFooterBtn) this.openFooterBtn.addEventListener('click', openModal);

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => {
        this.modal.classList.remove('open');
      });
    }

    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.modal.classList.remove('open');
        }
      });
    }

    if (this.pinSubmitBtn && this.pinInput) {
      this.pinSubmitBtn.addEventListener('click', () => this.verifyPin());
      this.pinInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') this.verifyPin();
      });
    }

    if (this.saveSettingsBtn) {
      this.saveSettingsBtn.addEventListener('click', () => {
        const newVenue = this.venueInput.value.trim();
        const newNote = this.noteInput.value.trim();
        this.genreManager.saveData({
          venue: newVenue || this.genreManager.data.venue,
          vibeNote: newNote || this.genreManager.data.vibeNote
        });
        this.toast('Ajustes de cabina guardados exitosamente');
      });
    }

    if (this.addCustomGenreBtn && this.customGenreInput) {
      this.addCustomGenreBtn.addEventListener('click', () => {
        const val = this.customGenreInput.value.trim();
        if (val) {
          this.genreManager.addCustomGenre(val);
          this.customGenreInput.value = '';
          this.renderGenreChips();
          this.toast(`Género "${val}" agregado`);
        }
      });
    }

    if (this.clearQueueBtn) {
      this.clearQueueBtn.addEventListener('click', () => {
        if (confirm('¿Deseas reiniciar la cola de peticiones para comenzar una nueva noche?')) {
          this.requestManager.requests = [];
          this.requestManager.saveRequests();
          this.renderAdminQueue();
          this.toast('Cola reiniciada para la nueva noche');
        }
      });
    }

    window.addEventListener('dj:requests-updated', () => {
      if (this.isUnlocked) {
        this.renderAdminQueue();
      }
    });
  }

  showPinScreen() {
    this.pinScreen.style.display = 'block';
    this.panelScreen.style.display = 'none';
    this.pinInput.value = '';
    setTimeout(() => this.pinInput.focus(), 150);
  }

  verifyPin() {
    const pin = this.pinInput.value.trim();
    if (pin === this.defaultPin) {
      this.isUnlocked = true;
      this.showPanel();
    } else {
      alert('PIN incorrecto. (PIN de fábrica: 1234)');
      this.pinInput.value = '';
    }
  }

  showPanel() {
    this.pinScreen.style.display = 'none';
    this.panelScreen.style.display = 'block';

    if (this.venueInput) this.venueInput.value = this.genreManager.data.venue;
    if (this.noteInput) this.noteInput.value = this.genreManager.data.vibeNote;

    this.renderGenreChips();
    this.renderAdminQueue();
  }

  renderGenreChips() {
    if (!this.genreChipsContainer) return;
    this.genreChipsContainer.innerHTML = '';

    const activeList = this.genreManager.data.activeGenres;
    const allList = this.genreManager.allAvailableGenres;

    allList.forEach(genre => {
      const isActive = activeList.includes(genre);
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = `chip-btn ${isActive ? 'active' : ''}`;
      chip.innerHTML = `${isActive ? '✓ ' : '+ '} ${genre}`;

      chip.addEventListener('click', () => {
        this.genreManager.toggleGenre(genre);
        this.renderGenreChips();
      });

      this.genreChipsContainer.appendChild(chip);
    });
  }

  renderAdminQueue() {
    if (!this.queueAdminContainer) return;
    this.queueAdminContainer.innerHTML = '';

    const list = this.requestManager.requests;
    if (list.length === 0) {
      this.queueAdminContainer.innerHTML = '<p class="text-dim" style="font-size: 0.9rem; padding: 1rem 0;">No hay peticiones en cola actualmente.</p>';
      return;
    }

    list.forEach((req, idx) => {
      const card = document.createElement('div');
      card.className = 'glass-panel';
      card.style.padding = '0.9rem 1.1rem';
      card.style.marginBottom = '0.75rem';
      card.style.display = 'flex';
      card.style.alignItems = 'center';
      card.style.justifyContent = 'space-between';
      card.style.gap = '0.75rem';

      const isVip = req.isVipBypass;
      const verText = req.versionType === 'preference' ? `[Preferida: ${req.preferenceDetails}]` : '[Original]';

      card.innerHTML = `
        <div style="min-width: 0;">
          <div style="font-weight: 700; font-size: 0.95rem; color: #fff;">
            #${idx + 1} ${req.song} <span style="font-size: 0.8rem; color: var(--gold-light);">${verText}</span>
            ${isVip ? '<span class="badge badge-vip" style="font-size: 0.65rem; padding: 0.1rem 0.4rem;">VIP $</span>' : ''}
          </div>
          <div style="font-size: 0.8rem; color: var(--text-muted);">
            ${req.artist} • ${req.guest} • Estado: <strong>${req.status}</strong>
          </div>
        </div>
        <div style="display: flex; gap: 0.4rem; flex-shrink: 0;">
          <button type="button" class="btn btn-sm btn-primary-gold" title="Sonando Ahora" data-action="play" data-id="${req.id}" style="padding: 0.35rem 0.7rem; font-size: 0.75rem;">
            🔥 Tocar
          </button>
          <button type="button" class="btn btn-sm btn-secondary" title="Aceptar" data-action="accept" data-id="${req.id}" style="padding: 0.35rem 0.6rem; font-size: 0.75rem;">
            ✓
          </button>
          <button type="button" class="btn btn-sm btn-secondary" title="Completada" data-action="done" data-id="${req.id}" style="padding: 0.35rem 0.6rem; font-size: 0.75rem;">
            ✨
          </button>
          <button type="button" class="btn btn-sm" title="Eliminar" data-action="delete" data-id="${req.id}" style="background: rgba(244,63,94,0.15); color: #f43f5e; padding: 0.35rem 0.6rem; font-size: 0.75rem;">
            ✕
          </button>
        </div>
      `;

      // Action Handlers
      card.querySelectorAll('button[data-action]').forEach(btn => {
        btn.addEventListener('click', () => {
          const action = btn.dataset.action;
          const reqId = parseInt(btn.dataset.id);
          this.handleQueueAction(action, reqId);
        });
      });

      this.queueAdminContainer.appendChild(card);
    });
  }

  handleQueueAction(action, reqId) {
    const list = this.requestManager.requests;
    const item = list.find(r => r.id === reqId);
    if (!item) return;

    if (action === 'play') {
      list.forEach(r => {
        if (r.status === 'playing') r.status = 'accepted';
      });
      item.status = 'playing';
      this.toast(`Ahora tocando: "${item.song}"`);
    } else if (action === 'accept') {
      item.status = 'accepted';
    } else if (action === 'done') {
      item.status = 'completed';
    } else if (action === 'delete') {
      const idx = list.findIndex(r => r.id === reqId);
      if (idx > -1) list.splice(idx, 1);
    }

    this.requestManager.saveRequests();
    this.renderAdminQueue();
  }

  toast(msg) {
    if (this.requestManager) {
      this.requestManager.showToast(msg);
    }
  }
}

window.DJBoothPanel = DJBoothPanel;
