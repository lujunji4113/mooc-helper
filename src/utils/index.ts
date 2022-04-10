import { clearStyle } from "clear-style";
import parse from "html-react-parser";
import { ElementType } from "htmlparser2";

export const strToElement = (str: string) => {
  return parse(clearStyle(str), {
    replace(domNode) {
      if (domNode.type === ElementType.Tag && domNode.name === "p") {
        domNode.name = "span";
      }
      return domNode;
    },
  });
};
