import React from 'react';
import ReactEcharts from 'echarts-for-react';
import * as Echarts from 'echarts';

export interface BarData {
    name: string;
    data: Array<{startColor:string,endColor:string,value:number}>;
}

export interface BarChartProps {
    style?: React.CSSProperties;
    className?: string;
    xAxisColor?: string;
    showToolTip?: boolean;
    orientation?: boolean;
    showlegend?: boolean;
    labels?: string[];
    formatLabel?: (name:string,value:number) => string;
    formatTip?: (name:string,value:string) => string;
    data?: BarData[];
    yMax?: number;
    onLabelDblclicked?: (name:string,params:any) => void;
}

export default function BarChart(props:BarChartProps) {

    const {
        xAxisColor = "#234551",
        showToolTip = false,
        orientation = false,
        showlegend = false,
        labels = [],
        formatLabel = (name:string,value:number) => { return value.toString();},
        formatTip = (name:string,value:string) => { return name+"："+value},
        data = [],
        yMax = null
    } = props;

    let lengend = {
        show: showlegend, 
        textStyle: {color: '#fff'}, 
        top: '0%',
        data: data.map(el => el.name),
    };
    let series = data.map(barEl => ({
        type: 'bar',
        name: barEl.name,
        barWidth: 14,
        label: {
            normal: {
                show: !showToolTip,
                position: orientation ? 'top' : 'right',
                color: "#f8f8ff",
                align: orientation ? 'center' : 'left',
                verticalAlign: orientation ? 'bottom' : 'center',
                formatter: function(params:any) {
                    return formatLabel(params.name, params.value);
                }
            }
        },
        data: barEl.data.map(el => ({
            value: el.value,
            itemStyle: {
                color: orientation ? new Echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: el.startColor },
                    { offset: 1, color: el.endColor }
                ]) : new Echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    { offset: 0, color: el.startColor },
                    { offset: 1, color: el.endColor }
                ])
            }
        }))
    }));
    
    let axisX = orientation ? {
        data: labels,
        type: 'category',
        axisLabel: {
            interval: 0,
            textStyle: {
                color: '#fff'
            }
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: xAxisColor
            }
        },
        triggerEvent: true
    } : {
        type: 'value',
        show: false,
        max: yMax
    };
    let axisY = orientation ? {
        type: 'value',
        show: false,
        max: yMax
    } : {
        data: labels,
        type: 'category',
        axisLabel: {
            interval: 0,
            textStyle: {
                color: '#fff'
            }
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: xAxisColor
            }
        },
        triggerEvent: true
    };

    const option = {
        title: { show: false },
        tooltip: {
            show: showToolTip,
            trigger: 'item',
            formatter: function (params:any) {
                return formatTip(params.name,params.value);
            },
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: orientation ? {
            left: 10,
            right: 10,
            top: 24,
            bottom: 24
        } : {
            top: 0,
            bottom: 0,
            left: 10,
            containLabel: true
        },
        legend: lengend,
        xAxis: axisX,
        yAxis: axisY,
        series: series
    }

    const onDblclicked = (params:any) => {
        switch(params.targetType) {
            case 'axisLabel':
            {
                if(props.onLabelDblclicked) {
                    props.onLabelDblclicked(params.value,params);
                }
            }
            break;
        }
    }

    return (
        <div className={props.className} style={props.style}>
            <ReactEcharts
            option={option}
            style={{width:'100%',height:'100%'}}
            onEvents={{
                dblclick: onDblclicked
            }}
            />
        </div>
    )
}