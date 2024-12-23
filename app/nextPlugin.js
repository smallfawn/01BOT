/**
 * name: test
 * @author smallfawn
 * @rule ^(test)$ 
 */
module.exports = async (s) => {
    await s.reply('请输入测试字符test')
    let input_wait = await s.waitInput(async (s) => {


        let msg = s.getMsg()

        if (msg !== 'test') {
            //again未实现 
            //await s.again('输入错误，请重新输入test')
        }
        let newS = s.getMsg()
        console.log(`结果===>` + newS);

    }, 10 * 1000)
    //console.log(`结果===>`+input_wait.getMsg());

    if (input_wait === null) return s.reply('超时退出');
}