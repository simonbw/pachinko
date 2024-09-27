import React from "react";
import { ReactEntity } from "../core/ReactEntity";

export class MainMenu extends ReactEntity {
  constructor() {
    super(() => (
      <div className="menu-screen">
        <div className="max-w-2xl mx-auto flex flex-col gap-4">
          <h1>Pachinko Roguelike</h1>
          <button
            onClick={() => {
              this.game!.dispatch("gameStart", undefined);
              this.destroy();
            }}
          >
            Start Game
          </button>
        </div>
      </div>
    ));
  }
}
