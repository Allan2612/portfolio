import Image, { type ImageProps, type StaticImageData } from "next/image";

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

function Picture({ src, dark, alt, ...rest }: Omit<Props, "zoom">) {
  if (!dark) return <Image src={src} alt={alt} {...rest} />;
  return (
    <span className="themed">
      <span className="themed-light">
        <Image src={src} alt={alt} {...rest} />
      </span>
      <span className="themed-dark" aria-hidden="true">
        <Image src={dark} alt={alt} {...rest} />
      </span>
    </span>
  );
}
