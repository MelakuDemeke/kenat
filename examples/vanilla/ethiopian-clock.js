import { Time } from '../../src/Time.js';  // Adjust path to your Time class file

function getCurrentEthiopianTime() {
  const now = new Date();
  return Time.fromGregorian(now.getHours(), now.getMinutes());
}

function formatDigital(time) {
  return time.format({ useGeez: false, showPeriodLabel: true, zeroAsDash: false });
}

function updateDigitalClock() {
  const ethTime = getCurrentEthiopianTime();
  const digitalClockEl = document.getElementById('digital-clock');
  digitalClockEl.textContent = formatDigital(ethTime);
}

function drawAnalogClock() {
  const canvas = document.getElementById('analog-clock');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const radius = canvas.height / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(radius, radius);

  const ethTime = getCurrentEthiopianTime();
  const hour = ethTime.hour % 12;
  const minute = ethTime.minute;

  // Clock face
  ctx.beginPath();
  ctx.arc(0, 0, radius - 5, 0, 2 * Math.PI);
  ctx.fillStyle = '#fff';
  ctx.fill();
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 8;
  ctx.stroke();

  // Hour marks
  for (let i = 0; i < 12; i++) {
    const ang = (i * Math.PI) / 6;
    ctx.rotate(ang);
    ctx.beginPath();
    ctx.moveTo(0, -radius + 15);
    ctx.lineTo(0, -radius + 30);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.rotate(-ang);
  }

  // Hour hand
  let hourAngle = ((hour + minute / 60) * Math.PI) / 6;
  ctx.save();
  ctx.rotate(hourAngle);
  ctx.beginPath();
  ctx.moveTo(0, 10);
  ctx.lineTo(0, -radius / 2);
  ctx.lineWidth = 8;
  ctx.strokeStyle = '#000';
  ctx.stroke();
  ctx.restore();

  // Minute hand
  let minuteAngle = (minute * Math.PI) / 30;
  ctx.save();
  ctx.rotate(minuteAngle);
  ctx.beginPath();
  ctx.moveTo(0, 20);
  ctx.lineTo(0, -radius + 40);
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#000';
  ctx.stroke();
  ctx.restore();

  ctx.restore();
}

function startClocks() {
  updateDigitalClock();
  drawAnalogClock();
  setInterval(() => {
    updateDigitalClock();
    drawAnalogClock();
  }, 1000);
}

startClocks();
