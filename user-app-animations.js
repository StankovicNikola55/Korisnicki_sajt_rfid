// 🔥 FIREBASE CONFIGURATION
const firebaseConfig = {
  apiKey: "AIzaSyBixHfZ1NG0WD1j_66D-nwzB32MwUGNQ7Y",
  authDomain: "rfid-perionica.firebaseapp.com",
  databaseURL: "https://rfid-perionica-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "rfid-perionica",
  storageBucket: "rfid-perionica.appspot.com",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:xxxxxxxxxxxxxx"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// 🌟 GLOBAL VARIABLES
let currentFirma = null;
let currentUserName = null;
let currentUID = null;
let currentCredits = 0;
let tokens = 0;
let companyPinInput = "";
let userPinInput = "";
let adminPinInput = "";
let spendingHistory = [];
let availableUsers = [];
let isAdmin = false;
let adminData = [];
let allEmployeeHistory = [];
let selectedBox = null;

// 🎵 SOUND SYSTEM
let audioContext;
let sounds = {};

// Initialize audio system
function initAudio() {
  try {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    createSounds();
    console.log('✅ Audio system initialized successfully');
    
    // Test sounds are working
    console.log('🔊 Available sounds:', Object.keys(sounds));
  } catch (e) {
    console.log('❌ Audio not supported:', e);
  }
}

// Create MEGA SATISFYING sound effects
function createSounds() {
  // 🪙 Coin drop sound (like real coins!)
  sounds.coinDrop = createCoinDropSound();
  
  // 🔥 Credit burn sound (epic whoosh)
  sounds.creditBurn = createEpicBurnSound();
  
  // 🎉 Success sound (victory fanfare)
  sounds.success = createVictoryFanfare();
  
  // 🔘 Button click sound (satisfying click)
  sounds.buttonClick = createSatisfyingClick();
  
  // ⏰ Counter tick sound (slot machine style)
  sounds.tick = createSlotMachineTick();
  
  // 🌟 Confetti sound (magical sparkle)
  sounds.confetti = createMagicalSparkle();
  
  // 🚀 Credit increase sound (epic rise)
  sounds.creditIncrease = createEpicRise();
  
  // 🚗 Box selection sound (mechanical keyboard click)
  sounds.boxSelect = createMechanicalClickSound();
  
  // 👋 Customer welcome sound (satisfying chime)
  sounds.customerWelcome = createCustomerWelcomeSound();
}

// 🪙 REALISTIC COIN DROP SOUND
function createCoinDropSound() {
  return function() {
    if (!audioContext) return;
    
    // Multiple coin drops with different frequencies
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Random coin frequency (like real coins)
        const freq = 600 + Math.random() * 400;
        oscillator.frequency.value = freq;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
      }, i * 100);
    }
  };
}

// 🔥 EPIC CREDIT BURN SOUND
function createEpicBurnSound() {
  return function() {
    if (!audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Epic descending tone with distortion
    oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.5);
    
    gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };
}

// 🎉 VICTORY FANFARE
function createVictoryFanfare() {
  return function() {
    if (!audioContext) return;
    
    const notes = [523, 659, 784, 1047]; // C, E, G, C (high)
    const duration = 0.2;
    
    notes.forEach((freq, index) => {
      setTimeout(() => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = freq;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
      }, index * 150);
    });
  };
}

// 🌟 MAGICAL SPARKLE SOUND
function createMagicalSparkle() {
  return function() {
    if (!audioContext) return;
    
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // High sparkle frequency
        oscillator.frequency.value = 2000 + Math.random() * 1000;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
      }, i * 50);
    }
  };
}

// 🔘 SATISFYING BUTTON CLICK
function createSatisfyingClick() {
  return function() {
    if (!audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 300;
    oscillator.type = 'square';
    
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.05);
  };
}

// ⏰ SLOT MACHINE TICK
function createSlotMachineTick() {
  return function() {
    if (!audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.03);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.03);
  };
}

// 🚀 EPIC CREDIT INCREASE
function createEpicRise() {
  return function() {
    if (!audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Ascending tone like a rocket
    oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.4);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.4);
  };
}

// 🚗 MECHANICAL KEYBOARD CLICK SOUND
function createMechanicalClickSound() {
  return function() {
    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 1200; // Higher frequency for crispness
    oscillator.type = 'square'; // Square wave for mechanical feel

    filter.type = 'lowpass';
    filter.frequency.value = 2000; // Cutoff frequency
    filter.Q.value = 1; // Resonance

    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime); // Start volume
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.08); // Quick decay

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.08); // Short duration
  };
}

// 🪙 CREATE COIN RAIN ANIMATION
function createCoinRain(amount, targetElement) {
  const container = document.getElementById('animationContainer');
  const rect = targetElement.getBoundingClientRect();
  
  for (let i = 0; i < Math.min(amount, 10); i++) { // Max 10 coins for performance
    setTimeout(() => {
      const coin = document.createElement('div');
      coin.className = 'coin';
      coin.style.left = rect.left + Math.random() * rect.width + 'px';
      coin.style.top = '0px';
      
      container.appendChild(coin);
      
      // Remove coin after animation
      setTimeout(() => {
        if (coin.parentNode) {
          coin.parentNode.removeChild(coin);
        }
      }, 1500);
    }, i * 100); // Stagger coins
  }
}

// Create a beep sound
function createBeep(frequency, duration, type) {
  return function() {
    if (!audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  };
}

// Create descending tone for credit burn
function createDescendingTone() {
  return function() {
    if (!audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.3);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };
}

// Create success chord
function createSuccessChord() {
  return function() {
    if (!audioContext) return;
    
    const frequencies = [523, 659, 784]; // C, E, G
    const duration = 0.4;
    
    frequencies.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = freq;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime + index * 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + index * 0.1 + duration);
      
      oscillator.start(audioContext.currentTime + index * 0.1);
      oscillator.stop(audioContext.currentTime + index * 0.1 + duration);
    });
  };
}

// Play MEGA SATISFYING sound with enhanced haptic feedback
function playSound(soundName) {
  if (sounds[soundName]) {
    sounds[soundName]();
    
    // 🌟 ENHANCED HAPTIC FEEDBACK (only after user interaction)
    if ('vibrate' in navigator && window.userHasInteracted) {
      try {
        switch(soundName) {
          case 'coinDrop':
            navigator.vibrate([50, 100, 50]); // Double vibration for coins
            break;
          case 'creditBurn':
            navigator.vibrate([100, 50, 100, 50, 100]); // Epic vibration pattern
            break;
          case 'success':
            navigator.vibrate([50, 100, 50, 100, 50, 100]); // Victory vibration
            break;
          case 'confetti':
            navigator.vibrate([30, 30, 30, 30, 30]); // Sparkle vibration
            break;
          default:
            navigator.vibrate(50); // Default vibration
        }
      } catch (error) {
        // Silently ignore vibration errors (browser restrictions)
        console.log('🔇 Vibration blocked by browser:', error.message);
      }
    }
  }
}

