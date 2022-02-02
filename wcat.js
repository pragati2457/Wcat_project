#!/usr/bin/env node
let fs=require("fs");
let inputArr=process.argv.slice(2);

//options
let optionsArr = [];
let filesArr = [];
// //identify -> options
for(let i=0;i<inputArr.length;i++){
    if(inputArr[i].charAt(0)=="-"){
        optionsArr.push(inputArr[i])
    }
    else{
        filesArr.push(inputArr[i]);
    }
}

//option check
let bothPresent=optionsArr.includes("-n") && optionsArr.includes("-b")
if(bothPresent){
    console.log("either enter -n or -b option")
    return;
}

//existence
for(let i=0;i<filesArr.length;i++){
    let isPresent=fs.existsSync(filesArr[i]);
    if(isPresent==false){
        console.log(` file ${filesArr[i]} is not present`)
        return;
    }
}


//read
let content="";
for(let i=0;i<filesArr.length;i++){
    let buffer=fs.readFileSync(filesArr[i]);
    content+=buffer+"\r\n";
}

let contentArr=content.split('\r\n')

//-s
let isSpresent=optionsArr.includes("-s")
if(isSpresent){
    for(let i=1;i<contentArr.length;i++){
        if(contentArr[i]=="" && contentArr[i-1]==""){
            contentArr[i]=null;
        }
        else if(contentArr[i]=="" && contentArr[i-1]==null){
            contentArr[i]=null;
        }
    }
    let tempArr=[];
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]!=null){
            tempArr.push(contentArr[i]);
        }
    }
    contentArr=tempArr;

}


//-n
let isNPresent=optionsArr.includes("-n");
if(isNPresent){
    for(let i=0;i<contentArr.length;i++){
        contentArr[i]=(i+1)+"  "+contentArr[i];  
      
    }
}


//-b
let isBPresent=optionsArr.includes("-b");
if(isBPresent){
    let count =1;
    for(let i=0;i<contentArr.length;i++){
        if(contentArr[i]!="")
        contentArr[i]=`${count}  ${contentArr[i]}`;
        count++;
    }
}
console.log(contentArr.join('\n'));