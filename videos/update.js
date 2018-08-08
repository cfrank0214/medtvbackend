'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  // validation
  // if (typeof data.text !== 'string' || typeof data.checked !== 'boolean') {
  //   console.error('Validation Failed');
  //   callback(null, {
  //     statusCode: 400,
  //     headers: { 'Content-Type': 'text/json' },
  //     body: 'Couldn\'t update the video item.',
  //   });
  //   return;
  // }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
 
    ExpressionAttributeValues: {
      ':title': data.title,
      ':author': data.author,
      ':uri': data.uri,
      ':video_duration': data.video_duration, //seconds
      ':video_description': data.video_description,
      ':updatedAt': timestamp,
    },
    UpdateExpression: 'SET title = :title, author = :author, uri = :uri, video_duration = :video_duration, video_description = :video_description, updatedAt = :updatedAt',
    ReturnValues: 'ALL_NEW',
  };

  // update the todo in the database
  dynamoDb.update(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/json' },
        body: 'Couldn\'t fetch the video item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
    callback(null, response);
  });
};
