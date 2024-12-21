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
 * @param {*} client 
 * @param {*} user_id 
 * @param {*} message 
 * @returns 
 */
function send_private_msg(client, user_id, message) {
    let echo = uuid();
    client.send(JSON.stringify({
        action: "send_private_msg",
        params: {
            "user_id": user_id,
            "message": [
                {
                    "type": "text",
                    "data": {
                        "text": message
                    }
                }
            ],
        },

        "echo": echo
    }));
    return echo
}

/**
 * 发送群消息
 * @param {*} client 
 * @param {*} group_id 
 * @param {*} message 
 * @returns 
 */
function send_group_msg(client, group_id, message) {
    let echo = uuid();
    client.send(JSON.stringify({
        action: "send_group_msg",
        params: {
            "group_id": group_id,
            "message": [
                {
                    "type": "text",
                    "data": {
                        "text": message
                    }
                }
            ],
        },

        "echo": echo
    }));
    return echo
}
/**
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

}
/**
 * 获取消息ID
 */
function getMsgId() {

}
/**
 * 获取群聊ID
 */

function getGroupId() {

}
/**
 * 获取群聊名
 */
function getGroupName() {

}

module.exports = {
    send_private_msg,
    send_group_msg,
    delete_msg,
    wait,
    waitReply,
    getUserId
}