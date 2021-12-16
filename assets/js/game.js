// Game States
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

// You can also log multiple values at once like this
//console.log(playerName, playerAttack, playerHealth);

//console.log(enemyNames);
//console.log(enemyNames[0]);
//console.log(enemyNames[1]);
//console.log(enemyNames[2]);
//console.log(enemyNames.length);

for(var i = 0; i < enemyNames.length; i++) {
    
    //console.log(enemyNames[i]);
    //console.log(i);
    //console.log(enemyNames[i] + " is at " + i + " index");
}



var fight = function (enemyNames) {
    // repeat and execute as long as the enemy-robot is alive
    while(playerHealth > 0 && enemyHealth > 0) {
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
    
    
    
    

    // if player chooses to fight, then fight
    if (promptFight === "fight" || promptFight === "FIGHT") {
      // remove enemy's health by subtracting the amount set in the playerAttack variable    
    enemyHealth = enemyHealth - playerAttack;
    // Log a resulting message to the console so we know that it worked.
    console.log(
        playerName + " attacked " + enemyNames + ". " + enemyNames + " now has " + enemyHealth + " health remaining."
    );


    // check enemy's health
    if (enemyHealth <= 0) {
        window.alert(enemyNames + " has died!");

        // award player money for winning
        playerMoney = playerMoney + 20;
        break;
    } else {
        window.alert(enemyNames + " still has " + enemyHealth + " health left.");
    }
    
    // remove player's health by subtracting the amount set in the enemyAttack variable
    playerHealth = playerHealth - enemyAttack;
    console.log(
        enemyNames + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
    );

    // check player's health
    if (playerHealth <= 0) {
        window.alert(playerName + " has died!");
        break;
    } else {
        window.alert(playerName + " still has " + playerHealth + " health left.");
    }

    // if player chooses to skip
} else if (promptFight === "skip" || promptFight === "SKIP") {
    // confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes (true), leave fight
    if (confirmSkip) {
        window.alert(playerName + " has decided to skip this fight. Goodbye!");
        // subtract money from playerMoney for skipping
        playerMoney = playerMoney - 10;
        console.log("playerMoney", playerMoney);
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
}


// function to start a new game
var startGame = function() {
    // reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

for(var i = 0; i < enemyNames.length; i++) {


    // NEED TO FIGURE OUT HOW TO MAKE THE GAME OVER ALERT APPEAR
    
    // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
    if (playerHealth > 0) {
        window.alert("Welcome to Robot Gladiators! Round " + ( i + 1 ) );
    
    // pick new enemy to fight based on the index of the enemyNames array
    var pickedEnemyName = enemyNames[i];

    // reset enemyHealth before starting new fight
    enemyHealth = 50;

    // use debugger to pause script from running and check what's going on at that moment in the code 
    // debugger;
    
    // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
    fight(pickedEnemyName);

    // if player is still alive and we're not at the last enemy in the array
    if (playerHealth > 0 && i < enemyNames.length - 1) {
        // ask if player wants to use the store before next round
        var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
        
        //if yes, take them to the store() function
        if (storeConfirm) {
        shop();
    }
}
    //fight(enemyNames[i]);
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
if (playerHealth > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
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
            if (playerMoney >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");

            // increase health and decrease money
            playerHealth = playerHealth + 20;
            playerMoney = playerMoney - 7;
            }
            else {
                window.alert("You don't have enough money!");
            }

            break;
        case "UPGRADE": // new case
        case "upgrade":
          if (playerMoney >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");

            // increase attack and decrease money
            playerAttack = playerAttack + 6;
            playerMoney = playerMoney - 7;
          }
          else {
              window.alert("You don't have enough money!");
          }

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
// start the game when the page loads
startGame();