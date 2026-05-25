declare module 'three/examples/jsm/controls/OrbitControls' {
  import { Camera, WebGLRenderer, MOUSE, TOUCH, Vector3 } from 'three';
  import { EventDispatcher } from 'three';

  export class OrbitControls extends EventDispatcher {
    constructor(object: Camera, domElement?: HTMLElement);
    object: Camera;
    domElement: HTMLElement | HTMLDocument;
    enabled: boolean;
    target: Vector3;
    minDistance: number;
    maxDistance: number;
    minZoom: number;
    maxZoom: number;
    minPolarAngle: number;
    maxPolarAngle: number;
    minAzimuthAngle: number;
    maxAzimuthAngle: number;
    enableDamping: boolean;
    dampingFactor: number;
    enableZoom: boolean;
    zoomSpeed: number;
    enableRotate: boolean;
    rotateSpeed: number;
    enablePan: boolean;
    keyPanSpeed: number;
    autoRotate: boolean;
    autoRotateSpeed: number;
    enableKeys: boolean;
    keys: { LEFT: string; UP: string; RIGHT: string; BOTTOM: string };
    mouseButtons: { LEFT: MOUSE; MIDDLE: MOUSE; RIGHT: MOUSE };
    touches: { ONE: TOUCH; TWO: TOUCH };
    update(): boolean;
    listenToKeyEvents(domElement: HTMLElement): void;
    handleKeyDown(event: KeyboardEvent): void;
    handleKeyUp(event: KeyboardEvent): void;
    reset(): void;
    dispose(): void;
  }
}

declare module 'three/examples/jsm/postprocessing/EffectComposer' {
  import { WebGLRenderer, WebGLRenderTarget, Pass } from 'three';

  export class EffectComposer {
    constructor(renderer: WebGLRenderer, renderTarget?: WebGLRenderTarget);
    renderer: WebGLRenderer;
    renderTarget1: WebGLRenderTarget;
    renderTarget2: WebGLRenderTarget;
    writeBuffer: WebGLRenderTarget;
    readBuffer: WebGLRenderTarget;
    passes: Pass[];
    copyPass: any;
    clock: any;
    renderToScreen: boolean;
    addPass(pass: any): void;
    insertPass(pass: any, index: number): void;
    removePass(pass: any): void;
    setSize(width: number, height: number): void;
    render(deltaTime?: number): void;
    reset(renderTarget?: WebGLRenderTarget): void;
    dispose(): void;
  }
}

declare module 'three/examples/jsm/postprocessing/RenderPass' {
  import { Scene, Camera, Material } from 'three';

  export class RenderPass {
    constructor(scene: Scene, camera: Camera, overrideMaterial?: Material, clearColor?: any, clearAlpha?: number);
    scene: Scene;
    camera: Camera;
    overrideMaterial: Material;
    clearColor: any;
    clearAlpha: number;
    clear: boolean;
    clearDepth: boolean;
    clearStencil: boolean;
    needsSwap: boolean;
  }
}

declare module 'three/examples/jsm/postprocessing/UnrealBloomPass' {
  import { Vector2 } from 'three';

  export class UnrealBloomPass {
    constructor(resolution: Vector2, strength: number, radius: number, threshold: number);
    resolution: Vector2;
    strength: number;
    radius: number;
    threshold: number;
    clearColor: any;
    renderTargetsHorizontal: any[];
    renderTargetsVertical: any[];
    nMips: number;
    passUv: any;
    writeBuffer: any;
    readBuffer: any;
    needsSwap: boolean;
    setSize(width: number, height: number): void;
  }
}

declare module 'three/examples/jsm/postprocessing/OutputPass' {
  export class OutputPass {
    constructor();
    clear: boolean;
    needsSwap: boolean;
  }
}
