import React from 'react';
import { render } from "react-pixi-fiber";
import * as PIXI from "pixi.js";
import App from './App';
import registerServiceWorker from './registerServiceWorker';


const canvasElement = document.getElementById("root");

const app = new PIXI.Application(canvasElement.getAttribute('width'), canvasElement.getAttribute('height'), {
    backgroundColor: 0x000000,
    view: canvasElement
});

render(<App />, app.stage);
registerServiceWorker();
