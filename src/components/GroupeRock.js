import React, { useEffect } from 'react';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import "./GroupeRock.css";
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
import MicIcon from '@material-ui/icons/Mic';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

//App bar
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

//Tab
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

const GroupeRock = (props) => {
  const classesAppBar = useStylesAppBar();
  const classesGrid = useStylesGrid();
  //Tab
  const [value, setValue] = React.useState(0);
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  //Tab fin
  const classesTable = useStylesTable();
  const classesListDivider = useStylesListDivider();

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

  let listeDesRecordLabel = metallica.recordLabel.map(rl => (
    <div>{rl}<br/></div>
  ));

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
            <a href="/" class="iconRetour"><ArrowBackIcon /></a>
          </IconButton>
          <Typography className={classesAppBar.title} variant="h6" noWrap>
            Groupe Rock
          </Typography>
        </Toolbar>
      </AppBar>
      <Card>
          <CardMedia style={{width:300}}
            className="media"
            component="img"
            alt={metallica.name}
            height="300"
            image={metallica.picture.medium}
            title={metallica.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h1">
              {metallica.name}
            </Typography>
            <div className="urls">
              <Avatar variant="square" className="logoAvatar">
                <a href={metallica.urlWikipedia}><img src="/wikipedia.png" alt="Wikipedia" width="100%"/></a>
              </Avatar>&nbsp;&nbsp;
              <Avatar variant="square" className="logoAvatar">
                <a href={metallica.urlOfficialWebsite}><img src="/officialwebsite.jpeg" alt="Official Website" width="100%"/></a>
              </Avatar>&nbsp;&nbsp;
              <Avatar variant="square" className="logoAvatar">
                <a href={metallica.urlFacebook}><img src="/facebook.png" alt="Facebook" width="100%"/></a>
              </Avatar>&nbsp;&nbsp;
              <Avatar variant="square" className="logoAvatar">
                <a href={metallica.urlMySpace}><img src="/myspace.png" alt="My Space" width="100%"/></a>
              </Avatar>&nbsp;&nbsp;
              <Avatar variant="square" className="logoAvatar">
                <a href={metallica.urlTwitter}><img src="/twitter.png" alt="Twitter" width="100%"/></a>
              </Avatar>&nbsp;&nbsp;
              <Avatar variant="square" className="logoAvatar">
                <a href={metallica.urlAmazon}><img src="/amazon.png" alt="Amazon" width="100%"/></a>
              </Avatar>&nbsp;&nbsp;
              <Avatar variant="square" className="logoAvatar">
                <a href={metallica.urlITunes}><img src="/itunes.png" alt="ITunes" width="100%"/></a>
              </Avatar>&nbsp;&nbsp;
              <Avatar variant="square" className="logoAvatar">
                <a href={metallica.urlAllmusic}><img src="/allmusic.png" alt="All music" width="100%"/></a>
              </Avatar>&nbsp;&nbsp;
              <Avatar variant="square" className="logoAvatar">
                <a href={metallica.urlDiscogs}><img src="/discogs.png" alt="Discogs" width="100%"/></a>
              </Avatar>&nbsp;&nbsp;
              <Avatar variant="square" className="logoAvatar">
                <a href={metallica.urlMusicBrainz}><img src="/musicbrainz.png" alt="Music Brainz" width="100%"/></a>
              </Avatar>&nbsp;&nbsp;
              <Avatar variant="square" className="logoAvatar">
                <a href={metallica.urlYouTube}><img src="/youtube.png" alt="YouTube" width="100%"/></a>
              </Avatar>&nbsp;&nbsp;
              <Avatar variant="square" className="logoAvatar">
                <a href={metallica.urlSpotify}><img src="/spotify.png" alt="Spotify" width="100%"/></a>
              </Avatar>&nbsp;&nbsp;
              <Avatar variant="square" className="logoAvatar">
                <a href={metallica.urlPureVolume}><img src="/purevolume.png" alt="PureVolume" width="100%"/></a>
              </Avatar>&nbsp;&nbsp;
              <Avatar variant="square" className="logoAvatar">
                <a href={metallica.urlRateYourMusic}><img src="/rateyourmusic.png" alt="RateYourMusic" width="100%"/></a>
              </Avatar>&nbsp;&nbsp;
              <Avatar variant="square" className="logoAvatar">
                <a href={metallica.urlSoundCloud}><img src="/soundcloud.png" alt="SoundCloud" width="100%"/></a>
              </Avatar>&nbsp;&nbsp;
              <Avatar variant="square" className="logoAvatar">
                <a href={metallica.urlDeezer}><img src="/deezer.png" alt="Deezer" width="100%"/></a>
              </Avatar>&nbsp;&nbsp;
              <Avatar variant="square" className="logoAvatar">
                <a href={metallica.urlLastFm}><img src="/lastfm.png" alt="LastFm" width="100%"/></a>
              </Avatar>&nbsp;&nbsp;
              <Avatar variant="square" className="logoAvatar">
                <a href={metallica.urlInstagram}><img src="/instagram.png" alt="Instagram" width="100%"/></a>
              </Avatar>&nbsp;&nbsp;
              <Avatar variant="square" className="logoAvatar">
                <a href={metallica.urlGooglePlus}><img src="/googleplus.png" alt="Google+" width="100%"/></a>
              </Avatar>
            </div>
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
                <Grid item xs={12} sm={12}>
                  <Grid container spacing={3}>
                    <Grid item xs={4} sm={4}>
                      <List className={classesListDivider.root}>
                        <ListItem>
                          <ListItemAvatar>
                          <Avatar className="icon">
                            <PlaceIcon/>
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
                          <Avatar className="icon">
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
                          <Avatar className="icon">
                            <PeopleIcon />
                          </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary="Fans deezer" secondary={metallica.deezerFans} />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem>
                          <ListItemAvatar>
                          <Avatar className="icon">
                            <PermIdentityIcon />
                          </Avatar>
                          </ListItemAvatar>
                          <ListItemText 
                          primary="Variations noms" 
                          secondary={
                            <React.Fragment>
                            {listeDesVariations}
                            </React.Fragment>
                          } />
                        </ListItem>
                      </List>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                      <List className={classesListDivider.root}>
                        <ListItem>
                          <ListItemAvatar>
                          <Avatar className="icon">
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
                          <Avatar className="icon">
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
                                      <StyledTableCell>Nom</StyledTableCell>
                                      <StyledTableCell align="right">Vrai nom</StyledTableCell>
                                      <StyledTableCell align="right">Instruments</StyledTableCell>
                                      <StyledTableCell align="right">Debut</StyledTableCell>
                                      <StyledTableCell align="right">Fin</StyledTableCell>
                                      <StyledTableCell align="right">Sexe</StyledTableCell>
                                      <StyledTableCell align="right">Date de naissance</StyledTableCell>
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
          </CardContent>
      </Card>
    </div>
  );
};

export default GroupeRock;
