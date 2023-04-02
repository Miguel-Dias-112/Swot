import './App.css';
import './cssreset.css'
import Dialog_força from './Dialog_força/Dialog_força.js';
import React from 'react';
import Main2 from './Main/main.js';
import Plotter from './Plotter/plotter.js';
import LandPage from './LandPage/landpage.js';
import ProjectPage from './ProjectsPage/ProjectsPage.js';
import {dados,NovoSwot, updateprojeto} from './LandPage/FIrebase.js'

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
   
        elementoatual:'',
        Forças:[],
        Fraquezas:[],
        Ameaças:[],
        Oportunidades:[],
        show:'',

        SwotDao:{
          load:(nome,dados,pai)=>{
            Object.keys(this.state).forEach((key) => {
              if(key==nome){
                let elemento = this.state[key]
                elemento=dados
            

                if(key=='Forças'){

                  this.setState({'Forças':elemento,elementoatual:pai})
                }
                if(key=='Fraquezas'){

                  this.setState({'Fraquezas':elemento,elementoatual:pai})
                }
                if(key=='Ameaças'){

                  this.setState({'Ameaças':elemento,elementoatual:pai})
                }
                if(key=='Oportunidades'){

                  this.setState({'Oportunidades':elemento,elementoatual:pai})
                }
              }
            });
          },
          adicionar:(nome, titulo,valor)=>{
            
            Object.keys(this.state).forEach((key) => {
              if(key==nome){
                //salva na tela
                let elemento = this.state[key]
                elemento.push({titulo:titulo,valor:valor})

                let json ='{ "'+nome+'": '+ JSON.stringify(elemento) +'}' 
                this.setState(JSON.parse(json))
                console.log('SwotDao: criei novo elemento')
                console.log(elemento)
                console.log('SwotDao: key')

                console.log(key)
                console.log(nome)


                
               
              }
            });

            Object.keys(dados).forEach(
              (item)=>{
                  if(this.state.elementoatual==item){
                    let Data = {
                      Forças:this.state.Forças,
                      Fraquezas:this.state.Fraquezas,
                      Oportunidades:this.state.Oportunidades,
                      Ameaças:this.state.Ameaças
                    }

                    NovoSwot(item,Data)

                  }
              }
            )
            
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


                      
                      window.setTimeout(()=>{

                        updateprojeto(this.state.elementoatual,{
                          Forças:this.state.Forças,
                          Fraquezas:this.state.Fraquezas,
                          Ameaças:this.state.Ameaças,
                          Oportunidades:this.state.Oportunidades,
                        })
                        console.log('removedor:elemento excluido e pos')
                        
                      },500)

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
    console.log(this.state)

  }
  componentDidMount(){
    let screen = window.screen

  

  }
  render(){
    return (
      <div className="App">
        <header>
          <h1 id='titulo'> Analise Swot</h1>
          <button id='btn_grafico' className='normalbutton' onClick={(e)=>{
            let text = e.currentTarget.innerText
            let home = document.getElementById('Main2').click()
            let plotter = document.getElementById('plotter')

            switch (text) {
              case 'gerar grafico':
                plotter.click()
                e.currentTarget.innerText='voltar'
                e.currentTarget.className='custombuttom'
                break;
              case 'voltar':
                
              default:
                break;
            }
        

            
            
          }}> gerar grafico</button>
        </header>
        <main>
          <MemoryRouter>
              <Link id='plotter' to='/plotter'></Link>
              <Link id='home' to='/'></Link>
              <Link id='ProjectPage' to='/ProjectsPage'></Link>
              <Link id='Main2' to='/Main2'></Link>

                <Routes>
                    <Route path='/Main2' element={
                      <Main2 
                      Forças={this.state.Forças} 
                      show={this.state.show} 
                      Fraquezas={this.state.Fraquezas} 
                      Ameaças={this.state.Ameaças} 
                      SwotDao={this.state.SwotDao}
                      Oportunidades={this.state.Oportunidades} >
                      </Main2>}>
                       
                    </Route>

                    <Route path='/ProjectsPage' element={
                      <ProjectPage SwotDao={this.state.SwotDao}
                      
                      >
                      </ProjectPage>}>
                       
                    </Route>
                    <Route path='/' element={
                      <LandPage>

                      </LandPage>}>
                       
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
