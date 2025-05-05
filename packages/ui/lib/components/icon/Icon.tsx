import { SvgIconProps } from "@mui/material/SvgIcon";

import IconArrowCircleLeftBold from "./svg/IconArrowCircleLeftBold";
import IconArrowCircleRightBold from "./svg/IconArrowCircleRightBold";
import IconCloseCircle from "./svg/IconCloseCircle";
import IconError from "./svg/IconError";
import IconExpandUp from "./svg/IconExpandUp";
import IconParty from "./svg/IconParty";

export const Icons = {
  arrowCircleLeftBold: IconArrowCircleLeftBold,
  arrowCircleRightBold: IconArrowCircleRightBold,
  closeCircle: IconCloseCircle,
  error: IconError,
  expandUp: IconExpandUp,
  party: IconParty,
} as const;

export type IconType = keyof typeof Icons;

export type IconProps = {
  name: IconType;
} & SvgIconProps;

export const Icon = ({ name, ...props }: IconProps) => {
  const IconElement = Icons[name];
  return <IconElement {...props} />;
};
