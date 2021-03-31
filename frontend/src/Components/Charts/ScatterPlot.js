import React from "react";
import PropTypes from "prop-types";

import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from '@material-ui/core/styles';
// Nivo chart
import { ResponsiveScatterPlotCanvas } from "@nivo/scatterplot";

// Component styles
const useStyles = makeStyles({
  card:props=> ({
    minWidth: 275
  }),
  exportButton:props=> ({
    marginLeft: "88%"
  }),
  chartContainer: props=>({
    height: props.height,
    width: props.width
  })

});

function ScatterPlot(props) {
  const  classes  = useStyles(props);

  // plot settings
  const theme = {
    fontSize: 14,
    fontFamily: "Roboto Slab"
  };

  return (
    <div className={classes.card}>
      <CardContent className={classes.chartContainer}>
        <ResponsiveScatterPlotCanvas
          data={props.chartData}
          theme={theme}
          margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
          xScale={{ type: 'linear', min: 'auto', max: 'auto' }}
          yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
          nodeSize={5}
          axisTop={null}
          axisRight={null}
          axisBottom={{
              orient: 'bottom',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 45,
              legend: 'x',
              legendPosition: 'middle',
              legendOffset: 46
          }}
          axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'y',
              legendPosition: 'middle',
              legendOffset: -60
          }}
        />
      </CardContent>
    </div>
  );
}

ScatterPlot.propTypes = {
  classes: PropTypes.object
};

export default ScatterPlot;
