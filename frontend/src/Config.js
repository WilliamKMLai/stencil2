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
      0:[800,400],
    }
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
    layOut: [ [0],[1],[2],[3],[4],[5],[6],[7] ],
    direction: "column",
    plotSizes: {
      0:[190,410],
      1:[190,410],
      2:[190,410],
      3:[190,410],
      4:[190,410],
      5:[300,300],
      6:[300,300],
      7:[300,300]
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

};

module.exports = {
  settings: settings,
  layoutFormat: layoutFormat
};
