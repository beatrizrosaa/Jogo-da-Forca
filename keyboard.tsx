import styled from 'styled-components';

const KEYS = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];

const Teclado = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(75px, 1fr));
    gap: .5rem;
`;

type KeyboardProps ={
    disabled?: boolean
    letraAtiva: string[]
    letrasInativas: string[]
    addletraAdivinhada: (letter: string) => void

}

export default function Keyboard({letraAtiva, letrasInativas, addletraAdivinhada, disabled=false}: KeyboardProps) {

    return (
        <Teclado>
            {KEYS.map(key => {
                const ativo = letraAtiva.includes(key);
                const inativo = letrasInativas.includes(key);

                return(
                <button onClick={() => addletraAdivinhada(key)} 
                className={`botaozinho ${ativo ? 'ativo' : ''} ${inativo ? 'inativo' : ''}`}
                disabled = {inativo || ativo || disabled }
                key={key}>{key}</button>
            )})}
        </Teclado>
    );
}
