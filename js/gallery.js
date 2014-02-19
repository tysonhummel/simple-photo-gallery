$(document).ready(function() {
	gallery.initialize();
});

var gallery = {
	initialize: function() {
		// set up gallery markup and controls
		$( 'body' ).append( '<div id="gallery-wrapper"></div>' );
		galleryWrapper = $( '#gallery-wrapper' );
		galleryWrapper.hide();
		galleryWrapper.click(function(){
			$( this ).find( 'img' ).remove();
			$( this ).hide();
		});
		galleryWrapper.append( '<div id="prev-slide" data-title="Previous Image" data-placement="right"><div class="triangle-left"></div></div><div id="next-slide" data-title="Next Image" data-placement="left"><div class="triangle-right"></div></div>' );
		var prevSlide = $( '#prev-slide' ),
			nextSlide = $( '#next-slide' );
		// prevSlide.tooltip(); //optional tooltip
		prevSlide.click( function(e) {
			e.stopPropagation();
			gallery.doSlide( 'prev' );
		});
		// nextSlide.tooltip(); //optional tooltip
		nextSlide.click( function(e) {
			e.stopPropagation();
			gallery.doSlide( 'next' );
		});
		galleryWrapper.append( '<div id="gallery-close" data-title="Close the gallery." data-placement="left">x</div>' );
		var closeSlide = $( '#gallery-close' );
		closeSlide.tooltip();
		closeSlide.click( function() {
			galleryWrapper.click();
		});
		// end gallery markup and controls

		// give all image thumbnails click event handlers
		images = $( '.photo-thumbs' ).find( 'img' );
		$.each( images, function(){
			var me = $( this );
			// on click
			me.on( 'click', function() {
				// gather images in this set
				slides = me.closest( '.photo-thumbs' ).find( 'img').clone();
				$.each( slides, function( index ){
					var thisSlide = $( this );
					thisSlide.hide();
					if( thisSlide.attr( 'src' ) === me.attr( 'src' ) ){
						currentSlide = index;
						thisSlide.show();
					}
					thisSlide.click(function(e){
						e.stopPropagation();
						gallery.doSlide( 'next' );
					});
				});
				galleryWrapper.append( slides );
				galleryWrapper.css('display', '-webkit-box');
			});
		});
	},
	doSlide: function( dir ) {
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
		// hide the current slide and show the next
		$( slides[currentSlide] ).hide();
		$( slides[nextSlide] ).show();
		// update the current slide number
		currentSlide = nextSlide;
	}
}