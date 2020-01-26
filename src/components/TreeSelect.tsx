import React from 'react';
import { makeStyles, createStyles, Typography, Popper, ClickAwayListener } from '@material-ui/core';
import clsx from 'clsx';
import ImageButton from './ImageButton';
import TreeViewEx, { TreeNodeType } from './TreeViewEx';
import FontStyles from '~assets/tss/fontStyle';

export interface TreeSelectProps {
    style?: React.CSSProperties;
    className?: string;
    dropHeight?: React.CSSProperties["height"];
    onChanged?(value:TreeNodeType): void;
    data?: TreeNodeType[];
}

export default function TreeSelect(props: TreeSelectProps) {
    
    const [curNode, setCurNode] = React.useState<TreeNodeType|null>(null);
    const anchorEl = React.useRef<any>(null);
    const [dropDown, setDropDown] = React.useState(false);

    const {
        data = [],
        dropHeight = 280
    } = props;

    const classes = makeStyles(createStyles({
        root: {
            width: '100%',
            height: 28,
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            backgroundColor: 'rgba(255,255,255,0.1)',
            "&:hover": {
                cursor: "pointer"
            }
        },
        name: {
            marginLeft: 10,
            ...FontStyles.labelFont,
            fontSize: 12,
            color: 'rgba(255,255,255,0.7)',
            flexGrow: 1
        },
        poper: {
            height: dropHeight,
            width: anchorEl.current ? anchorEl.current.clientWidth : 280,
            zIndex: 1500,
            backgroundColor: '#303e44'
        }
    }))();

    const onTreeClicked = (node:TreeNodeType) => {
        setCurNode(node);
        setDropDown(false);
        if(props.onChanged) {
            props.onChanged(node);
        }
    };

    React.useEffect(() => {
        if(data && data.length > 0) {
            setCurNode(data[0]);
            if(props.onChanged) {
                props.onChanged(data[0]);
            }
        }
    }, [props.data]);

    const onClicked = () => {
        setDropDown(!dropDown);
    }

    return (
        <React.Fragment>
            <div className={clsx(classes.root,props.className)}
            ref={anchorEl}
            style={props.style}
            onClick={onClicked}
            >
                <Typography title={curNode ? curNode.name : ""} noWrap className={classes.name}>{curNode ? curNode.name : ""}</Typography>
                <ImageButton style={{marginRight:10}} 
                image={require('~assets/img/down.png')} 
                imageHover={require('~assets/img/down.png')}
                />
            </div>
            <Popper className={classes.poper} open={dropDown} anchorEl={anchorEl.current} placement="bottom">
                <div 
                style={{width:'100%',height:'100%',overflowY:'auto',overflowX:'hidden'}}>
                    <ClickAwayListener onClickAway={() => {setDropDown(false);}}>
                        <div style={{marginLeft:10,marginRight:10}}>
                            <TreeViewEx 
                            data={data}
                            defaultExpanded={data.map(el => el.id)} 
                            onClicked={onTreeClicked}
                            />
                        </div>
                    </ClickAwayListener>
                </div>          
            </Popper>
        </React.Fragment>
    )
}