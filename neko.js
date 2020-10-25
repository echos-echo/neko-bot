const Discord = require("discord.js");
const config = require("./auth.json");
// auth.json is an external .json file with just the token for your discord bot
var lib = require("./lib.js");
// ^ mods to include

// making a connection to the discord server
const client = new Discord.Client();

// the command prefix the bot uses
const prefix = "^";

// the main function that the bot uses to 'listen' for messages from users
client.on("message", function(message) {
    // if the message it reads is from another bot, it returns
    if (message.author.bot) return;
    // if the message it reads does not start with the proper prefix, it ignores it
    if (!message.content.startsWith(prefix)) return;

    // preparing the message by removing the prefix, splitting up the arguments, and removing case sensitivity of the first argument/command
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    
    
    // initializing imported data from lib.js, the library length, and initializing a random integer for the bot to use as an index
    const data = lib.theData();
    // theData() is exported out of lib.js
    // it contains the var 'directory' which is an array of strings
    //      pre-formatted for printing out to discord via the bot
    var directoryLen = data.length;
    var randIndex = getRndInteger(0,directoryLen);
    
    // used for checking latency of the command
    const timeTaken = Date.now() - message.createdTimestamp;

    // the help command
    if (command === "help") {
        message.reply("Here's a guide to the commands I respond to:\n" +
                     `   - ^rec  |  responds with a random BL recommendation out of a collection of ${directoryLen} series \n` + 
                     `   - ^desc  |  you learn more about why I was created!\n` +
                     `   - ^info  |  gives you version info + creator info about me, the bot!\n` + 
                     `   - ^all  |  links you to a spreadsheet with names + authors of BL I\'ve read, even the ones I don't recommend\n`
                     )
    }
    
    // command to check for message latency; not included in the public command list
    else if (command === "test") {
        message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
    }

    // info 
    else if (command === "info") {
        message.reply("Here you go! Things about me, nyah~!\n" + 
                     "bot name | neko~kun\n" + 
                     "version | 1.1.3\n" + 
                     "creator | seren#7584\n" + 
                     "icon artist | @byulcchi\n" + 
                     "birthday | august 24, 2020\n");
    }
    
    // recommendations
    else if (command === "rec") {
        message.reply("*Here's the random BL you requested!*\n" + `${data[randIndex]}\n` + "*If you've already read it or dislike it, you can request another one* ^^");
    }
    
    // description
    else if (command === "desc") {
        message.reply("Heya! I'm the bot, neko~kun, and I was created because my owner found the bot response options on MEE6 to be too limiting T^T All of my recommendations are curated by seren, and range from angst, fluff, supernatural, school life, smut, and much more! If you'd like to add a recommendation, join the support server here:\n" + "https://discord.com/invite/Ngz42cQ\n" + "*please do note that I might not like all series and that it may not pass the curation process uwu*\n" + "   - neko~kun ^^");
    }
    
    else if (command === "all") {
        message.reply(", this is it! A spreadsheet to all the BL series I've read. I've also included the author, if its longer than 20 chapters, any trigger warnings and notes, if I recommend it or not, as well as links to various legal and not as legal places you can read it\n" + "https://docs.google.com/spreadsheets/d/1c85E69Rsrr9hS9ePfOy698aAYFbepiekXI38rewYfvg/edit?usp=sharing");
    }

});
// end of main listening function

// function to get a random integer within a range, including zero
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
};

//end of program
client.login(config.token);