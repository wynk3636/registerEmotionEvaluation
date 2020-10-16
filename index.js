var AWS = require('aws-sdk');
var dynamo = new AWS.DynamoDB.DocumentClient({
    region: 'ap-northeast-1'
});
var tableName = "emotionAppFeedback";

exports.handler = async (event, context) => {
//exports.handler = (event, context) => {
    let bodyMessage = JSON.parse(event.body);
    let evaluation = bodyMessage.documents[0].evaluation
    let feedbackText = bodyMessage.documents[0].feedbackText
    //let evaluation = false
    //let feedbackText = "test"
    
    var item
    
    if (feedbackText!=""){
        item = {
          "id": context.awsRequestId,
          "evaluation": evaluation,
          "feedbackText": feedbackText
        };
    }
    else{
        item = {
          "id": context.awsRequestId,
          "evaluation": evaluation
        };
    }
    
    var params = {
        TableName: tableName,
        Item: item
    };
    
    await dynamo.put( params, function( err, data ) {
        console.log("dynamo_err:", err);
        //context.done(null, data);
    }).promise();
    
    const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin" : "*",
          "Access-Control-Allow-Credentials": true,  
        },
        body: JSON.stringify("success"),
    };
    return response;
};