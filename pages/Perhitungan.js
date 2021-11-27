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
import Button from '@material-ui/core/Button';
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

const initialState = {
  select: '', display: '', kepentingan: null, pembagi: 0,
  c1: null, c2: null, c3: null, c4: null, hasil: 0,
  normal1: 0, normal2: 0, normal3: 0, normal4: 0
};

function reducer(state, action) {
  switch (action.type) {
    case 'updateFieldValue':
      return { ...state, [action.field]: action.value };
    case 'Cost':
      const bagiCost = { pembagi: Math.min(state.c1, state.c2, state.c3, state.c4) }
      return {
        ...state,
        select: '', pembagi: bagiCost.pembagi, display: 'Cost',
        normal1: bagiCost.pembagi / state.c1, normal2: bagiCost.pembagi / state.c2, 
        normal3: bagiCost.pembagi / state.c3, normal4: bagiCost.pembagi / state.c4
      }
    case 'Benefit':
      const bagiBenefit = { pembagi: Math.max(state.c1, state.c2, state.c3, state.c4) }
      return {
        ...state,
        select: '', pembagi: bagiBenefit.pembagi, display: 'Benefit',
        normal1: state.c1 / bagiBenefit.pembagi, normal2: state.c2 / bagiBenefit.pembagi,
        normal3: state.c3 / bagiBenefit.pembagi, normal4: state.c4 / bagiBenefit.pembagi
      }
    default:
      throw new Error();
  }
}

function Cell(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    if (state.select === 'Cost') {
      dispatch({type: 'Cost'})
    } else if (state.select === 'Benefit') {
      dispatch({type: 'Benefit'})
    } else {
      state.select = ''
    }
  })

  const onChange = (field) => (event) => {
    dispatch({ type: "updateFieldValue", field, value: event.target.value });
  }

  return (
    <Grid item xs={3}>
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
        <Select onChange={onChange('select')} value={state.display} displayEmpty 
        className={props.selectEmpty} variant="outlined" inputProps={{
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
        }} id="filled-basic" onChange={onChange('kepentingan')} value={state.kepentingan} 
        label="Kepentingan" variant="filled" />
        <Typography variant="subtitle2" style={{
          marginBottom: 10,
          marginTop: 10
        }}>Bobot</Typography>
        <TextField type="number" style={{
          marginBottom: 10
        }} id="filled-basic" onChange={onChange('c1')} value={state.c1} 
        label="A1" variant="filled" />
        <TextField type="number" style={{
          marginBottom: 10
        }} id="filled-basic" onChange={onChange('c2')} value={state.c2} 
        label="A2" variant="filled" />
        <TextField type="number" style={{
          marginBottom: 10
        }} id="filled-basic" onChange={onChange('c3')} value={state.c3} 
        label="A3" variant="filled" />
        <TextField type="number" style={{
          marginBottom: 10
        }} id="filled-basic" onChange={onChange('c4')} value={state.c4} 
        label="A4" variant="filled" />
        <Typography variant="subtitle2" style={{
          marginBottom: 10,
          marginTop: 10
        }}>Pembagi</Typography>
        <TextField type="number" style={{
          marginBottom: 10
        }} onChange={onChange('pembagi')} value={state.pembagi} 
        id="filled-basic" disabled variant="outlined" />
        <Typography variant="subtitle2" style={{
          marginBottom: 10,
          marginTop: 10
        }}>Normalisasi</Typography>
        <TextField type="number" style={{
          marginBottom: 10
        }} onChange={onChange('normal1')} value={state.normal1} 
        id="filled-basic" disabled variant="outlined" />
        <TextField type="number" style={{
          marginBottom: 10
        }} onChange={onChange('normal2')} value={state.normal2} 
        id="filled-basic" disabled variant="outlined" />
        <TextField type="number" style={{
          marginBottom: 10
        }} onChange={onChange('normal3')} value={state.normal3} 
        id="filled-basic" disabled variant="outlined" />
        <TextField type="number" style={{
          marginBottom: 10
        }} onChange={onChange('normal4')} value={state.normal4} 
        id="filled-basic" disabled variant="outlined" />
      </Paper>
    </Grid>
  );
}

export default function Perhitungan() {
  const classes = useStyles();
  const router = useRouter();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [open, setOpen] = React.useState(true);
  const [state, dispatch] = React.useReducer(reducer, initialState);

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
        <Container maxWidth="xl" className={classes.container}>
          <Grid container spacing={3}>
            <Cell judul="C1" selectEmpty={classes.selectEmpty} fixedHeightPaper={fixedHeightPaper} />
            <Cell judul="C2" selectEmpty={classes.selectEmpty} fixedHeightPaper={fixedHeightPaper} />
            <Cell judul="C3" selectEmpty={classes.selectEmpty} fixedHeightPaper={fixedHeightPaper} />
            <Cell judul="C4" selectEmpty={classes.selectEmpty} fixedHeightPaper={fixedHeightPaper} />
          </Grid>
          <Button fullWidth={true} style={{marginTop: 30}} variant="contained" color="primary">
            Hitung Hasil
          </Button>
          <Box style={{marginTop: 30}} display="flex" justifyContent="center">
            <TextField type="number" style={{
              marginRight: 10
            }} id="filled-basic" disabled value={95.2719} variant="filled" />
            <TextField type="number" style={{
              marginRight: 10
            }} id="filled-basic" disabled value={90.5139} variant="filled" />
            <TextField type="number" style={{
              marginRight: 10
            }} id="filled-basic" disabled value={87.3684} variant="filled" />
            <TextField type="number" style={{
              marginRight: 10
            }} id="filled-basic" disabled value={91.2701} variant="filled" />
            <TextField type="number" style={{
              marginRight: 10
            }} id="filled-basic" disabled value={95.2719} label="Alt. Terbaik" variant="filled" />
          </Box>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}