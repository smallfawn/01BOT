const { send_private_msg, waitReply } = require('./sender.js');


module.exports = {
    handlePrivateMessage,
    handleGroupMessage
}

async function handlePrivateMessage(message, client) {
    if (message['message'].includes('查询卡密')) {
        send_private_msg(client, message['user_id'], '请输入卡密');

        // 等待用户回复，设置超时时间为30秒
        const reply = await waitReply(client, message['user_id'], 60 * 1000);
        if (reply) {
            console.log(`收到回复：${reply}`);
            //执行操作
            send_private_msg(client, message['user_id'], '回复成功');
        } else {
            console.log('等待回复超时');
            // 处理超时情况
            send_private_msg(client, message['user_id'], '您没有在规定时间内回复，操作已取消。');
        }
    }

}
async function handleGroupMessage(message, client) {

}