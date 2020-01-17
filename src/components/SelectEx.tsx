import React from 'react';
import TextFieldEx, { TextFieldExProps } from './TextFieldEx';
import {
    InputAdornment,
    IconButton,
    makeStyles,
    createStyles,
    Typography, 
    Popper, 
    ClickAwayListener
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

export interface SelectExProps extends TextFieldExProps {
    data?: string[];
}

export default function SelectEx(props:SelectExProps) {

    const {
        data = [],
        ...other
    } = props;

    const anchorEl = React.useRef<any>(null);
    const [dropDown, setDropDown] = React.useState<boolean>(false);

    const classes = makeStyles(createStyles({
        arrowDown: {
            width: 16,
            height: 16,
            color: '#fff'
        },
        arrowIcon: {
            marginTop: -10
        },
        poper: {
            //height: dropHeight,
            width: anchorEl.current ? anchorEl.current.clientWidth : 280,
            zIndex: 1500,
            backgroundColor: '#303e44'
        }
    }))();

    const onDownClicked = () => {
        setDropDown(!dropDown);
    }

    return (
        <React.Fragment>
            <TextFieldEx
            {...other} 
            ref={anchorEl}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton classes={{root: classes.arrowDown}} onClick={onDownClicked}>
                        <ArrowDropDownIcon fontSize='small' className={classes.arrowIcon}/>
                    </IconButton>
                </InputAdornment>
            }
            />
            <Popper className={classes.poper} open={dropDown} anchorEl={anchorEl.current} placement="bottom">
                <div 
                style={{width:'100%',height:'100%',overflowY:'auto',overflowX:'hidden'}}>
                    <ClickAwayListener onClickAway={() => {setDropDown(false);}}>
                        <div style={{marginLeft:10,marginRight:10}}>
                        </div>
                    </ClickAwayListener>
                </div>          
            </Popper>
        </React.Fragment>
    )
}