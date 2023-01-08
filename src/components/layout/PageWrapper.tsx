import React from "react";
import { ReactNode } from "react";

type Props = {
    state?: string,
    children: ReactNode
}

const PageWrapper = (props: Props) => {
    return (
       <>{props.children}</> 
    );
};

export default PageWrapper;

