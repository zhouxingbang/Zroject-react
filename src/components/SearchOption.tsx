import React from 'react';
import { 
    makeStyles, 
    createStyles, 
    Box, 
    Typography,
    Divider,
    Popper,
    Grow, 
    Paper, 
    ClickAwayListener,
    List
} from '@material-ui/core';
import FontStyles from '~assets/tss/fontStyle';
import TextFieldEx, { TextFieldExProps } from './TextFieldEx';
import ListItemEx from './ListItemEx';

export interface OptionType {
    name: string;
    startColor: string;
    endColor: string;
    [key:string]: any;
}

interface OptionItemProps {
    style?: React.CSSProperties;
    selected?: boolean;
    data: OptionType;
    onClick?(event: any): void;
}

const OptionItem = React.forwardRef((props:OptionItemProps, ref?:React.Ref<any>) => {

    const classes = makeStyles(createStyles({
        root: {
            height: 32,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 5,
            paddingRight: 5,
            '&:hover': {
                cursor: 'pointer'
            }
        },
        name: {
            ...FontStyles.labelFont,
            flexGrow: 1,
            fontSize: 12,
            color: props.selected ? "#0fbdda" : "rgba(255,255,255,0.8)"
        }
    }))();

    return (
        <div ref={ref} className={classes.root} style={props.style} onClick={props.onClick}>
            <div style={{width:16,height:16,background: `linear-gradient(90deg, ${props.data.startColor} 0%, ${props.data.endColor} 100%)`}}/>
            <div style={{width:5}}/>
            <Typography noWrap className={classes.name}>{props.data.name}</Typography>
        </div>
    )
});

interface SearchOptionProps extends TextFieldExProps {
    optionList?: OptionType[];
    optionWidth?: number;
    searchChanged?: (value:string) => void;
    optionChanged?: (index:number,option:OptionType) => void;
}

export default function SearchOption(props: SearchOptionProps) {

    const {
        optionList = [],
        optionWidth = 60,
        ...other
    } = props;

    const classes = makeStyles(createStyles({
        divider: {
            height: 16,
            backgroundColor: '#ffffff2d'
        },
        poper: {
            width: optionWidth,
            zIndex: 1500
        },
        paper: {
            width: '100%',
            backgroundColor: "#303e44"
        },
        paperRounded: {
            borderRadius: 0
        }
    }))();

    const anchorRef = React.useRef<any>(null);
    const [optionVis, setOptionVis] = React.useState<boolean>(false);
    const [optionIndex, setOptionIndex] = React.useState<number>(0);

    const onWheelOption = () => {
        setOptionVis(!optionVis);
    };

    const onOptionClicked = (event: any, index: number) => {
        onAwayClicked(event);
        if(index !== optionIndex) {
            setOptionIndex(index);
            if(props.optionChanged) {
                props.optionChanged(index,optionList[index]);
            }
        }
    };

    const onAwayClicked = (event: any) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOptionVis(false);
    };

    const getItemList = () => {
        let itemList = Array<React.ReactNode>();
        for(let i=0; i<optionList.length; ++i) {
            let el = optionList[i];
            itemList.push(
                <ListItemEx>
                    <OptionItem key={el.name} 
                    style={{width:optionWidth}} 
                    data={el} 
                    selected={i === optionIndex ? true : false} 
                    onClick= {(e:any) => {onOptionClicked(e,i);}} 
                    />
                </ListItemEx>
            )
        }
        return itemList;
    };

    return (
        <TextFieldEx
        {...other}
        startIcon={require('~assets/img/search.png')}
        handleChanged={props.searchChanged}
        height={26}
        endAdornment={
            optionList.length>0 && <React.Fragment>
                <Box display="flex" justifyContent="center" alignItems="center">
                    <Divider classes={{root: classes.divider}} orientation='vertical'/>
                </Box>
                <OptionItem style={{width:optionWidth}} ref={anchorRef} data={optionList[optionIndex]} onClick={onWheelOption}/>
                <Popper className={classes.poper} open={optionVis} anchorEl={anchorRef.current} transition>
                    {({ TransitionProps, placement }) => (
                    <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'right top' : 'right bottom' }}
                    >
                    <Paper classes={{root:classes.paper,rounded:classes.paperRounded}}>
                    <ClickAwayListener onClickAway={onAwayClicked}>
                        <List>
                        {getItemList()}
                        </List>
                    </ClickAwayListener>
                    </Paper>
                    </Grow>
                )}          
                </Popper>
            </React.Fragment>
        }
        />
    )
}

