import * as React from 'react';
import styles from './ImageEditor.module.scss';
import type { IImageEditorProps } from './IImageEditorProps';
import { DisplayMode } from '@microsoft/sp-core-library';

export default class ImageEditor extends React.Component<IImageEditorProps> {
  public render(): React.ReactElement<IImageEditorProps> {
    const {
      imageUrl,
      brightness,
      contrast,
      saturate,
      hueRotate,
      blur,
      grayscale,
      sepia,
      invert,
      opacity,
      borderRadius,
      shadow,
      displayMode,
      onImageUrlChange
    } = this.props;

    const filterStyle: React.CSSProperties = {
      filter: [
        `brightness(${brightness / 100})`,
        `contrast(${contrast / 100})`,
        `saturate(${saturate / 100})`,
        `hue-rotate(${hueRotate}deg)`,
        `blur(${blur}px)`,
        `grayscale(${grayscale / 100})`,
        `sepia(${sepia / 100})`,
        `invert(${invert / 100})`
      ].join(' '),
      opacity: opacity / 100,
      borderRadius: `${borderRadius}%`,
      boxShadow: shadow > 0
        ? `0 ${shadow}px ${shadow * 2}px rgba(0,0,0,${Math.min(shadow / 30, 0.6)})`
        : 'none'
    };

    const isEditing = displayMode === DisplayMode.Edit;

    return (
      <section className={styles.imageEditor}>
        <div className={styles.container}>
          {isEditing && (
            <div className={styles.editBar}>
              <input
                className={styles.urlInput}
                type="text"
                placeholder="Paste image URL here..."
                value={imageUrl || ''}
                onChange={(e) => onImageUrlChange(e.target.value)}
              />
              <p className={styles.editHint}>
                Use the property pane (edit icon) to adjust image effects
              </p>
            </div>
          )}

          <div className={styles.imageWrapper}>
            {imageUrl ? (
              <img
                className={styles.editedImage}
                src={imageUrl}
                alt="Edited image"
                style={filterStyle}
              />
            ) : (
              <div className={styles.placeholder}>
                <span className={styles.placeholderIcon}>🖼️</span>
                <span className={styles.placeholderText}>
                  {isEditing
                    ? 'Enter an image URL above or in the property pane to get started'
                    : 'No image configured'}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
}
