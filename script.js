$(document).ready(function(){
  let min = 0;
  let max = 10;
  let actual = randomNumber();

  $(document).on('change mousedown mouseup mouseout keyup', function(){
    disableClear();
    disableReset();
  });

  $('#input').keypress(function(e) {
    if (e.keyCode === 13) {
      $('#guess').click();
    }
  });

  $('#guess').click(function(){
    const input = document.getElementById("input").value;
    if ( validate(input) ) {
      $('#last-note').text('Your last guess was');
      $('#last').text(input);

      if (input == actual) {
        $('#results').text("BOOM! We've made it harder, guess again!");
        expandRange();
      } else if (input > actual) {
        $('#results').text("That is too high");
      } else {
        $('#results').text("That is too low");
      }
    }
  });

  $('#clear').click(function(){
    clear();
  });

  $('#reset').click(function(){
    reset();
  });

  $('#update').click(function(){
    let newMin = parseInt(document.getElementById("update-min").value);
    let newMax = parseInt(document.getElementById("update-max").value);

    if (validateMin(newMin, newMax) && validateMax(newMin, newMax)) {
      min = newMin;
      max = newMax;
      $('#min').text(min);
      $('#max').text(max);
      reset();
    }
  });

  function randomNumber() {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function reset() {
    $('#last').text("");
    $('.feedback-text').text("");
    actual = randomNumber();
    clear();
  }

  function clear() {
    $('input:text').val("");
  }

  function validate(input) {
    if (isNaN(parseInt(input)) || input < min || input > max) {
      alert(`Please Enter a number between ${min} and ${max}`);
      return false;
    } else {
      return true;
    }
  }

  function disableClear() {
    if ($("#input").val() === '') {
      $('#clear').prop('disabled', true);
    } else {
      $('#clear').prop('disabled', false);
    }
  }

  function disableReset() {
    if($('#last').text() === '') {
      $('#reset').prop('disabled', true);
    } else {
      $('#reset').prop('disabled', false);
    }
  }

  function validateMin(newMin, newMax) {
    if (isNaN(parseInt(newMin)) || newMin > newMax) {
      alert('Min should be an integer less than the Max');
      return false;
    } else {
      return true;
    }
  }

  function validateMax(newMin, newMax) {
    if (isNaN(parseInt(newMax)) || newMax < newMin) {
      alert('Max should be an integer greater than the Min');
      return false;
    } else {
      return true;
    }
  }

  function expandRange() {
    min -= 10;
    max += 10;
    $('#min').text(min);
    $('#max').text(max);
    actual = randomNumber()
  }


});
