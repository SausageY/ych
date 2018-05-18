var delay=0;
var root;
var current=0;
var interyal;
var time=-1;
var numArray=new Array();
var myOut;
function node(data,parent) {
    this.data=data;
    this.parent=parent;
    this.l_chilren=null;
    this.r_chilren=null;
    this.x=null;
    this.y=null;
    this.id=null;
    this.avl=0;
};

function insert(data) {
    if(data==undefined) {
        var data = $(".text-input").val();
        $(".text-input").val("");
    }
    // allInput.push(data);
    if(root==null)
    {
        root=new node(data,null);
        root.x=560;
        root.y=30;
        root.id=current;
        printCircle(current++,560,30,15,data,0,2000,"black");
    }
    else {
        var temp=root;
        var reslut=insertNode(data,temp,"black");
        updateAVL(data,reslut);
        clearInterval(interyal);
        forbiddenButton(delay/anSpeed);
        // delay=0;
    }
};

function del() {
    var data=$(".text-input").val();
    var reslut=findNode(data,root);
    if(reslut!=-1) {
        nodeDelete(reslut);
    }
    delay = 0;
};

function nodeDelete(node1) {
    var t=node1.parent;
    if(node1.l_chilren==null&&node1.r_chilren==null) {
        if(node1==root) {
            root=null;
        }else if(isLeft(node1)){
            node1.parent.l_chilren=null;
        }else {
            node1.parent.r_chilren=null;
        }
    }else if(node1.l_chilren==null){
        if(node1==root) {
            moveNode_A(root.r_chilren,root,delay);
            delay+=2;
            root=root.r_chilren;
            root.parent=null;
        }else if(isLeft(node1)){
            moveNode_A(node1.r_chilren,node1,delay);
            delay+=2;
            node1.parent.l_chilren=node1.r_chilren;
            node1.r_chilren.parent=node1.parent;
        }else {
            moveNode_A(node1.r_chilren,node1,delay);
            delay+=2;
            node1.parent.r_chilren=node1.r_chilren;
            node1.r_chilren.parent=node1.parent;
        }
    }else if(node1.r_chilren==null){
        if(node1==root) {
            moveNode_A(root.l_chilren,root,delay);
            delay+=2;
            root=root.l_chilren;
            root.parent=null;
        }else if(isLeft(node1)){
            moveNode_A(node1.l_chilren,node1,delay);
            delay+=2;
            node1.parent.l_chilren=node1.l_chilren;
            node1.l_chilren.parent=node1.parent;
        }else {
            moveNode_A(node1.l_chilren,node1,delay);
            delay+=2;
            node1.parent.r_chilren=node1.l_chilren;
            node1.l_chilren.parent=node1.parent;
        }
    }else {
        var curr=node1.r_chilren;
        var successor=curr;
        var sucParent=null;
        while(curr!=null){
            sucParent=successor;
            successor=curr;
            curr=curr.l_chilren;
        }
        if(successor.r_chilren==null){
            moveNode_A(successor,node1,delay);
            delay+=2;
        }else {
            moveNode_B(successor,node1,delay);
            delay+=2;
        }
        if(successor!=node1.r_chilren){
            sucParent.l_chilren=successor.r_chilren;
            if(successor.r_chilren!=null) {
                successor.r_chilren.parent = sucParent;
            }
            successor.r_chilren=node1.r_chilren;
            node1.r_chilren.parent=successor;
        }
        successor.l_chilren=node1.l_chilren;
        node1.l_chilren.parent=successor;
        if(node1==root){
            root=successor;
            successor.parent=null;
        }else if(isLeft(node1)){
            node1.parent.l_chilren=successor;
            successor.parent=node1.parent;
        }else {
            node1.parent.r_chilren=successor;
            successor.parent=node1.parent;
        }
        t=successor;
    }
    d3.select("#g"+node1.id).transition().delay(delay*1000/anSpeed).ease(d3.easeCircle)
        .duration(1000/anSpeed).remove();
    var avl=getHeight(t.l_chilren)-getHeight(t.r_chilren);
    if(avl>1){
        var avl2=getHeight(t.l_chilren.l_chilren)-getHeight(t.l_chilren.r_chilren);
        if(avl2>=0){
            var node2=singleRightRotation(t);
            delay+=5;
            setTimeout(function () {
                rotationCash(node2,0);
            },delay*1000/anSpeed);
        }else {
            var node2=LeftRightRotation(t);
            delay+=5;
            setTimeout(function () {
                rotationCash(node2,0);
            },delay*1000/anSpeed);
        }
    }
    if(avl<-1){
        var avl2=getHeight(t.r_chilren.l_chilren)-getHeight(t.r_chilren.r_chilren);
        if(avl2>=0){
            var node2=singleLeftRotation(t,delay);
            delay+=5;
            setTimeout(function () {
                rotationCash(node2,0);
            },delay*1000/anSpeed);
        }else {
            var node2=RightLeftRotation(t,delay);
            delay+=5;
            setTimeout(function () {
                rotationCash(node2,0);
            },delay*1000/anSpeed);
        }
    }

    return true;
}

