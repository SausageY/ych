delay=0;
var root=null;
var current=0;
var interyal;
var numArray=new Array();
function redBNode(id,data,parent) {
    this.data=data;
    this.parent=parent;
    this.l_chilren=null;
    this.r_chilren=null;
    this.x=null;
    this.y=null;
    this.id=id;
    this.color="red";
    this.avl=0;
    this.setColor=function (color,delay) {
        this.color=color;
        var b=this.id;
        setTimeout(function () {
            d3.select("#circle"+b)
            //     .transition()
            //     .ease(d3.easeCircle).on("start",function () {
            //     console.log(b+" "+new Date().getTime()+" "+color);
            // }).on("interrupt",function () {
            //     console.log(b+" "+new Date().getTime()+" "+color+" interrupt");
            // }).duration(100)
                .attr("stroke",color);
        },delay/anSpeed)

    }
}

function insert(data) {
    if(data==undefined) {
        delay=0;
        var data = $(".text-input").val();
    }
    if(root==null)
    {
        root=new redBNode(current,data,null);
        root.x=560;
        root.y=30;
        printCircle(current++,560,30,15,data,0,2000,"black");
        root.color="black";
    }
    else {
        var temp=root;
        var reslut=insertRBNode(data,temp,"red");
        fixNode(reslut);
        // clearInterval(interyal);
        // forbiddenButton(delay/anSpeed);
        // delay=0;
    }
};

function fixNode(node) {
    var parent=node.parent;
    while(parent!=null&&parent.color=="red"){
        var gparent=parent.parent;
        if(isLeft(parent)){
            //Case1:叔叔节点是红色
            var uncle=gparent.r_chilren;
            if(uncle!=null&&uncle.color=="red"){
                uncle.setColor("black",delay*1000);
                parent.setColor("black",delay*1000);
                gparent.setColor("red",delay*1000);
                delay+=3;
                node=gparent;
                parent=node.parent;
                continue;
            }
            //Case2:叔叔是黑色，且当前节点是右孩子
            if(parent.r_chilren==node){
                var temp=null;
                var node2=singleLeftRotation(parent,delay);
                delay+=3;
                temp=parent;
                parent=node;
                node=temp;
                parent=node.parent;
            }
                //Case3:叔叔是黑色，且当前节点是左孩子
                parent.setColor("black", delay * 1000);
                gparent.setColor("red", delay * 1000);
                delay+=3;
                var node2=singleRightRotation(gparent,delay);
                delay+=3;
                // delay=isCrash(node2.r_chilren,delay);
                delay+=rotationCash(node2,delay);
                delay+=2;
        }else { //父节点是右孩子
           //Case1:叔叔节点是红色
            var uncle=gparent.l_chilren;
            if(uncle!=null&&uncle.color=="red"){
                uncle.setColor("black",delay*1000);
                parent.setColor("black",delay*1000);
                gparent.setColor("red",delay*1000);
                delay+=3;
                node=gparent;
                parent=node.parent;
                continue;
            }
            //Case2:叔叔是黑色，且当前节点是左孩子
            if(parent.l_chilren==node){
                var temp=null;
                var node2=singleRightRotation(parent,delay);
                delay+=3;
                temp=parent;
                parent=node;
                node=temp;
                parent=node.parent;
            }//Case3:叔叔是黑色，且当前节点是右孩子
              parent.setColor("black",delay*1000);
              gparent.setColor("red",delay*1000);
              delay+=3;
              var node2=singleLeftRotation(gparent,delay);
              delay+=3;
              delay+=rotationCash(node2,delay);
              delay+=2;
        }
    }
    root.setColor("black",delay*1000);
    delay+=3;
}

