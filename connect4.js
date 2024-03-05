var playerPink="P";
var playerBlue="B";
var currplayer=playerPink;

var gameOver=false;
var board;
var currColumns;

var rows=6;
var columns=7;

window.onload=function(){
    setGame();
}

function setGame(){
    board=[];
    currColumns=[5,5,5,5,5,5,5];

    for(let r=0;r<rows;r++){
        let row=[];
        for(let c=0;c<columns;c++){
            //JS
            row.push(' ');

            //HTML
            //<div id="0-0" class="tile"></div>
            let tile=document.createElement("div");
            tile.id=r.toString()+"-"+c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click",setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row)
    }
}
function setPiece(){
    if(gameOver){
        return;
    }
    let coords=this.id.split("-");
    let r=parseInt(coords[0]);
    let c=parseInt(coords[1]);
    
    r=currColumns[c];
    if(r<0){
        return;
    }

    board[r][c]=currplayer;
    let tile=document.getElementById(r.toString()+"-"+c.toString());
    if(currplayer==playerPink){
        tile.classList.add("pink-piece");
        currplayer=playerBlue;
    }
    else{
        tile.classList.add("blue-piece");
        currplayer=playerPink;
    }
    r -= 1;
    currColumns[c]=r;

    checkWinner();
}

function checkWinner(){
    //horizontally
    for(let r=0;r<rows;r++){
        for(let c=0;c<columns-3;c++){
            if(board[r][c] != ' '){
                if(board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }
    //vertically
    for(let c=0;c<columns;c++){
        for(let r=0;r<rows-3;r++){
            if(board[r][c] !=' '){
                if(board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]){
                    setWinner(r,c);
                    return;
                }
            }
        }

    }
    //anti diagonally
    for(let r=3; r<rows;r++){
        for(let c=0;c<columns-3;c++){
            if(board[r][c] != ' '){
                if(board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]){
                    setWinner(r,c);
                    return;
                
                }
            }
        }
    }
    //diagonally
    for(let r=0; r<rows-3;r++){
        for(let c=0;c<columns-3;c++){
            if(board[r][c] != ' '){
                if(board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]){
                    setWinner(r,c);
                    return;
                }
            }
        }
    }

}
function setWinner(r,c){
    let winner=document.getElementById("winner");
    if(board[r][c]==playerPink){
        winner.innerText="Pink wins!";
    }
    else{
        winner.innerText="Blue wins!";
    }
    gameOver=true;
}