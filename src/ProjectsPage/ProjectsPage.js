

import React, { createRef } from "react";
import './ProjectsPage.css'
//isso tem que ir pro state no APP como prop
import  {   dados, NovoSwot, setdados  } from '../LandPage/FIrebase.js'
let meusdados = []

class ProjectPage extends React.Component{
  constructor(props){
    super (props)
    
    this.state={
        elementos:[]
    }
    this.ClickHandle=this.ClickHandle.bind(this)
    this.NovoProjeto=this.NovoProjeto.bind(this)

  }


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
  ClickHandle(e){
    let x = e.currentTarget
    let SwotDao = this.props.SwotDao

    console.log('==============depuração')


    let y = e.currentTarget.children[0]

    let texto =y.innerText

    console.log(    Object.keys(meusdados))

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
          h1.onclick=''

          meusdados=dados
          console.log(meusdados)
    
    

        
  }     
  render(){
    

    return(            
        <div id="projetos" className="ProjectsPagemain">
            <div className="projects">
            {
            
            this.state.elementos.map(element => {

                return <div onClick={(e)=>{this.ClickHandle(e)}}className="project">{
                    <h1 >
                        {element}
                    </h1>
                }</div>
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
