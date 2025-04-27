// const createPerson = function (done) {
//   done(null, savedPerson);  // Properly call done() with null for success and the saved document
// }



// // Call the function and make sure the test framework is properly checking the result
// createPerson((err, data) => {
//   done(null /*, data*/);
// });
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let Person;

// Create a schema for the Person model
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number
  },
  favoriteFoods: {
    type: [String]
  }
})

// Create the Person model using the schema
Person = mongoose.model('Person', personSchema)

const createAndSavePerson = (done) => {
  const person = new Person({
    name: 'Nagy Barbara',
    age: 28,
    favoriteFoods: ['chocolate', 'pizza']
  })

  person.save(function (err, data) {
    if (err) { return done(err) }
    return done(null, data)
  })
};

// Call the function and make sure the test framework is properly checking the result
createAndSavePerson((err, data) => {
  if (err) { return done(err) }
})

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, data) {
    if (err)
      return done(null, data)
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({}, function (err, data) {
    if (err) { return done(err) }
    return done(null, data)
  })
};


const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function (err, data) {
    if (err) { return done(err) }
    return done(null, data)
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, data) {
    if (err) { return done(err) }
    return done(null, data)
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function (err, data) {
    if (err) { return done(err) }
    person.favoriteFoods.push(foodToAdd)
    person.save(function (err, data) {
      if (err) { return done(err) }
      return done(null, data)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, function (err, data) {
    if (err) { return done(err) }
    return done(null, data)
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function (err, data) {
    if (err) { return done(err) }
    return done(null, data)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, function (err, data) {
    if (err) { return done(err) }
    return done(null, data)
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch }).sort({ name: 1 }).limit(2).select({ age: 0 }).exec(function (err, data) {
    if (err) { return done(err) }
    return done(null, data)
  })
};



/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
