import * as React from 'react';

export interface CarouselContextValue {
  currentIndex: number;
  totalSlides: number;
  goToSlide: (index: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
}

export const CarouselContext = React.createContext<CarouselContextValue | null>(
  null
);

export const useCarousel = () => {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error('useCarousel must be used within a Carousel');
  }
  return context;
};
