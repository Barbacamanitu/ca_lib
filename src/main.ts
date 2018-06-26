import { HAL } from "./hal";

window.addEventListener("load",(e) => {
    console.log("Loaded");
    let hal = new HAL({x: 10, y: 10});
});