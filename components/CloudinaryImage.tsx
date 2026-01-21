import React, { useMemo } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';
import { clsx } from 'clsx';

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME ?? 'duxaktggz';
const cld = new Cloudinary({ cloud: { cloudName } });

const isRemoteUrl = (value: string) => /^https?:\/\//i.test(value);

interface CloudinaryImageProps {
  publicId: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'auto' | 'sync';
}

export const CloudinaryImage: React.FC<CloudinaryImageProps> = ({
  publicId,
  alt,
  width,
  height,
  className,
  loading = 'lazy',
  decoding = 'async',
}) => {
  if (!publicId) {
    return (
      <div className={clsx('bg-background border border-border', className)} aria-hidden="true" />
    );
  }

  if (isRemoteUrl(publicId)) {
    return (
      <img
        src={publicId}
        alt={alt}
        loading={loading}
        decoding={decoding}
        width={width}
        height={height}
        className={className}
      />
    );
  }

  const cldImg = useMemo(() => {
    let image = cld.image(publicId).format('auto').quality('auto');
    if (width && height) {
      image = image.resize(auto().gravity(autoGravity()).width(width).height(height));
    }
    return image;
  }, [publicId, width, height]);

  return (
    <AdvancedImage
      cldImg={cldImg}
      className={className}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding={decoding}
    />
  );
};
