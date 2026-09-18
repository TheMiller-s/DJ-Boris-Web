/**
 * QR Code Generator & Luxury Table Tent Printable Engine
 * Renders QR code locally on canvas and prepares printable bar standees.
 */
class QRManager {
  constructor() {
    this.qrContainer = document.getElementById('qr-canvas-display');
    this.printQrContainer = document.getElementById('tent-qr-canvas');
    this.qrUrlInput = document.getElementById('qr-custom-url');
    this.downloadBtn = document.getElementById('download-qr-btn');
    this.printBtn = document.getElementById('print-tent-btn');
    this.updateUrlBtn = document.getElementById('update-qr-url-btn');

    this.currentUrl = this.getInitialUrl();
    this.init();
  }

  getInitialUrl() {
    // If running on http/https, use window.location.href, else provide clean demo URL
    if (window.location.protocol.startsWith('http')) {
      return window.location.href.split('#')[0];
    }
    return 'https://djnoir-official.com/live';
  }

  init() {
    if (this.qrUrlInput) {
      this.qrUrlInput.value = this.currentUrl;
    }

    this.generateQR(this.currentUrl);

    if (this.updateUrlBtn) {
      this.updateUrlBtn.addEventListener('click', () => {
        const val = this.qrUrlInput.value.trim();
        if (val) {
          this.currentUrl = val;
          this.generateQR(this.currentUrl);
          this.showToast('Código QR actualizado con el nuevo enlace');
        }
      });
    }

    if (this.downloadBtn) {
      this.downloadBtn.addEventListener('click', () => this.downloadBrandedQR());
    }

    if (this.printBtn) {
      this.printBtn.addEventListener('click', () => {
        window.print();
      });
    }
  }

  generateQR(text) {
    if (typeof QRCode === 'undefined') {
      console.warn('QRCode library not ready');
      return;
    }

    // 1. Render on Landing Page preview (200x200)
    if (this.qrContainer) {
      this.qrContainer.innerHTML = '';
      new QRCode(this.qrContainer, {
        text: text,
        width: 200,
        height: 200,
        colorDark: "#070709",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    }

    // 2. Render on Printable Table Tent (240x240)
    if (this.printQrContainer) {
      this.printQrContainer.innerHTML = '';
      new QRCode(this.printQrContainer, {
        text: text,
        width: 240,
        height: 240,
        colorDark: "#070709",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    }
  }

  downloadBrandedQR() {
    // Generate a high-resolution 600x750 branded luxury card image
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 760;
    const ctx = canvas.getContext('2d');

    // Background: Rich Obsidian Black
    ctx.fillStyle = '#08080c';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Elegant Double Gold Border
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
    ctx.lineWidth = 1;
    ctx.strokeRect(28, 28, canvas.width - 56, canvas.height - 56);

    // Title / Monogram
    ctx.fillStyle = '#d4af37';
    ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '4px';
    ctx.fillText('DJ NOIR // THE RESIDENT', canvas.width / 2, 75);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '14px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('CASA CABAÑA • SAMBORONDÓN • EVENTOS PRIVADOS', canvas.width / 2, 105);

    // Divider Line
    ctx.strokeStyle = '#d4af37';
    ctx.beginPath();
    ctx.moveTo(150, 125);
    ctx.lineTo(450, 125);
    ctx.stroke();

    // Call to Action
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('ESCANEA PARA PEDIR TU CANCIÓN', canvas.width / 2, 165);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '15px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Descubre el Line-up de hoy y solicita tu música en vivo', canvas.width / 2, 195);

    // Get the QR code canvas from DOM
    const qrCanvas = this.qrContainer ? this.qrContainer.querySelector('canvas') : null;
    if (qrCanvas) {
      // White container background for QR
      const qrBoxX = (canvas.width - 320) / 2;
      const qrBoxY = 225;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(qrBoxX, qrBoxY, 320, 320, 16);
      ctx.fill();

      // Draw QR Canvas centered
      ctx.drawImage(qrCanvas, qrBoxX + 20, qrBoxY + 20, 280, 280);
    }

    // Rules summary below
    ctx.fillStyle = '#d4af37';
    ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('✦ PETICIONES EN VIVO A CABINA  |  💎 VIP BYPASS ($) ✦', canvas.width / 2, 600);

    ctx.fillStyle = '#64748b';
    ctx.font = '13px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('+25 Años de Trayectoria  •  Guayaquil - Samborondón - Salinas', canvas.width / 2, 650);

    // Trigger download
    const link = document.createElement('a');
    link.download = 'DJ-Noir-Cabina-QR-Luxury.png';
    link.href = canvas.toDataURL('image/png');
    link.click();

    this.showToast('✨ Imagen QR de alta definición descargada con éxito');
  }

  showToast(message) {
    if (window.requestManagerInstance) {
      window.requestManagerInstance.showToast(message);
    } else {
      alert(message);
    }
  }
}

window.QRManager = QRManager;
