var nodeMaxSize=2;
var nodeMinSize=1;
var root=null;
var current=0;
var delay=0;
var numArray=new Array();
function bTreeNode(id,parent,data) {
  this.values=[];
  this.child=[];
  this.parent=parent;
  this.id=id;
  this.x=null;
  this.y=null;
  if(data!=null) {
      this.values.push(data);
  }
    this.addChild=function (node) {
        this.child.push(node);
        node.parent=this;
        var compare2 = function (x, y) {
            if (x.values[0] < y.values[0]) {
                return -1;
            } else if (x.values[0] > y.values[0]) {
                return 1;
            } else {
                return 0;
            }
        };
        this.child.sort(compare2);
    };
    this.addValue=function (value) {
        this.values.push(value);
        var compare = function (x, y) {
            if (x < y) {
                return -1;
            } else if (x > y) {
                return 1;
            } else {
                return 0;
            }
        };
        this.values.sort(compare);
    }
    this.removeChild=function (node) {
        var index=-1;
        if((index=this.child.indexOf(node))!=-1){
            this.child.splice(index,1);
        }
    }
    this.removeValue=function (value) {
        var index=-1;
        if((index=this.values.indexOf(value))!=-1){
            this.values.splice(index,1);
        }
    }
    this.getChildIndex=function (node) {
        for(var i=0;i<this.child.length;i++){
            if(this.child[i]==node){
                return i;
            }
        }
        return -1;
    }
    this.getValueIndex=function (value) {
        for(var i=0;i<this.values.length;i++){
            if(this.values[i]==value)
                return i;
        }
        return -1;
    }
};

function insert(data) {
    if(data==undefined) {
        delay=0;
        var data = $(".text-input").val();
    }
    if(root==null) {
        printNode(current,560,30,35,30,data,nodeMaxSize,0);
        root=new bTreeNode(current++,null,data);
        root.x=560;
        root.y=30;
    }else {
        var node=root;
        changeGraphStroke("rect"+node.id,"#d00355",delay++*1000,2,2000);
        while(node!=null) {
            if(node.child.length==0){
                node.addValue(data);
                addValue(node.id,node.values,delay++);
                if(node.values.length<=nodeMaxSize){
                    var a=new Array();
                    avoidOverlap(node,a,delay++*1000);
                    break;
                }else {
                    splitNode(node);
                    break;
                }
            }else {
                var lesser=node.values[0];
                if(data<=lesser){
                    node=node.child[0];
                    changeGraphStroke("rect"+node.id,"#d00355",delay++*1000,2,2000);
                    continue;
                }
                var greater=node.values[node.values.length-1];
                if(data>greater){
                    node=node.child[node.child.length-1];
                    changeGraphStroke("rect"+node.id,"#d00355",delay++*1000,2,2000);
                    continue;
                }
                for(var i=0;i<node.values.length-1;i++) {
                    var pre=node.values[i];
                    var next=node.values[i+1];
                    if(data>pre&&data<=next){
                        node=node.child[i+1];
                        changeGraphStroke("rect"+node.id,"#d00355",delay++*1000,2,2000);
                        break;
                    }
                }
            }
        }
    }
}

function del() {
    delay=0;
    var data=$(".text-input").val();
    var node=findNode(data);
    if(node==null){
        alert("找不到节点"+data+"!");
    }else {
        delay++;
        var index=node.values.indexOf(data);
        node.removeValue(data);
        removeValue(node.id,index,delay++*1000);
        if(node.child.length!=0){
            var left=node.child[index];
            var greatest=getGreatestNode(left);
            var replaceValue=greatest.values[greatest.values.length-1];
            moveValue(greatest.id,greatest.values.length-1,node.id,index,delay++*1000,2000);
            delay+=2;
            greatest.removeValue(replaceValue);
            node.addValue(replaceValue);
            if(greatest.values.length<nodeMinSize){
                combined(greatest);
            }else {
                changeRectLength(greatest,-35,delay*1000);
                addValue2(greatest.id,greatest.values,delay*1000);
                sortLine(greatest,delay*1000);
            }
        }else {
            if(node.parent!=null&&node.values.length<nodeMinSize){
                    combined(node);
            }else if(node.parent==null&&node.values.length==0){
                d3.select("#g"+node.id).transition().delay(delay*1000).remove();
                root=null;
            }else {
                changeRectLength(node,-35,delay*1000);
                addValue2(node.id,node.values,delay*1000);
                sortLine(node,delay*1000);
            }
        }
    }
    delay=0;
    return true;
}

