class sender {
    constructor(client, message, msgConfig) {
        /*msgConfig = {
            type: "private" || "group",
            userId: '',
            groupId: ""
        }*/
        this.message = message;
        this.client = client;

        this.userId = msgConfig.userId;
        this.groupId = msgConfig.groupId;
        this.messageType = msgConfig.type;
        this.callback = null;
        this.waitTime = 0;
        //this.messageData = {};
        /*this.client.on("message", (data) => {
            this.messageData = JSON.parse(data.toString("utf8"));

        });*/
    }

    getMsg() {
        return this.message["message"];
    }
    getMsgId() {
        return this.message["message_id"];
    }
    getUserId() {
        return this.message["user_id"];
    }
    getUserName() {
        return this.message["sender"]["nickname"];
    }

    getGroupId() {
        //这里应该是群消息ID
    }
    getGroupName() {
        return this.message["sender"]["card"];
    }
    async delMsg(message_id) {
        let echo = uuid();
        this.client.send(JSON.stringify({
            action: "delete_msg",
            params: {
                "message_id": message_id
            },

            "echo": echo
        }));
        return echo
    }
    async reply(message) {
        // 定义消息类型和内容
        let messageType = 'text';
        let messageContent = {};
        let msgContents = []; // 先初始化msgContents数组

        if (Array.isArray(message)) {
            message.forEach(msg => {


                let msgType = msg.type || 'text';
                let msgContent = {};

                if (msgType === 'image') {
                    msgContent = { file: msg.path };
                } else if (msgType === 'text') {


                    msgContent = { text: msg.msg };
                }

                // 如果存在回复ID，添加回复类型的消息
                if (msg.toMsgId) {
                    msgContents.push({
                        type: 'reply',
                        data: {
                            id: msg.toMsgId
                        }
                    });
                }

                // 将当前消息添加到消息内容数组
                msgContents.push({
                    type: msgType,
                    data: msgContent
                });
            });
        }


        // 如果message是对象，并且包含类型和消息内容，则使用这些值
        if (typeof message === 'object' && message !== null && !Array.isArray(message)) {


            messageType = message.type || messageType;
            if (messageType === 'image') {
                messageContent = { file: message.path };
            } else {
                messageContent = { type: messageType, text: message.msg };
            }
            // 如果存在回复ID，添加回复类型的消息
            if (message.toMsgId) {
                msgContents.push({
                    type: 'reply',
                    data: {
                        id: message.toMsgId
                    }
                });
            }
        } else if (typeof message === 'string') {
            messageContent = { text: message };
            msgContents.push({
                type: messageType,
                data: messageContent
            });
        }
        // 生成唯一的echo值
        let echo = uuid();

        // 构建发送的消息对象
        let msgObject = {
            action: "send_private_msg",
            params: {
                user_id: this.userId,
                message: msgContents
            },
            echo: echo
        };

        if (this.messageType === 'group') {

            msgObject = {
                action: "send_group_msg",
                params: {
                    group_id: this.groupId,
                    message: msgContents
                },
                echo: echo
            };
        }
        // 发送消息
        try {
            this.client.send(JSON.stringify(msgObject));
        } catch (error) {
            console.error('Failed to send message:', error);
            //throw error;
        }

        // 返回echo值
        return echo;
    }
    async waitInput(callback, waitTime) {


        this.callback = callback;
        this.waitTime = waitTime;

        return new Promise((resolve, reject) => {
            const listener = (data) => {
                let msg = JSON.parse(data.toString('utf8'));
                if (msg['user_id'] === this.userId && msg['message_type'] === this.messageType) {
                    console.log(`匹配`);

                    // 匹配成功后移除监听器
                    this.client.removeListener('message', listener);
                    // 清除超时计时器
                    clearTimeout(timeoutId);

                    this.message = msg;

                    resolve(callback(this)); // 解析Promise
                }
            };
            this.client.on('message', listener);

            // 设置超时
            const timeoutId = setTimeout(() => {
                this.client.removeListener('message', listener); // 移除监听器
                console.log(`超时`);
                resolve(null); // 超时时resolve为null
            }, waitTime);
        });
    }

    async again(message) {
        // 发送错误消息
        await this.reply(message);

        

        

    }
    async isAdmin() { }
}
function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
            var r = (Math.random() * 16) | 0,
                v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        }
    );
}
module.exports = sender;