import { labelFont } from '../fontStyle';

const buttonStyle = {
    root: {
        width: '100%',
        height: 36,
        background: 'linear-gradient(90deg, #0c89b8 0%, #5edfda 100%)',
        '&:hover': {
            boxShadow: '0px 0px 2px #0c89b8'
        }
    },
    containedPrimary: {
        ...labelFont
    }
};

export default buttonStyle;