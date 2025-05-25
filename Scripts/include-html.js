function includeHTML(callback) {
  var z, i, elmnt, file, xhttp, elementsToProcess = 0;

  z = document.getElementsByTagName("*");

  function checkDone() {
    elementsToProcess--;
    if (elementsToProcess === 0 && typeof callback === "function") {
      callback();
    }
  }

  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    file = elmnt.getAttribute("include-html");
    if (file) {
      elementsToProcess++;
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = (function(elmnt, file) {
        return function () {
          if (this.readyState === 4) {
            if (this.status === 200) elmnt.innerHTML = this.responseText;
            if (this.status === 404) elmnt.innerHTML = "Page not found.";
            elmnt.removeAttribute("include-html");
            includeHTML(checkDone); // Procesar anidados
            checkDone();
          }
        };
      })(elmnt, file);
      xhttp.open("GET", file, true);
      xhttp.send();
    }
  }

  // Si no hay elementos pendientes, llamar el callback de inmediato
  if (elementsToProcess === 0 && typeof callback === "function") {
    callback();
  }
}

// Limpia la URL:
if (window.location.hash) {
  history.replaceState(null, null, window.location.pathname);
}
