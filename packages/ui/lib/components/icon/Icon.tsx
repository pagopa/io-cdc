import { SvgIconProps } from "@mui/material/SvgIcon";

import IconArrowCircleLeftBold from "./svg/IconArrowCircleLeftBold";
import IconArrowCircleRightBold from "./svg/IconArrowCircleRightBold";
import IconBack from "./svg/IconBack";
import IconClose from "./svg/IconClose";
import IconCloseCircle from "./svg/IconCloseCircle";
import IconCopy from "./svg/IconCopy";
import IconEnte from "./svg/IconEnte";
import IconError from "./svg/IconError";
import IconEuro from "./svg/IconEuro";
import IconExpandUp from "./svg/IconExpandUp";
import IconHelp from "./svg/IconHelp";
import IconInfoOutlined from "./svg/IconInfoOutlined";
import IconInitiativeExpired from "./svg/IconInitiativeExpired";
import IconKey from "./svg/IconKey";
import IconParty from "./svg/IconParty";
import IconPeople from "./svg/IconPeople";
import IconQuestionMarker from "./svg/IconQuestionMarker";
import IconRequestedAllYears from "./svg/IconRequestedAllYears";
import IconStore from "./svg/IconStore";
import IconTicket from "./svg/IconTicket";
import IconUmbrella from "./svg/IconUmbrella";

export const Icons = {
  allYearsRequested: IconRequestedAllYears,
  arrowCircleLeftBold: IconArrowCircleLeftBold,
  arrowCircleRightBold: IconArrowCircleRightBold,
  back: IconBack,
  close: IconClose,
  closeCircle: IconCloseCircle,
  copy: IconCopy,
  ente: IconEnte,
  error: IconError,
  euro: IconEuro,
  expandUp: IconExpandUp,
  help: IconHelp,
  info: IconInfoOutlined,
  initiativeExpired: IconInitiativeExpired,
  key: IconKey,
  party: IconParty,
  people: IconPeople,
  question: IconQuestionMarker,
  store: IconStore,
  ticket: IconTicket,
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
