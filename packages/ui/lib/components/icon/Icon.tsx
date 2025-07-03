import { SvgIconProps } from "@mui/material/SvgIcon";

import IconArrowCircleLeftBold from "./svg/IconArrowCircleLeftBold";
import IconArrowCircleRightBold from "./svg/IconArrowCircleRightBold";
import IconCloseCircle from "./svg/IconCloseCircle";
import IconEnte from "./svg/IconEnte";
import IconError from "./svg/IconError";
import IconEuro from "./svg/IconEuro";
import IconExpandUp from "./svg/IconExpandUp";
import IconInfoOutlined from "./svg/IconInfoOutlined";
import IconInitiativeExpired from "./svg/IconInitiativeExpired";
import IconParty from "./svg/IconParty";
import IconQuestionMarker from "./svg/IconQuestionMarker";
import IconRequestedAllYears from "./svg/IconRequestedAllYears";
import IconUmbrella from "./svg/IconUmbrella";

export const Icons = {
  allYearsRequested: IconRequestedAllYears,
  arrowCircleLeftBold: IconArrowCircleLeftBold,
  arrowCircleRightBold: IconArrowCircleRightBold,
  closeCircle: IconCloseCircle,
  ente: IconEnte,
  error: IconError,
  euro: IconEuro,
  expandUp: IconExpandUp,
  info: IconInfoOutlined,
  initiativeExpired: IconInitiativeExpired,
  party: IconParty,
  question: IconQuestionMarker,
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