// 🎮 MEGA SATISFYING ANIMATION FUNCTIONS
function createCoinRain(amount, targetElement) {
  const container = document.getElementById('animationContainer');
  const rect = targetElement.getBoundingClientRect();
  
  // 🌟 3D Credit Stack Effect
  targetElement.classList.add('credits-display');
  
  for (let i = 0; i < Math.min(amount, 15); i++) { // Increased for more satisfaction
    setTimeout(() => {
      const coin = document.createElement('div');
      coin.className = 'coin';
      coin.style.left = rect.left + Math.random() * rect.width + 'px';
      coin.style.top = '0px';
      
      // Add 3D rotation and scale
      coin.style.transform = `rotateY(${Math.random() * 360}deg) rotateX(${Math.random() * 360}deg)`;
      
      container.appendChild(coin);
      
      // Remove coin after animation
      setTimeout(() => {
        if (coin.parentNode) {
          coin.parentNode.removeChild(coin);
        }
      }, 1500);
    }, i * 80); // Faster for more excitement
  }
  
  // 🎉 Confetti explosion when credits are added
  createConfettiExplosion(rect.left + rect.width/2, rect.top + rect.height/2);
}

// 🎉 MEGA CONFETTI EXPLOSION
function createConfettiExplosion(x, y, count = 50) {
  const container = document.getElementById('animationContainer');
  
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = x + 'px';
      confetti.style.top = y + 'px';
      
      // Random confetti properties
      confetti.style.transform = `rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random() * 0.5})`;
      confetti.style.animationDelay = `${Math.random() * 0.5}s`;
      confetti.style.animationDuration = `${2 + Math.random() * 2}s`;
      
      container.appendChild(confetti);
      
      // Remove confetti after animation
      setTimeout(() => {
        if (confetti.parentNode) {
          confetti.parentNode.removeChild(confetti);
        }
      }, 4000);
    }, i * 20); // Super fast confetti burst
  }
}

// 🌟 3D CREDIT STACK ANIMATION
function animateCreditStack(element, newValue, oldValue) {
  if (newValue > oldValue) {
    // Credits increased - celebrate!
    element.classList.add('slot-machine');
    element.classList.add('floating');
    
    // Add liquid gradient effect
    element.classList.add('liquid-bg');
    
    setTimeout(() => {
      element.classList.remove('slot-machine');
      element.classList.remove('liquid-bg');
    }, 500);
    
    // Keep floating for a while
    setTimeout(() => {
      element.classList.remove('floating');
    }, 3000);
  } else if (newValue < oldValue) {
    // Credits decreased - dramatic effect
    element.classList.add('fire-effect');
    
    setTimeout(() => {
      element.classList.remove('fire-effect');
    }, 2000);
  }
}

function createCreditBurn(amount, targetElement) {
  const container = document.getElementById('animationContainer');
  const rect = targetElement.getBoundingClientRect();
  
  const burn = document.createElement('div');
  burn.className = 'credit-burn';
  burn.style.left = rect.left + rect.width / 2 + 'px';
  burn.style.top = rect.top + rect.height / 2 + 'px';
  burn.textContent = `-${amount}`;
  
  container.appendChild(burn);
  
  // Remove burn after animation
  setTimeout(() => {
    if (burn.parentNode) {
      burn.parentNode.removeChild(burn);
    }
  }, 1000);
}

function createParticleBurst(x, y, count = 8) {
  const container = document.getElementById('animationContainer');
  
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    // Random direction
    const angle = (i / count) * Math.PI * 2;
    const distance = 50 + Math.random() * 50;
    const xOffset = Math.cos(angle) * distance;
    const yOffset = Math.sin(angle) * distance;
    
    particle.style.setProperty('--x', xOffset + 'px');
    particle.style.setProperty('--y', yOffset + 'px');
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, 800);
  }
}

function animateCounter(element) {
  element.classList.add('counter-animation');
  setTimeout(() => {
    element.classList.remove('counter-animation');
  }, 300);
}

function animateButton(button) {
  button.classList.add('button-press');
  setTimeout(() => {
    button.classList.remove('button-press');
  }, 100);
}

// 🔄 LOCAL STORAGE CHECK
window.addEventListener('load', ()=>{
  const savedFirma = localStorage.getItem("firma");
  const savedUser = localStorage.getItem("userName");
  const savedUID = localStorage.getItem("uid");
  if(savedFirma && savedUser && savedUID){
    currentFirma = savedFirma;
    currentUserName = savedUser;
    currentUID = savedUID;
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("appBox").classList.remove("hidden");
    document.getElementById("welcomeText").innerText = `👋 Zdravo, ${currentUserName}`;
    
    // Play satisfying customer welcome sound with visual feedback
    setTimeout(() => {
      console.log('🔊 [localStorage] Attempting to play customer welcome sound...');
      console.log('🔊 [localStorage] Available sounds:', Object.keys(sounds));
      console.log('🔊 [localStorage] customerWelcome sound exists:', !!sounds.customerWelcome);
      
      if (sounds.customerWelcome) {
        playSound('customerWelcome');
        console.log('✅ [localStorage] Customer welcome sound played successfully');
      } else {
        console.log('❌ [localStorage] Customer welcome sound not available');
      }
      
      // Add subtle glow effect to welcome text
      const welcomeText = document.getElementById("welcomeText");
      welcomeText.style.animation = "textGlow 1.5s ease-in-out";
      setTimeout(() => {
        welcomeText.style.animation = "";
      }, 1500);
    }, 200);
    
    loadUserData();
  }
});

// 📊 LOAD USER DATA
function loadUserData() {
  console.log("🔄 Loading user data for firma:", currentFirma);
  
  if (!currentFirma) {
    console.error("❌ No currentFirma set!");
    return;
  }
  
  // Load company credits with real-time listener
  firebase.database().ref("firms/"+currentFirma+"/credits").on('value', s=>{
    console.log("💰 Credits snapshot received:", s.exists(), s.val());
    
    if(s.exists()){
      const newCredits = s.val();
      const creditsElement = document.getElementById("creditsCount");
      const oldCredits = currentCredits;
      
      console.log("💳 Credits update:", oldCredits, "→", newCredits);
      
      currentCredits = newCredits;
      creditsElement.innerText = currentCredits;
      
      // 🎮 Animation when credits increase
      if (newCredits > oldCredits && oldCredits > 0) {
        const increase = newCredits - oldCredits;
        createCoinRain(increase, creditsElement);
        playSound('coinDrop');
        animateCounter(creditsElement);
      }
      
      updateSpendingInfo();
    } else {
      console.warn("⚠️ Credits not found for firma:", currentFirma);
      // Set credits to 0 if not found
      currentCredits = 0;
      document.getElementById("creditsCount").innerText = "0";
    }
  }, error => {
    console.error("❌ Error loading credits:", error);
    currentCredits = 0;
    document.getElementById("creditsCount").innerText = "0";
  });
  
  // Load spending history
  if (currentUID) {
    loadSpendingHistory();
  } else {
    console.warn("⚠️ No currentUID available, skipping spending history load");
  }
}

