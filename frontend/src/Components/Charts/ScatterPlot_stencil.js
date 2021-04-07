import React from "react";
import PropTypes from "prop-types";
import ReactDOMServer from "react-dom/server";

import { CardContent, Grid, Tooltip, IconButton} from "@material-ui/core";
import ImportIcon from "@material-ui/icons/GetApp";
import { makeStyles } from '@material-ui/core/styles';
// Nivo chart
import { ResponsiveScatterPlotCanvas, ScatterPlot } from "@nivo/scatterplot";
// Chart expansion
import FullScreenDialog from "./FullScreenScatterPlot";

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

function ScatterPlot_stencil(props) {
  const  classes  = useStyles(props);

  // plot settings
  const plotOptions = {
      theme: {
        fontSize: 14,
        fontFamily: "Roboto Slab",
        axis: {
            domain: {
                line: {
                    stroke: "#000000",
                    strokeWidth: 1
                }
            },
            ticks: {
                line: {
                    stroke: "#000000",
                    strokeWidth: 1
                }
            }
        },
        grid: {
          line: {
            stroke: "#333333",
            strokeWidth: 1
          }
        }
      },
      colors: { scheme: "spectral" },
      margin: { top: 24, right: 24, bottom: 80, left: 80 },
      xScale: { type: 'log', base: 10, min: '1', max: '1000000' },
      axisBottom: {
        tickValues: [0, 10, 100, 1000, 1000, 10000, 100000, 1000000, 10000000],
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 45,
        legend: 'Mean of Normalized Counts',
        legendPosition: 'middle',
        legendOffset: 46
      },
      yScale: { type: 'linear', min: 'auto', max: 'auto' },
      nodeSize: 5,
      axisLeft: {
          tickValues: [-4, -3, -2, -1, 0, 1, 2],
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Log Fold Change',
          legendPosition: 'middle',
          legendOffset: -60
      }
  };

  // Function to export the plot as svg
  let svgString = "";
  const handleExport = () => {
    svgString = ReactDOMServer.renderToStaticMarkup(
      React.createElement(ScatterPlot, {
        animate: false,
        isInteractive: false,
        renderWrapper: false,

        data: props.chartData,

        width: 600,
        height: 500,

        ...plotOptions
      })
    );

    // creating an svg file and triggering download
    //console.log(svgString);
    //console.log(props.chartData);
    const svgBlob = new Blob([svgString], {type:"image/svg+xml;charset=utf-8"});
    let svgURL = URL.createObjectURL(svgBlob);
    let downloadLink = document.createElement("a");

    downloadLink.href = svgURL;
    downloadLink.download = "scatterplot.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className={classes.card}>
      <Grid container direction="row">
        <Grid item>
          <FullScreenDialog plotData={props.chartData} plotOptions={plotOptions}
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
        <ResponsiveScatterPlotCanvas
          data={props.chartData}
          {...plotOptions}
        />
      </CardContent>
    </div>
  );
}

ScatterPlot_stencil.propTypes = {
  classes: PropTypes.object
};

export default ScatterPlot_stencil;
