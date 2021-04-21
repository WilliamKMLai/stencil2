import React from "react";
import PropTypes from "prop-types";

import { CardContent } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

// Table components
import { DataGrid } from "@material-ui/data-grid";

// Component styles
const useStyles = makeStyles({
  fullList: {
    width: "auto",
    height: "auto"
  }
});

function BasicTable(props) {
    const classes = useStyles(props);

    if (props.tableData === undefined ){
        return "No table data detected";
    }

    //console.log(props);
    //console.log(props.tableData);
    //console.log(props.tableData.columns);
    //console.log(props.tableData.rows);
    return (
      <CardContent className={classes.fullList}>
        <div style={{ height: props.height, width: props.width }}>
          <DataGrid rows={props.tableData.rows} columns={props.tableData.columns} pageSize={5} />
        </div>
      </CardContent>
    );
}

BasicTable.propTypes = {
  classes: PropTypes.object
};

export default BasicTable;
