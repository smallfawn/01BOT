const { send_private_msg, waitReply, getUserId } = require('./sender.js');


module.exports = {
    handlePrivateMessage,
    handleGroupMessage
}
/**
 * 处理私聊
 * @param {*} message 
 * @param {*} client 
 */
async function handlePrivateMessage(message, client) {
    if (message['message'].includes('查询卡密')) {
        let userId = getUserId(message)
        send_private_msg(client, userId, '请输入卡密');

        //发送图片
        send_private_msg(client, userId, { type: "image", path: 'https://i0.hdslb.com/bfs/archive/c8fd97a40bf79f03e7b76cbc87236f612caef7b2.png' });
        //path:"base64://xxxxxxxx"

        //发送文字
        //send_private_msg(client, userId, '请输入卡密');
        send_private_msg(client, userId, { type: "text", msg: '请输入卡密' });

        //回复消息
        // {msg:"回复消息",toMsgId:消息ID 数字格式}


        // 等待用户回复，设置超时时间为30秒
        const reply = await waitReply(client, userId, 60 * 1000);
        if (reply) {
            console.log(`收到回复：${reply}`);
            //执行操作
            send_private_msg(client, userId, '回复成功');
        } else {
            console.log('等待回复超时');
            // 处理超时情况
            send_private_msg(client, userId, '您没有在规定时间内回复，操作已取消。');
        }
    }

}
/**
 * 处理群聊
 * @param {*} message 
 * @param {*} client 
 */
async function handleGroupMessage(message, client) {

}