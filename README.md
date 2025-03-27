# Parity Animation

A lightweight React animation library for managing component transitions.

## Installation

```bash
npm install beta-parity-animation
# or
yarn add beta-parity-animation
```

## Components

### 1. Transition

Basic transition component that manages component mounting/unmounting with callbacks.

```jsx
import { Transition } from 'beta-parity-animation';

function Example() {
  const [show, setShow] = useState(false);

  return (
    <>
      <button onClick={() => setShow(!show)}>Toggle</button>
      <Transition
        in={show}
        timeout={300}
        onEnter={() => console.log('enter')}
        onEntered={() => console.log('entered')}
        onExit={() => console.log('exit')}
        onExited={() => console.log('exited')}
      >
        <div>I will animate</div>
      </Transition>
    </>
  );
}
```

### 2. CSSTransition

Applies CSS classes during different transition phases.

```jsx
import { CSSTransition } from 'beta-parity-animation';

function Example() {
  const [show, setShow] = useState(false);

  return (
    <>
      <button onClick={() => setShow(!show)}>Toggle</button>
      <CSSTransition
        in={show}
        timeout={300}
        classNames="fade"
      >
        <div>I will fade</div>
      </CSSTransition>
    </>
  );
}
```

Required CSS:
```css
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  opacity: 1;
  transition: opacity 300ms ease-in;
}
.fade-exit {
  opacity: 1;
}
.fade-exit-active {
  opacity: 0;
  transition: opacity 300ms ease-out;
}
```

### 3. TransitionGroup

Manages a list of Transition or CSSTransition components.

```jsx
import { TransitionGroup, CSSTransition } from 'beta-parity-animation';

function List({ items }) {
  return (
    <TransitionGroup>
      {items.map(item => (
        <CSSTransition
          key={item.id}
          timeout={300}
          classNames="item"
        >
          <div>{item.text}</div>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}
```

### Predefined Transitions

The library comes with built-in transitions that you can use out of the box:

1. **Fade** - opacity transition
```jsx
<CSSTransition
  in={show}
  timeout={300}
  classNames="fade"
>
  <div>Fade transition</div>
</CSSTransition>
```

2. **Slide** - horizontal slide transition
```jsx
<CSSTransition
  in={show}
  timeout={300}
  classNames="slide"
>
  <div>Slide transition</div>
</CSSTransition>
```

3. **Scale** - scale transition with easing
```jsx
<CSSTransition
  in={show}
  timeout={300}
  classNames="scale"
>
  <div>Scale transition</div>
</CSSTransition>
```

## API Reference

### Transition Props

| Prop | Type | Description |
|------|------|-------------|
| in | boolean | Shows/hides the component |
| timeout | number | Duration of the transition in milliseconds |
| onEnter | () => void | Callback when enter starts |
| onEntering | () => void | Callback during enter |
| onEntered | () => void | Callback when enter completes |
| onExit | () => void | Callback when exit starts |
| onExiting | () => void | Callback during exit |
| onExited | () => void | Callback when exit completes |

### CSSTransition Props

| Prop | Type | Description |
|------|------|-------------|
| in | boolean | Shows/hides the component |
| timeout | number | Duration of the transition |
| classNames | string | Base CSS class for transitions |

### TransitionGroup Props

| Prop | Type | Description |
|------|------|-------------|
| children | ReactNode | Transition/CSSTransition components |

## How It Works

### Core Concepts

1. **State Machine**
   - The `Transition` component uses a state machine with four states:
     - `entering`: Initial state when component appears
     - `entered`: Component has finished appearing
     - `exiting`: Component is about to disappear
     - `exited`: Component has finished disappearing

2. **Lifecycle Flow**
   ```
   [exited] --> [entering] --> [entered] --> [exiting] --> [exited]
   ```

### Component Architecture

1. **Transition Component**
   - Base component that manages state transitions
   - Uses `useEffect` to handle timing of transitions
   - Triggers callbacks at each transition phase
   - Example flow:
   ```js
   when (in = true):
   exited -> onEnter() -> entering -> wait(timeout) -> entered
   
   when (in = false):
   entered -> onExit() -> exiting -> wait(timeout) -> exited
   ```

2. **CSSTransition Component**
   - Builds on `Transition` by adding CSS classes
   - Class naming convention:
   ```
   ${classNames}-enter
   ${classNames}-enter-active
   ${classNames}-enter-done
   ${classNames}-exit
   ${classNames}-exit-active
   ${classNames}-exit-done
   ```
   - Uses React's `Children.only()` to ensure single child

3. **TransitionGroup Component**
   - Manages multiple transition components
   - Tracks children using React's `Children.toArray()`
   - Useful for list animations

### CSS Class Timeline

```
Enter Phase:
1. ${classNames}-enter (immediately)
2. ${classNames}-enter-active (next frame)
3. ${classNames}-enter-done (after timeout)

Exit Phase:
1. ${classNames}-exit (immediately)
2. ${classNames}-exit-active (next frame)
3. ${classNames}-exit-done (after timeout)
```

### Implementation Example

```tsx
// Basic fade animation
const FadeTransition = ({ in: inProp, children }) => (
  <CSSTransition
    in={inProp}
    timeout={300}
    classNames="fade"
  >
    {children}
  </CSSTransition>
);

// Required CSS
.fade-enter { opacity: 0; }
.fade-enter-active {
  opacity: 1;
  transition: opacity 300ms ease-in;
}
.fade-exit { opacity: 1; }
.fade-exit-active {
  opacity: 0;
  transition: opacity 300ms ease-out;
}
```

### Best Practices

1. **Timing**
   - Always match CSS transition duration with `timeout` prop
   - Use the same timing for enter and exit transitions

2. **Performance**
   - Use `transform` and `opacity` for better performance
   - Avoid transitioning layout properties (width, height, etc.)

3. **Debugging**
   - Monitor transition callbacks to understand the flow
   - Check if CSS classes are being applied correctly

## License

MIT
