<h1>Simple Photo Gallery</h1>

<p>This lightweight package of HTML, CSS and jQuery is a quick way to implement a simple, bare-bones photo gallery.</p>

<h2>What does it do?</h2>
<p>It makes a viewer out of your thumbnails and includes previous and next controls and a close button, as well as optional captions.</p>

<h2>Usage</h2>
<ol>
	<li><strong>Put your images inside a div with a class of "photo-thumbs".</strong>
		<ul>
			<li>You can have multiple galleries on a page.</li>
			<li>There is an example in <a href="http://tysonhummel.com/simple-photo-gallery/" target="_blank">gallery.html</a> that utilizes Bootstrap.</li>
		</ul>
	</li>
	<li><strong>Include the jQuery and gallery files.</strong>
		<ul>
			<li>jquery-2.0.3.min.js</li>
			<li>gallery.js</li>
			<li>gallery.css</li>
			<li>boostrap.min.js (for tooltips)</li>
			<li>boostrap.min.css (provides responsiveness and is optional)</li>
		</ul>
	</li>
	<li><strong>Done.</strong></li>
</ol>

<p>If you don't want to use the same large images for both the thumbnails and the single image view, add "-thumb" to your small image's filename, and put both images in the same directory.</p>

<ul><li><strong>Example:</strong> main image = "image.jpg", thumbnail image = "image-thumb.jpg". Use "image-thumb.jpg" on the page, and the script will use the large version ("image.jpg") in the image viewer.</li></ul>

<p>For captions, add data-caption="Your caption" to your thumbnail image tags like this &lt;img src="/path/to/image-thumb" data-caption="Image caption goes here." /&gt;.</p>