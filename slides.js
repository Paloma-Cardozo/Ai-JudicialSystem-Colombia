const slides = document.querySelectorAll(".slide");
const total = slides.length;
let cur = 0;

function show(n) {
  slides[cur].classList.remove("active");
  cur = (n + total) % total;
  slides[cur].classList.add("active");
  document.getElementById("counter").textContent = `${cur + 1} / ${total}`;
  document.getElementById("progress").style.width =
    `${((cur + 1) / total) * 100}%`;
}

function move(dir) {
  show(cur + dir);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
    e.preventDefault();
    move(1);
  }
  if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
    e.preventDefault();
    move(-1);
  }
});

let tx = 0;
document.addEventListener(
  "touchstart",
  (e) => {
    tx = e.touches[0].clientX;
  },
  { passive: true },
);
document.addEventListener("touchend", (e) => {
  const dx = e.changedTouches[0].clientX - tx;
  if (Math.abs(dx) > 50) move(dx < 0 ? 1 : -1);
});

(function buildWheel() {
  const principles = [
    "Transparency",
    "Responsibility",
    "Privacy",
    "Human Rationality",
    "Rigor & Verification",
    "Risk Prevention",
    "Equality & Equity",
    "Human Control",
    "Ethical Standards",
    "Best Practices",
    "Continuous Adaptation",
    "Fitness for Purpose",
  ];
  const wrap = document.getElementById("wheel");
  const svg = document.getElementById("wheelSvg");
  const cx = 200,
    cy = 200,
    r = 162;
  const ns = "http://www.w3.org/2000/svg";

  principles.forEach((name, i) => {
    const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);

    const lx1 = cx + 54 * Math.cos(angle);
    const ly1 = cy + 54 * Math.sin(angle);
    const lx2 = cx + (r - 28) * Math.cos(angle);
    const ly2 = cy + (r - 28) * Math.sin(angle);
    const line = document.createElementNS(ns, "line");
    line.setAttribute("x1", lx1);
    line.setAttribute("y1", ly1);
    line.setAttribute("x2", lx2);
    line.setAttribute("y2", ly2);
    line.setAttribute("stroke", "rgba(0,180,216,.22)");
    line.setAttribute("stroke-width", "1");
    svg.appendChild(line);

    const pill = document.createElement("div");
    pill.className = "principle-pill";
    pill.textContent = name;
    pill.style.left = x + "px";
    pill.style.top = y + "px";
    wrap.appendChild(pill);
  });
})();

document.getElementById("progress").style.width = `${(1 / total) * 100}%`;
