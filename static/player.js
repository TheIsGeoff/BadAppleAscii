import frameSeq from "./animation.js";

const LINES_PER_FRAME = 36; // lines per frame
const FRAME_RATE = 24; // frames per second
const FRAME_INTERVAL = 1000 / FRAME_RATE; // ms per frame

const animationEl = document.getElementById("animation");

// Split the full sequence into lines
const lines = frameSeq.split("\n");

// Total number of frames
const totalFrames = Math.floor(lines.length / LINES_PER_FRAME);

// Function to get a frame as a string
function getFrame(frameIndex) {
  const startLine = frameIndex * LINES_PER_FRAME;
  const endLine = startLine + LINES_PER_FRAME;
  return lines.slice(startLine, endLine).join("\n");
}

let currentFrame = 0;
let lastTime = 0;

function animate(timestamp) {
  if (!lastTime) lastTime = timestamp;
  const elapsed = timestamp - lastTime;

  if (elapsed >= FRAME_INTERVAL) {
    animationEl.textContent = getFrame(currentFrame);
    currentFrame = (currentFrame + 1) % totalFrames;
    lastTime = timestamp - (elapsed % FRAME_INTERVAL); // keep time synced
  }

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
