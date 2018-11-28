var dom = document.getElementById("zhuzhuangtu");
var myChart = echarts.init(dom);
var app = {};
option = null;


$(function GetData() {
    
    $.ajax({
        url:"http://127.0.0.1:8000/api/echart/zzt",// 请求地址 
        type: "POST", xhrFields: {withCredentials: true}, // 请求类型
        async: true, // 是否异步执行.
        data: {
            "action": "place_list"
        },
        dataType: "json", // 返回数据的数据类型.
        success: function (data) {
            namelist = [];
            valuelist=[];
            $.each(data.data, function(i, item) {
                namelist.push(item.placename);
                valuelist.push(item.value);
            });
            myChart.setOption({
                xAxis: {
                    type: 'category',
                    data: namelist
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: valuelist,
                    type: 'bar'
                }]
            });
        }
    });
});

if (option && typeof option === "object") {
    myChart.setOption(option, true);
}