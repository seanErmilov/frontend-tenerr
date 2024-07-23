import fs from 'fs'
import gigs from './data'

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomToyName() {
    const adjectives = ['Speedy', 'Shiny', 'Brave', 'Colorful', 'Magic', 'Flying', 'Giggly', 'Bouncy', 'Whizzy', 'Cuddly'];
    const nouns = ['Car', 'Doll', 'Robot', 'Dragon', 'Ball', 'Puzzle', 'Bear', 'Truck', 'Kitten', 'Horse'];

    const adjective = getRandomElement(adjectives);
    const noun = getRandomElement(nouns);

    return `${adjective} ${noun}`;
}

function generateRandomLabels() {
    const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered'];
    const numLabels = getRandomInt(1, labels.length);
    const selectedLabels = [];

    for (let i = 0; i < numLabels; i++) {
        const label = getRandomElement(labels);
        if (!selectedLabels.includes(label)) {
            selectedLabels.push(label);
        }
    }
    return selectedLabels;
}

function generateRandomToyData(numToys) {
    const toys = [];
    const timestamp = Date.now();

    for (let i = 0; i < numToys; i++) {
        const toy = {
            _id: `g${101 + i}`,
            name: generateRandomToyName(),
            price: getRandomInt(20, 500),
            labels: generateRandomLabels(),
            createdAt: timestamp - getRandomInt(0, 1000000000), // Random timestamp within some range
            inStock: Math.random() < 0.7 // 70% chance to be in stock
        };

        toys.push(toy);
    }

    return toys;
}

const numToys = 5; // Number of toys to generate
const toyData = generateRandomToyData(numToys);
console.log(JSON.stringify(toyData, null, 2));

function _saveGigsToFile() {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(generateRandomToyData(numToys), null, 4)
        fs.writeFile('data.json', data, (err) => {
            if (err) {
            
                return reject(err)
            }
            resolve()
        })
    })
}

_saveGigsToFile()
