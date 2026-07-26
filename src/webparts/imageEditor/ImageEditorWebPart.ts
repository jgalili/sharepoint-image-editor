import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider,
  PropertyPaneButton,
  PropertyPaneButtonType
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'ImageEditorWebPartStrings';
import ImageEditor from './components/ImageEditor';
import { IImageEditorProps } from './components/IImageEditorProps';

export interface IImageEditorWebPartProps {
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
}

const DEFAULTS: IImageEditorWebPartProps = {
  imageUrl: '',
  brightness: 100,
  contrast: 100,
  saturate: 100,
  hueRotate: 0,
  blur: 0,
  grayscale: 0,
  sepia: 0,
  invert: 0,
  opacity: 100,
  borderRadius: 0,
  shadow: 0
};

export default class ImageEditorWebPart extends BaseClientSideWebPart<IImageEditorWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IImageEditorProps> = React.createElement(
      ImageEditor,
      {
        imageUrl: this.properties.imageUrl || '',
        brightness: this.properties.brightness ?? DEFAULTS.brightness,
        contrast: this.properties.contrast ?? DEFAULTS.contrast,
        saturate: this.properties.saturate ?? DEFAULTS.saturate,
        hueRotate: this.properties.hueRotate ?? DEFAULTS.hueRotate,
        blur: this.properties.blur ?? DEFAULTS.blur,
        grayscale: this.properties.grayscale ?? DEFAULTS.grayscale,
        sepia: this.properties.sepia ?? DEFAULTS.sepia,
        invert: this.properties.invert ?? DEFAULTS.invert,
        opacity: this.properties.opacity ?? DEFAULTS.opacity,
        borderRadius: this.properties.borderRadius ?? DEFAULTS.borderRadius,
        shadow: this.properties.shadow ?? DEFAULTS.shadow,
        displayMode: this.displayMode,
        onImageUrlChange: (url: string) => {
          this.properties.imageUrl = url;
          this.render();
        }
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    const { semanticColors } = currentTheme;
    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  private _resetFilters(): void {
    this.properties.brightness = DEFAULTS.brightness;
    this.properties.contrast = DEFAULTS.contrast;
    this.properties.saturate = DEFAULTS.saturate;
    this.properties.hueRotate = DEFAULTS.hueRotate;
    this.properties.blur = DEFAULTS.blur;
    this.properties.grayscale = DEFAULTS.grayscale;
    this.properties.sepia = DEFAULTS.sepia;
    this.properties.invert = DEFAULTS.invert;
    this.properties.opacity = DEFAULTS.opacity;
    this.properties.borderRadius = DEFAULTS.borderRadius;
    this.properties.shadow = DEFAULTS.shadow;
    this.render();
    this.context.propertyPane.refresh();
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.ImageGroupName,
              groupFields: [
                PropertyPaneTextField('imageUrl', {
                  label: strings.ImageUrlFieldLabel,
                  placeholder: 'https://example.com/image.jpg'
                })
              ]
            },
            {
              groupName: strings.LightGroupName,
              groupFields: [
                PropertyPaneSlider('brightness', {
                  label: strings.BrightnessLabel,
                  min: 0,
                  max: 200,
                  value: this.properties.brightness ?? DEFAULTS.brightness,
                  step: 1,
                  showValue: true
                }),
                PropertyPaneSlider('contrast', {
                  label: strings.ContrastLabel,
                  min: 0,
                  max: 200,
                  value: this.properties.contrast ?? DEFAULTS.contrast,
                  step: 1,
                  showValue: true
                }),
                PropertyPaneSlider('opacity', {
                  label: strings.OpacityLabel,
                  min: 0,
                  max: 100,
                  value: this.properties.opacity ?? DEFAULTS.opacity,
                  step: 1,
                  showValue: true
                })
              ]
            },
            {
              groupName: strings.ColorGroupName,
              groupFields: [
                PropertyPaneSlider('saturate', {
                  label: strings.SaturateLabel,
                  min: 0,
                  max: 200,
                  value: this.properties.saturate ?? DEFAULTS.saturate,
                  step: 1,
                  showValue: true
                }),
                PropertyPaneSlider('hueRotate', {
                  label: strings.HueRotateLabel,
                  min: 0,
                  max: 360,
                  value: this.properties.hueRotate ?? DEFAULTS.hueRotate,
                  step: 1,
                  showValue: true
                }),
                PropertyPaneSlider('grayscale', {
                  label: strings.GrayscaleLabel,
                  min: 0,
                  max: 100,
                  value: this.properties.grayscale ?? DEFAULTS.grayscale,
                  step: 1,
                  showValue: true
                }),
                PropertyPaneSlider('sepia', {
                  label: strings.SepiaLabel,
                  min: 0,
                  max: 100,
                  value: this.properties.sepia ?? DEFAULTS.sepia,
                  step: 1,
                  showValue: true
                }),
                PropertyPaneSlider('invert', {
                  label: strings.InvertLabel,
                  min: 0,
                  max: 100,
                  value: this.properties.invert ?? DEFAULTS.invert,
                  step: 1,
                  showValue: true
                })
              ]
            },
            {
              groupName: strings.EffectsGroupName,
              groupFields: [
                PropertyPaneSlider('blur', {
                  label: strings.BlurLabel,
                  min: 0,
                  max: 20,
                  value: this.properties.blur ?? DEFAULTS.blur,
                  step: 1,
                  showValue: true
                }),
                PropertyPaneSlider('borderRadius', {
                  label: strings.BorderRadiusLabel,
                  min: 0,
                  max: 50,
                  value: this.properties.borderRadius ?? DEFAULTS.borderRadius,
                  step: 1,
                  showValue: true
                }),
                PropertyPaneSlider('shadow', {
                  label: strings.ShadowLabel,
                  min: 0,
                  max: 30,
                  value: this.properties.shadow ?? DEFAULTS.shadow,
                  step: 1,
                  showValue: true
                })
              ]
            },
            {
              groupName: '',
              groupFields: [
                PropertyPaneButton('resetButton', {
                  text: strings.ResetButtonLabel,
                  buttonType: PropertyPaneButtonType.Normal,
                  onClick: this._resetFilters.bind(this)
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
