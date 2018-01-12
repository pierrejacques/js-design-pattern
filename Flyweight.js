// 通过共享的方式创建少数轻量级对象以减轻存储负担

class Upload { // 享元
    constructor(uploadType) {
        this.uploadType = uploadType;
    }

    delFile(id) {
        uploadManager.setExternalState(id, this);
        if (this.fileSize < 3000) {
            return this.dom.parentNode.removeChild(this.dom);
        }
        if (window.confirm('确定要删除该文件吗？' + this.fileName)) {
            return this.dom.parentNode.removeChild(this.dom);
        }
    }
}

const UploadFactory = (function() {  // 对象拼合工厂
    const createFlyWeightObjs = {};
    return {
        create(uploadType) {
            if (createFlyWeightObjs[uploadType]) {
                return createFlyWeightObjs[uploadType];
            }
            return createFlyWeightObjs[uploadType] = new Upload(uploadType);
        }
    }
})();

const uploadManager = (function() { // 管理外部状态
    const uploadDatabase = {};
    return {
        add(id, uploadType, fileName, fileSize) { // 这里添加上传的文件
            const flyWeightObj = UploadFactory.create(uploadType);
            const dom = document.createElement('div');
            dom.innerHTML = `
                                <span>文件名称: ${fileName} , 文件大小: ${fileSize} </span>
                                <button id="delFile">删除</button>
                            `;
            dom.querySelector('#delFile').onclick = function() {
                flyWeightObj.delFile(id);
            }
            document.body.appendChild(dom);
            uploadDatabase[id] = {
                fileName,
                fileSize,
                dom,
            };
            return flyWeightObj;
        },
        setExternalState(id, flyWeightObj) {
            const uploadData = uploadDatabase[id];
            Object.keys(uploadData, key => {
                flyWeightObj[key] = uploadData[key]; // 这些key在外部
            });
        },
    }
})()

// execute
uploadManager.add(...)
