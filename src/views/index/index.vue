<template>
<div class='index'>
    <div id="main" style="width: 700px;height:500px;"></div>
</div>
</template>

<script>
var echarts = require('echarts');
export default {
components: {},
data() {
return {}
},
mounted(){
    var myChart = echarts.init(document.getElementById('main'));
    myChart.setOption({
            title: { text: '销售表' },
            tooltip: {},
            xAxis: {
                data: ["周一","周二","周三","周四","周五","周六","周日"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'line',
                data: [5, 20, 25, 10, 15, 20,30]
            }]
        });
},
computed: {},
watch: {},
methods: {

},
}
</script>
<style scoped>

</style>