

import React, { createRef } from "react";
import './landpage.css'
import {CreateUser, deslogar, LoginEmail, LoginUser} from './FIrebase.js'
import back from './costume2.svg'

class LandPage extends React.Component{
  constructor(props){
    super (props)
    this.modo = createRef()
    this.Confirmar = this.Confirmar.bind(this)
    this.EntrarModoRegistro = this.EntrarModoRegistro.bind(this)

    this.botaoConfirmar = createRef()
    this.email = createRef()
    this.senha = createRef()

    this.state={
        modo:'logar'
    }
  }
  Confirmar(e){
    let button = e.currentTarget
    let buttontext=button.innerText

    let email = this.email.current.value
    let senha = this.senha.current.value
    console.log(buttontext)
    switch (buttontext) {
        case 'entrar':
            console.log(email)

        LoginUser(email,senha)
            break;
        case 'confirmar':
            let modo = this.modo.current
            let botãoCancelar = e.currentTarget
            let texto = e.currentTarget.innerText
        
            let botão = this.botaoConfirmar.current
            CreateUser(email,senha)
            botãoCancelar.onClick=this.EntrarModoRegistro
            botãoCancelar.innerText='registrar'
            botão.innerText='entrar'
            modo.innerText='login'
            this.setState({modo:'logar'})        
            break
        default:
            break;
    }
  }

