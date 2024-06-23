#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// my player class starts
class Player {
    name;
    fuel = 100;
    constructor(myPlayerName) {
        this.name = myPlayerName;
    }
    fuelDecrease() {
        this.fuel = this.fuel - 25;
    }
    fuelIncrease() {
        this.fuel = this.fuel + 25;
    }
}
// my player class ends
// opponent class starts
class Opponent {
    name;
    fuel = 100;
    constructor(opponentName) {
        this.name = opponentName;
    }
    fuelDecrease() {
        this.fuel = this.fuel - 25;
    }
}
// opponent class ends
// ask user name and opponnent name
let userInput = await inquirer.prompt([
    {
        type: 'input',
        name: 'myName',
        message: 'Enter your Name:'
    },
    {
        type: 'list',
        name: 'opponentName',
        message: 'Select your opponent',
        choices: ['Skeleton', 'Alien', 'Zombie']
    }
]);
let { myName, opponentName } = userInput;
console.log(`${chalk.bold.green(myName)} VS ${chalk.bold.red(opponentName)}`);
// now make objects from the classes created above:
let myPlayer = new Player(myName);
let myOpponent = new Opponent(opponentName);
// while loop starts
while (true) {
    let startMatch = await inquirer.prompt({
        type: 'list',
        name: 'options',
        message: 'Select your option!',
        choices: ['Attack', "Increase Health", "Run for Life.."]
    });
    let { options } = startMatch;
    //conditions
    if (options === 'Attack')
        attackFun();
    if (options === "Increase Health")
        increaseHealthFun();
    if (options === "Run for Life..")
        runForLifeFun();
    // attackFun starts
    function attackFun() {
        // generate random number 0 and 1
        let number = Math.floor(Math.random() * 2);
        //when random number is equal to 0, decrease the fuel of my Player!
        if (number === 0) {
            myPlayer.fuelDecrease();
            console.log(`${myPlayer.name}'s fuel is ${chalk.bold.red(myPlayer.fuel)}`);
            console.log(`${myOpponent.name}'s fuel is ${chalk.bold.green(myOpponent.fuel)}\n`);
            if (myPlayer.fuel === 0) {
                console.log(`${chalk.bold.red(myPlayer.name)} lost! Better luck next time\n`);
                process.exit();
            }
        }
        //when random number is equal to 1, decrease the fuel of opponent!
        if (number === 1) {
            myOpponent.fuelDecrease();
            console.log(`${myPlayer.name}'s fuel is ${chalk.bold.green(myPlayer.fuel)}`);
            console.log(`${myOpponent.name}'s fuel is ${chalk.bold.red(myOpponent.fuel)}\n`);
            if (myOpponent.fuel === 0) {
                console.log(`Congratulations ${chalk.bold.green(myPlayer.name)}! You won the Game.\n`);
                process.exit();
            }
        }
    }
    // attackFun ends
    // increaseHelathFun starts
    function increaseHealthFun() {
        myPlayer.fuelIncrease();
        console.log(`${myPlayer.name}'s fuel is increased to ${chalk.bold.green(myPlayer.fuel)}`);
    }
    // increaseHelathFun ends
    function runForLifeFun() {
        console.log(`${chalk.bold.red(myPlayer.name)} Lost! Better luck next time.`);
        process.exit();
    }
}
// while loop ends
