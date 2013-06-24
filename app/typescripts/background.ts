/// <reference path="../typings/chrome.d.ts" />
/// <reference path="../typings/jquery.d.ts" />
/// <reference path="./api.ts" />
/// <reference path="./model.ts" />
/// <reference path="./bookmarkinfo.ts" />
/// <reference path="./view.ts" />

var api = new hatemove.Api();
var app = new hatemove.Model(api);

app.onTabUpdate(hatemove.BadgeView.render);
app.onTabClear(hatemove.BadgeView.clear);

chrome.tabs.onActivated.addListener(function(activeInfo) {
    app.updateTab(activeInfo.tabId);
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'loading') {
        app.updateTab(tabId);
    }
});

chrome.browserAction.onClicked.addListener(function(tab) {
    var info = app.getBookmarkInfo();
    if (info && info.entry_url) {
        chrome.tabs.create({
            url: info.entry_url
        });
    }
});
