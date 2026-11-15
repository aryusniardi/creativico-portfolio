import { useState, type ComponentProps } from "react";
import { optimizedImageUrl } from "../../data/image";

export function PortfolioImage({
  src,
  size = 768,
  onError,
  ...props
}: ComponentProps<"img"> & { src: string; size?: number }) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const optimized = optimizedImageUrl(src, size);
  return (
    <img
      {...props}
      src={failedSource === src ? src : optimized}
      onError={(event) => {
        if (optimized !== src && failedSource !== src) setFailedSource(src);
        else onError?.(event);
      }}
    />
  );
}
