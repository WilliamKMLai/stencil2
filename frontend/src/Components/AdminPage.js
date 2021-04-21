import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import { Paper, Typography, Button, Tabs, Tab } from "@material-ui/core";

// Import Table components
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";

import DataContext from "./DataContext";
import Config from "../Config";

const styles = theme => ({

  table: {
  },

  root: {
    height: "100%",
    maxWidth: 980,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto",
    padding: 20
  },
  footer: {
    /* Prevent Chrome, Opera, and Safari from letting these items shrink to smaller than their content's default minimum size. */
    flexShrink: 0
  },
  jumbotron: {
    padding: "2rem 2rem",
    [theme.breakpoints.down("sm")]: {
      padding: "4rem 0rem"
    }
  },
  container: {
    maxWidth: "1140px",
    paddingRight: 15,
    paddingLeft: 15,
    margin: "auto"
  }
});

class AdminPage extends React.Component {

  static contextType = DataContext;
  state = {
    selectedTab:0,
  };
  // handling tab changes
  handleTabChange = (event, value) => {
    this.setState({
      selectedTab: value,
    });
  };

  render() {
    const { classes } = this.props;
    // Setting the title of the browser tab
    document.title = "Admin";

    let tabnames = [];
    tabnames.push(<Tab label="Edit Users" key="0" />);
    tabnames.push(<Tab label="Edit Projects" key="1" />);
    var selectedTab = this.state.selectedTab;
    let content = "";

    switch (selectedTab) {
      default:
      case 0:
        content = <UserTable />
      break;
      case 1:
        content = <ProjectTable />
      break;
    }

    return(
      <div className={classes.root}>
        <div className={classes.content}>
          <Paper square>
            <div className={classes.jumbotron}>
              <div className={classes.container}>
                <Typography variant="h4" gutterBottom>
                   STENCIL Admin Console
                </Typography>
                <Typography component="div" className={classes.contentHolder}>
                      <Tabs
                        value={selectedTab}
                        onChange={this.handleTabChange}
                        centered={true}
                        indicatorColor="primary"
                        textColor="primary"
                      >
                        {tabnames}
                      </Tabs>
                      <br />
                      {content}
                </Typography>
              </div>
            </div>
          </Paper>
        </div>
      </div>

    )

  }
}

class UserTable extends React.Component{
  state = {
    "users":[],
  };

  componentDidMount() {
    axios
      .get(Config.settings.apiURL + "/libraries/alluid", {withCredentials: true})
      .then(res => {
        this.setState({"users":res.data.users});
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <Paper square>
        <div>
          <div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">User</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Role</TableCell>
                  <TableCell align="left">Projects</TableCell>
                  <TableCell align="left">Created</TableCell>
                  <TableCell align="left">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.users.map((user) => (
                  <TableRow key={user.userName}>
                    <TableCell component="th" scope="row">
                      <Link to={"/edituser/"+ user.userName}>{user.userName}</Link>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {user.userEmail}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {user.role}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {user.projects.join(",")}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {user.createTimestamp.replace(/T.+/, '')}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {user.status}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </div>
        </div>
      </Paper>
    );
  }
}

class ProjectTable extends React.Component {
  static contextType = DataContext;
  state = {};
  componentDidMount() {
    axios
      .get(Config.settings.apiURL + "/libraries/allprojs", {withCredentials: true})
      .then(res => {
        let hh = {};
        res.data.forEach(item=>{
            hh[item.projectId] = item.public;
            this.setState({[item.projectId]:item.public});
          }
        )
      })
      .catch(err => { console.log(err); });
  }

  render() {
    // Setting the title of the browser tab
    let handleCheckboxChange = event =>{
      let target = event.target;
      let value =  target.checked;
      let name = target.name;
      console.log("show ssss");
      console.log(String(value));
      this.state[name]?this.setState({[name]: false}):this.setState({[name]: true})
    }

    return(
      <div>
        <div>
        <form
          id="main-login"
          action={Config.settings.apiURL + "/updateProjects"}
          method="post">
          <Paper square>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Project ID</TableCell>
                      <TableCell align="left">Public</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.keys(this.state).map((proj) => (
                      <TableRow key={proj}>
                        <TableCell component="th" scope="row">
                          {proj}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <input name={proj}
                          id={proj}
                          type="checkbox"
                          checked={this.state[proj]}
                          onChange={handleCheckboxChange}
                           />

                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Button type="submit" color="primary" fullWidth variant="contained">Submit</Button>
              </TableContainer>
          </Paper>
        </form>
        </div>
      </div>
    )
  }
}

AdminPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdminPage);