function find() {
    // var data=$(".text-input").val();
    // var temp=root;
    findNode(data,temp);
    // delay=0;
}

function updateAVL(input,node1) {
    while(node1.parent!=null) {
       if(isLeft(node1)) {
           node1.parent.avl=getHeight(node1.parent.l_chilren)-getHeight(node1.parent.r_chilren);
           if(node1.parent.avl==2) {
               if(input<node1.data)
               {
                   clearTimeout(myOut);
                   var node2=singleRightRotation(node1.parent);
                   delay+=5;
                   setTimeout(function () {
                       rotationCash(node2,0);
                   },delay*1000/anSpeed);
                   break;
               }else {
                   clearTimeout(myOut);
                   var node2=LeftRightRotation(node1.parent);
                   delay+=5;
                   setTimeout(function () {
                       rotationCash(node2,0);
                   },delay*1000/anSpeed);
                   break;
               }
           }
       }else {
           node1.parent.avl=getHeight(node1.parent.l_chilren)-getHeight(node1.parent.r_chilren);
           if(node1.parent.avl==-2) {
               if(input>=node1.data)
               {
                   clearTimeout(myOut);
                   var node2=singleLeftRotation(node1.parent);
                   delay+=5;
                   setTimeout(function () {
                       rotationCash(node2,0);
                   },delay*1000/anSpeed);
                   break;
               }else {
                   clearTimeout(myOut);
                   var node2=RightLeftRotation(node1.parent);
                   delay+=5;
                   setTimeout(function () {
                       rotationCash(node2,0);
                   },delay*1000/anSpeed);
                   break;
               }
           }
       }
        node1=node1.parent;
    }
}

function singleRightRotation(node1) {
    var node2=node1.l_chilren;
    moveNode_C(node2,node1,delay++);
    if(node1==root)
    {
        var line=printLine(node1.id,node1.x+12,node1.y+9,node1.x+12,node1.y+9,"#000",1,delay*1000,2000);
        $("#g"+node1.id).append($("#line"+node1.id));
        root=node2;
    }else {
        if(isLeft(node1)) {
            node1.parent.l_chilren=node2;
        }else {
            node1.parent.r_chilren = node2;
        }
    }
    if(node1.r_chilren==null)
    {
        var move_x1 = parseInt($("#circle" + node1.id).attr("cx")) + 12 - $("#line" + node1.id).attr("x1");
        var move_y1 = parseInt($("#circle" + node1.id).attr("cy")) + 9 - $("#line" + node1.id).attr("y1");
        var move_x2 = parseInt($("#circle" + node1.id).attr("cx")) + 25 - $("#line" + node1.id).attr("x2");
        var move_y2 = parseInt($("#circle" + node1.id).attr("cy")) + 18 - $("#line" + node1.id).attr("y2");
        moveLine("line" + node1.id, move_x1, move_y1, move_x2, move_y2, delay * 1000, 2000);
        moveCircle("circle"+node1.id,40,30,delay*1000,2000);
        moveRectOrText("text"+node1.id,40,30,delay*1000,2000);
        node1.x+=40;
        node1.y+=30;
    }else {
        moveNode_D(node1,node1.r_chilren,delay);
    }
    if(node2.r_chilren!=null) {
        var temp = new node("-1", null);
        temp.id="temp";
        temp.x = node1.x - 40;
        temp.y = node1.y + 30;
        d3.select("#canvas").append("line").
        attr("x1",node1.x-12).attr("y1",node1.y+9).attr("x2",node1.x-25).attr("y2",node1.y+18).attr("id","linetemp").attr("opacity",0);
        moveNode_A(node2.r_chilren,temp,delay);
        setTimeout(function () {
            d3.select("#linetemp").remove();
        },(delay+1)*1000/anSpeed);
        node2.r_chilren.parent = node1;
    }
    node1.l_chilren=node2.r_chilren;
    node2.parent=node1.parent;
    node1.parent=node2;
    node2.r_chilren=node1;
    node1.avl=getHeight(node1.l_chilren)-getHeight(node1.r_chilren);
    node2.avl=getHeight(node2.l_chilren)-getHeight(node2.r_chilren);
    return node2;
}

