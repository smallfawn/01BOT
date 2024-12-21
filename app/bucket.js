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
            console.error('Error loading data:', error);
        }
        return {};
    }

    saveData() {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(this.data));
        } catch (error) {
            console.error('Error saving data:', error);
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