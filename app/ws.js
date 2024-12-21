const ws = require('ws');
const { handlePrivateMessage, handleGroupMessage } = require('./nextPlugin'); // 一次性导入

const server = new ws.Server({ port: 3333 });

server.on('connection', (client) => {
    console.log('连接成功');
    client.on('message', async (data) => {
        let message = JSON.parse(data.toString('utf8'));
        if (message.message_type === 'private') {
            await handlePrivateMessage(message, client);
        } else if (message.message_type === 'group') {
            await handleGroupMessage(message, client);
        }
    });
});

server.on('close', () => {
    console.log('关闭连接');
});

server.on('error', (err) => {
    console.log(err);
});

server.on('listening', () => {
    console.log('监听成功');
});