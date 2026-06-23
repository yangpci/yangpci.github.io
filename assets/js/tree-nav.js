(function () {
  var current = window.location.pathname.replace(/\/$/, "") || "/";
  var links = document.querySelectorAll(".tree-nav-link");

  links.forEach(function (link) {
    var href = link.getAttribute("href");
    if (!href) return;

    var path = new URL(href, window.location.origin).pathname.replace(/\/$/, "") || "/";
    if (path !== current) return;

    link.classList.add("is-active");
    var parent = link.closest(".tree-nav-group");
    while (parent) {
      parent.open = true;
      parent = parent.parentElement ? parent.parentElement.closest(".tree-nav-group") : null;
    }
  });
})();