// 📊 LOAD SPENDING HISTORY
function loadSpendingHistory() {
  if (!currentUID) {
    console.warn("⚠️ No currentUID available for loading spending history");
    return;
  }
  
  firebase.database().ref("cards/" + currentUID + "/history").on('value', snapshot => {
    if(snapshot.exists()) {
      const history = snapshot.val();
      displayUserHistory(history);
    } else {
      document.getElementById("historyList").innerHTML = "<p>Još niste potrošili kredite</p>";
    }
  }, error => {
    console.error("❌ Error loading spending history:", error);
    document.getElementById("historyList").innerHTML = "<p>Greška pri učitavanju istorije</p>";
  });
}



// 📊 UPDATE SPENDING INFO
function updateSpendingInfo() {
  // This function can be expanded later to show spending statistics
  // For now, it's a placeholder that gets called when credits change
}

// 📊 DISPLAY USER HISTORY
function displayUserHistory(history) {
  const historyList = document.getElementById("historyList");
  if (!history || Object.keys(history).length === 0) {
    historyList.innerHTML = "<p>Još niste potrošili kredite</p>";
    return;
  }
  
  let historyHTML = '';
  const sortedHistory = Object.entries(history)
    .sort(([,a], [,b]) => b.timestamp - a.timestamp)
    .slice(0, 10); // Show last 10 transactions
  
  sortedHistory.forEach(([key, entry]) => {
    const date = new Date(entry.date || entry.timestamp).toLocaleDateString('sr-RS');
    const time = new Date(entry.date || entry.timestamp).toLocaleTimeString('sr-RS', {hour: '2-digit', minute: '2-digit'});
    
    historyHTML += `
      <div class="history-item">
        <div class="history-info">
          <span class="history-date">${date} ${time}</span>
          <span class="history-box">Box: ${entry.box || 'N/A'}</span>
        </div>
        <div class="history-amount">-${entry.amount} kredita</div>
      </div>
    `;
  });
  
  historyList.innerHTML = historyHTML;
}

// 🔐 COMPANY PIN FUNCTIONS
function pressCompanyPin(num){
  if(companyPinInput.length < 4){
    companyPinInput += num;
    updateCompanyDots();
    playSound('buttonClick');
    if(companyPinInput.length === 4){
      submitCompanyPin();
    }
  }
}

function clearCompanyPin(){
  companyPinInput = companyPinInput.slice(0,-1);
  updateCompanyDots();
  playSound('buttonClick');
}

function updateCompanyDots(){
  for(let i=1;i<=4;i++){
    document.getElementById('companyDot'+i).classList.remove('filled');
  }
  for(let i=1;i<=companyPinInput.length;i++){
    document.getElementById('companyDot'+i).classList.add('filled');
  }
}

function submitCompanyPin(){
  if(companyPinInput.length<4)return;
  verifyCompanyPin(companyPinInput);
}

function verifyCompanyPin(pinValue){
  const firma = document.getElementById("firmaName").value.trim();
  
  if(!firma || !pinValue){
    showStatus("companyStatus", "⚠️ Popuni ime firme i PIN!", "warning");
    companyPinInput = ""; 
    updateCompanyDots();
    return;
  }
  
  showStatus("companyStatus", "🔍 Proveravam firmu...", "warning");
  
  console.log("🔍 [DEBUG] Starting company PIN verification...");
  console.log("🔍 [DEBUG] Company name:", firma);
  console.log("🔍 [DEBUG] PIN entered:", pinValue);
  console.log("🔍 [DEBUG] PIN length:", pinValue.length);
  
  firebase.database().ref("firms/"+firma+"/pin").get().then(snap=>{
    console.log("🔍 [DEBUG] Firebase response received");
    console.log("🔍 [DEBUG] Snapshot exists:", snap.exists());
    console.log("🔍 [DEBUG] Stored PIN:", snap.exists() ? snap.val() : "NOT FOUND");
    console.log("🔍 [DEBUG] PIN comparison:", snap.exists() ? `"${snap.val()}" === "${pinValue}"` : "N/A");
    console.log("🔍 [DEBUG] PIN match result:", snap.exists() && snap.val() === pinValue);
    
    if(snap.exists() && snap.val() === pinValue){
      currentFirma = firma;
      console.log("✅ Company verified, currentFirma set to:", currentFirma);
      showStatus("companyStatus", "✅ Firma verifikovana!", "success");
      
      // Load users for this company
      loadCompanyUsers();
      
      // Move to step 2
      setTimeout(() => {
        document.getElementById("step1").classList.add("hidden");
        document.getElementById("step2").classList.remove("hidden");
      }, 1000);
      
    } else {
      console.error("❌ Company PIN verification failed for:", firma);
      if (!snap.exists()) {
        console.error("❌ [DEBUG] Company not found in Firebase");
      } else {
        console.error("❌ [DEBUG] PIN mismatch - Expected:", snap.val(), "Got:", pinValue);
      }
      showStatus("companyStatus", "❌ Pogrešan PIN firme!", "error");
    }
    companyPinInput = "";
    updateCompanyDots();
  }).catch(error => {
    console.error("❌ Error verifying company PIN:", error);
    showStatus("companyStatus", "❌ Greška pri verifikaciji!", "error");
    companyPinInput = "";
    updateCompanyDots();
  });
}

// 👥 LOAD COMPANY USERS
function loadCompanyUsers() {
  firebase.database().ref("cards").once('value').then(snapshot => {
    if(snapshot.exists()) {
      availableUsers = [];
      const cards = snapshot.val();
      
      for(let uid in cards) {
        if(cards[uid].firm === currentFirma) {
          availableUsers.push({
            uid: uid,
            name: cards[uid].name,
            userPin: cards[uid].userPin
          });
        }
      }
      
      // Populate user dropdown
      const userSelect = document.getElementById("userSelect");
      userSelect.innerHTML = "<option value=''>-- Izaberi korisnika --</option>";
      
      availableUsers.forEach(user => {
        const option = document.createElement("option");
        option.value = user.uid;
        option.textContent = user.name;
        userSelect.appendChild(option);
      });
    }
  });
}

// 🔐 USER PIN FUNCTIONS
function pressUserPin(num){
  if(userPinInput.length < 4){
    userPinInput += num;
    updateUserDots();
    playSound('buttonClick');
    if(userPinInput.length === 4){
      submitUserPin();
    }
  }
}

