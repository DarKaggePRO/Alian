$(function() {

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });

	// fancybox
	$("a.modal").fancybox();
});

//Форма отправки 2.0
$(function() {
	$("[name=send]").click(function () {
		$(":input.error").removeClass('error');
		$(".allert").remove();

		var error;
		var btn = $(this);
		var ref = btn.closest('form').find('[required]');
		var msg = btn.closest('form').find('input, textarea');
		var send_btn = btn.closest('form').find('[name=send]');

		$(ref).each(function() {
			if ($(this).val() == '') {
				var errorfield = $(this);
				$(this).addClass('error').parent('.field').append('<div class="allert"><span>Заполните это поле</span><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></div>');
				error = 1;
				$(":input.error:first").focus();
				return;
			} else {
				var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
				if ($(this).attr("type") == 'email') {
					if(!pattern.test($(this).val())) {
						$("[name=email]").val('');
						$(this).addClass('error').parent('.field').append('<div class="allert"><span>Укажите коректный e-mail</span><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></div>');
						error = 1;
						$(":input.error:first").focus();
					}
				}
				var patterntel = /^()[0-9]{9,18}/i;
				if ( $(this).attr("type") == 'tel') {
					if(!patterntel.test($(this).val())) {
						$("[name=phone]").val('');
						$(this).addClass('error').parent('.field').append('<div class="allert"><span>Укажите коректный номер телефона</span><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></div>');
						error = 1;
						$(":input.error:first").focus();
					}
				}
			}
		});
		if(!(error==1)) {
			$(send_btn).each(function() {
				$(this).attr('disabled', true);
			});
			var form = $(this).closest('form'), name = form.find('[name=name]').val();
			var formData = new FormData(form[0]);
			$.ajax({
				type: 'POST',
				url: '/app/mail.php',
				data: formData,
				processData: false,
				contentType: false,
				success: function(data) {
					$("a[name=upload]").text("Прикрепить реквизиты");
					$.magnificPopup.close();
					if(name){
						$( "#thankyou .name" ).text(name);
					}else{
						$( "#thankyou .name" ).text("");
					}

					$("[href='#thankyou']").click();
					form.trigger("reset");
					setTimeout(function(){  $("[name=send]").removeAttr("disabled"); }, 1000);
					// Настройки модального окна после удачной отправки
				},
				error: function(xhr, str) {
					alert('Возникла ошибка: ' + xhr.responseCode);
				}
			});
		}
		return false;
	})
});






	$('.gallery-item').magnificPopup({
		type: 'image',
		gallery:{
			enabled:true
		}
	});


$(".toggle_mnu").click(function() {
	$(".sandwich").toggleClass("active");
});

$(".top_mnu ul a").click(function() {
	$(".top_mnu").fadeOut(600);
	$(".sandwich").toggleClass("active");
	$(".top_text").css("opacity", "1");
}).append("<span>");

$(".toggle_mnu").click(function() {
	if ($(".top_mnu").is(":visible")) {
		$(".top_text").css("opacity", "1");
		$(".top_mnu").fadeOut(600);
		$(".top_mnu li a").removeClass("fadeInUp animated");
	} else {
		$(".top_text").css("opacity", ".1");
		$(".top_mnu").fadeIn(600);
		$(".top_mnu li a").addClass("fadeInUp animated");
	}
});






	$('.open-popup-link').magnificPopup({
		type:'inline',
		midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
	});











	var adaptive = $('#adaptive').lightSlider({
		item:1,
		slideMargin:5,
		loop: true,
		auto:false,
		controls:false,

	});

	$(".left-arrow a").on("click",function (e) {
		e.preventDefault();
		adaptive.goToPrevSlide();
	});
	$(".right-arrow a").on("click",function (e) {
		e.preventDefault();
		adaptive.goToNextSlide();
	});






	$(".price-menu > ul > li > a").on("click",function(e){
		e.preventDefault();

		if($(this).parent().hasClass("active")){
			$(this).parent().removeClass("active");
			$(".second-price").removeClass("active");
		}else{
			$(this).parent().addClass("active").siblings("li").removeClass("active");
			$(".second-price").addClass("active");
		}

	});





