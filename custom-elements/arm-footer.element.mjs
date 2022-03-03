<footer id="footer" class="template--section section--footer">
	<span id="footerCopyright"><!-- this content will be populated by JS --></span>
</footer>
	
document
	.getElementById("footerCopyright")
	.innerHTML = `©${new Date().getFullYear()} by Rahman Malik`;