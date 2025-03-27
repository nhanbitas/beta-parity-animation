import React, { useCallback, useState, useEffect } from "react";

interface AnimationProps {
    children: React.ReactElement;
    className?: string;
    onEnter?: () => void;
    onExit?: () => void;
    onExited?: () => void;
    onExiting?: () => void;
    onEntering?: () => void;
    onEntered?: () => void;
    timeout?: number | { enter?: number; exit?: number };
    appear?: boolean;
    in?: boolean;
    mountOnEnter?: boolean;
    unmountOnExit?: boolean;
    easing?: string;
    direction?: "normal" | "reverse" | "alternate" | "alternate-reverse";
    delay?: number;
    duration?: number;
    iterationCount?: number | "infinite";
    fillMode?: "none" | "forwards" | "backwards" | "both";
}

export const Animation: React.FC<AnimationProps> = ({
    children,
    className: initialClassName,
    onEnter,
    onExit,
    onExited,
    onExiting,
    onEntering,
    onEntered,
    timeout = 300,
    in: inProp = false,
    appear = false,
    mountOnEnter = false,
    unmountOnExit = false,
    easing = "ease",
    direction = "normal",
    delay = 0,
    duration = 300,
    iterationCount = 1,
    fillMode = "forwards",
    ...props
}) => {
    const [state, setState] = useState<"entering" | "entered" | "exiting" | "exited">(inProp ? "entered" : "exited");

    useEffect(() => {
        if (inProp) {
            setState("entering");
            onEntering?.();
            const timer = setTimeout(
                () => {
                    setState("entered");
                    onEntered?.();
                },
                typeof timeout === "number" ? timeout : timeout.enter || 300
            );
            return () => clearTimeout(timer);
        } else {
            setState("exiting");
            onExiting?.();
            const timer = setTimeout(
                () => {
                    setState("exited");
                    onExited?.();
                },
                typeof timeout === "number" ? timeout : timeout.exit || 300
            );
            return () => clearTimeout(timer);
        }
    }, [inProp, timeout, onEntering, onEntered, onExiting, onExited]);

    const getClassName = useCallback(() => {
        const baseClassName = children.props.className || "";
        const animationClass = `${initialClassName || ""} animation-${state}`;
        return `${baseClassName} ${animationClass}`.trim();
    }, [children.props.className, initialClassName, state]);

    if (state === "exited" && unmountOnExit) {
        return null;
    }

    if (state === "entering") {
        onEnter?.();
    }

    if (state === "exiting") {
        onExit?.();
    }

    const newProps = {
        ...children.props,
        ...props,
        className: getClassName(),
        style: {
            ...children.props.style,
            transition: `all ${typeof timeout === "number" ? timeout : timeout.enter}ms ${easing}`,
            animationDirection: direction,
            animationDelay: `${delay}ms`,
            animationDuration: `${duration}ms`,
            animationIterationCount: iterationCount,
            animationFillMode: fillMode,
        },
    };

    return React.cloneElement(children, newProps);
};
