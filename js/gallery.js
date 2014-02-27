/*
Simple Photo Gallery by Tyson Hummel
http://github.com/tysonhummel
Free to use with no restrictions
*/

$(document).ready(function() {
  gallery.initialize();
});

var gallery = {
  initialize: function() {

    // find out what kind of browser we have
    webkit = false;
    /* Get browser */
    isChrome = /chrome/.test(navigator.userAgent.toLowerCase());
    /* Detect Chrome */
    if( isChrome ){
        /* Do something for Chrome at this point */
        webkit = true;
        /* Finally, if it is Chrome then jQuery thinks it's 
           Safari so we have to tell it isn't */
        isSafari = false;
    }
    
    currentSlide = null;

    if( $( '#gallery-wrapper' ).length === 0 ){ // make sure we don't already have a #gallery-wrapper div
      $( 'body' ).append( '<div id="gallery-wrapper"></div>' );
      galleryWrapper = $( '#gallery-wrapper' );
      galleryWrapper.hide();
      // close the gallery and remove the images
      galleryWrapper.click(function(){
        $( this ).find( 'img' ).remove();
        $( this ).hide();
        console.log('close image viewer');
        currentSlide = null;
      });
      // add markup for the next and previous buttons
      galleryWrapper.append( '<div id="prev-slide" data-title="Previous Image" data-placement="right"><div class="triangle-left"></div></div><div id="next-slide" data-title="Next Image" data-placement="left"><div class="triangle-right"></div></div>' );
      var prevSlide = $( '#prev-slide' ),
        nextSlide = $( '#next-slide' );
      prevSlide.click( function(e) {
        e.stopPropagation();
        gallery.doSlide( 'prev' );
      });
      // optional tooltip for prevSlide, uncomment line below to use
      // prevSlide.tooltip();
      nextSlide.click( function(e) {
        e.stopPropagation();
        gallery.doSlide( 'next' );
      });
      // optional tooltip for nextSlide, uncomment line below to use
      // nextSlide.tooltip();

      // add close button
      galleryWrapper.append( '<div id="gallery-close" data-title="Close the viewer." data-placement="left">x</div>' );
      var closeSlide = $( '#gallery-close' );
      closeSlide.tooltip();
      closeSlide.click( function() {
        galleryWrapper.click();
      });
    }

    // add arrow key and esc key events
    $( document ).keyup(function (e) {
      if( currentSlide != null ){
        if (e.keyCode == 37 || e.keyCode == 40) {
          // previous (left and down arrow key)
          gallery.doSlide( 'prev' );
        }
        if (e.keyCode == 39 || e.keyCode == 38) {
          // next (up and right arrow key)
          gallery.doSlide( 'next' );
        }
        if(e.keyCode == 27){
          // close (esc button)
          closeSlide.click();
        }
      }
    });

    // add a counter
    galleryWrapper.append( '<div id="gallery-counter"><span id="this-slide"></span> of <span id="total-slides"></span></div>' );
    thisCounter = $( '#this-slide' );
    thisTotal = $( '#total-slides' );

    // give all image thumbnails click event handlers
    images = $( '.photo-thumbs' ).find( 'img' ); // find all images in photo-thumbs
    $.each( images, function(){
      var me = $( this );
      // on "thumbnail" click
      me.on( 'click', function() {

        // check if using actual thumbnails
        if( me.closest( '.photo-thumbs' ).find( 'img').first().attr( 'src' ).indexOf( '-thumb' ) >= 0 ) {
          console.log( 'using thumbs' );
          // if using thumbnails, create slides from full size images
          // use only the images in this group
          slideThumbs = me.closest( '.photo-thumbs' ).find( 'img');
          slides = slideThumbs.clone()
          $.each( slides, function( index ){
            $( this ).attr( 'src', $( this ).attr( 'src' ).replace( '-thumb', '' ) );
          });
        }else{
          console.log( 'NOT using thumbs' );
          // if not using actual thumbnails, just gather images in this set and clone them
          slides = me.closest( '.photo-thumbs' ).find( 'img' ).clone();
        }

        // populate counter total
        thisTotal.html( slides.length );

        // give each image in the viewer some functionality
        $.each( slides, function( index ){
          var thisSlide = $( this );
          // hide each cloned image as we iterate through them
          thisSlide.hide();
          // show the one that was clicked, make sure it's not a thumbnail
          if( thisSlide.attr( 'src' ) === me.attr( 'src' ).replace( '-thumb', '' ) ){
            // set the current slide to be one less than this one
            // since doSlide will increment +1 before it shows
            currentSlide = index-1;
            // initial populate counter current
            thisCounter.html( currentSlide + 1 );
          }
          // give image nextSlide functionality on click
          thisSlide.click(function(e){
            e.stopPropagation();
            gallery.doSlide( 'next' );
          });

        });

        // add this image and it's siblings to the gallery-wrapper
        galleryWrapper.prepend( slides );

        // show the viewer
        if( webkit ){
          // show viewer | display:-webkit-box allows for vertical alignment of contents
          galleryWrapper.css('display', '-webkit-box');
        }else{
          galleryWrapper.addClass( 'no-webkit' );
          galleryWrapper.css('display', 'block');
        }
        // show the first slide
        gallery.doSlide( 'next' );
      });

    });

    // give captions some functionality jazz
    var mini = null;
    var closed = null;
    var opened = null;
    $(document)
    .on( 'mouseover', '.caption', function(e){
      if( mini != null ){clearTimeout( mini );}
      if( closed != null ){clearTimeout( closed );}
      var caption = $( this );
      if( caption.hasClass( 'mini' ) ) {
        caption.removeClass( 'mini' );
      }
      if( caption.hasClass( 'closed' ) ) {
        caption.removeClass( 'closed' );
      }
      if( !caption.hasClass( 'opened' ) ){
        opened = setTimeout( function(){caption.addClass( 'opened' );}, 1000 );
      }
    })
    .on( 'mouseout', '.caption', function(e) {
      var caption = $( this );
      clearTimeout( opened );
      caption.removeClass( 'opened' );
      closedClass = function(){closed = setTimeout( function() {caption.addClass( 'closed' );}, 800);}
      mini = setTimeout( function(){caption.addClass( 'mini' );closedClass();}, 3000 );
    });

    // end initialize
  },
  doSlide: function( dir ) {
    console.log('do slide');
    // if direction is previous
    if ( dir === 'prev' ){
      if( currentSlide === 0 ){
        nextSlide = slides.length-1;
      }else{
        nextSlide = currentSlide - 1;
      }
    }
    // if direction is next
    if ( dir === 'next' ){
      if( currentSlide === slides.length-1 ){
        nextSlide = 0;
      }else{
        nextSlide = currentSlide + 1;
      }
    }

    // check for caption
    $( '.caption' ).remove();
    if( $( slides[nextSlide] ).data( 'caption' ) != undefined ){
      $( slides[nextSlide] ).wrap( '<div class="img-wrapper"></div>' );
      $( slides[nextSlide] ).parent( '.img-wrapper' ).append( '<div class="caption opened">' + $( slides[nextSlide] ).data( 'caption' ) + '</div>' );
      $( '.caption' ).click(function(e){
        e.stopPropagation();
      });
    }
    // unwrap the last image if neccessary
    if( $( slides[currentSlide] ).parent().is( '.img-wrapper' ) ){
      $( slides[currentSlide] ).unwrap();
    }

    // hide the current slide and show the next
    $( slides[currentSlide] ).hide();
    $( slides[nextSlide] ).show();

    // update the current slide number
    currentSlide = nextSlide;

    // populate counter current
    thisCounter.html( currentSlide+1 );

  }
}