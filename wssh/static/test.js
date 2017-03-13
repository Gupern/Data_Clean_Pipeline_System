function fff(){
    var source_url_doc = document.getElementById('source_url');
    var source_url = source_url_doc.value
    return source_url
}

function myFunction(name,job) {
    document.getElementById('demo').innerHTML=connect_url()
}


function connect_url() {
    var source_url_doc = document.getElementById('source_url');
    var source_url = source_url_doc.value;
    var source_port_doc = document.getElementById('source_port');
    var source_port = source_port_doc.value;
    var source_db = document.getElementById('source_db').value;
    var source_col = document.getElementById('source_col').value;


    var target_url_doc = document.getElementById('target_url');
    var target_url = target_url_doc.value;
    var target_port_doc = document.getElementById('target_port');
    var target_port = target_port_doc.value;
    var target_db = document.getElementById('target_db').value;
    var target_col = document.getElementById('target_col').value;
    // 合成代码
    connect_code="from pymongo import MongoClient<br><br>";
    connect_code+="source_client=MongoClient(\"mongodb://" + source_url + ':' + source_port + "\")<br>"
    connect_code+="target_client=MongoClient(\"mongodb://" + target_url + ':' + target_port + "\")<br><br>"
    connect_code+="source_db=source_client." + source_db + "<br>"
    connect_code+="source_col=source_db." + source_col + "<br><br>"
    connect_code+="target_db=source_client." + target_db + "<br>"
    connect_code+="target_col=source_db." + target_col + "<br><br>"
    connect_code+="source_cursor=source_col.find()<br>"
    connect_code+="target_cursor=target_col.find()<br>"
    return connect_code;

}

function operation_1() {
    var c="from py";
    return c
}
function operation_test() {
    document.getElementById('code').innerHTML=operation_1();
    document.getElementById('code').innerHTML=process_replace_words();
}

