import React, { useState, useEffect } from 'react';
import Tweet from "./Tweet";
import NewQuote from "./NewQuote";
import QUOTES from "./QUOTES";
import $ from 'jquery';

let BACKGROUND_IMAGES = [
        'url("../images/arctic-thaw.jpg")',
        'url("../images/drought.jpg")',
        'url("../images/flooding.jpg")',
        'url("../images/tropical-rainstorm.jpg")',
        'url("../images/arctic-thaw2.jpg")',
        'url("../images/wildfire.jpg")',
        'url("../images/coral-bleaching.jpg")'                   
      ];

const App = () => {
  const [index, setIndex] = useState(0);
  const [click, isClicked] = useState(false); 
  const [currentBackgroundIndex, setBackGroundIndex] = useState(Math.random() * 7)
  

  useEffect(() => {
    if(click){
      $("#text").fadeOut(1000);
      $("#author").fadeOut(1000);
      $("#text").fadeIn(1000);
      $("#author").fadeIn(1000);
      let interval = setInterval(() => {
        setIndex(Math.floor(Math.random() * 29));
        isClicked(!click);
      }, 1000);
      return () => clearInterval(interval); 
    }
  }, [click]);

  useEffect(() => {
      $('#bg-image').css('background-image', BACKGROUND_IMAGES[currentBackgroundIndex]);
      function changeBackground(){
        setBackGroundIndex((currentBackgroundIndex + 1) % BACKGROUND_IMAGES.length);
        $('#bg-image').fadeOut(1000, function(){
          $('#bg-image').add("<div id='bg-image'></div>").css('background-image', BACKGROUND_IMAGES[currentBackgroundIndex]).fadeIn(1000);
        });
       }

       setInterval(changeBackground, 5000);

  }, [currentBackgroundIndex])

  return(
    <div id="quote-box">
      <div>
        <p id="text"><em>{QUOTES[index].text}</em></p>
        <p id="author">- {QUOTES[index].author}</p>
      </div>
      <div>
        <NewQuote click={click} isClicked={isClicked}/>
        <Tweet index={index}/>
      </div>
    </div>
  )};


export default App;