function getGreatestNode(node) {
    while(node.child.length>0){
        node=node.child[node.child.length-1];
        changeGraphStroke("rect"+node.id,"#d00355",delay++*1000,2,2000);
    }
    return node;
}

function find() {
    moveRectCX2(root,10,20,0);
    var data=$(".text-input").val();
    findNode(data);
    delay=0;
}

function findNode(data) {
    var node=root;
    changeGraphStroke("rect"+node.id,"#d00355",delay++*1000,2,1000);
    while(node!=null) {
        if(node.values.indexOf(data)!=-1){
            return node;
        }
        if(node.child.length==0){
            if(node.values.indexOf(data)!=-1){
                return node;
            }
            return null;
        }else {
            var lesser=node.values[0];
            if(data<lesser){
                node=node.child[0];
                changeGraphStroke("rect"+node.id,"#d00355",delay++*1000,2,1000);
                continue;
            }
            var greater=node.values[node.values.length-1];
            if(data>greater){
                node=node.child[node.child.length-1];
                changeGraphStroke("rect"+node.id,"#d00355",delay++*1000,2,1000);
                continue;
            }
            for(var i=0;i<node.values.length-1;i++) {
                var pre=node.values[i];
                var next=node.values[i+1];
                if(data==pre){
                    return node;
                }
                if(data>pre&&data<next){
                    node=node.child[i+1];
                    changeGraphStroke("rect"+node.id,"#d00355",delay++*1000,2,1000);
                    break;
                }
            }
        }
    }
    return null;
}

