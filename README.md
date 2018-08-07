<!--
title: MedTV REST API in NodeJS
description: A RESTful Web Service allowing you to create, list, get, update and delete Videos. DynamoDB is used to store the data. 
layout: Doc
-->
# Med TV REST API

 A [RESTful Web Services](https://en.wikipedia.org/wiki/Representational_state_transfer#Applied_to_web_services) allowing you to create, list, get, update and delete Videos. DynamoDB is used to store the data. This is just an example and of course you could use any data storage as a backend.

## Structure

This service has a separate directory for all the video operations. For each operation exactly one file exists e.g. `Videos/delete.js`. In each of these files there is exactly one function which is directly attached to `module.exports`.

The idea behind the `Videos` directory is that in case you want to create a service containing multiple resources e.g. users, tags, comments you could do so in the same service. While this is certainly possible you might consider creating a separate service for each resource. It depends on the use-case and your preference.

## Use-cases

- API for a Web Application
- API for a Mobile Application

## Setup

```bash
npm install
```

## Deploy

In order to deploy the endpoint simply run

```bash
sls deploy
```

The expected result should be similar to:

```bash
Service Information
service: serverless-rest-api-with-dynamodb
stage: dev
region: us-east-1
api keys:
  None
endpoints:
  POST - https://45wf34z5yf.execute-api.us-east-1.amazonaws.com/dev/Videos
  GET - https://45wf34z5yf.execute-api.us-east-1.amazonaws.com/dev/Videos
  GET - https://45wf34z5yf.execute-api.us-east-1.amazonaws.com/dev/Videos/{id}
  PUT - https://45wf34z5yf.execute-api.us-east-1.amazonaws.com/dev/Videos/{id}
  DELETE - https://45wf34z5yf.execute-api.us-east-1.amazonaws.com/dev/Videos/{id}
functions:
  serverless-rest-api-with-dynamodb-dev-update: arn:aws:lambda:us-east-1:488110005556:function:serverless-rest-api-with-dynamodb-dev-update
  serverless-rest-api-with-dynamodb-dev-get: arn:aws:lambda:us-east-1:488110005556:function:serverless-rest-api-with-dynamodb-dev-get
  serverless-rest-api-with-dynamodb-dev-list: arn:aws:lambda:us-east-1:488110005556:function:serverless-rest-api-with-dynamodb-dev-list
  serverless-rest-api-with-dynamodb-dev-create: arn:aws:lambda:us-east-1:488110005556:function:serverless-rest-api-with-dynamodb-dev-create
  serverless-rest-api-with-dynamodb-dev-delete: arn:aws:lambda:us-east-1:488110005556:function:serverless-rest-api-with-dynamodb-dev-delete
```

## Usage

You can create, retrieve, update, or delete Videos with the following commands:

### Create a video

```bash
curl -X POST https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/Videos --data '{ "text": "Learn Serverless" }'
```

Example Result:
```bash
{"text":"Learn Serverless","id":"ee6490d0-aa81-11e6-9ede-afdfa051af86","createdAt":1479138570824,"checked":false,"updatedAt":1479138570824}%
```

### List all Videos

```bash
curl https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/Videos
```

Example output:
```bash
[{"text":"Deploy my first service","id":"ac90fe80-aa83-11e6-9ede-afdfa051af86","checked":true,"updatedAt":1479139961304},{"text":"Learn Serverless","id":"20679390-aa85-11e6-9ede-afdfa051af86","createdAt":1479139943241,"checked":false,"updatedAt":1479139943241}]%
```

### Get one video

```bash
# Replace the <id> part with a real id from your Videos table
curl https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/Videos/<id>
```

Example Result:
```bash
{"text":"Learn Serverless","id":"ee6490d0-aa81-11e6-9ede-afdfa051af86","createdAt":1479138570824,"checked":false,"updatedAt":1479138570824}%
```

### Update a video

```bash
# Replace the <id> part with a real id from your Videos table
curl -X PUT https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/Videos/<id> --data '{ "text": "Learn Serverless", "checked": true }'
```

Example Result:
```bash
{"text":"Learn Serverless","id":"ee6490d0-aa81-11e6-9ede-afdfa051af86","createdAt":1479138570824,"checked":true,"updatedAt":1479138570824}%
```

### Delete a video

```bash
# Replace the <id> part with a real id from your Videos table
curl -X DELETE https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/Videos/<id>
```

