setTimeout(() => {
    let check = document.querySelector('video').src
    if (!/^http.+/.test(check)) {
        return;
    }
    const query = document.querySelector('.video-switch')

    var span = document.createElement('div');
    span.innerHTML = '下载'
    span.style = 'color: #fff; margin-top: -220px; border-radius: 50px; background: #303233; height: 60px; width: 60px; line-height: 60px; text-align: center; cursor: pointer;'
    span.setAttribute('class', 'switch-item')
    span.onclick = () => {
        const src = document.querySelector('video').src

        var msgBox = document.createElement('div');
        msgBox.style = "width: 100%; margin-top: 6%; position: fixed; top: 20px; z-index:999; text-align: center;"
        var msg = document.createElement('span')
        msg.style = "color: #fff; background: #333; padding: 10px; border-radius: 5px;"
        msg.innerHTML = '正在下载，请稍后'
        msgBox.appendChild(msg)
        document.body.appendChild(msgBox)
        setTimeout(() => {
            msgBox.style.display = 'none';
            msgBox.removeChild()
        }, 2000)

        fetch(src).then(response => {
            response.arrayBuffer().then(res => {
                let type = "video/*"
                let blob = new Blob([res], { type: type });
                // 获取的blob根据实际业务场景应用下载，或转化成其他格式的资源
                var objectUrl = URL.createObjectURL(blob);
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.style = "display: none";
                a.href = objectUrl;
                a.download = document.title + '.mp4'
                a.click();
                document.body.removeChild(a);
                window.URL.revokeObjectURL(ObjectUrl)
            })
        })
    }

    query.appendChild(span)
}, 2000)