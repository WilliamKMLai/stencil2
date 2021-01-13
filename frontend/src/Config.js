// App Configuration

const settings = {
  apiURL: "http://localhost:8081",
  samplesEndpoint: "/samples",
  librariesEndPoint: "/libraries",
  libraryPageEndPoint: "/libraries/dbid",
  trackHubPrefix: "http://genome.ucsc.edu/cgi-bin/hgTracks?db=sacCer3&hubUrl="
};

const layoutFormat = {
  Motif_Analysis: {
    layOut: [[0,1], [[2,3]]],
    plotSizes: {
      0:[400,300],
      1:[200,300],
      2:[398,147],
      3:[398,147],
    },
    plotTitles: {2:"Forward", 3:"Reverse"}
  },

};

module.exports = {
  settings: settings,
  layoutFormat: layoutFormat
};
