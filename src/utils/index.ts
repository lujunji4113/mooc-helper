import { clearStyle } from "clear-style";
import parse from "html-react-parser";
import { ElementType } from "htmlparser2";

export const strToElement = (str: string) => {
  return parse(clearStyle(str), {
    replace(domNode) {
      // @ts-ignore
      if (domNode.type === ElementType.Tag && domNode.name === "p") {
        // @ts-ignore
        domNode.name = "span";
      }
      return domNode;
    },
  });
};
