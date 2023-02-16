  import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
  import Notes from './pages/Notes'
  import Create from './pages/Create'
  import Layout from './components/Layout';
  import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
  import List from './pages/List';
import { purple } from '@material-ui/core/colors';


  
  const theme = createMuiTheme({
    palette:{
      primary:{
        main: "#0070c0",
        dark: '#012a47'
      }
    },typography:{
      fontFamily:'Poppins',
      fontWeightLight:100,
      fontWeightMedium:300,
      fontWeightRegular:400,
      fontWeightBold:500,

    }
  })

  function App() {
    return (
      <ThemeProvider theme = {theme}>
        <Router>
          <Layout>
          <Switch>
            <Route exact path="/">
              <Notes />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/list">
              <List />
            </Route>
          </Switch>
          </Layout>
        </Router> 
      </ThemeProvider>

    );
  }

  export default App;
