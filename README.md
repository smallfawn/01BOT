# 01BOT
 
启动 node app/ws.js


反向代理地址 IP+端口(3333)


插件编写详情看 app/nextPlugin2.js

函数引入和触发关键词参数说明看 app/sender.js

DOCKER命令 

docker run -d -p 3333:3333 --name 01bot -v $(PWD)/nextPlugin.js:/app/nextPlugin.js -e TZ="Asia/Shanghai" --restart=always smallfawn/01bot
