declare module "locomotive-scroll" {
  export interface LocomotiveScrollOptions {
    el?: HTMLElement;
    smooth?: boolean;
    multiplier?: number;
    class?: string;
    scrollbarContainer?: boolean | HTMLElement;
    lenisOptions?: {
      lerp?: number;
      duration?: number;
      orientation?: "vertical" | "horizontal";
      gestureOrientation?: "vertical" | "horizontal" | "both";
      smoothWheel?: boolean;
      wheelMultiplier?: number;
      touchMultiplier?: number;
      normalizeWheel?: boolean;
      easing?: (t: number) => number;
    };
  }

  export default class LocomotiveScroll {
    constructor(options: LocomotiveScrollOptions);
    update(): void;
    destroy(): void;
    on(event: string, callback: Function): void;
    off(event: string, callback: Function): void;
    scrollTo(target: string | HTMLElement | number, options?: any): void;
  }
}
