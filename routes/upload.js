/**
 * Created with JetBrains WebStorm.
 * User: jiangli
 * Date: 12-9-3
 * Time: 下午9:56
 * To change this template use File | Settings | File Templates.
 */
var fs = require("fs");
//处理使用直接上传文件对象方法上传的数据：
var projectPath=__dirname.substring(0,__dirname.indexOf("/routes"));//取得项目的路径

exports.ss=function (req,res){
    console.log("zhixinglema");
    var fileName=req.param('fileName');//获取param中文件的信息
    var fileSize=req.param('fileSize');
    var target_path =projectPath+'/public/upload/' + fileName ;
    console.log(target_path);
    var wOption = {flags: 'w',encoding: null,mode: 0777};
var fileStream = fs.createWriteStream(target_path,wOption);
req.pipe(fileStream, { end: false });
req.on('end', function() {
    console.log("传输完毕！");
    var transfer;
    fs.stat(target_path, function (err, data) {
        if (err) throw err;
        transfer=String(data.size);
        console.log("tmp file's size :",data.size);
        console.log("the received size is :",fileSize);
        if(transfer==String(fileSize)){
            res.send({success:true});
        }else{
            res.send({error:"文件在传输的过程中有丢失,传输失败!"});
    }
});
});
};