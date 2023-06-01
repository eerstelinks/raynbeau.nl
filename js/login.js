function proccessData(data) {
    form = $('form.login-form');
    $('img.loader-login').hide();

    if (data.status == 'success') {

        if (typeof data.session != 'undefined') {
            setCookie('session', data.session, 365);
        }

        if (typeof data.pathname != 'undefined') {
            setCookie('username[' + data.pathname + ']', data.username, 365);
        }

        if (data.action && data.action == 'loggedout') {
            removeCookie('session');
        }

        $('.toolbox').slideUp('slow', function() {
            location.reload();
        });
    }
    else if (data.status == 'error') {
        form.find('input').removeAttr('disabled');

        var errorBox = $('div.inlog-error');
        if (errorBox.length) {
            errorBox.hide();
            errorBox.text(data.message);
            errorBox.fadeIn();
        }
        else {
            jQuery('<div class="alert alert-info inlog-error">' + data.message + '</div>').prependTo(form);
        }
    }
}

$('form.login-form').submit(function() {

    var timer = setTimeout(function () {
        $('img.loader-login').show();
    }, 500);

    var form = $(this);
    var dataToBeSent = form.serialize();
    var sendform = false;
    $(this).find('input[type=submit]').attr('disabled', 'disabled');

    $.ajax({
        type: 'POST',
        url: apiURL + 'authenticate',
        data: dataToBeSent,
        dataType: 'json'})
    .done(function(data) {
        clearTimeout(timer);
        proccessData(data);
    })
    .fail(function(data) {
        clearTimeout(timer);
        data = new Object();
        data.status = 'error';
        data.message = lang.login.no_connection;
        proccessData(data);
    });

    return false;
});
