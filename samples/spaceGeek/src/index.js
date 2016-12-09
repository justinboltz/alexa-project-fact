/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Dota Pros for a Dota tip"
 *  Alexa: "Here's your Dota tip: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.ask.skill.41ea80f5-ab95-4f06-adb1-a9c433a1569d"; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing Dota tips.
 */
var FACTS = [
    "Reliable Gold is earned from killing Heroes, Roshan, and Couriers, from the destruction of enemy Towers, or from using Hand of Midas. All other earnings are Unreliable Gold, which can be lost upon death.",
    "You can pull the creatures in the neutral creep camp that is nearest to your team's Safe Lane into your lane creeps.",
    "Several items can be broken down into the component parts by right-clicking them in your inventory and choosing Disassemble. Re-use those components to create new items.",
    "Use Control Groups to issue orders to different sets of units under your control. To set a Control Group, select a unit or units, hold Control, and press a number. To select that Control Group, press that number.",
    "If you are about to die, use your Purchase Quickbuy keybinding to spend your gold before it disappears!",
    "Swapping the primary attribute on Power Treads to Intelligence can give you a little extra mana.",
    "If you have an Armlet of Mordiggian, you can turn on Unholy Strength to temporarily raise your health by 475. Disabling Unholy Strength will remove the added health, down to a minimum of 1 health.",
    "Activating Manta Style removes several buffs and debuffs, and will cause projectiles that are already in flight to miss.",
    "After using Buyback, 25% of a hero's remaining respawn time at the time of Buyback is added to their next death.",
    "Cheese can be sold for 500 gold.",
    "If you are within range of several auras with the same effect, only the most powerful aura will be active.",
    "If you know you are about to die, consider entering a neutral creep camp, or going to Roshan, and letting them kill you instead. This will deny the enemy team the gold and experience earned from your death.",
    "Melee Barracks regenerate 5 hit points per second. Ranged Barracks do not regenerate.",
    "One point of Agility increases hero attack speed by 1, as well as 0.14 armor.",
    "One point of Intelligence adds 13 maximum mana, as well as 0.04 mana regeneration per second.",
    "One point of Strength adds 19 maximum health, as well as 0.03 health regeneration per second.",
    "Shadow Blade can still be activated while channeling a Town Portal Scroll.",
    "Switching Power Treads to Agility while healing allows your health and mana to restore slightly faster. Just don't forget to switch them back!",
    "The Aegis of the Immortal can be denied.",
    "Though illusions are not affected by auras, they will still grant shared auras from their original hero to nearby units.",
    "You do not need to destroy the enemy team's barracks to damage the towers near their Ancient. Destroying barracks is optional.",
    "Warriors summoned by using a Level 3 Necronomicon have True Sight.",
    "The effects of Dust of Appearance can be purged.",
    "Runes can be attacked and denied."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * DotaPros is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Fact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Fact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say tell me a Dota tip, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random Dota tip from the Dota tips list
    var factIndex = Math.floor(Math.random() * FACTS.length);
    var randomFact = FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your tip: " + randomFact;
    var cardTitle = "Your Tip";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the DotaPros skill.
    var fact = new Fact();
    fact.execute(event, context);
};

