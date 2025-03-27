import React from "react";
import { Transition } from "./Transition";
import "./styles.css";

type TransitionType = "fade" | "slide" | "scale" | string;

type CSSTransitionProps = {
    in: boolean;
    timeout: number;
    classNames: TransitionType;
    children: React.ReactNode;
};

export const CSSTransition: React.FC<CSSTransitionProps> = ({ in: inProp, timeout, classNames, children }) => {
    const child = React.Children.only(children) as React.ReactElement;

    return (
        <Transition
            in={inProp}
            timeout={timeout}
            onEnter={() => (child.props.className = `${classNames}-enter`)}
            onEntering={() => (child.props.className = `${classNames}-enter-active`)}
            onEntered={() => (child.props.className = `${classNames}-enter-done`)}
            onExit={() => (child.props.className = `${classNames}-exit`)}
            onExiting={() => (child.props.className = `${classNames}-exit-active`)}
            onExited={() => (child.props.className = `${classNames}-exit-done`)}
        >
            {child}
        </Transition>
    );
};