function splitNode(node) {
    var splitIndex=parseInt(node.values.length/2);
    var value=node.values[splitIndex];
    //分裂的左节点
    var left=new bTreeNode(current,null,null);
    for(var i=0;i<splitIndex;i++){
        left.values.push(node.values[i]);
    }
    printNode(current++,node.x,node.y,splitIndex*35,30,left.values,nodeMaxSize,delay);
    left.x=node.x;
    left.y=node.y;
    if(node.child.length>0){
        for(var i=0;i<splitIndex+1;i++){
            node.child[i].parent=left;
        }
        var temp=node.child.slice(0,splitIndex+1);
        left.child=temp;
    }
    //分裂的右节点
    var right=new bTreeNode(current,null,null);
    for(var i=splitIndex+1;i<node.values.length;i++){
        right.values.push(node.values[i]);
    }
    printNode(current++,node.x+(splitIndex+1)*35,node.y,right.values.length*35,30,right.values,nodeMaxSize,delay);
    //画右分裂点
    right.x=node.x+(splitIndex+1)*35;
    right.y=node.y;
    if(node.child.length>0){
        for(var i=splitIndex+1;i<node.child.length;i++){
            node.child[i].parent=right;
        }
        var temp=node.child.slice(splitIndex+1,node.child.length);
        right.child=temp;
        // for(var i=splitIndex+1;i<node.child.length;i++){
        //     movebTreeNodes(node.child[i],right.x+i*35,right.y+30,delay,2);
        // }
    }
    delay+=3;
    //父节点
    if(node.parent!=null){
        var parent=node.parent;
        parent.addValue(value);
        parent.removeChild(node);
        parent.addChild(left);
        moveValue(node.id,splitIndex,parent.id,parent.getValueIndex(value),delay++*1000,1000);
        addValue(parent.id,parent.values,delay++*1000);
        setTimeout(function () {
            d3.select("#g"+node.id).remove();
        },delay*1000/anSpeed);
        addNodeLine(left.id,parent.getChildIndex(left)*35+parent.x,parent.y+30,delay++*1000);
        parent.addChild(right);
        addNodeLine(right.id,parent.getChildIndex(right)*35+parent.x,parent.y+30,delay++*1000);
        sortLine(parent,delay++*1000);
        if(parent.values.length>nodeMaxSize){
            splitNode(parent);
        }else {
            var a=new Array();
            delay++;
            avoidOverlap(parent,a,delay*1000);
            while(parent.child.length!=0){
                parent=parent.child[0];
                delay++;
                a=new Array();
                avoidOverlap(parent,a,delay*1000);
            }
        }
    }else {
        d3.select("#g"+node.id).transition().delay(delay*1000/anSpeed).remove();
        printNode(current,560,30,35,30,value,nodeMaxSize,delay);
        var newRoot=new bTreeNode(current++,null,value);
        root=newRoot;
        root.x=560;
        root.y=30;
        newRoot.addChild(left);
        newRoot.addChild(right);
        movebTreeNodes(left,-35,60,delay,2);
        movebTreeNodes(right,20,60,delay++,2);
        addNodeLine(left.id,560,60,delay*1000);
        addNodeLine(right.id,595,60,delay++*1000);
        var a=new Array();
        delay++;
        avoidOverlap(newRoot,a,delay*1000);
        while(newRoot.child.length!=0){
            newRoot=newRoot.child[0];
            delay+=2;
            a=new Array();
            avoidOverlap(newRoot,a,delay*1000);
        }
    }
}

