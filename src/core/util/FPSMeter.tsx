import { Container, Text } from "pixi.js";
import React from "react";
import { LayerName } from "../../config/layers";
import Entity, { GameEventMap } from "../entity/Entity";
import { GameSprite } from "../entity/GameSprite";
import SpatialHashingBroadphase from "../physics/SpatialHashingBroadphase";
import { ReactEntity } from "../ReactEntity";

const SMOOTHING = 0.95;
export default class FPSMeter extends ReactEntity implements Entity {
  persistenceLevel = 100;
  averageDuration: number = 0;
  slowFrameCount: number = 0;
  lastUpdate = performance.now();

  visible = false;

  constructor(layerName?: LayerName) {
    super(() => {
      const {
        fps,
        fps2,
        bodyCount,
        hugeBodyCount,
        kinematicBodyCount,
        particleBodyCount,
        dynamicBodyCount,
        collisions,
        entityCount,
        spriteCount,
      } = this.getStats();

      return (
        <div
          className="absolute top-0 left-0 z-1000"
          style={{ opacity: this.visible ? 1 : 0 }}
        >
          <ul className="text-white text-xs font-mono flex gap-4">
            <li>
              fps: {fps} ({fps2})
            </li>
            <li>
              bodies: {bodyCount} ({kinematicBodyCount}, {particleBodyCount},{" "}
              {dynamicBodyCount}, {hugeBodyCount})
            </li>
            <li>collisions: {collisions}</li>
            <li>entities: {entityCount}</li>
            <li>sprites: {spriteCount}</li>
          </ul>
        </div>
      );
    });
  }

  onAdd() {
    super.onAdd();
    this.averageDuration = 1 / 60;
  }

  onRender() {
    const now = performance.now();
    const duration = now - this.lastUpdate;
    this.averageDuration =
      SMOOTHING * this.averageDuration + (1.0 - SMOOTHING) * duration;
    this.lastUpdate = now;

    super.onRender();
  }

  getStats() {
    const world = this.game?.world;
    const broadphase = this.game?.world.broadphase as SpatialHashingBroadphase;
    return {
      fps: Math.ceil(1000 / this.averageDuration),
      fps2: this.game!.getScreenFps(),
      bodyCount: world?.bodies.length ?? 0,
      hugeBodyCount: broadphase.hugeBodies?.size ?? 0,
      dynamicBodyCount: broadphase.dynamicBodies.size,
      kinematicBodyCount: broadphase.kinematicBodies.size,
      particleBodyCount: broadphase.particleBodies.size,
      entityCount: this.game?.entities.all.size ?? 0,
      spriteCount: getSpriteCount(this.game!.renderer.stage),
      collisions: (this.game?.world.broadphase as SpatialHashingBroadphase)
        .debugData.numCollisions,
    };
  }

  onKeyDown({ key }: GameEventMap["keyDown"]) {
    if (key === "Backquote") {
      this.visible = !this.visible;
    }
  }
}

/** Counts the number of children of a display object. */
function getSpriteCount(root: Container): number {
  let total = 1;

  for (const child of root.children ?? []) {
    total += getSpriteCount(child);
  }

  return total;
}
