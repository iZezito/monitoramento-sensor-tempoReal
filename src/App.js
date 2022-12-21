import React, {useEffect,useState} from "react";
import "./styles.css";
import firebase from "./FirebaseConnection";




function App() {
  const [ligado,setLigado] = useState(false)
  const [direcao,setDirecao] = useState('')
  const [sensor, setSensor] = useState(0)
  const [porcentagens, setPorcentagens] = useState(0)
  const [cor, setCor] = useState({color:'black'})
  const [media, setMedia] = useState(0.0)
  const [umidade,setUmidade] = useState(0)

  useEffect(() => {
    get()
    getHumidade()
  }, [])
  

  const getHumidade = async () => await firebase.database().ref("Porcentagem_solo").on('value' , (snapshot) =>{
    let list = []
    snapshot.forEach((childSnapshot) => {
      var childData = childSnapshot.val();
      list.push(childData)
     
    })
    setUmidade(list[list.length - 1])

  })

  const setNome = async () => {
    await firebase.database().ref("Nome").set(!ligado)
    setLigado(!ligado)
  }


  const get = async () => await firebase.database().ref("Sensor_solo").on('value',(snapshot)=>{
    let list = []
    snapshot.forEach((childSnapshot) => {
      var childData = childSnapshot.val();
      list.push(childData)
     
    }
  
    );
    const media = (list.reduce((a, b) => a + b, 0)/list.length).toFixed(2);
    setMedia(media)
    const ultimaLeitura = list[list.length -2];
    const lastValue = list[list.length -1];
    const percent = (((lastValue - ultimaLeitura)*100)/ultimaLeitura).toFixed(2)
    if(percent<0){
      setCor({color:'red'})
      setDirecao('down')
    }else if(percent>0){
      setCor({color:'green'})
      setDirecao('up')

    }else{
      setCor({color:'blue'})
      setDirecao('')
    }

    setPorcentagens(percent)
    setSensor(lastValue)
    
    
  }
  );
  
  
  return (
    <div className="App">
      <div id="main">
        <h1>Microcontrolador</h1>
        <button onClick={setNome}>Ligar Bomba</button>
        <div className="container">
          <div className="card">
            <p>Último valor</p>
            <div className="info">
              <h2>{sensor}</h2>
              <ion-icon name={`arrow-${direcao}-outline`}></ion-icon>
              <p className="porcentagem" style={cor}>{porcentagens}%</p>
            </div>
          </div>
          <div className="card">
            <p>Média</p>
            <div className="info">
              <h2>{media}</h2>
            </div>
          </div>
          <div className="card">
            <p>Humidade</p>
            <div className="info">
              <h2>{umidade}%</h2>
            </div>
            
          </div>
          
        </div>
        
        
      </div>
    </div>
  );
}

export default App;
