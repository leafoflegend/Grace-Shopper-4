const { client } = require('./client');
const { createDogs } = require('./dogs')
const { createBreed } = require('./breed')
const { createDogBreed, getDogBreedById, getAllDogBreeds } = require('./dog_breed')

async function buildTables() {
  try {
    client.connect();
      // drop tables in correct order
    console.log("Starting to Drop Tables")

    await client.query(`
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS order_products;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS dog_breed;
    DROP TABLE IF EXISTS breed;
    DROP TABLE IF EXISTS dogs;
    `);

    console.log('Dropped All Tables')
       // build tables in correct order
    console.log("Starting to Build Tables")

     await client.query(`
     CREATE TABLE dogs(
       id SERIAL PRIMARY KEY,
       name VARCHAR UNIQUE,
       description VARCHAR(255) NOT NULL,
       price VARCHAR(255) NOT NULL,
       age INTEGER  
     );

     CREATE TABLE breed(
       id SERIAL PRIMARY KEY,
       name VARCHAR(255)
     );

     CREATE TABLE dog_breed(
       id SERIAL PRIMARY KEY,
       "dogId" INTEGER REFERENCES dogs(id),
       "breedId" INTEGER REFERENCES breed(id),
       UNIQUE("dogId", "breedId")
     );

     CREATE TABLE products(
       id SERIAL PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       description VARCHAR(255) NOT NULL,
       price VARCHAR(255) NOT NULL,
       inStock BOOLEAN DEFAULT false,
       category VARCHAR(255) NOT NULL
     );

     CREATE TABLE users(
       id SERIAL PRIMARY KEY,
       firstName VARCHAR(255) NOT NULL,
       lastName VARCHAR(255) NOT NULL,
       email VARCHAR(255) UNIQUE NOT NULL,
       username VARCHAR(255) UNIQUE NOT NULL,
       password VARCHAR(255) UNIQUE NOT NULL,
       isAdmin BOOLEAN DEFAULT false
     );
     
     CREATE TABLE orders(
       id SERIAL PRIMARY KEY,
       status VARCHAR(255) DEFAULT 'created',
       "userId" INTEGER REFERENCES users(id),
       "datePlaced" DATE NOT NULL DEFAULT CURRENT_DATE
     );

     CREATE TABLE order_products(
       id SERIAL PRIMARY KEY,
       "productId" INTEGER REFERENCES products(id),
       "orderId" INTEGER REFERENCES orders(id),
       price INTEGER NOT NULL,
       quantity INTEGER NOT NULL DEFAULT (0)
     );
     
     CREATE TABLE reviews(
       id SERIAL PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       content VARCHAR(255) DEFAULT NULL,
       "userId" INTEGER REFERENCES users(id),
       "productId" INTEGER REFERENCES products(id)
     );
     `);
     console.log('Finishing Building Tables')

  } catch (error) {
    throw error;
  }
}

async function populateInitialDogData() {
  try {
    console.log("Creating Dogs...");
    const seedDataDogs = [
      { 
        id: 1,
        name: "Fido",
        description: "a classic great dog",
        price: 125,
        age: 2,
      },
      { 
        id: 2,
        name: "Bella",
        description: "smart and witty",
        price: 125,
        age: 2,
      },
      { 
        id: 3,
        name: "Charlie",
        description: "loves to play fetch",
        price: 125,
        age: 2,
      },
      { 
        id: 4,
        name: "Lucy",
        description: "fast and playful",
        price: 125,
        age: 2,
      },
      { 
        id: 5,
        name: "Duke",
        description: "a beautiful hairy dog",
        price: 125,
        age: 2,
      },
      { 
        id: 6,
        name: "Molly",
        description: "loves to hangout in the sunshine",
        price: 125,
        age: 2,
      },
      { 
        id: 7,
        name: "JoJo",
        description: "a great cuddler",
        price: 125,
        age: 2,
      },
      { 
        id: 8,
        name: "Oliver",
        description: "a very sophisticated animal",
        price: 125,
        age: 2,
      },
      { 
        id: 9,
        name: "Penny",
        description: "a bit ferocious but a nice dog",
        price: 125,
        age: 2,
      },
      { 
        id: 10,
        name: "Zeus",
        description: "the king of all dogs",
        price: 125,
        age: 2,
      },
      { 
        id: 11,
        name: "Scout",
        description: "the best adventure dog in the world",
        price: 125,
        age: 2,
      },
      { 
        id: 12,
        name: "Crinkles",
        description: "the most lovable face ever",
        price: 125,
        age: 2,
      },
      { 
        id: 13,
        name: "Moose",
        description: "big, cuddly and hairy",
        price: 125,
        age: 2,
      },
      { 
        id: 14,
        name: "Dexter",
        description: "too smart for his own good",
        price: 125,
        age: 2,
      },
      { 
        id: 15,
        name: "Bandit",
        description: "he'll still your food, but you'll still love him",
        price: 125,
        age: 2,
      },
      { 
        id: 16,
        name: "Oakley",
        description: "a pretty amazing dog",
        price: 125,
        age: 2,
      },
      { 
        id: 17,
        name: "Ace",
        description: "always comes through when you need him",
        price: 125,
        age: 2,
      },
      { 
        id: 18,
        name: "Winnie",
        description: "old and wise",
        price: 125,
        age: 2,
      },
      { 
        id: 19,
        name: "Dakota",
        description: "the perfect mountain dog for your backpacking adventures",
        price: 125,
        age: 2,
      },
      { 
        id: 20,
        name: "Sunny",
        description: "always smiling, making you laugh",
        price: 125,
        age: 2,
      }
    ];

    const launchSeedDataDogs = await Promise.all(seedDataDogs.map((dog) => createDogs(dog)));
    console.log("Here are your seeded dogs:", launchSeedDataDogs);
    
  } catch (error) {
    throw error;
  }
}

async function populateInitialBreedData(){
  try{
    console.log("Creating Breeds...");
    const seedDataBreeds = [
      {
        id: 1,
        name: "Shiba Inu"
      },
      {
        id: 2,
        name: "Doberman Pinscher"
      },
      {
        id: 3,
        name: "Great Dane"
      },
      {
        id: 4,
        name: "Siberian Husky"
      },
      {
        id: 5,
        name: "Boxer"
      },
      {
        id: 6,
        name: "Rottweiler"
      },
      {
        id: 7,
        name: "Poodle"
      },
      {
        id: 8,
        name: "French Bulldog"
      },
      {
        id: 9,
        name: "Beagle"
      },
      {
        id: 10,
        name: "Pitbull"
      },
      {
        id: 11,
        name: "Golden Retriever"
      },
      {
        id: 12,
        name: "German Shepherd"
      },
      {
        id: 13,
        name: "Shih Tzu"
      },
      {
        id: 14,
        name: "Dachshund"
      },
      {
        id: 15,
        name: "Pug"
      },
    ];

    const launchSeedDataBreeds = await Promise.all(seedDataBreeds.map((breed) => createBreed(breed)));
    console.log("Here are your seeded breeds:", launchSeedDataBreeds)
  } catch (error) {
    throw error;
  }
}


buildTables()
  .then(populateInitialDogData)
  .then(populateInitialBreedData)
  .catch(console.error)
  .finally(() => client.end());