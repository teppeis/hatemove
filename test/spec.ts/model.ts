/// <reference path="../../app/typings/mocha.d.ts" />
/// <reference path="../../app/typings/expect.js.d.ts" />
/// <reference path="../../app/typings/sinon-1.5.d.ts" />
/// <reference path="../../app/typings/chrome.d.ts" />
/// <reference path="../../app/typescripts/model.ts" />
/// <reference path="../../app/typescripts/api.ts" />

describe('hatemove.Model', () => {
    var sut: hatemove.Model;
    var api: hatemove.Api;
    var stub: SinonStub;
    var server: SinonFakeServer;
    var clock: SinonFakeTimers;
    var url: string;

    beforeEach(()=> {
        url = undefined;
        api = new hatemove.Api();
        sut = new hatemove.Model(api);
        stub = sinon.stub(sut, 'getTab', (tabId: number, callback:(tab: chrome.tabs.Tab) => void) => {
            var tab = {
                id: tabId,
                url: url,
                index: 0,
                pinned: false,
                highlighted: false,
                windowId: 0,
                active: true,
                incognito: false
            };
            callback(tab);
        });
        server = sinon.fakeServer.create();
        clock = sinon.useFakeTimers();
    });

    afterEach(() => {
        stub.restore();
        server.restore();
        clock.restore();
    });

    it('updateTab() calls onTabUpdate()', () => {
        url = "https://gist.github.com/teppeis/4117588";
        var movedUrl = "https://gist.github.com/4117588";
        var spy = sinon.spy();
        sut.onTabUpdate(spy);

        sut.updateTab(1);
        server.respondWith('GET', 'http://b.hatena.ne.jp/my.entry?url=' + encodeURIComponent(movedUrl),
            [200, {'Content-Type': 'application/json'},
                '{"count": 1}']);
        server.respond();

        expect(spy.callCount).to.be(1);
        expect(spy.getCall(0).args[0].id).to.be(1)

        // from cached data
        sut.updateTab(1);
        expect(spy.callCount).to.be(2);
        expect(spy.getCall(1).args[0].id).to.be(1)

        // cache expired
        clock.tick(10 * 60 * 1000);
        sut.updateTab(1);
        expect(spy.callCount).to.be(2);
    });
});
