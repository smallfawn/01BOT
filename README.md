# 01BOT
 
启动 node app/ws.js


反向代理地址 IP+端口(3333)



DOCKER命令

docker run -d -p 3333:3333 --name 01bot -v $(PWD)/nextPlugin.js:/app/nextPlugin.js -e TZ="Asia/Shanghai" --restart=always 01bot