import React from "react";
import { ReactEntity } from "../../core/ReactEntity";
import Entity from "../../core/entity/Entity";
import { grouped } from "../../core/util/ObjectUtils";
import { Balls } from "../BallData";
import { GameManager } from "../GameManager";

export class ShopScreen extends ReactEntity implements Entity {
  constructor(gameManager: GameManager) {
    super(() => (
      <div className="absolute inset-8">
        <div className="max-w-2xl mx-auto flex flex-col gap-4">
          <h1>Shop</h1>

          <section className="flex gap-1">
            {grouped(gameManager.ballDatas, (group) => group.name).map(
              ([name, ballDatas]) => (
                <div className="rounded bg-slate-300 inline-block px-1">
                  {name}x{ballDatas.length}
                </div>
              )
            )}
          </section>
          <section className="flex gap-1">
            <button
              onClick={() => {
                this.game?.dispatch("ballPurchased", { ballData: Balls.basic });
              }}
            >
              Buy Basic Ball
            </button>
            <button
              onClick={() => {
                this.game?.dispatch("ballPurchased", { ballData: Balls.big });
              }}
            >
              Buy Big Ball
            </button>
          </section>

          <section className="flex justify-end">
            <button onClick={() => this.end()}>Done</button>
          </section>
        </div>
      </div>
    ));
  }

  end() {
    this.game?.dispatch("shopScreenEnd", undefined);
    this.destroy();
  }
}
