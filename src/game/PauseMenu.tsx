import React from "react";
import { ReactEntity } from "../core/ReactEntity";
import Entity from "../core/entity/Entity";
import { KeyCode } from "../core/io/Keys";

export class PauseMenu extends ReactEntity implements Entity {
  constructor() {
    super(() => (
      <div style={{ position: "absolute", top: 0, left: 0 }}>
        <h1>Pause Menu</h1>
        <p>The game is paused</p>
      </div>
    ));
  }

  onKeyDown({ key }: { key: KeyCode }) {
    if (key === "Escape") {
      this.destroy();
    }
  }
}
