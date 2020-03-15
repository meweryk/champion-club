jQuery(document).ready(function () {
    jQuery('.post').addClass("hidden").viewportChecker({
        classToAdd: 'visible animated flipInX',
        offset: 200
    });
    jQuery('.card-left').addClass("hidden").viewportChecker({
        classToAdd: 'visible animated bounceInLeft',
        offset: 200
    });
    jQuery('.card-right').addClass("hidden").viewportChecker({
        classToAdd: 'visible animated bounceInRight',
        offset: 200
    });
  
});     


