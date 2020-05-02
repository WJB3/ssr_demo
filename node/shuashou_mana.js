const express = require('express');
const app = express();
const mysql = require('mysql');
var path = require('path');
//解析表单的插件
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: false
}))


//创建数据库连接对象

var pool = mysql.createPool({
    host: '129.211.190.222', //数据库地址
    user: 'huaiges', //账号
    password: 'qq111111', //密码
    database: 'goods', //库名
    port: '3306',
    multipleStatements: true //允许执行多条语句
});

var query=function (sql,options,callback) {
    pool.getConnection(function (err,conn) {
        if(err){
            callback(err,null);
        }else{
            conn.query(sql,options,function (err,results) {
                callback(err,results);
            });


        }
        //conn.release();
        pool.releaseConnection(conn);
    })
}



app.use(bodyParser.json())

const get_ip = require('ipware')().get_ip;
app.get('',(req,res)=>{
    let ip_info = get_ip(req);
    let date = new Date();
    console.log (ip_info.clientIp+'  '+date)
    res.send('<h3>'+'HELLO！'+'<br/>'+ ip_info.clientIp+'<br/>'+date+'</h3>') })


//---------------------------------------------------
//获取任务信息
app.post('/api/getinformation', (req, res) => {
    const cardid = req.body.cardid
    if(cardid ==""){
        return res.json({
            err_code: 1,
            message: '传入任务密码为空'
        })
    }

    var sqlStr = ' select * from `tb_kamimana` where `card_id` = \''+cardid+'\''
    let ip_info = get_ip(req);
    console.log(sqlStr)
    console.log(ip_info)
    query(sqlStr,  (err, results) => {
        if (err || results==""  ) return res.json({
            err_code: 1,
            message: '任务密码输入错误或已使用'
        })
        res.json({
            err_code: 200,
            result: results[0],
        })

    })
});

//提交最任务信息
app.post('/api/upinformation', (req, res) => {
    const cardid = req.body.cardid
    const mailname = req.body.mailname
    const orderid = req.body.orderid
    const bankcard_id = req.body.bankcard_id
    const username = req.body.username
    const wangwangname = req.body.wangwangname
    const mobile = req.body.mobile
    const paymoney = req.body.paymoney

    const updatetime = new Date();

    var sqlStr = 'INSERT INTO `goods`.`tb_shuashouup` (`id`, `kami_id`, `mail_name`, `order_id`, `bank_id`, `username`, `wangwangname`,' +
        ' `mobile`, `paymoney`, `updatetime`) VALUES (NULL,' +
        ' \''+cardid+'\', \''+mailname+'\', \''+orderid+'\', \''+bankcard_id+'\', \''+username+'\', \''+wangwangname+'\', \''+mobile+'\',' +
        ' \''+paymoney+'\', \''+updatetime+'\')'
    console.log(sqlStr)

    if(!cardid || !mailname  || !orderid || !bankcard_id || !username || !wangwangname || !mobile || !paymoney){
        return res.json({
            err_code: 1,
            message: '传入参数不完整'
        })
    }


    let ip_info = get_ip(req);

    console.log(ip_info)
    query(sqlStr,  (err, results) => {
        if (err  ) return res.json({
            err_code: 1,
            message: '上传失败，请勿重复上传',
            //affextedRows: err
        })
        res.json({
            err_code: 200,
            message: '上传成功',
        })

    })
});








app.use(express.static(path.join(__dirname, 'info')));
app.listen(5588,'0.0.0.0', (req,res) => {
    
    console.log('正在监听端口5588!');
})