function insertRBNode(data,node1,color){
    if(data<node1.data)
    {
        if(node1.l_chilren==null)
        {
            node1.l_chilren=new redBNode(current,data,node1);
            node1.l_chilren.x=parseInt(node1.x)-40;
            node1.l_chilren.y=parseInt(node1.y)+30;
            node1.l_chilren.color=color;
            changeGraphStroke("circle"+node1.id,"#d00355",(delay++)*1000,3,1000);
            var line=printLine(current,node1.x-12,node1.y+9,node1.x-25,node1.y+18,"#000",1,delay*1000,2000);
            var g=printCircle(current,node1.l_chilren.x,node1.l_chilren.y,15,data,(delay++)*1000,2000,color);
            $("#g"+current).append($("#line"+current));
            current++;
            delay++;
            setTimeout(function (){
                isCrash(node1.l_chilren,0);
            },delay*1000/anSpeed);
            delay+=2;
            return node1.l_chilren;
        }else {
            changeGraphStroke("circle"+node1.id,"#d00355",(delay++)*1000,3,1000);
            return insertRBNode(data,node1.l_chilren,color);
        }
    }else {
        if(node1.r_chilren==null)
        {
            node1.r_chilren=new redBNode(current,data,node1);
            node1.r_chilren.x=parseInt(node1.x)+40;
            node1.r_chilren.y=parseInt(node1.y)+30;
            node1.r_chilren.color=color;
            changeGraphStroke("circle"+node1.id,"#d00355",(delay++)*1000,3,1000);
            var line=printLine(current,node1.x+12,node1.y+9,node1.x+25,node1.y+18,"#000",1,delay*1000,2000);
            var g=printCircle(current,node1.r_chilren.x,node1.r_chilren.y,15,data,(delay++)*1000,2000,color);
            $("#g"+current).append($("#line"+current));
            current++;
            delay++;
            setTimeout(function (){
                isCrash(node1.r_chilren,0);
            },delay*1000/anSpeed);
            delay+=2;
            return node1.r_chilren;
        }else {
            changeGraphStroke("circle"+node1.id,"#d00355",(delay++)*1000,3,1000);
            return insertRBNode(data,node1.r_chilren,color);
        }
    }
};

