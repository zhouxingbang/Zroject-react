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

const PAGE_SIZE = 30;

export interface CoQueryParamter {
    currentPage: number;
    search?: string;
    option?: OptionType;
    pageSize: number;
}

export interface CoData {
    data: IconStatusItemType[];
    current: number;
    total: number;
}

export type BimCoViewFunction = {
    getOptions(fnRet:(data:OptionType[]) => void): void;
    getCoData(query:CoQueryParamter, fnRet:(data:CoData) => void): void;
    handleCo(value:IconStatusItemType): void;
}

export const BimCoViewContext = React.createContext<BimCoViewFunction>({
    getOptions: (fnRet:(data:OptionType[]) => void) => void {},
    getCoData: (query:CoQueryParamter, fnRet:(data:CoData) => void) => void {},
    handleCo: (value:IconStatusItemType)=> void{}
});

const CoExpandView = React.forwardRef((props:{}, ref?:React.Ref<any>) => {

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
    const [coList, setCoList] = React.useState<IconStatusItemType[]>([]);
    const [pageInfo, setPageInfo] = React.useState({current:1,total:1});
    const [queryInfo, setQueryInfo] = React.useState({currentPage:1,search:"",optionIndex:0,pageSize:PAGE_SIZE});

    const {
        getOptions,
        getCoData,
        handleCo
    } = React.useContext(BimCoViewContext);

    React.useEffect(() => {
        getOptions(setOptionList);
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
            <div style={{width:'100%',height:30}}/>
            <Box display="flex" style={{width:'100%',overflowX:'hidden',overflowY:'auto'}} alignItems="flex-start" flexGrow={1}>
                <IconStatusList style={{width:'100%'}} data={coList} onDoubleClicked={handleCo}/>
            </Box>
            <div style={{width:'100%',height:10}}/>
            <Pagination className={classes.pagination} {...pageInfo} onPageChanged={onPageChanged}/>
            <div style={{width:'100%',height:20}}/>
        </div>
    )
});

export default function BimCoView(props:{title?:string,className?:string}) {

    const {
        expand
    } = React.useContext(ExpandPanelContext);

    const expandView = <CoExpandView />;
    const [coList, setCoList] = React.useState<IconStatusItemType[]>([]);

    const {
        getOptions,
        getCoData,
        handleCo
    } = React.useContext(BimCoViewContext);

    React.useEffect(() => {

    }, []);

    return (
        <PanelItem className={props.className} expandView={expandView}>
            {props.title && <React.Fragment>
            <Typography style={FontStyles.titleFont}>{props.title}</Typography>
            <div style={{height:30}}/>
            </React.Fragment>}
            <SearchOption optionWidth={80} onClick={() => {expand(expandView);}}/>
            <div style={{height:30}}/>
            <IconStatusList style={{width:'100%'}} data={coList} onDoubleClicked={handleCo}/>
        </PanelItem>
    )
}