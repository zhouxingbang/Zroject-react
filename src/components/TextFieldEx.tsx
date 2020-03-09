import React from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

export interface TextFieldExProps {
    startIcon?: string;
    endAdornment?: React.ReactNode;
    onChanged?(value:string): void;
    height?: React.CSSProperties['height'];
    readonly?: boolean;
    defaultValue?: unknown;
    type?: string;
    placeholder?: string;
};

const TextFieldEx = React.forwardRef((props: TextFieldExProps, ref?: React.Ref<any>) => {

    const {
        defaultValue = "",
        height = 32,
        readonly = false
    } = props;

    const [value, setValue] = React.useState(defaultValue);

    React.useEffect(() => {
        if(value !== defaultValue) {
            setValue(defaultValue);
            if(props.onChanged) props.onChanged(defaultValue as string);
        }
    }, [defaultValue]);

    const classes = makeStyles(createStyles({
        root: {
            height: height,
            minHeight: height,
            color: '#fff',
            backgroundColor: 'transparent',
            '&.MuiFormControl-marginDense': {
                marginTop: 0,
                marginBottom: 0
            }
        },
        outline: {
            backgroundColor: 'transparent',
            height: '100%',
            border: '1px solid #ffffff2d',
            borderRadius: 0,
            '&:hover': {
                borderColor: '#2997b4'
            },
            '& > .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent'
            },
            '&.Mui-focused > .MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent'
            },
            '&.Mui-focused': {
                borderColor: '#2997b4'
            }
        },
        input: {
            marginLeft: 0,
            fontSize: 12,
            color: '#fff',
            fontFamily: 'Microsoft YaHei'
        },
        adornedStart: {
            paddingLeft: 10
        },
        adornedEnd: {
            paddingRight: 0
        },
        notchedOutline: {
            borderColor: 'transparent'
        }
    }))();

    const handleChange = (event: any) => {
        setValue((event.target as any).value);
        if(props.onChanged) props.onChanged((event.target as any).value as string);
    };

    return (
        <TextField
            ref={ref}
            variant="outlined"
            margin="dense"
            fullWidth
            autoComplete='off'
            type={props.type}
            placeholder={props.placeholder}
            value={value}
            onChange={handleChange}
            classes={{
                root: classes.root
            }}
            InputProps={{
                readOnly: readonly,
                startAdornment: (
                    props.startIcon && <InputAdornment position="start">
                        <img src={props.startIcon} alt=""/>
                    </InputAdornment>                    
                ),
                endAdornment: (props.endAdornment && <InputAdornment position="end">
                    {props.endAdornment}
                </InputAdornment>),
                classes: {
                    root: classes.outline,
                    input: classes.input,
                    adornedStart: classes.adornedStart,
                    adornedEnd: classes.adornedEnd,
                    notchedOutline: classes.notchedOutline
                }
            }}
        />
    )
});

export default TextFieldEx;