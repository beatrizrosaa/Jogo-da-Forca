import styled from 'styled-components';



const TracoBase = styled.div`
  height: 10px;
  width: 250px;
  background: white;
`;

const TracoTronco = styled.div`
  height: 250px;
  width: 10px;
  background: white;
  margin-left:60px;
`;

const TracoTopo = styled.div`
  height: 10px;
  width: 120px;
  background: white;
  position: absolute;
  right:60px;
  top:0;
`;

const TracoTronquinho = styled.div`
  height: 40px;
  width: 10px;
  background: white;
  margin-left:180px;
  position:absolute;
  top:0;

`;

const Head = styled.div`
  height: 45px;
  width: 45px;
  border: 5px solid white;
  position:absolute;
  border-radius:50%;
  top: 35px;
  right: 39px;
`;

const Body = styled.div`
    height: 90px;
    width: 6px;
    background: white;
    margin-left:60px;
    position:absolute;
    top: 90px;
    margin-left:182px;
    
`;

const BracoD = styled.div`
    height: 6px;
    width: 50px;
    background: white;
    margin-left:60px;
    position:absolute;
    top: 110px;
    right:18px;
    rotate: 30deg;
`;

const BracoE = styled.div`
    height: 6px;
    width: 50px;
    background: white;
    margin-left:60px;
    position:absolute;
    top: 110px;
    right:60px;
    rotate: 330deg;
`;

const PernaD = styled.div`
    height: 6px;
    width: 50px;
    background: white;
    margin-left:60px;
    position:absolute;
    top: 190px;
    right: 24px;
    rotate: 50deg;
`;

const PernaE = styled.div`
    height: 6px;
    width: 50px;
    background: white;
    margin-left:60px;
    position:absolute;
    top: 190px;
    right: 55px;
    rotate: 310deg;
`;

type DesenhoProps={
  nTentativas: number
}

const BONECO = [ Head, Body, BracoD, BracoE, PernaD, PernaE]

export default function Desenho({nTentativas}: DesenhoProps) {
  return (
    <div style={{
        position: 'relative',
        display:'flex',
        flexDirection:'column',}}>
      {BONECO.slice(0, nTentativas).map((Component, index) => (
        <Component key={index} />
      ))}
      <TracoTronquinho />
      <TracoTopo />
      <TracoTronco />
      <TracoBase />
    </div>
  );
}