function combined(node) {
 var parent=node.parent;
 var index=parent.child.indexOf(node);
 var leftnodeIndex=index-1;
 var rightnodeIndex=index+1;
 var rightnode=null;
 var rightnodeSize=0;
 if(rightnodeIndex<parent.child.length){
     rightnode=parent.child[rightnodeIndex];
     rightnodeSize=rightnode.values.length;
 }
    //右邻居存在且其关键字个数大于最小值
 if(rightnode!=null&&rightnodeSize>nodeMinSize) {
     var removeValue = rightnode.values[0];
     var parentValue = getPreviousValue(parent,removeValue);
     node.addValue(parentValue);
     moveValue(parent.id,parent.getValueIndex(parentValue),node.id,node.values.length-1,delay*1000,2000);
     moveValue(rightnode.id,rightnode.getValueIndex(removeValue),parent.id,parent.getValueIndex(parentValue),delay*1000,2000);
     parent.addValue(removeValue);
     delay+=3;
     rightnode.removeValue(removeValue);
     parent.removeValue(parentValue);
     changeRectLength(rightnode,-35,delay*1000);
     addValue2(rightnode.id,rightnode.values,delay*1000);
     sortLine(rightnode,delay*1000);
     //如果右邻居的孩子结点存在，则需要把右邻居的第一个孩子结点删除并添加到node结点中
     if (rightnode.child.length > 0) {
         var temp = rightnode.child[0];
         rightnode.removeChild(temp);
         node.addChild(temp);
         d3.select("#line"+temp.id).transition().delay(delay*1000/anSpeed).remove();
         var subx=node.x+node.values.length*35-temp.x;
         var suby=node.y+60-temp.y;
         movebTreeNodes(temp,subx,suby,delay++,2);
         addNodeLine(temp.id,node.x+node.values.length*35,node.y+30,delay*1000);
     }
 }else {
         var leftnode=null;
         var leftnodeSize=0;
         if(leftnodeIndex>=0){
             leftnode=parent.child[leftnodeIndex];
             leftnodeSize=leftnode.values.length;
         }
         //将左节点的最大值放入如节点
         if(leftnode!=null&&leftnodeSize>nodeMinSize){
             var removeValue = leftnode.values[leftnodeSize-1];
             var parentValue = getNextValues(parent, removeValue);
             node.addValue(parentValue);
             moveValue(parent.id,parent.getValueIndex(parentValue),node.id,node.values.length-1,delay*1000,2000);
             moveValue(leftnode.id,leftnode.getValueIndex(removeValue),parent.id,parent.getValueIndex(parentValue),delay*1000,2000);
             parent.addValue(removeValue);
             delay+=3;
             leftnode.removeValue(removeValue);
             parent.removeValue(parentValue);
             changeRectLength(leftnode,-35,delay*1000);
             addValue2(leftnode.id,leftnode.values,delay*1000);
             sortLine(leftnode,delay*1000);
     if (leftnode.child.length > 0) {
         var temp = leftnode.child[leftnode.child.length-1];
         leftnode.removeChild(temp);
         node.addChild(temp);
         d3.select("#line"+temp.id).transition().delay(delay*1000/anSpeed).remove();
         var subx=node.x+node.values.length*35-temp.x;
         var suby=node.y+60-temp.y;
         movebTreeNodes(temp,subx,suby,delay++,2);
         addNodeLine(temp.id,node.x+node.values.length*35,node.y+30,delay*1000);
     }
     //左右节点都不满足饱和条件，合并右节点
         }else if(rightnode!=null&&parent.values.length>0){
            var removeValue=rightnode.values[0];
            var prev=getPreviousValue(parent,removeValue);//先找出父节点中的值
             node.addValue(prev);
             moveValue(parent.id,parent.getValueIndex(prev),node.id,node.values.length-1,delay++*1000,2000);
             parent.removeValue(prev);
             parent.removeChild(rightnode);
             // delay+=2;
             var subx=node.x+parseInt($("#rect"+node.id).attr("width"))-rightnode.x;
             var suby=node.y-rightnode.y;
             //改变子节点长度 准备合并
             changeRectLength(node,rightnode.values.length*35,delay*1000);
             d3.select("#line"+rightnode.id).transition().delay(delay++*1000/anSpeed).remove();
             movebTreeNodes(rightnode,subx,suby,delay++,2);
             if(node.child.length>0){
                 var reslut=[];
                 avoidOverlap(node.child[0],reslut,delay++*1000);
             }
             d3.select("#g"+rightnode.id).transition().delay(delay*1000/anSpeed).remove();
            for(var i=0;i<rightnode.values.length;i++){
               node.addValue(rightnode.values[i]);
            }
            addValue2(node.id,node.values,delay++*1000);
            for(var i=0;i<rightnode.child.length;i++){
                node.addChild(rightnode.child[i]);
            }
             //?
            sortLine(node,delay*1000);
            if(parent.parent!=null&&parent.values<nodeMinSize){
                //还没到达根节点
                setTimeout(function () {
                    combined(parent);
                    delay=0;
                },delay*1000/anSpeed);
            }else if(parent.values.length==0){
                //父节点中没有关键字了，则降低树的高度
                node.parent=null;
                root=node;
                d3.select("#g"+parent.id).transition().delay(delay*1000/anSpeed).remove();
                parent=null;
                d3.select("#line"+node.id).transition().delay(delay++*1000/anSpeed).remove();
                root=null;
                movebTreeNodes(node,560-node.x,30-node.y,delay++,2);
                root=node;
            }else {
                //父节点移除元素 改变父节点长度
                changeRectLength(parent,-35,delay*1000);
                addValue2(parent.id,parent.values,delay*1000);
                sortLine(parent,delay*1000);
            }
         }else if(leftnode!=null&&parent.values.length>0){
             var removeValue=leftnode.values[leftnode.values.length-1];
             var next=getNextValues(parent,removeValue);
             node.addValue(next);
             moveValue(parent.id,parent.getValueIndex(next),node.id,node.values.length-1,delay++*1000,2000);
             parent.removeValue(next);
             parent.removeChild(leftnode);
             var subx=node.x+parseInt($("#rect"+node.id).attr("width"))-leftnode.x;
             var suby=node.y-leftnode.y;
             changeRectLength(node,leftnode.values.length*35,delay*1000);
             d3.select("#line"+leftnode.id).transition().delay(delay++*1000/anSpeed).remove();
             movebTreeNodes(leftnode,subx,suby,delay++,2);
             if(node.child.length>0){
                 var reslut=[];
                 avoidOverlap(node.child[0],reslut,delay++*1000);
             }
             d3.select("#g"+leftnode.id).transition().delay(delay*1000/anSpeed).remove();
             for(var i=0;i<leftnode.values.length;i++){
                 node.addValue(leftnode.values[i]);
             }
             addValue2(node.id,node.values,delay++*1000);
             for(var i=0;i<leftnode.child.length;i++){
                 node.addChild(leftnode.child[i]);
             }
             sortLine(node,delay*1000);
             if(parent.parent!=null&&parent.values<nodeMinSize){
                 //还没到达根节点
                 setTimeout(function () {
                     combined(parent);
                     delay=0;
                 },delay*1000/anSpeed);
             }else if(parent.values.length==0){
                 //父节点中没有关键字了，则降低树的高度
                 node.parent=null;
                 root=node;
                 d3.select("#g"+parent.id).transition().delay(delay*1000/anSpeed).remove();
                 parent=null;
                 d3.select("#line"+node.id).transition().delay(delay++*1000/anSpeed).remove();
                 root=null;
                 movebTreeNodes(node,560-node.x,30-node.y,delay++,2);
                 root=node;
             }else {
                 changeRectLength(parent,-35,delay*1000);
                 addValue2(parent.id,parent.values,delay*1000);
                 sortLine(parent,delay*1000);
             }
         }
     }
}

