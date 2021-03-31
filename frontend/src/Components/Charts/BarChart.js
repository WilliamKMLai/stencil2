import React from "react";
import PropTypes from "prop-types";

import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from '@material-ui/core/styles';
// Nivo chart
import { ResponsiveBar } from "@nivo/bar";

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

function BarChart(props) {
  const  classes  = useStyles(props);

  // plot settings
  const margin = { top: 5, right: 20, bottom: 80, left: 60 };

  const colors = { scheme: "spectral" };
  const theme = {
    fontSize: 14,
    fontFamily: "Roboto Slab"
  };
  const borderColor = { from: "color", modifiers: [["darker", 1.6]] };
  const axisBottom = {
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 45,
    legend: "p_adj_value",
    legendPosition: "middle",
    legendOffset: 40
  };
  const axisLeft = {
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: "freq",
    legendPosition: "middle",
    legendOffset: -40
  };

  return (
    <div className={classes.card}>
      <CardContent className={classes.chartContainer}>
        <ResponsiveBar
          data={props.chartData}
          keys={[ 'p_adj_value', 'freq' ]}
          groupMode="stacked"
          indexBy="p_adj_value"
          margin={margin}
          padding={0.3}
          innerPadding={3}
          theme={theme}
          enableLabel={false}
          layout={"vertical"}
          colors={colors}
          borderColor={borderColor}
          borderWidth={1}
          axisBottom={axisBottom}
          enableGridX={false}
          enableGridY={true}
          axisLeft={axisLeft}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor="inherit:darker(1.6)"
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          tooltip={data => {
            return (
              <span>
                <strong>
                  {data.id} : {data.value}
                </strong>
              </span>
            );
          }}
        />
      </CardContent>
    </div>
  );
}

BarChart.propTypes = {
  classes: PropTypes.object
};

export default BarChart;
