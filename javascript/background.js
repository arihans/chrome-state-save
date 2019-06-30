// DATE-TIME ------------------------------------------------
var today = new Date();

var showDate = function() {
	var options = {year: "numeric", month: "short", day: "numeric"};
	var date = today.toLocaleDateString("en-US", options);
	document.getElementById("date__text").innerHTML = date;
};

var showTime = function() {
	var options = {hour: "2-digit", minute: "2-digit"};
	var time = today.toLocaleTimeString("en-US", options);
	document.getElementById("time__text").innerHTML = time;
};
//--------------------------------------------------------------

var tabsQuery = function(options) {
	return new Promise(function(resolve) {
		chrome.tabs.query(options, function(tabsArr) {
			resolve(tabsArr);
		});
	});
};

var showTab = async function(options) {
	var validTabs = await tabsQuery(options);

	if (validTabs.length) {
		validTabs.forEach(tab => {
			var open_tab = document.createElement("div");

			open_tab.className = "open-tab";

			open_tab.innerHTML = `<img class="open-tab__favicon" src=${
				tab.favIconUrl
			}/>
										 <div class="open-tab__title">${tab.title}</div>
										 <button type="button" class="button tab-close">
										 <img src="/images/ic_cancel_black_18dp.png" />
										 </button>`;

			document.getElementById("open-tabs-scrollbar").appendChild(open_tab);
		});

		console.log(" 🚀 Open Tabs = ", validTabs);
	} else {
		var no_tab = document.createElement("div");

		no_tab.id = "no-tab";

		no_tab.innerHTML = ` Open up some TABS. No valid Tabs. `;

		document.getElementById("open-tabs-scrollbar").appendChild(no_tab);
	}
};

document.addEventListener("DOMContentLoaded", function() {
	showDate();
	showTime();
	showTab({windowType: "normal", url: "*://*/*", currentWindow: true});
});
