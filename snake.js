let btncontainer = document.querySelector('.action-buttons');
let request = document.querySelectorAll('button');
let game = document.querySelectorAll('.game-name');
const gameIntro = new Audio("playtime.mp3");


    request.forEach(eachbtn =>{
    eachbtn.addEventListener('click',()=>{
        action = eachbtn.value;
        if(action === 'start'){
            console.log('starting now....');
            location.href = 'index.html';
        }
        else if(action === 'score'){
            console.log('compiling leaderboard.....');
            btncontainer.innerHTML = `<table>
            <tr>
                <th>Name</th>            
                <th>Score</th>            
            </tr>
            <tr>
                <td>Pat</td>
                <td>20</td>
            </tr>
        </table>`;
cancel.style.display = ' block';
        }
        else if(action === 'about'){
            gameIntro.play();
            btncontainer.innerHTML = `<div class='how_to_play'><h2> How to play</h2>
            <h3>use the up, down, left and right button on your keyboard to control the snake to the top, bottom, left and right directions respectively...
            eat as many dot food as possible to grow the snake. hitting the walls equals losing the game...  </h3>
            </div>`;
cancel.style.display = ' block';
            console.log('about game!!!');
        }
        else if(action === 'end'){
            prompt('Are you sure you want to end this game?');
            console.log('quitting');
        }
    })
});
	let cancel =  document.querySelector('.cancel');	
cancel.addEventListener('click', ()=>{
	cancel.style.color= 'red';
    location.href = 'homepage.html';
});