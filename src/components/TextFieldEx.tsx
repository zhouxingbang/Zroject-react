import React from 'react';
import { TextField, InputAdornment, BaseTextFieldProps } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

export interface TextFieldExProps extends BaseTextFieldProps {
    startIcon?: string | undefined;
    endAdornment?: React.ReactNode;
    handleChanged?(value:string): void;
    height?: React.CSSProperties['height'];
    readonly?: boolean;
};

const TextFieldEx = React.forwardRef((props: TextFieldExProps, ref?: React.Ref<any>) => {

    const {
        startIcon,
        endAdornment,
        defaultValue = "",
        placeholder,
        type,
        handleChanged = (value:string):void => {},
        height = 32,
        readonly = false,
        ...other
    } = props;

    const [value, setValue] = React.useState(defaultValue);

    React.useEffect(() => {
        if(value !== defaultValue) {
            setValue(defaultValue);
            handleChanged(defaultValue as string);
        }
    }, [props.defaultValue]);

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

    const onChanged = (event: React.FormEvent) => {
        setValue((event.target as any).value);
        handleChanged((event.target as any).value);
    };

    return (
        <TextField
            {...other}
            ref={ref}
            variant="outlined"
            margin="dense"
            fullWidth
            autoComplete='off'
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChanged}
            classes={{
                root: classes.root
            }}
            InputProps={{
                readOnly: readonly,
                startAdornment: (
                    startIcon && <InputAdornment position="start">
                        <img src={startIcon} alt=""/>
                    </InputAdornment>                    
                ),
                endAdornment: (endAdornment && <InputAdornment position="end">
                    {endAdornment}
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