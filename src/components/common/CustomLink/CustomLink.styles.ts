import { CustomLinkTypes } from "./CustomLink.types";

const primaryLinkStyles =
  "bg-primary-color text-white font-semibold text-sm sm:text-base text-center px-8 py-2 rounded-md hover:bg-[#0025e2] !no-underline";

const secondaryLinkStyles = "";

export const customLinkStyles = Object.freeze({
  [CustomLinkTypes.PRIMARY]: primaryLinkStyles,
  [CustomLinkTypes.SECONDARY]: secondaryLinkStyles,
});
