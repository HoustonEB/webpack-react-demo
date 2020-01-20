import { Form } from "antd";

function upload(url, method, data) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        let formData = new FormData();
        xhr.open(method, url, true);
        formData.append('files', data);
        xhr.upload.addEventListener('progress', e => {
            console.log(e, 'progress')
        });
        xhr.send(formData);
        xhr.onload = e => {
            console.log(e, 'load')
        };
        xhr.onerror = e => {
            console.log(e, 'err')
        };
    });
}

export {
    upload
}