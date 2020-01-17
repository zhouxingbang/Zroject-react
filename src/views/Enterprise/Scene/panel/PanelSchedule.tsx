import React from 'react';
import ExpandPanel, { PanelItem } from '~components/ExpandPanel';
import LiquidFill from '~components/Echarts/LiquidFill';
import { List, makeStyles, createStyles, Box, Typography, Grid } from '@material-ui/core';
import ListItemEx from '~components/ListItemEx';
import ProgressText from '~components/ProgressText';
import FontStyles from '~assets/tss/fontStyle';
import Utils from '~code/utils';

type ScheduleType = {
    name: string;
    status: string;
    startText: string;
    endText: string;
    progress: number;
}

const ScheduleList = React.forwardRef((props: {style?:React.CSSProperties, data:ScheduleType[]}, ref?:React.Ref<HTMLDivElement>) => {
    
    return (
        <div ref={ref} style={props.style}>
            <List style={{width:'100%'}}>
                {props.data.map(el => (
                    <ListItemEx key={el.name}>
                        <ProgressText ltText={el.name} rtText={el.status}
                        lbText={el.startText} rbText={el.endText} endPct={el.progress}/>
                    </ListItemEx>
                ))}
            </List>
        </div>
    )
});

function TimeBoard(props:{name:string,time:string}) {
    
    const classes = makeStyles(createStyles({
        root: {
            width: 130,
            height: 67,
            backgroundImage: `url(${require('~assets/img/bg_timeBoard.png')})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%'
        },
        topText: {
            marginTop: 5,
            ...FontStyles.labelFont,
            opacity: 0.8
        },
        bottomText: {
            marginBottom: 5,
            ...FontStyles.titleFont,
            fontSize: 18,
            fontWeight: 'bold',
            color: '#5dd3db',
            opacity: 0.8
        }
    }))();

    return (
        <Box className={classes.root} display="flex" flexDirection="column" justifyContent="space-between" alignItems="center">
            <Typography className={classes.topText}>{props.name}</Typography>
            <Typography className={classes.bottomText}>{props.time}</Typography>
        </Box>
    )
}

export default function PanelSchedule() {

    const classes = makeStyles(createStyles({
        title: FontStyles.titleFont,
        timeContainer: {
            height: 149
        },
        currentText: {
            ...FontStyles.titleFont,
            fontSize: 18,
            color: '#0eb9de'
        },
        remainBox: {
            height: 32,
            width: 128,
            backgroundImage: `url(${require('~assets/img/bg_dayBoard.png')})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%'
        },
        remainText: {
            ...FontStyles.labelFont,
            color: 'rgba(255,255,255,0.8)'
        }
    }))();

    const [title, setTitle] = React.useState<string>("已施工（天）");
    const [timeStatus, setTimeStatus] = React.useState({startTime:"未设置",endTime:"未设置",curDays:0,remainDays:0});
    const [scheduleList, setScheduleList] = React.useState<ScheduleType[]>([]);

    const onExpandChanged = (isExpand:boolean) => {
        setTitle(isExpand ? "工程信息" : "已施工（天）");
    };

    React.useEffect(() => {
        setScheduleList([
            {name:"测试01",status:"测试01",startText:"测试01",endText:"测试01",progress:0.6},
            {name:"测试02",status:"测试01",startText:"测试01",endText:"测试01",progress:0.6},
            {name:"测试03",status:"测试01",startText:"测试01",endText:"测试01",progress:0.6},
            {name:"测试04",status:"测试01",startText:"测试01",endText:"测试01",progress:0.8},
        ]);
    }, []);

    return (
        <ExpandPanel title={title} expandChanged={onExpandChanged}>
            <div>
                <Grid container spacing={0}>
                    <Grid item container xs={12} className={classes.timeContainer}>
                        <Grid container item xs={6} style={{height:'100%'}}>
                            <Box display="flex" flexDirection="column" justifyContent="space-between">
                                <TimeBoard name="开始时间" time={timeStatus.startTime}/>
                                <TimeBoard name="结束时间" time={timeStatus.endTime}/>
                            </Box>  
                        </Grid>
                        <Grid container item xs={6} style={{height:'100%'}}>
                            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                                <LiquidFill
                                style={{width:80,height:80}}
                                value={timeStatus.curDays/Math.max(1,timeStatus.curDays+timeStatus.remainDays)}
                                title={Utils.parseNumerical(timeStatus.curDays)}
                                />
                                <div style={{height:20}}/>
                                <Box display="flex" justifyContent="center" className={classes.remainBox}>
                                    <Typography className={classes.remainText}>剩余&nbsp;&nbsp;<span style={{fontSize:18,fontWeight:"bold",color:'#fff'}}>{Utils.parseNumerical(timeStatus.remainDays)}</span>&nbsp;&nbsp;天</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <div style={{height:60}}/>
            <PanelItem expandView={<ScheduleList style={{width:'100%',height:'100%',overflowX:'hidden',overflowY:'auto'}} data={scheduleList}/>}>
                <Typography className={classes.title}>工程信息</Typography>
                <ScheduleList style={{width:'100%'}} data={scheduleList}/>
            </PanelItem>
        </ExpandPanel>
    )
}