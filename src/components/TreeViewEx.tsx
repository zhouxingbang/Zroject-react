import React from 'react';
import TreeView from '@material-ui/lab/TreeView/TreeView';
import TreeItem, { TreeItemProps } from '@material-ui/lab/TreeItem/TreeItem';
import { makeStyles, 
    createStyles, 
    Box,
    Typography
 } from '@material-ui/core';
import Expanded from '~assets/img/expanded.png';
import ExpandedHover from '~assets/img/expanded_hover.png';
import Collapse from '~assets/img/collapse.png';
import CollapseHover from '~assets/img/collapse_hover.png';
import clsx from 'clsx';

let TreeViewContext = require('@material-ui/lab/TreeView/TreeViewContext');

export type TreeNodeType = {
    id: string;
    name: string;
    icon?: string;
    status?: [string,string];
    children?: TreeNodeType[];
}

export interface TreeViewExProps {
    defaultExpanded?: string[];
    filterText?: string;
    data?: TreeNodeType[];
    onClicked?: (node:TreeNodeType) => void;
    onLevelDoubleClicked?: (node:TreeNodeType) => void;
    className?: string;
    style?: React.CSSProperties;
}

interface TreeItemExProps {
    data: TreeNodeType;
    onClicked?: (node:TreeNodeType) => void;
    onLevelDoubleClicked?: (node:TreeNodeType) => void;
}

const TreeItemEx = React.forwardRef((props: TreeItemExProps & TreeItemProps, ref?: React.Ref<any>) => {

    const {
        children,
        ...other
    } = props;

    const {
        isExpanded
    } = React.useContext(TreeViewContext.default);

    const expandable = Boolean(Array.isArray(children) ? children.length : 0);
    const expanded = isExpanded ? isExpanded(props.data.id) : false;
    const [hovered, setHovered] = React.useState<boolean>(false);

    const classes = makeStyles(createStyles({
        root: {            
            '& > $content': {
                color: '#fff'
            },
            '&:focus > $content': {
                backgroundColor: 'rgba(255,255,255,0.1)'
            }
        },
        content: {
            '&:hover': {
                backgroundColor: 'rgba(255,255,255,0.1)'
            }
        },
        label: {
            height: 32
        },
        icon: {
            width: 16,
            height: 16,
            backgroundImage: `url(${props.data.icon})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
        },
        expand: {
            width: 16,
            height: 16,
            backgroundImage: `url(${expanded ? (hovered ? ExpandedHover : Expanded) : (hovered ? CollapseHover : Collapse)})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
        },
        name: {
            flexGrow: 1,
            color: `${hovered ? 'rgba(12, 194, 228, 0.9)' : 'rgba(255, 255, 255, 0.9)'}`,
            fontSize: 14,
            fontFamily: 'Microsoft YaHei'
        }
    }))();

    const onDoubleClicked = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        if(!expandable && props.onLevelDoubleClicked) {
            props.onLevelDoubleClicked(props.data);
        }
    };

    const onClicked = () => {
        if(props.onClicked) {
            props.onClicked(props.data);
        }
    }

    return (
        <TreeItem
        {...other}
        ref={ref}
        children={children}
        onDoubleClick={onDoubleClicked}
        label={
            <Box display="flex" alignItems="center" className={classes.label} onMouseEnter={() => {setHovered(true);}} onMouseLeave={() => {setHovered(false);}}>
                {props.data.icon && <React.Fragment>
                    <div className={classes.icon}/>
                    <div style={{width:5}}/>
                </React.Fragment>}
                <Typography noWrap className={classes.name} onClick={onClicked}>
                    {props.data.name}{props.data.status && <span style={{color:props.data.status[0]}}>（{props.data.status[1]}）</span>}
                </Typography>
                {expandable && <React.Fragment>
                    <div style={{width:10}}/>
                    <div className={classes.expand}/>
                </React.Fragment>}
            </Box>
        }
        classes={{
            root: classes.root,
            content: classes.content
        }}
        />
    )
});

export default function TreeViewEx(props: TreeViewExProps) {
    
    const classes = makeStyles(createStyles({
        root: {
            overflowY: 'auto',
            overflowX: 'hidden'
        }
    }))();
    
    const {
        defaultExpanded = [],
        data = []
    } = props;

    const [expanded, setExpanded] = React.useState<string[]>(defaultExpanded);

    React.useEffect(() => {
        expanded.sort();
        defaultExpanded.sort();
        if(expanded.length === defaultExpanded.length 
            && expanded.every((value:string,index:number):boolean => {
                return value === defaultExpanded[index];
            })) {
                return;
            }
        setExpanded(defaultExpanded);
    }, [props.defaultExpanded]);

    const onNodeToggle = (event: React.ChangeEvent<{}>, nodeIds: string[]) => {
        setExpanded(nodeIds);
    };

    const filterNode = (node:TreeNodeType):boolean => {
        if(!props.filterText || node.name.includes(props.filterText)) {
            return true;
        }
        let flag:boolean = false;
        if(Array.isArray(node.children)) {
            for(let i=0; i< node.children.length; ++i) {
                flag = filterNode(node.children[i]);
                if(flag) break;
            }
        }
        return flag;
    };

    const createTreeItem = (nodeList?: TreeNodeType[]):React.ReactNodeArray => {
        if(!nodeList || nodeList.length <= 0 ) {
            return [];
        }
        let treeItemList:React.ReactNodeArray = [];
        nodeList.forEach((node:TreeNodeType) => {
            if(filterNode(node)) {
                treeItemList.push(<TreeItemEx
                key={node.id}
                nodeId={node.id}
                data={node}
                onLevelDoubleClicked={props.onLevelDoubleClicked}
                >
                    {createTreeItem(node.children)}
                </TreeItemEx>);
            }
        });
        return treeItemList;
    }

    return (
        <div className={clsx(props.className,classes.root)} style={props.style}>
            <TreeView
            defaultCollapseIcon={null}
            defaultExpandIcon={null}
            onNodeToggle={onNodeToggle}
            expanded={expanded}
            className={props.className}
            style={props.style}
            >
                {createTreeItem(data)}
            </TreeView>
        </div>
        
    )
}