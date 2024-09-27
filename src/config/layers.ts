import { V } from "../core/Vector";
import { LayerInfo } from "../core/graphics/LayerInfo";

/** Top */
export const LAYERS = {
  // The back plate
  back: new LayerInfo(),
  // Skid marks and stuff
  backDecals: new LayerInfo(),
  // Shadows and ambient occlusion
  shadows: new LayerInfo(),

  holes: new LayerInfo(),

  walls: new LayerInfo(),

  pegs: new LayerInfo(),

  // DEFAULT: The main stuff
  main: new LayerInfo(),

  ball: new LayerInfo(),

  // debugWorld
  debugWorld: new LayerInfo(),

  // Stuff not in the world
  hud: new LayerInfo({ paralax: V(0, 0) }),
  // Stuff on the absolute top that's just used for debugging
  debugHud: new LayerInfo({ paralax: V(0, 0) }),
} as const satisfies { [key: string]: LayerInfo };

export type LayerName = keyof typeof LAYERS;

/** The layer that sprites that do not specify a layer will be added to. */
export const DEFAULT_LAYER: LayerName = "main";
