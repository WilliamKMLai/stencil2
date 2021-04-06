import React from "react";
import PropTypes from "prop-types";
import ReactDOMServer from "react-dom/server";

import { CardContent, Grid, Tooltip, IconButton} from "@material-ui/core";
import ImportIcon from "@material-ui/icons/GetApp";
import { makeStyles } from '@material-ui/core/styles';
// Nivo chart
import { ResponsiveBar } from "@nivo/bar";
import { Bar } from "@nivo/bar";

// Chart expansion
import FullScreenDialog from "./FullScreenBarChart";

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

  // BarChart settings
  //console.log(props.chartOptions);
  const keys = props.chartOptions['keys'].split(",");
  const plotOptions = {
    ...(props.chartOptions['indexBy']?{indexBy: props.chartOptions['indexBy']}:{indexBy: keys[0]}),
    ...(props.chartOptions['layout']?{layout: props.chartOptions['layout']}:{layout: "vertical"}),
    ...(props.chartOptions['groupMode']?{groupMode: props.chartOptions['groupMode']}:{groupMode: "stacked"}),
    ...(props.chartOptions['colors']?{colors: props.chartOptions['colors']}:{colors: [ '#00ffff' ]}),
    ...(props.chartOptions['borderColor']?{borderColor: props.chartOptions['borderColor']}:{borderColor: [ '#000000' ]}),
    ...(props.chartOptions['borderWidth']?{borderWidth: props.chartOptions['borderWidth']}:{borderWidth: 1}),
    ...(props.chartOptions['padding']?{padding: props.chartOptions['padding']}:{padding: 0}),
    ...(props.chartOptions['innerPadding']?{innerPadding: props.chartOptions['innerPadding']}:{innerPadding: 1}),

    ...(props.chartOptions['axisBottom']?{
            axisBottom: {
            ...(props.chartOptions['axisBottom']['tickSize']?
              { tickSize: props.chartOptions['axisBottom']['tickSize']}:
              { tickSize: 5 }),
            ...(props.chartOptions['axisBottom']['tickPadding']?
              { tickPadding: props.chartOptions['axisBottom']['tickPadding']}:
              { tickPadding: 5 }),
            ...(props.chartOptions['axisBottom']['tickRotation']?
              { tickRotation: props.chartOptions['axisBottom']['tickRotation'] }:
              { tickRotation: 45 }),
            ...(props.chartOptions['axisBottom']['legend']?
              { legend: props.chartOptions['axisBottom']['legend'] }:
              { legend: keys[0]}),
            ...(props.chartOptions['axisBottom']['legendPosition']?
              { legendPosition: props.chartOptions['axisBottom']['legendPosition'] }:
              { legendPosition: "middle"} ),
            ...(props.chartOptions['axisBottom']['legendOffset']?
              { legendOffset: props.chartOptions['axisBottom']['legendOffset'] }:
              { legendOffset: 60} )
          }
      }
      :{
        axisBottom: {
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 45,
          legend: keys[0],
          legendPosition: "middle",
          legendOffset: 60
        }
      }
    ),

    ...(props.chartOptions['axisLeft']?{
            axisLeft: {
            ...(props.chartOptions['axisLeft']['tickSize']?
              { tickSize: props.chartOptions['axisLeft']['tickSize']}:
              { tickSize: 5 }),
            ...(props.chartOptions['axisLeft']['tickPadding']?
              { tickPadding: props.chartOptions['axisLeft']['tickPadding']}:
              { tickPadding: 5 }),
            ...(props.chartOptions['axisLeft']['tickRotation']?
              { tickRotation: props.chartOptions['axisLeft']['tickRotation'] }:
              { tickRotation: 0 }),
            ...(props.chartOptions['axisLeft']['legend']?
              { legend: props.chartOptions['axisLeft']['legend'] }:
              { legend: keys[1]}),
            ...(props.chartOptions['axisLeft']['legendPosition']?
              { legendPosition: props.chartOptions['axisLeft']['legendPosition'] }:
              { legendPosition: "middle"} ),
            ...(props.chartOptions['axisLeft']['legendOffset']?
              { legendOffset: props.chartOptions['axisLeft']['legendOffset'] }:
              { legendOffset: -50} )
          }
      }
      :{
        axisLeft: {
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: keys[1],
          legendPosition: "middle",
          legendOffset: -50
        }
      }
    ),

    margin: { top: 5,right: 20, bottom: 80, left: 60 },
    theme: {
      fontSize: 12,
      fontFamily: "Roboto Slab"
    },
    enableLabel: false,
    enableGridX: false,
    enableGridY: true,
    colorBy: "id",
    labelSkipWidth: 12,
    labelSkipHeight: 12,
    labelTextColor: "#000000",
    animate: true,
    motionStiffness: 90,
    motionDamping: 15
  };

  // Function to export the plot as svg
  let svgString = "";
  const handleExport = () => {
    svgString = ReactDOMServer.renderToStaticMarkup(
      React.createElement(Bar, {
        animate: false,
        isInteractive: false,
        renderWrapper: false,

        data: props.chartData,
        keys: {keys},

        width: 600,
        height: 500,

        ...plotOptions
      })
    );

    // creating an svg file and triggering download
    const element = document.createElement("a");
    const file = new Blob([svgString]);
    element.href = URL.createObjectURL(file);
    element.download = "barchart.svg";
    // Required for this to work in FireFox
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className={classes.card}>
      <Grid container direction="row">
        <Grid item>
          <FullScreenDialog plotData={props.chartData} keys={keys} plotOptions={plotOptions}
          />
        </Grid>
        <Grid>
          <IconButton className={classes.exportButton} color="primary" onClick={handleExport}>
            <Tooltip title="Export as SVG" aria-label="export as svg">
              <ImportIcon />
            </Tooltip>
          </IconButton>
        </Grid>
      </Grid>

      <CardContent className={classes.chartContainer}>
        <ResponsiveBar
          data={props.chartData}
          keys={keys}
          {...plotOptions}
        />
      </CardContent>
    </div>
  );
}

BarChart.propTypes = {
  classes: PropTypes.object
};

export default BarChart;
