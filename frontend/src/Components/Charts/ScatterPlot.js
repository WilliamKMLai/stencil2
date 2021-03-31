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
  };
  const colors = { scheme: "spectral" };

  return (
    <div className={classes.card}>
      <CardContent className={classes.chartContainer}>
        <ResponsiveScatterPlotCanvas
          data={props.chartData}
          theme={theme}
          colors={colors}
          margin={{ top: 60, right: 140, bottom: 70, left: 90 }}
          xScale={{ type: 'linear', min: 'auto', max: 'auto' }}
          yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
          nodeSize={5}
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
          legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 130,
                translateY: 0,
                itemWidth: 100,
                itemHeight: 12,
                itemsSpacing: 5,
                itemDirection: 'left-to-right',
                symbolSize: 12,
                symbolShape: 'rect',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        tooltip={({ node }) => (
            <div
                style={{
                    color: node.style.color,
                    background: '#333',
                    padding: '12px 16px',
                }}
            >
                <strong>
                    {node.data.id} {node.data.serieId}
                </strong>
                <br />
                {`x: ${node.data.formattedX}`}
                <br />
                {`y: ${node.data.formattedY}`}
            </div>
        )}
        />
      </CardContent>
    </div>
  );
}

ScatterPlot.propTypes = {
  classes: PropTypes.object
};

export default ScatterPlot;
