/**
 * Tonight's Music / Soundscape Manager
 * Allows easy updating of active music genres for tonight's gig.
 */
class GenreManager {
  constructor() {
    this.storageKey = 'dj_tonight_genres_data';
    this.defaultData = {
      venue: 'Casa Cabaña — Arcos Plaza, Samborondón',
      dateStr: this.getTodayFormatted(),
      activeGenres: [
        'Afro House & Melodic',
        'Tech House Vanguardia',
        'Nu-Disco & Funk Grooves',
        'Deep House Exclusivo',
        'Latin House & Organic'
      ],
      vibeNote: 'Esta noche la atmósfera está curada para elevar la vibra con grooves elegantes y beats envolventes. Las peticiones deben armonizar con este concepto o activar el Salto VIP con aporte al DJ.'
    };

    this.allAvailableGenres = [
      'Afro House & Melodic',
      'Tech House Vanguardia',
      'Nu-Disco & Funk Grooves',
      'Deep House Exclusivo',
      'Latin House & Organic',
      'Melodic Techno',
      'Classic 80s & 90s Club Edits',
      'Vocal House & Anthems',
      'Reggaetón Selecto / VIP Mashups',
      'Indie Dance',
      'R&B & Hip Hop Chic'
    ];

    this.data = this.loadData();
    this.render();
  }

  getTodayFormatted() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    const formatted = today.toLocaleDateString('es-EC', options);
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }

  loadData() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        return Object.assign({}, this.defaultData, JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Error reading stored genres:', e);
    }
    return this.defaultData;
  }

  saveData(newData) {
    this.data = Object.assign({}, this.data, newData);
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    } catch (e) {
      console.warn('Error saving genres:', e);
    }
    this.render();
    window.dispatchEvent(new CustomEvent('dj:genres-updated', { detail: this.data }));
  }

  toggleGenre(genreName) {
    let list = [...this.data.activeGenres];
    const index = list.indexOf(genreName);
    if (index > -1) {
      list.splice(index, 1);
    } else {
      list.push(genreName);
    }
    this.saveData({ activeGenres: list });
  }

  addCustomGenre(genreName) {
    const trimmed = genreName.trim();
    if (!trimmed) return;
    if (!this.allAvailableGenres.includes(trimmed)) {
      this.allAvailableGenres.push(trimmed);
    }
    if (!this.data.activeGenres.includes(trimmed)) {
      const list = [...this.data.activeGenres, trimmed];
      this.saveData({ activeGenres: list });
    }
  }

  render() {
    // 1. Update Venue & Date
    const venueEl = document.getElementById('tonight-venue-name');
    if (venueEl) venueEl.textContent = this.data.venue;

    const heroVenueEl = document.getElementById('hero-venue-tag');
    if (heroVenueEl) heroVenueEl.textContent = this.data.venue;

    const dateEl = document.getElementById('tonight-date-display');
    if (dateEl) dateEl.textContent = this.data.dateStr || this.getTodayFormatted();

    // 2. Update Note
    const noteEl = document.getElementById('tonight-vibe-note');
    if (noteEl) noteEl.textContent = this.data.vibeNote;

    // 3. Render Genre Tags in Tonight Card
    const container = document.getElementById('tonight-genres-list');
    if (container) {
      container.innerHTML = '';
      if (this.data.activeGenres.length === 0) {
        container.innerHTML = '<span class="text-muted">Set Abierto / Selección Libre del DJ</span>';
      } else {
        this.data.activeGenres.forEach(genre => {
          const pill = document.createElement('div');
          pill.className = 'genre-tag';
          pill.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
            <span>${genre}</span>
          `;
          container.appendChild(pill);
        });
      }
    }
  }
}

window.GenreManager = GenreManager;
