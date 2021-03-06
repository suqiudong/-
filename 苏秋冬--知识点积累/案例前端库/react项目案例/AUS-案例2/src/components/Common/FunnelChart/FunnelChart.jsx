/**
 * 漏斗图组件
 * User: jiaomx
 * Date: 2017/1/6
 * Time: 16:14
 */
import React, { Component } from 'react';
var Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/funnel')(Highcharts);

// 定义漏斗图对象
let funnelChart;
class FunnelChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartOptions: this.props.chartOptions
        };
        this.loadFunnelChartHandler = this.loadFunnelChartHandler.bind(this);
        this.getChartOptionsHandler = this.getChartOptionsHandler.bind(this);
        this.setChartOptionsHandler = this.setChartOptionsHandler.bind(this);
        this.destroyChartHandler = this.destroyChartHandler.bind(this);
    }

    componentDidMount() {
        if (this.state.chartOptions) {
            this.loadFunnelChartHandler(this.state.chartOptions);
        }
    }

    componentDidUpdate() {
        if (this.state.chartOptions) {
            this.loadFunnelChartHandler(this.state.chartOptions);
        }
    }

    /**
     * 设置图表配置
     * @param options
     */
    setChartOptionsHandler(options) {
        this.destroyChartHandler();
        this.setState({
            chartOptions: options
        });
    }

    /**
     * 清除图表
     */
    destroyChartHandler() {
        let chartId = this.props.chartId || 'funnelChart';
        if (funnelChart && funnelChart.options.chart.id === chartId) {
            funnelChart.destroy();
            funnelChart = '';
            $('#' + chartId).html(`<div class="noResultInfo"><i class='fa fa-exclamation-triangle'></i><span>请先添加图表配置</span></div>`);
        }
    }

    /**
     * 获取图表配置操作
     * @returns {{}}
     */
    getChartOptionsHandler() {
        let options = {};
        if (funnelChart) {
            options.title = funnelChart.options.title.text;
            options.series = funnelChart.options.series;
            options.chartType = 'funnel';
            options.isNumDis = funnelChart.options.chart.isNumDis;
            options.islegendDis = funnelChart.options.legend.enabled;
        }
        return options;
    }


    /**
     * 绘制图表
     * @returns {*}
     */
    loadFunnelChartHandler(options) {
        let chartId = this.props.chartId || 'funnelChart';
        funnelChart = Highcharts.chart(chartId, {
            lang: {
                contextButtonTitle: '图表导出菜单',
                decimalPoint: '.',
                downloadJPEG: '下载JPEG图片',
                downloadPDF: '下载PDF文件',
                downloadPNG: '下载PNG文件',
                downloadSVG: '下载SVG文件',
                drillUpText: '返回 {series.name}',
                loading: '加载中',
                months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                noData: '没有数据',
                numericSymbols: ['千', '兆', 'G', 'T', 'P', 'E'],
                printChart: '打印图表',
                resetZoom: '恢复缩放',
                resetZoomTitle: '恢复图表',
                shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                thousandsSep: ',',
                weekdays: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天']
            },
            chart: {
                id: chartId,
                type: 'funnel',
                marginRight: 100,
                isNumDis: options.isNumDis
            },
            title: {
                text: options.title || '',
                x: -50
            },
            tooltip: {
                headerFormat: '<b>{point.y:,.0f}</b><br/>',
                pointFormat: '{series.name}: {point.name}'
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: options.isNumDis || false,
                        format: '<b>{point.name}</b> ({point.y:,.0f})',
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                        softConnector: true
                    },
                    showInLegend: options.islegendDis || false,
                    neckWidth: '12%',
                    neckHeight: '25%',
                    width: '40%'
                }
            },
            credits: {
                enabled: false
            },
            legend: {
                enabled: options.islegendDis || false
            },
            series: [{
                resultField: options.series[0].resultField || '',
                name: options.series[0].name || '',
                data: options.series[0].data || []
            }]
        });
        return funnelChart;
    }

    render() {
        let chartId = this.props.chartId || 'funnelChart';
        return (
            <div id={chartId} className={ this.props.className } style={{ maxWidth: '99%', height: '100%' }}>
                <div className="noResultInfo"><i className='fa fa-exclamation-triangle'></i><span>请先添加图表配置</span></div>
            </div>
        )
    }
}
export default FunnelChart;
