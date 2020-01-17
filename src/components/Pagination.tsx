import React from 'react';
import { makeStyles, createStyles, Box, Typography } from '@material-ui/core';
import FontStyles from '~assets/tss/fontStyle';
import ImageButton from '~components/ImageButton';

let MOREFLAG = "···";

interface PageItemProps {
    onClicked: (index:number) => void;
    index?: number;
    selected?: boolean;
}

function PageItem(props: PageItemProps) {
    
    const {
        selected = false
    } = props;

    const classes = makeStyles(createStyles({
        root: {
            height: 22,
            backgroundColor: selected ? "rgba(12,194,228,0.4)" : "transparent",
            borderRadius: 2,
            cursor: 'pointer',
            "&:hover": {
                backgroundColor: props.index ? "transparent" : "rgba(12,194,228,0.4)"
            }
        },
        index: {
            ...FontStyles.labelFont,
            fontSize: 12,
            color: selected ? '#fff' : "rgba(255,255,255,0.8)"
        }
    }))();

    const onClicked = () => {
        if(props.index) {
            props.onClicked(props.index);
        }
    };

    return (
        <Box display="flex" alignItems="center" className={classes.root}
        onClick={onClicked}
        >
            <div style={{width:5}}/>
            <Typography className={classes.index}>{props.index ? props.index.toString() : MOREFLAG}</Typography>
            <div style={{width:5}}/>
        </Box>
    )
}

export interface PaginationProps {
    style?: React.CSSProperties;
    className?: string;
    defaultPage?: number;
    total?: number;
    span?: number;
    onPageChanged?: (page:number) => void;
}

export default function Pagination(props: PaginationProps) {
    const {
        defaultPage = 1,
        total = 1,
        span = 7
    } = props;

    const [pageList, setPageList] = React.useState<(number|undefined)[]>([]);
    const [current, setCurrent] = React.useState<number>(defaultPage);

    React.useEffect(() => {
        setCurrent(defaultPage);
    }, [props.defaultPage]);

    React.useEffect(() => {
        let pgList = Array<number|undefined>();
        if(total <= span) {
            for(let i=1; i<=total; ++i) {
                pgList.push(i);
            }
            setPageList(pgList);
            return;
        }
        if(current <= span-2) {
            for(let i=1; i<=span-2; ++i) {
                pgList.push(i);
            }
            pgList.push(undefined);
            pgList.push(total);
            setPageList(pgList);
            return;
        }
        if(total-current <= span-3) {
            pgList.push(1);
            pgList.push(undefined);
            for(let i=span-3; i>=0; --i) {
                pgList.push(total-i);
            }
            setPageList(pgList);
            return;
        }
        let validNum = Math.ceil(span*0.5);
        pgList.push(1);
        pgList.push(undefined);
        for(let il=validNum-3; il>=0; --il) {
            pgList.push(current-il);
        }
        for(let ir=1; ir<=(span-validNum-2); ++ir) {
            pgList.push(current+ir);
        }
        pgList.push(undefined);
        pgList.push(total);
        setPageList(pgList);
    }, [total,span,current]);

    const onPrePage = () => {
        if(current <= 1) return;
        setCurrent(current-1);
        if(props.onPageChanged) {
            props.onPageChanged(current-1);
        }
    };

    const onNextPage = () => {
        if(current >= total) return;
        setCurrent(current+1);
        if(props.onPageChanged) {
            props.onPageChanged(current+1);
        }
    };

    const onPageClicked = (page:number) => {
        setCurrent(page);
        if(props.onPageChanged) {
            props.onPageChanged(page);
        }
    }

    let keyIndex = 0;
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" className={props.className} style={props.style}>
            <ImageButton 
            image={require('~assets/img/pagepre.png')} 
            imageHover={require('~assets/img/pagepre_hover.png')} 
            onClick={onPrePage}
            />
            {pageList.map(el => <PageItem key={keyIndex++} index={el} selected={el===current ? true : false} onClicked={onPageClicked}/>)}
            <ImageButton 
            image={require('~assets/img/pagenext.png')} 
            imageHover={require('~assets/img/pagenext_hover.png')}
            onClick={onNextPage}
            />
        </Box>
    )
}