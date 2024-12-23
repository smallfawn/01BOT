/**
 * name: test
 * @author smallfawn
 * @rule ^(test)$ 
 */
module.exports = async (s) => {
    try {
        await s.reply('请输入测试字符test')

        let input_wait = await s.listen(async (s) => {
            const messageContent = s.getMsg() // 假设消息内容在'message_content'字段
            if (messageContent == 'test') {
                return true //监听成功
            } else if (messageContent == 'q') {
                await s.reply('退出')
                return false //退出监听
            } else {
                await s.reply('匹配失败，重新输入')
                //return null //继续监听 或者不写
            }

        }, 10 * 1000)
        if (input_wait) {
            await s.reply('匹配成功' + input_wait.getMsg())
        }
        if (!input_wait) {
            await s.reply('监听超时/退出')
        }

    } catch (error) {
        console.log(error)

    }

}