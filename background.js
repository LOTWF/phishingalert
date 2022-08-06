
let allowed = [ /(.*\.com)$/, /(.*\.com\/.*)$/ , /(.*\.co\.uk)$/ , /(.*\.co\.uk\/.*)$/ , /(.*\.org)$/ , /(.*\.org\/.*)$/ , /(.*\.gov\.uk)$/ , /(.*\.gov\.uk\/.*)$/ , /(.*\.ac\.uk)$/ , /(.*\.ac\.uk\/.*)$/ ,/(.*\.eu)$/ , /(.*\.eu\/.*)$/ ];
let tabid = 0;

/*
chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
	console.log('refreshed');
	let url = tab.url;
	tabId = getForegroundTabId();
	ok=false;
	for (var i in allowed){
		console.log('looping');
		console.log(ok);
		ok=ok || allowed[i].test(url);
	}
	if (!(ok)) {
			chrome.scripting.executeScript(
        {func: () => document.body.style.backgroundColor="orange", tabId});
		}
	console.log(ok);
   
});
*/
/*
chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
	console.log('refreshed');
	let url = tabs[0].url;
	ok=false;
	tabId = getForegroundTabId();
	for (var i in allowed){
		console.log('looping');
		console.log(ok);
		ok=ok || allowed[i].test(url);
	}
	
	console.log(tabId);
	if (!(ok)) {
	chrome.scripting.executeScript(
        {func: () => document.body.style.backgroundColor="orange", tabId});
		}
	console.log(ok);
    // use `url` here inside the callback because it's asynchronous!
});

*/
/*
chrome.runtime.onMessageExternal.addListener( (request, sender, sendResponse) => {
    console.log("Received message from " + sender + ": ", request);
    sendResponse({ received: true }); //respond however you like
});
*/

chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, function (tab) {
        console.log('refreshed');
	let url = tab.url;
	tabid = activeInfo.tabId;
	ok=false;
	for (var i in allowed){
		//console.log('looping');
		//console.log(ok);
		ok=ok || allowed[i].test(url);
	}
	if (!(ok)) {
		console.log('activenotok');
		chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
			try{
        chrome.tabs.sendMessage(tabs[0].id, {
                    type: "phishingalertcheck",function(response){
						if(!chrome.runtime.lastError){
							console.log(response);
							}
							else{
								console.log(chrome.runtime.lastError);
							}
					}
                });
			}
			catch{
				console.log(chrome.runtime.lastError);
				}
		});
	/*		chrome.scripting.executeScript(
        {   target: {tabId: tabid},
			func: () => console.log(document.body.style.backgroundColor)});
		
	*/	
	console.log(ok);
    }});
});
function delay(time) {
	return new Promise(resolve => setTimeout(resolve, time));
  }
chrome.tabs.onUpdated.addListener(function
  (tabId, changeInfo, tab) {
    // read changeInfo data and do something with it (like read the url)
	let url = tab.url;
	tabid = changeInfo.tabId;
	ok=false;
	for (var i in allowed){
		//console.log('looping');
		//console.log(ok);
		ok=ok || allowed[i].test(url);
	}
	if (!(ok)) {
		console.log('updated: notok')
		console.log(tabid);
		chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
			try{
        chrome.tabs.sendMessage(tabs[0].id, {
                    type: "phishingalertcheck",function(response){
						if(!chrome.runtime.lastError){
						console.log(response);
						}
						else{
							console.log(chrome.runtime.lastError);
						}
					}
                });
			}
			catch{
				console.log(chrome.runtime.lastError);
			}
		});
	/*		chrome.scripting.executeScript(
        {   target: {tabId: tabid},
			func: () => console.log(document.body.style.backgroundColor)});
		
	*/	
	console.log(ok);
    }
}
  );