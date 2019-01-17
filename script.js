$(document).ready(function(){
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
    const input = document.getElementById("input").value

    if ( validate(input) ) {
      $('#last-note').text('Your last guess was');
      $('#last').text(input);

      if (input == actual) {
        $('#results').text("BOOM!");
      } else if (input > actual) {
        $('#results').text("That is too high");
      } else {
        $('#results').text("That is too low");
      }
    }
  });

  $('#clear').click(function(){
    $('input:text').val("");
  })

  $('#reset').click(function(){
    reset();
  })

  function randomNumber() {
    return Math.floor(Math.random() * max) + 1;
  }

  function reset () {
    $('h2').text("");
    $('h3').text("");
    $('input:text').val("");
    actual = randomNumber();
  }

  function validate(input) {
    if (isNaN(parseInt(input)) || input < 0 || input > max) {
      alert(`Please Enter a number between 0 and ${max}`);
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



});
