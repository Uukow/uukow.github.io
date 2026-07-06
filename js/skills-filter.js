(function () {
  var filters = document.querySelectorAll(".skills__filter");
  var groups = document.querySelectorAll(".skills__group[data-skill-group]");
  if (!filters.length || !groups.length) return;

  function applyFilter(filter) {
    groups.forEach(function (group) {
      var key = group.getAttribute("data-skill-group");
      var show = filter === "all" || key === filter;
      group.classList.toggle("is-filtered-out", !show);
    });
  }

  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var filter = btn.getAttribute("data-skill-filter") || "all";
      filters.forEach(function (b) {
        var active = b === btn;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-selected", active ? "true" : "false");
      });
      applyFilter(filter);
    });
  });
})();
