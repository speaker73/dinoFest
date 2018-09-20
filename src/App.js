import React, { Component } from 'react';
import dino from './dino.png';
import bunny from "./bunny.png";
import { Sprite, Container } from "react-pixi-fiber";
import * as PIXI from "pixi.js";

const centerAnchor = new PIXI.Point(0.5, 0.5);


class App extends Component {
  constructor(props){
    super(props);
      this.state = {
          positions: [
              {
                  x: 0,
                  y: 0,
                  down: true,
                  back: false
              }
          ]
      }
  }
  componentDidMount(){
    this.setState((state)=> {
      return {positions:[1,2,3,5].map(i=>{
              return {...state.positions[0],y:i* 100,x: i* 100};
          })
      }
    }, ()=>{
        setInterval(()=>{
            console.error(this.state);
            this.setState((state, props) => {
                const positions = [];
                state.positions.forEach((obj, id)=>{
                    let down = obj.down;
                    let back = obj.back;
                    if(obj.y < -100){
                        down = true;
                    }
                    if(obj.y > 500){
                        down = false;
                    }
                    if(obj.x > 1500){
                        back = true;
                    }
                    if(obj.x < 0){
                        back = false;
                    }
                    positions.push({x:obj.back?obj.x-2:obj.x + 2, y:obj.down?obj.y +10:obj.y -10, down, back})
                });

                return {positions};
            });
        },16)
    });

  }
  render() {
    return (
        <Container>
            {
              this.state.positions.map(({x,y}, id)=>{
                  return <Container key={id}>
                      <Sprite anchor={centerAnchor} texture={PIXI.Texture.fromImage(bunny)} x={x} y={y} scale={{x:3,y:3}}/>
                      <Sprite anchor={centerAnchor} texture={PIXI.Texture.fromImage(dino)} x={x} y={y} scale={{x:1,y:1}}/>
                  </Container>
              })
            }
        </Container>
    );
  }
}

export default App;
