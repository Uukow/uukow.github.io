(function () {
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add("saas-ready");

  var HEAD_SEL = ".section:not(.home) .section__head";
  var STAGGER_GROUPS = [
    ".cards",
    ".project-showcase",
    ".experience__timeline",
    ".credentials__list",
    ".skills__grid",
    ".skills__stats",
    ".mosaic",
    ".about__stat-grid",
    ".about__panels",
    ".about__facts",
    ".contact__direct",
    ".credentials__stats",
  ];
  var PAIR_SEL = ".about__visual, .about__copy, .about__actions, .contact__panel, .contact-form, .credentials__block, .site-footer";
  var SCALE_SEL = ".panel--about, .about__stat, .credentials__stat";

  function mark(el, variant, delay) {
    if (!el || el.classList.contains("reveal")) return;
    el.classList.add("reveal", "reveal--" + variant);
    if (typeof delay === "number") {
      el.style.setProperty("--reveal-delay", delay + "ms");
    }
  }

  document.querySelectorAll(HEAD_SEL).forEach(function (el) {
    mark(el, "fade-up");
  });

  STAGGER_GROUPS.forEach(function (groupSel) {
    document.querySelectorAll(groupSel).forEach(function (group) {
      Array.prototype.forEach.call(group.children, function (child, i) {
        mark(child, "fade-up", i * 70);
      });
    });
  });

  document.querySelectorAll(PAIR_SEL).forEach(function (el, i) {
    var variant = el.classList.contains("about__visual") ? "right" : el.classList.contains("about__copy") ? "left" : "fade-up";
    mark(el, variant, i * 90);
  });

  document.querySelectorAll(SCALE_SEL).forEach(function (el, i) {
    mark(el, "scale", i * 55);
  });

  document.querySelectorAll(".section:not(.home)").forEach(function (section, i) {
    section.classList.add("saas-section");
    if (i % 2 === 1) section.classList.add("saas-section--alt");
  });

  var reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  if (reduced) {
    reveals.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );

  reveals.forEach(function (el) {
    observer.observe(el);
  });
})();
