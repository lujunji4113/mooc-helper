import { Parser } from "htmlparser2";

export const clearInlineStyle = (str: string) => {
  let keyIndex = 0;
  const contents: JSX.Element[] = [];
  const parser = new Parser({
    ontext(text) {
      contents.push(<span key={`text-${keyIndex++}`}>{text}</span>);
    },
    onattribute(name, value) {
      if (name === "src") {
        // eslint-disable-next-line @next/next/no-img-element
        contents.push(<img key={value} src={value} alt={value} />);
      }
    },
  });
  parser.write(str);
  parser.end();
  return contents;
};
