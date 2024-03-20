$(document).ready(function(){
    $('.carousel__inner').slick({
      speed: 1200,
      adaptiveHeight: true,
      prevArrow: '<button type="button" class="slick-prev"><img src="icons/right1.png"></button>',
      nextArrow: '<button type="button" class="slick-next"><img src="icons/right2.png"></button>',
      responsive: [
      {
        breakpoint: 992,
        settings: {
          dots: true,
          arrows: false,
          speed: 1500,
          autoplay: true, 
          autoplaySpeed: 2000,
        }
      }]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    $('.catalog-item__link').each(function(i) {
      $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      });
    });

    $('.catalog-item__back').each(function(i) {
      $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      });
    });

    //modal

    $('[data-modal=consultation]').on('click', function() {
      $('.overlay , #consultation').fadeIn('slow');
    });

    $('.modal__close').on('click', function() {
      $('.overlay , #consultation , #thanks , #order').fadeOut('slow');
    });

    $('.button_mini').each(function(i) {
      $(this).on('click' , function() {
        $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay , #order').fadeIn('slow');
      });
    });

    

    

    function valideForms(form) {
      $(form).validate({
        rules: {
          name: {
            required: true,
            minlength: 2
          },
          phone: "required",
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          name: {
            required: "Entrez votre Nom!",
            minlength: jQuery.validator.format("Entrez {0} caractères."),
          },
          phone: "Entrez votre numéro de téléphone.",
          email: {
            required: "Entrez votre adresse email.",
            email: "Adresse e-mail incorrecte saisie.",
          }
        }
      });
    };

    valideForms('#consultation_form');
    valideForms('#order form');
    valideForms('#consultation form');

    $('input[name=phone]').mask("+33 99-99-99-99");


    $('form').submit(function(e) {
      e.preventDefault();

      if (!$(this).valid()) {
        return;
      };

      $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
      }).done(function() {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');

        $('form').trigger('reset');
      });
      return false;
    }); 


    //smooth scroll and pageup

    $(window).scroll(function () {
      if ($(this).scrollTop() > 1600) {
        $('.pageup').fadeIn();
      } else {
        $('.pageup').fadeOut();
      }
    });

    $("a[href^=#up]").click(function() {
      const _href = $(this).attr("href");
      $("html, body").animate({scrollTop: $(_href).offset().top+"p×"});
      return false;
    }); 

    new WOW().init();
  });
  