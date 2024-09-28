export const SUPPORTED_PLATFORMS = ['darwin', 'linux', 'windows'];
export const SUPPORTED_ARCHS = ['x64', 'arm64'];

export function isValidVersionFormat(version: string) {
  if (['latest', 'canary'].includes(version)) {
    return true;
  }

  if (/^v\d+\.\d+\.\d+$/.test(version)) {
    return true;
  }

  return false;
}

export function isValidPlatform(platform: string) {
  return SUPPORTED_PLATFORMS.includes(platform);
}

export function isValidArch(arch: string) {
  return SUPPORTED_ARCHS.includes(arch);
}
