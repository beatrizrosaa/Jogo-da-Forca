import './App.css'
import Play from './play'
import { useState } from 'react'
import JogoDaForcaLogo from '/JogoDaForcaLogo.png';
import JogoDaForcaLogo2 from '/JogoDaForcaLogo2.png';

  function App() {
    const [mostrarJogo, setMostrarJogo] = useState(false);
    const [logoSrc, setLogoSrc] = useState(JogoDaForcaLogo);

    const handleClick = () => {
      setMostrarJogo(true);
    };

    const handleMouseEnter = () => {
      setLogoSrc(JogoDaForcaLogo2);
    };
  
    const handleMouseLeave = () => {
      setLogoSrc(JogoDaForcaLogo);
    };
    
    window.onload = function() {
      
      
  }

  
    return (
      <>
        {!mostrarJogo && (
        <div className="home">
             <img
            id="logo"
            src={logoSrc}
            alt="Jogo da Forca Logo"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              width: '10%',
              padding: '0',
              margin: '0 auto',
              borderRadius: '100%',
              transition: 'transform 0.3s ease',
            }}
          />
          <h2>Bem-vindo ao jogo!</h2>
          <p>Clique no botão para começar.</p>
          <button id="botaoinicial" onClick={handleClick}>Let's play!</button>
        </div>
      )}

      {mostrarJogo && (
        <div className="jogo">
          <Play></Play>
        </div>
      )}
        

      </>
    );
  }
  
  export default App;
  
