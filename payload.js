chrome.extension.onMessage.addListener(function(msg, _sender, sendResponse) {

 	if (msg.action == 'download_video') {
    	
		if(window.location.href.indexOf("panopto.eu") < 1) { 
				alert("Sorry: No Panopto video detected!"); 
				exit(); 
			}
			var metas = document.getElementsByTagName('meta'); 
			
			// Default parameters to grab video info
			var name = ""
			var url = ""

			for (var i=0; i<metas.length; i++) 
				if (metas[i].getAttribute("name") == "twitter:player:stream") { 
					console.log(metas[i].getAttribute("content"));
					url = metas[i].getAttribute("content").split('?')[0];

				}
				else if (metas[i].getAttribute("property") == "og:title") { 
					console.log(metas[i].getAttribute("content"));
					//window.open(metas[i].getAttribute("content").split('?')[0]);
					name = metas[i].getAttribute("content").split('?')[0];
				}
			
			// Split the name up, and add file format
			name = name.split(' ').join('_');
			name = name.split(':').join('-');
			name = name + ".mp4";

			var infoArray = [url, name]

			// Callback function
			sendResponse(infoArray);

  	}

});