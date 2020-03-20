import React, { useState, useEffect } from 'react';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import "./GroupeRock.css";

//import metallica from "../data/mettalica";
import MembreGroupeRock from "./MembreGroupeRock";
import AlbumGroupeRock from './AlbumGroupeRock';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import PlaceIcon from '@material-ui/icons/Place';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import PeopleIcon from '@material-ui/icons/People';
import LinkIcon from '@material-ui/icons/Link';
import MicIcon from '@material-ui/icons/Mic';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

const useStylesCard = makeStyles(theme => ({
  root: {
    //maxWidth: 345,
  },
}));

const useStylesGrid = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

//Expansion panel
const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);
//Expansion panel (fin)

//Tab
const useStylesTab = makeStyles({
  root: {
    flexGrow: 1,
  },
});
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}
//Tab fin

//Table
const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStylesTable = makeStyles({
  table: {
    minWidth: 700,
  },
});
//Table fin

//List divider
const useStylesListDivider = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));
//List divider fin

/*function getDataFromServer(url) {
  // utiliser fetch pour récupérer les données
  console.log("Getting data from server");
  fetch(url)
    .then(response => response.json())
    .then(reponseJavaScript => {
      console.log("Ty le données eh");
      console.log(reponseJavaScript);
      return reponseJavaScript;
    });
};*/

