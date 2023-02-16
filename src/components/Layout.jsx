import { makeStyles, Drawer, Typography,List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, Avatar } from '@material-ui/core'
import { AddCircleOutlineSharp, CheckBox, NotificationsNone, NotificationsNoneOutlined, SubjectOutlined } from '@material-ui/icons'
import { useHistory, useLocation } from 'react-router-dom'
import React from 'react'
import { format } from 'date-fns'


const drawerWidth = 240
const useStyles =makeStyles(function(theme){
    return{
        page: {
            backgroundColor: '#f9f9f9',
            display:'flex',
            // padding: theme.spacing(3)
        },
        drawer:{
            width:drawerWidth
        },
        paperDrawer:{
            width:drawerWidth
        },
        active:{
            backgroundColor: '#f2f2f2'
        },
        title:{
            padding:theme.spacing(2)
        },
        appBar:{
            width: `calc(100% - ${drawerWidth}px)`
        },
        date:{
            flexGrow: 1
        },
        avatar:{
            marginLeft: theme.spacing(2)
        }
    }
})

function Layout({children}) {
    let history = useHistory()
    let location = useLocation()
    const classes = useStyles()
    const menuItems = [
        {
            'Text': 'My Notes',
            'Icon': <SubjectOutlined color='primary'/>,
            'Path': '/'
        },
        {
            'Text': 'Create Note',
            'Icon': <AddCircleOutlineSharp color='primary'/>,
            'Path': '/create'
        },
        {
            'Text': 'To-do List',
            'Icon': <CheckBox color='primary'/>,
            'Path': '/List'
        },
        {
            'Text': 'Remind Me',
            'Icon': <NotificationsNone color='primary'/>,
            'Path': '/reminder'
        }
    ]
  return (
    <div className={classes.page}>
        <AppBar color='textSecondary' className={classes.appBar} elevation = {0}>
            <Toolbar className={classes.toolbar}>
                <Typography variant='body2' className={classes.date}> Today is the {format(new Date(), 'do MMMM Y')}</Typography>
                <Typography variant='body2'>Ibrahim</Typography>
                <Avatar src='/Images/profile--pic.jfif' className={classes.avatar}/>

            </Toolbar>

        </AppBar>
        <Drawer
        className={classes.drawer}
        variant = 'permanent'
        anchor = 'left'
        classes={{paper: classes.paperDrawer}}
        
        >
            <Typography variant='h5' className={classes.title}>Keepin' It Real</Typography>                
                <List>

                    {menuItems.map(function(menuItem){
                        return(
                            <ListItem key={menuItem.Text} button 
                            className={location.pathname == menuItem.Path? classes.active: null }
                            onClick = {() => {
                                history.push(menuItem.Path)
                            }} >
                                <ListItemIcon>{menuItem.Icon}</ListItemIcon>
                                <ListItemText primary = {menuItem.Text}/>
            
                            </ListItem>
                        )
                    })}
                </List>

        </Drawer>

        {children}
    </div>
  )
}

export default Layout
