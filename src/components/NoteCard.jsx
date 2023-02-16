import React from 'react'
import { Card,CardHeader,CardContent,CardActions, IconButton, Typography, makeStyles, Avatar } from '@material-ui/core'
import { Delete, DeleteOutline } from '@material-ui/icons'


const useStyles = makeStyles((theme)=>{{
  return{
    test: {
      border: function(props){
        if(props.category == 'Very Important'){
          return(`2px solid red `)
        } 
        if(props.category == 'Important'){
          return(`2px solid #EE4B2B`)
        } 
        if(props.category === 'Not Important'){
          return('2px solid #3ed625')
        }
        if(props.category === 'A Bit Important'){
          return('2px solid #FFE203')
        }
        if(props.category === 'Kind Of Important'){
          return('2px solid #E78400')
        }
      }
    },
    avatar:{
      background:function(props){
        if(props.category == 'Very Important'){
          return('red')
        } 
        if(props.category == 'Important'){
          return('#EE4B2B')
        } 
        if(props.category === 'Not Important'){
          return('#3ed625')
        }
        if(props.category === 'A Bit Important'){
          return('#FFE203')
        }
        if(props.category === 'Kind Of Important'){
          return('#E78400')
        }
      }
    }

  }
}})
function NoteCard(props) {
  const classes = useStyles(props)
  return (
    <div>
      <Card elevation={5} className = {classes.test}>
        <CardHeader
        title={props.title}
        subheader= {props.category} 
        action = {
          <IconButton onClick={props.handleDelete}>
            <DeleteOutline  color='secondary' />
          </IconButton>
        }
        avatar = {
          <Avatar className={classes.avatar}>
            {props.category[0].toUpperCase()}

          </Avatar>
        }
        /> 
        <CardContent>
          <Typography 
          variant = "body2"
          color = 'textSecondary'  
          >
            {props.details}

          </Typography>
          
        </CardContent>     
      
      </Card>
      
    </div>
  )
}

export default NoteCard
