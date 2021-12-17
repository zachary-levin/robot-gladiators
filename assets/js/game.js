// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less


// You can also log multiple values at once like this
//console.log(playerInfo.name, playerInfo.attack, playerInfo.health);

//console.log(enemyNames);
//console.log(enemyNames[0]);
//console.log(enemyNames[1]);
//console.log(enemyNames[2]);
//console.log(enemyNames.length);

//for(var i = 0; i < enemyInfo.length; i++) {
    
    //console.log(enemyNames[i]);
    //console.log(i);
    //console.log(enemyNames[i] + " is at " + i + " index");
//}



var fight = function (enemy) {
    
    // repeat and execute as long as the enemy-robot is alive
    while(playerInfo.health > 0 && enemy.health > 0) {
        console.log("fight function fire ----> " , playerInfo.health + " " + enemy.health);
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    
    
    // if player chooses to fight, then fight
    if (promptFight === "fight" || promptFight === "FIGHT") {
      // remove enemy's health by subtracting the amount set in the playerInfo.attack variable    
      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
        
      enemy.health = Math.max(0, enemy.health - damage);
      console.log("enemy health ---->", enemy.health);
    // Log a resulting message to the console so we know that it worked.
    console.log(
        playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
    );


    // check enemy's health
    if (enemy.health <= 0) {
        window.alert(enemy.name + " has died!");

        // award player money for winning
        playerInfo.money = playerInfo.money + 20;
        break;
    } else {
        window.alert(enemy.name + " still has " + enemy.health + " health left.");
    }
    
    // remove player's health by subtracting the amount set in the enemy.attack variable
    var damage = randomNumber(enemy.attack - 3, enemy.attack);

    playerInfo.health = Math.max(0, playerInfo.health - damage);
    console.log(
        enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
    );

    // check player's health
    if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + " has died!");
        break;
    } else {
        window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
    }

    // if player chooses to skip
} else if (promptFight === "skip" || promptFight === "SKIP") {
    // confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes (true), leave fight
    if (confirmSkip) {
        window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
        // subtract money from playerInfo.money for skipping
        playerInfo.money = Math.max(0, playerInfo.money - 10);
        console.log("playerInfo.money", playerInfo.money);
        break;
    }
    // if no (false), ask question again by running fight() again
    else {
        fight();
    }    
} else {
    window.alert("You need to choose a valid option. Try again!");
}
    }    
};

var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (21)) + 40;

    return value;
};

// function to start a new game
var startGame = function() {
    // reset player stats
    playerInfo.reset();

for(var i = 0; i < enemyInfo.length; i++) {


    // NEED TO FIGURE OUT HOW TO MAKE THE GAME OVER ALERT APPEAR
    
    // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
    if (playerInfo.health > 0) {
        window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ) );
    
    // pick new enemy to fight based on the index of the enemy.name array
    var pickedEnemyObj = enemyInfo[i];

    // reset enemy.health before starting new fight
    pickedEnemyObj.health = randomNumber(70, 80);

    // use debugger to pause script from running and check what's going on at that moment in the code 
    // debugger;
    
    // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
    fight(pickedEnemyObj);

    // if player is still alive and we're not at the last enemy in the array
    if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        // ask if player wants to use the store before next round
        var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
        
        //if yes, take them to the store() function
        if (storeConfirm) {
        shop();
    }
}
    //fight(enemy.name[i]);
 } else {
        //window.alert("You have lost your robot in battle! Game Over!");
        break;
    }
 }

//after the loop ends, player is either out of health or enemies to fight, so run the endGame function
endGame();

// play again
//startGame();
};

// function to end the entire game
var endGame = function() {
    // if player is still alive, player wins!
if (playerInfo.health > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
}
else {
    window.alert("You've lost your robot in battle. Game Over!");
}
// ask player if they'd like to play again
var playAgainConfirm = window.confirm("Would you like to play again?");

if (playAgainConfirm) {
    // restart the game
    startGame();
} else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
}
};

var shop = function() {
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt (
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );
    // use switch to carry out action
    switch (shopOptionPrompt) {
        case "REFILL": // new case
        case "refill":
            // increase health and decrease money
            playerInfo.refillHealth();
            break;
        case "UPGRADE": // new case
        case "upgrade":
            // increase attack and decrease money
            playerInfo.upgradeAttack();
          break;
        case "LEAVE": // new case
        case "leave":
            window.alert("Leaving the store.");

            // do nothing, so function will end
            break;

        default:
            window.alert("You did not pick a valid option. Try again.");
            // call shop() again to force player to pick a valid option
            shop();
            break;    
    }
};

var playerInfo = { 
    name: window.prompt("What is your robot's name?"),
    health: 100,
    attack: 5,
    money: 10,
    reset: function () {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    }, // comma!
    refillHealth: function() {
        if (this.money >= 7) {
        window.alert ("Refilling player's health by 20 for 7 dollars.");
        this.health += 20;
        this.money -= 7;
    }
        else {
            window.alert("You don't have enough money!");
        }
    }, // comma!
    upgradeAttack: function() {
        if (this.money >= 7) {
        window.alert("Upgrading player's attack by 6 for 7 dollars.");
        this.attack += 6;
        this.money -= 7;
    }
    else {
        window.alert("You don't have enough money!");
    }
    }
}
    
    var enemyInfo = [
    {
        name: "Roborto",
        //health: 40,
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        //health: 50,
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        //health: 60,
        attack: randomNumber(10, 14)
    }
    ];

// start the game when the page loads
startGame();

// PROBLEMS ATM:

// NEED TO FIX THE GAME SO THE BATTLE ASPECT WORKS NORMALLY
// FIX AMOUNT OF DAMAGE DONE BY PLAYER AND ENEMIES (IT IS TOO HIGH RIGHT NOW)
// INCORRECT VARIABLES (?) FOR "var fight = function (enemy)" CODE BLOCK (?)
// INCORRECT VARIABLES (?) FOR "var startGame = function()" CODE BLOCK (?)

// THINGS THAT WORK FINE ATM:

// THE NAME ENTRY
// WELCOME MESSAGE 
// ROUND START MESSAGE 
// ROUND OVER MESSAGE
// SHOP PROMPT MESSAGE
// GAME COMPLETION SCORE MESSAGE
// "WOULD YOU LIKE TO PLAY AGAIN?" PROMPT
// "THANKS FOR PLAYING" MESSAGE
// GAME ENDS AFTER "THANKS FOR PLAYING MESSAGE"