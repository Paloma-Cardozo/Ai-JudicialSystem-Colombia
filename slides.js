const slides = document.querySelectorAll(".slide");
const total = slides.length;
const progressEl = document.getElementById("progress");
let cur = 0;

function show(n) {
  hideWheelTip();
  slides[cur].classList.remove("active");
  cur = (n + total) % total;
  slides[cur].classList.add("active");
  slides[cur].setAttribute("tabindex", "-1");
  slides[cur].focus({ preventScroll: true });
  document.getElementById("counter").textContent = `${cur + 1} / ${total}`;
  progressEl.style.width = `${((cur + 1) / total) * 100}%`;
  progressEl.setAttribute("aria-valuenow", cur + 1);
}

function move(dir) {
  show(cur + dir);
}

document.addEventListener("keydown", (e) => {
  const onButton = document.activeElement.tagName === "BUTTON";
  if (e.key === "ArrowRight" || e.key === "ArrowDown" || (e.key === " " && !onButton)) {
    e.preventDefault();
    move(1);
  }
  if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
    e.preventDefault();
    move(-1);
  }
});

let tx = 0, ty = 0;
document.addEventListener(
  "touchstart",
  (e) => {
    tx = e.touches[0].clientX;
    ty = e.touches[0].clientY;
  },
  { passive: true },
);
document.addEventListener("touchend", (e) => {
  const dx = e.changedTouches[0].clientX - tx;
  const dy = e.changedTouches[0].clientY - ty;
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1);
});

const hideWheelTip = (function buildWheel() {
  const tooltipEl = document.createElement("div");
  tooltipEl.id = "wheelTip";
  document.body.appendChild(tooltipEl);

  function position(e) {
    const x = e.clientX + 14;
    const y = e.clientY - 48;
    tooltipEl.style.left = Math.min(x, window.innerWidth - 240) + "px";
    tooltipEl.style.top = Math.max(y, 8) + "px";
  }

  function showTip(text, e) {
    tooltipEl.textContent = text;
    tooltipEl.style.display = "block";
    position(e);
  }

  function hideTip() {
    tooltipEl.style.display = "none";
  }

  document.addEventListener("mousemove", (e) => {
    if (tooltipEl.style.display === "block") position(e);
  });

  const principles = [
    { name: "Transparency",        tip: "Disclose which tool, what you asked it, and where its output appears in the record." },
    { name: "Responsibility",      tip: "Get trained, understand the limits, and verify everything the tool generates." },
    { name: "Privacy",             tip: "Personal and sensitive case data stays protected. It does not go into any AI tool." },
    { name: "Human Rationality",   tip: "Weighing evidence and deciding a case is a human job. That cannot be delegated." },
    { name: "Rigor & Verification",tip: "Scrutinize sources, limits, gaps, and risks before any AI output goes near a decision." },
    { name: "Risk Prevention",     tip: "Control for hallucinations, outdated data, bias, and inconsistencies before they cause harm." },
    { name: "Equality & Equity",   tip: "AI tools carry built-in biases. When rights are on the line, those cannot be ignored." },
    { name: "Human Control",       tip: "Any AI-assisted decision must stay open to challenge before a human authority." },
    { name: "Ethical Standards",   tip: "Individual conduct must align with legal mandates and responsible AI use guidelines." },
    { name: "Best Practices",      tip: "Apply the frameworks defined by the judiciary's own governing bodies." },
    { name: "Continuous Adaptation", tip: "Keep pace with legal, social, and technological developments as they evolve." },
    { name: "Fitness for Purpose", tip: "Technology must genuinely help people access justice, not just be used because it exists." },
  ];
  const wrap = document.getElementById("wheel");
  const svg = document.getElementById("wheelSvg");
  if (!wrap || !svg) return hideTip;
  const cx = 200, cy = 200, r = 162;
  const ns = "http://www.w3.org/2000/svg";

  principles.forEach(({ name, tip }, i) => {
    const angle = (i / principles.length) * Math.PI * 2 - Math.PI / 2;
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
    pill.addEventListener("mouseenter", (e) => showTip(tip, e));
    pill.addEventListener("mouseleave", hideTip);
    wrap.appendChild(pill);
  });

  return hideTip;
})();

document.getElementById("counter").textContent = `1 / ${total}`;
progressEl.setAttribute("aria-valuemax", total);
progressEl.setAttribute("aria-valuenow", 1);
progressEl.style.width = `${(1 / total) * 100}%`;
