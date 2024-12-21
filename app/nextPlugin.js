const { send_private_msg, waitReply, getUserId, send_like, send_group_msg, getGroupId, set_group_ban } = require('./sender.js');


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
        //send_private_msg(client, userId, '请输入卡密');

        //发送图片
        //send_private_msg(client, userId, { type: "image", path: 'https://i0.hdslb.com/bfs/archive/c8fd97a40bf79f03e7b76cbc87236f612caef7b2.png' });
        //path:"base64://xxxxxxxx"

        //发送文字
        //send_private_msg(client, userId, '请输入卡密');
        //send_private_msg(client, userId, { type: "text", msg: '请输入卡密TEXT' });

        //发送图片和文字
        send_private_msg(client, userId, [{ type: "image", path: 'https://i0.hdslb.com/bfs/archive/c8fd97a40bf79f03e7b76cbc87236f612caef7b2.png' }, { type: "text", msg: '请输入卡密TEXT' }]);

        //回复消息
        // {type: "text",msg:"回复消息",toMsgId:消息ID 数字格式}


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
    if (message['message'].includes('赞我')) {
        send_like(client, message['user_id'])
        let userId = getUserId(message)
        send_private_msg(client, userId, '点赞成功')
    }


}
/**
 * 处理群聊
 * @param {*} message 
 * @param {*} client 
 */
async function handleGroupMessage(message, client) {
    console.log(`匹配群聊`);

    if (message['message'].includes('赞我')) {
        console.log(`匹配群聊1`);
        let userId = getUserId(message)
        send_like(client, userId)
        let groupId = getGroupId(message)
        console.log(`点赞用户：${userId}`);
        console.log(`点赞群：${groupId}`);


        send_group_msg(client, groupId, '点赞成功')
    }
    //这里应该判断是否为管理员
    /**
     * if (message['message'].includes('ban')) {
        //支持ban @xxx 7200
        //支持ban QQ号 7200
        //不传入时间默认为1小时
        console.log(`匹配ban`);

        let userId = message['message'].split(' ')[1]


        let duration = message['message'].split(' ')[2]
        console.log(`ban用户：${userId}`);

        let groupId = getGroupId(message)
        console.log(`ban群：${groupId}`);
        if (duration) {
            set_group_ban(client, groupId, userId, duration)

        } else {
            set_group_ban(client, groupId, userId)
        }
    }
     */

}