import React from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import { 
    ListItem,
    ListItemProps
} from '@material-ui/core';

export default function ListItemEx(props: ListItemProps<'a', { button?: false }>) {
    const classes = makeStyles(createStyles({
        root: {
            paddingTop: 5,
            paddingBottom: 5,
        },
        gutters: {
            paddingLeft: 0,
            paddingRight: 0
        }
    }))();

    return (
        <ListItem button={false} component="a" classes={{ root:classes.root, gutters:classes.gutters}} {...props}/>
    )
}