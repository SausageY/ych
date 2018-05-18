var id=0;
var tableLength=10;
var number=[];
var current=10;
var interyal;
var time=-1;
$(function init() {
  getdef();
  for(var i=0;i<10;i++) {
      printRect(id++,30+i*60,450,60,30,i,d3.easeCircle,i);
  }
    d3.select("#canvas").append("text").attr("dy","1em").attr("x",700)
        .attr("y",50).attr("text-anchor","middle").attr("id","inputtext")
        .style("font","15px Open Sans")
    d3.select("#canvas").append("text").attr("dy","1em").attr("x",700)
        .attr("y",80).attr("text-anchor","middle").attr("id","caltext")
        .style("font","15px Open Sans")
})

function insert() {
   cleanDbuff();
  var input=$(".text-input").val();
  d3.select("#inputtext").text("input:"+input);
  var belong=parseInt(input)%tableLength;
    d3.select("#caltext").text(input+"%"+tableLength+"="+belong);
  var nodes=getHashnodeBybelong(belong);
  if(nodes.length>0) {
      for(var i=0;i<nodes.length;i++) {
          moveG_T("g"+nodes[i].id,0,-50,0,2000);
          nodes[i].y-=50;
      }
  }
  printRect(current,belong*60+30,400,60,30,0,d3.easeCircle,input);
  printLine(current,60+belong*60,450,60+belong*60,432,"#000",1,0,2000);
    $("#g"+current).append($("#line"+current));
  var node=new hashnode(current++,input,belong*30+60,400,belong);
  number.push(node);
}

function del() {
    cleanDbuff();
    var delay=0;
    var found=false;
    var input=$(".text-input").val();
    d3.select("#inputtext").text("Delete:"+input);
    var belong=parseInt(input)%tableLength;
    var nodes=getHashnodeBybelong(belong);
    changeGraphStroke("rect"+belong,"#2a43d0",(delay++)*2000,3,2000);
    for(var i=nodes.length-1;i>=0;i--) {
        if(nodes[i].data==input&&!found) {
            found=true;
            d3.select("#caltext").transition().delay(delay*2000/anSpeed).duration(1000/anSpeed)
                .text("Found "+input+" !");
            changeGraphStroke2("rect"+nodes[i].id,"#d03874",delay++*2000,3,2000);
            d3.transition().delay(delay*2000/anSpeed)
                .duration(2000/anSpeed)
                .ease(d3.easeLinear)
                .on(function() {
                    d3.select("#rect"+nodes[i].id).transition().attr("height",0);
                    d3.select("#text"+nodes[i].id).transition().attr("opacity",0)
                })
                .transition()
                .on(function() {
                    d3.select("#g"+nodes[i].id).transition().remove();
                });
            d3.select("#line"+nodes[i].id).transition().delay(delay*2000/anSpeed)
                .duration(2000/anSpeed).attr("y1",$("#line"+nodes[i].id).attr("y2"))
                .attr("marker-end","");
            deleteNode(nodes[i]);
            d3.select("#caltext").transition().delay(delay*2000/anSpeed).duration(1000/anSpeed)
                .text("Delete "+input+" !");
        }else if(!found){
            d3.select("#caltext").transition().delay(delay++*2000/anSpeed).duration(1000/anSpeed)
                .text(nodes[i].data+" != "+input);
            changeGraphStroke("rect"+nodes[i].id,"#2a43d0",delay++*2000,3,2000);
        }else {
            moveG_T("g"+nodes[i].id,0,50,delay*2000,2000);
            nodes[i].y+=50;
        }
    }
    clearInterval(interyal);
    forbiddenButton(delay*2/anSpeed);
}

function find() {
    cleanDbuff();
    var delay=0;
    var input=$(".text-input").val();
    d3.select("#inputtext").text("Found:"+input);
    var belong=parseInt(input)%tableLength;
    var nodes=getHashnodeBybelong(belong);
    changeGraphStroke("rect"+belong,"#2a43d0",(delay++)*2000,3,2000);
    for(var i=nodes.length-1;i>=0;i--) {
        if(nodes[i].data==input) {
            d3.select("#caltext").transition().delay(delay*2000/anSpeed).duration(1000/anSpeed)
                .text("Found "+input+" !");
            changeGraphStroke2("rect"+nodes[i].id,"#d03874",(delay++)*2000,3,2000);
        }else {
            d3.select("#caltext").transition().delay(delay*2000/anSpeed).duration(1000/anSpeed)
                .text(nodes[i].data+" != "+input);
            changeGraphStroke("rect"+belong,"#2a43d0",(delay++)*2000,3,2000);
        }
    }
    clearInterval(interyal);
    forbiddenButton(delay*2/anSpeed);
}

function hashnode(id,data,x,y,belong) {
    this.id=id;
    this.data=data;
    this.x=x;
    this.y=y;
    this.belong=belong;
}


function getHashnodeBybelong(belong) {
    var reslut=[];
    for(var i=0;i<number.length;i++) {
        if(number[i].belong==belong) {
            reslut.push(number[i]);
        }
    }
    return reslut;
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


function deleteNode(node) {
    for(var i=0;i<number.length;i++) {
        if(number[i].x==node.x&&number[i].y==node.y&&number[i].data==node.data) {
            number.splice(i,1);
            break;
        }
    }
}


function cleanDbuff() {
    d3.selectAll("rect").attr("stroke","#000").attr("stroke-width",1);
    d3.select("#inputtext").text("");
    d3.select("#caltext").text("");
}