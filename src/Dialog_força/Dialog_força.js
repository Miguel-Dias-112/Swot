import React from "react";
import './Dialog.css'
class Dialog_força extends React.Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
          elemento_trabalhado:''
        };

        this.OnClickHandler=this.OnClickHandler.bind(this)
        this.Show=this.Show.bind(this)
        this.Fechar=this.Fechar.bind(this)

    }
    Show(elemento){
      let Dialog_div = document.getElementById('barrer')
      let orientação = window.screen.orientation.type
      let tamanhotela = window.screen.width
    console.log(tamanhotela)
      console.log(orientação)

      Dialog_div.style.visibility='visible'
      this.setState({elemento_trabalhado:elemento})
      
        if(orientação =='landscape-primary' && tamanhotela<800){
          window.alert('por favor rotacione seu dispositivo')
        }
      
 
    }
    Fechar(){
      let Dialog_div = document.getElementById('barrer')
      Dialog_div.style.visibility='hidden'
      let text_input = document.getElementById('text_ipt')
      text_input.value=''
      this.setState({elemento_trabalhado:''})

    }
    componentDidMount(){

        
        let canvas = document.getElementById('canvas')
        let ctx= canvas.getContext('2d')
        ctx.beginPath()
        ctx.arc(330/2, 204/2, 5*10, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath()
        let i =  document.getElementById('range_ipt')

        i.addEventListener('input', function () {
          let value = i.value
          ctx.beginPath()

          ctx.clearRect(1, 1, 330, 240);
          ctx.arc(330/2, 204/2, value* 10, 0, 2 * Math.PI);

          ctx.textAlign='center'
          ctx.fillText(value*10+'%' ,330/2,204/2 ); 

          ctx.stroke();
          ctx.closePath()
          
        }, false);
        this.props.setshow(this.Show)
    }
    OnClickHandler(){
      let SwotDao = this.props.SwotDao
      let elemento=this.state.elemento_trabalhado
      let text_input = document.getElementById('text_ipt')
      let range_input = document.getElementById('range_ipt')

      console.log(range_input)
      let valor_texto = text_input.value
      let valor_força = range_input.value

      if(valor_texto!=null && valor_texto!=''){
        SwotDao.adicionar(elemento,valor_texto,valor_força)
        this.Fechar()
      }else{
        window.alert('valores incorretos')
      }


    }

    render() {
      
      return (
      <div id='barrer' className="white_barrer">
        <div id="Dialog_div" className="Dialog_div">
              <h1> selecione a % do valor do novo elemento</h1>
              <input  id='range_ipt' className = 'range_input' min={1} max={10}   step={0.5} type={'range'}></input>
              <canvas width='330px' height='204px' id="canvas"></canvas>
                <h1> selecione a nome do seu elemento</h1>
              <input id = 'text_ipt' className="text_input"></input>
              <div>
                <button onClick={this.OnClickHandler}>
                  OK
                </button>
                <button onClick={this.Fechar}>
                  Cancelar
                </button>
              </div>

            </div>
      </div>
   );
    }
  }

export default Dialog_força