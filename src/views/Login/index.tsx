import * as React from 'react';
import { makeStyles, createStyles, Box, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import style from '~assets/jss/views/loginStyle';
import EditField from '~components/Input/EditField';
import ButtonEx from '~components/Input/ButtonEx';

const User = require('~assets/img/user.png');

export default function Login() {

    const classes = makeStyles(createStyles(style))();

    let history = useHistory();

    const onLogin = () => {
        history.push("/zroject");
    };

    return (
        <Box className={classes.root} display="flex" 
        flexDirection="column" 
        justifyContent="center" alignItems="center">
            <div className={classes.content}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <EditField 
                        placeholder="请输入用户名..." 
                        defaultValue=""
                        startIcon={require('~assets/img/user.png')}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <EditField 
                        placeholder="请输入密码..." 
                        defaultValue="" 
                        type='password'
                        startIcon={require('~assets/img/passwd.png')}
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