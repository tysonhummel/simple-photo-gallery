$(document).ready(function() {
	gallery.initialize();
});

var gallery = {
	initialize: function() {
		// set up gallery markup and controls
		if( $( '#gallery-wrapper' ).length === 0 ){ // make sure we don't already have a #gallery-wrapper div
			$( 'body' ).append( '<div id="gallery-wrapper"></div>' );
			galleryWrapper = $( '#gallery-wrapper' );
			galleryWrapper.hide();
			galleryWrapper.click(function(){
				$( this ).find( 'img' ).remove();
				$( this ).hide();
				console.log('close image viewer');
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
			galleryWrapper.append( '<div id="gallery-close" data-title="Close the gallery." data-placement="left">x</div>' );
			var closeSlide = $( '#gallery-close' );
			closeSlide.tooltip();
			closeSlide.click( function() {
				galleryWrapper.click();
			});
		}
		// end gallery markup and controls

		// give all image thumbnails click event handlers
		images = $( '.photo-thumbs' ).find( 'img' ); // find all images in photo-thumbs
		$.each( images, function(){
			var me = $( this );
			// on "thumbnail" click
			me.on( 'click', function() {
				// check if using actual thumbnails
				if( me.closest( '.photo-thumbs' ).find( 'img').first().attr( 'src' ).indexOf( '-thumb' ) >= 0 ) {
					console.log( 'using thumbs' );
					// if using thumnails, create slides from full size images
					slideThumbs = me.closest( '.photo-thumbs' ).find( 'img');
					slides = slideThumbs.clone()
					$.each( slides, function( index ){
						$( this ).attr( 'src', $( this ).attr( 'src' ).replace( '-thumb', '' ) );
					});
				}else{
					console.log( 'NOT using thumbs' );
					// if not using actual thumbnails, gather images in this set and clone them
					slides = me.closest( '.photo-thumbs' ).find( 'img' ).clone();
				}

				// give each image some functionality
				$.each( slides, function( index ){
					var thisSlide = $( this );
					// hide each cloned image as we iterate through them
					thisSlide.hide();
					// show the one that was clicked
					if( thisSlide.attr( 'src' ) === me.attr( 'src' ).replace( '-thumb', '' ) ){
						currentSlide = index;
						thisSlide.show();
					}
					// give image nextSlide functionality on click
					thisSlide.click(function(e){
						e.stopPropagation();
						gallery.doSlide( 'next' );
					});
				});
				// add all images to the gallery-wrapper
				galleryWrapper.prepend( slides );
				// show viewer | display:-webkit-box allows for vertical alignment of contents
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