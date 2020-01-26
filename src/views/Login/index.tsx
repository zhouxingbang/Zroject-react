import React from 'react';
import { makeStyles, createStyles, Box, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import style from '~assets/tss/views/loginStyle';
import TextFieldEx from '~components/TextFieldEx';
import ButtonEx from '~components/ButtonEx';
import serverMgr from '~code/ServerMgr';
import CookieApi from '~code/CookieApi';
import SelectEx from '~components/SelectEx';

const AccountCookie:string = "lubango_account";

type AccountType = {
    userName: string;
    password?: string;
    serverUrl: string;
}

export default function Login() {

    const classes = makeStyles((style))();
    const history = useHistory();

    const onLogin = () => {
    };
    
    React.useEffect(() => {
        try {
            let accountList = JSON.parse(CookieApi.getItem(AccountCookie));
            if(!Array.isArray(accountList)) {
                accountList = [];
            }
        }
        catch(error) {
        };
    }, []);

    return (
        <Box className={classes.root} 
        display="flex" 
        flexDirection="column" 
        justifyContent="center" alignItems="center">
            <div className={classes.content}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <SelectEx 
                        placeholder="请输入用户名..." 
                        defaultValue=""
                        startIcon={require('~assets/img/user.png')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextFieldEx 
                        placeholder="请输入密码..." 
                        defaultValue="" 
                        type='password'
                        startIcon={require('~assets/img/passwd.png')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextFieldEx 
                        placeholder="请输入地址..." 
                        defaultValue="" 
                        type='password'
                        startIcon={require('~assets/img/serverurl.png')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ButtonEx onClick={onLogin}>登录</ButtonEx>
                    </Grid>
                </Grid>
            </div>
        </Box>
    )
}