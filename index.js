const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const {
    IamAuthenticator
} = require('ibm-watson/auth');
const dotenv = require('dotenv');

dotenv.config();

const url = process.env.URL;
const apiKey = process.env.API_KEY;

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2020-08-01',
    authenticator: new IamAuthenticator({
        apikey: apiKey,
    }),
    serviceUrl: url,
});

exports.handler = async (event) => {
    const analyzeParams = {
        'text': event.historial_clinico,
        'features': {
            'keywords': {
                'sentiment': true,
                'emotion': true,
                'limit': 5
            },
            'entities': {
                'sentiment': true,
                'emotion': true,
                'limit': 5
            }
        }
    };
    const result = await naturalLanguageUnderstanding.analyze(analyzeParams)

    return result.result
}