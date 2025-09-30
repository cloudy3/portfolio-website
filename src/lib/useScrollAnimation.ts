// All scroll animations disabled to prevent interference with normal scrolling// All scroll animations disabled to prevent interference with normal scrolling// All scroll animations disabled to prevent interference with normal scrolling



export interface UseScrollAnimationOptions {

  trigger?: string;

  start?: string;export interface UseScrollAnimationOptions {export interface UseScrollAnimationOptions {

  end?: string;

  toggleActions?: string;  trigger?: string;  trigger?: string;

  scrub?: boolean | number;

  markers?: boolean;  start?: string;  start?: string;

  delay?: number;

  duration?: number;  end?: string;  end?: string;

  stagger?: number;

}  toggleActions?: string;  toggleActions?: string;



export const useScrollAnimation = () => {  scrub?: boolean | number;  scrub?: boolean | number;

  // Disabled all scroll animations - return no-op functions

    markers?: boolean;  markers?: boolean;

  const cleanup = () => {

    // No cleanup needed since no animations are created  delay?: number;  delay?: number;

  };

  duration?: number;  duration?: number;

  const animateTextOnScroll = () => {

    console.log("Scroll animations disabled");  stagger?: number;  stagger?: number;

    return null;

  };}}



  const animateFadeOnScroll = () => {

    console.log("Scroll animations disabled");

    return null;export const useScrollAnimation = () => {export const useScrollAnimation = () => {

  };

  // Disabled all scroll animations - return no-op functions  // Disabled all scroll animations - return no-op functions

  const animateSlideLeftOnScroll = () => {

    console.log("Scroll animations disabled");    

    return null;

  };  const cleanup = () => {  const cleanup = () => {



  const animateSlideRightOnScroll = () => {    // No cleanup needed since no animations are created    // No cleanup needed since no animations are created

    console.log("Scroll animations disabled");

    return null;  };  };

  };



  const animateScaleOnScroll = () => {

    console.log("Scroll animations disabled");  const animateTextOnScroll = () => {  const animateTextOnScroll = () => {

    return null;

  };    console.log("Scroll animations disabled");    console.log("Scroll animations disabled");



  const animateProgressOnScroll = () => {    return null;    return null;

    console.log("Scroll animations disabled");

    return null;  };  };

  };



  return {

    cleanup,  const animateFadeOnScroll = () => {  const animateFadeInOnScroll = () => {

    animateTextOnScroll,

    animateFadeOnScroll,    console.log("Scroll animations disabled");    console.log("Scroll animations disabled");

    animateSlideLeftOnScroll,

    animateSlideRightOnScroll,    return null;    return null;

    animateScaleOnScroll,

    animateProgressOnScroll,  };  };

  };

};

  const animateSlideLeftOnScroll = () => {  const animateSlideInOnScroll = () => {

    console.log("Scroll animations disabled");    console.log("Scroll animations disabled");

    return null;    return null;

  };  };



  const animateSlideRightOnScroll = () => {  const animateScaleInOnScroll = () => {

    console.log("Scroll animations disabled");    console.log("Scroll animations disabled");

    return null;    return null;

  };  };



  const animateScaleOnScroll = () => {  const animateProgressBarOnScroll = () => {

    console.log("Scroll animations disabled");    console.log("Scroll animations disabled");

    return null;    return null;

  };  };



  const animateProgressOnScroll = () => {  const animateParallaxOnScroll = () => {

    console.log("Scroll animations disabled");    console.log("Scroll animations disabled");

    return null;    return null;

  };  };



  return {  return {

    cleanup,    cleanup,

    animateTextOnScroll,    animateTextOnScroll,

    animateFadeOnScroll,    animateFadeInOnScroll,

    animateSlideLeftOnScroll,    animateSlideInOnScroll,

    animateSlideRightOnScroll,    animateScaleInOnScroll,

    animateScaleOnScroll,    animateProgressBarOnScroll,

    animateProgressOnScroll,    animateParallaxOnScroll,

  };  };

};};

export interface UseScrollAnimationOptions {
  trigger?: string;
  start?: string;
  end?: string;
  toggleActions?: string;
  scrub?: boolean | number;
  markers?: boolean;
  delay?: number;
  duration?: number;
  stagger?: number;
}

