import React from 'react';
import {
    makeStyles,
    createStyles,
    Box,
    Typography
} from '@material-ui/core';
import SearchOption, { OptionType } from '~components/SearchOption';
import Pagination from '~components/Pagination';
import IconStatusList, { IconStatusItemType } from '~components/IconStatusList';
import { ExpandPanelContext, PanelItem } from '~components/ExpandPanel';
import FontStyles from '~assets/tss/fontStyle';
import TreeSelect from '~components/TreeSelect';
import { TreeNodeType } from '~components/TreeViewEx';

const PAGE_SIZE = 30;

export interface DocQueryParamter {
    currentPage: number;
    search?: string;
    option?: OptionType;
    pageSize: number;
}

export interface DocData {
    data: IconStatusItemType[];
    current: number;
    total: number;
}

export type BimDocViewFunction = {
    getOptions(fnRet:(data:OptionType[]) => void): void;
    getPathTree(fnRet:(data:TreeNodeType[]) => void): void;
    getDocData(query:DocQueryParamter, fnRet:(data:DocData) => void): void;
    handleDoc(value:IconStatusItemType): void;
}

export const BimDocViewContext = React.createContext<BimDocViewFunction>({
    getOptions: (fnRet:(data:OptionType[]) => void) => void {},
    getPathTree: (fnRet:(data:TreeNodeType[]) => void) => void {},
    getDocData: (query:DocQueryParamter, fnRet:(data:DocData) => void) => void {},
    handleDoc: (value:IconStatusItemType)=> void {}
});

const DocExpandView = React.forwardRef((props:{}, ref?:React.Ref<any>) => {

    const classes = makeStyles(createStyles({
        root: {
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: "column",
            alignItems: "flex-start"
        },
        pagination: {
            width:'100%'
        }
    }))();

    const [optionList, setOptionList] = React.useState<OptionType[]>([]);
    const [pathNodeList, setPathNodeList] = React.useState<TreeNodeType[]>([]);
    const [docList, setDocList] = React.useState<IconStatusItemType[]>([]);
    const [pageInfo, setPageInfo] = React.useState({current:1,total:1});
    const [queryInfo, setQueryInfo] = React.useState({currentPage:1,search:"",optionIndex:0,pageSize:PAGE_SIZE});

    const {
        getOptions,
        getDocData,
        handleDoc
    } = React.useContext(BimDocViewContext);

    React.useEffect(() => {
        getOptions(setOptionList);
        setPathNodeList([{id:"total", name:"全部", children:[
            {id:"child01", name:"子目录01"},
            {id:"child02", name:"子目录02"},
            {id:"child03", name:"子目录03"}
        ]}])
    }, []);

    React.useEffect(() => {
        
    }, [queryInfo]);

    const onPageChanged = (page:number) => {
        let query = JSON.parse(JSON.stringify(queryInfo));
        query.currentPage = page;
        setQueryInfo(query);
    };

    const onSearchChanged = (value:string) => {
        let query = JSON.parse(JSON.stringify(queryInfo));
        query.search = value;
        setQueryInfo(query);
    };

    const onOptionChanged = (index:number, option:OptionType) => {
        let query = JSON.parse(JSON.stringify(queryInfo));
        query.optionIndex = index;
        setQueryInfo(query);
    };

    return (
        <div ref={ref} className={classes.root}>
            <SearchOption optionList={optionList} optionWidth={80} searchChanged={onSearchChanged} optionChanged={onOptionChanged}/>
            <div style={{height:14}}/>
            <TreeSelect data={pathNodeList}/>
            <div style={{width:'100%',height:30}}/>
            <Box display="flex" style={{width:'100%',overflowX:'hidden',overflowY:'auto'}} alignItems="flex-start" flexGrow={1}>
                <IconStatusList style={{width:'100%'}} data={docList} onDoubleClicked={handleDoc}/>
            </Box>
            <div style={{width:'100%',height:10}}/>
            <Pagination className={classes.pagination} {...pageInfo} onPageChanged={onPageChanged}/>
            <div style={{width:'100%',height:20}}/>
        </div>
    )
});

export default function BimDocView(props:{title?:string,className?:string}) {

    const {
        expand
    } = React.useContext(ExpandPanelContext);

    const expandView = <DocExpandView />;
    const [docList, setDocList] = React.useState<IconStatusItemType[]>([]);

    const {
        getOptions,
        getDocData,
        handleDoc
    } = React.useContext(BimDocViewContext);

    React.useEffect(() => {
        setDocList([
            {title:"测试01",icon:require('~assets/img/ico_doc.png'),iconColor:'red',name:'测试01',nameColor:"red",desc:"2019/12/30 05:59:59"},
            {title:"测试002",icon:require('~assets/img/ico_doc.png'),iconColor:'red',name:'测试01',desc:"2019/12/30 05:59:59"},
            {title:"测试00004",icon:require('~assets/img/ico_doc.png'),iconColor:'red',name:'测试01',nameColor:"red",desc:"2019/12/30 05:59:59"},
            {title:"测试00005",icon:require('~assets/img/ico_doc.png'),iconColor:'red',name:'测试01',nameColor:"red",desc:"2019/12/30 05:59:59"}
        ])
    }, []);

    return (
        <PanelItem className={props.className} expandView={expandView}>
            {props.title && <React.Fragment>
            <Typography style={FontStyles.titleFont}>{props.title}</Typography>
            <div style={{height:30}}/>
            </React.Fragment>}
            <SearchOption optionWidth={80} onClick={() => {expand(expandView);}}/>
            <div style={{height:30}}/>
            <IconStatusList style={{width:'100%'}} data={docList} onDoubleClicked={handleDoc}/>
        </PanelItem>
    )
}