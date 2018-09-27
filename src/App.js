import React, { Component } from 'react';
import dino from './dino.png';
import bunny from './bunny.png';
import { Sprite, Container } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

const centerAnchor = new PIXI.Point(0.5, 0.5);

const getRandom = (result,[min, max])=> {
  const random = Math.random() * (max - min) + min;
  if(result.includes(random)){
    return getRandom(result, [min, max]);
  }
  return random;
};

const generateArr = ({ size = 12, floated = false, range = [0, 21]}) => {
  const result = [];
  if (!floated) {
  for (let i = 0; i <= size; i++) {
      result.push(i);
  }
  } else {
    for (let i = 0; i <= size; i++) {
      result.push( getRandom(result,range) );
    }
  }
  return result;
};

const positions = generateArr({size:100, floated:true, range:[1, 100]}).map(i=>{
  return {down:true, back:false ,y:i* 100,x: i* 100};
});

const update = obj => {
  let down = obj.down;
  let back = obj.back;
  if (obj.y < 100) {
    down = true;
  }
  if (obj.y > 500) {
    down = false;
  }
  if (obj.x > 1400) {
    back = true;
  }
  if (obj.x < 100) {
    back = false;
  }
  return {
    x: obj.back ? obj.x - 5 : obj.x + 5,
    y: obj.down ? obj.y + 3 : obj.y - 5,
    down,
    back
  };
};

export default class App extends Component {
  constructor(props){
    super(props);
      this.state = {
          positions,
      };
  }
  componentDidMount(){
    const animate = () => {
        this.setState(state => ({positions:state.positions.map(update)}) );
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }
  render() {
    return this.state.positions.map(({x,y}, id)=>
                  <Container key={id}>
                      <Sprite anchor={centerAnchor} texture={PIXI.Texture.fromImage(bunny)} x={x} y={y} scale={{x:.5,y:.5}}/>
                      <Sprite anchor={centerAnchor} texture={PIXI.Texture.fromImage(dino)} x={x} y={y} scale={{x:.1,y:.1}}/>
                  </Container>
            );
  }
}