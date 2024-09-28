import * as os from 'node:os';
import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';
import {
  isValidArch,
  isValidPlatform,
  isValidVersionFormat,
  SUPPORTED_ARCHS,
  SUPPORTED_PLATFORMS,
} from './validation';

export interface SetupOptions {
  version: string;
}

export async function setup(options: SetupOptions) {
  if (!isValidVersionFormat(options.version)) {
    throw new Error(
      `The version format "${options.version}" is invalid. Please use "vX.X.X" (e.g., "v1.2.3"), "latest", or "canary". For available releases, visit: https://github.com/xentom/cli/releases.`,
    );
  }

  const downloadUrl = getDownloadUrl(options.version);

  core.info(`Downloading Xentom CLI from: ${downloadUrl}`);
  const zipPath = await tc.downloadTool(downloadUrl);

  core.info('Extracting Xentom CLI...');
  const zipOutputPath = await tc.extractZip(zipPath, 'tools/xentom');

  core.info('Adding Xentom CLI to the PATH...');
  core.addPath(zipOutputPath);

  return {
    version: options.version,
    downloadUrl: downloadUrl,
    path: zipOutputPath,
  };
}

function getDownloadUrl(version: string) {
  const platform = os.platform() === 'win32' ? 'windows' : os.platform();
  if (!isValidPlatform(platform)) {
    throw new Error(
      `The platform "${platform}" is not supported. Supported platforms are: ${SUPPORTED_PLATFORMS.join(
        ', ',
      )}.`,
    );
  }

  const arch = os.arch();
  if (!isValidArch(arch)) {
    throw new Error(
      `The architecture "${arch}" is not supported. Supported architectures are: ${SUPPORTED_ARCHS.join(
        ', ',
      )}.`,
    );
  }

  const filename = `xentom-${platform}-${arch}.zip`;
  switch (version) {
    case 'latest':
      return `https://github.com/xentom/cli/releases/latest/download/${filename}`;
    case 'canary':
      return `https://github.com/xentom/cli/releases/download/canary/${filename}`;
    default:
      return `https://github.com/xentom/cli/releases/download/v${version}/${filename}`;
  }
}
