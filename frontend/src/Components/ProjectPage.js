import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Button from '@material-ui/core/Button';
import { Typography, Paper } from "@material-ui/core";
import { Table, TableBody, TableCell, TableContainer,  TableHead, TableRow } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import Config from "../Config";
import DataContext from "./DataContext";

const styles = theme => ({
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

class ProjectPage extends React.Component {

  static contextType = DataContext;
  state = {};
  componentDidMount() {
    axios
      .get(Config.settings.apiURL + "/libraries/allprojs", {withCredentials: true})
      .then(res => {
        let hh = {};
        res.data.map(item=>{
          hh[item.projectId] = item.public;
          this.setState({[item.projectId]:item.public});

        }
        )

      })
      .catch(err => {
        console.log(err);
      });
  }



  render() {
    const { classes } = this.props;

    // Setting the title of the browser tab
    document.title = "Project Information";
    let handleCheckboxChange = event =>{
      let target = event.target;
      let value =  target.checked;
      let name = target.name;
      console.log("show ssss");
      console.log(String(value));
      this.state[name]?this.setState({[name]: false}):this.setState({[name]: true})

    }

    return(
      <div className={classes.root}>
        <div className={classes.content}>
        <form
                    id="main-login"
                    action={Config.settings.apiURL + "/updateProjects"}
                    method="post">
        <Paper square>
          <div className={classes.jumbotron}>
            <div className={classes.container}>
            <Typography variant="h4" gutterBottom>
              Project Information
            </Typography>
            <TableContainer component={Paper}>
              <Table className={classes.table}>
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
            </div>
          </div>
        </Paper>
        </form>
        </div>
      </div>

    )

  }
}

ProjectPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProjectPage);
