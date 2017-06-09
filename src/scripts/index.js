import { Calculator } from './calculator';
import $ from 'jquery';

$(() => {
  let $fontSwitch = $('.js-font-switch');
  let $font = $('.js-font');

  let $answers = $('.js-radio');
  let $form = $('.js-question-form');
  let $submit = $('.js-question-submit');

  let $aside = $('.js-aside');
  let $calculator = $('.js-calculator');

  let calcInstance;

  function submitForm(event) {
    event.preventDefault();

    $answers.each((index, answer) => {
      if (answer.checked) {
        event.target.submit();
        return false;
      }
    })
  }

  $fontSwitch.on('click', '.font-switch__option', event => {
    let $target = $(event.target);
    let size = $target.data('size')

    $target.siblings().removeClass('_active')

    $font.css('fontSize', `${size}px`);
    $target.addClass('_active');
  })

  $aside.on('click', '.js-calc-mode', event => {
    let $target = $(event.target);

    $target.toggleClass('_active');
    $aside.toggleClass('counter_mode_calc');

    if ($target.hasClass('_active')) {
      $target.text($target.data('hideText'));
      calcInstance = new Calculator($calculator.get(0));
    } else {
      $target.text($target.data('showText'));
      if (calcInstance) {
        calcInstance.destroy();
        calcInstance = null;
      }
    }
  })

  $form.on('submit', submitForm);

  $submit.on('click', () => $form.trigger('submit'));

  $(document).on('keypress', event => {
    let code = event.which;
    let char = String.fromCharCode(code).toUpperCase();

    if (code === 13) {
      $form.trigger('submit')
      return false;
    }

    $answers.each((index, answer) => {
      let $target = $(answer)
      let data = $target.data('letter');
      if (data === char) {
        $target.prop('checked', true);
        return false;
      }
    })
  })
})


