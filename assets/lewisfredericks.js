$(document).ready(function() {
    if ($('#content').length) {
        clipHero();
        clipLogo();
        highlightNav();
        pushBrand();
    }
    updateCart();

    // SMOOTH SCROLL
    $('a[href^=#]').click(function(){
        if ($.attr(this, 'href') === "#") {
            return true; // Allows the tabbed panes to work
        } else {
            var current = $(window).scrollTop();
            var target = $( $.attr(this, 'href') ).offset().top;
            var duration = Math.abs(target - current);
            $('html, body').animate({
                scrollTop: target
            }, duration);
            return false;
        }
    });

    $('#modal-contact').on('show.bs.modal', function () {
        $('body').addClass('modal-backdrop-blue');
    });

    $('#modal-contact').on('hidden.bs.modal', function () {
        $('body').removeClass('modal-backdrop-blue');
    });

    $('.btn-add-to-cart').click(function() {
        addToCart($(this).data("id"));
        var id = $(this).closest('.product').attr("id");
        $('#' + id + ' .btn-check-out').addClass("visible");
    });

    $('.navbar-toggle').click(function() {
        $('#navigation').toggleClass("expanded");
    });

    $('#navigation a').click(function() {
        $('#navigation').removeClass("expanded");
    })
});

function addToCart(id) {
    jQuery.ajax({
        url: '/cart/add.js',
        dataType: 'json',
        data: {
            quantity: 1,
            id: id
        },
        method: "POST",
        success: function(data, textStatus, jqXHR) {
            updateCart();
        }
    });
}

function updateCart() {
    jQuery.ajax({
        url: '/cart.js',
        dataType: 'json',
        method: "GET",
        success: function(data, textStatus, jqXHR) {
            var itemsInCart = data.item_count;
            if (itemsInCart) {
                $('.items-in-cart').text("" + itemsInCart);
            } else {
                $('.items-in-cart').text("0");
            }
        }
    });
}

$(window).scroll(function() {
    if ($('#content').length) {
        clipHero();
        clipLogo();
        highlightNav();
        pushBrand();
    }
});

$(window).resize(function() {
    if ($('#content').length) {
        clipHero();
        clipLogo();
        highlightNav();
        pushBrand();
    }
});

function clipHero() {
    var heroImage = $('#hero-light .center-image');
    var top = heroImage.offset().top;
    var bottom = top + heroImage.height();
    var height = heroImage.height();
    var width = heroImage.width();

    var greySectionTop = $('#hero-dark').offset().top;

    if (greySectionTop < top) {
        heroImage.css("opacity", "0");
    } else if (greySectionTop < bottom) {
        var clipAmount = height - bottom + greySectionTop;
        var clipString = "rect(0px, " + width + "px, " + clipAmount + "px, 0px)"
        heroImage.css("opacity", "1");
        heroImage.css("clip", clipString);
    } else {
        var clipString = "rect(0px, " + width + "px, " + height + "px, 0px)"
        heroImage.css("opacity", "1");
        heroImage.css("clip", clipString);
    }
}

function clipLogo() {
    var logo = $('#logo-1');
    var top = logo.offset().top;
    var bottom = top + logo.height();
    var height = logo.height();
    var width = logo.width();

    var contentTop = $('#content').offset().top;

    if (contentTop < top) {
        logo.css("opacity", "0");
    } else if (contentTop < bottom) {
        var clipAmount = height - bottom + contentTop;
        var clipString = "rect(0px, " + width + "px, " + clipAmount + "px, 0px)"
        logo.css("opacity", "1");
        logo.css("clip", clipString);
    } else {
        var clipString = "rect(0px, " + width + "px, " + height + "px, 0px)"
        logo.css("opacity", "1");
        logo.css("clip", clipString);
    }
}

function highlightNav() {
    $('.anchor').removeClass("active");
    var top = $('#brand-top').offset().top;
    var list = $('.anchor');
    for (i = list.length - 1; i >= 0; i--) {
        var targetTop = $($(list[i]).attr("href")).offset().top;
        if (top > targetTop ) {
            if ($(list[i]).is(":visible")) {
                $(list[i]).addClass("active");
                return false;
            }
        }
    }

}

function pushBrand() {
    var brand = $('#brand-wrapper');
    var brandTop = brand.offset().top;
    var brandBottom = brandTop + brand.height();
    var top = $('#brand-top').offset().top;
    var bottom = $('#brand-bottom').offset().top;

    var heroDark = $('#hero-dark .center-image');

    var pushBrand = $('#content').offset().top;

    var scroll = $(window).scrollTop();

    if (pushBrand < top) {
        brand.css("position", "fixed");
        brand.css("top", top - scroll + "px");
    } else if (pushBrand < bottom) {
        brand.css("position", "absolute");
        brand.css("top", "0px");
    } else {
        brand.css("position", "fixed");
        brand.css("top", bottom - scroll + "px");
    }
}