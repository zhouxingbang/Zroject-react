import React, { useState, useEffect } from 'react';
import { Button, makeStyles, createStyles, Checkbox, FormControlLabel } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import EditSelect from './components/EditSelect';
import IconInput from './components/IconInput';
import AppData from './AppData';

// 资源
import * as Images from "./res/Images";

const useShellStyles = makeStyles(createStyles({
    root: {
        width: '100%',
        height: '100vh',
        backgroundColor: '#272937',
        overflow: 'hidden'
    },
    login: {
        position: 'absolute',
        left: '50%',
        top: '49%',
        width: '300px',
        transform: 'translate(-50%,-50%)'
    },
    logo: {
        transform: 'translate(-3px,0)'
    },
    userInput: {
        marginTop: '84px'
    },
    passwdInput: {
        marginTop: '10px'
    },
    serverInput: {
        marginTop: '10px'
    },
    checkDiv: {
        marginTop: '5px',
        width: '100%'
    },
    checkRoot: {
        height: '12px'
    },
    checkLabel: {
        color: '#ffffff', 
        fontSize: '12px', 
        fontFamily: 'Microsoft YaHei',
        opacity: '0.8'
    },
    error: {
        marginTop: '60px',
        width: '100%',
        height: '24px'
    },
    buttonRoot: {
        color: '#ffffff', 
        fontSize: '12px', 
        fontFamily: 'Microsoft YaHei'
    },
    button: {
        width: '100%',
        height: '36px',
        background: 'linear-gradient(90deg, #2997b4 0%, #255187 100%)',
        '&:hover': {
            background: 'linear-gradient(90deg, #255187 0%, #2997b4 100%)'
        }
    }
}));

export default function Shell(props) {
    
    const {
        handleLogin = () => {}
    } = props;

    function loginToggle(e) {

        let fnError = (msg) => {
            setError(msg);
            window.setTimeout(function() {setError("");}, 500);
        };

        if(!userName) {
            fnError("用户名不能为空！");
            return;
        }
        if(!passwd) {
            fnError("密码不能为空！");
            return;
        }

        AppData.loginMotor("http://open.lubansoft.com/api/motor", (motorResponse)=>{
            AppData.loginBuilder("http://openapi.lbuilder.cn/rs", (builderResponse) => {
                AppData.userName = userName;
                AppData.passwd = passwd;
                updateAccountCookie();
                handleLogin();
            }, fnError);
        }, fnError);
    }

    function updateAccountCookie() {
        let accountList = getAccountCookie();
        let cacheList =[{name: userName, passwd: keepPasswd?passwd : '', url: serverUrl}];
        for(let i=0; i < accountList.length && i<4; ++i) {
            if(accountList[i].name === userName) continue;
            cacheList.push(accountList[i]);
        }
        let expires = new Date();
        expires.setTime(expires.getTime() + 30*24*60*60*1000);
        document.cookie = 'lbproj_AccountInfo'+"="+encodeURI(JSON.stringify(cacheList))+";expires=" + expires.toGMTString();
    }

    function getAccountCookie() {
        var arr = [];
        let reg = new RegExp("(^| )"+'lbproj_AccountInfo'+"=([^;]*)(;|$)");
        if(arr = document.cookie.match(reg)) {
            try {
                return JSON.parse(decodeURI(arr[2]));
            }catch(e) {
                return [];
            }
        }
        return [];
    }

    const classes = useShellStyles();

    const [userName, setUserName] = useState("");
    const [passwd, setPasswd] = useState("");
    const [serverUrl, setServerUrl] = useState("");
    const [keepPasswd, setKeepPasswd] = useState(false);  
    const [error, setError] = useState("");

    let accountList = getAccountCookie();
    let userOptions = []
    let serverOptions = [];
    for(let i=0; i < accountList.length; ++i){
        let account =  accountList[i];
        if(account.name === "") continue;
        userOptions.push(account.name);
        if(account.url) {
            if(i===0) {
                serverOptions.push(account.url);
            }
            else if(serverOptions.indexOf(account.url) === -1) {
                serverOptions.push(account.url);
            }
        }
    }

    useEffect(() => {       
        if(accountList.length > 0) {
            setUserName(userOptions[0]); 
            if(accountList[0].passwd) {
                setKeepPasswd(true);
            }
        }

    },[]);

    useEffect(() => {
        let accountList = getAccountCookie();
        for(let i=0; i < accountList.length; ++i) {
            let account = accountList[i];
            if(account.name === userName) {                
                if(account.passwd) {
                    setPasswd(account.passwd);
                }                    
                setServerUrl(account.url);                
            }            
        }
    }, [userName]); 

    return (
        <div className={classes.root}>

        <div className={classes.login} align="center">
            <img className={classes.logo} src={Images.LoginLogo} alt=""/>
            <div className={classes.userInput}>
                <EditSelect icon={Images.LoginUser} value={userName} options={userOptions} handleChange={(val) => setUserName(val.replace(/\s+/g,""))} />
            </div>
            <input type='text' style={{display:'none'}}/>
            <div className={classes.passwdInput}>
                <IconInput value={passwd} icon={Images.LoginPasswd}  type='password' handleChange={(val) => setPasswd(val.replace(/\s+/g,""))} />
            </div>
            <div className={classes.serverInput}>
                <EditSelect icon={Images.LoginServer} options={serverOptions} value={serverUrl} handleChange={(val) => setServerUrl(val.replace(/\s+/g,""))} />
            </div>
            <div className={classes.checkDiv} align='left'>
            <FormControlLabel
                classes={{root: classes.checkRoot, label: classes.checkLabel}}
                control={
                    <Checkbox color='primary' style={{color: '#fff'}} checked={keepPasswd}
                    onChange={(e) => setKeepPasswd(!keepPasswd)}/>
                }
                label='记住密码'
            />
            </div>
            <div className={classes.error} align='left'>
            <Typography variant='body1' color='error' style={{fontSize: '12px', fontFamily: 'Microsoft Yahei'}} >{error}</Typography>
            </div>           
            <Button variant="contained" color="primary" classes={{root: classes.buttonRoot, containedPrimary: classes.button}}
                onClick={loginToggle}
            >登录</Button>
        </div>
        </div>
        
    )
}