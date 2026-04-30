(function() {
    var frames = document.querySelectorAll('.video-frame[data-embed-src]');

    function clearChildren(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }

    function buildIframe(frame, embedSrc, title) {
        var iframe = document.createElement('iframe');
        iframe.src = embedSrc;
        iframe.title = title;
        iframe.referrerPolicy = 'strict-origin-when-cross-origin';
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;

        clearChildren(frame);
        frame.classList.remove('is-embed-fallback');
        frame.appendChild(iframe);
    }

    function buildFallback(frame, watchUrl) {
        var card = document.createElement('div');
        var kicker = document.createElement('span');
        var title = document.createElement('h3');
        var body = document.createElement('p');
        var actions = document.createElement('div');
        var link = document.createElement('a');
        var icon = document.createElement('i');

        card.className = 'video-fallback';

        kicker.className = 'video-fallback-kicker';
        kicker.textContent = '本機預覽限制';

        title.textContent = '這個環境無法直接嵌入 YouTube 播放器';

        body.textContent = '目前是以 file 預覽頁面，YouTube 會因缺少 referrer 拒絕載入。部署到一般網站或用本機 HTTP 伺服器開啟時，內嵌播放器就會正常顯示。';

        actions.className = 'hero-actions';

        link.className = 'btn btn-secondary';
        link.href = watchUrl;
        link.target = '_blank';
        link.rel = 'noreferrer';

        icon.className = 'fa-brands fa-youtube';
        link.appendChild(icon);
        link.appendChild(document.createTextNode('在 YouTube 開啟影片'));

        actions.appendChild(link);
        card.appendChild(kicker);
        card.appendChild(title);
        card.appendChild(body);
        card.appendChild(actions);

        clearChildren(frame);
        frame.classList.add('is-embed-fallback');
        frame.appendChild(card);
    }

    Array.prototype.forEach.call(frames, function(frame) {
        var embedSrc = frame.getAttribute('data-embed-src');
        var title = frame.getAttribute('data-video-title') || '艾爾芙卡官方試玩影片';
        var watchUrl = frame.getAttribute('data-watch-url') || 'https://www.youtube.com/watch?v=glb0d_-3Oug';

        if (!embedSrc) {
            return;
        }

        if (window.location.protocol === 'file:') {
            buildFallback(frame, watchUrl);
            return;
        }

        buildIframe(frame, embedSrc, title);
    });
})();