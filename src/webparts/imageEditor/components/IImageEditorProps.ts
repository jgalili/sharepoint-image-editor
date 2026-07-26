export interface IImageEditorProps {
  imageUrl: string;
  brightness: number;
  contrast: number;
  saturate: number;
  hueRotate: number;
  blur: number;
  grayscale: number;
  sepia: number;
  invert: number;
  opacity: number;
  borderRadius: number;
  shadow: number;
  displayMode: number;
  onImageUrlChange: (url: string) => void;
}
