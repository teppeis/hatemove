/// <reference path="../typings/jquery.d.ts" />
/// <reference path="./bookmarkinfo.ts" />

module hatemove {
    export class Api {
        private cache_: hatemove.Cache<hatemove.BookmarkInfo>;

        constructor() {
            this.cache_ = new hatemove.Cache();
        }

        getCount(url: string, callback: (bookmarkInfo: hatemove.BookmarkInfo) => void) {
            if (this.cache_.has(url)) {
                callback(this.cache_.get(url));
            } else {
                var myEntryUrl = 'http://b.hatena.ne.jp/my.entry';
                var d = $.ajax(myEntryUrl, {
                    dataType: 'json',
                    data: {url: url}
                });
                d.done((data) => {
                    data.isBookmarked = !!data.bookmarked_data;
                    this.cache_.set(url, data);
                    callback(data);
                });
                d.fail((jqXHR, textStatus, errorThrown) => {
                    console.error(textStatus, errorThrown);
                });
            }
        }
    }

    export class Cache<T> {
        private static DEFAULT_EXPIRED_INTERVAL = 1 * 60 * 1000; // 1 minutes
        private cache_: {[index: string]: {data: T; expired: number;}};

        constructor(private interval_ = Cache.DEFAULT_EXPIRED_INTERVAL) {
            this.cache_ = {};
        }

        has(url: string) {
            var value = this.cache_[url];
            if (value && value.expired > new Date().getTime()) {
                return true;
            }
            return false;
        }

        get(url: string): T {
            return this.has(url) ? this.cache_[url].data : null;
        }

        set(url: string, data: T) {
            this.cache_[url] = {data: data, expired: new Date().getTime() + this.interval_};
        }
    }
}
