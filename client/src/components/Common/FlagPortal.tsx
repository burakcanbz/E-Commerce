import ReactDOM from "react-dom";
import { FlagPortalProps } from "../../types/components";

const FlagPortal = ({ render, id }: FlagPortalProps) => {
  const portalRoot = document.getElementById(id);
  if (!portalRoot) return null;

  return ReactDOM.createPortal(
    <div className="d-none d-xxl-block">{render()}</div>,
    portalRoot
  );
};

export default FlagPortal;
