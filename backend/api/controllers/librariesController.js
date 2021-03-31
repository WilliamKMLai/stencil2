const axios = require( "axios");
// require mongoose
const mongoose = require("mongoose");
// load configuration through environment variables from .env to process.env
require("dotenv").config();

// requiring the library model
const myLib = require("../models/libraryModel");
const myUser = require("../models/userModel");

//exports.use(session({secret:process.env.SESSION_ENCRYPTION, cookie: { maxAge: 24 * 60 * 60 * 1000 }, saveUninitialized:false}));

exports.queryUserId = (req, res, next) => {
  let queryId = req.params.uid;

  if ((queryId === req.session.username) || (req.session.role==="admin")){
    myUser.findOne({'userName': queryId})
    .exec()
    .then(doc => {
      returnMessage = "success";
      const response = {
        message: returnMessage,
        user: {  userName: doc.userName,
        userEmail: doc.userEmail,
        role: doc.role,
        authMode: doc.authMode,
        projects: doc.projects,
        createTimestamp: doc.createTimestamp,
        updateTimestamp: doc.updateTimestamp,
        status: doc.status}
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });

  }
  else
  {
    const response = {
      count: 0,
      message: "denied",
      users: {}
    };
    res.status(200).json(response);
  }
}

exports.allUsers = (req, res, next) => {
  if (req.session.role==="admin"){
    myUser.find()
    .exec()
    .then(docs => {
      returnMessage = "success";
      const response = {
        message: returnMessage,
        users: docs.map(doc => {
          return {
            userName: doc.userName,
            userEmail: doc.userEmail,
            role: doc.role,
            authMode: doc.authMode,
            projects: doc.projects,
            createTimestamp: doc.createTimestamp,
            updateTimestamp: doc.updateTimestamp,
            status: doc.status
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });

  }
  else
  {
    const response = {
      count: 0,
      message: "denied",
      users: {}
    };
    res.status(200).json(response);
  }
}

exports.getAllLibraryMetaInfo = (req, res, next) => {
  // console.log("get all libraries");
  // console.log( req.session.username);
  if (req.session.loggedin){
    myLib.find()
    .exec()
    .then(docs => {
      returnMessage = "";
      const response = {
        count: docs.length,
        message: returnMessage,
        uid: req.session.username,
        role: req.session.role,
        libraries: docs.map(doc => {
          return {
            dbId: doc._id,
            libraryId: doc.libraryId,
            sampleId: doc.sampleId,
            projectId: doc.projectId,
            groupTag: doc.groupTag,
            libraryType: doc.libraryType,
            createdBy: doc.createdBy,
            createTimestamp : doc.createTimestamp,
            updatedBy : doc.updatedBy,
            updateTimestamp : doc.updateTimestamp,
            status: doc.status
          };
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });

  }
  else
  {
    const response = {
      count: 0,
      message: "denied",
      libraries: {}
    };
    res.status(200).json(response);
  }

};

exports.queryLibraryDataById = (req, res, next) => {
  const responseMsg = {
    count:0,
    message: "",
    libraries: []
  };
  let queryId = req.params.dbid;
  //console.log("query the db", queryId);
  myLib.findOne({'_id': queryId})
    .exec()
    .then(doc => {

      returnMessage = "";

      var getList = [];
      var URLList = [];
      var url2data = {};

      if ((doc!==null) && (doc.libraryData!==undefined)){
              doc.libraryData.forEach(item => {
                if ((item.preLoadData!==null)) {
                  if(item.dataType ==="linePlot" || item.dataType ==="barchart" || item.dataType ==="scatterplot") {
                    var originalURL = item.URL;
                    //console.log(item.URL);
                    getList.push(axios.get(originalURL));
                    URLList.push(originalURL);
                  }
                }
              })
            }

            if (getList.length>0){
              axios.all(getList)
              .then (axios.spread((...responses) =>{
                let i=0;
                responses.forEach( item =>{
                    url2data[URLList[i]]= item.data;
                    i = i +1;
                    doc.libraryData.forEach(item=>{
                      if (url2data[item.URL] !== undefined) {
                        item["preLoadData"] =url2data[item.URL];
                      }
                    })
                  }
                );

{/*}
      //console.log(doc);
      //console.log(doc.libraryData);
      if ((doc!==null) && (doc.libraryData!==undefined)){
        doc.libraryData.forEach(item => {
          // console.log(item);
          if ((item.get('preLoadData')!==null) && (item.get('dataType')==="linePlot")){
            var originalURL = item.get('URL');
            getList.push(axios.get(originalURL));
            URLList.push(originalURL);
          }
        })
      }
      //console.log("URLs: ", URLList);
      //console.log("Parsed URLs: ", getList);

      if (getList.length>0){
        axios.all(getList)
        .then (axios.spread((...responses) =>{
          let i=0;
          responses.forEach(
            item =>{
              //console.log(item.data);
              url2data[URLList[i]]= item.data;
              i = i +1;
              doc.libraryData.forEach(item=>{
                //console.log(item);
                if (url2data[item.get('URL')] !== undefined) {
                  //console.log(item.get('URL'));
                  item.set("preLoadData", url2data[item.get('URL')]);
                  //console.log(item.get("preLoadData"));
                }
              })
            }
          );

*/}
          const response = {
            count: 1,
            message: returnMessage,
            libraries:[{
              dbId: doc._id,
              libraryId: doc.libraryId,
              sampleId: doc.sampleId,
              projectId: doc.projectId,
              groupTag: doc.groupTag,
              libraryData: doc.libraryData,
              libraryType: doc.libraryType,
              createdBy: doc.createdBy,
              createTimestamp : doc.createTimestamp,
              updatedBy : doc.updatedBy,
              updateTimestamp : doc.updateTimestamp,
              status: doc.status
            }]
          };
          res.status(200).json(response);

        }))

      }
      else
      {
        const response = {
          count: 1,
          message: returnMessage,
          libraries:[{
            dbId: doc._id,
            libraryId: doc.libraryId,
            sampleId: doc.sampleId,
            projectId: doc.projectId,
            groupTag: doc.groupTag,
            libraryData: doc.libraryData,
            libraryType: doc.libraryType,
            createdBy: doc.createdBy,
            createTimestamp : doc.createTimestamp,
            updatedBy : doc.updatedBy,
            updateTimestamp : doc.updateTimestamp,
            status: doc.status
          }]
        };
        res.status(200).json(response);
      }


    })
    .catch(err => {
      console.log(err);
      responseMsg["message"] = err;
      res.status(500).json(responseMsg);
    });
};

exports.createNewLibrary = (req, res, next) => {

  const responseMsg = {
    count:0,
    message: "",
    libraries: []
  };
  if (req.body.libraryId === undefined)
  {
    responseMsg["message"] = "The object misses the required field libraryId!";
    res.status(500).json(responseMsg);
    return;
  }


  if (req.body.sampleId === undefined)
  {
    req.body.sampleId = req.libraryId;
  }

  if (req.body.projectId === undefined)
  {
    responseMsg["message"] = "The object misses the required field projectId!";
    res.status(500).json(responseMsg);
    return
  }

  if (req.body.groupTag === undefined)
  {
    req.body.groupTag = {};
  }

  if (req.body.libraryType === undefined)
  {
    req.body.libraryType = "";
  }
  if (req.body.submitter === undefined)
  {
    req.body.submitter = "";
  }

  if (req.body.libraryData === undefined)
  {
    req.body.libraryData = [];
  }

  //if a library exists, the library data array will be updated
  //const docs = myLib.findOne({libraryId: req.body.libraryId, projectId: req.body.projectId }).select("target") // returns only those field names from db
  //.exec();
  const postedLibId = req.body.libraryId;
  const postedProjectId = req.body.projectId;
  const postedlibraryData = req.body.libraryData;
  const submittedBy = req.body.submitter;

  var ccc= 0;
  var libraryDataNameDict  = {};

  //verify the libraryData array in the posted library
  postedlibraryData.forEach(element => {
      ccc ++;
      if (element.layoutId === undefined){
        responseMsg["message"] = `The libraryData element # ${ccc} does not have the required "layoutId" key!!`;
        res.status(500).json(responseMsg);
        return;
      }

      if (element.stepId === undefined){
        responseMsg["message"] = `The libraryData element # ${ccc} does not have the required "stepId" key!!`;
        res.status(500).json(responseMsg);
        return;
      }

      if (element.tabId === undefined){
        element.tabId="";
      }

      // check whether two libraryData elements have the same element.layoutId + "$" +  element.stepId
      if (libraryDataNameDict[element.layoutId + "$" +  element.tabId + "$" + element.stepId] !== undefined) {
        responseMsg["message"] = `The combination key layoutId, tabId and stepId is not unique for this library!`;
        res.status(500).json(responseMsg);
        return;
      }
      libraryDataNameDict[element.layoutId + "$" +  element.tabId + "$" + element.stepId] = 1;
      element.dataTimeStamp = Date.now();
      element.dataEnteredBy = submittedBy;
    }
  );

  myLib.findOne({libraryId: postedLibId, projectId: postedProjectId }, (errMsg, doc) => {
    if (errMsg){
      responseMsg["message"] = `Fail to connect to db! the error message is ${errMsg}`;
      res.status(500).json(responseMsg);
      return;
    }
    else{
      if (doc){
        //library exists in the db, update the database
        doc.updateTimestamp = Date.now();
        doc.updatedBy = submittedBy;

        var docChangedFlag = 0;

        //check any new or updated libraryData element
        //based on stepId, tabId and layoutId
        postedlibraryData.forEach(postedNewDataElement => {
            let newDataLayoutId = postedNewDataElement.layoutId;
            let newDataTabId = (postedNewDataElement.tabId === undefined)? "":postedNewDataElement.tabId;
            let newDataStepId = postedNewDataElement.stepId;
            var newFlag = 1;
            for (var i = 0; i < doc.libraryData.length; i++)
            {
              if ((doc.libraryData[i].layoutId === newDataLayoutId) && (doc.libraryData[i].stepId === newDataStepId) && (doc.libraryData[i].tabId === newDataTabId))
              {
                newFlag =0;
                docChangedFlag =1;
                console.log("a libdata exist and updated!");
                doc.libraryData.splice(i, 1,  postedNewDataElement);
                break;
              }
            }
            if (newFlag === 1)
            {
              docChangedFlag =1;
              console.log("a new libdata added!");
              doc.libraryData.push(postedNewDataElement);
            }
          }
        )

        if (docChangedFlag === 1)
        {
          console.log("the doc is changed, and need to save");
          doc.save();
        }

        responseMsg["message"] = "success";
        res.status(202).json(responseMsg);
        return;

      }
      else{
        //library does not exist in the db, create a new library
        console.log("new library is registered in the database");
        // creating a new object for the library
        const newLib = new myLib({
          _id: new mongoose.Types.ObjectId(),
          libraryId: postedLibId,
          sampleId: req.body.sampleId,
          projectId: postedProjectId,
          groupTag: req.body.groupTag,
          libraryType: req.body.libraryType,
          libraryData: postedlibraryData,
        });

        newLib.status = "1";
        newLib.createdBy = submittedBy;
        newLib.updatedBy = submittedBy;
        newLib.createTimestamp = Date.now();
        newLib.updateTimestamp = newLib.createTimestamp;


        newLib.save()
          .then(result => {
            res.status(201).json({
              count: 1,
              message: "success",
              sample: {
                dbId: result._id,
                libraryId: result.libraryId,
                sampleId: result.sampleId,
                projectId: result.projectId,
                groupTag: result.groupTag,
                libraryType: result.libraryType,
                createdBy: result.createdBy,
                createTimestamp : result.createTimestamp,
                updatedBy : result.updatedBy,
                updateTimestamp : result.updateTimestamp,
                status: result.status
              }
            });
            return;
          })
          .catch(errMsg => {
            console.log("Error: faile to save the new library!");
            console.log(errMsg);
            responseMsg["message"] = `Fail to save the record! the error message is ${errMsg}`;
            res.status(500).json(responseMsg);
            return;
          });
      }
      //check the libraryData, if there is new data, insert, otherwise update

    }

  });

};
