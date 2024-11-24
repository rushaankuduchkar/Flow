let particles = [];
const num = 1000;

const noiseScale = 0.01 / 2;

function setup() {
  createCanvas(1600, 600);
  for (let i = 0; i < num; i++) {
    particles.push(createVector(random(width), random(height)));
  }

  strokeWeight(3);
  clear();
}

function draw() {
  background(0, 10);

  for (let i = 0; i < num; i++) {
    let p = particles[i];

    // Calculate color and speed based on x position (morning to evening)
    let energyFactor = map(p.x, width, 0, 1, 0); // Higher energy on right (morning), lower on left (evening)
    let speed = energyFactor * 3;  // Faster in morning, slower in evening
    let colorValue = lerpColor(color("#0EFFFF"), color("#FF6600"), energyFactor); // Bright in morning, warmer by evening
    stroke(colorValue);

    // Position update based on noise and speed
    point(p.x, p.y);
    let n = noise(p.x * noiseScale, p.y * noiseScale, frameCount * noiseScale * noiseScale);
    let a = TAU * n;
    p.x -= cos(a) * speed;  // Reverse movement from right to left
    p.y += sin(a) * speed;

    // Reset position if off-screen
    if (!onScreen(p)) {
      p.x = random(width);
      p.y = random(height);
    }
  }
}

function mouseReleased() {
  noiseSeed(millis());
}

function onScreen(v) {
  return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}