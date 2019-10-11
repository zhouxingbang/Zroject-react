import React from 'react';
import { makeStyles, TextField, InputAdornment, createStyles} from '@material-ui/core';

const IconInput = React.forwardRef((props, ref) => {
    const classes = makeStyles(createStyles({
        root: {
            height: '36px',
            color: '#ffffff',
            backgroundColor: '#414458'
        },
        outlineRoot: {
            position: 'relative',
            backgroundColor:'transparent',
            height: '100%',
            borderWidth: '0px'
        },
        input: {
            marginLeft: '20px',
            fontSize: '12px',
            color: '#ffffff',
            fontFamily: 'Microsoft YaHei'
        }
    }))();

    const {
        icon = "",
        handleChange = (val) => {},
        ...other
    } = props;

    return (
        <TextField
            {...other}
            variant="outlined"
            onChange={ (e) => {handleChange(e.currentTarget.value)} }
            margin="dense"
            fullWidth
            autoComplete='off'
            inputRef={ref}            
            classes={{root: classes.root}}
            InputProps={{    
                startAdornment: (
                    <InputAdornment position="start">
                        <img src={icon} alt="" />
                    </InputAdornment>                    
                ),
                classes: {
                    root: classes.outlineRoot,
                    input: classes.input
                }
            }}
        />      
    )
});

export default IconInput;