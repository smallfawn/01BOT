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
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
/**
 * 发送私聊消息
 * @param {Object} client - 客户端对象，用于发送消息
 * @param {String} user_id - 接收消息的用户ID
 * @param {String|Object} message - 要发送的消息，可以是文本或者包含类型和消息内容的对象
 * @returns {String} echo - 用于标识此次消息发送的唯一ID
 */
function send_private_msg(client, user_id, message) {
    // 定义消息类型和内容
    let messageType = 'text';
    let messageContent = {};

    // 如果message是对象，并且包含类型和消息内容，则使用这些值
    if (typeof message === 'object' && message !== null) {
        messageType = message.type || messageType;
        if (messageType === 'image') {
            messageContent = { type: 'image', path: message.path };
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
    }

    // 构建消息内容数组
    let msgContents = [
        {
            type: messageType,
            data: messageContent
        }
    ];



    // 生成唯一的echo值
    let echo = uuid();

    // 构建发送的消息对象
    let msgObject = {
        action: "send_private_msg",
        params: {
            user_id: user_id,
            message: msgContent
        },
        echo: echo
    };

    // 发送消息
    client.send(JSON.stringify(msgObject));

    // 返回echo值
    return echo;
}
/**
 * 发送群消息
 * @param {Object} client - 客户端对象，用于发送消息
 * @param {String} groupId - 群组ID
 * @param {String|Object} message - 要发送的消息，可以是文本或者包含类型和消息内容的对象
 * @returns {String} echo - 用于标识此次消息发送的唯一ID
 */
function send_group_msg(client, groupId, message) {

    // 定义消息类型和内容
    let messageType = 'text';
    let messageContent = {};

    // 如果message是对象，并且包含类型和消息内容，则使用这些值
    if (typeof message === 'object' && message !== null) {
        messageType = message.type || messageType;
        if (messageType === 'image') {
            messageContent = { type: 'image', path: message.path };
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
    }

    // 构建消息内容数组
    let msgContents = [
        {
            type: messageType,
            data: messageContent
        }
    ];
    // 生成唯一的echo值
    let echo = uuid();

    // 构建发送的消息对象
    let msgObject = {
        action: "send_group_msg",
        params: {
            group_id: groupId,
            message: msgContents
        },
        echo: echo
    };

    // 发送消息
    try {
        client.send(JSON.stringify(msgObject));
    } catch (error) {
        console.error('Failed to send message:', error);
        throw error;
    }

    // 返回echo值
    return echo;
}/**
 * 撤回消息
 * @param {*} client 
 * @param {*} message_id 
 * @returns 
 */
function delete_msg(client, message_id) {
    let echo = uuid();
    client.send(JSON.stringify({
        action: "delete_msg",
        params: {
            "message_id": message_id
        },

        "echo": echo
    }));
    return echo
}
/**
 * 等待消息
 * @param {*} client 
 * @param {*} user_id 
 * @param {*} timeout 
 * @returns 
 */

function waitReply(client, user_id, timeout) {
    return new Promise((resolve, reject) => {
        const listener = (data) => {
            let msg = JSON.parse(data.toString('utf8'));
            if (msg['user_id'] === user_id) {
                console.log(`匹配`);

                // 匹配成功后移除监听器
                client.removeListener('message', listener);
                // 清除超时计时器
                clearTimeout(timeoutId);
                resolve(msg['message']); // 解析Promise
            }
        };
        client.on('message', listener);

        // 设置超时
        const timeoutId = setTimeout(() => {
            client.removeListener('message', listener); // 移除监听器
            console.log(`超时`);
            reject(new Error('超时')); // 拒绝Promise
        }, timeout);
    });
}
/**
 * 获取用户ID
 * @param {*} message 
 * @returns 
 */
function getUserId(message) {
    return message['user_id']
}
/**
 * 获取用户名
 * @param {*} message 
 */
function getUserName(message) {
    return message['sender']['nickname']
}
/**
 * 获取消息ID
 * @param {*} message 
 * @returns 
 */
function getMsgId(message) {
    return message['message_id']
}
/**
 * 获取群号
 * @param {*} message 
 * @returns 
 */
function getGroupId(message) {
    return message['group_id']
}
/**
 * 获取群名
 * @param {*} message 
 * @returns 
 */
function getGroupName(message) {
    return message['sender']['card']


}

module.exports = {
    send_private_msg,
    send_group_msg,
    delete_msg,
    wait,
    waitReply,
    getUserId
}