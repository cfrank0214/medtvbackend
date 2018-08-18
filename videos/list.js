'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.list = (event, context, callback) => {
	let limit = 9;
	let startkey = null;
	let tag = null;
	if (event.queryStringParameters !== null && event.queryStringParameters !== undefined) {
		if (
			event.queryStringParameters.limit !== undefined &&
			event.queryStringParameters.limit !== null &&
			event.queryStringParameters.limit !== ''
		) {
			console.log('Received limit: ' + event.queryStringParameters.limit);
			limit = event.queryStringParameters.limit;
		}
		if (
			event.queryStringParameters.startkey !== undefined &&
			event.queryStringParameters.startkey !== null &&
			event.queryStringParameters.startkey !== ''
		) {
			console.log('Received startkey: ' + event.queryStringParameters.startkey);
			startkey = event.queryStringParameters.startkey;
		}
		if (
			event.queryStringParameters.tag !== undefined &&
			event.queryStringParameters.tag !== null &&
			event.queryStringParameters.tag !== ''
		) {
			console.log('Received tag: ' + event.queryStringParameters.tag);
			tag = event.queryStringParameters.tag;
		}
	}
	let params = {
		TableName: process.env.DYNAMODB_TABLE,
		Limit: limit
	};

	if (startkey) {
		params.ExclusiveStartKey = {
			id: startkey
		};
	}
	if (tag) {
		 params = {
			TableName: process.env.DYNAMODB_TABLE,
			FilterExpression: 'contains (tags, :tag)',
			ExpressionAttributeValues: {':tag': tag,},
		  };
		
	};
	
	// fetch all video from the database
	dynamoDb.scan(params, (error, result) => {
		if (error) {
			console.error(error);
			callback(null, {
				statusCode: error.statusCode || 501,
				headers: { 'Content-Type': 'text/json' },
				body: "Couldn't fetch the videos."
			});
			return;
		} else {
			const response = {
				statusCode: 200,
				headers: {
					'Access-Control-Allow-Origin': '*', // Required for CORS support to work
					'Access-Control-Allow-Credentials': true // Required for cookies, authorization headers with HTTPS
				},
				body: JSON.stringify(result.Items)
			};
			callback(null, response);
		}
	});
};
