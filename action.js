// Copyright 2018 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

if (!document.pictureInPictureEnabled) {
  alert("no");
} else {
  chrome.browserAction.onClicked.addListener(tab => {
    const code = `
      if(window.location.href.indexOf("panopto.eu") < 1) 
	{ 
		alert("No Panopto video detected!"); 
		exit(); 
	}
	var metas = document.getElementsByTagName('meta'); 
	var test = ""
	for (var i=0; i<metas.length; i++) 
		if (metas[i].getAttribute("name") == "twitter:player:stream") 
		{ 
			console.log(metas[i].getAttribute("content"));
			//window.open(metas[i].getAttribute("content").split('?')[0]);
			test = metas[i].getAttribute("content").split('?')[0];
			alert(test);
		} 
	alert("hi");
	chrome.downloads.download({
  		url: test
	});
	alert("hello");
    `;
    chrome.tabs.executeScript({code});
  });
}
