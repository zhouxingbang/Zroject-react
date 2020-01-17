import React from 'react';
import ReactEcharts from 'echarts-for-react';
import * as Echarts from 'echarts';

export interface PieItemType {
    name: string;
    value: number;
    startColor: string;
    endColor: string;
}

export interface PieChartProps {
    style?: React.CSSProperties;
    className?: string;
    data?: PieItemType[];
}

export default function PieChart(props: PieChartProps) {
    const option = {
        title: { show: false },
        tooltip: {
            trigger: 'item',
            confine: true,
            textStyle: {
                color: '#fff'
            }
        },
        legend: {
            show:false, 
            textStyle: {color: '#fff'}, 
            data: props.data ? props.data.map(el => el.name) : []
        },
        series : [
            {
                name:'',
                type:'pie',
                hoverAnimation: false,
                radius: ['70%', '100%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                itemStyle: {
                    color: function(value:any) {
                        return {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 1,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: value.data.startColor
                            }, {
                                offset: 1, color: value.data.endColor
                            }],
                            global: false
                        };
                    }
                },
                data: props.data
            }
        ]
    };

    return (
        <ReactEcharts
        option={option}
        className={props.className}
        style={props.style}
        />
    )
}