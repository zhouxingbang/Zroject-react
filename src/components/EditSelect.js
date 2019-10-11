import React, { useState } from 'react';
import { makeStyles, TextField, InputAdornment, createStyles, IconButton } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const useSelectStyles = makeStyles(createStyles({
  root: {
    height: '36px',
    backgroundColor: '#414458'
  },
  outlineRoot: {
    backgroundColor:'transparent',
    height: '100%',
    borderWidth: '0px'
  },
  adornedEnd: {
    paddingRight: '5px'
  },
  input: {
    marginLeft: '20px',
    fontSize: '12px',
    color: '#ffffff',
    fontFamily: 'Microsoft YaHei'
  },
  arrowDown: {
    width: '16px',
    height: '16px',
    color: '#fff'
  },
  arrowIcon: {
    marginTop: '-10px'
  },
  popItem: {
    color: '#ffffff', 
    fontSize: '12px', 
    fontFamily: 'Microsoft YaHei'
  }
}));

export default function EditSelect(props) {
  const classes = useSelectStyles();

  const {
    icon = "",
    options = [], 
    handleChange = (val) => {},
    ...other
  } = props;

  const inputRef = React.useRef(null);
  const textFieldRef = React.useRef(null);
  const arrowRef = React.useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);

  function handleToggle() {
    setMenuOpen(!menuOpen);
  }

  function handleClose(event) {
    if (arrowRef.current && arrowRef.current.contains(event.target)) {
      return;
    }
    setMenuOpen(false);
  }

  function handleSelect(option) {
    handleChange(option);
    inputRef.current.value = option;
  }

  return (
    <React.Fragment>
      <TextField
            ref={textFieldRef}
            {...other}
            type='text'
            variant="outlined"
            inputRef={inputRef}
            onChange={(e) => {handleChange(e.target.value);}}
            margin="dense"              
            autoComplete='off'
            fullWidth
            classes = {{
              root: classes.root
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <img src={icon} alt="" />
                    </InputAdornment>                    
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton classes={{root: classes.arrowDown}} onClick={handleToggle}>
                    <ArrowDropDownIcon fontSize='small' className={classes.arrowIcon}/>
                    </IconButton>
                  </InputAdornment>
                ),
                classes: {
                  root: classes.outlineRoot,
                  input: classes.input,
                  adornedEnd: classes.adornedEnd
                }
            }}
      />
      <Popper style={{width: '100%', zIndex: '1500'}} open={menuOpen} anchorEl={textFieldRef.current} container={textFieldRef.current} transition>
      {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper style={{backgroundColor: '#414458'}}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList>
                {options.map(option => (
                  <MenuItem className={classes.popItem} key={option} selected={option === inputRef.current.value} onClick= {(e) => {handleSelect(option); handleClose(e);}}>
                    {option}
                  </MenuItem>
                ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}          
      </Popper>
    </React.Fragment>            
  )

};