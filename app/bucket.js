const fs = require('fs');
const path = require('path');

class Bucket {
    constructor(name) {
        this.name = name;
        this.filePath = path.join(__dirname, `./buckets/${this.name}.json`);
        this.data = this.loadData();
    }

    loadData() {
        try {
            if (fs.existsSync(this.filePath)) {
                return JSON.parse(fs.readFileSync(this.filePath));
            }
        } catch (error) {
            console.error('加载存储桶失败:', error);
        }
        return {};
    }

    saveData() {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(this.data));
        } catch (error) {
            console.error('保存存储桶失败:', error);
        }
    }

    get(key) {
        return this.data[key] || {};
    }

    set(key, value) {
        this.data[key] = value;
        this.saveData();
    }
}

module.exports = Bucket;