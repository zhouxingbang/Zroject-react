import React from 'react';
import {
    makeStyles, 
    createStyles
} from '@material-ui/core';
import clsx from 'clsx';

export interface ImageButtonProps {
   image?: string;
   imageHover?: string;
}

const ImageButton = React.forwardRef((props: ImageButtonProps & React.ImgHTMLAttributes<HTMLImageElement>, ref?: React.Ref<any>) => {

    const {
        image,
        imageHover,
        className,
        ...other
    } = props;

    const classes = makeStyles(({
        root: {
            '&:hover': {
                cursor: 'pointer'
            }
        }
    }))();

    const [hovered, setHovered] = React.useState<boolean>(false);

    return (
        <img ref={ref} alt=""
        {...other}
        className={clsx(className,classes.root)}
        onMouseEnter={() => {setHovered(true);}}
        onMouseLeave={() => {setHovered(false);}}
        src={hovered ? imageHover : image}
        />
    )
});

export default ImageButton;