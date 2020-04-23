import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    tooltipWidth: {
        marginTop: 50,
    },
    offset: theme.mixins.toolbar,
  }));

const MaterialAppBar = (props) => {

    const classes = useStyles();

    return(
        <div className={classes.root}>
                <AppBar position="fixed">
                    <ToolBar>
                        <Tooltip title="Menu">
                            <IconButton onClick={props.handleDrawerOpen} className={classes.menuButton} edge="start" color="inherit" aria-label="menu">
                                <MenuIcon />
                            </IconButton>
                        </Tooltip>
                        <Typography className={classes.title} variant="h6" >
                            RNN Weather Forecaster
                        </Typography>
                        <Tooltip title="User Login">
                            <Button color="inherit">Login</Button>
                        </Tooltip>
                    </ToolBar>
                </AppBar>
                <div className={classes.offset} />
        </div>
    );
}

export default MaterialAppBar;