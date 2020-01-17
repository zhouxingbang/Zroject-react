import React from 'react';
import ExpandPanel, { PanelItem } from '~components/ExpandPanel';
import CompTree from './CompTree';
import { TreeNodeType } from '~components/TreeViewEx';
import AttrGrid, { GridAttrType } from '~components/AttrGrid';

export default function PanelBimProject() {

    const [nodeList, setNodeList] = React.useState<TreeNodeType[]>([]);
    const [attrList, setAttrList] = React.useState<GridAttrType[]>([]);

    const expandView = <CompTree data={nodeList}/>;

    React.useEffect(() => {
        setAttrList([
        ])
    }, []);

    return (
        <ExpandPanel title="工程概况">
            <AttrGrid data={attrList}/>
            <div style={{height:50}}/>
            <PanelItem expandView={expandView}>
                <div style={{height:24}}/>
                {expandView}
            </PanelItem>              
        </ExpandPanel>
    )
}