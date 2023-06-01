/* This code is makes the gallery responsive.
It is written by Justin Klemm, find it here:
http://justinklemm.com/responsive-photo-gallery/ */

(function($) {
  $.fn.scaleGallery = function() {

    // This is roughly the max pixels width/height of a square photo
    var widthSetting = 250;

    // Do not edit any of this unless you know what you're doing
    var containerWidth = $(this).width();
    var ratioSumMax = containerWidth / widthSetting;
    var imgs = $(this).find('img');
    var numPhotos = imgs.length, ratioSum, ratio, photo, row, rowPadding, i = 0;

    while (i < numPhotos) {
      ratioSum = rowPadding = 0;
      row = new Array();
      while (i < numPhotos && ratioSum < ratioSumMax) {
          photo = $(imgs[i]);
          // reset width to original
          photo.width("");
          ratio = photo.width() / photo.height();
          rowPadding += getHorizontalPadding(photo);
          // if this is going to be first in the row, clear: left
          if(ratioSum == 0) photo.css("clear", "left"); else photo.css("clear", "none");
          ratioSum += ratio;
          row.push(photo);
          i++;
          // if only 1 image left, squeeze it in
          if(i == numPhotos - 1) ratioSumMax = 999;
      }
      unitWidth = (containerWidth - rowPadding) / ratioSum;

      row.forEach(function (elem) {
        elem.width(unitWidth * elem.width() / elem.height());
      });
    }
  }
})(jQuery);

function getHorizontalPadding(elem) {
    var padding = 0;
    var left = elem.css("padding-left");
    var right = elem.css("padding-right");
    padding += parseInt(left ? left.replace("px", "") : 0);
    padding += parseInt(right ? right.replace("px", "") : 0);
    return padding;
}

function placeGalleries() {
  $(".gallery1").each(function() {
    $(this).scaleGallery();
  });
}

// Break lines if the description is very very long!
$('.fancybox').fancybox({
  maxWidth: 1200,
  helpers: {
    title: {
      type: 'outside'
    }
  }
});
