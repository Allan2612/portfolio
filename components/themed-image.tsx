import Image, { type ImageProps, type StaticImageData } from "next/image";

type Props = Omit<ImageProps, "src"> & { src: StaticImageData; dark?: StaticImageData };

/**
 * A screenshot taken in the page's light and dark themes. Both versions share one cell and CSS shows the
 * one that matches the site's theme (system or the theme button), cross-fading on a switch (.themed in
 * globals.css). The dark copy keeps the description for crawlers, but its wrapper is aria-hidden so a
 * screen reader hears it once.
 */
export function ThemedImage({ src, dark, alt, ...rest }: Props) {
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
