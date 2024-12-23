module.exports = async (s) => {
    //getGroupName 获取群名
    let groupName = await s.getGroupName();
    //getGroupId 获取群号 
    let groupId = await s.getGroupId();
    //getUserName 获取用户名
    let userName = await s.getUserName();
    //getUserId 获取用户id
    let userId = await s.getUserId();
    //getMsgId  获取消息id 群消息 私聊消息都可以
    let msgId = await s.getMsgId();
    //getMsg 获取消息内容
    let msg = await s.getMsg();
    //delMsg(消息ID) 删除消息/撤回消息
    //await s.delMsg(msgId);

    //回复和监听消息 看nextPlugin.js

    const bucket = require('./bucket')
    const test = new bucket('test')
    test.set('test', '测试')
    console.log(test.get('test'))
}