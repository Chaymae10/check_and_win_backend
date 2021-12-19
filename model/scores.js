"use strict";

const { parse, serialize } = require("../utils/json");
//var escape = require("escape-html");


const jsonDbPath = __dirname + "/../data/scores.json";



const defaultItems = [
  {
    username: "admin",
    maxScore: 0,
  },
];


class Scores {
  constructor(dbPath = jsonDbPath, items = defaultItems) {
    this.jsonDbPath = dbPath;
    this.defaultItems = items;
  }

  addOne(username) {
    const items = parse(this.jsonDbPath, this.defaultItems);
    const newitem = {
      username:username,
      maxScore: 0,
    };
    items.push(newitem);
    serialize(this.jsonDbPath, items);
    return newitem;
  }

  /**
   * Returns all items
   * @returns {Array} Array of items
   */
  getAll() {
    const items = parse(this.jsonDbPath, this.defaultItems);
    return items;
  }



  /**
   * Returns the item identified by username
   * @param {string} username - username of the item to find
   * @returns {object} the item found or undefined if the username does not lead to a item
   */
getOneByUsername(username) {
    const items = parse(this.jsonDbPath, this.defaultItems);
    const foundIndex = items.findIndex((item) => item.username == username);
    if (foundIndex < 0) return;

    return items[foundIndex];
}

  /**
   * Update a item in the DB and return the updated item
   * @param {number} id - id of the item to be updated
   * @param {object} body - it contains all the data to be updated
   * @returns {object} the updated item or undefined if the update operation failed
   */
updateOne(username, body) {
    const items = parse(this.jsonDbPath, this.defaultItems);
    const foundIndex = items.findIndex((item) => item.username == username);
    console.log("index :" + foundIndex);
    console.log(username);

    if (foundIndex < 0) return;
    // create a new object based on the existing item - prior to modification -
    // and the properties requested to be updated (those in the body of the request)
    // use of the spread operator to create a shallow copy and reply
    const updateditem = { ...items[foundIndex], ...body };
    // replace the item found at index : (or use splice)
    items[foundIndex] = updateditem;

    serialize(this.jsonDbPath, items);
    return updateditem;
  }

  

updateMaxScore(username, newScore) {
    let user = this.getOneByUsername(username);

    if (!user) return;
    if (newScore > user.maxScore) {

      const body = {
        maxScore: newScore
      };

      this.updateOne(user.username, body);

      return body;
    }

    return 0;

  }
}



module.exports = { Scores };
