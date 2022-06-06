import type { HTMLReactParserOptions, Element } from "html-react-parser";
import * as React from "react";
// import Image from "next/image";
import parse, { domToReact } from "html-react-parser";

// const regExp = /width: (?<width>[1-9]+)px; height: (?<height>[1-9]+)px;/;

// https://github.com/lujunji-xiaolu/mooc-helper/issues/10
const rewriteAddressMap = new Map([
  [/img[0-2]\.ph\.126\.net/g, "img-ph-mirror.nosdn.127.net"],
]);

const parseStyles = (styles: string = ""): { [key: string]: string } => {
  return styles
    .split(";")
    .filter((style) => style.split(":").length === 2)
    .map((style) => [
      style
        .split(":")[0]
        .trim()
        .replace(/-./g, (c) => c.substring(1).toUpperCase()),
      style.split(":")[1].trim(),
    ])
    .reduce(
      (styleObj, style) => ({
        ...styleObj,
        [style[0]]: style[1],
      }),
      {}
    );
};

const options: HTMLReactParserOptions = {
  replace(domNode) {
    if (domNode.type === "tag" && (domNode as Element).tagName === "span") {
      const { attribs, children } = domNode as Element;
      return (
        <span style={parseStyles(attribs.style)}>
          {domToReact(children, options)}
        </span>
      );
    }
    if (domNode.type === "tag" && (domNode as Element).tagName === "p") {
      const { attribs, children } = domNode as Element;
      return (
        <span style={{ margin: "16px 0", ...parseStyles(attribs.style) }}>
          {domToReact(children, options)}
        </span>
      );
    }
    // if (domNode.type === "tag" && (domNode as Element).tagName === "img") {
    //   const { attribs } = domNode as Element;
    //   const execArray = regExp.exec(attribs.style);
    //   if (execArray && execArray.groups) {
    //     const width = window.parseInt(execArray.groups.width, 10);
    //     const height = window.parseInt(execArray.groups.height, 10);
    //     return <Image src={attribs.src} alt="" width={width} height={height} />;
    //   }
    // }
  },
};

export default function HTML({ html }: { html: string }) {
  for (const [searchValue, replaceValue] of rewriteAddressMap) {
    html = html.replaceAll(searchValue, replaceValue);
  }

  return <>{parse(html, options)}</>;
}
