var span = document.createElement('span');
span.innerHTML = '下载视频'
span.setAttribute('class', 'download')
span.onclick = () => {
    const html = document.getElementsByTagName('html')[0].innerHTML;
    const playinfo = JSON.parse(html.match(/window.__playinfo__=(.+?)<\/script/)[1]);

    const videoUrl = playinfo.data.dash.video[0].baseUrl
    const audioUrl = playinfo.data.dash.audio[0].baseUrl
    const href = window.location.href
    const title = document.title

    const cmd = `mkdir "${title}" ; cd "${title}" ; curl '${videoUrl}' -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36' -H 'referer: ${href}' --compressed -o video.m4s -Lv -s ; curl '${audioUrl}' -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36' -H 'referer: ${href}' --compressed -o audio.m4s -Lv -s ; ffmpeg -i video.m4s -i audio.m4s -c:v copy -strict experimental ${title}.mp4 ; rm -rf *.m4s`

    const inputEl = document.createElement('textarea')
    inputEl.setAttribute('readonly', 'readonly')
    inputEl.value = cmd
    document.body.appendChild(inputEl)
    try {
        inputEl.select()
        document.execCommand('copy')
        var msgBox = document.createElement('div');
        msgBox.style = "width: 100%; margin-top: 6%; position: fixed; top: 20px; z-index:999; text-align: center;"
        var msg = document.createElement('span')
        msg.style = "color: #fff; background: #333; padding: 10px; border-radius: 5px;"
        msg.innerHTML = '复制成功'
        msgBox.appendChild(msg)
        var app = document.querySelector("#app")
        app.appendChild(msgBox)
        setTimeout(() => {
            msgBox.style.display = 'none';
            msgBox.removeChild()
        }, 2000)
    } catch (error) {
        alert("复制失败")
    }
    document.body.removeChild(inputEl)
}

setTimeout(() => {
    var toolbar = document.querySelector('.toolbar-left');
    toolbar.appendChild(span)
}, 2000)
