var request = require("request");
var AWS = require("aws-sdk");
AWS.config.update({
    region: 'us-east-1',
    endpoint: 'http://dynamodb.us-east-1.amazonaws.com',
    endpoint: 'http://dynamodb:us-east-2:197221485886:table/my_table',
    accessKeyId: "process.env.ACCESS_KEY",
    secretAccessKey: "process.env.SECRET_KEY"
  });

  exports.handler = async (event) => {
    // TODO implement
    const response = {
      statusCode: 200,
      body: DataCue,
      headers: {
        "Access-Control-Allow-Origin":"*",
        "content-type": "application/json",
        body: JSON.stringify('Hello from Lambda!')
      },
    };
    return response;
};

exports.handler = (event, callback) => {
  var url = `https://www.omdbapi.com/?t=${event.queryStringParameters.title}&plot=short&apikey=${process.env.ombdapikey}`
  addToDynamoDB(event.queryStringParameters.title);
  request(url, (error,body)=>{
    if(error){
      throw error;
    }
    const response = {
      statusCode: 200,
      body: body,
      headers: {
        "Access-Control-Allow-Origin":"*",
        "content-type": "application/json"
      }
    };
    callback(null,response)
  });
};


function addToDynamoDB(title){
  var docClient = new AWS.DynamoDB.DocumentClient();
  var params = {
    TableName:"my_table",
    Item:{
       name: 'Entry coming in from Labmda',
       type : 'http',
       title: title,
       timestamp:String(new Date().getTime())
    }
  };

  docClient.put(params, function(err, data) {
    if (err) {
      console.error('Error adding item:', JSON.stringify(err, null, 2));
    } else {
      console.log("Item added:", JSON.stringify(data, null, 2));
    }
  });

