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

  SingleChart: {
    layOut: [[0]],
    direction: "column",
    plotSizes: {
      0:[800,600],
    }
  },

  Transcribed_Features: {
    layOut: [ [0],[1],[2],[3],[4],[5],[6],[7] ],
    direction: "column",
    spacing: 2,
    plotSizes: {
      0:[300,300],
      1:[300,300],
      2:[300,300],
      3:[190,410],
      4:[190,410],
      5:[190,410],
      6:[190,410],
      7:[190,410]
    },
    plotTitles: {2:"Forward", 3:"Reverse"}
  },

  ThreePlots: {
    layOut: [ [0],[1],[2] ],
    direction: "column",
    plotSizes: {
      0:[200,400],
      1:[200,400],
      2:[200,400]
    },
  },

};

module.exports = {
  settings: settings,
  layoutFormat: layoutFormat
};
