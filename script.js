const eye = document.querySelector('.eye');
const iris = document.querySelector('.iris');
const tabs = document.querySelectorAll('.tab');
const title = document.getElementById('theme-title');
const description = document.getElementById('theme-description');

const themeInfo = {
  normal: {
    title: 'Normal classroom view',
    description: 'A clear, inclusive classroom where all students can access written instruction, board content, and peer interactions.',
    image: 'normal-vision.png'
  },
  myopia: {
    title: 'Myopia — short-sightedness',
    description: 'Students struggle to see the board and distant objects. Teachers can provide large print, closer seating, and digital magnification.',
    image: 'myopia-vision.png'
  },
  hyperopia: {
    title: 'Hyperopia — long-sightedness',
    description: 'Close work can be tiring or unclear. Teachers can offer papers positioned closer, clear desk materials, and adaptive lighting.',
    image: 'hyperopia-vision.png'
  },
  cataracts: {
    title: 'Cataracts',
    description: 'Vision can become cloudy and dim. Teachers can reduce glare, improve contrast, and provide clear, enlarged materials.',
    image: 'cataracts-vision.png'
  },
  cmv: {
    title: 'CMV retinitis',
    description: 'Peripheral vision can be affected and the classroom may feel fragmented. Teachers should use verbal instruction and accessible seating.',
    image: 'cmv-retinitis-vision.png'
  },
  glaucoma: {
    title: 'Glaucoma',
    description: 'Peripheral vision is reduced and the student may miss details at the edges of the room. Clear classroom layouts and verbal cues help.',
    image: 'glaucoma-vision.png'
  },
  macular: {
    title: 'Macular degeneration',
    description: 'Central vision is impaired, so the learner may lose focus on faces and text. Strong contrast and assistive technology are important.',
    image: 'macular-degeneration-vision.png'
  },
  diabetic: {
    title: 'Diabetic retinopathy',
    description: 'Fluctuating vision can affect reading and attention. Teachers should offer flexible pacing, magnification, and check-ins.',
    image: 'diabetic-retinopathy-vision.png'
  }
};

const maxOffset = 22;

function updateEye(event) {
  if (!eye) return;

  const rect = eye.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  const dx = event.clientX - cx;
  const dy = event.clientY - cy;

  const angle = Math.atan2(dy, dx);
  const distance = Math.min(Math.hypot(dx, dy), 52);
  const x = Math.cos(angle) * Math.min(distance, maxOffset);
  const y = Math.sin(angle) * Math.min(distance, maxOffset);

  iris.style.setProperty('--look-x', `${x}px`);
  iris.style.setProperty('--look-y', `${y}px`);
}

function setTheme(theme) {
  document.body.dataset.theme = theme;
  tabs.forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.theme === theme);
  });

  const info = themeInfo[theme] || themeInfo.normal;
  document.documentElement.style.setProperty('--classroom-image', `url('${info.image}')`);
  title.textContent = info.title;
  description.textContent = info.description;
}

document.addEventListener('pointermove', updateEye);

document.addEventListener('pointerleave', () => {
  iris.style.setProperty('--look-x', '0px');
  iris.style.setProperty('--look-y', '0px');
});

tabs.forEach((tab) => {
  tab.addEventListener('click', () => setTheme(tab.dataset.theme));
});

window.addEventListener('load', () => {
  const initialX = window.innerWidth / 2;
  const initialY = window.innerHeight * 0.8;
  updateEye({ clientX: initialX, clientY: initialY });
  setTheme('normal');
});
