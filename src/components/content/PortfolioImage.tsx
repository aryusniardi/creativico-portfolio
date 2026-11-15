import { useEffect, useRef, useState, type ComponentProps } from "react";
import { optimizedImageUrl } from "../../data/image";

export function PortfolioImage({
  src,
  size = 768,
  onError,
  ...props
}: Omit<ComponentProps<"img">, "ref"> & { src: string; size?: number }) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const optimized = optimizedImageUrl(src, size);
  useEffect(() => {
    const image = imageRef.current;
    // An SSR image can fail before React attaches its error listener.
    if (optimized !== src && image?.complete && image.naturalWidth === 0) setFailedSource(src);
  }, [optimized, src]);
  return (
    <img
      {...props}
      ref={imageRef}
      src={failedSource === src ? src : optimized}
      onError={(event) => {
        if (optimized !== src && failedSource !== src) setFailedSource(src);
        else onError?.(event);
      }}
    />
  );
}
