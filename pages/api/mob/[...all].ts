import type { NextApiRequest, NextApiResponse } from "next";
import { createProxyMiddleware } from "http-proxy-middleware";

const proxyMiddleware = createProxyMiddleware({
  target: "https://www.icourse163.org",
  changeOrigin: true,
  pathRewrite: {
    "^/api": "",
  },
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // @ts-ignore
  proxyMiddleware(req, res, (result: unknown) => {
    if (result instanceof Error) {
      throw result;
    }
  });
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
