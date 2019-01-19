// all of this will happen when the page is ready
$(document).ready(function(){
  // declare a few global non-constant variables for the page.
  let min = 0;
  let max = 10;
  // actual is equal to what is returned from the randomNumber function
  let actual = randomNumber();

  // when any of the actions are performed within the page
  // basically, check all of the time if the buttons need to be disabled or not
  $(document).on('change mousedown mouseup mouseout keyup', function(){
    // call these functions to disable buttons
    disableClear();
    disableReset();
  });

  // when a key is pressed within the input field
  $('#input').keypress(function(e) {
    // if the key is ENTER
    if (e.keyCode === 13) {
      // trigger the Guess button being clicked
      $('#guess').click();
    }
  });

  // when the Guess button is clicked
  $('#guess').click(function(){
    // retrieve value from input field and store in local variable
    // const because it won't change in the context of this event
    const input = document.getElementById("input").value;
    //if the validate function returns true
    if ( validate(input) ) {
      // change the blank text to this
      $('#last-note').text('Your last guess was');
      // change this blank text to the input
      $('#last').text(input);
      //depending on the result, write different things
      if (input == actual) {
        $('#results').text("BOOM! We've made it harder, guess again!");
        //if correct, call expandRange function
        expandRange();
      } else if (input > actual) {
        $('#results').text("That is too high");
      } else {
        $('#results').text("That is too low");
      }
    }
  });

  // when clear button is clicked
  $('#clear').click(function(){
    // call clear function
    clear();
  });

  // when reset button is clicked
  $('#reset').click(function(){
    // call reset function
    reset();
  });

  // when update button is clicked
  $('#update').click(function(){
    // store the values from the min and max input fields into local variables
    // convert to Integer before. const because they don't need to change
    const newMin = parseInt(document.getElementById("update-min").value);
    const newMax = parseInt(document.getElementById("update-max").value);

    //if both validate functions are true
    if (validateMin(newMin, newMax) && validateMax(newMin, newMax)) {
      // set global variables to new values
      min = newMin;
      max = newMax;
      // update text in html
      $('#min').text(min);
      $('#max').text(max);
      // call reset function
      reset();
    }
  });

  // randomNumber function. I used ES5 because it feels more familiar
  function randomNumber() {
    // return a random number inclusive of the max and min values
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // reset function
  function reset() {
    // set these elements to empty strings
    $('#last').text("");
    $('.feedback-text').text("");
    // change actual to a new randomNumber
    actual = randomNumber();
    //call clear function
    clear();
  }

  // clear function
  function clear() {
    // clears input text
    $('input:text').val("");
  }

  // valdiate function
  function validate(input) {
    // if the input is not an integer or if input is out of range
    if (isNaN(parseInt(input)) || input < min || input > max) {
      // display alert box
      alert(`Please Enter a number between ${min} and ${max}`);
      // have function return false
      return false;
    } else {
      // have function return true
      return true;
    }
  }

  // disableClear function
  function disableClear() {
    // if the input field is blank
    if ($("#input").val() === '') {
      // disable clear button
      $('#clear').prop('disabled', true);
    } else {
      // if not, enable it
      $('#clear').prop('disabled', false);
    }
  }

  // disableReset function
  function disableReset() {
    // if the #last text element is empty
    if($('#last').text() === '') {
      // disable reset button
      $('#reset').prop('disabled', true);
    } else {
      // if not, enable it
      $('#reset').prop('disabled', false);
    }
  }

  // validateMin function, taking user inputs
  function validateMin(newMin, newMax) {
    // if it's not an integer, or if the min < max
    if (isNaN(parseInt(newMin)) || newMin > newMax) {
      // warn user there's a problem
      alert('Min should be an integer less than the Max');
      // and have function return false
      return false;
    } else {
      // otherwise, return true
      return true;
    }
  }

  // same same but different
  function validateMax(newMin, newMax) {
    if (isNaN(parseInt(newMax)) || newMax < newMin) {
      alert('Max should be an integer greater than the Min');
      return false;
    } else {
      return true;
    }
  }

  // expandRange function
  function expandRange() {
    // update global variables +-10
    min -= 10;
    max += 10;
    // update html
    $('#min').text(min);
    $('#max').text(max);
    // new randomNumber
    actual = randomNumber()
  }


});
