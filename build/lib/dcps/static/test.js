function myFunction(name,job) {
    document.getElementById('code1').innerHTML=connect_url();
}


function connect_url() {
    // 用jQuery重构现有代码
    source_url = $('#source_url').val()
    source_port = $('#source_port').val()
    source_db = $('#source_db').val()
    source_col = $('#source_col').val()
    source_username = $('#source_username').val()
    source_password = $('#source_password').val()
    target_url = $('#target_url').val()
    target_port = $('#target_port').val()
    target_db = $('#target_db').val()
    target_col = $('#target_col').val()
    target_username = $('#target_username').val()
    target_password = $('#target_password').val()
    // 合成登录代码
    connect_code="from pymongo import MongoClient\r\n\r\n";

    // 判断输入用户名与否
    if (source_username && source_password) {
        connect_code+="source_client=MongoClient(\"mongodb://" + source_username + ':' + source_password + '@' + source_url + ':' + source_port + "\")\r\n"
    }
    else if (source_username && ! source_password) {
        alert('input source password, please')
    }
    else if (! source_username && source_password) {
        alert('input source username, please')
    }
    else {
        connect_code+="source_client=MongoClient(\"mongodb://" + source_url + ':' + source_port + "\")\r\n"
    }
    connect_code+="source_db=source_client." + source_db + "\r\n"
    connect_code+="source_col=source_db." + source_col + "\r\n\r\n"
    connect_code+="source_cursor=source_col.find()\r\n"

    if (target_username && target_password) {
        connect_code+="source_client=MongoClient(\"mongodb://" + source_username + ':' + source_password + '@' + source_url + ':' + source_port + "\")\r\n"
    }
    else if (target_username && ! target_password) {
        alert('input target password, please')
    }
    else if (! target_username && target_password) {
        alert('input target username, please')
    }
    else {
        connect_code+="target_client=MongoClient(\"mongodb://" + target_url + ':' + target_port + "\")\r\n\r\n"
    }

    connect_code+="target_db=source_client." + target_db + "\r\n"
    connect_code+="target_col=source_db." + target_col + "\r\n\r\n"
    connect_code+="target_cursor=target_col.find()\r\n"
    return connect_code;

}

// 不必修改py2js.py代码，直接在js里处理即可
function operation_test() {
    var code2 = process_replace_words();
    code2 = code2.replace(/<br>/g,'\r\n');
    code2 = code2.replace(/&nbsp;/g,' ');
    document.getElementById('code2').innerHTML=code2;
}


// js读取本地文件
function readLocalFile() {
    $.get('/static/', function(data) {
        alert('nnnnn');
        alert(data);
    });
}

// 连接mongodb
function connectMongo() {
    var MongoClient = require('mongodb').MongoClient,
        assert = require('assert');
}
