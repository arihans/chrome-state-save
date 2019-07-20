var tabList = [];

// DATE-TIME __________________________________________________
var today = new Date();

// Get__() -------------------------------------
var getTime = new Promise(resolve => {
	var options = { hour: "2-digit", minute: "2-digit" };
	var time = today.toLocaleTimeString("en-US", options);

	resolve(time);
});

var getDate = new Promise(resolve => {
	var options = { year: "numeric", month: "short", day: "numeric" };
	var date = today.toLocaleDateString("en-US", options);

	resolve(date);
});
// ----------------------------------------------

// Show__() -------------------------------------
var showDate = function() {
	getDate.then(date => (document.getElementById("date__text").innerHTML = date));
};

var showTime = function() {
	getTime.then(time => (document.getElementById("time__text").innerHTML = time));
};
// -----------------------------------------------
//______________________________________________________________

// TAB Query() and Show() _______________________________________
var tabsQuery = function(options) {
	return new Promise(function(resolve) {
		chrome.tabs.query(options, function(tabsArr) {
			if (chrome.runtime.lastError) {
				/* error */
				console.log(chrome.runtime.lastError.message);
				return;
			}

			tabsArr.forEach(tab => {
				favIcon = "chrome://favicon/size/16@1x/" + tab.url;

				tabObj = {
					id: tab.id,
					favIcon: favIcon,
					title: tab.title,
					url: tab.url
				};

				tabList.push(tabObj);
			});

			resolve(tabList);
		});
	});
};

var showTab = async function(options) {
	tabList = await tabsQuery(options);

	console.log(tabList);

	if (tabList.length) {
		tabList.forEach(tab => {
			var open_tab = document.createElement("div");
			open_tab.className = "open-tab";

			open_tab.innerHTML = `<img class="open-tab__favicon" src=${tab.favIcon}/>
										 <div class="open-tab__title">${tab.title}</div>
										 <button type="button" class="button tab-close" id="${tab.id}">
										 <img src="/images/ic_cancel_black_18dp.png" />
										 </button>`;

			document.getElementById("open-tabs-scrollbar").appendChild(open_tab);
		});
	} else {
		var no_tab = document.createElement("div");

		no_tab.id = "no-tab";

		no_tab.innerHTML = ` Open up some TABS. No valid Tabs. `;

		document.getElementById("open-tabs-scrollbar").appendChild(no_tab);
	}
};
//______________________________________________________________

// Form Handler() and Storage() ________________________________
var storage = async () => {
	var inputData = await formHandler();

	// console.log("state", inputData);

	// if (!inputData) {
	// 	console.log("Error: No value specified");
	// }

	chrome.storage.local.get(store => {
		if (Object.keys(store).length > 0 && store.items) {
			store.items.push(inputData);
		} else {
			store.items = [inputData];
		}

		// console.log(store);

		chrome.storage.local.set(store, () => {
			console.log("State saved 🙌", store.items);
		});
	});
};

var formHandler = async () => {
	var inputData = {
		label: document.getElementById("label").value,
		tags: document
			.getElementById("tag")
			.value.split(",")
			.map(item => item.trim()),
		date: await getDate,
		time: await getTime,
		tabList: tabList
	};

	return inputData;
};

//_______________________________________________________________

// Open-Tab Remove
// var tabRemove = () => {

// };

// Event-Listeners ______________________________________________
// ENTRY --------------------------------
document.addEventListener("DOMContentLoaded", function() {
	showDate();
	showTime();
	showTab({ windowType: "normal", url: "*://*/*", currentWindow: true });
});
//----------------------------------------

// Others --------------------------------
document.getElementById("save-button").onclick = () => {
	storage();
};

// document.getElementsByClassName("button tab-close").onclick = () {
// 	tabRemove();
// }
//---------------------------------------
//_______________________________________________________________
