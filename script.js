// selecting the video up here to make it easy to refer to and
// use further below in the code:
let video = document.getElementById("keys");

// for the interaction we need to keep track of
// WHEN the previous key was pressed:
let prevKeypress = 0;
// and WHICH was the previous key that was pressed:
let prevKeyValue;
// here we define the minimum speed in which the keys have
// to be pressed
let requiredIntervalSpeed = 300;
// and we counte the keypressed
// to make sure we have at least 3 presses before we
// start playing the video
let keyPressCounter = 0;


// the key event we listen for is when a key is pressed DOWN...
document.addEventListener("keydown", function(event){
  // console.log(event.key);

  // ...once the event takes place, we store the value/name of the key
  // that was pressed:
  let currentKeyValue = event.key.toLowerCase();
  // and record the current moment in time
  // which is given to us by Date.now() in milliseconds.
  let currentTime = Date.now();

  // next we check how long it is ago that the last key was pressed
  // prevKeypress is updated at the bottom of this function
  let timeSinceLastKeyPress = currentTime - prevKeypress;

  // if it happened within our minimum speed requirement...
  if(timeSinceLastKeyPress <= requiredIntervalSpeed){
    // ...we can next check if the key pressed was the one we asked for
    // -- we want a g if j was the last one; and a j if g was the last one.
    // prevKeyValue is updated at the bottom of this function
    if( (currentKeyValue == 's' && prevKeyValue == 'p') || (currentKeyValue == 'p' && prevKeyValue == 's') ){
      // if we made it to here, keys were pressed correctly
      // and fast enough
      // we increase the keyPressCounter
      keyPressCounter = keyPressCounter + 1;
      // but only play the video after at least 3
      // successful key presses:
      if(keyPressCounter > 3){
        playVideo();
      }else{
        stopVideo();
      }

    }else{
      // if we made it here, key were pressed fast enough,
      // but wrong keys were included:
      // reset the counter
      keyPressCounter = 0;
      // stop the video
      stopVideo();
      // clarify what the viewer did wrong:
      document.getElementById("status").innerHTML = "Wrong key.";
    }

  }else{
    // if we made it here, the keys were pressed to slowly:
    // reset the counter
    keyPressCounter = 0;
    // stop the video
    stopVideo();
    // clarify what the viewer did wrong:
    document.getElementById("status").innerHTML = "Too slow.";

  }

  // we store the time and value of this keypress
  // because we need to check back on it the next time a key is pressed
  prevKeyValue = currentKeyValue;
  prevKeypress = currentTime;
})


// this event listener is triggered continuously while the video
// plays.
video.addEventListener("timeupdate", function(){

  let currentTime = Date.now();
  // how long ago was the last key press?
  let timeSinceLastKeyPress = currentTime - prevKeypress;

  // if the video plays, but the last key press is to long ago...
  if(timeSinceLastKeyPress > requiredIntervalSpeed){
    // ... we stop it
    stopVideo();
  }

})

// functions to play and pause the video
// and give information to the viewer
// these functions are called in the code above.
function playVideo(){
  document.getElementById("status").innerHTML = "Play video. ▶️";
  video.play();
}
function stopVideo(){
  document.getElementById("status").innerHTML = "Don't play video. ⏹";
  video.pause();
}










// the following event listeners & functions are only for
// the visual illustration in this example. Namely, the two
// letters that blink RED as you press the keys:

document.addEventListener("keydown", function(event){
  if(event.key.toLowerCase() == 's'){
    document.getElementById('S').style.color = "white";
  }else if(event.key.toLowerCase() == 'p'){
    document.getElementById('P').style.color = "white";
  }
})
document.addEventListener("keyup", function(event){
  if(event.key.toLowerCase() == 's'){
    document.getElementById('S').style.color = "black";
  }else if(event.key.toLowerCase() == 'p'){
    document.getElementById('P').style.color = "black";
  }
})
