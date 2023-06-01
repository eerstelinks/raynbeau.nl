$.fn.showMessage = function(message){
    if (typeof message == "undefined" || message == '') {
        $(this).hide();
    }
    else if ($(this).is(':visible')) {
        $(this).hide();
        $(this).html(message);
        $(this).fadeIn();
    }
    else {
        $(this).html(message);
        $(this).fadeIn();
    }

    placeSexies();

    return true;
}

$('.toggle-toolbox').click(function() {
	$('.toolbox').slideToggle();
});

function setCookie(name, value, expiredays){
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie=name+ "=" +escape(value)+((expiredays==null) ? "" : "; expires="+exdate.toGMTString())+ "; path=/";
}

function getCookie(name) {
    if (document.cookie.length>0) {
        c_start=document.cookie.indexOf(name + "=");
        if (c_start!=-1){
            c_start=c_start + name.length+1;
            c_end=document.cookie.indexOf(";",c_start);
        if (c_end==-1) c_end=document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end));
        }
    }
    return false;
}

function removeCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

// convert hex color to rgba
function convertHex(hex, opacity) {
    hex = hex.replace('#','');
    r = parseInt(hex.substring(0,2), 16);
    g = parseInt(hex.substring(2,4), 16);
    b = parseInt(hex.substring(4,6), 16);

    result = 'rgba('+r+','+g+','+b+','+opacity+')';
    return result;
}

// Function to get the Max value in Array
Array.max = function( array ){
    return Math.max.apply( Math, array );
};

// Function to get the Min value in Array
Array.min = function( array ){
   return Math.min.apply( Math, array );
};

// function for getting the length of an object
// thanks to: http://stackoverflow.com/a/2693037
function objectLength(obj) {
    var result = 0;
    for(var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            // or Object.prototype.hasOwnProperty.call(obj, prop)
            result++;
        }
    }
    return result;
}

// send post data from visitors
$('form.visiterForm').live('submit', function() {

    var form = $(this).closest('form');
    form.find('input[type="submit"]').attr('disabled', 'disabled');

    $.ajax({
        type: 'POST',
        url: apiURL + 'post/visitors-form',
        data: form.serialize(),
        dataType: 'json'
    })
    .fail(function(json) {
        form.find('input[type="submit"]').removeAttr('disabled');
        form.find('div.alert').showMessage(lang.form.messages.send_failure);
    })
    .done(function(json) {
        form.find('input[type="submit"]').removeAttr('disabled');
        if (json.status == 'success') {
            form.find('div.alert').showMessage();
            if ($('a[href="#'+form.attr('id')+'"]').length == 1) {
                form.find('.modal-body').addClass('body-old');
                form.find('.modal-body.body-old').before('<div class="modal-body body-new"><p>' + json.thankyou + '</p></div>');
                form.find('.modal-body.body-old').hide();
                form.find('input[type="submit"]').hide();
            }
            else {
                form.replaceWith('<p>' + json.thankyou + '</p>');
            }
        }
        else if (json.message) {
            form.find('div.alert').showMessage(json.message);
        }
        else {
            form.find('div.alert').showMessage(lang.form.messages.save_failure);
        }
    });

    return false;
});

$('form.visiterForm').on('hidden', function () {
    var form = $(this).closest('form');
    form.find('.body-new').remove();
    form.find('.body-old').removeAttr('body-old').show();
    form.find('input[type="submit"]').show();
});

if ($(".fancybox").length > 0) {
    $(".fancybox").fancybox({
        openEffect  : 'none',
        closeEffect : 'none'
    });
}

// add span header to every header
function addSpanToHeading() {
    $('.sexy h1, .sexy h2, .sexy h3, .sexy h4, .sexy h5, .sexy h6, .album-title')
    .not(':has(span.header)')
    .wrapInner('<span class="header" />');
}

function quoteToHtml(s){
    if (typeof s === 'string') {
        return s.replace(/"/g, '&quot;');
    }
    return '';
}

function unquoteToHtml(s){
    if (typeof s === 'string') {
        return s.replace(/&quot;/g, '"');
    }
    return '';
}
