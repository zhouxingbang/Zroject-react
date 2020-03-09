import React from 'react';
import ReactEcharts from 'echarts-for-react';
import * as Echarts from 'echarts';
import Utils from '~code/utils';

export type LineData = {
    name: string;
    startColor: string;
    endColor: string;
    data: Array<[number,number]>;
}

export type LineChartProps = {
    style?: React.CSSProperties;
    className?: string;
    titleName?: string;
    xAxisColor?: string;
    xSplitNumber?: number;
    xMin?: number;
    xMax?: number;
    xRotate?: number;
    xFormat?: string;
    data?: LineData[];
    smooth?: boolean;
    leftOff?: React.CSSProperties['marginLeft'];
    rightOff?: React.CSSProperties['marginRight'];
}

export default function LineChart(props:LineChartProps) {

    const {
        xAxisColor = "#234551",
        xSplitNumber = 5,
        xRotate = 0,
        xFormat = "hh:mm",
        data = [], 
        smooth = false,
        leftOff = '8%',
        rightOff = '8%'
    } = props;

    let option = {
        title: {
            color: '#fff',
            left: 'left',
            text: props.titleName,
            textStyle: {
                fontFamily: "Microsoft YaHei",
                fontSize: 16,
                color: '#fff',
                fontWeight: 'normal'
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        grid: {
            top: 40,
            left: leftOff, 
            right: rightOff,
            bottom: 14,
            containLabel: true
        },
        xAxis: {
            type: 'time',
            min: props.xMin,
            max: props.xMax,
            splitNumber: xSplitNumber,
            axisLine: {
                lineStyle: {
                    color: xAxisColor
                }
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                formatter: function(value:any) {
                    return Utils.formatDate(new Date(value as number),xFormat);
                },
                color: '#fff',
                rotate: xRotate
            },
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            show: false
        },
        series: data.map(el => ({
            type: 'line',
            name: el.name,
            smooth: smooth,
            symbol: 'none',
            itemStyle: {
                color: el.startColor,
                width: 1,
                opacity: 1.0
            },
            areaStyle: el.startColor && el.endColor ? {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: el.startColor
                }, {
                    offset: 1,
                    color: el.endColor
                }]),
                opacity: 0.2
            } : {opacity: 0},
            data: el.data
        }))
    }

    return (
        <div className={props.className} style={props.style}>
            <ReactEcharts
            option={option}
            style={{width:'100%',height:'100%'}}
            />
        </div>
    )
}