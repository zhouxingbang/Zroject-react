import React from 'react';
import TextFieldEx, { TextFieldExProps } from './TextFieldEx';
import {
    InputAdornment,
    IconButton,
    makeStyles,
    createStyles,
    Popper, 
    ClickAwayListener,
    List
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ListItemEx from './ListItemEx';
import FontStyles from '~assets/tss/fontStyle';

export interface SelectExProps extends TextFieldExProps {
    data?: string[];
}

export default function SelectEx(props: SelectExProps) {

    const {
        data = [],
        defaultValue = "",
        onChanged = (value:string) => void {},
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
                color: '#0fbdda'
            }
        }
    }))();

    React.useEffect(() => {
        if(value !== defaultValue) {
            setValue(defaultValue);
            onChanged(defaultValue as string);
        }
    }, [props.defaultValue]);

    const onDownClicked = () => {
        setDropDown(!dropDown);
    }

    const handleChanged = (name:string):void => {
        setValue(name);
        onChanged(name);
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
            onChanged={handleChanged}
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
                            <List style={{width:'100%',paddingTop:0,paddingBottom:0}}>
                                {data.map(el => (
                                    <ListItemEx key={el} 
                                    onClick={() => {setDropDown(false);onItemClicked(el);}}
                                    className={classes.dropText}
                                    style={value !== el ? undefined : {color:'#0fbdda'}}
                                    >
                                        {el}
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