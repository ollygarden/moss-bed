import * as React from 'react';
import { cn } from '@/lib/utils';
import { Icon } from '../Icon';
import { CarouselContext, useCarousel } from './Carousel.hooks';

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  totalSlides: number;
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      className,
      children,
      totalSlides,
      defaultIndex = 0,
      onIndexChange,
      ...props
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = React.useState(defaultIndex);

    const goToSlide = React.useCallback(
      (index: number) => {
        const newIndex = Math.max(0, Math.min(index, totalSlides - 1));
        setCurrentIndex(newIndex);
        onIndexChange?.(newIndex);
      },
      [totalSlides, onIndexChange]
    );

    const nextSlide = React.useCallback(() => {
      goToSlide(currentIndex >= totalSlides - 1 ? 0 : currentIndex + 1);
    }, [currentIndex, totalSlides, goToSlide]);

    const prevSlide = React.useCallback(() => {
      goToSlide(currentIndex <= 0 ? totalSlides - 1 : currentIndex - 1);
    }, [currentIndex, totalSlides, goToSlide]);

    const canGoNext = totalSlides > 1;
    const canGoPrev = totalSlides > 1;

    const contextValue = React.useMemo(
      () => ({
        currentIndex,
        totalSlides,
        goToSlide,
        nextSlide,
        prevSlide,
        canGoNext,
        canGoPrev,
      }),
      [
        currentIndex,
        totalSlides,
        goToSlide,
        nextSlide,
        prevSlide,
        canGoNext,
        canGoPrev,
      ]
    );

    return (
      <CarouselContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn('relative', className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = 'Carousel';

interface CarouselContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CarouselContent = React.forwardRef<HTMLDivElement, CarouselContentProps>(
  ({ className, children, ...props }, ref) => {
    const { currentIndex, totalSlides } = useCarousel();

    return (
      <div ref={ref} className={cn('overflow-hidden', className)} {...props}>
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {React.Children.map(children, (child, index) => {
            if (React.isValidElement(child) && child.type === CarouselItem) {
              return React.cloneElement(
                child as React.ReactElement<CarouselItemProps>,
                {
                  'aria-label': `Slide ${index + 1} of ${totalSlides}`,
                }
              );
            }
            return child;
          })}
        </div>
      </div>
    );
  }
);
CarouselContent.displayName = 'CarouselContent';

interface CarouselItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn('w-full flex-shrink-0', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CarouselItem.displayName = 'CarouselItem';

type CarouselDotsProps = React.HTMLAttributes<HTMLDivElement>;

const CarouselDots = React.forwardRef<HTMLDivElement, CarouselDotsProps>(
  ({ className, ...props }, ref) => {
    const { currentIndex, totalSlides, goToSlide } = useCarousel();

    return (
      <div
        ref={ref}
        role="tablist"
        aria-label="Slide indicators"
        className={cn('flex items-center justify-center gap-2', className)}
        {...props}
      >
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={currentIndex === index}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => goToSlide(index)}
            className={cn(
              'w-2 h-2 rounded-full transition-all duration-200',
              '',
              currentIndex === index
                ? 'bg-olly-accent'
                : 'bg-white/20 hover:bg-white/40'
            )}
          />
        ))}
      </div>
    );
  }
);
CarouselDots.displayName = 'CarouselDots';

interface CarouselArrowProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  direction: 'prev' | 'next';
}

const CarouselArrow = React.forwardRef<HTMLButtonElement, CarouselArrowProps>(
  ({ className, direction, ...props }, ref) => {
    const { nextSlide, prevSlide, canGoNext, canGoPrev } = useCarousel();

    const isDisabled = direction === 'prev' ? !canGoPrev : !canGoNext;
    const handleClick = direction === 'prev' ? prevSlide : nextSlide;

    if (isDisabled) return null;

    return (
      <button
        ref={ref}
        onClick={handleClick}
        disabled={isDisabled}
        aria-label={direction === 'prev' ? 'Previous slide' : 'Next slide'}
        className={cn(
          'absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full',
          'bg-olly-grey-800 hover:bg-olly-grey-700 border border-white/10',
          'flex items-center justify-center',
          'transition-all duration-200',
          '',
          'disabled:opacity-0 disabled:pointer-events-none',
          direction === 'prev' ? 'left-2' : 'right-2',
          className
        )}
        {...props}
      >
        <Icon
          name="chevron"
          direction={direction === 'prev' ? 'left' : 'right'}
          size="xs"
          className="text-white"
        />
      </button>
    );
  }
);
CarouselArrow.displayName = 'CarouselArrow';

type CarouselIndicatorProps = React.HTMLAttributes<HTMLSpanElement>;

const CarouselIndicator = React.forwardRef<
  HTMLSpanElement,
  CarouselIndicatorProps
>(({ className, ...props }, ref) => {
  const { currentIndex, totalSlides } = useCarousel();

  return (
    <span
      ref={ref}
      className={cn('text-sm font-medium text-white/60', className)}
      {...props}
    >
      {currentIndex + 1} of {totalSlides}
    </span>
  );
});
CarouselIndicator.displayName = 'CarouselIndicator';

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
  CarouselArrow,
  CarouselIndicator,
};
