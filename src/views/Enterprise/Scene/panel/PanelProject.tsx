import React from 'react';
import ExpandPanel, { PanelItem } from '~components/ExpandPanel';
import CompTree from './CompTree';
import { TreeNodeType } from '~components/TreeViewEx';
import AttrList, { ListAttrType } from '~components/AttrList';

export default function PanelProject() {

    const [nodeList, setNodeList] = React.useState<TreeNodeType[]>([]);
    const [attrList, setAttrList] = React.useState<ListAttrType[]>([]);

    const expandView = <CompTree data={nodeList}/>;

    React.useEffect(() => {
    }, []);

    return (
        <ExpandPanel title="项目概况">
            <AttrList data={attrList}/>
            <div style={{height:50}}/>
            <PanelItem expandView={expandView}>
                <div style={{height:24}}/>
                {expandView}
            </PanelItem>
        </ExpandPanel>
    )
}