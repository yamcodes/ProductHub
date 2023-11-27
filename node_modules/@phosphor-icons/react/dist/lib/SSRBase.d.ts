import { ReactElement } from "react";
import { IconProps, IconWeight } from "./types";
interface IconBaseProps extends IconProps {
    weights: Map<IconWeight, ReactElement>;
}
declare const SSRBase: import("react").ForwardRefExoticComponent<Omit<IconBaseProps, "ref"> & import("react").RefAttributes<SVGSVGElement>>;
export default SSRBase;
