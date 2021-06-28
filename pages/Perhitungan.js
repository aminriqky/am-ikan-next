import React from 'react';
import Head from "next/head";
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Select from '@material-ui/core/Select';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        AMIkan
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#BEE3F8',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#4299E1',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    backgroundColor: '#EBF8FF',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 1000,
  },
}));

function Cell(props) {
  const [select, setSelect] = React.useState('');
  const [c1, setC1] = React.useState('');
  const [c2, setC2] = React.useState('');
  const [c3, setC3] = React.useState('');
  const [c4, setC4] = React.useState('');
  const [pembagi, setPembagi] = React.useState('');
  const [normal1, setNormal1] = React.useState('');
  const [normal2, setNormal2] = React.useState('');
  const [normal3, setNormal3] = React.useState('');
  const [normal4, setNormal4] = React.useState('');

  React.useEffect(() => {
    if (select === 'Cost') {
      setPembagi(Math.min(c1, c2, c3, c4));
      setNormal1(pembagi / c1);
      setNormal2(pembagi / c2);
      setNormal3(pembagi / c3);
      setNormal4(pembagi / c4);
    }
    if (select === 'Benefit') {
      setPembagi(Math.max(c1, c2, c3, c4));
      setNormal1(c1 / pembagi);
      setNormal2(c2 / pembagi);
      setNormal3(c3 / pembagi);
      setNormal4(c4 / pembagi);
    }
  })

  const handleChange = (event) => {
    setSelect(event.target.value);
  };

  return (
    <Grid item xs={2}>
      <Paper className={props.fixedHeightPaper}>
        <Typography variant="h6" style={{
          marginBottom: 10,
          marginTop: 10,
          textAlign: 'center'
        }}>{props.judul}</Typography>
        <Typography variant="subtitle2" style={{
          marginBottom: 10,
          marginTop: 10
        }}>Cost/Benefit</Typography>
        <Select value={select} onChange={handleChange} displayEmpty className={props.selectEmpty} variant="outlined" inputProps={{
          'aria-label': 'Without label'
        }}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Cost">Cost</MenuItem>
          <MenuItem value="Benefit">Benefit</MenuItem>
        </Select>
        <TextField type="number" style={{
          marginBottom: 10,
          marginTop: 10
        }} id="filled-basic" label="Kepentingan" variant="filled" />
        <Typography variant="subtitle2" style={{
          marginBottom: 10,
          marginTop: 10
        }}>Bobot</Typography>
        <TextField type="number" style={{
          marginBottom: 10
        }} id="filled-basic" value={c1} onChange={event => {
          setC1(event.target.value);
        }} label="A1" variant="filled" />
        <TextField type="number" style={{
          marginBottom: 10
        }} id="filled-basic" value={c2} onChange={event => {
          setC2(event.target.value);
        }} label="A2" variant="filled" />
        <TextField type="number" style={{
          marginBottom: 10
        }} id="filled-basic" value={c3} onChange={event => {
          setC3(event.target.value);
        }} label="A3" variant="filled" />
        <TextField type="number" style={{
          marginBottom: 10
        }} id="filled-basic" value={c4} onChange={event => {
          setC4(event.target.value);
        }} label="A4" variant="filled" />
        <Typography variant="subtitle2" style={{
          marginBottom: 10,
          marginTop: 10
        }}>Pembagi</Typography>
        <TextField type="number" style={{
          marginBottom: 10
        }} value={pembagi} id="filled-basic" disabled variant="outlined" />
        <Typography variant="subtitle2" style={{
          marginBottom: 10,
          marginTop: 10
        }}>Normalisasi</Typography>
        <TextField type="number" style={{
          marginBottom: 10
        }} value={normal1} onChange={event => {
          setNormal1(event.target.value);
        }} id="filled-basic" disabled variant="outlined" />
        <TextField type="number" style={{
          marginBottom: 10
        }} value={normal2} onChange={event => {
          setNormal2(event.target.value);
        }} id="filled-basic" disabled variant="outlined" />
        <TextField type="number" style={{
          marginBottom: 10
        }} value={normal3} onChange={event => {
          setNormal3(event.target.value);
        }} id="filled-basic" disabled variant="outlined" />
        <TextField type="number" style={{
          marginBottom: 10
        }} value={normal4} onChange={event => {
          setNormal4(event.target.value);
        }} id="filled-basic" disabled variant="outlined" />
      </Paper>
    </Grid>
  );
}

export default function Perhitungan() {
  const classes = useStyles();
  const router = useRouter();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logout = (e) => {
    e.preventDefault()
    router.push('/');
  }

  return (
    <div className={classes.root}>
      <Head>
        <title>SPK - Arah Migrasi Ikan</title>
      </Head>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Perhitungan
          </Typography>
          <IconButton color="inherit">
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <FormatListNumberedIcon />
            </ListItemIcon>
            <ListItemText primary="Perhitungan" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText onClick={logout} primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Cell judul="C1" selectEmpty={classes.selectEmpty} fixedHeightPaper={fixedHeightPaper} />
            <Cell judul="C2" selectEmpty={classes.selectEmpty} fixedHeightPaper={fixedHeightPaper} />
            <Cell judul="C3" selectEmpty={classes.selectEmpty} fixedHeightPaper={fixedHeightPaper} />
            <Cell judul="C4" selectEmpty={classes.selectEmpty} fixedHeightPaper={fixedHeightPaper} />
            <Cell judul="C5" selectEmpty={classes.selectEmpty} fixedHeightPaper={fixedHeightPaper} />
            <Cell judul="C6" selectEmpty={classes.selectEmpty} fixedHeightPaper={fixedHeightPaper} />
          </Grid>
          <TextField type="number" style={{
            marginTop: 60
          }} id="filled-basic" value={95.2719} variant="outlined" />
          <TextField type="number" style={{
            marginTop: 60, marginLeft: 20,
          }} id="filled-basic" value={90.5139} variant="outlined" />
          <TextField type="number" style={{
            marginTop: 60, marginLeft: 20,
          }} id="filled-basic" value={87.3684} variant="outlined" />
          <TextField type="number" style={{
            marginTop: 60, marginLeft: 20,
          }} id="filled-basic" value={91.2701} variant="outlined" />
          <TextField type="number" style={{
            marginTop: 60, marginLeft: 115,
          }} id="filled-basic" value={95.2719} label="Alt. Terbaik" variant="outlined" />
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}