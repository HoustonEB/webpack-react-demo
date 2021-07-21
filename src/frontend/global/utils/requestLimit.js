export class RequestLimit {
    constructor(limit) {
        this.limit = Number(limit) || 2;
        this.blockQueue = [];
        this.currentReqNum = 0;
    }

    async request(req) {
        if (!req) {
            throw new Error('参数不能为空');
        }
        if (typeof req !== 'function') {
            throw new Error('参数必须为函数');
        }
        if(this.currentReqNum >= this.limit) {
            await new Promise((resolve) => {this.blockQueue.push(resolve)});
        }

        return this._handlerReq(req);
    }

    async _handlerReq(req) {
        this.currentReqNum++;
        try {
            return await req();
        } catch (err) {
            return Promise.reject(err);
        } finally {
            this.currentReqNum--;
            if(this.blockQueue.length) {
                this.blockQueue[0]();
                this.blockQueue.shift();
            }
        }
    }
}