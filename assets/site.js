// Язык страницы: ?lang=en в адресе → сохраненный выбор → язык браузера (русский для ru/kk/uk/be, иначе английский)
(function () {
  var root = document.documentElement;
  var saved = null;
  try { saved = localStorage.getItem("lang"); } catch (e) { }
  var q = new URLSearchParams(location.search).get("lang");
  var nav = (navigator.language || "en").slice(0, 2).toLowerCase();
  var lang = q === "ru" || q === "en" ? q : saved || (["ru", "kk", "uk", "be"].indexOf(nav) >= 0 ? "ru" : "en");

  function apply(l) {
    root.lang = l;
    var t = root.getAttribute("data-title-" + l);
    if (t) document.title = t;
    // картинки с текстом на нужном языке: data-src-ru / data-src-en
    document.querySelectorAll("[data-src-" + l + "]").forEach(function (img) {
      img.src = img.getAttribute("data-src-" + l);
    });
  }

  apply(lang);
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-set]");
    if (!b) return;
    lang = b.getAttribute("data-set");
    try { localStorage.setItem("lang", lang); } catch (e) { }
    apply(lang);
  });
})();
