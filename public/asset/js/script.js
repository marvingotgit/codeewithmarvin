// Particle Animation
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 100;
const colors = ['#ff00cc', '#3333ff', '#00ff99', '#ffcc00', '#00ccff', '#cc00ff', '#ff3300', '#00ffcc'];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 1.5 - 0.75;
    this.speedY = Math.random() * 1.5 - 0.75;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.phase = Math.random() * Math.PI * 2;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY + Math.sin(this.phase) * 0.5;
    this.phase += 0.05;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

function initParticles() {
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Typing Test Logic
document.addEventListener('DOMContentLoaded', () => {
  const stories = [
    'Deep in rural India, a blind woman coded an entire app to help other visually impaired people navigate their villages without ever owning a smartphone herself.',
    'High in the mountains of Peru, a boy created a pulley system from bike parts to carry food across cliffs after his village bridge was washed away.',
    'In a small town in Pakistan, a girl built a solar-powered fan using bottle caps and old wires to help her family sleep through the heat without electricity.',
    'Along the flooded plains of Cambodia, a teenager crafted a floating classroom from wood and barrels so village kids could still learn during monsoon season.',
    'On a farm in Kenya, a 12-year-old girl designed a bird whistle that scares pests without harming them, saving her mother\'s crops from being destroyed.',
    'In a dusty village in Iraq, a boy made prosthetic arms using melted plastic spoons, giving amputees hope after the war left so many wounded.',
    'From the outskirts of Johannesburg, a girl engineered a water filter with layers of cloth, sand, and charcoal so her siblings could drink safely from the river.',
    'Deep in the jungles of Papua New Guinea, a teenage boy mapped medicinal plants used by elders so their knowledge wouldn\'t vanish with the older generation.',
    'In a cold village in Kyrgyzstan, a girl created a wool insulation wall from recycled sweaters to keep her one-room home warm through harsh winters.',
    'In the rice fields of Myanmar, a boy made a soil moisture meter with nails and LED lights to help farmers know when to water their crops.',
    'On the streets of Lima, a homeless boy turned trash into toys for neighborhood children, building joy out of plastic bottles and broken wheels.',
    'In the hills of Sri Lanka, a girl set up a rain collection system from banana leaves and pipes, providing fresh water to her entire community.',
    'In a Nigerian village, a teenager built a wooden ATM machine that dispenses school supplies when students enter their ID number, reducing waste and helping the poor.',
    'Along the coast of Madagascar, a boy invented a saltwater battery using coconut husks and copper, making light possible in his dark fishing town.',
    'In a small town in Uzbekistan, a girl learned chemistry from torn books and later created a natural soap formula that healed skin rashes common in her village.',
    'On a remote island in Fiji, a teenage girl sewed life vests from rice sacks so her siblings could swim safely during tidal floods.',
    'In rural Rwanda, a boy recorded audio stories in his native language, teaching morals and history to children who could not read or attend school.',
    'From the desert edge of Sudan, a girl built a mini greenhouse from glass jars and tin foil, growing tomatoes even during sandstorms.',
    'On a rooftop in Cairo, a teen created a cooling system using spinning cans and water drops, keeping his family\'s home livable in extreme heat.',
    'In a small Serbian town, a boy coded a silent alarm system for elderly people using flashing lights and vibrations after his deaf grandmother had a fall.',
    'In remote Indonesia, a girl documented coral reef destruction using a borrowed waterproof camera and made her video go viral among students around the world.',
    'Near the mountains of Afghanistan, a boy built a hand-crank elevator to help elders get up a steep cliff pathway in their daily commute.',
    'From the plains of Mongolia, a teenager programmed a temperature alarm to protect livestock from sudden cold snaps after losing three yaks in one winter.',
    'In the outskirts of Caracas, a girl started a rooftop garden in abandoned tires, feeding ten families during food shortages without needing soil.',
    'On the roads of rural Malawi, a boy made reflective bands from bottle caps to keep kids safe as they walked to school in the dark.',
    'In the forests of Sierra Leone, a girl crafted musical instruments from gourds and scrap metal, teaching village kids rhythm and harmony after school.'
  ];

  function getRandomStory() {
    const index = Math.floor(Math.random() * stories.length);
    return stories[index];
  }

  const typingWords = document.getElementById('typingWords');
  const typeInput = document.getElementById('typeInput');
  const startButton = document.getElementById('startButton');
  const submitButton = document.getElementById('submitButton');
  const result = document.getElementById('result');
  let startTime, storyToType;

  function initTypingTest() {
    storyToType = getRandomStory();
    typingWords.textContent = storyToType;
    typeInput.value = '';
    typeInput.classList.add('hidden');
    submitButton.classList.add('hidden');
    startButton.classList.remove('hidden');
    result.textContent = '';
  }

  startButton.addEventListener('click', () => {
    startButton.classList.add('hidden');
    typeInput.classList.remove('hidden');
    submitButton.classList.remove('hidden');
    typeInput.focus();
    startTime = new Date();
  });

  submitButton.addEventListener('click', () => {
    const typedText = typeInput.value.trim();
    const endTime = new Date();
    const timeTaken = (endTime - startTime) / 1000 / 60;
    const wordCount = typedText.split(' ').length;
    const wpm = Math.round(wordCount / timeTaken);

    if (typedText === storyToType) {
      let evaluation;
      if (wpm < 30) {
        evaluation = 'Below Average (less than 30 WPM). Keep practicing!';
      } else if (wpm >= 30 && wpm < 40) {
        evaluation = 'Average (30-39 WPM). Good job, try to improve!';
      } else if (wpm >= 40 && wpm < 60) {
        evaluation = 'Above Average (40-59 WPM). Great work!';
      } else {
        evaluation = 'Excellent (60+ WPM). You\'re a typing pro!';
      }
      result.textContent = `You typed at ${wpm} words per minute. ${evaluation}`;
    } else {
      result.textContent = 'Incorrect typing. Please match the story exactly and try again.';
    }
  });

  typeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      submitButton.click();
    }
  });

  initTypingTest();
});
