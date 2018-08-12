'use strict';

const fakeData = [
    {
        "patient": {
            "gender": "female",
            "age": "28"
        },
        "vid_location": {
            "title": "UVM Medical",
            "country": "USA"
        },
        "device": "Medtronic MRI SureScan",
        "updatedAt": 1533922211025,
        "vid_uri": "www.youtube.com",
        "createdAt": 1533917967841,
        "description": "VARISES is helping create better-trained surgeons and surgical staff to meet the rapidly growing demand for procedures such as joint replacement surgeries.",
        "id": "27620c20-9cb9-11e8-b2ad-d524ebffd498",
        "tags": [
            "Hip",
            "Training",
            "VR",
            "PaceMaker"
        ],
        "author": "Dr. Mat Gilbert",
        "title": "Hip Surgery 1.5",
        "vid_duration": "2735"
    }
]

module.exports.list = (event, context, callback) => {
    // create a response
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
      },
      body: JSON.stringify(fakeData),
    };
    callback(null, response);
};

