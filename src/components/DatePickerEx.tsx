import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import zhCN from 'date-fns/locale/zh-CN';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker, DatePickerProps } from "@material-ui/pickers";
import FontStyles from '~assets/tss/fontStyle';

export default function DatePickerEx(props: DatePickerProps) {

    const theme = createMuiTheme({
        overrides: {
            MuiOutlinedInput: {
                root: {
                    height: 32,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: 2,
                    '& > .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'transparent',
                        borderWidth: 0
                    }
                },
                input: {
                    ...FontStyles.labelFont,
                    color: 'rgba(255,255,255,0.8)',
                    backgroundColor: 'transparent'
                }               
            }
        } 
    });

    return (
        <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={zhCN}>
                <DatePicker
                {...props}
                disableToolbar
                variant="inline"
                margin="normal"
                inputVariant='outlined'
                />
            </MuiPickersUtilsProvider>
    </ThemeProvider> 
    )
}