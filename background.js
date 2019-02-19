chrome.browserAction.onClicked.addListener(function (tab) {
	//alert("hello world");
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    	chrome.tabs.sendMessage(tabs[0].id, {action: "open_dialog_box"}, downloadCallback);  
	})
});

function downloadCallback(infoArray) {
	var url = infoArray[0]
	var name = infoArray[1]
	alert(url);
	alert(name);

	chrome.downloads.download({
	  			url: url,
	  			filename: name,
	  			saveAs: true
	});
}