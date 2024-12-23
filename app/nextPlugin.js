/**
 * name: test
 * @author smallfawn
 * @rule ^(test)$ 
 */
module.exports = async (s) => {
    await s.reply('请输入测试字符test')

    let input_wait = await s.waitInput(async (s) => {
        const messageContent = s.getMsg() // 假设消息内容在'message_content'字段
        if (messageContent == 'test') {
            return true
        } else {
            await s.reply('匹配失败，重新输入')
            return false
        }

    }, 10 * 1000)
    console.log(`结果===>` + input_wait.getMsg());
    await s.reply('匹配成功' + input_wait.getMsg())
    if (input_wait === null) return s.reply('超时退出');
}