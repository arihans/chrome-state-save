// DATE-TIME ------------------------------------------------
var today = new Date();

var showDate = function() {
	var options = { year: "numeric", month: "short", day: "numeric" };
	var date = today.toLocaleDateString("en-US", options);
	document.getElementById("date__text").innerHTML = date;
};

var showTime = function() {
	var options = { hour: "2-digit", minute: "2-digit" };
	var time = today.toLocaleTimeString("en-US", options);
	document.getElementById("time__text").innerHTML = time;
};
//--------------------------------------------------------------

var showTabs = function() {
	//	var openTabsArr = chrome.tabs.query();

	var openTabsArr = [];

	var template = document.getElementById("open-tab-template");
	var openTabScrollbar = document.getElementById("open-tabs-scrollbar");

	if (typeof openTabsArr !== "undefined" && openTabsArr.length > 0) {
		openTabsArr.forEach(function(element) {
			var openTab = document.importNode(template.content, true);

			var tabIcon = openTab.querySelector(".open-tab__favicon");
			tabIcon.src = openTabsArr.favIconUrl;

			var tabTitle = openTab.querySelector(".open-tab__title");
			tabTitle.textContent = openTabsArr.title;

			openTabScrollbar.appendChild(openTab);
		});
	}
};

document.addEventListener("DOMContentLoaded", function() {
	showTabs();
	showDate();
	showTime();
});
