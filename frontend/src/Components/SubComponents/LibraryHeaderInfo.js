import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

function HeaderInfo(props) {
  return (
    <CardContent>
      <Grid container spacing={1} alignItems={"center"}>
        <Grid item sm={"auto"}>
          <Typography gutterBottom variant="h4" component="h2">
            {/* Target */}
            Library: {props.data.libraryId}<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            Sample: {props.data.sampleId ? props.data.sampleId : "N/A"}
          </Typography>

          {/* group tag */}
          <Typography component="p" variant="body1">
            {props.data.description ? props.data.description : "-"}
          </Typography>

        </Grid>
      </Grid>
      <Grid container spacing={1} alignItems={"center"}>
        <Grid item sm={"auto"}>
          {/* description */}
          <Typography component="p" variant="body1">
            Group Tag: {props.data.groupTag ? JSON.stringify(props.data.groupTag) : "N/A"} <br />
            Type: {props.data.libraryType ?  props.data.libraryType : "N/A"} <br />
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  );
}
export default HeaderInfo;
