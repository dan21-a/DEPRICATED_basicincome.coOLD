{"filter":false,"title":"server3.js","tooltip":"/server3.js","undoManager":{"mark":0,"position":0,"stack":[[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":0,"column":0},"end":{"row":0,"column":36}},"text":"var ws = require(\"nodejs-websocket\")"},{"action":"insertText","range":{"start":{"row":0,"column":36},"end":{"row":1,"column":0}},"text":"\n"},{"action":"insertLines","range":{"start":{"row":1,"column":0},"end":{"row":12,"column":0}},"lines":["","// Scream server example: \"hi\" -> \"HI!!!\"","var server = ws.createServer(function (conn) {","    console.log(\"New connection\")","    conn.on(\"text\", function (str) {","        console.log(\"Received \"+str)","        conn.sendText(str.toUpperCase()+\"!!!\")","    })","    conn.on(\"close\", function (code, reason) {","        console.log(\"Connection closed\")","    })"]},{"action":"insertText","range":{"start":{"row":12,"column":0},"end":{"row":12,"column":15}},"text":"}).listen(8001)"}]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":12,"column":15},"end":{"row":12,"column":15},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1413291390787,"hash":"125acb567dffe55207c64d151f4f9164058bc003"}