var maxColIndex = 3;
var maxRowIndex = 3;
var moves = 0;
var startTime;
var endTime;
var swap;
var rightCell;
var leftCell;
var topCell;
var botCell;

var commonPoke = new Array("pokemongif/pikachu.gif", "pokemongif/charmander.gif", "pokemongif/bulbasaur.gif", "pokemongif/squirtle.gif");
var rarePoke = new Array("pokemongif/eevee.gif", "pokemongif/jigglypuff.gif", "pokemongif/nidorino.gif", "pokemongif/vulpix.gif");
var epicPoke = new Array("pokemongif/dragonite.gif", "pokemongif/lapras.gif", "pokemongif/snorlax.gif", "pokemongif/gyarados.gif");
var legendaryPoke = new Array("pokemongif/mew.gif", "pokemongif/mewtwo.gif", "pokemongif/moltres.gif");

function start(){
    document.getElementById("moves").innerHTML= "0";
    startTime = new Date();
}

function clickCell(obj) {
    // retrieve ObjectHTMLTableElement
    var table = obj.parentNode.parentNode;
				
    // retrieve row index & column index
    var rowIndex = obj.parentNode.rowIndex;
    var colIndex = obj.cellIndex;
				
    /* there will be conditions where there are no right, left, top and/or bottom cell...
    process further only if the cells are valid */
    var movable = false;
    if(colIndex > 0) {
        leftCell = table.rows[rowIndex].cells[colIndex - 1];
		if(leftCell && leftCell.attributes["class"].value == "empty") {
			movable = true;
			swap = leftCell;
		}
    }			
    
    if(rowIndex > 0) {
        topCell = table.rows[rowIndex - 1].cells[colIndex];
		if(topCell && topCell.attributes["class"].value == "empty") {
			movable = true;
			swap = topCell;
		}
    }
    
    if(colIndex < maxColIndex) {
        rightCell = table.rows[rowIndex].cells[colIndex + 1];
		if(rightCell && rightCell.attributes["class"].value == "empty") {	
			movable = true;
			swap = rightCell;
		}
    }
    
    if(rowIndex < maxRowIndex) {
        botCell = table.rows[rowIndex + 1].cells[colIndex];
		if(botCell && botCell.attributes["class"].value == "empty") {
			movable = true;
			swap = botCell;
		}
    }

    if(movable==true) {
        // if the cells are movable, swap the 2 cells
        // also, count the number of moves by increasing each swap by 1
	if (moves == 0) {
		start();
	}
        moves++;
        document.getElementById("moves").innerHTML= moves;
					
        var temp = swap.attributes["class"].value;
        var tempHtml = swap.innerHTML;
					
        var className = obj.attributes["class"].value;
        className = className.replace(" highlightTile","");
					
        swap.attributes["class"].value = className;
        swap.innerHTML = obj.innerHTML;
							
        obj.attributes["class"].value = temp;
        obj.innerHTML = tempHtml;
    }
    
    // check if the player won
    if(won()==true) {
        
        // if so.. do the following:
        var msg = "Congratulations";
        msg += "\nYou finished with " + moves + " moves";
        endTime = new Date();
        var timeDiff = endTime - startTime;	
        var seconds = timeDiff/1000;
        seconds = Math.round(seconds);
        msg += "\nYour time(sec): " + seconds;
        // show a pop up message w/: # of moves, and amount of seconds it took
        alert(msg);
        document.getElementById("win").style.display = 'inline';
        document.getElementById("shufflebtn").innerHTML = "Play Again?";
        //window.location.href = "youwin.html";
    }
}

// check if the player won the game
function won() {
    var table = document.getElementById("puzzleTable");
				
    // check if last cell is empty
    var lastCellClass = table.rows[maxRowIndex].cells[maxColIndex].attributes["class"].value;
    
    if(lastCellClass != "empty"){
        return false;
    }
    // if last cell is empty, then check all the cells
    var num = 1;
    for(var i = 0; i <= maxRowIndex; i++) {
        for(var j = 0; j <= maxColIndex; j++) {
            if(i != maxRowIndex || j != maxColIndex) { 
                if(table.rows[i].cells[j].innerHTML != num.toString()) {
                    return false;
                }
            }
            num++;
        }
    }
    return true;
}

function chgbg(){
    var option = document.getElementById("bg");
    var value = option.options[option.selectedIndex].value;
    if(value == 0){
        window.location.href = "fifteen.html";
        randomCommon();
    } else if(value == 1){
        window.location.href = "fifteen2.html";
        randomRare();
    } else if(value == 2){
        window.location.href = "fifteen3.html";
        randomEpic();
    } else if(value == 3){
        window.location.href = "fifteen4.html";
        randomLegendary();
    } 
}

