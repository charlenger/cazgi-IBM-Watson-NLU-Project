const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const {IamAuthenticator } = require('ibm-watson/auth');
const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');

function getLanguageTranslator() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;    
    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });
    return naturalLanguageUnderstanding;
}

const naturalLanguageUnderstanding = getLanguageTranslator();
const app = new express();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    analyzeParams = {
        'url': req.query.url,
        'features': {
            'emotion': {}
        }
    };
    getLanguageTranslator().analyze(analyzeParams).then(analysisResults => {
        console.log(JSON.stringify(analysisResults, null, 2));
        const emotion = analysisResults.result.emotion.document.emotion;
        return res.send(emotion);
    })
    .catch(err => {
        console.log('error:', err);
    }); 
});

app.get("/url/sentiment", (req,res) => {
    analyzeParams = {
        'url': req.query.url,
        'features': {
            'sentiment': {}
        }
    };
    getLanguageTranslator().analyze(analyzeParams).then(analysisResults => {
        console.log(JSON.stringify(analysisResults, null, 2));
        const sentiment = analysisResults.result.sentiment.document.label;
        return res.send(sentiment);
    })
    .catch(err => {
        console.log('error:', err);
    }); 
});

app.get("/text/emotion", (req,res) => {
    analyzeParams = {
        'text': req.query.text,
        'features': {
            'emotion': {}
        }
    };
    getLanguageTranslator().analyze(analyzeParams).then(analysisResults => {
        console.log(JSON.stringify(analysisResults, null, 2));
        const emotion = analysisResults.result.emotion.document.emotion;
        return res.send(emotion);
    })
    .catch(err => {
        console.log('error:', err);
    });    
});

app.get("/text/sentiment", (req,res) => {
    analyzeParams = {
        'text': req.query.text,
        'features': {
            'sentiment': {}
        }
    };
    getLanguageTranslator().analyze(analyzeParams).then(analysisResults => {
        console.log(JSON.stringify(analysisResults, null, 2));
        const sentiment = analysisResults.result.sentiment.document.label;
        return res.send(sentiment);
    })
    .catch(err => {
        console.log('error:', err);
    }); 
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})