setTimeout(() => {
    const query = document.querySelector('.xg-right-grid')

    var span = document.createElement('span');
    span.innerHTML = '下载视频'
    span.style.color = '#fff'
    span.style.marginRight = '10px'
    span.setAttribute('class', 'download')
    span.onclick = () => {
        const src = document.getElementsByTagName('source')[0].src

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
}, 1000)