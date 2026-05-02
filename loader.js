
  // verberg loader als pagina klaar is
  window.addEventListener("load", () => {
    document.getElementById("page-loader").classList.add("hidden");
  });

  // toon loader bij klikken op links
  document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", function(e) {
      const href = this.getAttribute("href");

      // alleen interne links
      if (href && !href.startsWith("#") && !href.startsWith("http")) {
        e.preventDefault();

        document.getElementById("page-loader").classList.remove("hidden");

        setTimeout(() => {
          window.location.href = href;
        }, 400); // match met CSS transition
      }
    });
  });