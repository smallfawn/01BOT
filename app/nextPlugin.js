/**
 * name: test
 * @author smallfawn
 * @rule ^(test)$ 
 */
module.exports = async (s) => {
    await s.reply('请输入测试字符')
    let input_wait = await s.waitInput(async (s) => {
        //console.log(s);

        let msg = s.getMsg()
        console.log(msg);

        await s.reply('测试成功' + msg)
    }, 10 * 1000)
    if (input_wait === null) return s.reply('超时退出');
}