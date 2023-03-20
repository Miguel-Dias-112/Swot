import React from "react";
import './plotter.css'

class Plotter extends React.Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.canvas = React.createRef();
        this.click=this.click.bind(this)
        this.central_div = React.createRef();
        this.windowchange = this.windowchange.bind(this)
    }

    max =0 
     medias =0
    media ( ){
        let F = this.props.Forças
        let A = this.props.Ameaças
        let O = this.props.Oportunidades
        let Fr = this.props.Fraquezas

        function calc(list){
            console.log('list')
            console.log(list)
           if( list != undefined){ 
            
            let soma = 0
            list.forEach(el => {
                soma +=parseFloat( el['valor'])

            });
            console.log('list soma')
            console.log(soma)

            return soma/list.length}
            
            else{
                console.log('list undef')

                return 0
                
            }
        }

        let medias =[ calc(F),calc(O), calc(Fr), calc(A)]

         medias = medias.map((e)=>{
            if(isNaN(e)){
                return 0
            }else{
                return e
            }
        })
        
        
        console.log(medias)
        this.medias=medias
        return medias  
    }
    map(medias,max){
        let maior =0
        max-=20
        for (var i = 0; i < medias.length; i++) {
            if ( medias[i] > maior ) {
               maior = medias[i];
            }
         }
         
      //  maior     max
      //  ----  === -----
      //  m          map
    
        return medias.map((m) => {
            let map=(m*max)/maior   

            console.log('PLOTter-map:'+[m,max,maior,map])
            if (!isNaN(m)){
                return map
            }
            return 1
        });

    }
    desenho1(){
        let canvas= this.canvas.current
        let central_div= this.central_div.current
        let w= central_div.clientWidth 
        let h =central_div.clientHeight
        let pi = Math.PI/2
        let linew=5
        let radius=50
        let gap = 3
        let size = 50
        function background(params) {
            const ctx = canvas.getContext('2d');
            ctx.beginPath();

            ctx.fillStyle = "#FFFFFF";
            ctx.rect(0, 0, w, h);
            ctx.fill();
        }
        function circle(gap,radius){
            const ctx = canvas.getContext('2d');
            ctx.lineWidth=10
            ctx.beginPath();
            ctx.strokeStyle='orange'
            ctx.arc(w/2+gap,( h/2+gap)+size/2, radius, 0, pi);
            ctx.stroke();

            ctx.beginPath();
            ctx.strokeStyle='red'
            ctx.arc((w/2- gap), (h/2+gap)+size/2, radius, pi, 2*pi);
            ctx.stroke();

            ctx.beginPath();
            ctx.strokeStyle='green'
            ctx.arc(w/2-gap , (h/2-gap)+size/2, radius, 2*pi,3*pi);
            ctx.stroke();

            ctx.beginPath();
            ctx.strokeStyle='blue'
            ctx.arc(w/2+gap, (h/2-gap)+size/2, radius    , 3*pi,0);
            ctx.stroke();

        
        }

        function divisions(){
            const ctx = canvas.getContext('2d');
            ctx.strokeStyle='black'

            ctx.lineWidth=linew
            ctx.beginPath();
            ctx.moveTo(0, (h/2)+size/2);
            ctx.lineTo(w,(h/2)+size/2)
            ctx.stroke()

            ctx.beginPath();
            ctx.moveTo((w/2), 0);
            ctx.lineTo((w/2),h);
            ctx.stroke()

        }

        function textos(){
            var ctx = canvas.getContext("2d");
                ctx.font = "25px Arial";
                let font = 25
                ctx.fillStyle = "Black";
                ctx.textAlign = "center";
                let posx1 =(((w+size )/2 ) - w/4)+size/4
                let linew=3
                let posx2 =(w/2) + (size+10) + w/4- size-linew

                ctx.fillText("Fatores Internos", posx1 ,font -linew+size/4); 
                ctx.fillText("Fatores externos", posx2 ,font -linew+size/4); 
                let gap = 25
                

                let posy =(((h )/2 ) - h/4)
                ctx.fillText("R" ,font-linew/2,posy   ); 
                ctx.fillText("u" ,font-linew/2,posy +gap  ); 
                ctx.fillText("i" ,font-linew/2,posy  +gap*2  ); 
                ctx.fillText("n" ,font-linew/2,posy  +gap*3  ); 

                ctx.fillText("s" ,font-linew/2,posy+gap*4 ); 

                posy =( (h/2 ) + h/4)
                ctx.fillText("B" ,font-linew/2,posy   ); 
                ctx.fillText("o" ,font-linew/2,posy +gap  ); 
                ctx.fillText("n" ,font-linew/2,posy  +gap*2  ); 
                ctx.fillText("s" ,font-linew/2,posy+gap*3   ); 


                //ctx.textAlign="center"
                //ctx.fillText("Fraquezas",(w/2-30)-radius*2-linew, (h/2+gap)+(radius/2)+size/2); 
                //ctx.fillText('Forças',(w/2-30)-radius*2-linew , (h/2-gap)+size/2);
                //ctx.fillText('Oportunidades',(w/2+70)+radius*2+linew , (h/2-gap)+size/2);
                //ctx.fillText('Ameaças',(w/2+70)+radius*2+linew , (h/2+gap)+(radius/2)+size/2);

                

            
        }
        function categories(size){
            const ctx = canvas.getContext('2d');
            ctx.strokeStyle='black'

            ctx.lineWidth=linew
            ctx.beginPath();
            ctx.moveTo(size, 0);
            ctx.lineTo(size,h)
            ctx.stroke()

            ctx.beginPath();
            ctx.moveTo(0, size);
            ctx.lineTo(w,size)
            ctx.stroke()
            
            
        }

        function circles(size,radius){
            const ctx = canvas.getContext('2d');
            ctx.lineWidth=10


            let posy = (((h+size )/2 ) - h/4)+size/4
            let posx = ((w+size)/2 - w/4)
            
            ctx.beginPath();
            ctx.strokeStyle='green'
            ctx.arc(posx,posy, Math.abs(radius[0]-linew*2), 0, 4*pi);
            ctx.fillStyle = "green";
            ctx.fill(); 
            ctx.stroke();

            posx =(w/2) + (size+10) + w/4- size-linew
            ctx.lineWidth=10
            ctx.beginPath();
            ctx.strokeStyle='blue'
            ctx.arc(posx, posy, Math.abs(radius[1]-linew*2), 0, 4*pi);
            ctx.fillStyle = "blue";
            ctx.fill(); 
            
            ctx.stroke();
//////////////////////////////
            posy =( (h/2 ) + h/4)+size/4



            posx = ((w+size)/2 - w/4)
            ctx.lineWidth=10
            ctx.beginPath();
            ctx.strokeStyle='red'
            ctx.arc(posx, posy, Math.abs(radius[2]-linew*2), 0, 4*pi);
            ctx.fillStyle = "red";
            ctx.fill(); 
            ctx.stroke();
            

            posx =(w/2) + (size+10) + w/4- size-linew
            ctx.lineWidth=10
            ctx.beginPath();
            ctx.strokeStyle='orange   '
            ctx.fillStyle = "orange";
            

            ctx.arc(posx, posy, Math.abs(radius[3]-linew*2), 0, 4*pi);
            ctx.fill(); 
            ctx.stroke();
        }
        this.max = (h-(size+linew))/4
        let tam_mapeados = this.map(this.media(),this.max)

//gambiarra foda pegou os valores da func calc e pos me nivel global por preguiça de arrumar
       
        console.log(tam_mapeados)
        background()
        categories(size)
        circles(size,tam_mapeados)
        circle(10,50)
        textos()
        divisions()

        if(this.medias[0]+this.medias[1]>this.medias[2]+this.medias[3]){
            window.alert('situação vantajosa. Observe no infografico abaixo como os fatores ruins estão em proporção aos bons')
        }
        if(this.medias[0]+this.medias[1]<this.medias[2]+this.medias[3]){
            window.alert('situação ruim. Observe no infografico abaixo como os fatores ruins estão em proporção aos bons')

        }


        console.log('s')
    }
    componentDidMount(){
        
        window.onresize=this.windowchange
        let central_div= this.central_div.current
        let canvas= this.canvas.current

        let w= central_div.clientWidth 
        let h =central_div.clientHeight
        canvas.width=w
        canvas.height=h
       
        let F = this.props.Forças
        let A = this.props.Ameaças
        let O = this.props.Oportunidades
        let Fr = this.props.Fraquezas
        console.log([F,A,O,Fr])
        this.desenho1()
    }
    componentDidUpdate(){

        this.desenho1()
       
    }

    windowchange(){
        let central_div= this.central_div.current
        let canvas= this.canvas.current

        let w= central_div.clientWidth 
        let h =central_div.clientHeight
        canvas.width=w
        canvas.height=h
        console.log('mudei de tamanho')
        this.desenho1()


    }
    click(){
        let canvas= this.canvas.current

        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imgData;
        link.download = "AnaliseSwot.png";
        link.click();
    }
    render() {
      return (
      
      <div  className="Plotter_div">
        
        <div ref={this.central_div} className="Div_central">
            <canvas ref={ this.canvas}>

            </canvas>
            <button onClick={this.click} className="download_btn"    id = 'download_btn' style={{position:'absolute',}}>
                Baixar como pdf
            </button>
        </div>
        

      </div>);
    }
  }

export default Plotter