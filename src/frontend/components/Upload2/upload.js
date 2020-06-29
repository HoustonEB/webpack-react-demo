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
    responseType = '',
    credentials = false,
    withCredentials = false,
    headers,
    onProgress
} = {}) {
    return new Promise((resolve, reject) => {
        let formData = new FormData();
        let request = new XMLHttpRequest();
        formData.append(fileName, file);
        for(let key in params) {
            formData.append(key, params[key]);
        }
        
        request.open(method, url, true);
        request.withCredentials = withCredentials || credentials === 'include';
        request.responseType = responseType;
        applyRequestHeaders(request, headers);
        request.setRequestHeader('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9');
        
        request.addEventListener('load', e => {
            if(request.status !== 200) {
                reject({request, file, e});
                return;
            }
            try {
                let response = JSON.parse(request.responseText);
                resolve({request, response, file, e});
            }
            catch (ex) {
                reject({request, file, e});
            }
        });
        request.upload.addEventListener('progress', e => {
            console.log(e, 'progress');
            if (onProgress) {
                onProgress(e);
            }
        });
        request.addEventListener('error', e => {
            reject({request, file, e});
        });
        request.addEventListener('abort', e => {
            reject({request, file, e});
        });
        request.send(formData);
    });
};

export default upload;