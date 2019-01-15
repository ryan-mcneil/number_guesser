$(document).ready(function(){
  let actual = randomNumber();

  $('#guess').click(function(){
    const input = document.getElementById("input").value
    $('#last').text(input);
  });

  $('#clear').click(function(){
    reset();
  })

  $('#reset').click(function(){
    reset();
    actual = randomNumber();
  })

  function randomNumber () {
    return Math.floor(Math.random()*100)
  }

  function reset () {
    $('h2').text("");
    $('h3').text("");

  }
});
// $(document).ready(function(){
//   $("p").click(function(){
//     $(this).css('color', 'red');
//   });
// });
