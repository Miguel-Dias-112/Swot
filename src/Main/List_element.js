

import React from "react";


class List_element extends React.Component{
  constructor(props){
    super (props)

    this.state={}
  }
  componentDidMount(){


  }
  render(){
    
    console.log(this.props)

  return (
  
    <li onClick={(li)=>{
      let outroli = this.props.lista.current.childNodes
   

      let firstclick = true
      if(li.currentTarget.style.background=='red'){
          firstclick = false
      }
      console.log(firstclick)
      console.log(li.currentTarget.style.background)
      
      function reseta_outroslis(){
        console.log('outroli')

        outroli.forEach(outroli => {
         

          if(outroli==li.currentTarget){
            outroli.style.background='red'
            outroli.style.color='white'
            outroli.style.borderRadius='15px'
          }
          else{
            outroli.style.background='white'
            outroli.style.color='black'
            outroli.style.borderRadius='0px'
          }
        });
      }

      switch (firstclick) {
        
        case true:
          console.log('resetando')
          reseta_outroslis()
          break;
        case false:
          if( window.confirm("Você quer excluir o elemento")){
            this.props.SwotDao.remover(this.props.areadetrabalho,this.props.titulo,this.props.valor)

          }
          this.firstclick=false
        default:
          break;
      }
    }} >

      <p>{this.props.titulo}</p>
      <p>{this.props.valor}</p>

    </li>

  );

  }
  
}

export  default  List_element;
