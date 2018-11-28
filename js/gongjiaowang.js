var dom1 = document.getElementById("gongjiaowang");
var myChart1 = echarts.init(dom1);
var app1 = {};
option1 = null;
var data = [{
    fixed: true,
    x: myChart1.getWidth() / 2,
    y: myChart1.getHeight() / 2,
    symbolSize: 2,
    id: '-1'
}];

var edges = [];

function GetData() {
    $.ajax({
        url: "http://127.0.0.1:8000/api/echart/gjw",// 请求地址 
        type: "POST", xhrFields: {withCredentials: true}, // 请求类型
        async: true, // 是否异步执行.
        data: {
            "action": "place_list"
        },
        dataType: "json", // 返回数据的数据类型.
        success: function (data) {
            if(data.res==false){
                alert(data.data);
                window.open("/login.html");
                return;
            }
            myChart1.setOption({
                series: [{
                    roam: true,
                    data: data.data.places,
                    edges: data.data.edges
                }]
            });
        }
    });
}



option1 = {
    series: [{
        type: 'graph',
        layout: 'force',
        symbolSize: 30,
        roam: true,
        label: {
            normal: {
                show: true
            }
        },
        animation: false,
        edgeLabel: {
            normal: {
                textStyle: {
                    fontSize: 20
                }
            }
        },
        data: data,
        force: {
            // initLayout: 'circular'
            // gravity: 0
            repulsion: 100,
            edgeLength: 300
        },
        edges: edges,
        lineStyle: {
            normal: {
                opacity: 0.9,
                width: 8,
                curveness: 0
            }
        }
    }]
};

setInterval(function () {
    GetData();
    // console.log('nodes: ' + data.length);
    // console.log('links: ' + data.length);
}, 5000);;

if (option1 && typeof option1 === "object") {
    myChart1.setOption(option1, true);
}
$(function(){GetData();});