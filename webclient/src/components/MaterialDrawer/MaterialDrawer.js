import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LooksIcon from '@material-ui/icons/Looks';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
}))

const MaterialDrawer = (props) => {

    const classes = useStyles();
    const theme = useTheme();
    const sidebarItems = ['Current Weather', '12-Hour Forecast', '7-Day Forecast', 'Radar']

    return(
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={props.open}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={props.handleDrawerClosed}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>
            <Divider />
            <List>
            {sidebarItems.map(itemText => (
                <ListItem button key={itemText}>
                    <ListItemText primary={itemText} />
                    <ListItemIcon><LooksIcon></LooksIcon></ListItemIcon>
                </ListItem>
            ))}
            </List>
            <Divider />

        </Drawer>
    );
}

export default MaterialDrawer;