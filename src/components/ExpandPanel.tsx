import React from 'react';
import clsx from 'clsx';
import { 
    makeStyles, 
    createStyles, 
    Box,
    Grid,
    Typography,
    Slide
} from '@material-ui/core';
import ImageButton from './ImageButton';
import FontStyles from '~assets/tss/fontStyle';

export interface PanelItemProps {
    className?: string;
    children?: React.ReactNode;
    expandView?: React.ReactNode;
}

export interface ExpandPanelProps {
    title?: string;
    children?: React.ReactNode;
    expandChanged?: (isExpand:boolean) => void;
}

export interface ExpandContext {
    expand(view:React.ReactNode|null):void;
}

export const ExpandPanelContext = React.createContext<ExpandContext>({
    expand: (view:React.ReactNode|null) => void {}
});

export function PanelItem(props:PanelItemProps) {
    
    const classes = makeStyles(({
        root: {
            width: '100%',
            overflow: 'hidden'
        }
    }))();

    const {
        expand
    } = React.useContext<ExpandContext>(ExpandPanelContext);

    const anchorRef = React.useRef<any>(null);

    React.useEffect(() => {
        if(anchorRef.current) {
            if("attachEvent" in anchorRef.current) {
                anchorRef.current.attachEvent('onmousewheel',onMouseWheeled);
            }
            else {
                anchorRef.current.addEventListener('mousewheel',onMouseWheeled,false);
            }
        }
    });

    const onMouseWheeled = () => {
        expand(props.expandView);
    };

    return (
        <div ref={anchorRef} className={clsx(classes.root,props.className)}>
            {props.children}
        </div>
    )
}

export default function ExpandPanel(props:ExpandPanelProps) {

    const classes = makeStyles(createStyles({
        root: {
            width: 280,
            height: '100%',
            overflow: 'hidden'
        },
        title: {
            fontWeight: "bold",
            ...FontStyles.titleFont
        },
        expandView: {
            width: '100%',
            flexGrow: 1,
            overflow: 'hidden'
        }
    }))();

    const [expandView, setExpandView] = React.useState<React.ReactNode>(null);

    const onBackClicked = () => {
        setExpandView(null);
    };

    React.useEffect(() => {
        if(props.expandChanged) {
            props.expandChanged(Boolean(expandView));
        }
    }, [expandView]);

    return (
        <ExpandPanelContext.Provider
            value={{
                expand: setExpandView
            }}
        >
            <Box display="flex" flexDirection="column"
            className={classes.root}
            >
                <Grid container>
                    <Grid item container xs={12} spacing={0}>
                        <Grid item xs={8}>
                            <Typography noWrap className={classes.title}>{props.title}</Typography>
                        </Grid>
                        {expandView && <Grid item xs={4}>
                            <ImageButton style={{float:'right',marginRight:0}} 
                            image={require('~assets/img/arrowBack.png')} 
                            imageHover={require('~assets/img/arrowBack_hover.png')} 
                            onClick={onBackClicked}/>
                        </Grid>}
                    </Grid>
                    <Grid item xs={12} style={{height:30}}/>
                </Grid>
                <div className={classes.expandView}>
                    {!Boolean(expandView) && props.children}
                    {Boolean(expandView) && <Slide direction="up" in mountOnEnter unmountOnExit>
                        {expandView}
                    </Slide>}
                </div>
            </Box>
        </ExpandPanelContext.Provider>
    )
}

