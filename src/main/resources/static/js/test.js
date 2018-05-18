function move() {
    d3.select("#circle1").transition().delay(1000).remove().on("end",function () {
        d3.select("#circle2").transition().duration(1000).attr("cy",300);
    });
}