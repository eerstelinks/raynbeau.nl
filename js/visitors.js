$(".popupmovies").fancybox({
    maxWidth    : 1280,
    maxHeight   : 720,
    fitToView   : true,
    width       : '80%',
    height      : '80%',
    autoSize    : false,
    closeClick  : false,
    openEffect  : 'none',
    closeEffect : 'none'
});

var images = [
    '/img/media-buttons/play-border-grey-shadow.png'
];

$(images).each(function() {
    var image = $('<img />').attr('src', this);
});