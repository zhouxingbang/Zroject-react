import React from 'react';
import TextFieldEx, { TextFieldExProps } from './TextFieldEx';
import {
    InputAdornment,
    IconButton,
    makeStyles,
    createStyles,
    Typography, 
    Popper, 
    ClickAwayListener,
    List
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ListItemEx from './ListItemEx';
import FontStyles from '~assets/tss/fontStyle';

export interface SelectExProps extends TextFieldExProps {
    data?: string[];
    onChanged?(value:string): void;
}

export default function SelectEx(props:SelectExProps) {

    const {
        data = ['333', '44444'],
        defaultValue = "",
        ...other
    } = props;

    const anchorEl = React.useRef<any>(null);
    const [dropDown, setDropDown] = React.useState<boolean>(false);
    const [value, setValue] = React.useState(defaultValue);

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
            width: anchorEl.current ? anchorEl.current.clientWidth : 280,
            zIndex: 1500,
            backgroundColor: '#303e44'
        },
        dropText: {
            ...FontStyles.labelFont,
            '&:hover': {
                cursor: 'pointer',
                backgroundColor: 'red'
            }
        }
    }))();

    React.useEffect(() => {
        if(value !== defaultValue) {
            setValue(defaultValue);
            if(props.onChanged) {
                props.onChanged(defaultValue as string);
            }
        }
    }, [props.defaultValue]);

    const onDownClicked = () => {
        setDropDown(!dropDown);
    }

    const onChanged = (name:string):void => {
        setValue(name);
        if(props.onChanged) {
            props.onChanged(name);
        }
    }

    const onItemClicked = (name:string):void => {
        if(name !== value) {
            setValue(name);
        }
    }

    return (
        <React.Fragment>
            <TextFieldEx
            {...other}
            defaultValue={value}
            ref={anchorEl}
            handleChanged={onChanged}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton classes={{root: classes.arrowDown}} onClick={onDownClicked}>
                        <ArrowDropDownIcon fontSize='small' className={classes.arrowIcon}/>
                    </IconButton>
                </InputAdornment>
            }
            />
            <Popper 
            className={classes.poper} 
            open={dropDown} 
            anchorEl={anchorEl.current} 
            placement="bottom">
                <div 
                style={{width:'100%',height:'100%',overflowY:'auto',overflowX:'hidden'}}>
                    <ClickAwayListener onClickAway={() => {setDropDown(false);}}>
                        <div style={{marginLeft:10,marginRight:10}}>
                            <List style={{width:'100%'}}>
                                {data.map(el => (
                                    <ListItemEx key={el} 
                                    className={classes.dropText} 
                                    onClick={() => {onItemClicked(el);}}
                                    style={value !== el ? undefined : {backgroundColor:'red'}}
                                    >
                                        <Typography>{el}</Typography>
                                    </ListItemEx>
                                ))}
                            </List>
                        </div>
                    </ClickAwayListener>
                </div>          
            </Popper>
        </React.Fragment>
    )
}