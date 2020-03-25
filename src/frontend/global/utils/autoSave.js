/*
* listenChange
* @description 监听输入框值得改变
* @param target 被包装类的原型
* @param name 被包装的属性
* @param descriptor 被包装属性的描述对象
* */

function listenChange(target, name, descriptor) {
    let oldFn = descriptor.value;

    descriptor.value = function(...args) {
        this.changed = true;
      oldFn.apply(this, args);
        // console.log(target, name, descriptor, 's', this)
    };
    return descriptor;
}

function autoSave(target) {
    return class ASC extends target {
        constructor(props) {
            super(props);
            console.log(props, 'props')
        }

        startAutoSaving() {
            console.log(this)
            this.autoSaveIntervalId = setInterval(this.initAutoSave, 500);
        }

        initAutoSave = () => {
            // console.log(this.changed, 'changed', this)
            if (this.changed) {
                if (this.autoSaveTimeOutId) {
                    clearTimeout(this.autoSaveTimeOutId);
                }

                this.closeAutoSave();
                this.autoSaveTimeOutId = setTimeout(super.save.bind(this), 3500);
            }
        }

        closeAutoSave() {
            this.changed = false;
        }

        stopAutoSaving() {
            if (this.autoSaveIntervalId) {
                clearInterval(this.autoSaveIntervalId);
            }
            if (this.autoSaveTimeOutId) {
                clearTimeout(this.autoSaveTimeOutId);
            }
        }
    }
}

export {
    listenChange,
    autoSave
}