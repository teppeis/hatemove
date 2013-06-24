/// <reference path="../typings/chrome.d.ts" />
/// <reference path="../typings/jquery.d.ts" />
/// <reference path="./bookmarkinfo.ts" />

module hatemove {
    export class BadgeView {
        static render(tab: chrome.tabs.Tab, bookmark: hatemove.BookmarkInfo) {
            var count = bookmark.count ? bookmark.count : '0';
            var icons = BadgeView.getIcons_(bookmark);
            chrome.browserAction.setIcon({path: icons, tabId: tab.id});
            var msg;
            if (Number(count) > 0) {
                msg = '移転前のはてブを開く';
            } else {
                msg = '移転前のはてブはありません';
                count = '';
            }
            chrome.browserAction.setTitle({title: msg, tabId: tab.id});
            chrome.browserAction.setBadgeBackgroundColor({color: [80, 230, 5, 255]});
            chrome.browserAction.setBadgeText({text: count, tabId: tab.id});
        }

        private static getIcons_(bookmark: hatemove.BookmarkInfo): {[index: number]: string} {
            if (!bookmark) {
                return {
                    19: 'images/no-move-19.png',
                    38: 'images/no-move-38.png'
                };
            } else if (bookmark.isBookmarked) {
                return {
                    19: 'images/bookmark-19.png',
                    38: 'images/bookmark-38.png'
                };
            } else {
                return {
                    19: 'images/no-bookmark-19.png',
                    38: 'images/no-bookmark-38.png'
                };
            }
        }

        static clear(tab: chrome.tabs.Tab) {
            var icons = BadgeView.getIcons_(null);
            chrome.browserAction.setIcon({path: icons, tabId: tab.id});
            chrome.browserAction.setTitle({title: 'このページは移転してないみたいです', tabId: tab.id});
            chrome.browserAction.setBadgeText({text: '', tabId: tab.id});
        }
    }
}
