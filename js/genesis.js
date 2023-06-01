// disable scrolling when user hovers the div
$.fn.makeScroll = function() {

  // find the lovebox what has scrollable content
  var lovebox = $(this);

  $.browser.chrome = $.browser.webkit && !! window.chrome;
  $.browser.safari = $.browser.webkit && !window.chrome;

  if ($.browser.chrome || $.browser.safari) {
      lovebox.mouseenter(function() {
          $('html').css('overflow', 'hidden');
      }).mouseleave(function() {
          $('html').css('overflow', 'auto');
      });
  }
};

// check if there is hidden content with an `overflow: hidden` box
$.fn.isHiding = function() {
  var $s = $(this);

  $s.wrapInner('<div />'); // wrap inner contents
  var hidden = $s.height() < $s.children('div').height();

  $s.children('div').replaceWith( $s.children('div').html() ); //unwrap

  return hidden;
}

// vertical align tools (buttons)
function positionTools() {

  $('.editable').each(function() {
      var editable    = $(this);
      var editOverlay = editable.find('.edit-overlay');
      var editActions = editable.find('.edit-actions');

      editActions.css({
          position:'absolute',
          left: (editable.width() - editActions.outerWidth()) / 2,
          top: (editable.height() - editActions.outerHeight()) / 2,
      });

      editOverlay.css({
          position:'absolute'//,
          //height: editable.height()
      });

  });

  $('li.add-column-buttons').each(function() {

      $(this).css({
          position:'absolute',
          top: ($(this).closest('.row.inner').height() - $(this).outerHeight()) / 2
      });
  });
}


// function for animating and placing the sexies
function placeSexies() {

  var navHeight = $('.navbar').height();

  $('.sexy').each(function() {

      // store this in a var for later use in functions
      var sexy    = $(this);
      var lovebox = sexy.find('.lovebox');

      // set art height to 0
      // sexy.find('[class*="span"].art:not(.album)').height(200);

      // find first row in sexy div
      var firstRow = sexy.find('.row.inner').first();

      var columns = sexy.find('ul.row.inner [class*="span"]');
      columns.css('height', 'auto');

      var maxHeight = Math.max.apply(null, columns.map(function () {
          return $(this).height();
      }).get());

      var newHeight = Array.max([maxHeight, 200]);

      columns.css('height', newHeight + 'px');

      // set height of sexy minus the height of the nav-bar +1 for a bug in the navbar border bottom
      if (firstRow.height() + 200 <= $(window).height()) {
          sexy.css('height', $(window).height() - navHeight + 1);
      }
      else {
          sexy.css('height', firstRow.height() + 200 - navHeight + 1);
      }

      // animate to the vertical center of the screen in 1 sec.
      var marginTop = (sexy.height() - firstRow.height()) / 2;
      firstRow.animate({ marginTop: marginTop + 'px', opacity: 1 }, 500);

  });

  return true;
}

function placeArrows() {

  var marginSexies = $('.sexy').map(function() {
      return ($(this).height() - $(this).find('.row.inner').first().height()) / 2;
  }).get();

  var marginSexyMin = Array.min(marginSexies);


  $('.sexy').each(function() {
      var sexy     = $(this);
      var firstRow = sexy.find('.row.inner').first();

      // calculate margin of sexy up and down
      var marginSexy = (sexy.height() - firstRow.height()) / 2;

      // set default arrow size
      var arrowSize = 100;

      // ensure that arrowsize is smaller then margin of the sexy
      if (arrowSize >= marginSexyMin) {

          // add 10 pixels margin
          arrowSize = marginSexyMin - 10;
      }

      // arrow margin is half the sexy margin - half arrow size
      var arrowMargin = (marginSexy / 2) - (arrowSize / 2);

      // set css for the arrows
      var arrowUp   = sexy.find('div.sexy-up');
      arrowUp.css('top', arrowMargin + 'px');
      arrowUp.css('font-size', arrowSize + 'px');

      var arrowDown = sexy.find('div.sexy-down');
      arrowDown.css('bottom', arrowMargin + 'px');
      arrowDown.css('font-size', arrowSize + 'px');

  });
}

function putElementsInRow() {

  if (typeof alignSexies == 'undefined' || alignSexies.length == 0) {
      return;
  }

  for (var i in alignSexies) {

      var sexyAlignId = alignSexies[i];

      var elementsInColumn = new Array();

      $('#sexy_' + sexyAlignId + ' .row.inner').find('[class*="span"]').each(function() {
          elementsInColumn.push($(this).find('li.editable').length);
      });

      var maxElements = Array.max(elementsInColumn);

      for (var i=1; i<=maxElements; i++) {

          var elementsInRow = $('#sexy_' + sexyAlignId + ' .row.inner [class*="span"] .editable:nth-child('+i+')');

          // set height of elements in one row to auto
          elementsInRow.css('height', 'auto');

          // do not use .map because it is not supported by IE8
          var maxHeight = 0;

          elementsInRow.each(function() {

              // select max height of these two variables
              var currentHeight = Array.max([$(this).height(), $(this).find('span').height()]);

              // set maxHeight to currentHeight if it is larger
              if (maxHeight < currentHeight) {
                  maxHeight = currentHeight;
              }
          });

          // set height of elements in one row to the same height
          elementsInRow.height(maxHeight);
      }
  }
}

function runAfterResize() {
  placeGalleries();
  addSpanToHeading();
  putElementsInRow();
  placeSexies();
  //placeArt();
  placeArrows();
  positionTools();
}

// wait for everything (even failing images) to load when placing the sexies
$(window).load(function() {

  // run everything one time
  runAfterResize();

  // wait n miliseconds before doing stuff after a resize of the window
  var TO = false;
  $(window).resize(function(){

      if (TO !== false)
          clearTimeout(TO);
      TO = setTimeout(runAfterResize, 200); //200 is time in miliseconds
  });
});

// Light up button in navbar on click
$('ul.nav > li').click(function() {
  $('ul.nav > li').removeClass('active');
  $(this).addClass('active');
});
