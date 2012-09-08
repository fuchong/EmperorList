/**
 * Created with JetBrains WebStorm.
 * User: jiangli
 * Date: 12-9-7
 * Time: 上午10:15
 * To change this template use File | Settings | File Templates.
 */
var localdatabase = {
};
(function(localdatabase){
    var db;
    localdatabase.createDatabase = function(){
            db =  window.openDatabase('emperor_test', '1.0', 'emperor list', 2 * 1024 * 1024);
            db.transaction(function (emp) {
                emp.executeSql('CREATE TABLE IF NOT EXISTS emperor (_id,userName,miaohao,yihao,nianhao)');
                console.log("create successful");
            });
    };
    //添加数据
        localdatabase.insertEmperor = function(result){
            db.transaction(function (emps) {
             emps.executeSql('INSERT INTO emperor(userName,miaohao,yihao,nianhao) VALUES ("'+result.userName+'","'+result.miaohao+'","'+result.yihao+'","'+result.nianhao+'")');
            });

        };
    //查询数据
    localdatabase.findAllEmperor = function(){
        db.transaction(function (emps) {
            emps.executeSql('select * from emperor',[],function(tx,result){
                for(var i = 0;i<result.rows.length;i++){
                    var source = $("#emperor").html();
                    var template = Handlebars.compile(source);
                    var context = result.rows.item(i);
                    var html = template(context);
                    $('table').append(html);
                }
            });
        });

    }
}(localdatabase));