var fs = require('fs');

var content = fs.readFileSync('./data.txt','utf8');

const writeToFile=(data)=>{
 try {
    var result=[];
    var content = fs.readFileSync('./data.txt','utf8');
    if(content!=""){
        result=JSON.parse(content);
    }else{
        result=[];
    }
   const primaryKey=getId();
    let obj={
        "Id":primaryKey,
        "todo":data,
        "isCompleted":false
    }
    result.push(obj);
    Content=JSON.stringify(result);
    fs.writeFileSync('./data.txt',Content);
    
 } catch (error) {
    console.log(error);
 }
}

const updateTofile=(data)=>{
    try {
        var result=[];
    var content = fs.readFileSync('./data.txt','utf8');
    if(content!=""){
        result=JSON.parse(content);
    }else{
        console.log("file is empty")
        return;
    }
    result.forEach(element => {
        if(element.Id==data.Id){
            element.todo=data.todo;
            element.isCompleted=data.isCompleted;
        }
    });

    content=JSON.stringify(result);
    fs.writeFileSync('./data.txt',content);
    } catch (error) {
        console.log(error);
    }
}

const deletedtofile=(id)=>{
    try {
        var result=[];
        var content = fs.readFileSync('./data.txt','utf8');
        if(content!=""){
            result=JSON.parse(content);
        }else{
            console.log("file is empty")
            return;
        }
        const newData=result.filter(ele=>{return ele.Id!=id})
        content=JSON.stringify(newData);
        fs.writeFileSync('./data.txt',content);
        
    } catch (error) {
        console.log(error);
    }
}

const getallfile=()=>{
    try {
        var result=[];
        var content = fs.readFileSync('./data.txt','utf8');
        if(content!=""){
            result=JSON.parse(content);
        }else{
           result=[];
        }
        console.log(result);
        
    } catch (error) {
        console.log(error);
    }
}

const getId=()=>{
try {
    var result=[];
    var content = fs.readFileSync('./primarykey.txt','utf8');
    if(content==""){
         let key=1;
         content=key.toString();
         fs.writeFileSync('./primarykey.txt',content);
        return key;
    }
    let primaryKey=parseInt(content);
    primaryKey+=1;
    content=primaryKey.toString();
    fs.writeFileSync('./primarykey.txt',content);
    return primaryKey;
    
} catch (error) {
    console.log(error);
}
}

const UpdateStatus=(Id)=>{
    try {
    var result=[];
    var content = fs.readFileSync('./data.txt','utf8');
    if(content!=""){
        result=JSON.parse(content);
    }else{
        console.log("file is empty")
        return;
    }
    result.forEach(element => {
        if(element.Id==Id){
            element.isCompleted=true;
        }
    });

    content=JSON.stringify(result);
    fs.writeFileSync('./data.txt',content);
    } catch (error) {
        console.log(error);
    }
}


