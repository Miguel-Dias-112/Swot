import './App.css';
import './cssreset.css'
import Dialog_força from './Dialog_força/Dialog_força.js';
import React from 'react';
import Main2 from './Main/main.js';
import Plotter from './Plotter/plotter.js';

import {
  MemoryRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

class App extends React.Component{
  constructor(props){
    super (props)

    this.state={
        Forças:[],
        Fraquezas:[],
        Ameaças:[],
        Oportunidades:[],
        show:'',

        SwotDao:{
          adicionar:(nome, titulo,valor)=>{
            Object.keys(this.state).forEach((key) => {
              if(key==nome){
                let elemento = this.state[key]
                elemento.push({titulo,valor})
                this.setState(nome=elemento)
                console.log(this.state)
              }
            });
          },
          remover:(nome, titulo,valor)=>{
            Object.keys(this.state).forEach((key) => {
              if(key==nome){
                let elemento = this.state[key]
                console.log('removedor:')
                console.log(elemento)

                elemento.forEach(nó => {
                  console.log('removedor:nó')

                  console.log(nó)
                  console.log('removedor:valores nó')

                  console.log({titulo,valor})


                    if(nó['titulo']==titulo&&nó['valor']==valor ){
                      let posição = elemento.indexOf(nó)
                      elemento.splice(posição,1)
                      console.log('removedor:elemento excluido e pos')

                      console.log([elemento,posição])
                      this.setState(nome=elemento)

                    }
                });
                
                console.log(this.state)
              }
            });
          }
        },

        setshow:(d)=>{
          console.log(d)
          this.setState({show:d})
        }
    }
  }
  componentDidUpdate(){
    console.log('app: atualizei')


  }
  componentDidMount(){
    let screen = window.screen

  

  }
  render(){
    return (
      <div className="App">
        <header>
          <h1> Analise Swot</h1>
          <button className='normalbutton' onClick={(e)=>{
            let text = e.currentTarget.innerText
            if (text=='gerar grafico'){
              let plotter = document.getElementById('plotter')
              plotter.click()
              e.currentTarget.innerText='voltar'
              e.currentTarget.className='custombuttom'
            }else{
              let home = document.getElementById('home')
              home.click()
              console.log('aqui')
              e.currentTarget.innerText='gerar grafico'
              e.currentTarget.className='normalbutton'
            }
            
          }}> gerar grafico</button>
        </header>
        <main>
          <MemoryRouter>
              <Link id='plotter' to='plotter'></Link>
              <Link id='home' to='/'></Link>

                <Routes>
                    <Route path='/' element={
                      <Main2 
                      Forças={this.state.Forças} 
                      show={this.state.show} 
                      Fraquezas={this.state.Fraquezas} 
                      Ameaças={this.state.Ameaças} 
                      SwotDao={this.state.SwotDao}
                      Oportunidades={this.state.Oportunidades} >
                      </Main2>}>
                       
                    </Route>

                    <Route path='/plotter' element={
                      <Plotter 
                      Forças={this.state.Forças} 
                      show={this.state.show} 
                      Fraquezas={this.state.Fraquezas} 
                      Ameaças={this.state.Ameaças} 
                      Oportunidades={this.state.Oportunidades} >
                      </Plotter>}>
                       
                    </Route>
                </Routes>
          </MemoryRouter>
        </main>
        <footer>
          <p>
            Site criado inteiramente por MIGUEL DIAS DE ABREU
          </p>
          
        </footer>
     
  
        <Dialog_força SwotDao={this.state.SwotDao}setshow={this.state.setshow}> </Dialog_força>
      </div>
    );
  }
  
}

export default App;
