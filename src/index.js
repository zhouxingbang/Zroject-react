import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Login from './Login';
import TriTreeView, {TriTreeNode} from './components/TriTreeView';
import { height } from '@material-ui/system';

let weidingyi = new TriTreeNode();
weidingyi.id='weidingyi';
weidingyi.name='未定义状态构件';
weidingyi.image=Image.WeiDingYi;

let yidingyi = new TriTreeNode();
yidingyi.id='yidingyi';
yidingyi.name='已定义状态构件';
yidingyi.image=Image.YiDingYi;
let biaoduan = new TriTreeNode();
biaoduan.id='biaoduan';
biaoduan.name='3#下穿通道-基坑';
biaoduan.image=Image.Spot;
let yanse = new TriTreeNode();
yanse.id='yanse';
yanse.name='水泥搅拌桩';
yanse.color='blue';
biaoduan.appendChild(yanse);
yanse = new TriTreeNode();
yanse.id='yanse11';
yanse.name='水泥搅拌桩11';
yanse.color='red';
biaoduan.appendChild(yanse);
yidingyi.appendChild(biaoduan);

ReactDOM.render(<TriTreeView style={{width: 200, height: 100}} nodeList={[weidingyi,yidingyi]}/>, document.querySelector('#root'));

//ReactDOM.render(<Login />, document.querySelector('#root'));