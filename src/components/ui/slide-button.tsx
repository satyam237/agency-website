"use client"

import React, {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
  type JSX,
} from "react"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type PanInfo,
} from "framer-motion"
import { Check, Loader2, SendHorizontal, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button, ButtonProps } from "@/components/ui/button"

const DRAG_CONSTRAINTS = { left: 0, right: 200 } // Increased drag distance
const DRAG_THRESHOLD = 0.9

const BUTTON_STATES = {
  initial: { width: "16rem" }, // Increased from 12rem
  completed: { width: "10rem" }, // Increased from 8rem
}

const ANIMATION_CONFIG = {
  spring: {
    type: "spring",
    stiffness: 400,
    damping: 40,
    mass: 0.8,
  },
}

type StatusIconProps = {
  status: string
}

const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
  const iconMap: Record<StatusIconProps["status"], JSX.Element> = useMemo(
    () => ({
      loading: <Loader2 className="animate-spin" size={24} />, // Increased icon size
      success: <Check size={24} />, // Increased icon size
      error: <X size={24} />, // Increased icon size
    }),
    []
  )

  if (!iconMap[status]) return null

  return (
    <motion.div
      key={crypto.randomUUID()}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
    >
      {iconMap[status]}
    </motion.div>
  )
}

interface SlideButtonProps extends Omit<ButtonProps, 'onClick'> {
  onSlideComplete?: () => void;
  isSubmitting?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
}

const SlideButton = forwardRef<HTMLButtonElement, SlideButtonProps>(
  ({ className, onSlideComplete, isSubmitting = false, isSuccess = false, isError = false, ...props }, ref) => {
    const [isDragging, setIsDragging] = useState(false)
    const [completed, setCompleted] = useState(false)
    const dragHandleRef = useRef<HTMLDivElement | null>(null)

    // Determine status based on props
    const status = useMemo(() => {
      if (isSubmitting) return "loading";
      if (isSuccess) return "success";
      if (isError) return "error";
      return "idle";
    }, [isSubmitting, isSuccess, isError]);

    const dragX = useMotionValue(0)
    const springX = useSpring(dragX, ANIMATION_CONFIG.spring)
    const dragProgress = useTransform(
      springX,
      [0, DRAG_CONSTRAINTS.right],
      [0, 1]
    )

    const handleDragStart = useCallback(() => {
      if (completed || isSubmitting) return
      setIsDragging(true)
    }, [completed, isSubmitting])

    const handleDragEnd = () => {
      if (completed || isSubmitting) return
      setIsDragging(false)

      const progress = dragProgress.get()
      if (progress >= DRAG_THRESHOLD) {
        setCompleted(true)
        onSlideComplete?.()
      } else {
        dragX.set(0)
      }
    }

    const handleDrag = (
      _event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo
    ) => {
      if (completed || isSubmitting) return
      const newX = Math.max(0, Math.min(info.offset.x, DRAG_CONSTRAINTS.right))
      dragX.set(newX)
    }

    const adjustedWidth = useTransform(springX, (x) => x + 14) // Increased adjustment

    // Reset completed state when success/error changes
    React.useEffect(() => {
      if (isSuccess || isError) {
        setTimeout(() => {
          setCompleted(false)
          dragX.set(0)
        }, 2000)
      }
    }, [isSuccess, isError, dragX])

    return (
      <motion.div
        animate={completed ? BUTTON_STATES.completed : BUTTON_STATES.initial}
        transition={ANIMATION_CONFIG.spring}
        className="relative flex h-14 items-center justify-center rounded-full bg-gray-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.8)]" // Increased height from h-9 to h-14
      >
        {!completed && (
          <motion.div
            style={{
              width: adjustedWidth,
            }}
            className="absolute inset-y-0 left-0 z-0 rounded-full bg-gradient-to-r from-gray-300/60 to-gray-400/60"
          />
        )}
        <AnimatePresence key={crypto.randomUUID()}>
          {!completed && (
            <motion.div
              ref={dragHandleRef}
              drag="x"
              dragConstraints={DRAG_CONSTRAINTS}
              dragElastic={0.05}
              dragMomentum={false}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDrag={handleDrag}
              style={{ x: springX }}
              className="absolute -left-6 z-10 flex cursor-grab items-center justify-start active:cursor-grabbing" // Adjusted left position
            >
              {/* Larger round draggable button */}
              <div
                className={cn(
                  "h-14 w-14 rounded-full bg-gradient-to-b from-gray-800 to-gray-900 text-white hover:from-gray-700 hover:to-gray-800 shadow-[0_4px_12px_rgba(0,0,0,0.2)] flex items-center justify-center transition-all duration-200", // Increased from h-9 w-9 to h-14 w-14
                  isDragging && "scale-105",
                  className
                )}
              >
                <SendHorizontal className="size-6 text-white" /> {/* Increased icon size from size-4 to size-6 */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence key={crypto.randomUUID()}>
          {completed && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div
                className={cn(
                  "h-full w-full rounded-full transition-all duration-300 bg-gradient-to-b from-gray-800 to-gray-900 text-white flex items-center justify-center",
                  isSuccess && "from-green-600 to-green-700",
                  isError && "from-red-600 to-red-700",
                  className
                )}
              >
                <AnimatePresence key={crypto.randomUUID()} mode="wait">
                  <StatusIcon status={status} />
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Text label inside the track */}
        {!completed && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-gray-600 font-medium text-sm">
              Slide to send message
            </span>
          </div>
        )}
      </motion.div>
    )
  }
)

SlideButton.displayName = "SlideButton"

export { SlideButton }