function clearUserPin(){
  userPinInput = userPinInput.slice(0,-1);
  updateUserDots();
  playSound('buttonClick');
}

function updateUserDots(){
  for(let i=1;i<=4;i++){
    document.getElementById('userDot'+i).classList.remove('filled');
  }
  for(let i=1;i<=userPinInput.length;i++){
    document.getElementById('userDot'+i).classList.add('filled');
  }
}

function submitUserPin(){
  if(userPinInput.length<4)return;
  verifyUserLogin();
}

function verifyUserLogin(){
  const selectedUser = document.getElementById("userSelect").value;
  const manualUserName = document.getElementById("userName").value.trim();
  
  let targetUser = null;
  
  if(selectedUser) {
    // User selected from dropdown
    targetUser = availableUsers.find(u => u.uid === selectedUser);
  } else if(manualUserName) {
    // User typed manually
    targetUser = availableUsers.find(u => u.name.toLowerCase() === manualUserName.toLowerCase());
  }
  
  if(!targetUser) {
    showStatus("userStatus", "❌ Korisnik nije pronađen!", "error");
    userPinInput = "";
    updateUserDots();
    return;
  }
  
  // Verify user PIN
  if(targetUser.userPin === userPinInput) {
    // Success! Login user
    currentUserName = targetUser.name;
    currentUID = targetUser.uid;
    console.log("✅ User login successful:", currentUserName, "UID:", currentUID, "Firma:", currentFirma);
    
    localStorage.setItem("firma", currentFirma);
    localStorage.setItem("userName", currentUserName);
    localStorage.setItem("uid", currentUID);
    
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("appBox").classList.remove("hidden");
    document.getElementById("welcomeText").innerText = `👋 Zdravo, ${currentUserName}`;
    
    loadUserData();
    showStatus("userStatus", "✅ Uspešna prijava!", "success");
    
    // Play success sound for login
    setTimeout(() => playSound('success'), 100);
    
    // Play satisfying customer welcome sound with visual feedback
    setTimeout(() => {
      console.log('🔊 [Fresh Login] Attempting to play customer welcome sound...');
      console.log('🔊 [Fresh Login] Available sounds:', Object.keys(sounds));
      console.log('🔊 [Fresh Login] customerWelcome sound exists:', !!sounds.customerWelcome);
      
      if (sounds.customerWelcome) {
        playSound('customerWelcome');
        console.log('✅ [Fresh Login] Customer welcome sound played successfully');
      } else {
        console.log('❌ [Fresh Login] Customer welcome sound not available');
      }
      
      // Add subtle glow effect to welcome text
      const welcomeText = document.getElementById("welcomeText");
      welcomeText.style.animation = "textGlow 1.5s ease-in-out";
      setTimeout(() => {
        welcomeText.style.animation = "";
      }, 1500);
    }, 600);
    
  } else {
    console.error("❌ User PIN verification failed");
    showStatus("userStatus", "❌ Pogrešan PIN korisnika!", "error");
  }
  
  userPinInput = "";
  updateUserDots();
}

// 🔐 Admin Login Functions
function showAdminLogin() {
  document.getElementById("step2").classList.add("hidden");
  document.getElementById("adminStep").classList.remove("hidden");
  adminPinInput = "";
  updateAdminDots();
}

function backToUserLogin() {
  document.getElementById("adminStep").classList.add("hidden");
  document.getElementById("step2").classList.remove("hidden");
  adminPinInput = "";
  updateAdminDots();
}

function pressAdminPin(digit) {
  if (adminPinInput.length < 4) {
    adminPinInput += digit;
    updateAdminDots();
    playSound('buttonClick');
  }
}

function clearAdminPin() {
  adminPinInput = "";
  updateAdminDots();
  playSound('buttonClick');
}

function updateAdminDots() {
  for (let i = 1; i <= 4; i++) {
    const dot = document.getElementById(`adminDot${i}`);
    if (i <= adminPinInput.length) {
      dot.classList.add("filled");
    } else {
      dot.classList.remove("filled");
    }
  }
}

function confirmAdminPin() {
  if (adminPinInput.length === 4) {
    // Check admin PIN in Firebase
    firebase.database().ref("firms/" + currentFirma + "/adminPin").once('value').then(snapshot => {
      if (snapshot.exists() && snapshot.val() === adminPinInput) {
        // Admin PIN correct - show admin dashboard
        isAdmin = true;
        document.getElementById("adminStep").classList.add("hidden");
        document.getElementById("adminDashboard").classList.remove("hidden");
        
        // Update admin firm name
        document.getElementById("adminFirmaName").textContent = currentFirma;
        
        // Play success sound for admin login
        setTimeout(() => playSound('success'), 100);
        
        // Load admin data
        loadAdminData();
        
        // Set up real-time listener for credit changes
        setupAdminRealTimeListener();
        
        // Clear PIN
        adminPinInput = "";
        updateAdminDots();
      } else {
        // Wrong PIN
        alert("❌ Pogrešan admin PIN!");
        adminPinInput = "";
        updateAdminDots();
      }
    });
  }
}

// 🔄 SETUP ADMIN REAL-TIME LISTENER
function setupAdminRealTimeListener() {
  if (!currentFirma) {
    console.warn("⚠️ No currentFirma available for admin real-time listener");
    return;
  }
  
  // Listen for credit changes in real-time
  firebase.database().ref("firms/" + currentFirma + "/credits").on('value', snapshot => {
    if (snapshot.exists() && isAdmin) {
      // Refresh admin data when credits change
      loadAdminData();
    }
  }, error => {
    console.error("❌ Error in admin real-time listener:", error);
  });
}

// 🚪 ADMIN LOGOUT
function adminLogout() {
  isAdmin = false;
  adminData = [];
  allEmployeeHistory = [];
  
  // Hide admin dashboard
  document.getElementById("adminDashboard").classList.add("hidden");
  
  // Show login box
  document.getElementById("loginBox").classList.remove("hidden");
  
  // Reset to step 1
  document.getElementById("step1").classList.remove("hidden");
  document.getElementById("step2").classList.add("hidden");
  document.getElementById("adminStep").classList.add("hidden");
  
  // Clear inputs
  document.getElementById("firmaName").value = "";
  companyPinInput = "";
  updateCompanyDots();
  
  // Reset current state
  currentFirma = null;
  currentUserUID = null;
  currentUserCard = null;
}

// 🎯 TOKEN FUNCTIONS
function increase(){
  if(tokens < currentCredits) {
    tokens++;
    const counter = document.getElementById("tokenCount");
    counter.innerText = tokens;
    document.getElementById("manualTokens").value = tokens;
    
    // 🎮 Animation & Sound
    animateCounter(counter);
    playSound('tick');
    createParticleBurst(counter.offsetLeft + counter.offsetWidth/2, counter.offsetTop + counter.offsetHeight/2, 4);
  }
}

