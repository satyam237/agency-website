"use client"

import * as React from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type CarouselApi = {
  canScrollPrev: () => boolean
  canScrollNext: () => boolean
  scrollPrev: () => void
  scrollNext: () => void
  scrollTo: (index: number) => void
  selectedScrollSnap: () => number
  on: (event: string, callback: () => void) => void
  off: (event: string, callback: () => void) => void
}

type CarouselProps = {
  opts?: {
    breakpoints?: {
      [key: string]: {
        dragFree?: boolean
      }
    }
  }
  setApi?: (api: CarouselApi) => void
  className?: string
  children: React.ReactNode
}

type CarouselContextProps = {
  carouselRef: React.RefObject<HTMLDivElement>
  api: CarouselApi | undefined
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  CarouselProps
>(({ opts, setApi, className, children, ...props }, _ref) => {
  const [api, setApiState] = React.useState<CarouselApi>()
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)
  const carouselRef = React.useRef<HTMLDivElement>(null)

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        scrollPrev()
      } else if (event.key === "ArrowRight") {
        event.preventDefault()
        scrollNext()
      }
    },
    [scrollPrev, scrollNext]
  )

  React.useEffect(() => {
    if (!carouselRef.current) return

    const mockApi: CarouselApi = {
      canScrollPrev: () => canScrollPrev,
      canScrollNext: () => canScrollNext,
      scrollPrev: () => {
        if (carouselRef.current) {
          const scrollContainer = carouselRef.current.querySelector('[data-carousel-content]')
          if (scrollContainer) {
            const scrollAmount = scrollContainer.clientWidth * 0.8
            scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
          }
        }
      },
      scrollNext: () => {
        if (carouselRef.current) {
          const scrollContainer = carouselRef.current.querySelector('[data-carousel-content]')
          if (scrollContainer) {
            const scrollAmount = scrollContainer.clientWidth * 0.8
            scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' })
          }
        }
      },
      scrollTo: (index: number) => {
        if (carouselRef.current) {
          const scrollContainer = carouselRef.current.querySelector('[data-carousel-content]')
          if (scrollContainer) {
            const items = scrollContainer.querySelectorAll('[data-carousel-item]')
            if (items[index]) {
              items[index].scrollIntoView({ behavior: 'smooth', inline: 'center' })
            }
          }
        }
      },
      selectedScrollSnap: () => {
        if (carouselRef.current) {
          const scrollContainer = carouselRef.current.querySelector('[data-carousel-content]')
          if (scrollContainer) {
            const scrollLeft = scrollContainer.scrollLeft
            const itemWidth = scrollContainer.clientWidth * 0.8
            return Math.round(scrollLeft / itemWidth)
          }
        }
        return 0
      },
      on: (event: string, callback: () => void) => {
        // Mock implementation for event handling
        if (event === 'select' && carouselRef.current) {
          const scrollContainer = carouselRef.current.querySelector('[data-carousel-content]')
          if (scrollContainer) {
            scrollContainer.addEventListener('scroll', callback)
          }
        }
      },
      off: (event: string, callback: () => void) => {
        // Mock implementation for event handling
        if (event === 'select' && carouselRef.current) {
          const scrollContainer = carouselRef.current.querySelector('[data-carousel-content]')
          if (scrollContainer) {
            scrollContainer.removeEventListener('scroll', callback)
          }
        }
      }
    }

    setApiState(mockApi)
    setApi?.(mockApi)

    // Update scroll states
    const updateScrollState = () => {
      if (carouselRef.current) {
        const scrollContainer = carouselRef.current.querySelector('[data-carousel-content]')
        if (scrollContainer) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollContainer
          setCanScrollPrev(scrollLeft > 0)
          setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 1)
        }
      }
    }

    const scrollContainer = carouselRef.current.querySelector('[data-carousel-content]')
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', updateScrollState)
      updateScrollState()
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', updateScrollState)
      }
    }
  }, [setApi, canScrollPrev, canScrollNext])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api,
        opts,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        children,
      }}
    >
      <div
        ref={carouselRef}
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
})
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-carousel-content
      className={cn(
        "flex overflow-x-auto scrollbar-hide scroll-smooth gap-4 snap-x snap-mandatory",
        className
      )}
      {...props}
    />
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-carousel-item
      role="group"
      aria-roledescription="slide"
      className={cn("min-w-0 shrink-0 grow-0 basis-full snap-center", className)}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        "left-12 top-1/2 -translate-y-1/2",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        "right-12 top-1/2 -translate-y-1/2",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} 