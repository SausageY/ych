var anSpeed=10;
$( "li" ).hover(
  function() {
      $(this).find("a").css("color","#FFF");
      $(this).find("span").stop().animate({
      width:"100%",
      opacity:"1",
    }, 600, function () {
    })
  }, function() {
      $(this).find("a").css("color","#555");
      $(this).find("span").stop().animate({
      width:"0%",
      opacity:"0",
    }, 600, function () {
    })
  }
);


$(function(){
    $( "#slider-range-max" ).slider({
        range: "min",
        min: 1,
        max: 10,
        value: 10,
        slide: function( event, ui ) {
            anSpeed=ui.value;
            $(".ui-slider-handle").text(ui.value);
        }
    });
    $(".ui-slider-handle").text($("#slider-range-max").slider("value"));
});

function changeTextColor(id,delay,time) {
    d3.select("#"+id).transition().delay(function (d, i) {
        return delay/anSpeed;
    }).duration(time/anSpeed)
        .ease(d3.easeCircleIn).attr("fill","#2a43d0")
        .transition().duration(time/anSpeed).ease(d3.easeCircleIn)
        .attr("fill","#000");
}

//图形边框变色变回
function changeGraphStroke(id,color,delay,width,time) {
    var old_color=$("#"+id).attr("stroke");
    d3.select("#"+id).transition().delay(function (d, i) {
        return delay/anSpeed;
    }).duration(time/anSpeed)
        .ease(d3.easeCircleIn)
        .attr("stroke", color).attr("stroke-width",width)
        .transition().duration(time/anSpeed).ease(d3.easeCircleIn)
        .attr("stroke",old_color).attr("stroke-width",1);
}

//图形边框变色
function changeGraphStroke2(id,color,delay,width,time) {
    d3.select("#"+id).transition().delay(function (d, i) {
        return delay/anSpeed;
    }).duration(time/anSpeed)
        .ease(d3.easeCircleIn)
        .attr("stroke", color).attr("stroke-width",width);
}

function printRect(id,x,y,width,height,delay,animation,input) {
    var svg=d3.select("#canvas");
    var g=svg.append("g").attr("id","g"+id).attr("class","1");
    g.append("rect").attr("x", x).attr("y", y).attr("width", 0).attr("id","rect"+id)
        .attr("height", height).attr("fill", "white").attr("stroke-width", 1).attr("stroke", "black")
        .attr("class", "1").transition()
        .delay(function (d, i) {
            return delay*1000/anSpeed;
        }).duration(2000/anSpeed)
        .ease(animation)
        .attr("width", width);
    x=parseInt(x);
    y=parseInt(y);
    g.append("text").attr("class","1").attr("dy","1em").attr("x",x+width/2)
        .attr("y",y+height/4).attr("text-anchor","middle").attr("id","text"+id)
        .style("font","12px Open Sans")
        .transition()
        .delay(function (d, i) {
            return delay*1000/anSpeed;
        }).duration(2000/anSpeed)
        .ease(animation).text(input);
    return g;
};

function printLine(id,x1,y1,x2,y2,stroke,stroke_width,delay,animation) {
    var svg=d3.select("#canvas");
    return svg.append("line").attr("class","1").attr("x1",x1).attr("y1",y1).attr("x2",x1).attr("y2",y1).attr("id","line"+id)
        .attr("stroke",stroke).attr("stroke-width",stroke_width).attr("marker-end","url(#arrow)").transition()
        .delay(function (d, i) {
            return delay * 200/anSpeed;
        }).duration(1000/anSpeed)
        .ease(animation)
        .attr("x2", x2)
        .attr("y2",y2);

};


function getdef(){
    var svg=d3.select("#canvas");
    if($("defs").length==0) {
        var defs = svg.append("defs");
        var arrow_path = "M2,2 L10,6 L2,10 L6,6 L2,2";
        var arrowMarker = defs.append("marker")
            .attr("id", "arrow")
            .attr("markerUnits", "strokeWidth")
            .attr("markerWidth", "12")
            .attr("markerHeight", "12")
            .attr("viewBox", "0 0 12 12")
            .attr("refX", "6")
            .attr("refY", "6")
            .attr("orient", "auto");
        arrowMarker.append("path")
            .attr("d", arrow_path)
            .attr("fill", "#000");
    }
};