import { Dot } from "./Dot";
import { Spinner } from "./Spinner";

export const Loader = () => (
  <Spinner>
    {[...Array(8)].map((_, i) => (
      <Dot index={i} key={i} />
    ))}
  </Spinner>
);