//get the empty cell of the table
function get_Empty_Cell(table) {
    var emtpyCell;
    for(var i = 0; i < table.rows.length; i++) {
        for(var j = 0; j < table.rows[i].cells.length; j++) {
            if(table.rows[i].cells[j].attributes["class"].value=="empty") {
                emptyCell = table.rows[i].cells[j];
                break;
            }
        }
    }
    return emptyCell;
}
			
// setup random moves
function get_Random_Move(array) {
    var rand = array[Math.floor(Math.random() * array.length)];
    return rand;
}
			
function shuffle_common(){
    document.getElementById("win").style.display = 'none';
    document.getElementById("shufflebtn").innerHTML = "SHUFFLE";
    randomCommon();
    
    //start();
    moves = 0;
    var table = document.getElementById("puzzleTable");
	
    for(var count = 0; count < 3; count++) {
        var emptyCell = get_Empty_Cell(table);
				
        var emptyColIndex = emptyCell.cellIndex;
        var emptyRowIndex = emptyCell.parentNode.rowIndex;
		var move1 = [];

        if(emptyRowIndex > 0){
            move1.push(0);
        }
		
        if(emptyColIndex < maxColIndex){
            move1.push(1);
        }
		
        if(emptyRowIndex < maxRowIndex){
            move1.push(2);
        }
		
        if(emptyColIndex > 0){
            move1.push(3);
        }
        var randomMove = get_Random_Move(move1);

        var commonMove;
        if(randomMove == 0){
            commonMove = table.rows[emptyRowIndex - 1].cells[emptyColIndex];
        } else if(randomMove == 1){
            commonMove = table.rows[emptyRowIndex].cells[emptyColIndex + 1];
        } else if(randomMove == 2){
            commonMove = table.rows[emptyRowIndex + 1].cells[emptyColIndex];
        } else if(randomMove == 3){
            commonMove = table.rows[emptyRowIndex].cells[emptyColIndex - 1];
        }
        
        var temp = emptyCell.attributes["class"].value;
        var tempHtml = emptyCell.innerHTML;
        emptyCell.attributes["class"].value = commonMove.attributes["class"].value;
        emptyCell.innerHTML = commonMove.innerHTML;
			
        commonMove.attributes["class"].value = temp;
        commonMove.innerHTML = tempHtml;
    }		
}
			
function shuffle_rare(){
    document.getElementById("win").style.display = 'none';
    document.getElementById("shufflebtn").innerHTML = "SHUFFLE";
    randomRare();
    
    //start();
    moves = 0;
    var table = document.getElementById("puzzleTable");
	
    for(var count = 0; count < 20; count++) {
        var emptyCell = get_Empty_Cell(table);
				
        var emptyColIndex = emptyCell.cellIndex;
        var emptyRowIndex = emptyCell.parentNode.rowIndex;
		var move2 = [];

        if(emptyRowIndex > 0){
            move2.push(0);
        }
		
        if(emptyColIndex < maxColIndex){
            move2.push(1);
        }
		
        if(emptyRowIndex < maxRowIndex){
            move2.push(2);
        }
		
        if(emptyColIndex > 0){
            move2.push(3);
        }

        var randomMove = get_Random_Move(move2);

        var rareMove;
        if(randomMove == 0){
            rareMove = table.rows[emptyRowIndex - 1].cells[emptyColIndex];
        } else if(randomMove == 1){
            rareMove = table.rows[emptyRowIndex].cells[emptyColIndex + 1];
        } else if(randomMove == 2){
            rareMove = table.rows[emptyRowIndex + 1].cells[emptyColIndex];
        } else if(randomMove == 3){
            rareMove = table.rows[emptyRowIndex].cells[emptyColIndex - 1];
        }
        
        var temp = emptyCell.attributes["class"].value;
        var tempHtml = emptyCell.innerHTML;
        emptyCell.attributes["class"].value = rareMove.attributes["class"].value;
        emptyCell.innerHTML = rareMove.innerHTML;
			
        rareMove.attributes["class"].value = temp;
        rareMove.innerHTML = tempHtml;
    }		
}

function shuffle_epic(){
    document.getElementById("win").style.display = 'none';
    document.getElementById("shufflebtn").innerHTML = "SHUFFLE";
    randomEpic();
    
    //start();
    moves = 0;
    var table = document.getElementById("puzzleTable");
	
    for(var count = 0; count < 100; count++) {
        var emptyCell = get_Empty_Cell(table);
				
        var emptyColIndex = emptyCell.cellIndex;
        var emptyRowIndex = emptyCell.parentNode.rowIndex;
		var move3 = [];

        if(emptyRowIndex > 0){
            move3.push(0);
        }
		
        if(emptyColIndex < maxColIndex){
            move3.push(1);
        }
		
        if(emptyRowIndex < maxRowIndex){
            move3.push(2);
        }
		
        if(emptyColIndex > 0){
            move3.push(3);
        }

        var randomMove = get_Random_Move(move3);

        var epicMove;
        if(randomMove == 0){
            epicMove = table.rows[emptyRowIndex - 1].cells[emptyColIndex];
        } else if(randomMove == 1){
            epicMove = table.rows[emptyRowIndex].cells[emptyColIndex + 1];
        } else if(randomMove == 2){
            epicMove = table.rows[emptyRowIndex + 1].cells[emptyColIndex];
        } else if(randomMove == 3){
            epicMove = table.rows[emptyRowIndex].cells[emptyColIndex - 1];
        }
        
        var temp = emptyCell.attributes["class"].value;
        var tempHtml = emptyCell.innerHTML;
        emptyCell.attributes["class"].value = epicMove.attributes["class"].value;
        emptyCell.innerHTML = epicMove.innerHTML;
			
        epicMove.attributes["class"].value = temp;
        epicMove.innerHTML = tempHtml;
    }		
}

