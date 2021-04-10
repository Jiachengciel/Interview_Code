var fs = require("fs");
// var location_path = "/Users/kyosuugakku/Desktop/Jiacheng/study/Master/文文/loc-gowalla_totalCheckins.txt"
var location_path = "test.txt"

// fs.readFile(location_path, 'utf-8', function (err, data) {
//     if (err) {
//         console.error(err);
//     }
//     else {
//         console.log(data);
//     }
// });

var readable = fs.createReadStream(location_path);
var dataBuffer = Buffer.alloc(0)
readable.on('open', function (fd) {
    console.log('file was opened, fd - ', fd);
});

// readable.on('readable', function () {
//     console.log('received readable');
// });

readable.on('data', function (chunk) {
    dealData(chunk);
});

readable.on('end', function () {
    console.log('read end');
});

readable.on('close', function () {
    console.log('file was closed.');
});

readable.on('error', function (err) {
    console.log('error occured: %s', err.message);
});

function dealData(data) {
    // console.log(data);
    readable.pause();//暂停读取
    console.log(dataBuffer);
    dataBuffer = Buffer.concat([dataBuffer, data]);
    var seperate = "\n";//分隔符
    var index = dataBuffer.indexOf(seperate);
    var lineBuffer;//行数据缓存
    var len;
    while (index > -1) {
        len = index + seperate.length;
        lineBuffer = dataBuffer.slice(0, len);
        //处理每一行数据
        dataBuffer = dataBuffer.slice(len, dataBuffer.length);

        index = dataBuffer.indexOf(seperate);
    }
    readable.resume();//恢复读取文件
}
console.log(dataBuffer);