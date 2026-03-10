import { horizontalLoop } from '@andresclua/infinite-marquee-gsap';

export default class InfiniteMarquee {
  DOM: { element: HTMLElement };
  speed: number;
  direction: 'left-to-right' | 'right-to-left';
  controlsOnHover: boolean;
  wasReversed: boolean = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loop: any;

  constructor(payload: {
    element: HTMLElement;
    speed?: number;
    direction?: 'left-to-right' | 'right-to-left';
    controlsOnHover?: boolean;
    paddingRight?: string | number;
  }) {
    const { element, speed, direction, controlsOnHover, paddingRight } =
      payload;
    this.DOM = {
      element: element,
    };
    this.speed = speed === undefined ? 1 : speed;
    this.direction =
      direction === undefined || direction === null
        ? 'left-to-right'
        : direction;
    this.controlsOnHover =
      controlsOnHover === undefined ? false : controlsOnHover;
    // Add custom paddingRight to the instance
    (this as any).paddingRight = paddingRight;
    this.init();
    this.events();
  }

  events() {
    if (this.controlsOnHover) {
      this.DOM.element.addEventListener('mouseenter', () => this.loop.pause());
      this.DOM.element.addEventListener('mouseleave', () => {
        if (this.wasReversed) {
          this.loop.reverse();
        } else {
          this.loop.play();
        }
      });
    }
  }

  init() {
    const reversed = this.direction === 'right-to-left';
    this.wasReversed = reversed;

    // horizontalLoop expects an Array of HTMLElements.
    const children = Array.from(this.DOM.element.children) as HTMLElement[];

    this.loop = horizontalLoop(children, {
      paused: false,
      repeat: -1,
      reversed: reversed,
      speed: this.speed,
    });
  }

  destroy() {
    this.speed = 1;
    if (this.loop) {
      this.loop.kill(); // clear() might not be available depending on GSAP version, kill() is standard
    }
  }

  pause() {
    if (this.loop) this.loop.pause();
  }

  play() {
    if (!this.loop) return;
    if (this.wasReversed) {
      this.loop.reverse();
    } else {
      this.loop.play();
    }
  }
}
