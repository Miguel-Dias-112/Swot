

import React, { createRef } from "react";
import './landpage.css'
import {LoginEmail, LoginUser} from './FIrebase.js'
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
    let senha = this.senha  .current.value
    console.log(buttontext)
    switch (buttontext) {
        case 'entrar':
            console.log(email)

        LoginUser(email,senha)
            break;
    
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
                    <img src="data:image/png;base64,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"></img>
                </button>
                <button>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAB7CAMAAABq8q83AAAAbFBMVEU5UZb///+utc/w8fY3T5UnRZAEM4kkQo+zudHm6O8zTZQuSZIxS5NEWZobPY0rR5Hd4Oq4vtRrequkrMnHy92BjbZRZJ/P0+Jeb6XAxdmHkrk+VZj4+PsQN4vY2+cWOoycpcWPmr52hLEAHIJBU1hCAAAE/UlEQVRoge2b63arKhSFiYGiaDTRaExjYvS8/zsebXNTESZCdvcYu3P0b/Mhl7UmsCCrnxX55f/yzRXsd9c8LUjCOSNFml/9ffCH+OtDlp5owlkoBCW0/4tCxpkg5fVg3AhDfuCnG84iQslElEQs3pTZtnoXv/JSxiMJ+qURgsdltn4Hf5vHXKjYdwlWtwfX/H1Rhwj8W1FMji75h7IbcyMJVkAtQPjblhvSv1rAy4sTfsMNev5VUf2pXQta/uXEltF7JZFuEHT8plauN63iVN0Fan5QWHz8rQtO28X8fbRg3o0lmL+Q78V2fX8TjZtF/KZ2Qe/F0wX8lrvCE8KKuVk4y2+tZ96rknImJ83xc4df34vNrMMZfhO7xc/OATn/6hzf9UAL8z3Hnf8t3oD8iwVeFTHqPcSvCGRzbkq63Hx6StmAaGpPJfw2geERF83xEjy1zlTLNioni2DK38Fhj8blxOf5yrHjVy0/oGjQp8lu2nlqPmHjBk/4KWp2aChLrBq+2Gj4R3TuUyZ1dxo+4ZmaL9DeZ6MfAvkkHiaCEV85fV8lCilezw9zBb/i6OfHM8ZSyyfxYNoM+Vf082kxk0/1/HCQBwb8NUjvIsmwF034w3Uz4ON5h895Sj2fsM8ZflXAfrMerf3quPvWpz58ULGW8/d41v8YDv8lYjchhp17cn6Ku/3RKoaD5pfoScrHI383hkN+YrZRiC8yvm/geO34SSPjFwa2w47/MgBPfnU2+AU7Pjlvp3w089FOYz6jD2HNz6b8Bk78nSbf/6BDDYjaKR8b/iT7NnoD/OppAHfQJKab9ZhffSD/OB94zUbxMQEe/AMW/HR80EA8QiAx/UcNv8HM+8OFPPg5Fnx1/BabxaIc81Ms+uj4JfYZD/9y56/B3KvjY+uPkFMw4oPGV8dH/XNyGfIDcNel4a/V1wNPxYchfwtGfw0/CFH+ccg/uPn+C7p3vv/Ogw96Lw1/j3qIewC6848oX7LnfREW/skzA5ryo9z3OmWDg4SLd5PfohZyKZ+EvNd/g/zrffCbYB865qPjf9PQf3vmZ6Xj8UfnvzP+aP6j698Vf7z+0fjnjD+Kf2j8d8Ufx380/7nij/Mfmv8d8Sf5H/U/jvhT/wOfPDnhT/2fWQCy5U/9L+j/HfGn/t9o+2vLl+x/VsDJjTO+bP8Hn/w64Mv2v0b7f0u+bP9vNAHs+NLzD6PzHzu+/PwnMEhBdnz5+ZfJ+Z8Vf+b8b/n5pyGfzZx/Gpz/2vBnz39XGRwCbPjJ69n9wvN/C77i/B+//7DgK+4/VhVacWLBV93/wB2wnK+8/4LPL5bz1fd/aBZczNfdf4JXGUv52vtfMAss5evvv1c+shNbyJ+WgCysfzgH66eqDDz1geofoPoPunnVCYwaWP0HVv9CX4Xha8md9d9Y//Pj9U/vqP9iJvVf76h/kxcM/K31f10gdtgDiXn9o8s5sKj+s69/dUJfWv/aGfLEQf0vfbXbZnwX9c8hUVbB6+q/P3+0/rvTwar+namvC95b/y/qXPsSBXr/kGIPT0Z0Pq1OXMbvX58wwxYItnH2/qPXsagN1mIUE93AG/I7V5LX2DBQdnb//qdX5aWca+yxYO96//SlwFO8/+rYp3e+/7o14XAtiUh4Eka3vhAiTPpGlY35I7yF7/+2e/+al4WI63Mcbsr26u+Vz0xc853pl/9v8/8HrzdPBMOaPKgAAAAASUVORK5CYII="></img>
                </button>
                <button>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHoAAAB6CAMAAABHh7fWAAAAYFBMVEX///8AAAAUFBTo6OioqKiPj483NzfIyMiUlJR0dHSxsbH8/Pzy8vLX19fOzs5ubm59fX1ZWVmcnJzi4uIeHh67u7tnZ2cODg5BQUFGRkZfX19TU1OFhYUoKCiioqIxMTF1GqhUAAAEz0lEQVRoge2b28KqIBCFIbOTaJaaZn/1/m+5SxlE4jBQ1r5w3ZXKp9M4J40QWemZTqhzSoxKpgQ/lRjR2dTozIheT41eO9CLSYRB31k0gdgdgV4ZN7+l1Yye0TN6Rs/oGf1rdBHHxW/Q0SP9L6KfoG/PvW8/QW+ee29m9Iye0TP6/0PvpkbvTFuXz630Og362i2+1G5L/rqNtqtm1U7S6bn3Sf6mYuZjV/3qf5rBAjtRF7qoqUO1OX9zND29nF4EmyzorYtM6daJpislxUtTFDN670bv3WhlorKUjjajEaMW890joWVn4+Q6tqNJlm8lNc+9G/mb3Dwh6tFxrbBTfrlp5kCPdXzufcTu3aGzlF88DO/a7tMl+kY0iy4drO2/LPprZt8JpP0oifZ3IfeepvgGumhkf9yB4+3SqdHpwOq+HO6sy9Toi3J/yTf1xGj6n6Hz7bfQ21xBb/oW6qHSkvnC0azky9/64yR0/AhqsNUciIPREP7LRxiLX9EkgZQdfxod84XbhOjRRBj9gGmb0TE8Oghji/N4QZOsD3P0ijB6F4AsD3FA674so3e+pgFNIjA6wpK7pjGWmIM2YGywpAk97HrBerpV7PJyKWa0KJZqS+LHKoNKUlrLgtadaaC0FrShh0MObxmdHbSXYEeTdYn3dJPAs0tlDQdavRcDBFnposYIF5oQ3gfRfZDRGRTtr52OG00qfvAVETZUpdzYtHrdhkATBk+zvY0OAfmsC8gYNEkg7J/MD551h4k0pD0MhX4YvfY3Ohi71hjbA00iXrwamnKNwLMbU/bDokmS86W2KE9nsHtu/I3Q6KFOXyHm7gWUYJaU5oFGrTc+y7vtLH3QhIAV91ZPTyCM5NbF/NDichqLp6fgkQ7jeKLFurVx3V3tPrsgNGHQI+hdN8GHfG+0/Yb1uf0D0CRd8PW7BFzc8v0+v3W+DBX+AhP0QtAw+nhmwmqYg1XC2C1qkTC0MDpcfydomJCxNhBNUqVZHbTCFrCh6KH8UIQvZoLRJAL7no9VdQTPxj/cDEevoajndaZwbnTtGoqGumWo0EW17bWEN1r0JaPe9si/RHZpQWjoxkrFmTP4+VFOHoKGq2tfro5BrMF0+v5oZh13iNrVbXRvdMbrzIWhzqx4gLs6je6LBmNri/pOETQMLqP7oRN9u6pItMb2hsELLTooR9iA8GJvGHzQkK7MxgYJo9uSGB4tKiPdgzlVInVbGgY0WmRJg2ergtZ4ZTQ6Fu3TevRyNgw4dALGNj8w1EgcpP+FUGhfY4PsRsegoag/49+v4iq4p2sbBjdadLd5wBzH1us60f49/VjmhsGFhp+r9DY2qIAkrjqKAw2RwW9+M5aY5vx5oN81NkhvdBsajH0PmNWNld41RjejxbAsbEI5lmgYpBGaER1BmRU8lx0LBofi+YMRDdNodZIcrpcVDejPzODHUifyWjTDlleeEoUdM6Ghwl984HnLWBn045ke7dm/eEnumFT0xl7hv6+hR1Cf5LY8gJWeqRmvint60w5o8eoCxRSd4Yrkv8j1iVx6tWgiY4PigdTf5MNrZLtJ/k8l/bNKGBheTIPQSa/T/ItsEHQxYsKW0q9L5MSle9/PSkpNlXvvT2p0AyfLtnQf8gmV7ZKn7n9Vzz2QOYkI5AAAAABJRU5ErkJggg=="></img>
                </button>
            </div>
        </div>
    </div>


    )
  
  


  }
  
}

export  default  LandPage;
