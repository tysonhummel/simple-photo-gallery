<h1>Simple Photo Gallery</h1>

<p>This lightweight package of HTML, CSS and jQuery/javascript is a quick way to implement a simple, bare-bones photo gallery.</p>

<h2>What does it do?</h2>
<p>It makes a simple viewer out of your thumbnails with previous and next controls and a close button.</p>
<p>The next and previous buttons are css only and resize with the browser, no images needed.</p>

<h2>Usage</h2>
<ol>
	<li><strong>Put your images inside a div with a class of "photo-thumbs".</strong>
		<ul>
			<li>You can have multiple galleries on a page.</li>
			<li>There is an example in <a href="http://tysonhummel.com/simple-photo-gallery/gallery.html" target="_blank">gallery.html</a> that utilizes Bootstrap.</li>
		</ul>
	</li>
	<li><strong>Include the jQuery and gallery files.  Bootstrap provides responsiveness and is optional.</strong>
		<ul>
			<li>jquery-2.0.3.min.js</li>
			<li>gallery.js</li>
			<li>gallery.css</li>
			<li>boostrap.min.js (optional)</li>
			<li>boostrap.min.css (optional)</li>
		</ul>
	</li>
	<li><strong>Done.</strong></li>
</ol>

<p>If you don't want to use the same image for both the thumbnails and the single image view, use the same name for your thumbnail image and add "-thumb" to the filename, and put both images in the same directory.</p>

<p><strong>Example:</strong> main image = "image-1.jpg", thumbnail image = "image-1-thumb.jpg". Use "image-1-thumb.jpg" on the page, and the script will use the large version ("image-1.jpg") in the image viewer.</p>

<p>Use it, modify it, sing to it. Whatevs.</p>