define('Sidebar', function(require) {
	var sidebarIn = false,
		page = require('Page');

	function toggleSideBar(event) {
		sidebarIn = !sidebarIn;
		page.sidebar.toggleClass('in', sidebarIn);
		event.stopImmediatePropagation();
	}

	page.overlay.on('click', toggleSideBar);
	page.navbarToggle.on('click', toggleSideBar);
});