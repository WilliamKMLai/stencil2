// App Configuration

const settings = {
  apiURL: "http://localhost:8081",
  SSOURL: "http://localhost",
  librariesEndPoint: "/libraries",
  libraryPageEndPoint: "/libraries/dbid",
  trackHubPrefix: "http://genome.ucsc.edu/cgi-bin/hgTracks?db=sacCer3&hubUrl="
};

const layoutFormat = {
  Motif_Analysis: {
    layOut: [ [0,[2,3]],[1],[4]],
    direction: "column",
    plotSizes: {
      0:[400,300],
      1:[200,600],
      2:[300,100],
      3:[300,100],
      4:[150,600]
    },
    plotTitles: {2:"Forward", 3:"Reverse"}
  },

  Bar_Chart: {
    layOut: [[0]],
    direction: "column",
    plotSizes: {
      0:[600,400],
    },
    plotTitles: {2:"Forward", 3:"Reverse"}
  },

  Scatter_Plot: {
    layOut: [[0]],
    direction: "column",
    plotSizes: {
      0:[800,400],
    },
    plotTitles: {2:"Forward", 3:"Reverse"}
  },

  Transcribed_Features: {
    layOut: [ [0],[1],[2],[3], [4]],
    direction: "column",
    plotSizes: {
      0:[150,400],
      1:[150,400],
      2:[150,400],
      3:[150,400],
      4:[150,400]
    },
    plotTitles: {2:"Forward", 3:"Reverse"}
  },

  NonCoding_Features: {
    layOut: [ [0],[1],[2]],
    direction: "column",
    plotSizes: {
      0:[200,400],
      1:[200,400],
      2:[200,400]
    },
    plotTitles: {2:"Forward", 3:"Reverse"}
  },

  NonTranscribed_Features: {
    layOut: [ [0],[1],[2]],
    direction: "column",
    plotSizes: {
      0:[200,400],
      1:[200,400],
      2:[200,400]
    },
    plotTitles: {2:"Forward", 3:"Reverse"}
  },

};

module.exports = {
  settings: settings,
  layoutFormat: layoutFormat
};
