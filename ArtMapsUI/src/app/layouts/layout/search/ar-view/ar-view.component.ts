import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-ar-view',
  templateUrl: './ar-view.component.html',
  styleUrls: ['./ar-view.component.scss']
})
export class ArViewComponent implements OnInit {


  @ViewChild('mapInArCanvas')
  private canvasRef: ElementRef;

  //* Cube Properties
  @Input() public rotationSpeedX: number = 0.05;
  @Input() public rotationSpeedY: number = 0.01;
  @Input() public size: number = 200;
  // @Input() public texture: string = "./../../../../assets/images/maps/mumbai.png";


  //* Stage Properties
  @Input() public cameraZ: number = -200;
  @Input() public fieldOfView: number = 1;
  @Input('nearClipping') public nearClippingPlane: number = 1;
  @Input('farClipping') public farClippingPlane: number = 1000;

  //? Helper Properties (Private Properties);

  private camera!: THREE.PerspectiveCamera;
  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }
  private geometry = this.flipY(new THREE.PlaneBufferGeometry())
  private texture: THREE.Texture;
  private material;

  private cube: THREE.Mesh;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;


  private createScene() {
    // Scene
    this.scene = new THREE.Scene();
    // this.scene.background = new THREE.Color(0xff0000)
    this.scene.add(this.cube);
    // Camera
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    )
    // this.camera.setViewOffset();
    this.camera.position.z = this.cameraZ;
    console.log(this.camera.position);
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private startRenderingLoop() {
    // Renderer
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true });
    this.renderer.setClearColor( 0xff0000, 0 );
    let controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.addEventListener('change', this.render);

    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.render();
  }

  render(): Function {
    window.requestAnimationFrame(this.render.bind(this));
    // this.animateCube();
    this.renderer.render(this.scene, this.camera);
    return;
  }

  flipY(geometry) {
    const uv = geometry.attributes.uv;
    for (let i = 0; i < uv.count; i++) {
        uv.setY(i, 1 - uv.getY(i));
    }
    return geometry;
}

  ngAfterViewInit() {
    this.createScene();
    this.startRenderingLoop();
  }

  data;

  // @ViewChild('mapInArCanvas')
  // imgElement: ElementRef;
  top = 13;
  left = 15;

  constructor(@Inject(MAT_DIALOG_DATA) public dataIn: any) {
    this.data = dataIn;
    this.texture = new THREE.TextureLoader().load('./assets/images/maps/inverted/' + this.data.imgName);
    // this.texture.rotation = 0.1;
    this.material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: this.texture });

    this.cube = new THREE.Mesh(this.geometry, this.material);
   }

  ngOnInit(): void {
    // this.imgElement = document.getElementById('mapInArCanvas');
  }

  onClickTop() {
    this.top -= 1;
  }
  onClickLeft() {
    this.left -= 1;
  }
  onClickRight() {
    this.left += 1;
  }
  onClickBottom() {
    this.top += 1;
  }

}
