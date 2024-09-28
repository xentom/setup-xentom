import * as core from '@actions/core';
import { setup } from './setup';

setup({
  version: core.getInput('version') ?? 'latest',
})
  .then((metadata) => {
    core.info('Setup complete.');
    core.setOutput('version', metadata.version);
    core.setOutput('download-url', metadata.downloadUrl);
    core.setOutput('path', metadata.path);
    process.exit(0);
  })
  .catch((error) => {
    core.setFailed(error);
    process.exit(1);
  });
