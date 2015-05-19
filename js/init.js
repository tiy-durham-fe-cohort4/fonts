(function () {
  'use strict';

  sanitizeFonts();

  function sanitizeFonts() {
    fonts.forEach(function (font) {
      // if (!font.family) {
      //   font.family = font.fontFamily;
      // }
      font.family = font.family || font.fontFamily;
      delete font.fontFamily;
    });
  }

})();
