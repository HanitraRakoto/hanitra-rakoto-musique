import React, { useState, useEffect } from 'react';
import "./RechercheGroupeRock.css";
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { BrowserRouter, Route, Link } from "react-router-dom";

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
  //App bar
  const classesAppBar = useStylesAppBar();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';

  const mobileMenuId = 'primary-search-account-menu-mobile';
  //App bar fin

  //List
  const classesList = useStylesList();

  //get data from server
  const [resultats, setResultats] = React.useState([]);
  async function fetchData(url) {
    console.log("Getting data from server");
    const res = await fetch(url);
    res
      .json()
      .then(reponseJavaScript => {
        console.log(reponseJavaScript);
        setResultats(reponseJavaScript);
      });
  }
  useEffect(() => {
    //fetchData("https://wasabi.i3s.unice.fr/search/fulltext/metalli");
  }, []);
  //get data from server (fin)

  //recherche
  const [nom, setNom] = React.useState("");
  function keyPressed(event) {
    /*setNom(event.target.value);
    fetchData("https://wasabi.i3s.unice.fr/search/fulltext/"+event.target.value);*/
    if (event.key === "Enter") {
        console.log(event.target.value);
        setNom(event.target.value);
        fetchData("https://wasabi.i3s.unice.fr/search/fulltext/"+event.target.value);
    }
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
          <div className={classesAppBar.search}>
            <div className={classesAppBar.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Rechercher…"
              classes={{
                root: classesAppBar.inputRoot,
                input: classesAppBar.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onKeyPress={keyPressed}
            />
          </div>
        </Toolbar>
      </AppBar>
      <List className={classesList.root}>
          {resultats.map(resultat => (
            (() => {
                if (resultat.nameSuggest !== undefined) {
                    return (
                      <Link to={{pathname: `/rock/${resultat.name}`}} className="linkResult">
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
                    )
                }
            })()
            
        ))}
      </List>
    </div>
  );
}
