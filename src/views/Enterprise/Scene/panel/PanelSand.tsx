import React from 'react';
import { 
    makeStyles,
    createStyles,
    Box,
    Grid,
    Typography,
    IconButton
} from '@material-ui/core';
import FontStyles from '~assets/tss/fontStyle';
import TriTreeView, { TriTreeNodeType } from '~components/TriTreeView';
import SliderEx from '~components/SliderEx';
import FastRewindIcon from '@material-ui/icons/FastRewind';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import FastForwardIcon from '@material-ui/icons/FastForward';
import StopIcon from '@material-ui/icons/Stop';
import DatePickerEx from '~components/DatePickerEx';

export default function PanelSand() {

    const classes = makeStyles(createStyles({
        root: {
            width: 280,
            height: '100%'
        },
        title: {
            ...FontStyles.titleFont,
            fontWeight: 'bold'
        },
        speedLabel: {
            ...FontStyles.labelFont,
            marginTop: -6
        },
        button: {
            color: '#fff',
            width: 32,
            height: 32,
            textAlign: 'center',
            backgroundColor: 'rgba(255,255,255,0.1)',
            '&:hover': {
                cursor: 'pointer',
                backgroundColor: 'rgba(255,255,255,0.1)'
            }
        },
        icon: {
            width: 16,
            height: 16,
            marginTop: -4
        },
        treeView: {
            width: '100%',
            flexGrow: 1
        },
        datePicker: {
            width: '100%',
            height: 35
        }
    }))();

    const [nodeList, setNodeList] = React.useState<TriTreeNodeType[]>([]);
    const [speed, setSpeed] = React.useState<number>(1);
    const [minDate, setMinDate] = React.useState<Date|null>(null);
    const [maxDate, setMaxDate] = React.useState<Date|null>(null);
    const [curDate, setCurDate] = React.useState<Date|null>(new Date());
    const [playing, setPlaying] = React.useState<boolean>(false);
    const [progress, setProgress] = React.useState<number>(0);

    React.useEffect(() => {

    }, []);

    const progressToggle = (event: React.ChangeEvent<{}>, value: number | number[]) => {
        
    }

    const playToggle = () => {
        if(!curDate) return;
        setPlaying(!playing);
    }

    const speedToggle = (isFoward:boolean) => {
        if(isFoward && speed < 16) {
            setSpeed(speed*2);
        } 
        if(!isFoward && speed > 1) {
            setSpeed(speed*0.5);
        }
    }

    const resetToggle = () => {
        setCurDate(minDate);
    }

    const onCheckChanged = (nodeIds:string[], isCheck:boolean) => {
        
    }

    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
        new Date('2014-08-18T21:11:54'),
      );

    return (
        <Box display="flex" flexDirection="column" className={classes.root}>
            <Typography className={classes.title}>阶段状态</Typography>
            <div style={{height: 30}} />
            <TriTreeView className={classes.treeView}
                defaultExpanded={nodeList.map(el => el.id)}
                data={nodeList}            
                checkChanged={onCheckChanged}
            />
            <div style={{height: 30}} />
            <div>
                <Grid container spacing={2}>
                <Grid item xs={11}>
                    <SliderEx value={progress} onChange={progressToggle}/>     
                </Grid>
                <Grid item container xs={12} spacing={3}>
                    <Grid item>
                        <IconButton className={classes.button} color="primary" onClick={() => {speedToggle(false);}}>
                            <FastRewindIcon className={classes.icon}/>
                        </IconButton>
                    </Grid>
                    <Grid item >
                        <IconButton className={classes.button} color="primary">
                            <Typography className={classes.speedLabel}>{"x"+speed}</Typography>
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton className={classes.button} color="primary" onClick={() => {playToggle();}}>
                            {playing ? <PauseIcon className={classes.icon}/> : <PlayArrowIcon className={classes.icon}/>} 
                        </IconButton>
                    </Grid>                    
                    <Grid item>
                        <IconButton className={classes.button} color="primary" onClick={() => {resetToggle();}}>
                            <StopIcon className={classes.icon}/>
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton className={classes.button} color="primary" onClick={() => {speedToggle(true);}}>
                            <FastForwardIcon  className={classes.icon}/>
                        </IconButton>
                    </Grid>                    
                </Grid>
                <Grid item xs={12}>
                    <DatePickerEx
                    className={classes.datePicker}
                    format="yyyy/MM/dd"
                    value={curDate}
                    maxDate={maxDate}
                    minDate={minDate}
                    onChange={setCurDate}
                    />
                </Grid>
            </Grid>
            </div>
        </Box>
    )
}