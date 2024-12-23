const ws = require('ws');
const sender = require('./sender');
const server = new ws.Server({ port: 3333 });

server.on('connection', (client) => {
    console.log('连接成功');
    client.on('message', async (data) => {
        let message = JSON.parse(data.toString('utf8'));
        if (message['message'] && message['message'].includes('测试')) {


            let s = new sender(client, message['user_id'], {
                type: message['message_type'],
                userId: message['user_id'],
                groupId: message['group_id'] || null
            })


            require('./nextPlugin')(s);
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