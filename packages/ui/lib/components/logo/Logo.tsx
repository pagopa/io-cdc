import { LogoRequestCompleted } from "./svg/LogoRequestCompleted";
import { LogoRequestError } from "./svg/LogoRequestError";

export const Logos = {
  requestCompleted: LogoRequestCompleted,
  requestError: LogoRequestError,
} as const;

export type LogoType = keyof typeof Logos;

interface LogoProps {
  name: LogoType;
  size?: number;
  title?: string;
}

export const Logo = ({ name, size = 32, ...props }: LogoProps) => {
  const LogoElement = Logos[name];
  return <LogoElement {...props} size={size} />;
};
