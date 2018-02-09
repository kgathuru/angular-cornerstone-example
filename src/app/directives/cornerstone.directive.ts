import {Directive, ElementRef, HostListener,  Input, OnInit} from '@angular/core';

// declare const cornerstone;
import Hammer from 'hammerjs';
import * as dicomParser from 'dicom-parser';
import * as cornerstone from 'cornerstone-core/dist/cornerstone.js';
import * as cornerstoneTools from 'cornerstone-tools/dist/cornerstoneTools.js';

cornerstoneTools.external.Hammer = Hammer;
cornerstoneTools.external.cornerstone = cornerstone;

@Directive({
  selector: '[cornerstone]',
})

export class CornerstoneDirective implements OnInit {
  element:  any;

  imageList = [];

  currentIndex = 0;
  curentImage: number = 1;
  allImages: number;

  @Input('image')
  set image(imageData: any) {
    // console.log('setting image data:', imageData);

    if (imageData) {

      if (!this.imageList.filter(img => img.imageId === imageData.imageId).length) {
        this.imageList.push(imageData);
      }

      if (imageData.imageId) {
        this.displayImage(imageData);
      }
      // console.log(this.imageList);
      this.allImages = this.imageList.length;
    }
  }

  constructor(public elementRef: ElementRef) {
    this.elementRef = elementRef;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    cornerstone.resize(this.element, true);
  }

  @HostListener('mousewheel', ['$event'])
  onMouseWheel(event) {
    event.preventDefault();

    const delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
    // console.log(event);

    if (delta > 0) {
      this.currentIndex ++;
      if ( this.currentIndex > this.imageList.length) {
        this.currentIndex = this.imageList.length - 1;
      }
    } else {

      this.currentIndex --;
      if (this.currentIndex < 0) {
        this.currentIndex = 0;
      }
    }
    this.curentImage = this.currentIndex;
    this.image = this.imageList
      .filter( img => img.imageId === `wadouri:http://localhost:4200/assets/dicom/CT00000${this.currentIndex}.dcm`)[0];
  }

  ngOnInit() {
      // Retrieve the DOM element itself
      this.element = this.elementRef.nativeElement;

      // Enable the element with Cornerstone
      cornerstone.enable(this.element);  
  }

  displayImage(image) {
    cornerstone.displayImage(this.element, image);

    // enable inputs
    cornerstoneTools.mouseInput.enable(this.element);
    cornerstoneTools.mouseWheelInput.enable(this.element);    

    // mouse
    // cornerstoneTools.wwwc.activate(this.element, 2) // left click
    cornerstoneTools.pan.activate(this.element, 2) // middle click
    cornerstoneTools.zoom.activate(this.element, 1) // right click
    // cornerstoneTools.zoomWheel.activate(this.element); // middle mouse wheel

    // touch / gesture
    cornerstoneTools.wwwcTouchDrag.activate(this.element) // - Drag
    cornerstoneTools.zoomTouchPinch.activate(this.element) // - Pinch
    cornerstoneTools.panMultiTouch.activate(this.element) // - Multi (x2)

  }

}
