import * as React from 'react';
import { makeStyles, createStyles, Button, ButtonProps } from '@material-ui/core';
import style from '~assets/jss/components/buttonStyle';

export default function ButtonEx(props: ButtonProps) {
    
    const classes = makeStyles(createStyles(style))();

    return (
        <Button
        {...props}
        variant="contained"
        color="primary"
        classes={{
            root: classes.root,
            containedPrimary: classes.containedPrimary
        }}
        />
    )
}