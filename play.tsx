import { useCallback, useEffect } from 'react'
import palavras from './lista.json'
import { useState } from 'react'
import './App.css'
import Desenho from './components/desenho'
import Palavras from './components/palavras'
import Keyboard from './components/keyboard'


/*  FUNÇÃO CONFETE */

function createConfetti() {
  const colors = ['#9932CC', '#FFC0CB', '#8B008B']; // Cores dos confetes
  const container = document.createElement('div'); // Cria um elemento div para conter os confetes
  container.style.position = 'fixed';
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.top = '0';
  container.style.left = '0';
  container.style.pointerEvents = 'none'; // Garante que o contêiner não capture eventos de clique

  const confettiCount = 100; // Quantidade de confetes

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div'); // Cria um elemento div para cada confete
    const size = Math.random() * 10 + 5; // Tamanho aleatório entre 5 e 15 pixels
    const color = colors[Math.floor(Math.random() * colors.length)]; // Escolhe uma cor aleatória

    confetti.style.position = 'absolute';
    confetti.style.width = size + 'px';
    confetti.style.height = size + 'px';
    confetti.style.backgroundColor = color;
    confetti.style.opacity = '0.8';
    confetti.style.borderRadius = '50%';
    confetti.style.left = Math.random() * 100 + '%'; // Posição horizontal aleatória
    confetti.style.top = Math.random() * -20 + 'vh'; // Posição vertical inicial aleatória para um efeito de dispersão
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`; // Rotaciona aleatoriamente o confete
    confetti.style.animation = `fall ${Math.random() * 2 + 3}s linear infinite`; // Adiciona uma animação de queda

    container.appendChild(confetti); // Adiciona o confete ao contêiner
  }

  document.body.appendChild(container); // Adiciona o contêiner ao corpo da página
}



function play(){

const [palavraAdivinhar, setPalavraAdivinhar] = useState(() => {
  return palavras[Math.floor(Math.random()*palavras.length)]
});
  
  const [letrasAdivinhadas, setletrasAdivinhadas] = useState<string[]>([])

  
  const letrasIncorretas = letrasAdivinhadas.filter(letter => !palavraAdivinhar.includes(letter));

  const loser = letrasIncorretas.length >= 6
  const winner = palavraAdivinhar.split("").every(letter => letrasAdivinhadas.includes(letter) )

  const addletraAdivinhada = useCallback((letter:string) => {
    if (letrasAdivinhadas.includes(letter)) return

    setletrasAdivinhadas(currentLetters => [...currentLetters, letter])

  }, [letrasAdivinhadas])



  function inicializarLocalStorage() {
    if (localStorage.getItem('vitorias') === null) {
        localStorage.setItem('vitorias', '0');
    }
    if (localStorage.getItem('derrotas') === null) {
        localStorage.setItem('derrotas', '0');
    }
  }
  
  function atualizarExibicao() {
    const vitoriasElement = document.getElementById('vitorias');
    const derrotasElement = document.getElementById('derrotas');
    if (vitoriasElement) vitoriasElement.textContent = 'Vitórias: ' + (localStorage.getItem('vitorias') || '0');
    if (derrotasElement) derrotasElement.textContent = 'Derrotas: ' + (localStorage.getItem('derrotas') || '0');
  }


  useEffect(() => {
    if (winner) {
      let vitorias = parseInt(localStorage.getItem('vitorias') ?? '0');
      vitorias += 1;
      localStorage.setItem('vitorias', vitorias.toString());
      atualizarExibicao();
      createConfetti();
    } else if (loser) {
      let derrotas = parseInt(localStorage.getItem('derrotas') ?? '0');
      derrotas += 1;
      localStorage.setItem('derrotas', derrotas.toString());
      atualizarExibicao();
    }
  }, [winner, loser]); 


  useEffect(() => {
    inicializarLocalStorage();
    atualizarExibicao();
  }, []);


  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key

      if(!key.match(/^[a-z]$/)) return 

      e.preventDefault()
      addletraAdivinhada(key)
    }

    document.addEventListener("keypress", handler)
    return ()=>{
      document.removeEventListener("keypress", handler)
    }
  }, [letrasAdivinhadas])


return(
 <div className="jogo" style={{
  position:'relative',
  maxWidth: "800px",
  display: "flex",
  flexDirection: "column",
  gap:"2rem",
  margin: "0 auto",
  alignItems: "center"
}}>
  <div className="resultado"> {winner && "YUP, você ganhou!"}
  {loser && "Ooops, perdeu hein!"}</div>
  <Desenho nTentativas={letrasIncorretas.length}/>
  <Palavras letrasAdivinhadas={letrasAdivinhadas} palavraAdivinhar = {palavraAdivinhar}/>
  <div className="teclado"><Keyboard disabled={winner || loser} letraAtiva={letrasAdivinhadas.filter(letter => palavraAdivinhar.includes(letter))} letrasInativas={letrasIncorretas} addletraAdivinhada={addletraAdivinhada}/></div>
    <div className="placar">
      <div id="vitorias"></div>
      <div id="derrotas"></div>
    </div>  
      
 </div>

)}


export default play;