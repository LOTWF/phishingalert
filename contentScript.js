function customconfirm(message){
	return confirm(message);
}
function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

 //set "user_email" cookie, expires in 30 days
//"bobthegreat@gmail.com"

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
	console.log(msg, sender, sendResponse);
sendResponse('send this：'+JSON.stringify("msg"));
    if (msg.type === 'phishingalertcheck') {
        var allowedurl;
		var allowed = [ /(.*\.com)$/, /(.*\.com\/.*)$/ , /(.*\.co\.uk)$/ , /(.*\.co\.uk\/.*)$/ , /(.*\.org)$/ , /(.*\.org\/.*)$/ , /(.*\.gov\.uk)$/ , /(.*\.gov\.uk\/.*)$/ , /(.*\.ac\.uk)$/ , /(.*\.ac\.uk\/.*)$/ ,/(.*\.eu)$/ , /(.*\.eu\/.*)$/ ];
		allowedurl=JSON.parse(getCookie("phishingalert_allowed"));
		
		if(allowedurl==null){
			allowedurl=[];
		}
		
		var ok=false;
		var url=document.URL.split('/')[2];
		for (var i in allowed){
		//console.log('looping');
		//console.log(ok);
		ok=ok || allowed[i].test(url);
	   }
		for (var i in allowedurl){
		//console.log('looping');
		//console.log(ok);
		ok=ok || allowedurl[i]==url;
		}
		
		if (!(ok)){
		var userPreference;
		if (customconfirm("This url looks suspicious. Do you want to add it to the allowed urls?") == true) {
			allowed.push(url);
			setCookie("phishingalert_allowed",JSON.stringify("allowedurl"),30);
			}
        else{
			console.log('ignore');
		}			
		}
		
    }
});