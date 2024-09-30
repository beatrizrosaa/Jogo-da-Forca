import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: .25rem;
    font-size: 3rem;
    font-weight: bold;
    text-transform: uppercase;
    font-family: monospace;
`


type palavrasProps = {
    letrasAdivinhadas: string[],
    palavraAdivinhar: string

}

export default function Palavras({letrasAdivinhadas,palavraAdivinhar}: palavrasProps ) {
    return (
        <Wrapper>
            {palavraAdivinhar.split("").map((letter, index) => (
                <span style={{ borderBottom: '0.1em solid white'}} key={index}>
                    <span style={{visibility: letrasAdivinhadas.includes(letter) ? "visible" : "hidden"}}>{letter}</span>
                    
                </span>
            ))}
        </Wrapper>
    );
}

