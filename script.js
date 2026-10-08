/* ==============================
   MAIN SCRIPT — 4th Monthsary Website
   ============================== */

document.addEventListener('DOMContentLoaded', () => {
  // ——————————————————————————————
  // 1. Smooth scroll to Page 2
  // ——————————————————————————————
  const btnContinue = document.getElementById('btn-continue');
  if (btnContinue) {
    btnContinue.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('page-song');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ——————————————————————————————
  // 2. Smooth scroll back to Page 1
  // ——————————————————————————————
  const btnBack = document.getElementById('btn-back');
  if (btnBack) {
    btnBack.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('page-greeting');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ——————————————————————————————
  // 3. Scroll-reveal observer
  // ——————————————————————————————
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback for older browsers
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  // ——————————————————————————————
  // 4. Custom audio player
  // ——————————————————————————————
  const audio = document.getElementById('song-audio');
  const playBtn = document.getElementById('play-btn');
  const progressFill = document.getElementById('progress-fill');
  const currentTimeEl = document.getElementById('current-time');
  const totalTimeEl = document.getElementById('total-time');
  const eqBars = document.getElementById('eq-bars');

  let isPlaying = false;

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  if (playBtn && audio) {
    playBtn.addEventListener('click', () => {
      if (isPlaying) {
        audio.pause();
        playBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
        eqBars.classList.remove('active');
      } else {
        audio.play().catch(() => {
          // Autoplay blocked — user will need to interact
        });
        playBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
        eqBars.classList.add('active');
      }
      isPlaying = !isPlaying;
    });

    audio.addEventListener('timeupdate', () => {
      if (audio.duration) {
        const pct = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = pct + '%';
        progressFill.style.animation = 'none'; // stop the pulse once playing
        currentTimeEl.textContent = formatTime(audio.currentTime);
      }
    });

    audio.addEventListener('loadedmetadata', () => {
      totalTimeEl.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('ended', () => {
      isPlaying = false;
      playBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
      eqBars.classList.remove('active');
      progressFill.style.width = '0%';
      currentTimeEl.textContent = '0:00';
    });
  }
});