function singleLeftRotation(node1) {
    var node2=node1.r_chilren;
    moveNode_D(node2,node1,delay++);
    if(node1==root)
    {
        var line=printLine(node1.id,node1.x-12,node1.y+9,node1.x-25,node1.y+18,"#000",1,delay*1000,2000);
        $("#g"+node1.id).append($("#line"+node1.id));
        root=node2;
    }else {
        if(isLeft(node1)) {
            node1.parent.l_chilren=node2;
        }else {
            node1.parent.r_chilren = node2;
        }
    }
    if(node1.l_chilren==null)
    {
        var move_x1 = parseInt($("#circle" + node1.id).attr("cx")) - 12 - $("#line" + node1.id).attr("x1");
        var move_y1 = parseInt($("#circle" + node1.id).attr("cy")) + 9 - $("#line" + node1.id).attr("y1");
        var move_x2 = parseInt($("#circle" + node1.id).attr("cx")) - 25 - $("#line" + node1.id).attr("x2");
        var move_y2 = parseInt($("#circle" + node1.id).attr("cy")) + 18 - $("#line" + node1.id).attr("y2");
        moveLine("line" + node1.id, move_x1, move_y1, move_x2, move_y2, delay * 1000, 2000);
        moveCircle("circle"+node1.id,-40,30,delay*1000,2000);
        moveRectOrText("text"+node1.id,-40,30,delay*1000,2000);
        node1.x-=40;
        node1.y+=30;
    }else {
        moveNode_C(node1,node1.l_chilren,delay);
    }
    if(node2.l_chilren!=null) {
        var temp = new node("-1", null);
        temp.id="temp";
        temp.x = node1.x + 40;
        temp.y = node1.y + 30;
        d3.select("#canvas").append("line").
        attr("x1",node1.x+12).attr("y1",node1.y+9).attr("x2",node1.x+25).attr("y2",node1.y+18).attr("id","linetemp").attr("opacity",0);
        moveNode_A(node2.l_chilren, temp, delay);
        setTimeout(function () {
            d3.select("#linetemp").remove();
        },(delay+1)*1000/anSpeed);
        node2.l_chilren.parent = node1;
    }
    node1.r_chilren=node2.l_chilren;
    node2.parent=node1.parent;
    node1.parent=node2;
    node2.l_chilren=node1;
    node1.avl=getHeight(node1.l_chilren)-getHeight(node1.r_chilren);
    node2.avl=getHeight(node2.l_chilren)-getHeight(node2.r_chilren);
    return node2;
}

function LeftRightRotation(node1) {
    node1.l_chilren=singleLeftRotation(node1.l_chilren);
    delay+=5;
    return  singleRightRotation(node1);
}

function RightLeftRotation(node1) {
    node1.r_chilren=singleRightRotation(node1.r_chilren);
    delay+=5;
    return singleLeftRotation(node1);
}

function getHeight(node) {
    var LD;
    var RD;
    if(node==null)
    {
        return 0;
    }else {
        LD=getHeight(node.l_chilren);
        RD=getHeight(node.r_chilren);
        return (LD>RD?LD:RD)+1;
    }
}

