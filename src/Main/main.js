import React from "react";
import './main.css'
import List_element from "./List_element";
class Main extends React.Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.lista_Forças = React.createRef();
        this.lista_Ameaças = React.createRef();
        this.reseta_outroslis=this.reseta_outroslis.bind(this)
        this.lista_Fraquezas = React.createRef();
        this.lista_Oportunidades = React.createRef();

    }
  
     reseta_outroslis(li){
        function pintor(lista){
            lista.childNodes.forEach(outroli => {
                if(outroli==li.currentTarget){
                  outroli.style.background='red'
                  outroli.style.color='white'
                  outroli.style.borderRadius='15px'
                }
                else{
                  outroli.style.background='whitesmoke'
                  outroli.style.color='black'
                  outroli.style.borderRadius='0px'
                }
              });
        }
        pintor(this.lista_Ameaças.current)
        pintor(this.lista_Forças.current)
        pintor(this.lista_Fraquezas.current)
        pintor(this.lista_Oportunidades.current)

      
      }

    gera_elementos(elemento,_lista){


       if(elemento!=null){ console.log(elemento.innerHtml)
        elemento.innerHtml=''}
        _lista.forEach(element => {
            let li = document.createElement('li')
            let titulo = document.createElement('p')
            let valor = document.createElement('p')
            titulo.innerText=element['titulo']
            valor.innerText=element['valor']

            li.appendChild(titulo)
            li.appendChild(valor)
            elemento.appendChild(li)
            console.log(_lista)
            
        });
    }
    mounted=false
    componentDidMount(){
        let button=document.getElementById('btn_grafico')
        button.style.visibility='visible'
        button.innerText='gerar grafico'
       
        let h1 = document.getElementById('titulo')
        h1.innerHTML='Voltar'
        h1.onclick=function(){
            let ProjectPage = document.getElementById('ProjectPage')
            ProjectPage.click()
        }

//       this.gera_elementos([{titulo:'abc',valor:'1'}, {titulo:'abc',valor:'2'} , {titulo:'abc',valor:'3'} ,{titulo:'abc',valor:'10'}, {titulo:'abc',valor:'10'}])
    }
    componentDidUpdate(){
       

    }
    
    render() {
        let Forças = this.props.Forças
        let Fraquezas = this.props.Fraquezas
        let Ameaças = this.props.Ameaças
        let Oportunidades = this.props.Oportunidades
        
      return (
      
      <div className="Main_div">
        
        <div className="Div_roleta">
            <div className="Roleta"> 
                <h1 id="Forçash1"> Forças</h1>
                <ul ref={this.lista_Forças}>
                    {Forças.map((li)=>{
                        if(li.titulo!==undefined){
                            return (<List_element  SwotDao={this.props.SwotDao}resetar={this.reseta_outroslis} areadetrabalho='Forças' titulo={li.titulo} valor={li.valor}></List_element>)

                        }
                    })}
                </ul>
                <div>
                    <button onClick={()=>{this.props.show('Forças')}}> 
                        criar
                    </button>
                </div>
            </div>
            <div className="Roleta"> 
                <h1 id="Fraquezash1"> Fraquezas</h1>
                <ul  ref={this.lista_Fraquezas}>
                {Fraquezas.map((li)=>{
                    if(li.titulo!==undefined){
                        return (<List_element   SwotDao={this.props.SwotDao}resetar={this.reseta_outroslis} titulo={li.titulo} valor={li.valor}></List_element>)
                    }
                    })}
                </ul>
                <div>
                    <button onClick={()=>{ this.props.show('Fraquezas')}}>
                        criar
                    </button>
                </div>
            </div>
            <div className="Roleta"> 
                <h1 id="Oportunidadesh1"> Oportunidades</h1>
                <ul  ref={this.lista_Oportunidades}>
                {Oportunidades.map((li)=>{
                    if(li.titulo!==undefined){
                        return (<List_element   SwotDao={this.props.SwotDao} resetar={this.reseta_outroslis} titulo={li.titulo} valor={li.valor}></List_element>)
                    }
                    })}
                </ul>
                <div>
                    <button onClick={()=>{this.props.show('Oportunidades')}}>
                        criar
                    </button>
                </div>
            </div>
            <div className="Roleta"> 
                <h1 id='Ameaçash1'> Ameaças</h1>
                <ul ref={this.lista_Ameaças}>
                {Ameaças.map((li)=>{
                    console.log(li.titulo)
                    if(li.titulo!==undefined){
                        return (<List_element  SwotDao={this.props.SwotDao}resetar={this.reseta_outroslis} titulo={li.titulo} valor={li.valor}></List_element>)
    }})}
                </ul>
                <div>
                    <button onClick={()=>{this.props.show('Ameaças')}} >
                        criar
                    </button>
                </div>
            </div>
           
        </div>
        

      </div>);
    }
  }

export default Main