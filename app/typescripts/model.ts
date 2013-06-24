/// <reference path="../typings/chrome.d.ts" />
/// <reference path="../typings/jquery.d.ts" />
/// <reference path="./bookmarkinfo.ts" />
/// <reference path="./api.ts" />

module hatemove {
    export class Model {
        private onTabUpdate_: (tab: chrome.tabs.Tab, bookmark: hatemove.BookmarkInfo) => void;
        private onTabClear_: (tab: chrome.tabs.Tab) => void;
        private bookmarkInfo_: hatemove.BookmarkInfo = null;

        constructor(private api_: hatemove.Api) {
        }

        onTabUpdate(callback: (tab: chrome.tabs.Tab, bookmark: hatemove.BookmarkInfo) => void) {
            this.onTabUpdate_ = callback;
        }

        onTabClear(callback: (tab: chrome.tabs.Tab) => void) {
            this.onTabClear_ = callback;
        }

        getBookmarkInfo(): hatemove.BookmarkInfo {
            return this.bookmarkInfo_;
        }

        updateTab(tabId: number) {
            this.bookmarkInfo_ = null;
            this.getTab(tabId, (tab) => {
                var url = this.getOriginalUrl(tab.url);
                if (!url) {
                    this.onTabClear_ && this.onTabClear_(tab);
                    return;
                }

                this.api_.getCount(url, (bookmarkInfo) => {
                    this.bookmarkInfo_ = bookmarkInfo;
                    this.onTabUpdate_ && this.onTabUpdate_(tab, bookmarkInfo);
                });
            });
        }

        private getTab(tabId: number, callback: (tab: chrome.tabs.Tab) => void) {
            chrome.tabs.get(tabId, (tab) => {
                callback(tab);
            });
        }

        private getOriginalUrl(url: string): string {
            // GitHub Pages (https://foo.github.io/bar/ => https://foo.github.com/bar/)
            var match = /^(https?:\/\/[^.\/]*\.)github\.io(\/.*)/.exec(url);
            if (match) {
                return match[1] + 'github.com' + match[2];
            }
            // Gist (https://gist.github.com/teppeis/4117588 => https://gist.github.com/4117588)
            match = /^(https?:\/\/gist\.github\.com\/)[^\/]+\/(.*)/.exec(url);
            if (match) {
                return match[1] + match[2];
            }
            // Qiita (https://blog.qiita.com/post/53333284062/new-url-structure)
            match = /^(http:\/\/qiita\.com\/)[^\/]+\/(items\/.*)/.exec(url);
            if (match) {
                return match[1] + match[2];
            }
            return null;
        }
    }
}
