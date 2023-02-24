import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {
  Image,
  NativeModules,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import Scanner from 'react-native-rectangle-scanner';

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

export interface ScanRetangleProps extends ScanRetanglePropsTypes {
  position?: DetectedRectangleModel;
  imgCapture?: any;
  imgFlash?: any;
  imgCancel?: any;
  onTakePhoto?: (fileDir?: string) => void;
  scaneContainer?: ViewProps;
  flashContainer?: ViewProps;
  cancelContainer?: ViewProps;
  captureContainer?: ViewProps;
  setPositionScan?: any;
}

const CameraManager = NativeModules.RNRectangleScannerManager || {};

const ScanRetangle = forwardRef<ScanRetangleActionsTypes, ScanRetangleProps>(
  (
    {
      filterId,
      capturedQuality,
      imgCapture,
      imgCancel,
      imgFlash,
      onTakePhoto,
      scaneContainer,
      flashContainer,
      captureContainer,
      cancelContainer,
      setPositionScan,
    },
    ref: any,
  ) => {
    const [isShow, setShow] = useState<boolean>(false);
    const [isHasFlash, setHasFlash] = useState<boolean>(true);
    const [position, setPosition] = useState<DetectedRectangleModel>();
    const [croppedImg, setCroppedImg] = useState<string>();
    const [originImg, setOriginImg] = useState<string>();
    const opacityScan = {
      opacity: position?.detectedRectangle ? 1 : 0.2,
    } as ViewStyle;

    const greenColor = {
      borderColor: position?.detectedRectangle ? 'green' : 'red',
    } as ViewStyle;

    const onShow = useCallback(() => {
      setShow(true);
    }, []);

    const onHide = useCallback(() => {
      setShow(false);
    }, []);

    const onPictureProcessed = useCallback(
      ({croppedImage, initialImage}: any) => {
        setCroppedImg(croppedImage);
        setOriginImg(initialImage);
        onHide();

        console.log('fghsdh', croppedImage);
      },
      [onHide],
    );

    const onRectangleDetected = useCallback(
      (res?: any) => {
        setPosition(res);
        setPositionScan(res);
      },
      [setPositionScan],
    );

    const onCapture = useCallback(() => {
      CameraManager.capture();
      onTakePhoto?.();
    }, [onTakePhoto]);

    const onSetFlash = useCallback(() => {
      setHasFlash(last => !last);
    }, []);

    useImperativeHandle(ref, () => ({
      onShow,
      onHide,
      onCapture,
    }));

    return (
      <>
        {isShow && (
          <>
            <View style={[styles.container, scaneContainer, greenColor]}>
              <Scanner
                filterId={filterId}
                onPictureProcessed={onPictureProcessed}
                ref={ref}
                enableTorch={isHasFlash ? true : false}
                capturedQuality={capturedQuality || 0.5}
                style={[styles.wrapSelfCamera]}
                onRectangleDetected={onRectangleDetected}
              />
            </View>
            <View style={styles.wrapOptionScan}>
              <TouchableOpacity
                onPress={onSetFlash}
                style={[styles.wrapSetFlash, flashContainer]}>
                {imgFlash || <Text>Flash</Text>}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={position?.detectedRectangle ? onCapture : undefined}
                style={[styles.wrapCapture, captureContainer, opacityScan]}>
                {imgCapture || <Text>Capture</Text>}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onHide}
                style={[styles.wrapCancel, cancelContainer]}>
                {imgCancel || <Text>Cancel</Text>}
              </TouchableOpacity>
            </View>
          </>
        )}
        {!isShow && (
          <>
            {originImg && (
              <Image
                source={{
                  uri: `${originImg}`,
                }}
                style={styles.imgContainer}
              />
            )}
            <TouchableOpacity style={styles.wrapOpenScanBtn} onPress={onShow}>
              <Text style={styles.txtOpenScanBtn}>Start Scan Card</Text>
            </TouchableOpacity>
          </>
        )}
      </>
    );
  },
);
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: '50%',
    borderRadius: 20,
    borderWidth: 8,
    overflow: 'hidden',
    borderColor: 'red',
  },
  wrapSelfCamera: {
    width: '100%',
    height: '100%',
    marginRight: 8,
    marginTop: -8,
  },
  wrapOptionScan: {
    flexDirection: 'row',
  },
  wrapCancel: {
    width: 60,
    height: 60,
    borderColor: 'pink',
    borderWidth: 5,
    backgroundColor: 'orangle',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapCapture: {
    width: 90,
    height: 90,
    borderColor: 'pink',
    borderWidth: 5,
    backgroundColor: 'red',
    borderRadius: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapSetFlash: {
    width: 60,
    height: 60,
    borderColor: 'pink',
    borderWidth: 5,
    backgroundColor: 'yellow',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapOpenScanBtn: {backgroundColor: 'gray'},
  txtOpenScanBtn: {paddingVertical: 10},
  imgContainer: {
    width: 300,
    height: 300,
  },
});
export default ScanRetangle;
