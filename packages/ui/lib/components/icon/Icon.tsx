import { SvgIconProps } from "@mui/material/SvgIcon";

import IconArrowCircleLeftBold from "./svg/IconArrowCircleLeftBold";
import IconArrowCircleRightBold from "./svg/IconArrowCircleRightBold";
import IconCloseCircle from "./svg/IconCloseCircle";
import IconError from "./svg/IconError";
import IconExpandUp from "./svg/IconExpandUp";
import IconInitiativeExpired from "./svg/IconInitiativeExpired";
import IconParty from "./svg/IconParty";
import IconRequestedAllYears from "./svg/IconRequestedAllYears";
import IconUmbrella from "./svg/IconUmbrella";

export const Icons = {
  allYearsRequested: IconRequestedAllYears,
  arrowCircleLeftBold: IconArrowCircleLeftBold,
  arrowCircleRightBold: IconArrowCircleRightBold,
  closeCircle: IconCloseCircle,
  error: IconError,
  expandUp: IconExpandUp,
  initiativeExpired: IconInitiativeExpired,
  party: IconParty,
  umbrella: IconUmbrella,
} as const;

export type IconType = keyof typeof Icons;

export type IconProps = {
  name: IconType;
} & SvgIconProps;

export const Icon = ({ name, ...props }: IconProps) => {
  const IconElement = Icons[name];
  return <IconElement {...props} />;
};
