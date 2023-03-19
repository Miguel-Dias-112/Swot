import React from "react";
import './main.css'
import List_element from "./List_element";
class Main extends React.Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.lista_Forças = React.createRef();
        this.lista_Ameaças = React.createRef();

        this.lista_Fraquezas = React.createRef();
        this.lista_Oportunidades = React.createRef();

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
                        return (<List_element  SwotDao={this.props.SwotDao} lista={this.lista_Forças} areadetrabalho='Forças' titulo={li.titulo} valor={li.valor}></List_element>)
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
                        return (<List_element   SwotDao={this.props.SwotDao} titulo={li.titulo} valor={li.valor}></List_element>)
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
                        return (<List_element   SwotDao={this.props.SwotDao} titulo={li.titulo} valor={li.valor}></List_element>)
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
                        return (<List_element  SwotDao={this.props.SwotDao} titulo={li.titulo} valor={li.valor}></List_element>)
                    })}
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