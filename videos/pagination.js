'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.pagination = (event, context, callback) => {
	if (event.queryStringParameters !== null && event.queryStringParameters !== undefined) {
		if (
			event.queryStringParameters.limit !== undefined &&
			event.queryStringParameters.limit !== null &&
			event.queryStringParameters.limit !== ''
		) {
			console.log('Received limit: ' + event.queryStringParameters.limit);
			let limit = event.queryStringParameters.limit;
		} if (
			event.queryStringParameters.startkey !== undefined &&
			event.queryStringParameters.startkey !== null &&
			event.queryStringParameters.startkey !== ''
		) {
			console.log('Received startkey: ' + event.queryStringParameters.startkey);
			let startkey = event.queryStringParameters.startkey;
		}
	}
	let params = {
		TableName: process.env.DYNAMODB_TABLE,
		Limit: 5,
		ExclusiveStartKey: {
			id: 'dfea80c0-9fd8-11e8-920a-a77773504cc3'
		}
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
				body: {
					items: JSON.stringify(result.Items),
					startkey: result.LastEvaluatedKey
				}
			};
			callback(null, response);
		}
	});
};