const GroupeRock = (props) => {

  const classesCard = useStylesCard();
  const classesGrid = useStylesGrid();
  //Expansion panel
  const [expanded, setExpanded] = React.useState('panel1');
  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  //Expansion panel (fin)
  //Tab
  const classesTab = useStylesTab();
  const [value, setValue] = React.useState(0);
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  //Tab fin
  //Table
  const classesTable = useStylesTable();
  //Table fin
  //List divider
  const classesListDivider = useStylesListDivider();
  //List divider fin

  //params
  const [nom, setNom] = React.useState('');

  //get data from server
  const [metallica, setMetallica] = React.useState({ 
    albums: [],
    members: [],
    locationInfo: [],
    genres: [],
    labels: [],
    nameVariations: [],
    urls: [],
    recordLabel: [],
    name : '',
    picture : { medium : ''},
    abstract : '',
    deezerFans : 0
  });
  async function fetchData(url) {
    console.log("Getting data from server");
    const res = await fetch(url);
    res
      .json()
      .then(reponseJavaScript => {
        console.log(reponseJavaScript);
        setMetallica(reponseJavaScript);
      });
  }
  useEffect(() => {
    console.log("props.match.params.nom");
    console.log(props.match.params.nom);
    fetchData("https://wasabi.i3s.unice.fr/search/artist/"+props.match.params.nom);
  }, []);
  //get data from server (fin)

  let listeDesAlbums = metallica.albums.map((a, index) => (
    <AlbumGroupeRock album={a} key={index} />
  ));

  let listeDesMembres = metallica.members.map((m, index) => (
    <MembreGroupeRock membre={m} key={index} />
  ));

  let listeDesLocations = metallica.locationInfo.map(loc => (
    <div>{loc}<br/></div>
  ));

  let listeDesGenres = metallica.genres.map(genre => (
    <div>{genre}<br/></div>
  ));

  let listeDesLabels = metallica.labels.map(label => (
    <div>{label}<br/></div>
  ));

  let listeDesVariations = metallica.nameVariations.map(nameVariation => (
    <div>{nameVariation}<br/></div>
  ));

  let listeDesUrls = metallica.urls.map(url => (
    <div>{url}<br/></div>
  ));

  let listeDesRecordLabel = metallica.recordLabel.map(rl => (
    <div>{rl}<br/></div>
  ));

  return (
    <Card className={classesCard.root}>
        <CardMedia style={{width:300}}
          className="media"
          component="img"
          alt={metallica.name}
          height="300"
          image={metallica.picture.medium}
          title={metallica.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {metallica.name}
          </Typography>
          <Paper className={classesTab.root}>
            <Tabs
              value={value}
              onChange={handleChangeTab}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Description" {...a11yProps(0)}/>
              {(() => {
                if (metallica.members.length !== 0) {
                    return <Tab label="Membres" />;
                }
              })()}
              <Tab label="Albums" />
            </Tabs>
            <TabPanel value={value} index={0}>
              {metallica.abstract}
              {/* liste locationInfo, liste genres, liste labels, deezerFans, liste nameVariations, liste urls, liste recordLabel */}
              <Grid item xs={12} sm={12}>
                <Grid container spacing={3}>
                  <Grid item xs={4} sm={4}>
                    <List className={classesListDivider.root}>
                      <ListItem>
                        <ListItemAvatar>
                        <Avatar>
                          <PlaceIcon />
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                        primary="Lieu" 
                        secondary={
                          <React.Fragment>
                          {listeDesLocations}
                          </React.Fragment>
                        } />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                      <ListItem>
                        <ListItemAvatar>
                        <Avatar>
                          <LibraryMusicIcon />
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                        primary="Genres" 
                        secondary={
                          <React.Fragment>
                          {listeDesGenres}
                          </React.Fragment>
                        } />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                      <ListItem>
                        <ListItemAvatar>
                        <Avatar>
                          <GroupWorkIcon />
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                        primary="Labels" 
                        secondary={
                          <React.Fragment>
                          {listeDesLabels}
                          </React.Fragment>
                        } />
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item xs={4} sm={4}>
                    <List className={classesListDivider.root}>
                      <ListItem>
                        <ListItemAvatar>
                        <Avatar>
                          <PeopleIcon />
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Fans deezer" secondary={metallica.deezerFans} />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                      <ListItem>
                        <ListItemAvatar>
                        <Avatar>
                          <LinkIcon />
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Urls" 
                        secondary={
                          <React.Fragment>
                          {listeDesUrls}
                          </React.Fragment>
                        } />
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item xs={4} sm={4}>
                    <List className={classesListDivider.root}>
                      <ListItem>
                        <ListItemAvatar>
                        <Avatar>
                          <PermIdentityIcon />
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                        primary="Variations nom" 
                        secondary={
                          <React.Fragment>
                          {listeDesVariations}
                          </React.Fragment>
                        } />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                      <ListItem>
                        <ListItemAvatar>
                        <Avatar>
                          <MicIcon />
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Record Label" 
                        secondary={
                          <React.Fragment>
                          {listeDesRecordLabel}
                          </React.Fragment>
                        } />
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </Grid>
            </TabPanel>
            {(() => {
                if (metallica.members.length !== 0) {
                    return <TabPanel value={value} index={1}>
              <TableContainer component={Paper}>
                <Table className={classesTable.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell align="right">Real Name</StyledTableCell>
                      <StyledTableCell align="right">Instruments</StyledTableCell>
                      <StyledTableCell align="right">Begin</StyledTableCell>
                      <StyledTableCell align="right">End</StyledTableCell>
                      <StyledTableCell align="right">Gender</StyledTableCell>
                      {/*<StyledTableCell align="right">Abstract</StyledTableCell>*/}
                      <StyledTableCell align="right">Name Variations</StyledTableCell>
                      <StyledTableCell align="right">Birthdate</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {listeDesMembres}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
                }
              })()}
            
              {(() => {
                if (metallica.members.length !== 0) {
                    return <TabPanel value={value} index={2}>
              <div className={classesGrid.root}>
                <Grid container spacing={3}>
                  {listeDesAlbums}
                </Grid>
              </div>
            </TabPanel>;
                } else {
                  return <TabPanel value={value} index={1}>
              <div className={classesGrid.root}>
                <Grid container spacing={3}>
                  {listeDesAlbums}
                </Grid>
              </div>
            </TabPanel>
                }
              })()}
            
          </Paper>
        </CardContent>
      {/*<CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>*/}
    </Card>
  );
};

export default GroupeRock;
