import { isTSEnumMember } from "@babel/types";
import {
  makeStyles,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Avatar,
} from "@material-ui/core";
import { format } from "date-fns";
import { SubjectOutlined, AddCircleOutlineOutlined } from "@material-ui/icons";
import { useHistory, useLocation } from "react-router-dom";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: "#f9f9f9",
      width: "100%",
      padding: theme.spacing(3),
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    root: {
      display: "flex",
    },
    active: {
      background: "#f4f4f4",
    },
    title: {
      padding: theme.spacing(2),
    },
    appbar: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    toolbar: theme.mixins.toolbar,
    date: {
      flexGrow: 1,
    },
    avatar: {
      marginLeft: theme.spacing(2),
      background: "#f50057",
    },
  };
});

const menuItems = [
  {
    text: "My Notes",
    icon: <SubjectOutlined color="secondary" />,
    path: "/",
  },
  {
    text: "Create Notes",
    icon: <AddCircleOutlineOutlined color="secondary" />,
    path: "/create",
  },
];

const Layout = ({ children }) => {
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <AppBar className={classes.appbar} elevation={0}>
          <Toolbar>
            <Typography className={classes.date}>
              Today is {format(new Date(), "do MMMM Y")}
            </Typography>
            <Typography>Abdul</Typography>
            <Avatar className={classes.avatar}>A</Avatar>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          anchor="left"
          classes={{ paper: classes.drawerPaper }}
        >
          <div>
            <Typography variant="h5" className={classes.title}>
              Pages
            </Typography>
          </div>
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => history.push(item.path)}
                className={
                  location.pathname === item.path ? classes.active : null
                }
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Drawer>

        <div className={classes.page}>
          <div className={classes.toolbar}></div>
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
