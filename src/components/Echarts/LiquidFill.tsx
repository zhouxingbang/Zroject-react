import React from 'react';
import ReactEcharts from 'echarts-for-react';
import * as Echarts from 'echarts';
import 'echarts-liquidfill';
import FontStyles from '~assets/tss/fontStyle';

export interface LiquidFillProps {
    style?: React.CSSProperties;
    className?: string;
    value?: number;
    title?: string;
    borderWidth?: React.CSSProperties['borderWidth'];
    borderColorGradient?: [string,string];
    itemColorGradient?: [string,string];
}

export default function LiquidFill(props: LiquidFillProps) {

    const {
        value = 0,
        borderWidth = 3,
        title = "",
        borderColorGradient = ['#2dfc9c','#0eb9de'],
        itemColorGradient = ['#0eb9de','#2dfc9c']
    } = props;

    let option = {
        title: {
            show: true,
            text: props.title,
            textStyle: {
                ...FontStyles.titleFont,
                color: borderColorGradient[0]
            },
            x: 'center',
            y: '20%'
        },
        series: [{
            type: 'liquidFill',
            data: [value],
            label: {
                normal: {
                    formatter: ''
                }
            },
            radius: '90%',
            center: ['50%', '50%'],
            backgroundStyle: {
                color: 'transparent',
            },
            outline: {
                borderDistance: 0,
                itemStyle: {
                    borderWidth: borderWidth,
                    borderColor: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: borderColorGradient[1]
                        }, {
                            offset: 1,
                            color: borderColorGradient[0]
                        }],
                        globalCoord: false
                    },
                    shadowBlur: 0,
                    shadowColor: '#000',
                }
            },
            itemStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 1,
                    colorStops: [{
                        offset: 1,
                        color: itemColorGradient[1]
                    }, {
                        offset: 0,
                        color: itemColorGradient[0]
                    }],
                    globalCoord: false
                }
            }
        }]
    };

    return (
        <div className={props.className} style={props.style}>
            <ReactEcharts
            option={option}
            style={{width:'100%',height:'100%'}}
            />
        </div>
    )
}