function shuffle_legendary(){
    document.getElementById("win").style.display = 'none';
    document.getElementById("shufflebtn").innerHTML = "SHUFFLE";
    randomLegendary();
    
    //start();
    moves = 0;
    var table = document.getElementById("puzzleTable");
	
    for(var count = 0; count < 1000; count++) {
        var emptyCell = get_Empty_Cell(table);
				
        var emptyColIndex = emptyCell.cellIndex;
        var emptyRowIndex = emptyCell.parentNode.rowIndex;
		var move4 = [];

        if(emptyRowIndex > 0){
            move4.push(0);
        }
		
        if(emptyColIndex < maxColIndex){
            move4.push(1);
        }
		
        if(emptyRowIndex < maxRowIndex){
            move4.push(2);
        }
		
        if(emptyColIndex > 0){
            move4.push(3);
        }

        var randomMove = get_Random_Move(move4);

        var legendaryMove;
        if(randomMove == 0){
            legendaryMove = table.rows[emptyRowIndex - 1].cells[emptyColIndex];
        } else if(randomMove == 1){
            legendaryMove = table.rows[emptyRowIndex].cells[emptyColIndex + 1];
        } else if(randomMove == 2){
            legendaryMove = table.rows[emptyRowIndex + 1].cells[emptyColIndex];
        } else if(randomMove == 3){
            legendaryMove = table.rows[emptyRowIndex].cells[emptyColIndex - 1];
        }
        
        var temp = emptyCell.attributes["class"].value;
        var tempHtml = emptyCell.innerHTML;
        emptyCell.attributes["class"].value = legendaryMove.attributes["class"].value;
        emptyCell.innerHTML = legendaryMove.innerHTML;
			
        legendaryMove.attributes["class"].value = temp;
        legendaryMove.innerHTML = tempHtml;
    }		
}

function randomCommon() {
    var num = Math.floor(Math.random() * commonPoke.length);
    document.getElementById("pokemon").src = commonPoke[num];
    if (num == 0) {
        document.getElementById("pokemonName").innerHTML = "PIKACHU";
    } else if (num == 1) {
        document.getElementById("pokemonName").innerHTML = "CHARMANDER";
    } else if (num == 2) {
        document.getElementById("pokemonName").innerHTML = "BULBASAUR";
    } else if (num == 3) {
        document.getElementById("pokemonName").innerHTML = "SQUIRTLE";
    }
}
function randomRare() {
    var num = Math.floor(Math.random() * rarePoke.length);
    document.getElementById("pokemon").src = rarePoke[num];
    if (num == 0) {
        document.getElementById("pokemonName").innerHTML = "EEVEE";
    } else if (num == 1) {
        document.getElementById("pokemonName").innerHTML = "JIGGLYPUFF";
    } else if (num == 2) {
        document.getElementById("pokemonName").innerHTML = "NIDORINO/A";
    } else if (num == 3) {
        document.getElementById("pokemonName").innerHTML = "VULPIX";
    }
}
function randomEpic() {
    var num = Math.floor(Math.random() * epicPoke.length);
    document.getElementById("pokemon").src = epicPoke[num];
    if (num == 0) {
        document.getElementById("pokemonName").innerHTML = "DRAGONITE";
    } else if (num == 1) {
        document.getElementById("pokemonName").innerHTML = "LAPRAS";
    } else if (num == 2) {
        document.getElementById("pokemonName").innerHTML = "SNORLAX";
    } else if (num == 3) {
        document.getElementById("pokemonName").innerHTML = "GYARADOS";
    }
}
function randomLegendary() {
    var num = Math.floor(Math.random() * legendaryPoke.length);
    document.getElementById("pokemon").src = legendaryPoke[num];
    if (num == 0) {
        document.getElementById("pokemonName").innerHTML = "MEW";
    } else if (num == 1) {
        document.getElementById("pokemonName").innerHTML = "MEWTWO";
    } else if (num == 2) {
        document.getElementById("pokemonName").innerHTML = "MOLTRES";
    }
}
 
