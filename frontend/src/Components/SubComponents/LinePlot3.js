import React from "react";
import ReactDOMServer from "react-dom/server";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import ImportIcon from "@material-ui/icons/GetApp";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

// sub component
import { ResponsiveLine, Line } from "@nivo/line";
import FullScreenDialog from "./FullScreenDialog";

// component styles
const styles = {
  card: {
    minWidth: 275
  },
  chartContainer: {
    height: 500,
    width: 600
  },
  exportButton: {
    marginLeft: "88%"
  }
};

function FeatureCompositePlot(props) {
  const { classes } = props;
  var chartData = props.chartData;
  if (chartData["Xaxis"] === undefined ){
    return "The data does not hava a required key Xaxis";
  }
  if (chartData["Yaxis"] === undefined ){
    return "The data does not hava a required key Yaxis";
  }

  let xValues = props.chartData.Xaxis.split(",");
  let plotData = [];
  let plotColors = [];

  let yMaxValue = 10;

  Yaxis.forEach(element => {
    datasetTitle= element.title;
    yColor = element.color;
    yValues=element.data.split(",");
    lineData = [];

    if (! yColor.startsWith("#")) {
      yColor = "#" + yColor;
    }
    plotColors.push(yColor);

    for (let i = 0; i < yValues.length; i++) {
      if (i % 5 === 0) {
        if (yValues[i]>yMaxValue){
          yMaxValue = yValues[i];
        }
        sData5.push({
          x: parseInt(xValues[i]),
          y: parseFloat(yValues[i])
        });
      }
    }
    plotData.push({
      id: datasetTitle,
      data: lineData
    });

  });

  const plotOptions = {
    margin: { top: 5, right: 20, bottom: 80, left: 60 },
    xScale: {
      type: "linear",
      stacked: false,
      min: -(xValues.length / 2),
      max: xValues.length / 2
    },
    yScale: { type: "linear", stacked: false, min: 0, max: yMaxValue },
    axisBottom: {
      orient: "bottom",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Distance from TSS (bp)",
      legendOffset: 46,
      legendPosition: "middle"
    },
    axisLeft: {
      orient: "left",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Occupancy",
      legendOffset: -50,
      legendPosition: "middle"
    },
    theme: {
      fontSize: 14,
      fontFamily: "Roboto Slab",
      markers: {
        textColor: "black",
        fontSize: 12
      }
    },
    colors: plotColors,
    enablePoints: false,
    legends: [
      {
        anchor: "bottom",
        direction: "row",
        justify: false,
        translateX: 0,
        translateY: 80,
        itemsSpacing: 0,
        itemDirection: "left-to-right",
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 1.0,
        symbolSize: 12,
        symbolShape: "circle",
        symbolBorderColor: "rgba(0, 0, 0, .5)"
      }
    ]
  };

  // Function to export the plot as svg
  let svgString = "";
  const handleExport = () => {
    svgString = ReactDOMServer.renderToStaticMarkup(
      React.createElement(Line, {
        animate: false,
        isInteractive: false,
        renderWrapper: false,

        data: plotData,

        width: 1200,
        height: 500,

        ...plotOptions
      })
    );

    // creating an svg file and triggering download
    const element = document.createElement("a");
    const file = new Blob([svgString]);
    element.href = URL.createObjectURL(file);
    element.download = "linePlot.svg";
    // Required for this to work in FireFox
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className={classes.card}>
      <Grid container direction="row">
        <Grid item>
          <FullScreenDialog
            sampleSenseData={sData5}
            controlSenseData={cData5}
            ymin={0}
            ymax={ymax}
            axisTickValues={40}
          />
        </Grid>
        <Grid>
          <IconButton
            className={classes.exportButton}
            color="primary"
            onClick={handleExport}
          >
            <Tooltip title="Export as SVG" aria-label="export as svg">
              <ImportIcon />
            </Tooltip>
          </IconButton>
        </Grid>
      </Grid>

      <CardContent className={classes.chartContainer}>
        <ResponsiveLine
          data={plotData}
          axisTop={null}
          axisRight={null}
          {...plotOptions}
          enablePoints={false}
          enableSlices={"x"}
          markers={[
            {
              axis: "x",
              value: 0,
              lineStyle: {
                stroke: "#000",
                strokeWidth: 2,
                strokeDasharray: (10, 8)
              },
              legend: ""
            }
          ]}
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              justify: false,
              translateX: 0,
              translateY: 80,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 1.0,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)"
            }
          ]}
        />
      </CardContent>
    </div>
  );
}

FeatureCompositePlot.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FeatureCompositePlot);
