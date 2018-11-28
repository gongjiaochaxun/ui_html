var dom3 = document.getElementById("bingzhuangtu");
var myChart3 = echarts.init(dom3);
var app3 = {};
$(function test() {
    $.ajax({
        url: "http://127.0.0.1:8000/api/echart/bzt", // 请求地址 
        type: "POST", xhrFields: {withCredentials: true}, // 请求类型
        async: true, // 是否异步执行.
        data: {
            "action": "place_list",
        },
        dataType: "json", // 返回数据的数据类型.
        success: function (data) {
            allnum = parseInt(data.data.allnum);

            startnum = parseInt(data.data.startnum);
            stopnum = parseInt(data.data.stopnum);
            myChart3.setOption({
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [
                            { value: startnum, name: '运营数量' },
                            { value: stopnum, name: '停运数量' },
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            });
        }
    });
});

option3 = null;
option3 = {
    title: {
        text: '',
        subtext: '',
        x: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['运营数量','停运数量']
    },

};
;
if (option3 && typeof option3 === "object") {
    myChart3.setOption(option3, true);
}