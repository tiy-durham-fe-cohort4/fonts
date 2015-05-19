(function () {
  'use strict';

  sanitizeFonts();
  drawStats();
  drawFonts(90);
  handleFontPreview();
  handleFilterChange();

  function sanitizeFonts() {
    fonts.forEach(function (font) {
      // if (!font.family) {
      //   font.family = font.fontFamily;
      // }
      font.family = font.family || font.fontFamily;
      delete font.fontFamily;
    });
  }

  function computeStatsWithoutReduce() {
    var sums = { win: 0, mac: 0 };

    fonts.forEach(function (font) {
      sums.win += font.win;
      sums.mac += font.mac;
    });

    sums.win /= fonts.length;
    sums.mac /= fonts.length;

    return sums;
  }

  function computeStatsWithReduce() {
    var sums = fonts.reduce(sumWinAndMacStatus, { win: 0, mac: 0 });

    function sumWinAndMacStatus (accum, font) {
      accum.win += font.win;
      accum.mac += font.mac;
      return accum;
    }

    sums.win /= fonts.length;
    sums.mac /= fonts.length;

    return sums;
  }

  function drawStats() {
    var stats = computeStatsWithReduce();

    document.querySelector('.win-stats .percentage').textContent = Math.round(stats.win * 100) / 100;
    document.querySelector('.mac-stats .percentage').textContent = Math.round(stats.mac * 100) / 100;
  }

  function fontsWithSupport(percentage) {
    return fonts.filter(function (font) {
      return font.mac >= percentage && font.win >= percentage;
    });
  }

  function fontsToHTML(fonts) {
    return fonts.map(function (font) {
      return '<div class="font-container"><h2>' +
        font.family +
        '</h2><p>' +
        font.type +
        '</p><button data-hi="Pat" data-font="' +
        font.family +
        '" class="font-preview">Preview</button></div>';
    }).join('');
  }

  function drawFonts(percentage) {
    document.querySelector('.font-list').innerHTML = fontsToHTML(fontsWithSupport(percentage));
  }

  function handleFontPreview() {
    document.querySelector('.font-list').addEventListener('click', function (e) {
      if (e.target.className === 'font-preview') {
        setBodyFont(e.target.dataset.font);
      }
    });
  }

  function setBodyFont(family) {
    document.body.style.fontFamily = family;
  }

  function handleFilterChange() {
    document.querySelector('.font-list-filter').addEventListener('change', function (e) {
      drawFonts(parseInt(e.target.value));
    });
  }

})();
