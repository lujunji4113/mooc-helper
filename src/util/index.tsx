import { Parser } from "htmlparser2";

export const clearInlineStyle = (str: string) => {
  let res = "";
  const imgUrls: string[] = [];
  const parser = new Parser({
    ontext(text) {
      res += text;
    },
    onattribute(name, value) {
      if (name === "src") {
        imgUrls.push(value);
      }
    },
  });
  parser.write(str);
  parser.end();
  if (imgUrls.length > 0) {
    // eslint-disable-next-line @next/next/no-img-element
    return imgUrls.map((url) => <img key={url} src={url} alt={url} />);
  }
  return res;
};
