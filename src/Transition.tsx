import React, { useEffect, useState } from "react";

type TransitionProps = {
    in: boolean;
    timeout: number;
    onEnter?: () => void;
    onEntering?: () => void;
    onEntered?: () => void;
    onExit?: () => void;
    onExiting?: () => void;
    onExited?: () => void;
    children: React.ReactNode;
};

export const Transition: React.FC<TransitionProps> = ({
    in: inProp,
    timeout,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    children,
}) => {
    const [status, setStatus] = useState<"entering" | "entered" | "exiting" | "exited">(inProp ? "entering" : "exited");

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (inProp) {
            if (status === "exited") {
                onEnter?.();
                setStatus("entering");
                timer = setTimeout(() => {
                    onEntering?.();
                    setStatus("entered");
                    onEntered?.();
                }, timeout);
            }
        } else {
            if (status === "entered") {
                onExit?.();
                setStatus("exiting");
                timer = setTimeout(() => {
                    onExiting?.();
                    setStatus("exited");
                    onExited?.();
                }, timeout);
            }
        }

        return () => clearTimeout(timer);
    }, [inProp, status, timeout, onEnter, onEntering, onEntered, onExit, onExiting, onExited]);

    return <>{status !== "exited" && children}</>;
};
