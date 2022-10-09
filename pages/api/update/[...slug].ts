import got from "got";
import type { NextApiRequest, NextApiResponse } from "next";

const platformSuffixMap: Record<string, string> = {
  darwin: ".app.tar.gz",
  linux: ".AppImage.tar.gz",
  win64: ".msi.zip",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug } = req.query;
  const [target, currentVersion] = slug;

  if (target) {
    const suffix = platformSuffixMap[target ?? ""];
    if (suffix) {
      const releases = await got(
        "https://api.github.com/repos/xiaolu-lujunji/mooc-helper/releases"
      ).json<
        [
          {
            tag_name: string;
            body: string;
            draft: boolean;
            prerelease: boolean;
            published_at: string;
            assets: [
              {
                name: string;
                browser_download_url: string;
              }
            ];
          }
        ]
      >();

      const latestRelease = releases.find(
        (item: any) => !item.draft && !item.prerelease
      );

      if (latestRelease) {
        const version = latestRelease.tag_name.slice(1);
        if (version !== currentVersion) {
          const binaryAsset = latestRelease.assets.find((e: any) =>
            e.name.endsWith(suffix)
          );
          const sigAsset = latestRelease.assets.find((e: any) =>
            e.name.endsWith(`${suffix}.sig`)
          );
          if (binaryAsset && sigAsset) {
            const sigContent = await got(sigAsset.browser_download_url).text();

            res.status(200).json({
              url: binaryAsset.browser_download_url,
              version,
              notes: latestRelease.body,
              pub_date: latestRelease.published_at,
              signature: sigContent,
            });

            return;
          }
        }
      }
    }
  }

  res.status(204).end();
}