function getPreviousValue(node,value) {
    for (var i = node.values.length-1; i >=0; i--)
    {
        var t=node.values[i];
        if (t<value)
            return t;
    }
    return node.values[node.values.length-1];
}

function getNextValues(node,value) {
    for (var i = 0; i < node.values.length; i++)
    {
        var t=node.values[i];
        if (t>=value)
            return t;
    }
    return node.values[node.values.length-1];
}

function rectProperty(obj) {
    var data=$(obj).text();
    var node1=findNode(data);
    $("#code1").text(getNodeValues(node1));
    if(node1.child.length>0) {
        var v="";
        for(var i=0;i<node1.child.length;i++){
            v+=getNodeValues(node1.child[i])+",";
        }
        $("#code2").text("chilren=" +v);
    }else {
        $("#code2").text("chilren=null");
    }
    if(node1.parent!=null) {
        $("#code4").text("parent="+getNodeValues(node1.parent));
    }else {
        $("#code4").text("parent=null");
    }
    $("#code5").text("x="+node1.x);
    $("#code6").text("y="+node1.y);
    $("#code7").text("rect.x="+$("#rect"+node1.id).attr("x"));
}

function getNodeValues(node) {
    var v="{";
    if(node.values.length>0) {
        for(var i=0;i<node.values.length;i++) {
            v += node.values[i] + ",";
        }
    }
    v=v.substring(0,v.length-1);
    v+="}";
    return v;
}

function autoTest() {
    d3.selectAll("g").remove();
    root=null;
    delay=0;
    numArray.splice(0,numArray.length);
    for(var i=0;i<10;i++) {
        var t=Math.floor(Math.random() * 1000);
        t+="";
        numArray.push(t);
    }
    var c=0;
    var str="";
    // numArray=["849","778","471","729","818","183","855","775","587","213","612","871","57","925","373","6","396","772","121","666"];
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
        // var flag=checkOut(root);
        var flag=true;
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
