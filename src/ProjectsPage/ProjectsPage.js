

import React, { createRef } from "react";
import './ProjectsPage.css'
//isso tem que ir pro state no APP como prop
import  {   dados, deletarprojeto, NovoSwot, setdados  } from '../LandPage/FIrebase.js'
let meusdados = []

class ProjectPage extends React.Component{
  constructor(props){
    super (props)
    
    this.state={
        elementos:[]
    }
    this.ClickHandle=this.ClickHandle.bind(this)
    this.NovoProjeto=this.NovoProjeto.bind(this)
    this.onMouseDown=this.onMouseDown.bind(this)
    this.onMouseUp=this.onMouseUp.bind(this)
    this.texto=createRef()


  }

  cliqueLongo=false
  NovoProjeto(){
        let novo_elementos=this.state.elementos
        let nome =window.prompt("nome do projeto:")
        console.log(nome)

        let novos_Dados = {
                
            Forças:[''],
            Fraquezas:[''],
            Oportunidades:[''],
            Ameaças:['']
        }
       if(nome!=""){ if(novo_elementos.length+1<10){
            novo_elementos.push(
                nome
            )

            NovoSwot(nome,novos_Dados)
            meusdados[nome]=novos_Dados
            this.setState({elementos:novo_elementos})
            setdados(meusdados)
            console.log(dados)
        }}
     
  }
  ClickHandle(element){
    let x = element.target
    let SwotDao = this.props.SwotDao
    


    let y = this.texto.current
    let texto =y.innerText
    console.log(y)

    Object.keys(meusdados).forEach(
            
        (item) => {
            if(item==texto){
                console.log('meusdados')
                console.log(meusdados[item])
                let Forças = meusdados[item].Forças
                let Oportunidades = meusdados[item].Oportunidades
                let Fraquezas = meusdados[item].Fraquezas
                let Ameaças = meusdados[item].Ameaças
                if (Forças!=undefined){
                    SwotDao.load('Forças',Forças,item) 
                    SwotDao.load('Oportunidades',Oportunidades,item) 
                    SwotDao.load('Fraquezas',Fraquezas,item) 
                    SwotDao.load('Ameaças',Ameaças,item) 

                }else{
                    SwotDao.load('Forças',[],item) 
                    SwotDao.load('Oportunidades',[],item) 
                    SwotDao.load('Fraquezas',[],item) 
                    SwotDao.load('Ameaças',[],item) 
                }

                window.setTimeout(()=>{
                    let linkto = document.getElementById('Main2')
                    linkto.click()
                },500)
              
               // SwotDao.load('Oportunidades',Oportunidades)   
                //SwotDao.load('Fraquezas',Fraquezas)   
                //SwotDao.load('Ameaças',Ameaças)   

            }
            

      });
  }
   componentDidMount(){
        console.log('dados firebase')
        console.log(dados)
        Object.keys(dados).forEach(
            
            (item) => {

                console.log(dados[item])
                let elementos = this.state.elementos
                elementos.push(item)
                this.setState({
                    elementos:elementos
                })
          });



          let button=document.getElementById('btn_grafico')
          button.style.visibility='hidden'
          console.log(dados)
  
          let h1 = document.getElementById('titulo')
          h1.innerHTML='Analise Swot'
          h1.onclick=()=>{
            if(window.confirm("você quer desconectar?")){
                let home=document.getElementById('home')
                home.click()
                console.log('teste')
            }
            
          }

          meusdados=dados
          console.log(meusdados)
    
    

        
  }     
  levantei =''
  onMouseDown(e){
    this.levantei = false
    window.setTimeout(() => {
        if(this.levantei==false){
            //clique longo
            let x = window.confirm('quer me excluir?')
            if( x==true){
                let nome=e.target.childNodes[0].innerText
                let pai = document.getElementById('papai smurf')
                deletarprojeto(nome)  
                pai.removeChild(e.target)
                
            }
        }
        if(this.levantei==true){
            
            this.ClickHandle(e)
        }
    }, 500);
  }
  onMouseUp(){
    this.levantei=true
  }
  render(){
    

    return(            
        <div id="projetos" className="ProjectsPagemain">
            <div className="projects" id="papai smurf">
            {
            
            this.state.elementos.map(element => {

                return <div onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp} className="project">
                            <h1 ref={this.texto}>
                                {element}
                            </h1>
                            <div className="corner ca" ></div>
                            <div className="corner cb" ></div>
                            <div className="corner cc" ></div>
                            <div className="corner cd" ></div>
                            
                            
                        </div>
                })

                }
            </div>
            <button className="float" onClick={this.NovoProjeto}>
+
            </button>
        </div>
    )
  
  


  }
  
}

export  default  ProjectPage;
