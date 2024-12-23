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
            //await s.reply({ type: 'text', msg: '匹配成功' })
            //await s.reply('匹配成功' + input_wait.getMsg())
            
            //图片+文字
            await s.reply([{ type: 'text', msg: '匹配成功' }, { type: 'image', msg: 'https://pic3.zhimg.com/v2-58d652598269710fa67ec8d1c88d8f03_r.jpg' }])
            //await s.reply({ type: 'video', msg: "file://D:/a.jpg" })
            //await s.reply({ type: 'image', msg: 'https://pic3.zhimg.com/v2-58d652598269710fa67ec8d1c88d8f03_r.jpg' })
            //await s.reply({ type: 'image', msg: 'base64://xxxxxxxx' })
            //await s.reply({ type: 'video', msg: "file://D:/a.mp4" })
            //await s.reply({ type: 'video', msg: "https://pic3.xxxxx.mp4" })
            //await s.reply({ type: 'video', msg: "base64://xxxxxxxx" })

        }
        if (input_wait == false) {
            await s.reply('监听退出')
        }
        if (input_wait == null) {
            await s.reply('监听超时退出')
        }

    } catch (error) {
        console.log(error)

    }

}