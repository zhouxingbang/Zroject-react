import * as React from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import style from '~assets/jss/components/editFieldStyle';

export interface EditFieldProps {
    startIcon?: string | undefined;
    endAdornment?: React.ReactNode;
    defaultValue?: unknown;
    placeholder?: string;
    type?: string;
    handleChanged?(value:string): void;
};

const EditField = React.forwardRef((props: EditFieldProps, ref?: React.Ref<any>) => {

    const {
        defaultValue = "",
        handleChanged = (value:string) => void{},
    } = props;

    const [value, setValue] = React.useState(defaultValue);

    React.useEffect(() => {
        if(value !== defaultValue) {
            setValue(defaultValue);
            handleChanged(defaultValue as string);
        }
    }, [defaultValue]);

    const classes = makeStyles(createStyles(style))();

    const onChanged = (event: React.FormEvent) => {
        setValue((event.target as any).value);
        handleChanged((event.target as any).value);
    };

    return (
        <TextField
            variant="outlined"
            margin="dense"
            fullWidth
            autoComplete='off'
            inputRef={ref}
            type={props.type}
            value={value}
            onChange={onChanged}
            classes={{
                root: classes.root
            }}
            InputProps={{    
                startAdornment: (
                    props.startIcon && <InputAdornment position="start">
                        <img src={props.startIcon} alt=""/>
                    </InputAdornment>                    
                ),
                endAdornment: props.endAdornment,
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

export default EditField;