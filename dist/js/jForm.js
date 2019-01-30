$(document).ready(function () {
    // $(document).on('click', '.steps a', function() {
    //     thatStep(this);
    // });
    $(document).on('click', '.next-step', function() {
        enableDisable(this);
        nextStep();
    });
    $(document).on('click', '.prev-step', function() {
        enableDisable(this);
        prevStep();
    });
});

/**
 * Enable and disable steps of form
 * @param {*} item
 */
function enableDisable(item) {
    var disable = $(item).attr('data-step-disable');
    var enable = $(item).attr('data-step-enable');

    if(disable) {
        var disableItems = disable.split(' ');
        $.each(disableItems, function(key, val) {
            $('.steps a[data-step='+val+']').addClass('disable-step');
        });
    }

    if(enable) {
        var enableItems = enable.split(' ');
        $.each(enableItems, function(key, val) {
            $('.steps a[data-step='+val+']').removeClass('disable-step');
        });
    }
}

/**
 * Go to the current reference step
 * @param {*} item
 */
function thatStep(item) {
    var step = $(item).attr('data-step');

    if(!$(item).hasClass('disable-step')) {
        $('.steps-body .step-content.active').removeClass('.active').hide(200);
        $('.'+step).addClass('active').show(300);
        var exists = $('.steps').find('.'+step);

        if(exists) {
            $('.steps').find('.active').removeClass('active');
            $(step).addClass('active');
        }
    }
}

/**
 * Go to the next step
 * @param {*} reference
 */
function nextStep(reference = null) {
    var current     = $('.steps').find('.active');
    var item        = reference ? $(reference).next() : $(current).next();
    var bodyStep    = $(item).attr('data-step');

    if(item) {
        if($(item).hasClass('disable-step')) {
            nextStep(item);
        } else {
            $(current).removeClass('active').addClass('check-step');
            $(item).addClass('active');

            $('.steps-body .step-content.active').removeClass('active').hide(100);
            $('.steps-body .step-content.'+bodyStep).fadeIn(300);
        }
    }
}

/**
 * Go to the prevent step
 * @param {*} reference
 */
function prevStep(reference = null) {
    var current     = $('.steps').find('.active');
    var item        = reference ? $(reference).prev() : $(current).prev();
    var bodyStep    = $(item).attr('data-step');

    if($(item).hasClass('disable-step')) {
        prevStep(item);
    } else {
        $(current).removeClass('active check-step');
        $(item).addClass('active').removeClass('check-step');

        $('.steps-body .step-content.active').removeClass('active').hide(200);
        $('.steps-body .step-content.'+bodyStep).addClass('active').show(300);
    }
}