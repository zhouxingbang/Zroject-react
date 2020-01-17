import React from 'react';
import TreeViewEx, { TreeNodeType } from '~components/TreeViewEx';
import TextFieldEx from '~components/TextFieldEx';
import {
    makeStyles,
    createStyles,
    Box
} from '@material-ui/core';

const CompTree = React.forwardRef((props: {data: TreeNodeType[]}, ref?:React.Ref<any>) => {

    const classes = makeStyles(createStyles({
        root: {
            width: '100%',
            height: '100%',
            overflow: 'hidden'
        },
        treeView: {
            width: '100%',
            flexGrow: 1
        }
    }))();

    const [search, setSearch] = React.useState<string>("");

    const onSearch = (value:string):void => {
        setSearch(value);
    }

    const onLevelDoubleClicked = (node:TreeNodeType):void => {

    }

    return (
        <div ref={ref} className={classes.root}>
            <Box display="flex" flexDirection="column" style={{width:'100%',height:'100%'}}>
                <TextFieldEx
                startIcon={require('~assets/img/search.png')}
                handleChanged={onSearch}
                height={26}
                />
                <div style={{height:24}}/>
                <TreeViewEx
                className={classes.treeView}
                filterText={search}
                onLevelDoubleClicked={onLevelDoubleClicked}
                data={props.data}
                />
            </Box>
        </div>
    )
});

export default CompTree;