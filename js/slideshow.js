// slideshow javascript!
function updateDots(currentSlideshow, imageId) {

    // turn current dot to active
    currentSlideshow.find('a[data-show-image]').removeClass('active');
    currentSlideshow.find('a[data-show-image="' + imageId + '"]').addClass('active');
}

function startSlideshow(currentSlideshow) {
    timerId = setInterval(function () {

        // show images when user clicks on one of the dots
        $('a[data-show-image]').click(function() {

            var currentSlideshow = $(this).closest('div.superslideshow');
            var imageId = $(this).attr('data-show-image')

            currentSlideshow.find('div.slimage').hide();
            currentSlideshow.find('div.slimage#image-' + imageId).show();
            currentSlideshow.find('div.slimage#image-' + imageId).addClass('active');

            updateDots(currentSlideshow, imageId);

        });

        // get last active image
        var lastActive = currentSlideshow.find('div.slimage.active');

        // when the last image is shown, start again
        if (currentSlideshow.find('div.slimage').last().attr('id') == lastActive.attr('id')) {

            // remove active class from the last picture
            lastActive.fadeOut().removeClass('active');

            // get imageId from the first and show it
            var imageId = currentSlideshow.find('div.slimage:first')
                .addClass('active')
                .fadeIn(fadeSpeed)
                .attr('id');

        }
        else {

            // select next image
            var imageId = lastActive
                .fadeOut(fadeSpeed)
                .removeClass('active')
                .next('div.slimage')
                .addClass('active')
                .fadeIn(fadeSpeed)
                .attr('id');

        }

        // image id starts with 'image-' eg image-2352, get only the 2352
        if (imageId) {
            imageId = imageId.split('-')[1];
            updateDots(currentSlideshow, imageId);
        }

    }, 4000); // 4 seconds

}

if ($('div.superslideshow').length > 0) {

    var imageId   = $(this).attr('data-show-image');
    var fadeSpeed = 800;
    var timerId;

    $('div.superslideshow').each(function() {
        var currentSlideshow = $(this);

        currentSlideshow.find('div.slimage:first').show().addClass('active');

        var imageId   = $(this).find('a[data-show-image]');

        // start slideshow
        startSlideshow(currentSlideshow);
    });
}