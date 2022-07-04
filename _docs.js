#!/usr/bin/env node
import markdown from 'markdown-it'
import fse from 'fs-extra'
import path from 'node:path'

const filename = 'all-dockerfile.md';
const exists = await fse.pathExists(filename);
if (!exists) throw new Error(JSON.stringify(filename) + ' not exists')

await fse.mkdirp('dist');
const mdContent = await fse.readFile(filename, 'utf8');

const md = markdown();
const html = md.render(mdContent);

const template = await fse.readFile('_doc-template.html', 'utf8');
const rendered = template.replace(/__OUTPUT__/gm, html);

await fse.writeFile(path.join('dist', 'index.html'), rendered);

