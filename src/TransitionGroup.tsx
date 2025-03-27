import React, { useState } from "react";

type TransitionGroupProps = {
    children: React.ReactNode;
};

export const TransitionGroup: React.FC<TransitionGroupProps> = ({ children }) => {
    const [items, setItems] = useState(React.Children.toArray(children));

    React.useEffect(() => {
        setItems(React.Children.toArray(children));
    }, [children]);

    return <>{items}</>;
};
