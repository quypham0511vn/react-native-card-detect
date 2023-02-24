export interface ScanRetangleActionsTypes {
  onHide: () => void;
  onShow: () => void;
  capture: () => void;
}

export interface ScanRetanglePropsTypes {
  filterId: number; // 1, 2, 3, 4, default: none
  enableTorch: boolean; // default: false
  capturedQuality: number; // default : 0.5
  onTorchChanged: () => void;
  onRectangleDetected: () => void;
  onPictureTaken: () => void;
  onPictureProcessed: () => void;
  styles: object;
  onErrorProcessingImage: () => void;
  onDeviceSetup: () => void;
  androidPermission: object | boolean;
}

export interface BottomLeft {
  x: number;
  y: number;
}

export interface BottomRight {
  x: number;
  y: number;
}

export interface Dimensions {
  height: number;
  width: number;
}

export interface TopLeft {
  x: number;
  y: number;
}

export interface TopRight {
  x: number;
  y: number;
}

export interface DetectedRectangle {
  bottomLeft: BottomLeft;
  bottomRight: BottomRight;
  dimensions: Dimensions;
  topLeft: TopLeft;
  topRight: TopRight;
}

export interface DetectedRectangleModel {
  detectedRectangle: DetectedRectangle;
}
