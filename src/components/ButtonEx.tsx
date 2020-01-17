import React from 'react';
import { makeStyles, createStyles, Button, ButtonProps } from '@material-ui/core';
import FontStyles from '~assets/tss/fontStyle';

export default function ButtonEx(props: ButtonProps) {
    
    const classes = makeStyles(createStyles({
        root: {
            width: '100%',
            height: 36,
            background: 'linear-gradient(90deg, #0c89b8 0%, #5edfda 100%)',
            '&:hover': {
                boxShadow: '0px 0px 2px #0c89b8'
            }
        },
        containedPrimary: {
            ...FontStyles.labelFont
        }
    }))();

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