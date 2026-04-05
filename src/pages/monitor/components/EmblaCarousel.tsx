import Autoplay from "embla-carousel-autoplay";

import useEmblaCarousel from "embla-carousel-react";

import { useEffect, type ReactNode } from "react";

const delay = 6000;

export type EmblaCarouselProps = {
  children: ReactNode;
  scroll?: boolean;
};

export function EmblaCarousel({
  children,
  scroll = false,
}: EmblaCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({
      delay: delay,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnFocusIn: false,
      stopOnLastSnap: false,
    }),
  ]);

  const scrollPrev = () => emblaApi?.scrollPrev();

  const scrollNext = () => emblaApi?.scrollNext();

  useEffect(() => {
    if (!emblaApi) return;

    //emblaApi.plugins().autoplay?.play();
  }, [emblaApi]);

  return (
    <div className="embla text-black">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">{children}</div>
      </div>
      {scroll && (
        <>
          <button className="embla__prev" onClick={scrollPrev}>
            Scroll to prev
          </button>

          <button className="embla__next" onClick={scrollNext}>
            Scroll to next
          </button>
        </>
      )}
    </div>
  );
}
