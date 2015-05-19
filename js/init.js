(function () {
  'use strict';

  sanitizeFonts();
  drawStats();

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

    document.querySelector('.win-stats .percentage').textContent = Math.round(stats.win);
    document.querySelector('.mac-stats .percentage').textContent = Math.round(stats.mac);
  }

})();
