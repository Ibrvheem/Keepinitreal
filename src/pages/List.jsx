  import { Checkbox, Container, FormControl, FormControlLabel, FormGroup, FormLabel, IconButton, makeStyles, Typography } from '@material-ui/core'
  import { Delete } from '@material-ui/icons'
  import { Button, TextField } from '@mui/material'
  import { margin } from '@mui/system'
  import React, { useState } from 'react'
  import { useEffect } from 'react'
  import Data from '../../src/Data/db.json'
  const useStyles = makeStyles((theme)=>{
    return{
      container:{
        marginTop: theme.spacing(8)
      },
      form:{
        marginTop:30,
        marginBottom:20,
        display:'block'
      },
      list:{
        flexGrow: 1
      }
    
    }
  })
  function List() {
    const classes = useStyles()
    const [toDoList, setToDoList] = useState([])
    const [list, setList] = useState('')
    const [checked,setChecked] = useState([])

    useEffect( ()=>{
      fetch('http://localhost:8000/todo')
        .then(res => res.json())
          .then(data => setToDoList(data))
    }, []) 
    async function handleSubmit() {
      if (toDoList !== '') {
        try {
          const response = await fetch('http://localhost:8000/todo/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({list})
          });
          
          const newItem = await response.json();
          setToDoList([...toDoList, newItem]);
        } catch (error) {
          console.error(error);
        }
      }
    }

    function handleDelete(id){
      fetch('http://localhost:8000/todo/' + id,{
        method: 'DELETE'
      })
      const newList = toDoList.filter(oneList => oneList.id != id)
      setToDoList(newList)
    }
    
    useEffect(()=>{
      fetch('http://localhost:8000/todo/')
        .then(res => res.json())
          .then(data => setChecked(data))
    },[])
      const listElements = toDoList.map(function(aList){
        return( 
        <div style={{display: 'flex'}} key = {aList.id}>
          <FormControlLabel 
          control={<Checkbox
            checked = {checked}
            onChange={() =>{
              setChecked(prevChecked => {
                return [{...prevChecked, checked: !prevChecked.checked}]
              })
              console.log(checked)
            }}
            size='medium' 
            inputProps={{
            endadornment:(
              <IconButton>
                <Delete color='secondary'/>
              </IconButton>
            )
      
          }}/>} label = {aList.list} className = {classes.list}/>
          <IconButton color='secondary' onClick={() => {handleDelete(aList.id)}}><Delete/></IconButton>

        </div>
        )
      })
    return (
      <Container className={classes.container}>
        <Typography variant='h4' color='textSecondary'>
            TO-DO LIST
        </Typography>
        <form className={classes.form}>
          <TextField  
          label = 'Enter a TO-DO'
          variant='outlined'
          color='primary'
          fullWidth
          onChange={(e) => {
            setList(e.target.value)
          }}
          InputProps={{
            endAdornment:(
              <Button variant='contained' onClick={handleSubmit}>Add</Button>
            )
          }}
          >
          </TextField>
        </form>
        <FormControl fullWidth>
          <FormLabel>LIST</FormLabel>
          {listElements}
        
        </FormControl>
        <FormControl fullWidth>
          <FormLabel inputProps = {{
            color:'primary'
          }}>COMPLETED</FormLabel>
          {/* {listElements} */}
        
        </FormControl>


      </Container>
    )
  
}

  export default List
