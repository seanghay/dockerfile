#!/usr/bin/env node
import cpy from 'cpy';
import fg from 'fast-glob';
import path from 'node:path'
import fse, { copy } from 'fs-extra'

const files = await fg(['*/**/Dockerfile', '!bin/**'])

for (const file of files) {
  const filename = path.parse(file).dir + '.Dockerfile'
  const dir = path.join('bin', 'files');
  await fse.mkdirp(dir)
  const filePath = path.join(dir, filename);
  await copy(file, filePath)
}