function rotationCash(node1,delay) {
    if(node1.l_chilren==null&&node1.r_chilren==null){
        return isCrash(node1,delay);
    }
    if(node1.l_chilren!=null){
        delay=rotationCash(node1.l_chilren,delay);

    }
    if(node1.r_chilren!=null){
        delay=rotationCash(node1.r_chilren,delay);
    }
    return delay;
}

function forbiddenButton(t) {
    if(time<0) {
        time = t;
        $("#inputButton").attr("onclick","").text(parseInt(time));
        $("#popButton").attr("onclick","").text(parseInt(time));
        $("#cleanButton").attr("onclick","").text(parseInt(time));
    }
    interyal= setInterval(function () {
        if(time<0)
        {
            $("#inputButton").attr("onclick","insert()").text("Insert");
            $("#popButton").attr("onclick","del()").text("Delete");
            $("#cleanButton").attr("onclick","find()").text("Find");
        }else {
            $("#inputButton").text(parseInt(time));
            $("#popButton").text(parseInt(time));
            $("#cleanButton").text(parseInt(time));
            time-=0.5;
        }
    },500);
};


function circleProperty(obj) {
    var data=$(obj).text();
    var node1=smallFind(data,root);
    $("#code1").text("avl="+node1.avl);
    if(node1.l_chilren!=null) {
        $("#code2").text("l_chilren=" + node1.l_chilren.data);
    }else {
        $("#code2").text("l_chilren=null");
    }
    if(node1.r_chilren!=null){
    $("#code3").text("r_chilren="+node1.r_chilren.data);
    }else {
        $("#code3").text("r_chilren=null");
    }
    if(node1.parent!=null) {
        $("#code4").text("parent="+node1.parent.data);
    }else {
        $("#code4").text("parent=null");
    }
    $("#code5").text("x="+node1.x);
    $("#code6").text("y="+node1.y);
    $("#code7").text("circle.x="+$("#circle"+node1.id).attr("cx"));
}

function smallFind(data,node1) {
    if(data==node1.data)
    {
        return node1;
    }
    else {
        if(data<node1.data&&node1.l_chilren!=null)
        {
            return smallFind(data,node1.l_chilren);
        }else if(data>node1.data&&node1.r_chilren!=null){
            return smallFind(data,node1.r_chilren);
        }else {
            return -1;
        }
    }
}


function autoTest() {
    d3.selectAll("g").remove();
    numArray.splice(0,numArray.length);
    // for(var i=0;i<20;i++) {
    //     var t=Math.floor(Math.random() * 1000)
    //     numArray.push(t);
    // }
    var c=0;
    var str="";
    numArray=[544,702,10,163,667,943,381,86,233,72,934,569,735,652,363,873,90,871,188,781];
    for(var i=0;i<numArray.length;i++){
        str+=numArray[i]+" ";
    }
    console.log("test:"+str);
    autoInsert(c);
}

function autoInsert(c) {
    insert(numArray[c]);
    delay+=10;
    setTimeout(function () {
        var flag=checkOut(root);
        if(!flag){
            var str="";
            for(var i=0;i<=c;i++){
                str+=numArray[i]+" ";
            }
            console.log("error:"+str);
        }else {
            c++;
            if(c<numArray.length){
                delay=0;
                autoInsert(c);
            }
        }
    },delay*1000/anSpeed);
}

function checkOut(node) {
    var id=node.id;
    if($("#circle"+id).attr("cx")!=node.x){
        console.log(node.data+" id="+node.id+" cx="+$("#circle"+id).attr("cx")+
            " nx="+node.x);
        return false;
    }
    if($("#circle"+id).attr("cy")!=node.y){
        console.log(node.data+" id="+node.id+" cy="+$("#circle"+id).attr("cy")+
            " ny="+node.y);
        return false;
    }
    if(node.l_chilren!=null){ return checkOut(node.l_chilren);}
    if(node.r_chilren!=null){ return checkOut(node.r_chilren);}
    return true;
}