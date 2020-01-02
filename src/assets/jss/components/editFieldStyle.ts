const editFieldStyle = {
    root: {
        height: 32,
        color: '#fff',
        backgroundColor: 'transparent',
        '&.MuiFormControl-marginDense': {
            marginTop: 0,
            marginBottom: 0
        }
    },
    outline: {
        backgroundColor: 'transparent',
        height: '100%',
        border: '1px solid #ffffff2d',
        borderRadius: 0,
        '&:hover': {
            borderColor: '#2997b4'
        },
        '& > .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent'
        },
        '&.Mui-focused > .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent'
        },
        '&.Mui-focused': {
            borderColor: '#2997b4'
        }
    },
    input: {
        marginLeft: 0,
        fontSize: 12,
        color: '#fff',
        fontFamily: 'Microsoft YaHei'
    },
    adornedStart: {
        paddingLeft: 10
    },
    adornedEnd: {
        paddingRight: 0
    },
    notchedOutline: {
        borderColor: 'transparent'
    }
};

export default editFieldStyle;