  EntrarModoRegistro(e){
    let modo = this.modo.current
    let botãoCancelar = e.currentTarget
    let texto = e.currentTarget.innerText

    let botão = this.botaoConfirmar.current
    if(texto=='registrar'){
        botãoCancelar.innerText='cancelar'
        botãoCancelar.onclick=this.EntrarModoLogin
        console.log(botãoCancelar.onclick)
        botão.innerText='confirmar'
        modo.innerText='registrar'
        this.setState({modo:'registrar'})
    }
    if(texto=='cancelar'){
        botãoCancelar.onClick=this.EntrarModoRegistro
        botãoCancelar.innerText='registrar'
        botão.innerText='entrar'
        modo.innerText='login'
        this.setState({modo:'logar'})
    }
   
  }
  componentDidMount(){
        let btn_grafico = document.getElementById('btn_grafico')
        btn_grafico.style.visibility='hidden'
        console.log('land page montada')
        deslogar()

  }
  render(){
    
    console.log(this.props)

    return(
    
    
    <div className="landpageMain">
       
        <div className="video_tutorial">
            <h1>o que é Analise Swot?</h1>

            <iframe width="1273" height="716" src="https://www.youtube.com/embed/0zTVlUCKBgI" title="O que é Análise SWOT?" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            <p>
            Análise SWOT ou Análise FOFA é uma técnica de planejamento estratégico
             utilizada para auxiliar pessoas ou organizações a identificar forças,
              fraquezas, oportunidades, e ameaças relacionadas à competição em negócios
               ou planejamento de projetos. Este App gratuito destina-se a automatiar da criação de tabelas swots, com display intuitivo e graficos autogerados

            </p>
        </div>
       <div>
        
       </div>
        <div className="login">
            <h1 ref={this.modo}>{this.state.modo}</h1>

            <div className='loginLogin'>
                <div className="loginInputs">
                    <input ref={this.email} type='email' placeholder="email"></input>
                    <input ref={this.senha} type='password' placeholder="senha"></input>
                </div>
                <div className="loginButtons">
                    
                    <button ref={this.botaoConfirmar} onClick={this.Confirmar}>
                        entrar
                    </button>
                    <button onClick={this.EntrarModoRegistro}>
                        registrar
                    </button>

                </div>
            </div>
            
            <div className="loginCustomButtons">
                <button onClick={LoginEmail}>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIcAAACHCAMAAAALObo4AAABF1BMVEX////qQzU0qFNChfT7vAU8gvR5pPJGh/Tg6f0wffSwx/r7ugD/vQDqQTP7uAD7tQDpOCf+9/bpMR4lpEnoJw7ympTqPS7ub2b97+7sYVcAnjbb7d/1+vZXs24UoUDP59T4ysjoIQDrSj385uXwhX7+79H7vzDp9OuRyp762tjrUkbxjoj0rKftaF/3vbr+9ODpODf81of95LT8yFT8znH/+e/+6sZrnPOf0aq73cJHrmHud2/yfQD3oSHtYDDxfjD0kiv94afvcDTD1fiKsPIZdPTi7fazy/Scu/PluRdorEbQuCifsz4AplmAwo9akvONsEGcrB4+jtQ6lLk6nZY8kMc6mqJIq3g1pWQ4oIU/ieI3onkOgMqYMXFiAAAGbElEQVR4nO2Z/1vaRhzHQwgVCtFwgYgBAiFYBFHbaluI27rN6my74bZ2W+f2//8du4OA5L7kLpcQ+uzx/UMff9Djxef9+XZXRXnUo/738obDLtLQ87by+Y3haf0yV3PdWq0GAID/wh97l/XusJohQ/1kZAHD0nNh6ZYB9NH+eNjIgGLc77kQAWdYsegWcEfH3Y0yVE9PXECEgQJj1Wr9jaF49RGwuAxLGeBgvAl/vGMA+JFYlwX0etpZO9x3jXgUSLrh1tOMide3jNgQC4HeOLWYjA2JWKxiAkbDVCi6vZh5QZC4l8nNqdYN8Rphych1E2J4JwmDEYSkdpwIo+smD8ZCIJdgENZTCcZClnUqi7EPUqPIocKpS1E0RrI9gyFjJIPhHaSNsS/T0Bp6Whm6xDiQwfByqWNIUEBT0saQMkVJPUWlTFH2U8eQoVCOU+0b0qacxsLQF4rCkDPFc0UJ4DXBBb3RwcFo1IM/kReJAEOGQqmKlYoOjNFJ/XToNRrVarXR8ODF6qQHyIVJ0hQ420Qi4ebqXXK5aXT7tVr4a0iaonT5GDqw+uxVr3u5HhRJUxSlx3XFyNWjV4nhw1Yta4oy5oXDco/5Cw28ZehJTFE8zmKugwOxlbfbMxKYovSjG6lujEVPavSBtCnKMPoObYA4O+Z4JH2BOokMB5D+fjF1+E0kRj+rp54L7dvnTGPAZUYUytmupmnfPWdFIysM5QXi0N5SQaysckNRXj0rIw6qN3otu2fAl/NwQO0R3uhGOk8HQjova0vh3kjexOS0pz3o+xCIJd2fJfTD7hpH2Bs3yzfri7IW0o8rECPZ20U8LauF9EbXswzH4Z6Gay+nZ56kQRPDQJA3upXp/2ic47YsvbGya+gKSg8aBmyuPTfDFgbTgxqOuTdZYjw0dVzlF/w/vnoiqyJ+FC1N59p9zed4WirIqfQTfhQ9TaGevRLhyMup9A4/SmNwlM/5GPIchTv8KLKLBbYIpIc8R74kzPFyoxzXrfBJZyyOvbPNctyET6JMlyAem+UoXQlyaALlkoQDK9zXDI6ySNkm4bjFOBhtbNMcha+VY0u+fK0cW6uXp+GTmH1s0/0Dq1t2Pz3MlGNb8wXvp9uat9f4QkbcopYFs9H9g5i3W9rH8tf4Ucz9tCy0n8py5PGjWI1dKEHk98I3+FGs+0vl/QcBjsIORwwOck8mr/sLjI+q0+Ry3BQ5YgWMvDdQE7VS+fkX1ZzxA8LTuwLDF7x9UBMVeqIiDRJz3DE4dm6IXyUnXeX9nEJ1Jkkxioz8IK8vlAs/8iRQ0oCw0qNApKmCv49VtA9LiuQZwnCFnC5IofdC6MkqGqpqJwtI8ZrFQaaHsj7qKmuezNVOxPGGVS1EF5trVbkV7dcwhmomSdUrVrfFl8JAy6cYWK4YBgThNzOmWEVLDv2FgpZa+UhQoOLFB7SwbtnDh/EXqJWRngQBaUuCFJkY+F1upbNdVK5UDBgQyeJlupIv0G2BuoBjjSlTqmgiMOjVgnT4GxsDtbP41rBKNs9oYoHaZhSIEztHnkQsSJTZslIzkkM1BXaRNd3cRWBQVo81zaJBYjW0Yp5tCuWFLqQBhwNmq+Csad2ypsoCg1W0gSYOB0S1ZwLmtKa2+nvU9hyVHXOpvIjAXzjixKQ19eEp5qcC05jo7EDqcDkQyazDPmFw5C+C6nwuxZu0IR1xnUEkNkShRKXVmfj26puY6j3dG8aECx/VFuBAH2L67aNpczBoIQ0Gg8501vbNUDhN9Q8aCC9Jg7jaYiDocxzbMX2/7fswQo5DsdT585rwhrYe0zQVcUZUzl9ENysJuDLXkUCuCsv8ghUw/iYWoeg5E1fOp3WQkkCtrOSnCmL/vbNKEtHkWGiQLoj55X4JsiOaHAtxJm98BQUs0jnCETHTJbE/oy4ftfywIpKuNarzz32J8s4gEBH+yIsl0/9XBkNJu3xNNWI4Rkto5oli+AnuhFPxWcNR/CU7pEE7nZAkuqkjtdIYNglS40EdNWlIbIkbGE0T2mYhLCdJgobVnEl3V1OdpBOMgKRty5CY9iz56ytGMovtjmPybhhSgheCGPaYjj/ZBAVSa9q2haICF+jZdEMQgaYz1Y4Oi2n7m4aYC16W4EXFocCYpqP67UknzQrhsUyPZr4N5SwEfzL9GbpYZcYQ4mk2O0jNZnYxeNSjtqb/AJS50JD8XhV4AAAAAElFTkSuQmCC"></img>
                </button>
               
            </div>
        </div>
    </div>


    )
  
  


  }
  
}

export  default  LandPage;
