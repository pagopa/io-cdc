import { SvgIconProps } from "@mui/material/SvgIcon";

import IconAlertCheckCircle from "./svg/IconAlertCheckCircle";
import IconArrowBack from "./svg/IconArrowBack";
import IconArrowCircleLeftBold from "./svg/IconArrowCircleLeftBold";
import IconArrowCircleRightBold from "./svg/IconArrowCircleRightBold";
import IconChevronLeft from "./svg/IconChevronLeft";
import IconChevronRight from "./svg/IconChevronRight";
import IconClose from "./svg/IconClose";
import IconCloseCircle from "./svg/IconCloseCircle";
import IconCopy from "./svg/IconCopy";
import IconEnte from "./svg/IconEnte";
import IconError from "./svg/IconError";
import IconEuro from "./svg/IconEuro";
import IconExpandUp from "./svg/IconExpandUp";
import IconHelp from "./svg/IconHelp";
import IconHourglass from "./svg/IconHourglass";
import IconInfoOutlined from "./svg/IconInfoOutlined";
import IconInitiativeExpired from "./svg/IconInitiativeExpired";
import IconKey from "./svg/IconKey";
import IconParty from "./svg/IconParty";
import IconPeople from "./svg/IconPeople";
import IconQuestionMarker from "./svg/IconQuestionMarker";
import IconRequestedAllYears from "./svg/IconRequestedAllYears";
import IconStore from "./svg/IconStore";
import IconTicket from "./svg/IconTicket";
import IconTimeout from "./svg/IconTimeout";
import IconUmbrella from "./svg/IconUmbrella";

export const Icons = {
  alertCheckCircle: IconAlertCheckCircle,
  allYearsRequested: IconRequestedAllYears,
  arrowCircleLeftBold: IconArrowCircleLeftBold,
  arrowCircleRightBold: IconArrowCircleRightBold,
  back: IconArrowBack,
  chevronLeft: IconChevronLeft,
  chevronRight: IconChevronRight,
  close: IconClose,
  closeCircle: IconCloseCircle,
  copy: IconCopy,
  ente: IconEnte,
  error: IconError,
  euro: IconEuro,
  expandUp: IconExpandUp,
  help: IconHelp,
  hourglass: IconHourglass,
  info: IconInfoOutlined,
  initiativeExpired: IconInitiativeExpired,
  key: IconKey,
  party: IconParty,
  people: IconPeople,
  question: IconQuestionMarker,
  store: IconStore,
  ticket: IconTicket,
  timeout: IconTimeout,
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
