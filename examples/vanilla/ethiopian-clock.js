import { Time } from '../../src/Time.js';  // Adjust path as needed
import { toGeez } from '../../src/geezConverter.js';

const digitalClock = document.getElementById('digitalClock');
const geezToggleBtn = document.getElementById('geezToggle');
const canvas = document.getElementById('clockCanvas');
const ctx = canvas.getContext('2d');
const radius = canvas.height / 2;
ctx.translate(radius, radius);

let useGeez = true;

geezToggleBtn.addEventListener('click', () => {
  useGeez = !useGeez;
  geezToggleBtn.textContent = `Use Geez Numerals: ${useGeez ? 'ON' : 'OFF'}`;
  drawClock();
});

function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();

  ctx.strokeStyle = '#333';
  ctx.lineWidth = radius * 0.05;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.05, 0, 2 * Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  const angIncrement = (2 * Math.PI) / 12;
  ctx.font = `${radius * 0.15}px Arial`;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';

  for (let num = 1; num <= 12; num++) {
    let numeral = useGeez ? toGeez(num) : num.toString();

    let ang = num * angIncrement - Math.PI / 2;
    let x = radius * 0.75 * Math.cos(ang);
    let y = radius * 0.75 * Math.sin(ang);
    ctx.fillStyle = '#000';
    ctx.fillText(numeral, x, y);
  }
}

function drawTime(ctx, radius) {
  const now = new Date();
  const time = Time.fromGregorian(now.getHours(), now.getMinutes());

  // Calculate angles for hands based on Ethiopian time
  const hour = time.hour % 12;
  const minute = time.minute;
  const second = now.getSeconds();

  // Hour hand
  const hourAngle = ((hour + minute / 60) * Math.PI) / 6 - Math.PI / 2;
  drawHand(ctx, hourAngle, radius * 0.5, radius * 0.07);

  // Minute hand
  const minuteAngle = (minute * Math.PI) / 30 - Math.PI / 2;
  drawHand(ctx, minuteAngle, radius * 0.75, radius * 0.05);

  // Second hand
  const secondAngle = (second * Math.PI) / 30 - Math.PI / 2;
  drawHand(ctx, secondAngle, radius * 0.85, radius * 0.02, 'red');

  // Update digital clock
  digitalClock.textContent = time.format({ useGeez, showPeriodLabel: true, zeroAsDash: false });
}

function drawHand(ctx, pos, length, width, color = '#333') {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.strokeStyle = color;
  ctx.moveTo(0, 0);
  ctx.lineTo(length * Math.cos(pos), length * Math.sin(pos));
  ctx.stroke();
}

function update() {
  ctx.clearRect(-radius, -radius, canvas.width, canvas.height);
  drawClock();
  requestAnimationFrame(update);
}

update();
