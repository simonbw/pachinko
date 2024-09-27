import { TextureStyle } from "pixi.js";
import Game from "../core/Game";
import FPSMeter from "../core/util/FPSMeter";
import { GamePreloader } from "./GamePreloader";
import Wall from "./level/Wall";
import { Ball } from "./Ball";
import { V } from "../core/Vector";
import { ContactMaterials } from "./config/CollisionMaterials";
import { Peg } from "./level/Peg";
import { rNormal } from "../core/util/Random";
import { MainMenu } from "./MainMenu";
import { GameManager } from "./GameManager";

// Do this so we can access the game from the console
declare global {
  interface Window {
    DEBUG: { game?: Game };
  }
}

async function main() {
  // Make the pixel art crisp
  TextureStyle.defaultOptions.scaleMode = "linear";

  const game = new Game({ ticksPerSecond: 300 });
  await game.init({ rendererOptions: { backgroundColor: 0x444454 } });
  // Make the game accessible from the console
  window.DEBUG = { game };

  for (const contactMaterial of ContactMaterials) {
    game.world.addContactMaterial(contactMaterial);
  }

  const preloader = game.addEntity(GamePreloader);
  await preloader.waitTillLoaded();
  preloader.destroy();

  if (process.env.NODE_ENV === "development") {
    game.addEntity(new FPSMeter());
  }

  game.addEntity(new GameManager());
  game.addEntity(new MainMenu());
}

window.addEventListener("load", main);
