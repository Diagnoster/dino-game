const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;

function handleKeyUp (event) {
    if (event.keyCode === 32) {
        if (!isJumping) {
            jump();
        }
    }
}

function jump () {   
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval); 

            //Descendo
            let downInterval = setInterval(() => {
                if(position <= 0 ) {
                    clearInterval(downInterval); /*para de descer*/
                    isJumping = false;
                } else {
                     position -= 20;
                     dino.style.bottom = position + 'px';
                  }
            }, 20);
        } else {
            //Subindo
            position += 20;    
            dino.style.bottom = position + 'px';
          }

    }, 20); /* a cada 20 milesimos de segundo, adiciona 20 na position */
}

function createCactus() {
    const cactus = document.createElement('div'); /* javascript gerando html novos */
    let cactusPosition = 1000;
    let randomTime = Math.random() * 6000;

    console.log(randomTime);

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if (cactusPosition < -60) {
            clearInterval(leftInterval);
            background.removeChild(cactus); /* se sair da tela remove elemento filho */
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            //Game Over
            clearInterval(leftInterval); /* limpando intervalo quando encostar*/
            document.body.innerHTML = '<h1 class="game-over"> Game Over </h1>';
            
        }
          else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20);

    setTimeout( createCactus, randomTime); /* recursividade */
}

createCactus();

document.addEventListener('keyup', handleKeyUp);

