

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
   

      let firstclick = true
      if(li.currentTarget.style.background=='red'){
          firstclick = false
      }
      console.log('minha cor')
      console.log(li.currentTarget.style.background)
    
      switch (firstclick) {
        
        case true:
          console.log('resetando')
          this.props.resetar(li)
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
