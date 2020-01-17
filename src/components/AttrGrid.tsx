import React from 'react';
import { 
    Grid,
    Box,
    Typography,
    makeStyles,
    createStyles,
    GridSize
} from '@material-ui/core';
import clsx from 'clsx';
import FontStyles from '~assets/tss/fontStyle';

export type GridAttrType = {
    image: string;
    name: string;
    value: string;
    [key:string]: string;
}

export interface AttrGridProps {
    column?: 1|2|3|4|6|12;
    data: GridAttrType[];
    itemWidth?: React.CSSProperties['width'];
    rowSpace?: React.CSSProperties['width'];
    metrics?: string[];
    className?: string;
    style?: React.CSSProperties;
}

export default function AttrGrid(props:AttrGridProps) {

    const {
        data = [],
        column = 3,
        itemWidth = 80,
        rowSpace = 20,
        metrics = ['value'],
        ...other
    } = props;

    const classes = makeStyles(createStyles({
        text: {
            ...FontStyles.labelFont,
            fontSize: 12,
            width: itemWidth
        },
        value: {
            width: itemWidth as number -20,
            textAlign: 'center',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            '&:hover': {
                whiteSpace: 'inherit',
                textOverflow:'inherit',
                overflow: 'visible'
            }
        },
        rowSpace: {
            marginBottom: rowSpace
        }
    }))();

    const GridList = React.useMemo(() => {
        const containerList = [];
        for(let i=0; i<data.length; i+=column) {
            const itemList = [];
            for(let col=0; col<column && (i+col)<data.length; ++col) {
                itemList.push(
                    <Grid item xs={12/column as GridSize} style={{width:itemWidth}} key={data[i+col].name}>
                        <Box display="flex" justifyContent="center" alignItems="center"
                        style={{
                            width:itemWidth,height:itemWidth,
                            backgroundImage:`url(${data[i+col].image})`,backgroundRepeat:"no-repeat",backgroundSize:"100% 100%"
                        }}
                        ><div className={clsx(classes.text,classes.value)}>
                            {metrics.map(val => <p key={val}>{data[i + col][val]}</p>)}
                        </div>
                        </Box>
                        <div style={{height:9}}/>
                        <Typography className={classes.text} align="center" dangerouslySetInnerHTML={{__html:data[i+col].name}}></Typography>
                    </Grid>
                )
            }
            containerList.push(<Grid item container xs={12} key={i} className={i < column ? classes.rowSpace : undefined}>
                {itemList}
            </Grid>);
        }
        return containerList;
    }, [data,itemWidth,rowSpace]);

    return (
        <Grid container {...other}>
            {GridList}
        </Grid>
    )
}