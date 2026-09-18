/* --- GLOBAL DIRECT FUNCTIONS FOR DJ BOOTH MODAL (OPEN / CLOSE) --- */
  window.openDJBoothModal = function() {
    const modal = document.getElementById('dj-booth-modal');
    if (!modal) return;
    modal.classList.add('open');
    modal.style.setProperty('display', 'flex', 'important');
    modal.style.setProperty('opacity', '1', 'important');
    modal.style.setProperty('pointer-events', 'auto', 'important');
    document.body.style.overflow = 'hidden';

    try {
      if (window.location.hash !== '#cabina-dj') {
        if (window.history && window.history.pushState) {
          window.history.pushState(null, '', '#cabina-dj');
        } else {
          window.location.hash = 'cabina-dj';
        }
      }
    } catch(e) {}

    if (window.djPanelInstance) {
      if (window.djPanelInstance.isUnlocked) {
        window.djPanelInstance.showPanel();
      } else {
        window.djPanelInstance.showLoginScreen();
      }
    } else {
      const loginScreen = document.getElementById('booth-login-screen');
      const panelScreen = document.getElementById('booth-panel-screen');
      if (loginScreen) loginScreen.style.display = 'block';
      if (panelScreen) panelScreen.style.display = 'none';
      const userInput = document.getElementById('booth-username-input');
      if (userInput) setTimeout(() => userInput.focus(), 120);
    }
  };

  window.closeDJBoothModal = function() {
    const modal = document.getElementById('dj-booth-modal');
    if (!modal) return;
    modal.classList.remove('open');
    modal.style.setProperty('display', 'none', 'important');
    modal.style.setProperty('opacity', '0', 'important');
    modal.style.setProperty('pointer-events', 'none', 'important');
    document.body.style.overflow = '';

    try {
      if (window.location.hash === '#cabina-dj') {
        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
        } else {
          window.location.hash = '';
        }
      }
    } catch(e) {}
  };

  window.addEventListener('hashchange', function() {
    if (window.location.hash === '#cabina-dj') {
      window.openDJBoothModal();
    } else {
      const modal = document.getElementById('dj-booth-modal');
      if (modal && modal.classList.contains('open')) {
        window.closeDJBoothModal();
      }
    }
  });

  if (window.location.hash === '#cabina-dj') {
    setTimeout(function() { window.openDJBoothModal(); }, 150);
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      window.closeDJBoothModal();
    }
  });

  /* --- HELPER FUNCTIONS FOR BOOTH LOGIN --- */
  window.selectLoginAccount = function(username) {
    const userInput = document.getElementById('booth-username-input');
    const passInput = document.getElementById('booth-password-input');
    if (userInput) userInput.value = username;
    if (passInput) {
      passInput.focus();
      passInput.select();
    }
  };

  window.togglePasswordVisibility = function() {
    const passInput = document.getElementById('booth-password-input');
    const toggleBtn = document.getElementById('toggle-password-visibility');
    if (!passInput) return;
    if (passInput.type === 'password') {
      passInput.type = 'text';
      if (toggleBtn) toggleBtn.textContent = '🙈';
    } else {
      passInput.type = 'password';
      if (toggleBtn) toggleBtn.textContent = '👁️';
    }
  };

  /* --- GLOBAL DIRECT FUNCTION FOR CONDITIONAL VERSION FIELD --- */
  function toggleVersionPreference(isPreference) {
    const box = document.getElementById('preference-details-box');
    const input = document.getElementById('req-preference-text');
    const cardOrig = document.getElementById('card-version-original');
    const cardPref = document.getElementById('card-version-preference');
    const radioOrig = document.getElementById('version-original');
    const radioPref = document.getElementById('version-preference');

    if (isPreference) {
      if (radioPref) radioPref.checked = true;
      if (box) {
        box.style.setProperty('display', 'block', 'important');
        box.classList.add('show');
      }
      if (input) {
        input.setAttribute('required', 'true');
        setTimeout(() => input.focus(), 60);
      }
    } else {
      if (radioOrig) radioOrig.checked = true;
      if (box) {
        box.style.setProperty('display', 'none', 'important');
        box.classList.remove('show');
      }
      if (input) {
        input.removeAttribute('required');
        input.value = '';
      }
    }
  }

  function handleVersionCardClick(isPreference) {
    toggleVersionPreference(isPreference);
  }

  /* --- 1. STANDALONE AUTO-SCALING QR ENGINE (QRCode.js inline) --- */
  var QRCode;(function(){function QR8bitByte(a){this.mode=QRMode.MODE_8BIT_BYTE;this.data=a}QR8bitByte.prototype={getLength:function(){return this.data.length},write:function(a){for(var b=0;b<this.data.length;b++)a.put(this.data.charCodeAt(b),8)}};var QRMode={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},QRErrorCorrectLevel={L:1,M:0,Q:3,H:2},QRMaskPattern={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},QRUtil={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],getBCHTypeInfo:function(a){for(var b=a<<10;QRUtil.getBCHDigit(b)-QRUtil.getBCHDigit(1335)>=0;)b^=1335<<(QRUtil.getBCHDigit(b)-QRUtil.getBCHDigit(1335));return(a<<10|b)^21522},getBCHTypeNumber:function(a){for(var b=a<<12;QRUtil.getBCHDigit(b)-QRUtil.getBCHDigit(7973)>=0;)b^=7973<<(QRUtil.getBCHDigit(b)-QRUtil.getBCHDigit(7973));return a<<12|b},getBCHDigit:function(a){for(var b=0;0!=a;)b++,a>>>=1;return b},getPatternPosition:function(a){return QRUtil.PATTERN_POSITION_TABLE[a-1]},getMask:function(a,b,c){switch(a){case 0:return(b+c)%2===0;case 1:return b%2===0;case 2:return c%3===0;case 3:return(b+c)%3===0;case 4:return(Math.floor(b/2)+Math.floor(c/3))%2===0;case 5:return b*c%2+b*c%3===0;case 6:return(b*c%2+b*c%3)%2===0;case 7:return(b*c%3+(b+c)%2)%2===0;default:throw new Error("bad maskPattern:"+a)}},getErrorCorrectPolynomial:function(a){for(var b=new QRPolynomial([1],0),c=0;c<a;c++)b=b.multiply(new QRPolynomial([1,QRMath.gexp(c)],0));return b},getLengthInBits:function(a,b){if(1<=b&&b<10)switch(a){case QRMode.MODE_NUMBER:return 10;case QRMode.MODE_ALPHA_NUM:return 9;case QRMode.MODE_8BIT_BYTE:return 8;case QRMode.MODE_KANJI:return 8;default:throw new Error("mode:"+a)}else if(b<27)switch(a){case QRMode.MODE_NUMBER:return 12;case QRMode.MODE_ALPHA_NUM:return 11;case QRMode.MODE_8BIT_BYTE:return 16;case QRMode.MODE_KANJI:return 10;default:throw new Error("mode:"+a)}else{if(!(b<41))throw new Error("type:"+b);switch(a){case QRMode.MODE_NUMBER:return 14;case QRMode.MODE_ALPHA_NUM:return 13;case QRMode.MODE_8BIT_BYTE:return 16;case QRMode.MODE_KANJI:return 12;default:throw new Error("mode:"+a)}}},getLostPoint:function(a){for(var b=a.getModuleCount(),c=0,d=0;d<b;d++)for(var e=0;e<b;e++){for(var f=0,g=a.isDark(d,e),h=-1;h<=1;h++)if(!(d+h<0||b<=d+h))for(var i=-1;i<=1;i++)e+i<0||b<=e+i||0===h&&0===i||g===a.isDark(d+h,e+i)&&f++;f>5&&(c+=3+f-5)}for(var j=0;j<b-1;j++)for(var k=0;k<b-1;k++){var l=0;a.isDark(j,k)&&l++,a.isDark(j+1,k)&&l++,a.isDark(j,k+1)&&l++,a.isDark(j+1,k+1)&&l++,(0===l||4===l)&&(c+=3)}return c}},QRMath={glog:function(a){if(a<1)throw new Error("glog("+a+")");return QRMath.LOG_TABLE[a]},gexp:function(a){for(;a<0;)a+=255;for(;a>=255;)a-=255;return QRMath.EXP_TABLE[a]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)};for(var i=0;i<8;i++)QRMath.EXP_TABLE[i]=1<<i;for(var i=8;i<256;i++)QRMath.EXP_TABLE[i]=QRMath.EXP_TABLE[i-4]^QRMath.EXP_TABLE[i-5]^QRMath.EXP_TABLE[i-6]^QRMath.EXP_TABLE[i-8];for(var i=0;i<255;i++)QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]]=i;function QRPolynomial(a,b){if(void 0===a.length)throw new Error(a.length+"/"+b);for(var c=0;c<a.length&&0===a[c];)c++;this.num=new Array(a.length-c+b);for(var d=0;d<a.length-c;d++)this.num[d]=a[d+c]}QRPolynomial.prototype={get:function(a){return this.num[a]},getLength:function(){return this.num.length},multiply:function(a){for(var b=new Array(this.getLength()+a.getLength()-1),c=0;c<this.getLength();c++)for(var d=0;d<a.getLength();d++)b[c+d]^=QRMath.gexp(QRMath.glog(this.get(c))+QRMath.glog(a.get(d)));return new QRPolynomial(b,0)},mod:function(a){if(this.getLength()-a.getLength()<0)return this;for(var b=QRMath.glog(this.get(0))-QRMath.glog(a.get(0)),c=new Array(this.getLength()),d=0;d<this.getLength();d++)c[d]=this.get(d);for(var e=0;e<a.getLength();e++)c[e]^=QRMath.gexp(QRMath.glog(a.get(e))+b);return new QRPolynomial(c,0).mod(a)}};function QRRSBlock(a,b){this.totalCount=a,this.dataCount=b}QRRSBlock.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16]];QRRSBlock.getRSBlocks=function(a,b){var c=QRRSBlock.getRsBlockTable(a,b);if(void 0===c)throw new Error("bad rs block @ typeNumber:"+a+"/errorCorrectLevel:"+b);for(var d=c.length/3,e=[],f=0;f<d;f++)for(var g=c[3*f+0],h=c[3*f+1],i=c[3*f+2],j=0;j<g;j++)e.push(new QRRSBlock(h,i));return e};QRRSBlock.getRsBlockTable=function(a,b){switch(b){case QRErrorCorrectLevel.L:return QRRSBlock.RS_BLOCK_TABLE[4*(a-1)+0];case QRErrorCorrectLevel.M:return QRRSBlock.RS_BLOCK_TABLE[4*(a-1)+1];case QRErrorCorrectLevel.Q:return QRRSBlock.RS_BLOCK_TABLE[4*(a-1)+2];case QRErrorCorrectLevel.H:return QRRSBlock.RS_BLOCK_TABLE[4*(a-1)+3];default:return}};function QRBitBuffer(){this.buffer=[],this.length=0}QRBitBuffer.prototype={get:function(a){var b=Math.floor(a/8);return 1==(this.buffer[b]>>>7-a%8&1)},put:function(a,b){for(var c=0;c<b;c++)this.putBit(1==(a>>>b-c-1&1))},getLengthInBits:function(){return this.length},putBit:function(a){var b=Math.floor(this.length/8);this.buffer.length<=b&&this.buffer.push(0),a&&(this.buffer[b]|=128>>>this.length%8),this.length++}};function QRCodeModel(a,b){this.typeNumber=a,this.errorCorrectLevel=b,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}QRCodeModel.prototype={addData:function(a){this.dataList.push(new QR8bitByte(a)),this.dataCache=null},isDark:function(a,b){return this.modules[a][b]},getModuleCount:function(){return this.moduleCount},make:function(){if(this.typeNumber<1){for(var a=1;a<40;a++){var b=QRRSBlock.getRSBlocks(a,this.errorCorrectLevel);var c=new QRBitBuffer;var d=0;for(var e=0;e<b.length;e++)d+=b[e].dataCount;for(var f=0;f<this.dataList.length;f++){var g=this.dataList[f];c.put(g.mode,4);c.put(g.getLength(),QRUtil.getLengthInBits(g.mode,a));g.write(c);}if(c.getLengthInBits()<=8*d)break;}this.typeNumber=a;}this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(a,b){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var c=0;c<this.moduleCount;c++){this.modules[c]=new Array(this.moduleCount);for(var d=0;d<this.moduleCount;d++)this.modules[c][d]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(a,b),this.typeNumber>=7&&this.setupTypeNumber(a),null==this.dataCache&&(this.dataCache=QRCodeModel.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,b)},setupPositionProbePattern:function(a,b){for(var c=-1;c<=7;c++)if(!(a+c<=-1||this.moduleCount<=a+c))for(var d=-1;d<=7;d++)b+d<=-1||this.moduleCount<=b+d||(this.modules[a+c][b+d]=0<=c&&c<=6&&(0===d||6===d)||0<=d&&d<=6&&(0===c||6===c)||2<=c&&c<=4&&2<=d&&d<=4)},getBestMaskPattern:function(){for(var a=0,b=0,c=0;c<8;c++){this.makeImpl(!0,c);var d=QRUtil.getLostPoint(this);(0===c||a>d)&&(a=d,b=c)}return b},setupTimingPattern:function(){for(var a=8;a<this.moduleCount-8;a++)null==this.modules[a][6]&&(this.modules[a][6]=a%2===0);for(var b=8;b<this.moduleCount-8;b++)null==this.modules[6][b]&&(this.modules[6][b]=b%2===0)},setupPositionAdjustPattern:function(){for(var a=QRUtil.getPatternPosition(this.typeNumber),b=0;b<a.length;b++)for(var c=0;c<a.length;c++){var d=a[b],e=a[c];if(null==this.modules[d][e])for(var f=-2;f<=2;f++)for(var g=-2;g<=2;g++)this.modules[d+f][e+g]=-2===f||2===f||-2===g||2===g||0===f&&0===g}},setupTypeNumber:function(a){for(var b=QRUtil.getBCHTypeNumber(this.typeNumber),c=0;c<18;c++){var d=!a&&1==(b>>c&1);this.modules[Math.floor(c/3)][c%3+this.moduleCount-8-3]=d,this.modules[c%3+this.moduleCount-8-3][Math.floor(c/3)]=d}},setupTypeInfo:function(a,b){for(var c=this.errorCorrectLevel<<3|b,d=QRUtil.getBCHTypeInfo(c),e=0;e<15;e++){var f=!a&&1==(d>>e&1);e<6?this.modules[e][8]=f:e<8?this.modules[e+1][8]=f:this.modules[this.moduleCount-15+e][8]=f,e<8?this.modules[8][this.moduleCount-e-1]=f:e<9?this.modules[8][15-e-1+1]=f:this.modules[8][15-e-1]=f}this.modules[this.moduleCount-8][8]=!a},mapData:function(a,b){for(var c=-1,d=this.moduleCount-1,e=7,f=0,g=this.moduleCount-1;g>0;g-=2){6===g&&g--;for(;;){for(var h=0;h<2;h++)if(null==this.modules[d][g-h]){var i=!1;f<a.length&&(i=1==(a[f]>>>e&1));var j=QRUtil.getMask(b,d,g-h);j&&(i=!i),this.modules[d][g-h]=i,e--,-1===e&&(f++,e=7)}if((d+=c)<0||this.moduleCount<=d){d-=c,c=-c;break}}}}};QRCodeModel.createData=function(a,b,c){for(var d=QRRSBlock.getRSBlocks(a,b),e=new QRBitBuffer,f=0;f<c.length;f++){var g=c[f];e.put(g.mode,4),e.put(g.getLength(),QRUtil.getLengthInBits(g.mode,a)),g.write(e)}for(var h=0,i=0;i<d.length;i++)h+=d[i].dataCount;if(e.getLengthInBits()>8*h)throw new Error("code length overflow. ("+e.getLengthInBits()+">"+8*h+")");for(e.getLengthInBits()+4<=8*h&&e.put(0,4);e.getLengthInBits()%8!=0;)e.putBit(!1);for(;;){if(e.getLengthInBits()>=8*h)break;if(e.put(236,8),e.getLengthInBits()>=8*h)break;e.put(17,8)}return QRCodeModel.createBytes(e,d)};QRCodeModel.createBytes=function(a,b){for(var c=0,d=0,e=0,f=new Array(b.length),g=new Array(b.length),h=0;h<b.length;h++){var i=b[h].dataCount,j=b[h].totalCount-i;d=Math.max(d,i),e=Math.max(e,j),f[h]=new Array(i);for(var k=0;k<f[h].length;k++)f[h][k]=255&a.buffer[k+c];c+=i;var l=QRUtil.getErrorCorrectPolynomial(j),m=new QRPolynomial(f[h],l.getLength()-1),n=m.mod(l);g[h]=new Array(l.getLength()-1);for(var o=0;o<g[h].length;o++){var p=o+n.getLength()-g[h].length;g[h][o]=p>=0?n.get(p):0}}for(var q=0,r=0;r<b.length;r++)q+=b[r].totalCount;for(var s=new Array(q),t=0,u=0;u<d;u++)for(var v=0;v<b.length;v++)u<f[v].length&&(s[t]=f[v][u],t++);for(var w=0;w<e;w++)for(var x=0;x<b.length;x++)w<g[x].length&&(s[t]=g[x][w],t++);return s};QRCode=function(a,b){this._htOption={width:256,height:256,typeNumber:0,colorDark:"#000000",colorLight:"#ffffff",correctLevel:QRErrorCorrectLevel.M},"string"==typeof b?this._htOption.text=b:b&&(b.text&&(this._htOption.text=b.text),b.width&&(this._htOption.width=b.width),b.height&&(this._htOption.height=b.height)),"string"==typeof a&&(a=document.getElementById(a)),this._el=a,this._htOption.text&&this.makeCode(this._htOption.text)};QRCode.prototype.makeCode=function(a){var b=new QRCodeModel(0,this._htOption.correctLevel);b.addData(a),b.make();var c=document.createElement("canvas");c.width=this._htOption.width,c.height=this._htOption.height;var d=c.getContext("2d"),e=b.getModuleCount(),f=this._htOption.width/e,g=this._htOption.height/e;d.fillStyle=this._htOption.colorLight,d.fillRect(0,0,this._htOption.width,this._htOption.height),d.fillStyle=this._htOption.colorDark;for(var h=0;h<e;h++)for(var i=0;i<e;i++)b.isDark(h,i)&&d.fillRect(Math.round(i*f),Math.round(h*g),Math.ceil(f),Math.ceil(g));this._el.innerHTML="",this._el.appendChild(c)};QRCode.CorrectLevel=QRErrorCorrectLevel;})();

  /* --- 2. INDEXEDDB LOCAL AUDIO STORAGE ENGINE --- */
  class DJAudioStorage {
    constructor() {
      this.dbName = 'DJBorisAudioDB';
      this.storeName = 'audio_store';
      this.db = null;
    }
    openDB() {
      if (this.db) return Promise.resolve(this.db);
      return new Promise((resolve) => {
        if (!window.indexedDB) return resolve(null);
        try {
          const request = window.indexedDB.open(this.dbName, 1);
          request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(this.storeName)) {
              db.createObjectStore(this.storeName, { keyPath: 'id' });
            }
          };
          request.onsuccess = (e) => {
            this.db = e.target.result;
            resolve(this.db);
          };
          request.onerror = () => resolve(null);
        } catch(err) {
          resolve(null);
        }
      });
    }
    async saveAudio(blob, filename, title) {
      const db = await this.openDB();
      if (!db) return false;
      return new Promise((resolve) => {
        try {
          const tx = db.transaction(this.storeName, 'readwrite');
          const store = tx.objectStore(this.storeName);
          const mimeType = blob.type || (filename.toLowerCase().endsWith('.wav') ? 'audio/wav' : (filename.toLowerCase().endsWith('.m4a') ? 'audio/mp4' : 'audio/mpeg'));
          const safeBlob = blob.type ? blob : new Blob([blob], { type: mimeType });
          const cleanTitle = (title || filename.replace(/\.[^/.]+$/, "")).trim();
          const data = {
            id: 'current_custom_track',
            blob: safeBlob,
            name: filename,
            title: cleanTitle,
            timestamp: Date.now(),
            size: safeBlob.size
          };
          const req = store.put(data);
          req.onsuccess = () => resolve(true);
          req.onerror = () => resolve(false);
        } catch (e) {
          resolve(false);
        }
      });
    }
    async getAudio() {
      const db = await this.openDB();
      if (!db) return null;
      return new Promise((resolve) => {
        try {
          const tx = db.transaction(this.storeName, 'readonly');
          const store = tx.objectStore(this.storeName);
          const req = store.get('current_custom_track');
          req.onsuccess = () => resolve(req.result || null);
          req.onerror = () => resolve(null);
        } catch (e) {
          resolve(null);
        }
      });
    }
    async removeAudio() {
      const db = await this.openDB();
      if (!db) return false;
      return new Promise((resolve) => {
        try {
          const tx = db.transaction(this.storeName, 'readwrite');
          const store = tx.objectStore(this.storeName);
          const req = store.delete('current_custom_track');
          req.onsuccess = () => resolve(true);
          req.onerror = () => resolve(false);
        } catch (e) {
          resolve(false);
        }
      });
    }
  }
  const djAudioStorage = new DJAudioStorage();
  window.djAudioStorage = djAudioStorage;

  /* --- 2.5 REAL-TIME SYNCHRONIZATION ENGINE (CELULAR ⇄ PC VIA BROADCASTCHANNEL & WEBRTC DATACHANNEL) --- */
  class DJRealtimeSyncEngine {
    constructor() {
      this.channelName = 'dj_boris_realtime_sync_v1';
      this.channel = null;
      this.peer = null;
      this.peerConnections = [];
      this.lastHandledTs = 0;
      this.primaryPeerId = 'dj-boris-live-hub-2026';

      this.initBroadcastChannel();
      this.initStorageListener();
      this.initWebRTC();
    }

    initBroadcastChannel() {
      if (typeof BroadcastChannel !== 'undefined') {
        try {
          this.channel = new BroadcastChannel(this.channelName);
          this.channel.onmessage = (e) => {
            if (e && e.data) {
              this.handleIncomingMessage(e.data, 'broadcast');
            }
          };
        } catch (e) {
          console.warn('[RealtimeSync] BroadcastChannel unavailable', e);
        }
      }
    }

    initStorageListener() {
      window.addEventListener('storage', (e) => {
        if (e.key === 'dj_realtime_sync_event' && e.newValue) {
          try {
            const data = JSON.parse(e.newValue);
            this.handleIncomingMessage(data, 'storage');
          } catch (err) {}
        }
      });
    }

    initWebRTC() {
      if (typeof Peer === 'undefined') return;
      try {
        this.peer = new Peer(this.primaryPeerId, {
          debug: 0,
          config: {
            iceServers: [
              { urls: 'stun:stun.l.google.com:19302' },
              { urls: 'stun:global.stun.twilio.com:3478' }
            ]
          }
        });

        this.peer.on('open', () => {
          this.updateStatusUI();
        });

        this.peer.on('connection', (conn) => {
          this.setupPeerConnection(conn, true);
        });

        this.peer.on('error', (err) => {
          if (err && err.type === 'unavailable-id') {
            if (this.peer) {
              try { this.peer.destroy(); } catch (e) {}
            }
            this.initWebRTCClient();
          }
        });
      } catch (e) {
        console.warn('[RealtimeSync] WebRTC init fallback', e);
      }
    }

    initWebRTCClient() {
      try {
        this.peer = new Peer({
          debug: 0,
          config: {
            iceServers: [
              { urls: 'stun:stun.l.google.com:19302' },
              { urls: 'stun:global.stun.twilio.com:3478' }
            ]
          }
        });

        this.peer.on('open', () => {
          const conn = this.peer.connect(this.primaryPeerId, { reliable: true });
          this.setupPeerConnection(conn, false);
        });

        this.peer.on('error', () => {
          // Graceful fallback to BroadcastChannel and IndexedDB
        });
      } catch (e) {}
    }

    setupPeerConnection(conn, isHost) {
      if (!conn) return;
      conn.on('open', () => {
        if (!this.peerConnections.includes(conn)) {
          this.peerConnections.push(conn);
        }
        this.updateStatusUI();
      });

      conn.on('data', (data) => {
        this.handleIncomingMessage(data, 'webrtc');
        if (isHost && this.peerConnections.length > 1) {
          this.peerConnections.forEach((other) => {
            if (other !== conn && other.open) {
              try { other.send(data); } catch (e) {}
            }
          });
        }
      });

      conn.on('close', () => {
        this.peerConnections = this.peerConnections.filter(c => c !== conn);
        this.updateStatusUI();
      });

      conn.on('error', () => {
        this.peerConnections = this.peerConnections.filter(c => c !== conn);
        this.updateStatusUI();
      });
    }

    sendToPeers(payload) {
      this.peerConnections.forEach(conn => {
        if (conn && conn.open) {
          try { conn.send(payload); } catch (e) {}
        }
      });
    }

    updateStatusUI() {
      const statusText = document.getElementById('booth-realtime-status-text');
      if (!statusText) return;

      const activePeers = this.peerConnections.filter(c => c && c.open).length;
      if (activePeers > 0) {
        statusText.textContent = `Sincronización Celular ⇄ PC: Conectado (${activePeers} dispositivo${activePeers > 1 ? 's' : ''} en vivo)`;
      } else {
        statusText.textContent = 'Sincronización Celular ⇄ PC: Enlace Activo en Tiempo Real';
      }
    }

    async broadcastAudioFile(file, filename, title) {
      const ts = Date.now();
      this.lastHandledTs = ts;

      // 1. BroadcastChannel (transfers native Blob/File directly with 0ms latency)
      if (this.channel) {
        try {
          this.channel.postMessage({
            type: 'AUDIO_UPLOADED',
            filename: filename,
            title: title,
            size: file.size,
            blob: file,
            timestamp: ts
          });
        } catch (e) {}
      }

      // 2. LocalStorage signal fallback
      try {
        localStorage.setItem('dj_realtime_sync_event', JSON.stringify({
          type: 'AUDIO_UPLOADED_SIGNAL',
          filename: filename,
          title: title,
          size: file.size,
          timestamp: ts
        }));
      } catch (e) {}

      // 3. WebRTC DataChannel for cross-device peer
      if (this.peerConnections.length > 0) {
        try {
          const arrayBuffer = await file.arrayBuffer();
          this.sendToPeers({
            type: 'AUDIO_UPLOADED',
            filename: filename,
            title: title,
            size: file.size,
            buffer: arrayBuffer,
            mime: file.type || 'audio/mp3',
            timestamp: ts
          });
        } catch (e) {}
      }
    }

    broadcastAudioRemoved() {
      const ts = Date.now();
      this.lastHandledTs = ts;

      const payload = { type: 'AUDIO_REMOVED', timestamp: ts };
      if (this.channel) {
        try { this.channel.postMessage(payload); } catch (e) {}
      }
      try {
        localStorage.setItem('dj_realtime_sync_event', JSON.stringify(payload));
      } catch (e) {}
      this.sendToPeers(payload);
    }

    broadcastPlayState(isPlaying, currentTime = 0) {
      const ts = Date.now();
      const payload = {
        type: 'PLAY_STATE',
        isPlaying: !!isPlaying,
        currentTime: currentTime,
        timestamp: ts
      };
      if (this.channel) {
        try { this.channel.postMessage(payload); } catch (e) {}
      }
      try {
        localStorage.setItem('dj_realtime_sync_event', JSON.stringify(payload));
      } catch (e) {}
      this.sendToPeers(payload);
    }

    async handleIncomingMessage(data, source) {
      if (!data || !data.type) return;

      // Ignore echoes from self
      if (data.timestamp && this.lastHandledTs && Math.abs(data.timestamp - this.lastHandledTs) < 80) {
        return;
      }
      if (data.timestamp) this.lastHandledTs = data.timestamp;

      if (data.type === 'AUDIO_UPLOADED') {
        let blob = data.blob;
        if (!blob && data.buffer) {
          blob = new Blob([data.buffer], { type: data.mime || 'audio/mp3' });
        }
        if (blob) {
          await djAudioStorage.saveAudio(blob, data.filename, data.title);
          if (data.title) {
            try { localStorage.setItem('dj_custom_audio_title', data.title); } catch (e) {}
          }
          if (window.audioPlayerInstance) {
            await window.audioPlayerInstance.updateActiveTrack(window.audioPlayerInstance.isPlaying);
          }
          if (window.djPanelInstance) {
            window.djPanelInstance.updateAudioFileUI(data.filename, data.size || blob.size);
            if (window.djPanelInstance.customAudioTitleInput && data.title) {
              window.djPanelInstance.customAudioTitleInput.value = data.title;
            }
            if (window.djPanelInstance.requestManager) {
              window.djPanelInstance.requestManager.showToast(`📡 Pista "${data.title || data.filename}" sincronizada en tiempo real`);
            }
          }
        }
      } else if (data.type === 'AUDIO_UPLOADED_SIGNAL') {
        const stored = await djAudioStorage.getAudio();
        if (stored) {
          if (window.audioPlayerInstance) {
            await window.audioPlayerInstance.updateActiveTrack(window.audioPlayerInstance.isPlaying);
          }
          if (window.djPanelInstance) {
            window.djPanelInstance.updateAudioFileUI(stored.name, stored.size);
            if (window.djPanelInstance.requestManager) {
              window.djPanelInstance.requestManager.showToast('📡 Pista sincronizada en tiempo real');
            }
          }
        }
      } else if (data.type === 'AUDIO_REMOVED') {
        await djAudioStorage.removeAudio();
        try { localStorage.removeItem('dj_custom_audio_title'); } catch (e) {}
        if (window.audioPlayerInstance) {
          await window.audioPlayerInstance.updateActiveTrack(false);
        }
        if (window.djPanelInstance) {
          window.djPanelInstance.clearAudioFileUI();
          if (window.djPanelInstance.requestManager) {
            window.djPanelInstance.requestManager.showToast('📡 Pista removida en tiempo real');
          }
        }
      } else if (data.type === 'PLAY_STATE') {
        if (!window.audioPlayerInstance) return;
        if (data.isPlaying && !window.audioPlayerInstance.isPlaying) {
          window.audioPlayerInstance.start(false);
        } else if (!data.isPlaying && window.audioPlayerInstance.isPlaying) {
          window.audioPlayerInstance.stop(false);
        }
      }
    }
  }

  /* --- 3. DYNAMIC GENRE-ADAPTIVE & CUSTOM AUDIO PLAYER --- */
  class DJAudioPlayer {
    constructor(genreManager) {
      this.genreManager = genreManager;
      this.isPlaying = false;
      this.audioCtx = null;
      this.timerId = null;
      this.step = 0;
      this.tempo = 122;
      this.usingSynth = false;
      this.activeBlobUrl = null;

      // HTML5 Audio for custom MP3s/streams
      this.htmlAudio = new Audio();
      this.htmlAudio.preload = 'auto';

      this.genreTracksCatalog = {
        'Afro House & Melodic': {
          badge: 'AFRO HOUSE & MELODIC',
          title: 'Kenia Sunset Vibes (Organic Afro Mix)',
          subtitle: 'Atmósfera Afro House con percusiones orgánicas y melodías profundas',
          tempo: 122,
          chord: [220, 261.63, 329.63, 392],
          kickFreq: 140
        },
        'Tech House Vanguardia': {
          badge: 'TECH HOUSE VANGUARDIA',
          title: 'Club Horizon (Peak Tech House Edit)',
          subtitle: 'Groove contundente, rolling basslines y energía de festival nocturno',
          tempo: 126,
          chord: [196, 246.94, 293.66, 370],
          kickFreq: 155
        },
        'Nu-Disco & Funk Grooves': {
          badge: 'NU-DISCO & FUNK',
          title: 'Midnight Disco Funk (French Touch Rework)',
          subtitle: 'Bajos slapeados funky, guitarras rítmicas y sintetizadores retro 80s',
          tempo: 120,
          chord: [261.63, 329.63, 392, 493.88],
          kickFreq: 130
        },
        'Deep House Exclusivo': {
          badge: 'DEEP HOUSE EXCLUSIVO',
          title: 'Lounge Deluxe (Pure Deep Session)',
          subtitle: 'Warm pads, texturas hipnóticas y elegancia para cócteles exclusivos',
          tempo: 121,
          chord: [174.61, 220, 261.63, 329.63],
          kickFreq: 125
        },
        'Latin House & Organic': {
          badge: 'LATIN HOUSE & ORGANIC',
          title: 'Fiesta Ibicenca (Latin Grooves Edit)',
          subtitle: 'Congas afrocaribeñas, pianos montunos y vibración veraniega',
          tempo: 124,
          chord: [220, 277.18, 329.63, 415.30],
          kickFreq: 138
        },
        'Melodic Techno': {
          badge: 'MELODIC TECHNO',
          title: 'Afterlife Journey (Hypnotic Synth Mix)',
          subtitle: 'Sintetizadores etéreos, pads cinemáticos y tensión progresiva',
          tempo: 125,
          chord: [164.81, 220, 261.63, 329.63],
          kickFreq: 145
        },
        'Classic 80s & 90s Club Edits': {
          badge: '80s & 90s CLUB EDITS',
          title: 'Retro Club Anthems (Boris Modern Edit)',
          subtitle: 'Los himnos más legendarios reversionados con pegada actual',
          tempo: 123,
          chord: [220, 261.63, 329.63, 392],
          kickFreq: 135
        },
        'Vocal House & Anthems': {
          badge: 'VOCAL HOUSE & ANTHEMS',
          title: 'Sunrise Euphoria (Vocal Club Mix)',
          subtitle: 'Líneas vocales emotivas, piano acordes y drop eufórico',
          tempo: 124,
          chord: [220, 261.63, 329.63, 392],
          kickFreq: 140
        },
        'Reggaetón Selecto / VIP Mashups': {
          badge: 'REGGAETÓN SELECTO / VIP',
          title: 'Urbano Deluxe (VIP Club Mashup)',
          subtitle: 'Dembow fino fusionado con house y arreglos exclusivos para club',
          tempo: 104,
          chord: [220, 261.63, 329.63, 392],
          kickFreq: 120
        },
        'Indie Dance': {
          badge: 'INDIE DANCE',
          title: 'Neon Odyssey (Dark Disco Mix)',
          subtitle: 'Líneas de bajo arpegiadas, cajas secas y vibra berlinesa',
          tempo: 122,
          chord: [196, 246.94, 293.66, 370],
          kickFreq: 135
        },
        'R&B & Hip Hop Chic': {
          badge: 'R&B & HIP HOP CHIC',
          title: 'Smooth Velvet (Lounge R&B Edit)',
          subtitle: 'Rhythms cadenciosos, melodías sofisticadas y groove envolvente',
          tempo: 100,
          chord: [174.61, 220, 261.63, 329.63],
          kickFreq: 115
        }
      };

      this.currentTrack = null;
      this.playBtn = document.getElementById('play-demo-btn');
      this.playBtnIcon = document.getElementById('play-btn-icon');
      this.playBtnText = document.getElementById('play-btn-text');
      this.vinylDisc = document.getElementById('hero-vinyl-disc');
      this.equalizer = document.getElementById('hero-equalizer');
      this.genreBadge = document.getElementById('audio-genre-badge');
      this.trackTitle = document.getElementById('audio-track-title');
      this.trackSubtitle = document.getElementById('audio-track-subtitle');

      // Mini-Player en Cabina DJ
      this.boothPreviewPlayBtn = document.getElementById('booth-preview-play-btn');
      this.boothPreviewPlayIcon = document.getElementById('booth-preview-play-icon');
      this.boothPreviewPlayText = document.getElementById('booth-preview-play-text');
      this.boothPreviewEq = document.getElementById('booth-preview-eq');
      this.boothPreviewTrackTitle = document.getElementById('booth-preview-track-title');
      this.boothPreviewTrackSubtitle = document.getElementById('booth-preview-track-subtitle');
      this.boothPreviewBadge = document.getElementById('booth-preview-badge');

      this.initEvents();
      this.updateActiveTrack(false);
    }

    initEvents() {
      if (this.playBtn) this.playBtn.addEventListener('click', () => this.togglePlay());
      if (this.boothPreviewPlayBtn) this.boothPreviewPlayBtn.addEventListener('click', () => this.togglePlay());
      this.htmlAudio.addEventListener('ended', () => this.stop(true));
      this.htmlAudio.addEventListener('error', () => {
        console.warn('HTML5 Audio note:', this.htmlAudio.error);
        if (!this.currentTrack || !this.currentTrack.audioUrl) {
          this.fallbackToSynth();
        }
      });
      window.addEventListener('dj:genres-updated', () => this.updateActiveTrack(true));
    }

    async updateActiveTrack(restartIfPlaying = true) {
      let uploadedRecord = null;
      try {
        uploadedRecord = await djAudioStorage.getAudio();
      } catch (e) {}

      const customUrl = (localStorage.getItem('dj_custom_audio_url') || '').trim();
      const customTitle = (localStorage.getItem('dj_custom_audio_title') || '').trim();

      if (uploadedRecord && uploadedRecord.blob) {
        if (this.activeBlobUrl) {
          try { URL.revokeObjectURL(this.activeBlobUrl); } catch (e) {}
        }
        const mimeType = uploadedRecord.blob.type || (uploadedRecord.name && uploadedRecord.name.toLowerCase().endsWith('.wav') ? 'audio/wav' : (uploadedRecord.name && uploadedRecord.name.toLowerCase().endsWith('.m4a') ? 'audio/mp4' : 'audio/mpeg'));
        const safeBlob = uploadedRecord.blob.type ? uploadedRecord.blob : new Blob([uploadedRecord.blob], { type: mimeType });
        this.activeBlobUrl = URL.createObjectURL(safeBlob);

        // Always prioritize the uploaded record's own title, then customTitle, then record's name
        const displayTitle = uploadedRecord.title || customTitle || uploadedRecord.name.replace(/\.[^/.]+$/, "");
        const sizeMb = (uploadedRecord.size / (1024 * 1024)).toFixed(1);
        this.currentTrack = {
          badge: 'ARCHIVO MP3 SUBIDO POR DJ BORIS',
          title: displayTitle,
          subtitle: `Pista local (${sizeMb} MB) cargada directamente en cabina`,
          tempo: 124,
          audioUrl: this.activeBlobUrl,
          chord: [220, 261.63, 329.63, 392],
          kickFreq: 140
        };

        this.htmlAudio.src = this.activeBlobUrl;
        this.htmlAudio.load();
      } else if (customUrl) {
        if (this.activeBlobUrl) {
          try { URL.revokeObjectURL(this.activeBlobUrl); } catch (e) {}
          this.activeBlobUrl = null;
        }
        this.currentTrack = {
          badge: 'CANCIÓN SELECCIONADA POR DJ BORIS',
          title: customTitle || 'Boris Charlie — Selección Especial',
          subtitle: 'Pista personalizada configurada desde la Cabina DJ',
          tempo: 124,
          audioUrl: customUrl,
          chord: [220, 261.63, 329.63, 392],
          kickFreq: 140
        };
        this.htmlAudio.src = customUrl;
        this.htmlAudio.load();
      } else {
        if (this.activeBlobUrl) {
          try { URL.revokeObjectURL(this.activeBlobUrl); } catch (e) {}
          this.activeBlobUrl = null;
        }
        let activeGenre = null;
        if (this.genreManager && this.genreManager.data && Array.isArray(this.genreManager.data.activeGenres)) {
          activeGenre = this.genreManager.data.activeGenres[0];
        }
        if (activeGenre && this.genreTracksCatalog[activeGenre]) {
          const preset = this.genreTracksCatalog[activeGenre];
          this.currentTrack = {
            badge: preset.badge,
            title: preset.title,
            subtitle: preset.subtitle,
            tempo: preset.tempo,
            audioUrl: null,
            chord: preset.chord,
            kickFreq: preset.kickFreq
          };
        } else if (activeGenre) {
          this.currentTrack = {
            badge: activeGenre.toUpperCase(),
            title: `${activeGenre} (Set Exclusivo Boris)`,
            subtitle: 'Atmósfera sonora curada en vivo según los géneros de hoy',
            tempo: 124,
            audioUrl: null,
            chord: [220, 261.63, 329.63, 392],
            kickFreq: 140
          };
        } else {
          this.currentTrack = {
            badge: 'AUDIO INTERACTIVO • SET EN VIVO',
            title: 'Experiencia Sonora en Vivo',
            subtitle: 'Atmósfera Deep & Melodic House en tiempo real',
            tempo: 122,
            audioUrl: null,
            chord: [220, 261.63, 329.63, 392],
            kickFreq: 140
          };
        }
      }

      this.tempo = this.currentTrack.tempo || 122;

      // Actualizar tarjeta Hero pública
      if (this.genreBadge) this.genreBadge.textContent = this.currentTrack.badge;
      if (this.trackTitle) this.trackTitle.textContent = this.currentTrack.title;
      if (this.trackSubtitle) this.trackSubtitle.textContent = this.currentTrack.subtitle;

      // Actualizar Mini-Player de Cabina DJ
      if (this.boothPreviewBadge) this.boothPreviewBadge.textContent = this.currentTrack.badge;
      if (this.boothPreviewTrackTitle) this.boothPreviewTrackTitle.textContent = this.currentTrack.title;
      if (this.boothPreviewTrackSubtitle) this.boothPreviewTrackSubtitle.textContent = this.currentTrack.subtitle;

      if (restartIfPlaying && this.isPlaying) {
        this.stop(false);
        this.start(false);
      }
    }

    initAudio() {
      if (!this.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new AudioContext();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
      if (!this.masterBus) {
        // Master Compressor to eliminate any distortion or digital clipping and give rich club warmth
        this.masterCompressor = this.audioCtx.createDynamicsCompressor();
        this.masterCompressor.threshold.setValueAtTime(-14, this.audioCtx.currentTime);
        this.masterCompressor.knee.setValueAtTime(24, this.audioCtx.currentTime);
        this.masterCompressor.ratio.setValueAtTime(4.0, this.audioCtx.currentTime);
        this.masterCompressor.attack.setValueAtTime(0.005, this.audioCtx.currentTime);
        this.masterCompressor.release.setValueAtTime(0.22, this.audioCtx.currentTime);

        // Low-Shelf EQ for deep club sub-bass warmth (85Hz, +2.2dB)
        this.masterLowShelf = this.audioCtx.createBiquadFilter();
        this.masterLowShelf.type = 'lowshelf';
        this.masterLowShelf.frequency.setValueAtTime(85, this.audioCtx.currentTime);
        this.masterLowShelf.gain.setValueAtTime(2.2, this.audioCtx.currentTime);

        // High-Shelf EQ to soften harsh digital fizz and sibilance (8500Hz, -2.5dB)
        this.masterHighShelf = this.audioCtx.createBiquadFilter();
        this.masterHighShelf.type = 'highshelf';
        this.masterHighShelf.frequency.setValueAtTime(8500, this.audioCtx.currentTime);
        this.masterHighShelf.gain.setValueAtTime(-2.5, this.audioCtx.currentTime);

        // Master Gain (headroom protection)
        this.masterGain = this.audioCtx.createGain();
        this.masterGain.gain.setValueAtTime(0.85, this.audioCtx.currentTime);

        // Audio Chain: masterBus -> masterLowShelf -> masterHighShelf -> masterCompressor -> masterGain -> destination
        this.masterBus = this.audioCtx.createGain();
        this.masterBus.connect(this.masterLowShelf);
        this.masterLowShelf.connect(this.masterHighShelf);
        this.masterHighShelf.connect(this.masterCompressor);
        this.masterCompressor.connect(this.masterGain);
        this.masterGain.connect(this.audioCtx.destination);
      }
    }

    togglePlay() {
      this.initAudio();
      if (this.isPlaying) this.stop(true);
      else this.start(true);
    }

    start(broadcast = true) {
      this.isPlaying = true;
      if (this.playBtnText) this.playBtnText.textContent = 'Pausar Set Preview';
      if (this.playBtnIcon) this.playBtnIcon.innerHTML = `<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>`;
      if (this.vinylDisc) this.vinylDisc.classList.add('spinning');
      if (this.equalizer) this.equalizer.classList.add('active');

      // Sincronizar mini-reproductor en cabina
      if (this.boothPreviewPlayText) this.boothPreviewPlayText.textContent = 'Pausar';
      if (this.boothPreviewPlayIcon) this.boothPreviewPlayIcon.innerHTML = `<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>`;
      if (this.boothPreviewEq) this.boothPreviewEq.classList.add('active');

      // Notificar a otros dispositivos (Celular ⇄ PC)
      if (broadcast && window.djRealtimeSync) {
        window.djRealtimeSync.broadcastPlayState(true, this.htmlAudio ? this.htmlAudio.currentTime : 0);
      }

      this.stopSynth();

      if (this.currentTrack && this.currentTrack.audioUrl) {
        this.usingSynth = false;
        if (this.htmlAudio.src !== this.currentTrack.audioUrl) {
          this.htmlAudio.src = this.currentTrack.audioUrl;
          this.htmlAudio.load();
        }
        this.htmlAudio.volume = 1.0;
        const playPromise = this.htmlAudio.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn('Audio playback note:', err);
          });
        }
      } else {
        this.startSynth();
      }
    }

    fallbackToSynth() {
      if (!this.isPlaying) return;
      this.usingSynth = true;
      this.startSynth();
    }

    startSynth() {
      this.initAudio();
      this.usingSynth = true;
      this.step = 0;
      if (this.timerId) clearInterval(this.timerId);
      const stepTime = (60 / this.tempo) / 4 * 1000;
      this.timerId = setInterval(() => this.tick(), stepTime);
    }

    stopSynth() {
      if (this.timerId) {
        clearInterval(this.timerId);
        this.timerId = null;
      }
      this.usingSynth = false;
    }

    stop(broadcast = true) {
      this.isPlaying = false;
      if (this.htmlAudio) {
        this.htmlAudio.pause();
        this.htmlAudio.currentTime = 0;
      }
      this.stopSynth();
      if (this.playBtnText) this.playBtnText.textContent = 'Escuchar Preview del Set';
      if (this.playBtnIcon) this.playBtnIcon.innerHTML = `<polygon points="5 3 19 12 5 21 5 3"></polygon>`;
      if (this.vinylDisc) this.vinylDisc.classList.remove('spinning');
      if (this.equalizer) this.equalizer.classList.remove('active');

      // Sincronizar mini-reproductor en cabina
      if (this.boothPreviewPlayText) this.boothPreviewPlayText.textContent = 'Escuchar en Cabina';
      if (this.boothPreviewPlayIcon) this.boothPreviewPlayIcon.innerHTML = `<polygon points="5 3 19 12 5 21 5 3"></polygon>`;
      if (this.boothPreviewEq) this.boothPreviewEq.classList.remove('active');

      // Notificar a otros dispositivos (Celular ⇄ PC)
      if (broadcast && window.djRealtimeSync) {
        window.djRealtimeSync.broadcastPlayState(false, 0);
      }
    }

    tick() {
      if (!this.audioCtx || !this.masterBus) return;
      const t = this.audioCtx.currentTime;
      const sixteenth = this.step % 16;
      const quarter = this.step % 4;
      const kickFreq = this.currentTrack && this.currentTrack.kickFreq ? this.currentTrack.kickFreq : 135;
      if (quarter === 0) this.playKick(t, kickFreq);
      if (sixteenth % 4 === 2) this.playHat(t, 0.08, false);
      if (sixteenth % 2 === 1) this.playHat(t, 0.03, true);
      if (sixteenth === 0 || sixteenth === 6 || sixteenth === 10) this.playChord(t, sixteenth);
      this.step = (this.step + 1) % 64;
    }

    playKick(t, baseFreq) {
      if (!this.audioCtx || !this.masterBus) return;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      const startF = baseFreq || 135;
      osc.frequency.setValueAtTime(startF, t);
      osc.frequency.exponentialRampToValueAtTime(48, t + 0.045);
      osc.frequency.exponentialRampToValueAtTime(32, t + 0.22);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.72, t + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.26);

      osc.connect(gain);
      gain.connect(this.masterBus);
      osc.start(t);
      osc.stop(t + 0.28);
    }

    playHat(t, vol, isShaker) {
      if (!this.audioCtx || !this.masterBus) return;
      const duration = isShaker ? 0.035 : 0.06;
      const size = Math.floor(this.audioCtx.sampleRate * duration);
      const buf = this.audioCtx.createBuffer(1, size, this.audioCtx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < size; i++) {
        d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (size * 0.35));
      }
      const noise = this.audioCtx.createBufferSource();
      noise.buffer = buf;

      const filter = this.audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(isShaker ? 6500 : 7500, t);
      filter.Q.setValueAtTime(1.4, t);

      const gain = this.audioCtx.createGain();
      const targetVol = isShaker ? 0.025 : 0.055;
      gain.gain.setValueAtTime(targetVol, t);
      gain.gain.exponentialRampToValueAtTime(0.0005, t + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterBus);
      noise.start(t);
    }

    playChord(t, step) {
      if (!this.audioCtx || !this.masterBus) return;
      const baseChord = this.currentTrack && this.currentTrack.chord ? this.currentTrack.chord : [220, 261.63, 329.63, 392];
      const notes = step === 10 ? [174.61, 220, 261.63, 329.63] : baseChord;
      notes.forEach((f) => {
        const osc1 = this.audioCtx.createOscillator();
        osc1.type = 'triangle';
        osc1.frequency.setValueAtTime(f, t);

        const osc2 = this.audioCtx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(f * 1.002, t);

        const filter = this.audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(700, t);
        filter.frequency.exponentialRampToValueAtTime(320, t + 0.45);
        filter.Q.setValueAtTime(1.0, t);

        const gain = this.audioCtx.createGain();
        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.055, t + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0005, t + 0.48);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterBus);

        osc1.start(t);
        osc2.start(t);
        osc1.stop(t + 0.5);
        osc2.stop(t + 0.5);
      });
    }
  }

  /* --- 3. GENRES MANAGER --- */
  class GenreManager {
    constructor() {
      this.storageKey = 'dj_tonight_genres_data';
      this.defaultData = {
        venue: 'Casa Cabana — Arcos Plaza, Samborondón',
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
      this.genresListKey = 'dj_all_available_genres';
      const defaultAvailable = [
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
      try {
        const savedList = JSON.parse(localStorage.getItem(this.genresListKey));
        this.allAvailableGenres = (savedList && savedList.length > 0) ? savedList : defaultAvailable;
      } catch(e) {
        this.allAvailableGenres = defaultAvailable;
      }
      this.data = this.loadData();
      this.render();
    }
    getTodayFormatted() {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const formatted = new Date().toLocaleDateString('es-EC', options);
      return formatted.charAt(0).toUpperCase() + formatted.slice(1);
    }
    loadData() {
      try {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
          const parsed = Object.assign({}, this.defaultData, JSON.parse(stored));
          if (parsed.venue && parsed.venue.includes('Cabaña')) {
            parsed.venue = parsed.venue.replace(/Cabaña/g, 'Cabana');
            try { localStorage.setItem(this.storageKey, JSON.stringify(parsed)); } catch (e) {}
          }
          return parsed;
        }
      } catch (e) {}
      return this.defaultData;
    }
    saveData(newData) {
      this.data = Object.assign({}, this.data, newData);
      try { localStorage.setItem(this.storageKey, JSON.stringify(this.data)); } catch (e) {}
      this.render();
      window.dispatchEvent(new CustomEvent('dj:genres-updated', { detail: this.data }));
    }
    toggleGenre(name) {
      let list = [...this.data.activeGenres];
      const idx = list.indexOf(name);
      if (idx > -1) list.splice(idx, 1);
      else list.push(name);
      this.saveData({ activeGenres: list });
    }
    addCustomGenre(name) {
      const trimmed = name.trim();
      if (!trimmed) return;
      if (!this.allAvailableGenres.includes(trimmed)) {
          this.allAvailableGenres.push(trimmed);
          localStorage.setItem(this.genresListKey, JSON.stringify(this.allAvailableGenres));
      }
      if (!this.data.activeGenres.includes(trimmed)) {
          this.saveData({ activeGenres: [...this.data.activeGenres, trimmed] });
      }
    }
    deleteGenre(name) {
      this.allAvailableGenres = this.allAvailableGenres.filter(g => g !== name);
      localStorage.setItem(this.genresListKey, JSON.stringify(this.allAvailableGenres));
      if (this.data.activeGenres.includes(name)) {
          this.saveData({ activeGenres: this.data.activeGenres.filter(g => g !== name) });
      }
      this.render();
    }
    render() {
      const venueEl = document.getElementById('tonight-venue-name');
      if (venueEl) venueEl.textContent = this.data.venue;
      const heroVenueEl = document.getElementById('hero-venue-tag');
      if (heroVenueEl) heroVenueEl.textContent = this.data.venue;
      const dateEl = document.getElementById('tonight-date-display');
      if (dateEl) dateEl.textContent = this.data.dateStr || this.getTodayFormatted();
      const noteEl = document.getElementById('tonight-vibe-note');
      if (noteEl) noteEl.textContent = this.data.vibeNote;

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

  /* --- 4. REQUESTS ENGINE WITH INSTANT CONDITIONAL VERSION FIELD --- */
  class RequestManager {
    constructor() {
      this.storageKey = 'dj_live_song_requests';
      this.form = document.getElementById('song-request-form');
      this.queueContainer = document.getElementById('live-requests-queue');
      this.queueCountEl = document.getElementById('queue-count-badge');
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
        if (stored) return JSON.parse(stored);
      } catch (e) {}
      return [
        { id: 101, song: 'Losing It', artist: 'Fisher', guest: 'Mesa VIP 3', versionType: 'original', preferenceDetails: '', isVipBypass: false, status: 'playing', timestamp: 'Hace 8 min' },
        { id: 102, song: 'World Hold On', artist: 'Bob Sinclar & Fisher', guest: 'Barra Principal', versionType: 'preference', preferenceDetails: 'Rework Extended Mix', isVipBypass: true, status: 'accepted', timestamp: 'Hace 4 min' },
        { id: 103, song: 'Mwaki', artist: 'Zerb, Sofiya Nzau', guest: 'Zona Lounge 2', versionType: 'original', preferenceDetails: '', isVipBypass: false, status: 'waiting', timestamp: 'Hace 2 min' }
      ];
    }
    saveRequests() {
      try { localStorage.setItem(this.storageKey, JSON.stringify(this.requests)); } catch (e) {}
      this.renderQueue();
      window.dispatchEvent(new CustomEvent('dj:requests-updated', { detail: this.requests }));
    }
    initEvents() {
      // Direct Event Listeners for Version Selector
      if (this.versionOriginalRadio) {
        this.versionOriginalRadio.addEventListener('change', () => toggleVersionPreference(false));
      }
      if (this.versionPreferenceRadio) {
        this.versionPreferenceRadio.addEventListener('change', () => toggleVersionPreference(true));
      }
      const cOrig = document.getElementById('card-version-original');
      const cPref = document.getElementById('card-version-preference');
      if (cOrig) cOrig.addEventListener('click', () => toggleVersionPreference(false));
      if (cPref) cPref.addEventListener('click', () => toggleVersionPreference(true));

      if (this.vipToggle && this.vipDesc) {
        this.vipToggle.addEventListener('change', () => {
          if (this.vipToggle.checked) this.vipDesc.classList.add('visible');
          else this.vipDesc.classList.remove('visible');
        });
      }

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

      if (isPreference && !preferenceDetails) {
        alert('Por favor indica qué versión o remix deseas');
        this.preferenceTextInput.focus();
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

      this.requests.push(newRequest);
      this.saveRequests();

      this.form.reset();
      if (this.versionOriginalRadio) this.versionOriginalRadio.checked = true;
      toggleVersionPreference(false);
      if (this.vipToggle) this.vipToggle.checked = false;
      if (this.vipDesc) this.vipDesc.classList.remove('visible');

      this.showToast(isVipBypass ? '💎 ¡Petición VIP recibida en cabina! Tu tema tiene prioridad.' : '🎵 ¡Petición enviada a cabina con éxito! Se ha añadido a la cola.');
      
      if (window.innerWidth < 768 && this.queueContainer) {
        this.queueContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
    renderQueue() {
      if (!this.queueContainer) return;
      if (this.queueCountEl) this.queueCountEl.textContent = `${this.requests.length} en fila`;
      this.queueContainer.innerHTML = '';

      if (this.requests.length === 0) {
        this.queueContainer.innerHTML = `
          <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-dim);">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 0.5rem; opacity: 0.5;"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
            <p style="font-size: 0.95rem;">La cola de la cabina está vacía.</p>
            <p style="font-size: 0.8rem; margin-top: 0.2rem;">¡Sé el primero en enviar tu canción favorita!</p>
          </div>
        `;
        return;
      }

      this.requests.forEach((req, index) => {
        const orderNumber = index + 1;
        const isVip = req.isVipBypass;
        const isPlaying = req.status === 'playing';
        const itemEl = document.createElement('div');
        itemEl.className = `queue-item ${isVip ? 'is-vip' : ''} ${isPlaying ? 'is-playing' : ''}`;

        let statusLabel = 'En cola';
        let statusClass = 'status-waiting';
        if (req.status === 'playing') { statusLabel = '🔥 Sonando'; statusClass = 'status-playing'; }
        else if (req.status === 'accepted') { statusLabel = '✅ Aceptada'; statusClass = 'status-accepted'; }
        else if (req.status === 'completed') { statusLabel = '✨ Tocada'; statusClass = 'status-waiting'; }

        const versionTagHtml = req.versionType === 'preference' && req.preferenceDetails
          ? `<span class="queue-tag queue-tag-version">🎧 Versión: ${this.escapeHtml(req.preferenceDetails)}</span>`
          : `<span class="queue-tag">💿 Versión Original</span>`;

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
            <div class="queue-meta" style="margin-top: 0.35rem;">
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
      return str.replace(/[&<>'"]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag));
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
        setTimeout(() => toast.remove(), 250);
      }, 3500);
    }
  }

  /* --- 5. QR CODE ENGINE & TABLE TENT PRINT MANAGER --- */
  class QRManager {
    constructor(requestManager) {
      this.requestManager = requestManager;
      this.boothQrContainer = document.getElementById('booth-qr-canvas');
      this.printQrContainer = document.getElementById('tent-qr-canvas');
      this.boothPrintBtn = document.getElementById('booth-print-btn');
      this.boothDownloadBtn = document.getElementById('booth-download-btn');
      this.footerPrintBtn = document.getElementById('print-tent-footer-btn');

      // Auto URL from current browser address or fallback domain
      this.currentUrl = window.location.protocol.startsWith('http') 
        ? window.location.href.split('#')[0] 
        : 'https://djboris-official.com';
      this.init();
    }
    init() {
      this.generateQR(this.currentUrl);
      if (this.boothPrintBtn) this.boothPrintBtn.addEventListener('click', () => window.print());
      if (this.footerPrintBtn) this.footerPrintBtn.addEventListener('click', () => window.print());
      if (this.boothDownloadBtn) this.boothDownloadBtn.addEventListener('click', () => this.downloadBrandedQR());
    }
    generateQR(text) {
      if (typeof QRCode === 'undefined') return;
      if (this.boothQrContainer) {
        this.boothQrContainer.innerHTML = '';
        new QRCode(this.boothQrContainer, { text: text, width: 140, height: 140, colorDark: "#08080a", colorLight: "#ffffff" });
      }
      if (this.printQrContainer) {
        this.printQrContainer.innerHTML = '';
        new QRCode(this.printQrContainer, { text: text, width: 240, height: 240, colorDark: "#08080a", colorLight: "#ffffff" });
      }
    }
    downloadBrandedQR() {
      const canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 760;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#08080c';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 4;
      ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
      ctx.lineWidth = 1;
      ctx.strokeRect(28, 28, canvas.width - 56, canvas.height - 56);
      ctx.fillStyle = '#d4af37';
      ctx.font = 'bold 26px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('DJ Boris // THE RESIDENT', canvas.width / 2, 75);
      ctx.fillStyle = '#cbd5e1';
      ctx.font = '14px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('CASA CABANA • SAMBORONDÓN • EVENTOS PRIVADOS', canvas.width / 2, 105);
      ctx.strokeStyle = '#d4af37';
      ctx.beginPath();
      ctx.moveTo(150, 125);
      ctx.lineTo(450, 125);
      ctx.stroke();
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('ESCANEA PARA PEDIR TU CANCIÓN', canvas.width / 2, 165);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '15px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Descubre el Line-up de hoy y solicita tu música en vivo', canvas.width / 2, 195);
      
      const qrCanvas = this.boothQrContainer ? this.boothQrContainer.querySelector('canvas') : null;
      if (qrCanvas) {
        const qrBoxX = (canvas.width - 320) / 2;
        const qrBoxY = 225;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(qrBoxX, qrBoxY, 320, 320, 16);
        else ctx.rect(qrBoxX, qrBoxY, 320, 320);
        ctx.fill();
        ctx.drawImage(qrCanvas, qrBoxX + 20, qrBoxY + 20, 280, 280);
      }
      ctx.fillStyle = '#d4af37';
      ctx.font = 'bold 15px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('✦ PETICIONES EN VIVO A CABINA  |  💎 VIP BYPASS ($) ✦', canvas.width / 2, 600);
      ctx.fillStyle = '#64748b';
      ctx.font = '13px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('+25 Años de Trayectoria  •  Guayaquil - Samborondón - Salinas', canvas.width / 2, 650);

      const link = document.createElement('a');
      link.download = 'DJ-Boris-Cabina-QR.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      this.requestManager.showToast('✨ Imagen QR oficial descargada');
    }
  }

  /* --- 6. DJ BOOTH CONTROL PANEL (USUARIO & CONTRASEÑA LOGIN) --- */
  class DJBoothPanel {
    constructor(genreManager, requestManager) {
      this.genreManager = genreManager;
      this.requestManager = requestManager;
      this.isUnlocked = false;
      this.currentUser = null;

      // Cuentas de Acceso Autorizadas
      this.accounts = {
        'DjBorisCharlie': {
          password: 'DjForeverYoung',
          name: 'DJ Boris',
          role: 'dj',
          badgeText: 'DJ BORIS // RESIDENTE'
        },
        'AdminMiller': {
          password: '1221Justinox.',
          name: 'Admin Miller',
          role: 'admin',
          badgeText: 'ADMIN MILLER // MASTER'
        }
      };

      this.modal = document.getElementById('dj-booth-modal');
      this.openBtn = document.getElementById('open-booth-btn');
      this.openFooterBtn = document.getElementById('open-booth-footer-btn');
      this.closeBtn = document.getElementById('close-booth-btn');

      this.loginScreen = document.getElementById('booth-login-screen');
      this.panelScreen = document.getElementById('booth-panel-screen');
      this.loginForm = document.getElementById('booth-login-form');
      this.usernameInput = document.getElementById('booth-username-input');
      this.passwordInput = document.getElementById('booth-password-input');
      this.loginSubmitBtn = document.getElementById('booth-login-submit');
      this.loginError = document.getElementById('booth-login-error');
      this.userBadge = document.getElementById('booth-user-badge');
      this.logoutBtn = document.getElementById('booth-logout-btn');

      this.venueInput = document.getElementById('booth-venue-input');
      this.noteInput = document.getElementById('booth-note-input');
      this.phoneInput = document.getElementById('booth-phone-input');
      this.customAudioFileInput = document.getElementById('booth-custom-audio-file');
      this.uploadFileBtn = document.getElementById('booth-upload-file-btn');
      this.uploadFileBtnText = document.getElementById('booth-upload-file-btn-text');
      this.removeAudioFileBtn = document.getElementById('booth-remove-audio-file-btn');
      this.audioFileStatus = document.getElementById('booth-audio-file-status');
      this.customAudioTitleInput = document.getElementById('booth-custom-audio-title');
      this.customAudioUrlInput = document.getElementById('booth-custom-audio-url');
      this.saveSettingsBtn = document.getElementById('booth-save-settings');
      this.genreChipsContainer = document.getElementById('booth-genre-chips');
      this.customGenreInput = document.getElementById('booth-custom-genre');
      this.addCustomGenreBtn = document.getElementById('booth-add-genre-btn');
      this.queueAdminContainer = document.getElementById('booth-queue-admin-list');
      this.clearQueueBtn = document.getElementById('booth-clear-queue-btn');
      this.adminEmergencyTools = document.getElementById('booth-admin-emergency-tools');
      this.adminResetBtn = document.getElementById('booth-admin-reset-all');

      this.initEvents();
    }

    initEvents() {
      const openModal = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        window.openDJBoothModal();
      };
      const closeModal = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        window.closeDJBoothModal();
      };

      if (this.openBtn) this.openBtn.addEventListener('click', openModal);
      if (this.openFooterBtn) this.openFooterBtn.addEventListener('click', openModal);
      if (this.closeBtn) this.closeBtn.addEventListener('click', closeModal);
      if (this.modal) {
        this.modal.addEventListener('click', (e) => {
          if (e.target === this.modal) closeModal(e);
        });
      }

      if (this.loginSubmitBtn) {
        this.loginSubmitBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.verifyLogin();
        });
      }

      if (this.loginForm) {
        this.loginForm.addEventListener('submit', (e) => {
          e.preventDefault();
          this.verifyLogin();
        });
      }

      if (this.usernameInput) {
        this.usernameInput.addEventListener('keyup', (e) => {
          if (e.key === 'Enter') {
            if (this.passwordInput && this.passwordInput.value) this.verifyLogin();
            else if (this.passwordInput) this.passwordInput.focus();
          }
        });
      }

      if (this.passwordInput) {
        this.passwordInput.addEventListener('keyup', (e) => {
          if (e.key === 'Enter') this.verifyLogin();
        });
      }

      if (this.logoutBtn) {
        this.logoutBtn.addEventListener('click', () => this.logout());
      }

      if (this.uploadFileBtn && this.customAudioFileInput) {
        this.uploadFileBtn.addEventListener('click', () => {
          this.customAudioFileInput.click();
        });
      }

      if (this.customAudioFileInput) {
        this.customAudioFileInput.addEventListener('change', async (e) => {
          const file = e.target.files && e.target.files[0];
          if (!file) return;

          const cleanName = file.name.replace(/\.[^/.]+$/, "");
          const effectiveTitle = cleanName;
          if (this.customAudioTitleInput) {
            this.customAudioTitleInput.value = effectiveTitle;
          }
          try {
            localStorage.setItem('dj_custom_audio_title', effectiveTitle);
          } catch(err) {}

          const ok = await djAudioStorage.saveAudio(file, file.name, effectiveTitle);
          if (ok) {
            this.updateAudioFileUI(file.name, file.size);
            if (window.audioPlayerInstance) {
              await window.audioPlayerInstance.updateActiveTrack(true);
            }
            if (window.djRealtimeSync) {
              window.djRealtimeSync.broadcastAudioFile(file, file.name, effectiveTitle);
            }
            this.requestManager.showToast(`✨ MP3 "${cleanName}" reemplazado y listo para sonar`);
          } else {
            this.requestManager.showToast('No se pudo procesar el archivo de audio');
          }
          try { this.customAudioFileInput.value = ''; } catch(err) {}
        });
      }

      if (this.removeAudioFileBtn) {
        this.removeAudioFileBtn.addEventListener('click', async () => {
          await djAudioStorage.removeAudio();
          if (this.customAudioFileInput) this.customAudioFileInput.value = '';
          if (this.customAudioTitleInput) this.customAudioTitleInput.value = '';
          try { localStorage.removeItem('dj_custom_audio_title'); } catch(e) {}
          this.clearAudioFileUI();
          if (window.audioPlayerInstance) {
            await window.audioPlayerInstance.updateActiveTrack(true);
          }
          if (window.djRealtimeSync) {
            window.djRealtimeSync.broadcastAudioRemoved();
          }
          this.requestManager.showToast('Archivo MP3 quitado. Música por género restaurada');
        });
      }

      if (this.saveSettingsBtn) {
        this.saveSettingsBtn.addEventListener('click', () => {
          this.genreManager.saveData({
            venue: this.venueInput.value.trim() || this.genreManager.data.venue,
            vibeNote: this.noteInput.value.trim() || this.genreManager.data.vibeNote
          });
          if (this.phoneInput) {
            const phone = this.phoneInput.value.trim().replace(/[^0-9]/g, '');
            if (phone) {
              localStorage.setItem('dj_whatsapp_phone', phone);
            }
          }
          if (this.customAudioUrlInput) {
            const customUrl = this.customAudioUrlInput.value.trim();
            if (customUrl) {
              localStorage.setItem('dj_custom_audio_url', customUrl);
            } else {
              localStorage.removeItem('dj_custom_audio_url');
            }
          }
          if (this.customAudioTitleInput) {
            const customTitle = this.customAudioTitleInput.value.trim();
            if (customTitle) {
              localStorage.setItem('dj_custom_audio_title', customTitle);
            } else {
              localStorage.removeItem('dj_custom_audio_title');
            }
            djAudioStorage.getAudio().then(stored => {
              if (stored && customTitle) {
                djAudioStorage.saveAudio(stored.blob, stored.name, customTitle);
              }
            });
          }
          if (window.audioPlayerInstance) {
            window.audioPlayerInstance.updateActiveTrack(true);
          }
          this.requestManager.showToast('Ajustes de cabina guardados');
        });
      }

      if (this.addCustomGenreBtn && this.customGenreInput) {
        const handleAdd = () => {
          const val = this.customGenreInput.value.trim();
          if (val) {
            this.genreManager.addCustomGenre(val);
            this.customGenreInput.value = '';
            this.renderGenreChips();
            this.requestManager.showToast(`Género "${val}" agregado al set`);
          }
        };
        this.addCustomGenreBtn.addEventListener('click', handleAdd);
        this.customGenreInput.addEventListener('keyup', (e) => {
          if (e.key === 'Enter') handleAdd();
        });
      }

      if (this.clearQueueBtn) {
        this.clearQueueBtn.addEventListener('click', () => {
          if (confirm('¿Deseas reiniciar la cola de peticiones para comenzar una nueva noche?')) {
            this.requestManager.requests = [];
            this.requestManager.saveRequests();
            this.renderAdminQueue();
            this.requestManager.showToast('Cola reiniciada para la nueva noche');
          }
        });
      }

      if (this.adminResetBtn) {
        this.adminResetBtn.addEventListener('click', async () => {
          if (confirm('¿ATENCIÓN ADMIN MILLER: Deseas restablecer todos los datos del sistema a valores de fábrica?')) {
            localStorage.removeItem(this.genreManager.storageKey);
            localStorage.removeItem(this.requestManager.storageKey);
            localStorage.removeItem('dj_custom_audio_url');
            localStorage.removeItem('dj_custom_audio_title');
            await djAudioStorage.removeAudio();
            location.reload();
          }
        });
      }

      window.addEventListener('dj:requests-updated', () => {
        if (this.isUnlocked) this.renderAdminQueue();
      });
    }

    showLoginScreen() {
      if (this.loginScreen) this.loginScreen.style.display = 'block';
      if (this.panelScreen) this.panelScreen.style.display = 'none';
      if (this.loginError) {
        this.loginError.style.display = 'none';
        this.loginError.classList.remove('booth-shake');
      }
      if (this.passwordInput) this.passwordInput.value = '';
      const submitText = document.getElementById('booth-login-submit-text');
      if (submitText) submitText.textContent = 'Iniciar Sesión en Cabina';
      setTimeout(() => {
        if (this.usernameInput && !this.usernameInput.value) this.usernameInput.focus();
        else if (this.passwordInput) this.passwordInput.focus();
      }, 150);
    }

    verifyLogin() {
      const user = (this.usernameInput ? this.usernameInput.value : '').trim();
      const pass = (this.passwordInput ? this.passwordInput.value : '').trim();

      const submitText = document.getElementById('booth-login-submit-text');
      if (submitText) submitText.textContent = 'Verificando...';

      setTimeout(() => {
        const account = this.accounts[user];
        if (account && account.password === pass) {
          this.isUnlocked = true;
          this.currentUser = account;
          if (this.loginError) this.loginError.style.display = 'none';
          if (submitText) submitText.textContent = 'Iniciar Sesión en Cabina';
          this.showPanel();
          this.requestManager.showToast(`Bienvenido ${account.name}`);
        } else {
          if (submitText) submitText.textContent = 'Iniciar Sesión en Cabina';
          if (this.loginError) {
            this.loginError.style.display = 'block';
            this.loginError.textContent = '⚠️ Usuario o contraseña incorrectos.';
            this.loginError.classList.remove('booth-shake');
            void this.loginError.offsetWidth;
            this.loginError.classList.add('booth-shake');
          }
          if (this.passwordInput) {
            this.passwordInput.value = '';
            this.passwordInput.focus();
          }
        }
      }, 80);
    }

    logout() {
      this.isUnlocked = false;
      this.currentUser = null;
      if (this.passwordInput) this.passwordInput.value = '';
      this.showLoginScreen();
      this.requestManager.showToast('Sesión de cabina cerrada');
    }

    showPanel() {
      if (this.loginScreen) this.loginScreen.style.display = 'none';
      if (this.panelScreen) this.panelScreen.style.display = 'block';

      if (this.userBadge && this.currentUser) {
        this.userBadge.textContent = this.currentUser.badgeText;
      }
      if (this.venueInput) this.venueInput.value = this.genreManager.data.venue;
      if (this.noteInput) this.noteInput.value = this.genreManager.data.vibeNote;
      if (this.phoneInput) {
        const saved = localStorage.getItem('dj_whatsapp_phone');
        this.phoneInput.value = (saved && saved !== '593999999999') ? saved : '593988242058';
      }
      if (this.customAudioTitleInput) {
        this.customAudioTitleInput.value = localStorage.getItem('dj_custom_audio_title') || '';
      }
      if (this.customAudioUrlInput) {
        this.customAudioUrlInput.value = localStorage.getItem('dj_custom_audio_url') || '';
      }

      djAudioStorage.getAudio().then(stored => {
        if (stored) {
          this.updateAudioFileUI(stored.name, stored.size);
          if (this.customAudioTitleInput) {
            this.customAudioTitleInput.value = stored.title || stored.name.replace(/\.[^/.]+$/, "");
          }
        } else {
          this.clearAudioFileUI();
        }
      });

      if (this.adminEmergencyTools) {
        this.adminEmergencyTools.style.display = (this.currentUser && this.currentUser.role === 'admin') ? 'block' : 'none';
      }

      this.renderGenreChips();
      this.renderAdminQueue();
      if (window.djRealtimeSync) {
        window.djRealtimeSync.updateStatusUI();
      }
    }

    updateAudioFileUI(fileName, fileSize) {
      const sizeMb = fileSize ? (fileSize / (1024 * 1024)).toFixed(1) : '0';
      if (this.audioFileStatus) {
        this.audioFileStatus.style.display = 'flex';
        this.audioFileStatus.innerHTML = `<span>✓ Archivo guardado: <strong>${fileName}</strong> (${sizeMb} MB)</span>`;
      }
      if (this.uploadFileBtnText) {
        this.uploadFileBtnText.textContent = `Reemplazar archivo MP3 (${fileName})`;
      }
      if (this.removeAudioFileBtn) {
        this.removeAudioFileBtn.style.display = 'inline-flex';
      }
    }

    clearAudioFileUI() {
      if (this.audioFileStatus) {
        this.audioFileStatus.style.display = 'none';
        this.audioFileStatus.innerHTML = '';
      }
      if (this.uploadFileBtnText) {
        this.uploadFileBtnText.textContent = 'Elegir archivo MP3 local';
      }
      if (this.removeAudioFileBtn) {
        this.removeAudioFileBtn.style.display = 'none';
      }
    }

    renderGenreChips() {
      if (!this.genreChipsContainer) return;
      this.genreChipsContainer.innerHTML = '';
      const activeList = this.genreManager.data.activeGenres;
      this.genreManager.allAvailableGenres.forEach(genre => {
        const isActive = activeList.includes(genre);
        
        const wrapper = document.createElement('div');
        wrapper.style.display = 'inline-flex';
        wrapper.style.alignItems = 'center';
        wrapper.style.gap = '4px';
        wrapper.style.margin = '0 6px 8px 0';
        
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = `chip-btn ${isActive ? 'active' : ''}`;
        chip.innerHTML = `${isActive ? '✓ ' : '+ '} ${genre}`;
        chip.style.margin = '0';
        chip.addEventListener('click', () => {
          this.genreManager.toggleGenre(genre);
          this.renderGenreChips();
          if (window.audioPlayerInstance) {
            window.audioPlayerInstance.updateActiveTrack(true);
          }
        });
        
        const delBtn = document.createElement('button');
        delBtn.type = 'button';
        delBtn.innerHTML = '×';
        delBtn.style.background = 'rgba(244,63,94,0.15)';
        delBtn.style.color = '#f43f5e';
        delBtn.style.border = '1px solid rgba(244,63,94,0.3)';
        delBtn.style.borderRadius = '50%';
        delBtn.style.width = '24px';
        delBtn.style.height = '24px';
        delBtn.style.cursor = 'pointer';
        delBtn.style.display = 'flex';
        delBtn.style.alignItems = 'center';
        delBtn.style.justifyContent = 'center';
        delBtn.style.fontSize = '14px';
        delBtn.title = 'Eliminar permanentemente';
        delBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (confirm(`¿Eliminar permanentemente el género "` + genre + `"?`)) {
                this.genreManager.deleteGenre(genre);
                this.renderGenreChips();
                if (window.audioPlayerInstance) window.audioPlayerInstance.updateActiveTrack(true);
            }
        });
        
        wrapper.appendChild(chip);
        wrapper.appendChild(delBtn);
        this.genreChipsContainer.appendChild(wrapper);
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
        card.style.padding = '0.85rem 1rem';
        card.style.marginBottom = '0.65rem';
        card.style.display = 'flex';
        card.style.alignItems = 'center';
        card.style.justifyContent = 'space-between';
        card.style.gap = '0.5rem';
        const isVip = req.isVipBypass;
        const verText = req.versionType === 'preference' ? `[${req.preferenceDetails}]` : '[Original]';

        card.innerHTML = `
          <div style="min-width: 0;">
            <div style="font-weight: 700; font-size: 0.92rem; color: #fff;">
              #${idx + 1} ${req.song} <span style="font-size: 0.78rem; color: var(--gold-light);">${verText}</span>
              ${isVip ? `<span class="badge badge-vip" style="font-size: 0.65rem; padding: 0.1rem 0.35rem;">VIP $ ${req.vipReceipt ? `[Ref: ${req.vipReceipt}]` : '' }</span>` : ''}
            </div>
            <div style="font-size: 0.78rem; color: var(--text-muted);">
              ${req.artist} • ${req.guest} • Estado: <strong>${req.status}</strong>
            </div>
          </div>
          <div style="display: flex; gap: 0.35rem; flex-shrink: 0;">
            <button type="button" class="btn btn-sm btn-primary-gold" title="Sonando Ahora" data-action="play" data-id="${req.id}" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;">🔥 Tocar</button>
            <button type="button" class="btn btn-sm btn-secondary" title="Aceptar" data-action="accept" data-id="${req.id}" style="padding: 0.3rem 0.5rem; font-size: 0.75rem;">✓</button>
            <button type="button" class="btn btn-sm btn-secondary" title="Completada" data-action="done" data-id="${req.id}" style="padding: 0.3rem 0.5rem; font-size: 0.75rem;">✨</button>
            <button type="button" class="btn btn-sm" title="Eliminar" data-action="delete" data-id="${req.id}" style="background: rgba(244,63,94,0.15); color: #f43f5e; padding: 0.3rem 0.5rem; font-size: 0.75rem;">✕</button>
          </div>
        `;
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
        list.forEach(r => { if (r.status === 'playing') r.status = 'accepted'; });
        item.status = 'playing';
        this.requestManager.showToast(`Ahora tocando: "${item.song}"`);
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
  }

  /* --- 8. MAIN BOOTSTRAPPER (Instant or DOMContentLoaded) --- */
  function bootstrapApp() {
    if (window.__djAppInitialized) return;
    window.__djAppInitialized = true;

    const genreManager = new GenreManager();
    const requestManager = new RequestManager();
    const qrManager = new QRManager(requestManager);
    window.djRealtimeSync = new DJRealtimeSyncEngine();
    const audioPlayer = new DJAudioPlayer(genreManager);
    window.audioPlayerInstance = audioPlayer;
    window.djPanelInstance = new DJBoothPanel(genreManager, requestManager);

    // Initial check for version preference field
    const prefRadio = document.getElementById('version-preference');
    toggleVersionPreference(prefRadio ? prefRadio.checked : false);

    // Mobile nav toggle
    const navToggle = document.getElementById('mobile-nav-toggle');
    const navLinks = document.getElementById('nav-links');
    if (navToggle && navLinks) {
      navToggle.addEventListener('click', () => {
        const isOpen = navLinks.style.display === 'flex';
        navLinks.style.display = isOpen ? 'none' : 'flex';
        if (!isOpen) {
          navLinks.style.flexDirection = 'column';
          navLinks.style.position = 'absolute';
          navLinks.style.top = '68px';
          navLinks.style.left = '0';
          navLinks.style.width = '100%';
          navLinks.style.background = '#0a0a0e';
          navLinks.style.padding = '1.25rem 2rem';
          navLinks.style.borderBottom = '1px solid var(--gold-border)';
          navLinks.style.zIndex = '150';
        }
      });
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 768) navLinks.style.display = 'none';
        });
      });
    }

    // WhatsApp booking inquiry generator
    const bookingBtn = document.getElementById('booking-whatsapp-btn');
    if (bookingBtn) {
      bookingBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const name = document.getElementById('booking-name') ? document.getElementById('booking-name').value.trim() : '';
        const date = document.getElementById('booking-date') ? document.getElementById('booking-date').value.trim() : '';
        const type = document.getElementById('booking-type') ? document.getElementById('booking-type').value : 'Boda de Alta Distinción';
        const guests = document.getElementById('booking-guests') ? document.getElementById('booking-guests').value.trim() : '';
        const notes = document.getElementById('booking-notes') ? document.getElementById('booking-notes').value.trim() : '';

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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrapApp);
  } else {
    bootstrapApp();
  }