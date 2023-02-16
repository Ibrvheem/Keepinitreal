import React, { useState } from 'react'
import { Button, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from '@material-ui/core'
import { AcUnitOutlined, Delete, Details, KeyboardArrowRight, LocalConvenienceStoreOutlined, Send, SendOutlined } from '@material-ui/icons'
import {makeStyles} from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  h1:{
    fontWeight: 300,
  },
  form:{
    marginTop:30,
    marginBottom:20,
    display:'block'
  },
  section:{
    display:'flex', 
  }

})
export default function Create() {
  const history = useHistory();
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [detailsError, setDetailsError] = useState(false)
  const [category, setCategory] = useState('Important')
  const classes = useStyles()
  function handleSubmit(e){
    e.preventDefault()
    setDetailsError(false)
    setTitleError(false)
    if(title == ''){
      setTitleError(true)
    }
    if(details == ''){
      setDetailsError(true)
    }
    if(title != '' && details != ''){
      fetch('http://localhost:8000/notes', {
        method: 'POST', 
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({title, details, category})
      }).then(history.push('/'))
    }
    
  }
  return(
    <Container>
        <Typography
          className={classes.h1}
          variant='h4'
          gutterBottom
          color='primary'
        >Create a new note
        </Typography>
        <form className={classes.form}>
          <TextField
          variant='outlined'
          label = 'Title'
          color='primary'
          required
          fullWidth
          onChange = {function(e){
            setTitle(e.target.value)
          }}
          error = {titleError}
          >
          </TextField>
          <TextField
          variant='outlined'
          label = 'Details'
          color='primary'
          required
          multiline
          rows={4}
          fullWidth
          className={classes.form}
          onChange = {(e)=>{
            setDetails(e.target.value)
          }}
          error = {detailsError}
          ></TextField>

          <Button variant='contained' color='secondary' endIcon = {<Send/>} onClick = {handleSubmit} >SUBMIT</Button>
        </form>
          <FormControl>
            <FormLabel>Level of Urgency</FormLabel>
            <RadioGroup value = {category}  onChange = {(e) => {
              setCategory(e.target.value)
              console.log(category)
            }}>
              <FormControlLabel value='Not Important' control={<Radio/>} label = 'Not Important'></FormControlLabel>
              <FormControlLabel value='A Bit Important' control={<Radio/>} label = 'A bit Important'></FormControlLabel>
              <FormControlLabel value='Kind Of Important' control={<Radio/>} label = 'Kind Of Important'></FormControlLabel>
              <FormControlLabel value='Important' control={<Radio/>} label = 'Important'></FormControlLabel>
              <FormControlLabel value='Very Important' control={<Radio/>} label = 'Very Important'></FormControlLabel>
            </RadioGroup>
         </FormControl>
        <section className={classes.section}>
          <Typography
          className='title'
          variant='h4'
          color='secondary'
          ></Typography>
          <br />
          <Typography
          className='details'
          variant='h6'
          color='primary'
          ></Typography>

        </section>
    </Container>
  )
  
}