function decrease(){
  if(tokens>0){
    tokens--;
    const counter = document.getElementById("tokenCount");
    counter.innerText = tokens;
    document.getElementById("manualTokens").value = tokens;
    
    // 🎮 Animation & Sound
    animateCounter(counter);
    playSound('tick');
    createParticleBurst(counter.offsetLeft + counter.offsetWidth/2, counter.offsetTop + counter.offsetHeight/2, 4);
  }
}

function manualChange(){
  let val = parseInt(document.getElementById("manualTokens").value);
  if(!isNaN(val) && val >= 0 && val <= currentCredits){
    tokens = val;
    document.getElementById("tokenCount").innerText = tokens;
  } else if(val > currentCredits) {
    document.getElementById("manualTokens").value = currentCredits;
    tokens = currentCredits;
    document.getElementById("tokenCount").innerText = tokens;
  }
}

// 🚗 Box Selection Functions
function selectBox(boxKey) {
  // Enable vibration on box selection
  if (window.enableVibration) {
    window.enableVibration();
  }
  
  // Don't do anything if clicking the same box
  if (selectedBox === boxKey) {
    console.log('🔄 Same box clicked, no action needed');
    return;
  }
  
  // Deselect previous box
  if (selectedBox && selectedBox !== boxKey) {
    const previousCard = document.getElementById(selectedBox + 'Card');
    previousCard.classList.remove('selected');
    // Smooth transition back to normal size
    previousCard.style.transform = 'scale(1)';
    // Play deselection sound (softer click)
    if (sounds.buttonClick) {
      sounds.buttonClick();
    }
  }
  
  // Select new box
  selectedBox = boxKey;
  const selectedCard = document.getElementById(boxKey + 'Card');
  selectedCard.classList.add('selected');
  
  // Add a small bounce animation for extra satisfaction
  selectedCard.style.transform = 'scale(1.1)';
  setTimeout(() => {
    selectedCard.style.transform = 'scale(1.05)';
  }, 100);
  
  // Ensure audio context is resumed (required by some browsers)
  if (audioContext && audioContext.state === 'suspended') {
    audioContext.resume();
  }
  
  // Play selection sound
  if (sounds.boxSelect) {
    console.log('🔊 Playing box selection sound for:', boxKey);
    sounds.boxSelect();
  } else {
    console.log('⚠️ Box selection sound not available');
  }
  
  // Update send button state
  updateSendButtonState();
}

// 🧪 Test function for debugging sounds
function testBoxSelectionSound() {
  console.log('🧪 Testing box selection sound...');
  if (sounds.boxSelect) {
    sounds.boxSelect();
    console.log('✅ Box selection sound played successfully');
  } else {
    console.log('❌ Box selection sound not available');
  }
}

// 🧪 Test function for customer welcome sound
function testCustomerWelcomeSound() {
  console.log('🧪 Testing customer welcome sound...');
  console.log('🔊 Available sounds:', Object.keys(sounds));
  console.log('🔊 customerWelcome sound exists:', !!sounds.customerWelcome);
  console.log('🔊 Audio context state:', audioContext ? audioContext.state : 'No audio context');
  
  if (sounds.customerWelcome) {
    sounds.customerWelcome();
    console.log('✅ Customer welcome sound played successfully');
  } else {
    console.log('❌ Customer welcome sound not available');
  }
}

// 👋 CUSTOMER WELCOME SOUND - Super satisfying chime
function createCustomerWelcomeSound() {
  return function() {
    if (!audioContext) return;

    // Create a beautiful ascending chord progression (like a welcoming bell)
    const notes = [
      { freq: 523, delay: 0, duration: 0.4 },    // C (root)
      { freq: 659, delay: 0.1, duration: 0.4 },  // E (third)
      { freq: 784, delay: 0.2, duration: 0.4 },  // G (fifth)
      { freq: 1047, delay: 0.3, duration: 0.4 } // C (octave)
    ];

    notes.forEach(note => {
      setTimeout(() => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();

        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Beautiful sine wave for warm, welcoming tone
        oscillator.frequency.value = note.freq;
        oscillator.type = 'sine';

        // Gentle lowpass filter for smoothness
        filter.type = 'lowpass';
        filter.frequency.value = note.freq * 1.5;
        filter.Q.value = 0.7;

        // Smooth volume envelope
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.25, audioContext.currentTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + note.duration);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + note.duration);
      }, note.delay * 1000);
    });
  };
}

function updateSendButtonState() {
  const sendBtn = document.getElementById('sendBtn');
  if (selectedBox) {
    sendBtn.disabled = false;
    sendBtn.style.opacity = '1';
    sendBtn.classList.remove('disabled');
  } else {
    sendBtn.disabled = true;
    sendBtn.style.opacity = '0.6';
    sendBtn.classList.add('disabled');
  }
}







// 🚀 SEND TOKENS
function sendTokens(){
  if(!currentFirma || !currentUID){
    showStatus("status", "⚠️ Nisi prijavljen!", "error");
    return;
  }
  if(tokens <= 0){
    showStatus("status", "⚠️ Unesi barem 1 žeton", "warning");
    return;
  }
  if(tokens > currentCredits){
    showStatus("status", "⚠️ Nema dovoljno kredita!", "error");
    return;
  }
  if(!selectedBox){
    showStatus("status", "⚠️ Izaberi box za pranje!", "warning");
    return;
  }
  
  // Disable send button and show loading
  const sendBtn = document.getElementById("sendBtn");
  sendBtn.disabled = true;
  sendBtn.innerHTML = "⏳ Slanje...";
  
  const newCredits = currentCredits - tokens;
  const timestamp = Date.now();
  
  // Add to history
  const historyEntry = {
    amount: tokens,
    timestamp: timestamp,
    firma: currentFirma,
    box: selectedBox || 'N/A',
    date: new Date().toISOString()
  };
  
  firebase.database().ref("firms/"+currentFirma+"/credits").set(newCredits).then(()=>{
    return firebase.database().ref("cards/"+currentUID+"/used").get();
  }).then(snap=>{
    let used = 0;
    if(snap.exists()) used = snap.val();
    used += tokens;
    
    // Update usage
    return firebase.database().ref("cards/"+currentUID+"/used").set(used);
  }).then(()=>{
    // Add to history
    return firebase.database().ref("cards/"+currentUID+"/history").push(historyEntry);
  }).then(()=>{
    // Send command to ESP32 (box-specific path)
    const commandPath = selectedBox ? 
      `commands/${currentFirma}/${selectedBox}` : 
      `commands/${currentFirma}`;
    return firebase.database().ref(commandPath).set(tokens);
  }).then(()=>{
    showStatus("status", `✅ Poslato ${tokens} žetona!`, "success");
    
    // 🎮 MEGA ANIMATION & SOUND SHOW!
    const creditsDisplay = document.getElementById("creditsCount");
    const counter = document.getElementById("tokenCount");
    
    // Credit burn animation
    createCreditBurn(tokens, creditsDisplay);
    playSound('creditBurn');
    
    // Particle burst at counter
    createParticleBurst(counter.offsetLeft + counter.offsetWidth/2, counter.offsetTop + counter.offsetHeight/2, 12);
    
    // Success sound
    setTimeout(() => playSound('success'), 300);
    
    // Reset tokens
    tokens = 0;
    counter.innerText = tokens;
    document.getElementById("manualTokens").value = "";
    
    // Reset box selection
    if (selectedBox) {
      document.getElementById(selectedBox + 'Card').classList.remove('selected');
      selectedBox = null;
      updateSendButtonState();
    }
    
    // Re-enable send button
    sendBtn.disabled = false;
    sendBtn.innerHTML = "Pošalji žetone";
    
    // Refresh data
    loadUserData();
  }).catch(error => {
    console.error("❌ Error in sendTokens:", error);
    showStatus("status", "❌ Greška pri slanju: " + error.message, "error");
    sendBtn.disabled = false;
    sendBtn.innerHTML = "Pošalji žetone";
  });
}