export const useScrollAnimation = () => {
  const animationsRef = useRef<ScrollTrigger[]>([]);

  // Cleanup function
  const cleanup = () => {
    animationsRef.current.forEach((trigger) => {
      trigger.kill();
    });
    animationsRef.current = [];
  };

  // Text reveal animation with scroll trigger
  const animateTextOnScroll = (
    elements: string | HTMLElement[],
    options: UseScrollAnimationOptions = {}
  ) => {
    const {
      trigger,
      start = "top 80%",
      toggleActions = "play none none reverse",
      delay = 0,
      duration = 0.8,
      stagger = 0.1,
    } = options;

    const animation = animateTextReveal(elements, { delay, duration, stagger });

    if (trigger || typeof elements === "string") {
      const scrollTrigger = createScrollTriggerAnimation(
        trigger || elements,
        animation,
        { start, toggleActions }
      );
      animationsRef.current.push(scrollTrigger);
      return scrollTrigger;
    }

    return animation;
  };

  // Fade in animation with scroll trigger
  const animateFadeOnScroll = (
    elements: string | HTMLElement[],
    options: UseScrollAnimationOptions = {}
  ) => {
    const {
      trigger,
      start = "top 80%",
      toggleActions = "play none none reverse",
      delay = 0,
      duration = 0.8,
      stagger = 0.1,
    } = options;

    const animation = animateFadeIn(elements, { delay, duration, stagger });

    if (trigger || typeof elements === "string") {
      const scrollTrigger = createScrollTriggerAnimation(
        trigger || elements,
        animation,
        { start, toggleActions }
      );
      animationsRef.current.push(scrollTrigger);
      return scrollTrigger;
    }

    return animation;
  };

  // Slide in from left with scroll trigger
  const animateSlideLeftOnScroll = (
    elements: string | HTMLElement[],
    options: UseScrollAnimationOptions = {}
  ) => {
    const {
      trigger,
      start = "top 80%",
      toggleActions = "play none none reverse",
      delay = 0,
      duration = 0.8,
      stagger = 0.1,
    } = options;

    const animation = animateSlideInLeft(elements, {
      delay,
      duration,
      stagger,
    });

    if (trigger || typeof elements === "string") {
      const scrollTrigger = createScrollTriggerAnimation(
        trigger || elements,
        animation,
        { start, toggleActions }
      );
      animationsRef.current.push(scrollTrigger);
      return scrollTrigger;
    }

    return animation;
  };

  // Slide in from right with scroll trigger
  const animateSlideRightOnScroll = (
    elements: string | HTMLElement[],
    options: UseScrollAnimationOptions = {}
  ) => {
    const {
      trigger,
      start = "top 80%",
      toggleActions = "play none none reverse",
      delay = 0,
      duration = 0.8,
      stagger = 0.1,
    } = options;

    const animation = animateSlideInRight(elements, {
      delay,
      duration,
      stagger,
    });

    if (trigger || typeof elements === "string") {
      const scrollTrigger = createScrollTriggerAnimation(
        trigger || elements,
        animation,
        { start, toggleActions }
      );
      animationsRef.current.push(scrollTrigger);
      return scrollTrigger;
    }

    return animation;
  };

  // Scale in animation with scroll trigger
  const animateScaleOnScroll = (
    elements: string | HTMLElement[],
    options: UseScrollAnimationOptions = {}
  ) => {
    const {
      trigger,
      start = "top 80%",
      toggleActions = "play none none reverse",
      delay = 0,
      duration = 0.8,
      stagger = 0.1,
    } = options;

    const animation = animateScaleIn(elements, { delay, duration, stagger });

    if (trigger || typeof elements === "string") {
      const scrollTrigger = createScrollTriggerAnimation(
        trigger || elements,
        animation,
        { start, toggleActions }
      );
      animationsRef.current.push(scrollTrigger);
      return scrollTrigger;
    }

    return animation;
  };

  // Progress bar animation with scroll trigger
  const animateProgressOnScroll = (
    elements: string | HTMLElement[],
    targetWidths: string[],
    options: UseScrollAnimationOptions = {}
  ) => {
    const {
      trigger,
      start = "top 80%",
      toggleActions = "play none none reverse",
      delay = 0,
      duration = 1.5,
      stagger = 0.1,
    } = options;

    const timeline = gsap.timeline();

    if (typeof elements === "string") {
      const elementList = document.querySelectorAll(elements);
      elementList.forEach((element, index) => {
        const targetWidth = targetWidths[index] || "100%";
        timeline.add(
          animateProgressBar(element as HTMLElement, targetWidth, {
            delay: delay + index * stagger,
            duration,
          }),
          index * stagger
        );
      });
    } else {
      elements.forEach((element, index) => {
        const targetWidth = targetWidths[index] || "100%";
        timeline.add(
          animateProgressBar(element, targetWidth, {
            delay: delay + index * stagger,
            duration,
          }),
          index * stagger
        );
      });
    }

    if (trigger || typeof elements === "string") {
      const scrollTrigger = createScrollTriggerAnimation(
        trigger || elements,
        timeline,
        { start, toggleActions }
      );
      animationsRef.current.push(scrollTrigger);
      return scrollTrigger;
    }

    return timeline;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, []);

  return {
    animateTextOnScroll,
    animateFadeOnScroll,
    animateSlideLeftOnScroll,
    animateSlideRightOnScroll,
    animateScaleOnScroll,
    animateProgressOnScroll,
    cleanup,
  };
};
