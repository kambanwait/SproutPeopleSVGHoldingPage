document.addEventListener("DOMContentLoaded", function() {
  (function(){
    // hide desktop stuffs on mobile
    if ( jQuery.browser.mobile ) {
      jQuery('html').addClass('mobile');
    }

    jQuery('#call').on('click', function() {
      jQuery('.phoneNumber').toggleClass('showNumber');
    })

    // Select everything from DOM
    var sproutPeople  = document.getElementById("sproutName");
    var copy          = document.getElementById("copy");
    var bottomLogo    = document.getElementById("bottomLogoImg");
    var tagline       = document.getElementById("tagline");
    var callToactions = document.getElementById("callAndEmail");

    // create a Timeline instance to append animations too
    var timeline = new TimelineLite();
    // pause the timeline so it doesn't play automatically
    timeline.pause();

    // get the horizontal line path element
      var horizLine = document.querySelector('#horizLine');
      // add it to the animaiton timeline
      timeline.add(createLineTween(horizLine));
      // this function creates a single tween that animates the stroke of an svg
      function createLineTween(svg) {
        var pathObject = {
          length      : 0,
          pathLength  : svg.getTotalLength()
        };
        var tween = TweenLite.to(pathObject, 1, {
          length          : pathObject.pathLength,
          onUpdate        : drawLine,
          onUpdateParams  : [ pathObject, svg ],
          immediateRender : true
        });
        return tween;
      };
      // update the path stroke
      function drawLine(obj, svg) {
        svg.style.strokeDasharray = [obj.length, obj.pathLength].join(' ');
      };

    // get all stalks
      var stalkContainer  = document.getElementById('stalks');
      var ns              = 'http://www.w3.org/2000/svg';
      var stalkPaths      = stalkContainer.getElementsByTagNameNS(ns,'path');

      // hide the stalk container
      stalkContainer.style.opacity = 0;

      for ( var x = 0; x < stalkPaths.length; x++ ) {
        //select a path
        var path = stalkPaths[x];
        // get the pixel length of the SVG path
        var pathDimensions = path.getTotalLength();
        var strokeWidth    = path.getAttribute("stroke-width");
        // apply styles to stroke-dasharray and stroke-dashoffset
        path.style.strokeDasharray = pathDimensions+' '+pathDimensions;
        path.style.strokeDashoffset = (/Firefox/i.test(navigator.userAgent))? -pathDimensions/strokeWidth : -pathDimensions;

        timeline.add(TweenMax.to(path.style, 1, {
          strokeDashoffset : 0
        }),'-=0.9' );
      }

    // get the coloured cirlcle outlines path element
      var outlineContainer  = document.getElementById('circleOutlines');
      var outlinePaths      = outlineContainer.getElementsByTagNameNS(ns,'path');

      // hide the stalk container
      outlineContainer.style.opacity = 0;

      for ( var x = 0; x < outlinePaths.length; x++ ) {
        //select a path
        var path = outlinePaths[x];
        // get the pixel length of the SVG path
        var pathDimensions = path.getTotalLength();
        var strokeWidth    = path.getAttribute("stroke-width");
        // apply styles to stroke-dasharray and stroke-dashoffset
        path.style.strokeDasharray = pathDimensions+' '+pathDimensions;
        path.style.strokeDashoffset = (/Firefox/i.test(navigator.userAgent))? pathDimensions/strokeWidth : pathDimensions;

        timeline.add(TweenMax.to(path.style, 1, {
          strokeDashoffset : 0
        }),'-=0.9' );
      }

    // get all the colour circles
      var svgElipses = document.getElementsByClassName('colourCirc');
      // loop through all and fade them in
      for ( var x = 0; x < svgElipses.length; x++ ) {
        var ellipse = svgElipses[x];
        ellipse.style.opacity = 0;
        timeline.add(TweenMax.to(ellipse.style, 1, {
          opacity : 1
        }),'-=0.9' );
      }

    // make the SVG visibl before we animate it in :)
    TweenLite.set("svg", {
      visibility:"visible"
    });
    stalkContainer.style.opacity = 1;
    outlineContainer.style.opacity = 1;

    // append animations to timeline
    // "+=1.00" - adds a delay to the animaion
    timeline.to( sproutPeople, 1.25, { opacity:1 }, "-=3.5" );
    timeline.to( bottomLogo, 1.25, { marginBottom:0 }, "-=1.9" );
    timeline.to( tagline, 1.25, { opacity:1 }, "-=0.4" );
    timeline.to( copy, 1.25, { opacity:1 }, "-=0.9" );
    timeline.to( callToactions, 1.25, { opacity:1 }, "-=1" );
    // kick it off
    timeline.play();
  })();
});