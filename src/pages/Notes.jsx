import { Container, Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import NoteCard from '../components/NoteCard'
import { Masonry } from '@mui/lab'
function Notes() {
  const [notes,setNotes] = useState([])
  useEffect(()=>{
    fetch('http://localhost:8000/notes')
      .then(res => res.json())
        .then(data => setNotes(data))
  },[])
  function handleDelete(id){
    fetch('http://localhost:8000/notes/'+ id, {
      method: 'DELETE'
    })
    let newNotes = notes.filter(note => note.id != id)
    setNotes(newNotes)
  }
  return (
    <Container>
      <Typography variant = 'h2'>NOTES</Typography>
      {/* <Grid container> */}
      <Masonry columns={3}>
          {
          notes.map(function(aNote){
            return(
              <Grid item>
                <NoteCard title = {aNote.title} category = {aNote.category} details = {aNote.details} handleDelete = {() => {handleDelete(aNote.id)}}/>
              </Grid>
            )
          })
        }

    </Masonry>
      {/* </Grid> */}
      
    </Container>
  )
}

export default Notes
