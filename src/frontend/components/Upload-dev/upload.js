const applyRequestHeaders = (req, headers) => {
    if (typeof headers === 'object') {
        Object.keys(headers).forEach(key => {
            req.setRequestHeader(key, headers[key]);
        });
    }
};

function upload(url, {
    file,
    params = {},
    fileName = 'fileName',
    method = 'POST',
    responseType = 'json',
    credentials = false,
    withCredentials = false,
    headers,
    onProgress
} = {}) {
    return new Promise((resolve, reject) => {
        let formData = new FormData();
        let xhr = new XMLHttpRequest();
        formData.append(fileName, file);
        for(let key in params) {
            formData.append(key, params[key]);
        }
        
        xhr.open(method, url, true);
        xhr.withCredentials = withCredentials || credentials === 'include';
        xhr.responseType = responseType;
        applyRequestHeaders(xhr, headers);
        xhr.setRequestHeader('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9')
        xhr.addEventListener('load', () => {
            const ok = xhr.status >= 200 && xhr.status < 300;
            resolve({
                body: xhr.response,
                status: xhr.status,
                ok,
                request: xhr
            });
        });
        xhr.upload.addEventListener('progress', ev => {
            if (onProgress) {
                onProgress(ev);
            }
        });
        xhr.addEventListener('error', reject);
        xhr.addEventListener('abort', reject);
        xhr.send(formData);
    });
};

export default upload;