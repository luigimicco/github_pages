let current = 1;
const total = document.querySelectorAll(".slide").length;
const dotsContainer = document.getElementById("dots");
const counter = document.getElementById("counter");
for (let i = 1; i <= total; i++) {
  const dot = document.createElement("div");
  dot.className = "dot" + (i === 1 ? " active" : "");
  dot.onclick = () => goToSlide(i);
  dotsContainer.appendChild(dot);
}
function goToSlide(n) {
  const prev = document.querySelector(".slide.active");
  const next = document.querySelector(`.slide[data-slide="${n}"]`);
  if (prev) prev.classList.remove("active");
  if (next) {
    next.classList.add("active");
    animateSlide(next);
  }
  current = n;
  updateNav();
}
function changeSlide(dir) {
  let next = current + dir;
  if (next < 1) next = 1;
  if (next > total) next = total;
  goToSlide(next);
}
function updateNav() {
  document
    .querySelectorAll(".dot")
    .forEach((d, i) => d.classList.toggle("active", i + 1 === current));
  counter.textContent = current + " / " + total;
}
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key === " ") {
    e.preventDefault();
    changeSlide(1);
  }
  if (e.key === "ArrowLeft") {
    e.preventDefault();
    changeSlide(-1);
  }
});
let touchStartX = 0;
document.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});
document.addEventListener("touchend", (e) => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) changeSlide(diff > 0 ? 1 : -1);
});
function animateSlide(slide) {
  slide.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transition = "none";
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.offsetHeight;
    const delay = i * 0.08;
    el.style.transition = `opacity 0.35s ease ${delay}s, transform 0.35s ease ${delay}s`;
    el.style.opacity = "1";
    el.style.transform = "translateY(0px)";
  });
  animateSlideEffects(slide);
}
function animateSlideEffects(slide) {
  slide.querySelectorAll(".bar-fill:not(.fill-init)").forEach((bar, i) => {
    bar.classList.add("fill-init");
    bar.style.width = "0%";
    bar.style.transition = `width 0.6s ease ${i * 0.1}s`;
    bar.offsetHeight;
    bar.style.width = bar.dataset.width + "%";
  });
}
animateSlide(document.querySelector(".slide.active"));
