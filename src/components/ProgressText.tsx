import React from 'react';
import { 
    makeStyles, 
    createStyles,
    Grid,
    Typography
} from '@material-ui/core';
import FontStyles from '~assets/tss/fontStyle';

export interface ProgressTextProps {
    style?: React.CSSProperties;
    className?: string;
    startPct?: number;
    endPct?: number;
    ltText?: string;
    rtText?: string;
    lbText?: string;
    rbText?: string;
    spacing?: React.CSSProperties['width'];
}

export default function ProgressText(props: ProgressTextProps) {
    const classes = makeStyles(createStyles({
        top: FontStyles.labelFont,
        bottom: {
            ...FontStyles.labelFont,
            fontSize: 12
        },
        canvas: {
            width: '100%',
            height: 14
        }
    }))();

    const {
        startPct = 0.0,
        endPct = 0.0,
        ltText = '',
        rtText = '',
        lbText = '',
        rbText = '',
        spacing = 10,
        ...other
    } = props;

    const canvasRef = React.useRef<HTMLCanvasElement|null>(null);

    React.useEffect(() => {
        if(!canvasRef.current) return;
        let ctx=canvasRef.current.getContext('2d');
        if(!ctx) return;
        let width = canvasRef.current.width;
        let height = canvasRef.current.height; 
        ctx.clearRect(0,0,width,height);
        let gdn = ctx.createLinearGradient(0,height,width, height);
        gdn.addColorStop(0,'rgba(45,252,156,0.3)');
        gdn.addColorStop(1,'rgba(14,185,222,0.3)');
        ctx.fillStyle=gdn;
        ctx.fillRect(0,0,width,height);
        gdn = ctx.createLinearGradient(startPct*width,height,Math.min((endPct-startPct),1.0)*width, height);
        gdn.addColorStop(0,'#2dfc9c');
        gdn.addColorStop(1,'#0eb9de');
        ctx.fillStyle=gdn;
        ctx.fillRect(startPct*width,0,endPct*width, height);
    });

    return (
        <div {...other}>
            <Grid container spacing={0}>
                <Grid item container xs={12}>
                    <Grid item xs ={6}>
                        <Typography noWrap className={classes.top} title={ltText}>{ltText}</Typography>
                    </Grid>
                     <Grid item xs={6}>
                        <Typography className={classes.top} align="right">{rtText}</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12} style={{height:spacing}}/>
                <Grid item xs={12} container>
                    <canvas className={classes.canvas} ref={canvasRef}/>
                </Grid>
                <Grid item xs={12} style={{height:spacing}}/>
                <Grid item container xs={12} spacing={0} justify="space-between">
                    <Grid item xs={6}>
                        <Typography className={classes.bottom}>{lbText}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography className={classes.bottom} align="right">{rbText}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}