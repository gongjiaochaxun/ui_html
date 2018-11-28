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
var place_list=[];
var edge_list=[];
var edge_name=[];
function GetData(s,t) {
    $.ajax({
        url: "http://127.0.0.1:8000/api/cx",// 请求地址 
        type: "POST", xhrFields: { withCredentials: true }, // 请求类型
        async: false, // 是否异步执行.
        data: {
            "s": s,
            "t": t
        },
        dataType: "json", // 返回数据的数据类型.

        success: function (data) {
            if (data.res == true) {
                //document.getElementById("gongjiaowang").style.display="";
                place_list=[];
                edge_list=[];
                place_list.push({
                    "name":data.data[0].s
                });
                edge_name=[];
                $.each(data.data, function (i, n) {
                    place_list.push({
                        "name":n.t
                    });
                    edge_list.push({
                        "source": n.s,
                        "target": n.t,
                        "label": {
                            "normal": {
                                "show":true,
                                "formatter":String(n.r)
                            }
                        },
                        "lineStyle": {
                            "normal": {
                                "width": 2
                            }
                        }
                    });
                    edge_name = edge_name.concat(n.r);
                    console.log(edge_name)
                });
                console.log(edge_name);
                $.ajax({
                    xhrFields: { withCredentials: true },
                    type: "POST",
                    url: "http://127.0.0.1:8000/api/route/list",
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        $("#searchResult").text("");
                        var str = "";
                        $.each(data.data, function (i, n) {
                            if($.inArray(n.routename,edge_name)!=-1){
                                str += "<tr class=\"success\"><td>" + n.routename + "</td>";
                                str += "<td id=\"\">" + n.places + "</td>";
                                str += "<td id=\"\">" + n.places[0] + "</td>";
                                str += "<td id=\"\">" + n.places[n.places.length - 1] + "</td>";
                                str += "<td id=\"\">" + n.start_time + "</td>";
                                str += "<td id=\"\">" + n.stop_time + "</td>";
                                str += "<td id=\"\">" + n.money + "</td>";
                                str += "</tr>";
                            }
                        });
                        $("#searchResult").append(str);
                    }
                });

                myChart1.setOption({
                    series: [{
                        edgeSymbol: ['circle', 'arrow'],
                        roam: true,
                        data: place_list,
                        edges: edge_list
                    }]
                });
            }
            else {
                alert(data.data);
            }
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
                width: 5,
                curveness: 0
            }
        }
    }]
};



if (option1 && typeof option1 === "object") {
    myChart1.setOption(option1, true);
}
