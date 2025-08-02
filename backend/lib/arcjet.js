import arcjet, {tokenBucket, shield, detectBot} from "@arcjet/node";

import "dotenv/config";

//initialize arcject for Rate limiting and Bot Detection

export const aj=arcject({
    key: process.env.ARCJET_KEY,
    characteristics: ["ip.src"],
    rules: [
        //shield will protect against bots and malicious traffic like SQL injection, XSS, CSRF
        shield({mode:"LIVE"}),
        detectBot({
            mode: "LIVE",
            //blocking all bots except search engine bots
            allow:
                "CATEGORY:SEARCH_ENGINE"
                //see full list of bots from https://arcjet.com/bot-list 

        
        }),

        //Token bucket method used for rate limiting
        tokenBucket({
            mode: "LIVE",
            refillRate: 5, //Refilling 5 tokens after each 10 seconds
            interval: 10, 
            capacity: 10, //Allows client to burst up to 10 requests
        }),


    ]
})