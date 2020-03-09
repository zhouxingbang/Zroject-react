import React from 'react';
import { 
    makeStyles, 
    createStyles,
    Typography
} from '@material-ui/core';
import TreeView from '@material-ui/lab/TreeView/TreeView';
import TreeItem, { TreeItemProps } from '@material-ui/lab/TreeItem/TreeItem';
import FontStyles from '~assets/tss/fontStyle';
import clsx from 'clsx';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

export type CheckState = 0 | 1 | 2; //< 0未勾选；1半勾选；2勾选
export type TriTreeNodeType = {
    id: string;
    name: string;
    image?: string;
    color?: string;
    children?: TriTreeNodeType[];
}

export type CheckFunction = (nodeId:string,isCheck:boolean) => void;

export interface TriTreeViewProps {
    className?: string;
    style?: React.CSSProperties;
    data?: TriTreeNodeType[];
    showArrow?: boolean;
    defaultExpanded?: string[];
    defaultChecked?: string[];
    onCheckChanged?(nodeIds:string[], isCheck:boolean): void;
}

interface TriTreeItemProps extends TreeItemProps {
    data: TriTreeNodeType;
    checkState?: CheckState;
    onChecked: (node:TriTreeNodeType, isCheck:boolean) => void;
}

const checkImages = [
    require('~assets/img/checkno.png'), 
    require('~assets/img/checkpartial.png'), 
    require('~assets/img/checkyes.png')
];

const TriTreeItem = React.forwardRef((props: TriTreeItemProps, ref?: React.Ref<any>) => {

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
        labelRoot: {
            height: 32
        },
        labelHeader: {
            float: 'left',
            width: '16px',
            height: '16px',
            marginTop: '8px'
        },
        labelText: {
            ...FontStyles.labelFont,
            float: 'left',           
            marginTop: 5,
            marginLeft: 5,
            width: 'calc(100% - 42px)'
        },
        labelCheck: {
            float: 'right',
            marginTop: 8,
            marginRight: 5,
        },
    }))();

    const {
        data,
        checkState = 0,
        ...other
    } = props;

    const onChecked = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        let isCheck:boolean = true;
        if(checkState === 2) {
            isCheck = false;
        }
        props.onChecked(data, isCheck);
        event.stopPropagation();
    }

    return (
        <TreeItem
        label={
            <div className={classes.labelRoot}>
                <div 
                className={classes.labelHeader} 
                style={!data.color ? {backgroundImage: `url(${data.image})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center'} : {backgroundColor: data.color}}
                />
                <Typography noWrap className={classes.labelText}>
                    {data.name}
                </Typography>
                <img className={classes.labelCheck} alt=""
                src={checkImages[checkState]}
                onClick={onChecked}
                />
            </div>
        }
        classes={{
            root: classes.root,
            content: classes.content
        }}
        {...other}
        />
    );
});

export default function TriTreeView(props: TriTreeViewProps) {

    const classes = makeStyles(createStyles({
        root: {
            overflowY: 'auto',
            overflowX: 'hidden'
        }
    }))();

    const {
        data = [],
        showArrow = false,
        defaultChecked = [],
        defaultExpanded = []
    } = props;

    const [expanded, setExpanded] = React.useState<string[]>(defaultExpanded);
    const [checked, setChecked] = React.useState<string[]>(defaultChecked);

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

    React.useEffect(() => {
        checked.sort();
        defaultChecked.sort();
        if(checked.length === defaultChecked.length 
            && checked.every((value:string,index:number):boolean => {
                return value === defaultChecked[index];
            })) {
                return;
            }
        setChecked(defaultChecked);
        if(props.onCheckChanged) {
            props.onCheckChanged(checked, true);
        }
    }, [props.defaultChecked]);

    const onNodeToggle = (event: React.ChangeEvent<{}>, nodeIds: string[]) => {
        setExpanded(nodeIds);
    };

    const onNodeChecked = (node:TriTreeNodeType, isCheck:boolean) => {
        let levelIds:string[] = [];
        function traverseNode(node:TriTreeNodeType) {
            if(!node.children || node.children.length<=0) {
                levelIds.push(node.id);
                return;
            }
            for(let i=0; i<node.children.length; i++) {
                traverseNode(node.children[i]);
            }
        }
        traverseNode(node);
        if(isCheck) {
            setChecked(checked.concat(levelIds.filter(el => !checked.includes(el))));
        }
        else {
            setChecked(checked.filter(el => !levelIds.includes(el)));
        }
        if(props.onCheckChanged) {
            props.onCheckChanged(levelIds, isCheck);
        }
    }

    const mapNodeState = React.useMemo(() => {
        let retValue = new Map<string,CheckState>();

        function getNodeState(node:TriTreeNodeType):CheckState {
            if(!node.children || node.children.length<=0) {
                let checkState:CheckState = checked.includes(node.id) ? 2: 0;
                retValue.set(node.id, checkState);
                return checkState;
            }
            let stateSum = 0;
            for(let i=0; i<node.children.length; i++) {
                stateSum += getNodeState(node.children[i]);
            }
            let checkState:CheckState = 2;
            if(stateSum <= 0) {
                checkState = 0;
            }
            else if(stateSum < node.children.length*2) {
                checkState = 1;
            }
            retValue.set(node.id, checkState);
            return checkState;
        }

        data.forEach(el => {
            getNodeState(el);
        });
        return retValue;

    }, [checked, props.data]);

    const createTriTreeItem = (nodeList?: TriTreeNodeType[]):React.ReactNodeArray => {

        if(!nodeList || nodeList.length <= 0) {
            return [];
        }
        let triTreeItemList:React.ReactNodeArray = [];
        nodeList.forEach((node:TriTreeNodeType) => {
            triTreeItemList.push(<TriTreeItem
            key={node.id}
            nodeId={node.id}
            data={node}
            onChecked={onNodeChecked}
            checkState={mapNodeState.get(node.id)}
            >
                {createTriTreeItem(node.children)}
            </TriTreeItem>);
        });
        return triTreeItemList;
    }

    return (
        <div className={clsx(classes.root,props.className)} style={props.style}>
            <TreeView
            defaultExpanded={defaultExpanded}
            defaultCollapseIcon={showArrow?null : <ExpandMoreIcon />}
            defaultExpandIcon={showArrow?null : <ChevronRightIcon />}
            onNodeToggle={onNodeToggle}
            expanded={expanded}
            >
                {createTriTreeItem(data)}
            </TreeView>
        </div>
    )
}