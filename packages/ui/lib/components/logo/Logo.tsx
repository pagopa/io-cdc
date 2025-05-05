import { LogoIPatente } from "./svg/LogoIPatente";
import { LogoInitiativeExpired } from "./svg/LogoInitiativeExpired";

export const Logos = {
  initiativeExpired: LogoInitiativeExpired,
  ipatente: LogoIPatente,
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
