//★1 Expressのライブラリをロード
var express = require('express');
//★2 ExpressのApplicationオブジェクトを作成しておく
var app = express();

//★3 EJSのロード
var ejs = require('ejs');
//★4 テンプレートエンジンの設定
app.engine('ejs',ejs.renderFile);
app.use(express.static('views'));

//ishiiのエリア
var ari = require(__dirname + '/app/arisawa.js');

//★5 GETを登録する
//第１引数：アクセスしたパス、第二２引数：実行する関数
app.get('/', function(req, res){

 var arisawa = ari.arisawafcf();

 //★6 テンプレートファイルのレンダリング
 res.render('test.ejs', 
 {title : 'Express + EJS' , 
 content: '大分シンプルになった！',
 tameshi: arisawa[0]})
});

app.get('/login', function(req, res){

    var name = req.param("name");
    var pass = req.param("pass");
  
    //user= admin,pass=passwordならOK.
    if((name === "admin") && (pass === "password")) {
	res.render('success.ejs', 
		       { 
			   message: 'Login OK:', 
			   name: name,
			   pass: pass
		       });
    } else {
	res.render('accesserrow.ejs', 
		       { 
			   message: "Error: name or password wrong."
		       });
    }
});

  //指定のポート番号で待ち受け状態を開始
var server = app.listen(3000, function(){
 console.log('Server is running!');
})