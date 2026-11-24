import Image, { getImageProps, type ImageProps, type StaticImageData } from "next/image";

type Props = Omit<ImageProps, "src"> & {
  src: StaticImageData;
  dark?: StaticImageData;
  /** Opens in the full-screen viewer (components/lightbox.tsx) on click. */
  zoom?: boolean;
};

/**
 * A screenshot taken in the page's light and dark themes. Both versions share one cell and CSS shows the
 * one that matches the site's theme (system or the theme button), cross-fading on a switch (.themed in
 * globals.css). The dark copy keeps the description for crawlers, but its wrapper is aria-hidden so a
 * screen reader hears it once.
 */
export function ThemedImage({ zoom, ...props }: Props) {
  if (!zoom) return <Picture {...props} />;
  // The button's name is the picture's description; the viewer finds it by its class.
  return (
    <button type="button" className="zoom-trigger" aria-haspopup="dialog">
      <Picture {...props} />
    </button>
  );
}

function Picture({ src, dark, alt, fetchPriority, ...rest }: Omit<Props, "zoom">) {
  if (!dark) return <Image src={src} alt={alt} fetchPriority={fetchPriority} {...rest} />;
  // Above the fold (the case cover): fetch early only the copy the system theme shows. Marking both
  // copies high priority made them compete and pushed back the largest paint.
  const preloads =
    fetchPriority === "high"
      ? ([
          [src, "(prefers-color-scheme: light)"],
          [dark, "(prefers-color-scheme: dark)"],
        ] as const).map(([image, media]) => {
          const { props } = getImageProps({ src: image, alt, sizes: rest.sizes });
          return <link key={media} rel="preload" as="image" href={props.src} imageSrcSet={props.srcSet} imageSizes={props.sizes} media={media} fetchPriority="high" />;
        })
      : null;
  return (
    <span className="themed">
      {preloads}
      <span className="themed-light">
        <Image src={src} alt={alt} {...rest} />
      </span>
      <span className="themed-dark" aria-hidden="true">
        <Image src={dark} alt={alt} {...rest} />
      </span>
    </span>
  );
}
