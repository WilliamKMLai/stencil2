import React from "react";
import PropTypes from "prop-types";
import ReactDOMServer from "react-dom/server";

import { CardContent, Grid, Tooltip, IconButton} from "@material-ui/core";
import ImportIcon from "@material-ui/icons/GetApp";
import { makeStyles } from '@material-ui/core/styles';
// Nivo chart
import { ResponsiveHeatMap, HeatMap } from "@nivo/heatmap";
// Chart expansion
import FullScreenDialog from "./FullScreenHeatMap";

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

function Heatmap_stencil(props) {
  const  classes  = useStyles(props);

  if (props.chartData === undefined ){
    return "No chart data detected";
  }

  // Scatterplot settings
  const plotOptions = {
    ...(props.chartOptions['keys']?{keys: props.chartOptions['keys']}:{ }),
    ...(props.chartOptions['indexBy']?{indexBy: props.chartOptions['indexBy']}:{indexBy: props.chartOptions['keys'][0]}),
    ...(props.chartOptions['forceSquare']?{forceSquare: props.chartOptions['forceSquare']}:{forceSquare: true}),
    ...(props.chartOptions['hoverTarget']?{hoverTarget: props.chartOptions['hoverTarget']}:{hoverTarget: "rowColumn"}),
    ...(props.chartOptions['cellHoverOthersOpacity']?{cellHoverOthersOpacity: props.chartOptions['cellHoverOthersOpacity']}:{cellHoverOthersOpacity: 0.25}),
    ...(props.chartOptions['cellOpacity']?{cellOpacity: props.chartOptions['cellOpacity']}:{cellOpacity: 1}),

    ...(props.chartOptions['axisTop']?{
            axisTop: {
            ...(props.chartOptions['axisTop']['orient']?{ orient: props.chartOptions['axisTop']['orient']}:{ orient: "top" }),
            ...(props.chartOptions['axisTop']['tickSize']?{ tickSize: props.chartOptions['axisTop']['tickSize']}:{ tickSize: 5 }),
            ...(props.chartOptions['axisTop']['tickPadding']?{ tickPadding: props.chartOptions['axisTop']['tickPadding']}:{ tickPadding: 5 }),
            ...(props.chartOptions['axisTop']['tickRotation']?{ tickRotation: props.chartOptions['axisTop']['tickRotation'] }:{ tickRotation: -90 }),
            ...(props.chartOptions['axisTop']['legend']?{ legend: props.chartOptions['axisTop']['legend'] }:{ legend: "" }),
            ...(props.chartOptions['axisTop']['legendPosition']?{ legendPosition: props.chartOptions['axisTop']['legendPosition'] }:{ legendPosition: "middle"} ),
            ...(props.chartOptions['axisTop']['legendOffset']?{ legendOffset: props.chartOptions['axisTop']['legendOffset'] }:{ legendOffset: 36} )
          },
      }
      :{
        axisTop: {orient: 'top', tickSize: 5, tickPadding: 5, tickRotation: -90, legend: '', legendOffset: 36},
      }),

      ...(props.chartOptions['axisLeft']?{
            axisLeft: {
            ...(props.chartOptions['axisTop']['orient']?{ orient: props.chartOptions['axisTop']['orient']}:{ orient: "left" }),
            ...(props.chartOptions['axisLeft']['tickSize']?{ tickSize: props.chartOptions['axisLeft']['tickSize']}:{ tickSize: 5 }),
            ...(props.chartOptions['axisLeft']['tickPadding']?{ tickPadding: props.chartOptions['axisLeft']['tickPadding']}:{ tickPadding: 5 }),
            ...(props.chartOptions['axisLeft']['tickRotation']?{ tickRotation: props.chartOptions['axisLeft']['tickRotation'] }:{ tickRotation: -90 }),
            ...(props.chartOptions['axisLeft']['legend']?{ legend: props.chartOptions['axisLeft']['legend'] }:{ legend: "" }),
            ...(props.chartOptions['axisLeft']['legendPosition']?{ legendPosition: props.chartOptions['axisLeft']['legendPosition'] }:{ legendPosition: "middle"} ),
            ...(props.chartOptions['axisLeft']['legendOffset']?{ legendOffset: props.chartOptions['axisLeft']['legendOffset'] }:{ legendOffset: -40} )
          },
      }
      :{
        axisLeft: {orient: "left", tickSize: 5, tickPadding: 5, tickRotation: 0, legend: '', legendPosition: 'middle', legendOffset: -40},
      }),

      cellBorderColor: { from: 'color', modifiers: [ [ 'darker', 0.4 ] ] },
      labelTextColor: { from: 'color', modifiers: [ [ 'darker', 1.8 ] ] },
      defs: [
          {
              id: 'lines',
              type: 'patternLines',
              background: 'inherit',
              color: 'rgba(0, 0, 0, 0.1)',
              rotation: -45,
              lineWidth: 4,
              spacing: 7
          }
      ],
      fill: [ { id: 'lines' } ],
      margin: { top: 40, right: 40, bottom: 40, left: 40 },
      //Always finish live chart with these
      animate: true,
      motionConfig: "wobbly",
      motionStiffness: 90,
      motionDamping: 15
  };

  // Function to export the plot as svg
  let svgString = "";
  const handleExport = () => {
    svgString = ReactDOMServer.renderToStaticMarkup(
      React.createElement(HeatMap, {
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
    downloadLink.download = "heatmap.svg";
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
        <ResponsiveHeatMap
          data={props.chartData}
          {...plotOptions}
        />
      </CardContent>
    </div>
  );
}

Heatmap_stencil.propTypes = {
  classes: PropTypes.object
};

export default Heatmap_stencil;
