$(document).ready(function(){
  let max = 10;
  const actual = randomNumber();

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
    reset();
  })

  $('#reset').click(function(){
    reset();
    actual = randomNumber();
  })

  function randomNumber () {
    return Math.floor(Math.random() * max) + 1
  }

  function reset () {
    $('h2').text("");
    $('h3').text("");
    $('input:text').val("");
  }

  function validate(input) {
    if (isNaN(parseInt(input)) || input < 0 || input > max) {
      alert(`Please Enter a number between 0 and ${max}`);
      return false;
    } else {
      return true;
    }
  }
});
