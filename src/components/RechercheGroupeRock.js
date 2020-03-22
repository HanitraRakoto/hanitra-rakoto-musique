import React from 'react';
import "./RechercheGroupeRock.css";
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';

const useStylesAppBar = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const useStylesInput = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '75ch',
    },
  },
}));

const useStylesList = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        marginLeft: 50,
        marginRight: 50,
    },
    inline: {
        display: 'inline',
    },
}));

export default function RechercheGroupeRock() {
  const classesAppBar = useStylesAppBar();
  const classesInput = useStylesInput();
  const classesList = useStylesList();

  const [getResultat, setgetResultat] = React.useState(false);
  //get data from server
  const [resultats, setResultats] = React.useState([]);
  async function fetchData(url) {
    console.log("Getting data from server");
    const res = await fetch(url);
    res
      .json()
      .then(reponseJavaScript => {
        console.log(reponseJavaScript);
        let resultatsArtiste = [];
        reponseJavaScript.map(reponse => {
          if(reponse.nameSuggest !== undefined) {
            resultatsArtiste.push(reponse);
          }
        });
        setResultats(resultatsArtiste);
        setgetResultat(false);
      });
  }
  //get data from server (fin)

  //recherche
  const [recherche, setRecherche] = React.useState("");
  function keyPressed(event) {
    console.log(event.target.value);
    setRecherche(event.target.value);
    setgetResultat(true);
    setResultats([]);
    fetchData("https://wasabi.i3s.unice.fr/search/fulltext/"+event.target.value);
    /*if (event.key === "Enter") {
        console.log(event.target.value);
    }*/
  }

  return (
    <div className={classesAppBar.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classesAppBar.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MusicNoteIcon />
          </IconButton>
          <Typography className={classesAppBar.title} variant="h6" noWrap>
            Groupe Rock
          </Typography>
        </Toolbar>
      </AppBar>
      <List className={classesList.root}>
        <h1>Entrez l'artiste que vous chercher</h1>
        <div className={classesInput.root} noValidate>
          <div>
            <TextField id="outlined-search" onChange={keyPressed} label="Rechercher" placeholder="Nom de l'artiste" type="search" variant="outlined" autoComplete="off" />
          </div>
        </div>
        {(() => {
          if(recherche === "") {
              return <img src="/music2.gif" alt="musique"/>;
          }
          if (!getResultat && resultats.length !== 0) {
              return <h2>Résultat(s) de recherche pour "{recherche}"</h2>;
          }
          if (!getResultat && recherche !== "" && resultats.length === 0) {
              return <h2>Aucun résultat pour "{recherche}"</h2>;
          } 
        })()}
          {resultats.map(resultat => (
            <Link to={{pathname: `/artiste/${resultat.name}`}} className="linkResult">
              <ListItem alignItems="flex-start" className="itemResult">
                  <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src={resultat.picture} />
                  </ListItemAvatar>
                  <ListItemText className="nameResult"
                  primary={resultat.name}
                  secondary={
                      <React.Fragment>
                      <Typography
                          component="span"
                          variant="body2"
                          className={classesList.inline}
                          color="textPrimary"
                      >
                          Suggestion(s) nom :
                      </Typography>
                      {resultat.nameSuggest.input.map((suggest,index) => { 
                          if (index === 0)
                          return (suggest)
                          else
                          return (", "+suggest)
                      })}
                      </React.Fragment>
                  }
                  />
              </ListItem>
              <Divider variant="inset" component="li" />
            </Link>
          ))}
      </List>
    </div>
  );
}
