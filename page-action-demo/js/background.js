function injectCustomJs(jsPath) {
  jsPath = jsPath || 'js/inject.js';
  var temp = document.createElement('script');
  temp.setAttribute('type', 'text/javascript');

  // 获得地址类似:chrome-extension://<extension-id>/js/inject.js
  temp.src = chrome.extension.getURL(jsPath);

  // temp.onload = function() {

  // }
  document.head.appendChild(temp);
}
injectCustomJs();

chrome.runtime.onInstalled.addListener(function(details){
  let pageAction = new chrome.declarativeContent.ShowPageAction();
  console.log(typeof pageAction, pageAction);
  
  // https://developer.chrome.com/docs/extensions/reference/declarativeContent/
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function(){
		chrome.declarativeContent.onPageChanged.addRules([
			{
				conditions: [
					// 只有打开百度才显示pageAction
					new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'baidu.com'}
          })
				],
				actions: [new chrome.declarativeContent.ShowPageAction()]
      },
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { 
              hostEquals: 'www.google.com', 
              schemes: ['https'],
              // hostContains
              // hostEquals
              // hostPrefix
              // hostSuffix
              // originAndPathMatches
              // pathContains
              // pathEquals
              // pathPrefix
              // ports
              // queryContains
              // queryEquals
              // queryPrefix
              // querySuffix
              // urlContains
              // urlEquals
              // urlMatches
              // urlPrefix
              // urlSuffix
            },
            css: ["input[type='text']"],
            // isBookmarked: true
          })
        ],
        // PageStateMatcher
        // RequestContentScript
        // SetIcon
        // ShowPageAction
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
		]);
	});
});
