// App Configuration

const settings = {
  apiURL: "http://localhost:8081",
  SSOURL: "http://localhost",
  librariesEndPoint: "/libraries",
  libraryPageEndPoint: "/libraries/dbid",
  trackHubPrefix: "http://genome.ucsc.edu/cgi-bin/hgTracks?db=sacCer3&hubUrl="
};

const layoutFormat = {
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

  Transcribed_Noncoding: {
    layOut: [ [0],[1],[2] ],
    direction: "column",
    plotSizes: {
      0:[200,400],
      1:[200,400],
      2:[200,400]
    },
  },

  NonTranscribed: {
    layOut: [ [0],[1],[2] ],
    direction: "column",
    plotSizes: {
      0:[200,300],
      1:[200,300],
      2:[200,300]
    },
  },

  Motif_Analysis: {
    layOut: [ [[0,1]],[2],[3],[4] ],
    direction: "column",
    spacing: 8,
    plotSizes: {
      0:[300,150],
      1:[300,150],
      2:[400,300],
      3:[250,500],
      4:[300,500]
    },
    plotTitles: {0:"Forward", 1:"Reverse"}
  }

};

module.exports = {
  settings: settings,
  layoutFormat: layoutFormat
};
