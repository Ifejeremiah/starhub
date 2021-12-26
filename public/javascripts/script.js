$(function () {

  // Year Stamp
  $('.copyrights .yearstamp').text(new Date().getFullYear());

  // Navbar Menu
  const $menu = $('.con-menu');

  $('.navbar .con-toggle').on('click', function () {
    $('.toggle').toggleClass('active');
    $menu.toggleClass('active');
  });

  // For Navigation Bar
  const $window = $(window);
  const $navbar = $('.con-navbar');

  $window.on('scroll', function () {
    if ($window.scrollTop() >= 50) {
      $navbar.addClass('active');
    } else {
      $navbar.removeClass('active');
    }
  });

  //  For Back To Top Button On Scroll
  const $btn = $('.con-top-btn');

  $window.on('scroll', function () {
    if ($window.scrollTop() >= 200) {
      $btn.fadeIn(100);
    } else {
      $btn.fadeOut(400);
    }
  });

  // For Back To Top Button
  $btn.on('click', function () {
    $window.scrollTop(0);
  });


  // For Countdown

  // Process Every Future Sundays
  const _now = new Date();
  const _sunday = new Date();
  _sunday.setDate(_now.getDate() - _now.getDay()); // Make Sunday
  _sunday.setHours(9); // Set 9am
  _sunday.setMinutes(0);
  _sunday.setSeconds(0);
  _sunday.setMilliseconds(0);
  if (_sunday < _now) _sunday.setDate(_sunday.getDate() + 7); // Make sure it's a future sunday
  millisecondsLeft = _sunday - _now;


  const countdown = document.querySelector(".countdown h1");
  const countDownDate = _sunday.getTime();

  // Update the count down every 1 second
  const x = setInterval(function () {

    // Get today's date and time
    const now = new Date().getTime();

    // Find the distance between now and the count down date
    const distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element 
    countdown.innerHTML = days + "d : " + hours + "h : " + minutes + "m : " + seconds + "s ";

    // If the count down is over, write some text 
    if (distance < 1) {
      clearInterval(x);
      countdown.innerHTML = "<b>Can\'t Take Registerations Today.</b>";
    }
  }, 1000);

  // For User Subscription
  const $input = $('#email');
  const $conServerMsg = $('.subscribe form .server-msg');
  const $serverMsg = $('form .server-msg p');
  const $form = $('.subscribe form');
  const $formElement = $('.con-subscribe form .form-element');

  $form.on('submit', function (evt) {
    evt.preventDefault();
    if (!$input.val()) {
      $conServerMsg.removeClass('success-msg');
      $conServerMsg.addClass('error-msg');
      $formElement.addClass('error');
      $serverMsg.text('Email is required to subscribe');
    }
    $input.on('focus', function () {
      $conServerMsg.removeClass('error-msg');
      $formElement.removeClass('error');
      $conServerMsg.removeClass('success-msg');
    });
    if ($input.val()) {
      $.ajax({
        url: '/',
        type: 'POST',
        data: $form.serialize(),
        success: function () {
          $conServerMsg.removeClass('error-msg');
          $formElement.removeClass('error');
          $conServerMsg.addClass('success-msg');
          $serverMsg.text('You have just registered for our weekly newsletter');
          $input.val('');
        },
        error: function () {
          $conServerMsg.removeClass('success-msg');
          $conServerMsg.addClass('error-msg');
          $formElement.addClass('error');
          $serverMsg.text('That email is already registered');
        }
      })
    }
  });
});