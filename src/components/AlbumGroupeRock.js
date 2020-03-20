import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

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

const useStylesScrollList = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 245,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));

export default function AlbumGroupeRock({album}) {
  const classesScrollList = useStylesScrollList();
  const classesGrid = useStylesGrid();

  return (
    <Grid item xs={12} sm={6}>
        <Paper className={classesGrid.paper}>
            <Grid container spacing={3}>
            <Grid item xs={6} sm={4}>
            {(() => {
                if (album.cover !== undefined) {
                    return <img src={album.cover.medium}/>;
                }
            })()}
            </Grid>
            <Grid item xs={2} sm={1}>
            </Grid>
            <Grid item xs={6} sm={7}>
                <List className={classesScrollList.root} subheader={<li />}>
                    <li className={classesScrollList.listSection}>
                    <ul className={classesScrollList.ul}>
                    <h3>{album.title}</h3>
                        {album.songs.map(s => (
                            <div>
                            <ListItem>
                            <PlayCircleFilledIcon/>&nbsp;
                            <ListItemText primary={s.title} />
                            </ListItem>
                            <Divider />
                            </div>
                        ))}
                    </ul>
                    </li>
                </List>
            </Grid>
            </Grid>
        </Paper>
    </Grid>
  );
}
