declare interface IImageEditorWebPartStrings {
  PropertyPaneDescription: string;
  ImageGroupName: string;
  ImageUrlFieldLabel: string;
  LightGroupName: string;
  BrightnessLabel: string;
  ContrastLabel: string;
  OpacityLabel: string;
  ColorGroupName: string;
  SaturateLabel: string;
  HueRotateLabel: string;
  GrayscaleLabel: string;
  SepiaLabel: string;
  InvertLabel: string;
  EffectsGroupName: string;
  BlurLabel: string;
  BorderRadiusLabel: string;
  ShadowLabel: string;
  ResetButtonLabel: string;
}

declare module 'ImageEditorWebPartStrings' {
  const strings: IImageEditorWebPartStrings;
  export = strings;
}