function del() {
    var data=$(".text-input").val();
    var reslut=findNode(data,root);
    if(reslut!=-1) {
        deleteRBnode(reslut);
    }
    delay = 0;
}
function deleteRBnode(node1) {
    var color=node1.color;
    var parent=null,child=null;
    if(node1.l_chilren==null&&node1.r_chilren==null) {
        if(node1==root) {
            root=null;
        }else if(isLeft(node1)){
            parent=node1.parent;
            node1.parent.l_chilren=null;
        }else {
            parent=node1.parent;
            node1.parent.r_chilren=null;
        }
    }else if(node1.l_chilren==null){
        child=node1.r_chilren;
        parent=node1.parent;
        if(node1==root) {
            moveNode_A(root.r_chilren,root,delay);
            root=root.r_chilren;
            root.parent=null;
        }else if(isLeft(node1)){
            moveNode_A(node1.r_chilren,node1,delay);
            node1.parent.l_chilren=node1.r_chilren;
            node1.r_chilren.parent=node1.parent;
        }else {
            moveNode_A(node1.r_chilren,node1,delay);
            node1.parent.r_chilren=node1.r_chilren;
            node1.r_chilren.parent=node1.parent;
        }
    }else if(node1.r_chilren==null){
        child=node1.r_chilren;
        parent=node1.parent;
        if(node1==root) {
            moveNode_A(root.l_chilren,root,delay);
            root=root.l_chilren;
            root.parent=null;
        }else if(isLeft(node1)){
            moveNode_A(node1.l_chilren,node1,delay);
            node1.parent.l_chilren=node1.l_chilren;
            node1.l_chilren.parent=node1.parent;
        }else {
            moveNode_A(node1.l_chilren,node1,delay);
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
        child=successor.r_chilren;
        color=successor.color;
        parent=successor.parent;
        successor.setColor(node1.color,delay*1000);
        delay+=2;
        if(successor.r_chilren==null){
            moveNode_A(successor,node1,delay);
        }else {
            moveNode_B(successor,node1,delay);
        }
        if(successor!=node1.r_chilren){
            sucParent.l_chilren=successor.r_chilren;
            if(successor.r_chilren!=null) {
                successor.r_chilren.parent = sucParent;
            }
            successor.r_chilren=node1.r_chilren;
            node1.r_chilren.parent=successor;
        }else{
            parent=successor;
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
    }
    if(color=="black"){
        removeFixUp(child,parent);
    }
    d3.select("#g"+node1.id).transition().delay(delay*1000/anSpeed).ease(d3.easeCircle)
        .duration(2000/anSpeed).remove();
    return true;
}

function removeFixUp(node,parent) {
    var other=null;
    while((node==null||node.color=="black")&&(node!=root)){
        if(parent.l_chilren==node){
            other=parent.r_chilren;
            if(other.color=="red"){
                //Case1:x的兄弟w是红的
                other.setColor("black",delay*1000);
                parent.setColor("red",delay*1000);
                singleLeftRotation(parent,delay);
                delay+=3;
                other=parent.r_chilren;
            }
            if((other.l_chilren==null||other.l_chilren.color=="black")
                &&(other.r_chilren==null||other.r_chilren.color=="black")){
                //Case2:x的兄弟w是黑色，且w的孩子都是黑色
                other.setColor("red",delay*1000);
                delay+=3;
                node=parent;
                parent=node.parent;
            }else {
                if(other.r_chilren==null||other.r_chilren.color=="black"){
                    //Case3:x的兄弟w是黑色的，w的左孩子是红色，右孩子是黑色
                    other.l_chilren.setColor("black",delay*1000);
                    other.setColor("red",delay*1000);
                    delay+=3;
                    singleRightRotation(other,delay);
                    delay+=3;
                    other=parent.r_chilren;
                }
                //Case4:x的兄弟w是黑色的，并且w的右孩子是红色的，左孩子任意颜色
                other.setColor(parent.color,delay*1000);
                parent.setColor("black",delay*1000);
                other.r_chilren.setColor("black",delay*1000);
                delay+=3;
                singleLeftRotation(parent,delay);
                delay+=3;
                node=root;
                break;
            }
        }else{
            other=parent.l_chilren;
            if(other.color=="red"){
                //Case1:x的兄弟w是红色
                other.setColor("black",delay*1000);
                parent.setColor("red",delay*1000);
                delay+=3;
                singleRightRotation(parent,delay);
                delay+=3;
                other=parent.l_chilren;
            }
            if((other.l_chilren==null||other.l_chilren.color=="black")
                &&(other.r_chilren==null||other.r_chilren.color=="black")){
                //Case2:x的兄弟w是黑色，且w的孩子都是黑色
                other.setColor("red",delay*1000);
                delay+=3;
                node=parent;
                parent=node.parent;
            }else {
                if(other.r_chilren==null||other.r_chilren.color=="black") {
                    //Case3:x的兄弟w是黑色的，w的左孩子是红色，右孩子是黑色
                    other.r_chilren.setColor("black",delay*1000);
                    other.setColor("red",delay*1000);
                    delay+=3;
                    singleLeftRotation(other,delay);
                    delay+=3;
                    other=parent.l_chilren;
                }
                //Case4:x的兄弟w是黑色的，并且w的右孩子是红色的，左孩子任意颜色
                other.setColor(parent.color,delay*1000);
                parent.setColor("black",delay*1000);
                other.l_chilren.setColor("black",delay*1000);
                delay+=3;
                singleLeftRotation(parent,delay);
                delay+=3;
                node=root;
                break;
            }

        }
    }
    if(node!=null){
        node.setColor("black",delay*1000);
        delay+=3;
    }
}

function singleRightRotation(node1,delay) {
    var node2=node1.l_chilren;
    moveNode_C(node2,node1,delay);
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
        var temp = new redBNode("temp", "-1",null);
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
    return node2;
}

function singleLeftRotation(node1,delay) {
    var node2=node1.r_chilren;
    moveNode_D(node2,node1,delay);
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
        var temp = new redBNode("temp", "-1",null);
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
    return node2;
}

function circleProperty(obj) {
    var data=$(obj).text();
    var node1=smallFind(data,root);
    $("#code1").text("color="+node1.color);
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
    numArray.splice(0,numArray.length);
    // for(var i=0;i<20;i++) {
    //     var t=Math.floor(Math.random() * 1000)
    //     numArray.push(t);
    // }
    var c=0;
    var str="";
    numArray=[359,604,941,796,795,508,951];
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
            console.log("error"+str);
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
       var cs=$("#circle"+id).attr("stroke");
        if(cs=="rgb(0, 0, 0)"){ cs="black";}
        if(cs=="rgb(255, 0, 0)"){cs="red";}
        if(cs!=node.color){
            console.log(node.data+" id="+node.id+" stroke="+$("#circle"+id).attr("stroke")+
                " nc="+node.color);
            return false;
        }
        if(node.l_chilren!=null){ return checkOut(node.l_chilren);}
        if(node.r_chilren!=null){ return checkOut(node.r_chilren);}
        return true;
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
