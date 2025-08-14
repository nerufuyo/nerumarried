export interface AnimationVariants {
  hidden: object;
  visible: object;
}

export interface ScrollAnimationProps {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
}

export interface StaggerAnimationProps {
  staggerDelay?: number;
  duration?: number;
}

export interface HoverAnimationProps {
  scale?: number;
  duration?: number;
}