// 📝 UTILITY FUNCTIONS
function showStatus(elementId, message, type) {
  const element = document.getElementById(elementId);
  element.innerText = message;
  element.className = `status ${type}`;
  
  // Auto-clear success messages after 3 seconds
  if(type === 'success') {
    setTimeout(() => {
      element.innerText = '';
      element.className = 'status';
    }, 3000);
  }
}

function logout(){
  // Clean up Firebase listeners to prevent memory leaks
  if (currentFirma) {
    firebase.database().ref("firms/" + currentFirma + "/credits").off();
    firebase.database().ref("cards/" + currentUID + "/history").off();
  }
  
  localStorage.removeItem("firma");
  localStorage.removeItem("userName");
  localStorage.removeItem("uid");
  currentFirma = null;
  currentUserName = null;
  currentUID = null;
  currentCredits = 0;
  tokens = 0;
  spendingHistory = [];
  availableUsers = [];
  companyPinInput = "";
  userPinInput = "";
  adminPinInput = "";
  isAdmin = false;
  adminData = [];
  allEmployeeHistory = [];
  selectedBox = null;
  
  document.getElementById("tokenCount").innerText = "0";
  document.getElementById("manualTokens").value = "";
  document.getElementById("loginBox").classList.remove("hidden");
  document.getElementById("appBox").classList.add("hidden");
  document.getElementById("adminDashboard").classList.add("hidden");
  document.getElementById("step1").classList.remove("hidden");
  document.getElementById("step2").classList.add("hidden");
  document.getElementById("firmaName").value = "";
  document.getElementById("userName").value = "";
  document.getElementById("userSelect").value = "";
  document.getElementById("companyStatus").innerText = "";
  document.getElementById("userStatus").innerText = "";
  document.getElementById("status").innerText = "";
  document.getElementById("historyList").innerHTML = "";
  
  // Reset box selection - always reset both boxes to be safe
  document.getElementById('box2Card').classList.remove('selected');
  document.getElementById('box3Card').classList.remove('selected');
  
  // Also reset the send button state
  const sendBtn = document.getElementById("sendBtn");
  if (sendBtn) {
    sendBtn.disabled = true;
    sendBtn.style.opacity = "0.6";
    sendBtn.classList.add("disabled");
  }
  
  updateCompanyDots();
  updateUserDots();
  updateSendButtonState();
}

// 🔍 Admin Data Management Functions
function loadAdminData() {
  // Load all employee data for the company
  firebase.database().ref("cards").once('value').then(snapshot => {
    if(snapshot.exists()) {
      const cards = snapshot.val();
      allEmployeeHistory = [];
      
      // Get all employees for this company
      const employees = Object.entries(cards).filter(([uid, card]) => card.firm === currentFirma);
      
      // Load spending history for each employee
      const promises = employees.map(([uid, card]) => {
        return firebase.database().ref("cards/" + uid + "/history").once('value').then(historySnap => {
          if(historySnap.exists()) {
            const history = historySnap.val();
            Object.entries(history).forEach(([key, entry]) => {
              allEmployeeHistory.push({
                uid: uid,
                name: card.name,
                amount: entry.amount,
                rsd: entry.amount * 100, // Convert credits to RSD (1 credit = 100 RSD)
                timestamp: entry.timestamp,
                box: entry.box || 'N/A',
                date: entry.date || new Date(entry.timestamp).toISOString()
              });
            });
          }
        });
      });
      
      Promise.all(promises).then(() => {
        updateAdminStats();
        displayAdminTable();
      });
    }
  });
}

function updateAdminStats() {
  const totalEmployees = new Set(allEmployeeHistory.map(entry => entry.uid)).size;
  const totalTokens = allEmployeeHistory.reduce((sum, entry) => sum + entry.amount, 0);
  const totalRSD = totalTokens * 100; // Convert to RSD
  const totalWashes = allEmployeeHistory.length;
  const averagePerEmployee = totalEmployees > 0 ? Math.round(totalTokens / totalEmployees) : 0;
  const averageRSD = averagePerEmployee * 100; // Convert to RSD
  
  document.getElementById("adminTotalEmployees").textContent = totalEmployees;
  document.getElementById("adminTotalTokens").textContent = totalTokens;
  document.getElementById("adminTotalRSD").textContent = totalRSD.toLocaleString() + " RSD";
  document.getElementById("adminTotalWashes").textContent = totalWashes;
  document.getElementById("adminAveragePerEmployee").textContent = averagePerEmployee;
  document.getElementById("adminAverageRSD").textContent = averageRSD.toLocaleString() + " RSD";
}

