import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

// 资源
import * as Images from "../res/Images";

export class TriTreeNode {

    constructor() {
        this.id = "";
        this.name = "";                
        this.image = "";
        this.color = "";        
        this.childs = [];
        this.checkState = 0; 
    }
    
    appendChild(node) {
        if(node instanceof TriTreeNode) {
            this.childs.push(node);
        }       
    }
}

const TriTreeItem = React.forwardRef((props, ref) => {
    const classes = makeStyles(createStyles({
        root: {            
            '& > $content': {
                color: '#fff'
            },
            '&:focus > $content': {
                backgroundColor: '#44414458',
                color: '#fff',
            },
        },
        content: {
            
        },
        label: {
            height: '32px',
        },
        header: {
            float: 'left',
            marginTop: '8px',
            width: '16px',
            height: '16px',
        },
        title: {
            float: 'left',           
            marginTop: '5px',
            marginLeft: '5px',
            color: '#fff',
            fontSize: '14px', 
            fontFamily: 'Microsoft YaHei',
        },
        checkBox: {
            float: 'right',
            marginTop: '8px',
            marginRight: '5px',
        },
    }))();

    const {        
        name,
        color = "",
        image = "",
        checkState = 0,
        onCheck = (id, chkState) => {},
        ...other
    } = props;

    const checkImages = [Images.CheckNo, Images.CheckPartial, Images.CheckYes];
    
    function checkToggle(e) {
        let chkState = 2;
        if(checkState === 2) {
            chkState = 0;
        }
        onCheck(props.nodeId, chkState);
        e.stopPropagation();        
    }

    return (
        <TreeItem
        label={
            <div className={classes.label}>
                {color===""?<img src={image} className={classes.header} alt='' /> : <div style={{backgroundColor: color}} className={classes.header} />}
                <Typography className={classes.title}>
                    {name}
                </Typography>
                <img className={classes.checkBox} alt=""
                src={checkImages[checkState]}
                onClick={checkToggle}
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

const TriTreeView = React.forwardRef((props, ref) => {
    const classes = makeStyles(createStyles({
        root: {
            overflowY: 'auto'
        }
    }))();
    
    const {
        className,
        nodeList = [],
        checkChanged = (ids) => {},
        ...other
    } = props;

    const [changedIds, setChangedIds] = useState([]);
    
    function handleCheck(curId, curCheck) {
        let curChgIds = [];
        function setNodeState(node) {
            node.checkState = curCheck;
            if(node.childs.length<=0) {
                curChgIds.push(node.id);
                return;
            }
            for(let i=0; i<node.childs.length; i++) {
                setNodeState(node.childs[i]);
            }
        }
        function traverseChild(child) {
            if(child.childs.length<=0) return child.checkState;
            let stateTmp = 0;
            for(let i=0; i<child.childs.length; i++) {
                if(child.childs[i].id === curId) {
                    setNodeState(child.childs[i]);
                    stateTmp+=curCheck;
                    continue;
                }
                stateTmp+=traverseChild(child.childs[i]);
            }
            let chkState = 2;
            if(stateTmp<=0){
                chkState=0;
            }
            else if(stateTmp<child.childs.length*2){
                chkState = 1;
            }
            child.checkState=chkState;
            return chkState;
        }        
        for(let i=0; i<nodeList.length; i++) {
            let root = nodeList[i];
            if(root.id === curId){
                setNodeState(root);
                continue;
            }
            traverseChild(root);
        }
        checkChanged(curChgIds);
        setChangedIds(curChgIds);        
    }

    function createTreeItem(childs) {
        if(childs.length <= 0) return;
        let itemList = [];
        for(let i=0; i<childs.length; ++i) {
            let child = childs[i];
            itemList.push(<TriTreeItem key={child.id} nodeId={child.id}
            name={child.name}
            image={child.image}
            color={child.color}
            onCheck={handleCheck}
            checkState={child.checkState}
            >
            {
                createTreeItem(child.childs)
            }
            </TriTreeItem>);
        }
        return itemList;       
    }

    return (
        <div className={clsx(className,classes.root)} {...other}>
            <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            >
                {nodeList.map(root => (
                    <TriTreeItem key={root.id} nodeId={root.id}
                    name={root.name}
                    image={root.image}
                    color={root.color}
                    onCheck={handleCheck}
                    checkState={root.checkState}
                    >
                    { 
                        createTreeItem(root.childs)
                    }
                    </TriTreeItem>
                ))}
            </TreeView>
        </div>        
    )
});

export default TriTreeView;