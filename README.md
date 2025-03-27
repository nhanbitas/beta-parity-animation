# Beta Parity Animation

A React component library for creating smooth animations in Parity React applications.

## Installation

```bash
npm install beta-parity-animation
```

## Features

- Simple animation components
- Transition management
- CSS-based animations
- TypeScript support
- Zero dependencies (except React)

## Basic Usage

```tsx
import { Animation } from 'beta-parity-animation';

function MyComponent() {
  return (
    <Animation
      in={true}
      timeout={300}
      className="fade"
      onEntered={() => console.log('Animation completed')}
    >
      <div>Animated Content</div>
    </Animation>
  );
}
```

## Components

### Animation

Main component for handling single element animations.

```tsx
<Animation
  in={boolean}
  timeout={300}
  className="animation-class"
  onEnter={() => {}}
  onExit={() => {}}
>
  <div>Content</div>
</Animation>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| in | boolean | false | Controls the animation state |
| timeout | number \| { enter: number, exit: number } | 300 | Duration of animation |
| className | string | undefined | CSS class for animation |
| onEnter | () => void | undefined | Callback when enter starts |
| onExit | () => void | undefined | Callback when exit starts |
| onEntered | () => void | undefined | Callback when enter completes |
| onExited | () => void | undefined | Callback when exit completes |
| mountOnEnter | boolean | false | Mount component on enter |
| unmountOnExit | boolean | false | Unmount component on exit |
| appear | boolean | false | Animate on first mount |

## Advanced Usage

### CSS Transitions

```tsx
import { CSSTransition } from 'beta-parity-animation';

<CSSTransition
  in={isVisible}
  timeout={300}
  classNames="fade"
>
  <div>Fade Content</div>
</CSSTransition>
```

### Transition Groups

```tsx
import { TransitionGroup } from 'beta-parity-animation';

<TransitionGroup>
  {items.map(item => (
    <Animation key={item.id}>
      <div>{item.content}</div>
    </Animation>
  ))}
</TransitionGroup>
```

## CSS Classes

Import the base CSS styles:

```tsx
import 'beta-parity-animation/dist/animation.css';
```

### Available Animation Classes

#### Base Animation States
- `animation-entering`: Initial state when element enters
- `animation-entered`: Final state after entering
- `animation-exiting`: State during exit animation
- `animation-exited`: Final state after exiting

#### Example CSS for Base Animation States

```css
.animation-entering {
  opacity: 0;
  transform: translateY(20px);
}

.animation-entered {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 300ms ease-in-out, transform 300ms ease-in-out;
}

.animation-exiting {
  opacity: 0;
  transform: translateY(-20px);
  transition: opacity 300ms ease-in-out, transform 300ms ease-in-out;
}

.animation-exited {
  opacity: 0;
  display: none;
}
```

#### Fade Animation
```tsx
<Animation className="fade">
  <div>Fade animation</div>
</Animation>
```

#### Slide Animation
```tsx
<Animation className="slide">
  <div>Slide animation</div>
</Animation>
```

## License

ISC © Bitas Labs