function displayAdminTable() {
  const tableBody = document.getElementById("adminTableBody");
  
  // Group spending data by user
  const userGroups = {};
  
  allEmployeeHistory.forEach(entry => {
    if (!userGroups[entry.uid]) {
      userGroups[entry.uid] = {
        uid: entry.uid,
        name: entry.name,
        totalCredits: 0,
        totalRSD: 0,
        transactions: [],
        lastBox: 'N/A',
        lastWash: null
      };
    }
    
    userGroups[entry.uid].totalCredits += entry.amount;
    userGroups[entry.uid].totalRSD += entry.rsd;
    userGroups[entry.uid].transactions.push(entry);
    
    // Track last wash and box
    if (!userGroups[entry.uid].lastWash || entry.timestamp > userGroups[entry.uid].lastWash) {
      userGroups[entry.uid].lastWash = entry.timestamp;
      userGroups[entry.uid].lastBox = entry.box;
    }
  });
  
  // Convert to array and sort by total spending
  const userArray = Object.values(userGroups).sort((a, b) => b.totalCredits - a.totalCredits);
  
  let tableHTML = '';
  userArray.forEach((user, index) => {
    const lastWashDate = user.lastWash ? new Date(user.lastWash).toLocaleDateString('sr-RS') : 'N/A';
    
    tableHTML += `
      <tr class="user-row" data-user-id="${user.uid}">
        <td><strong>${user.name}</strong></td>
        <td><span class="credit-amount">${user.totalCredits}</span></td>
        <td><span class="rsd-amount">${user.totalRSD.toLocaleString()} RSD</span></td>
        <td><span class="box-info">${user.lastBox}</span></td>
        <td>${lastWashDate}</td>
        <td>
          <button class="details-btn" onclick="toggleUserDetails('${user.uid}')" id="detailsBtn_${user.uid}">
            🔍 Prikaži detalje
          </button>
        </td>
      </tr>
      <tr class="details-row hidden" id="detailsRow_${user.uid}">
        <td colspan="6">
          <div class="user-details">
            <h4>📋 Detaljna istorija za ${user.name}</h4>
            <div class="transactions-list">
              ${user.transactions.sort((a, b) => b.timestamp - a.timestamp).map(transaction => {
                // Use timestamp if date doesn't exist, fallback to current time if neither exists
                const transactionTime = transaction.date || transaction.timestamp || Date.now();
                const date = new Date(transactionTime).toLocaleDateString('sr-RS');
                const time = new Date(transactionTime).toLocaleTimeString('sr-RS', {hour: '2-digit', minute: '2-digit'});
                const box = transaction.box || 'N/A';
                
                return `
                  <div class="transaction-item">
                    <div class="transaction-info">
                      <span class="transaction-date">📅 ${date} ⏰ ${time}</span>
                      <span class="transaction-box">🚗 Box: ${box}</span>
                    </div>
                    <div class="transaction-amounts">
                      <span class="credit-amount">💸 ${transaction.amount} kredita</span>
                      <span class="rsd-amount">💰 ${transaction.rsd.toLocaleString()} RSD</span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </td>
      </tr>
    `;
  });
  
  tableBody.innerHTML = tableHTML;
}

function toggleUserDetails(userId) {
  const detailsRow = document.getElementById(`detailsRow_${userId}`);
  const detailsBtn = document.getElementById(`detailsBtn_${userId}`);
  
  if (detailsRow.classList.contains('hidden')) {
    // Show details
    detailsRow.classList.remove('hidden');
    detailsBtn.textContent = '🔍 Sakrij detalje';
    detailsBtn.classList.add('active');
  } else {
    // Hide details
    detailsRow.classList.add('hidden');
    detailsBtn.textContent = '🔍 Prikaži detalje';
    detailsBtn.classList.remove('active');
  }
}

function filterAdminData() {
  const searchTerm = document.getElementById("adminSearch").value.toLowerCase();
  const period = document.getElementById("adminPeriod").value;
  const sortBy = document.getElementById("adminSort").value;
  
  // Group spending data by user (same logic as displayAdminTable)
  const userGroups = {};
  
  allEmployeeHistory.forEach(entry => {
    if (!userGroups[entry.uid]) {
      userGroups[entry.uid] = {
        uid: entry.uid,
        name: entry.name,
        totalCredits: 0,
        totalRSD: 0,
        transactions: [],
        lastBox: 'N/A',
        lastWash: null
      };
    }
    
    userGroups[entry.uid].totalCredits += entry.amount;
    userGroups[entry.uid].totalRSD += entry.rsd;
    userGroups[entry.uid].transactions.push(entry);
    
    // Track last wash and box
    if (!userGroups[entry.uid].lastWash || entry.timestamp > userGroups[entry.uid].lastWash) {
      userGroups[entry.uid].lastWash = entry.timestamp;
      userGroups[entry.uid].lastBox = entry.box;
    }
  });
  
  let filteredData = Object.values(userGroups);
  
  // Filter by search term
  if(searchTerm) {
    filteredData = filteredData.filter(user => 
      user.name.toLowerCase().includes(searchTerm)
    );
  }
  
  // Filter by period
  if(period !== 'all') {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    filteredData = filteredData.filter(user => {
      // Check if any transaction is within the period
      return user.transactions.some(transaction => {
        const entryDate = new Date(transaction.date);
        switch(period) {
          case 'today':
            return entryDate >= today;
          case 'week':
            return entryDate >= weekAgo;
          case 'month':
            return entryDate >= monthAgo;
          default:
            return true;
        }
      });
    });
  }
  
  // Sort data
  switch(sortBy) {
    case 'time':
      filteredData.sort((a, b) => (b.lastWash || 0) - (a.lastWash || 0));
      break;
    case 'amount':
      filteredData.sort((a, b) => b.totalCredits - a.totalCredits);
      break;
    case 'name':
      filteredData.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }
  
  // Display filtered data
  const tableBody = document.getElementById("adminTableBody");
  let tableHTML = '';
  filteredData.forEach(user => {
    const lastWashDate = user.lastWash ? new Date(user.lastWash).toLocaleDateString('sr-RS') : 'N/A';
    
    tableHTML += `
      <tr class="user-row" data-user-id="${user.uid}">
        <td><strong>${user.name}</strong></td>
        <td><span class="credit-amount">${user.totalCredits}</span></td>
        <td><span class="rsd-amount">${user.totalRSD.toLocaleString()} RSD</span></td>
        <td><span class="box-info">${user.lastBox}</span></td>
        <td>${lastWashDate}</td>
        <td>
          <button class="details-btn" onclick="toggleUserDetails('${user.uid}')" id="detailsBtn_${user.uid}">
            🔍 Prikaži detalje
          </button>
        </td>
      </tr>
      <tr class="details-row hidden" id="detailsRow_${user.uid}">
        <td colspan="6">
          <div class="user-details">
            <h4>📋 Detaljna istorija za ${user.name}</h4>
            <div class="transactions-list">
              ${user.transactions.sort((a, b) => b.timestamp - a.timestamp).map(transaction => {
                // Use timestamp if date doesn't exist, fallback to current time if neither exists
                const transactionTime = transaction.date || transaction.timestamp || Date.now();
                const date = new Date(transactionTime).toLocaleDateString('sr-RS');
                const time = new Date(transactionTime).toLocaleTimeString('sr-RS', {hour: '2-digit', minute: '2-digit'});
                const box = transaction.box || 'N/A';
                
                return `
                  <div class="transaction-item">
                    <div class="transaction-info">
                      <span class="transaction-date">📅 ${date} ⏰ ${time}</span>
                      <span class="transaction-box">🚗 Box: ${box}</span>
                    </div>
                    <div class="transaction-amounts">
                      <span class="credit-amount">💸 ${transaction.amount} kredita</span>
                      <span class="rsd-amount">💰 ${transaction.rsd.toLocaleString()} RSD</span>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </td>
      </tr>
    `;
  });
  
  tableBody.innerHTML = tableHTML;
}

function exportAdminData() {
  // Group data by user for export
  const userGroups = {};
  
  allEmployeeHistory.forEach(entry => {
    if (!userGroups[entry.uid]) {
      userGroups[entry.uid] = {
        uid: entry.uid,
        name: entry.name,
        totalCredits: 0,
        totalRSD: 0,
        lastBox: 'N/A',
        lastWash: null
      };
    }
    
    userGroups[entry.uid].totalCredits += entry.amount;
    userGroups[entry.uid].totalRSD += entry.rsd;
    
    if (!userGroups[entry.uid].lastWash || entry.timestamp > userGroups[entry.uid].lastWash) {
      userGroups[entry.uid].lastWash = entry.timestamp;
      userGroups[entry.uid].lastBox = entry.box;
    }
  });
  
  const userArray = Object.values(userGroups).sort((a, b) => b.totalCredits - a.totalCredits);
  
  const csvContent = "data:text/csv;charset=utf-8," 
    + "Korisnik,Ukupno kredita,Ukupno RSD,Poslednji box,Poslednje pranje\n"
    + userArray.map(user => {
      const lastWashDate = user.lastWash ? new Date(user.lastWash).toLocaleDateString('sr-RS') : 'N/A';
      return `${user.name},${user.totalCredits},${user.totalRSD.toLocaleString()} RSD,${user.lastBox},${lastWashDate}`;
    }).join("\n");
  
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `admin_data_${currentFirma}_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function refreshAdminData() {
  loadAdminData();
  showStatus("userStatus", "🔄 Podaci osveženi!", "success");
}

// 🔄 CHECK EXISTING LOGIN
function checkExistingLogin() {
  const savedFirma = localStorage.getItem("firma");
  const savedUserName = localStorage.getItem("userName");
  const savedUID = localStorage.getItem("uid");
  
  if (savedFirma && savedUserName && savedUID) {
    console.log("🔄 Restoring previous login:", savedFirma, savedUserName);
    currentFirma = savedFirma;
    currentUserName = savedUserName;
    currentUID = savedUID;
    
    // Show app box and load data
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("appBox").classList.remove("hidden");
    document.getElementById("welcomeText").innerText = `👋 Zdravo, ${currentUserName}`;
    
    // Play satisfying customer welcome sound with visual feedback
    setTimeout(() => {
      console.log('🔊 [checkExistingLogin] Attempting to play customer welcome sound...');
      console.log('🔊 [checkExistingLogin] Available sounds:', Object.keys(sounds));
      console.log('🔊 [checkExistingLogin] customerWelcome sound exists:', !!sounds.customerWelcome);
      
      if (sounds.customerWelcome) {
        playSound('customerWelcome');
        console.log('✅ [checkExistingLogin] Customer welcome sound played successfully');
      } else {
        console.log('❌ [checkExistingLogin] Customer welcome sound not available');
      }
      
      // Add subtle glow effect to welcome text
      const welcomeText = document.getElementById("welcomeText");
      welcomeText.style.animation = "textGlow 1.5s ease-in-out";
      setTimeout(() => {
        welcomeText.style.animation = "";
      }, 1500);
    }, 200);
    
    // Load user data
    loadUserData();
  }
}

// 🎮 EVENT LISTENERS
document.addEventListener('DOMContentLoaded', function() {
  // Initialize audio
  initAudio();
  
  // Check if user is already logged in (from localStorage)
  checkExistingLogin();
  
  // Initialize send button state
  updateSendButtonState();
  
  // Track user interaction for vibration permissions
  let userHasInteracted = false;
  
  // Function to enable vibration after user interaction
  function enableVibration() {
    if (!userHasInteracted) {
      userHasInteracted = true;
      window.userHasInteracted = true;
      console.log('🔔 Vibration enabled after user interaction');
    }
  }
  
  // Make enableVibration globally accessible
  window.enableVibration = enableVibration;
  
  // Add click animations to all buttons
  const allButtons = document.querySelectorAll('button');
  allButtons.forEach(button => {
    button.addEventListener('click', function() {
      enableVibration(); // Enable vibration on first button click
      animateButton(this);
      playSound('buttonClick');
    });
  });
  
  // Add particle burst to PIN pad buttons
  const pinButtons = document.querySelectorAll('.pin-pad button');
  pinButtons.forEach(button => {
    button.addEventListener('click', function() {
      enableVibration(); // Enable vibration on PIN button click
      const rect = this.getBoundingClientRect();
      createParticleBurst(rect.left + rect.width/2, rect.top + rect.height/2, 6);
    });
  });
  
  // Handle user selection change
  document.getElementById("userSelect").addEventListener('change', function() {
    if(this.value) {
      enableVibration(); // Enable vibration on dropdown change
      document.getElementById("userName").value = "";
      playSound('buttonClick');
    }
  });

  document.getElementById("userName").addEventListener('input', function() {
    if(this.value) {
      enableVibration(); // Enable vibration on text input
      document.getElementById("userSelect").value = "";
    }
  });
  
  // Make test functions globally available for debugging
  window.testCustomerWelcomeSound = testCustomerWelcomeSound;
  window.testBoxSelectionSound = testBoxSelectionSound;
  window.enableVibration = enableVibration;
  window.toggleVibration = function() {
    if (window.userHasInteracted) {
      window.userHasInteracted = !window.userHasInteracted;
      console.log('🔔 Vibration toggled:', window.userHasInteracted ? 'ON' : 'OFF');
    } else {
      console.log('🔔 Vibration not yet enabled - interact with the page first');
    }
  };
  
  // Debug function to check Firebase companies and PINs
  window.debugFirebaseCompanies = function() {
    console.log('🔍 [DEBUG] Checking Firebase companies...');
    firebase.database().ref("firms").once('value').then(snapshot => {
      if (snapshot.exists()) {
        const firms = snapshot.val();
        console.log('🔍 [DEBUG] Found companies:', Object.keys(firms));
        Object.entries(firms).forEach(([name, data]) => {
          console.log(`🔍 [DEBUG] Company: ${name}`);
          console.log(`🔍 [DEBUG] - PIN: ${data.pin || 'NOT SET'}`);
          console.log(`🔍 [DEBUG] - Credits: ${data.credits || 'NOT SET'}`);
          console.log(`🔍 [DEBUG] - Admin PIN: ${data.adminPin || 'NOT SET'}`);
        });
      } else {
        console.log('🔍 [DEBUG] No companies found in Firebase');
      }
    }).catch(error => {
      console.error('🔍 [DEBUG] Error checking companies:', error);
    });
  };
  
  console.log('🧪 Test functions available: testCustomerWelcomeSound(), testBoxSelectionSound()');
  console.log('🔔 Vibration control: enableVibration(), toggleVibration()');
  console.log('🔍 Debug functions: debugFirebaseCompanies()');

});