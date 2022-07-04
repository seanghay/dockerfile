#!/usr/bin/env node
import fg from "fast-glob";
import fs from "fs/promises";
import path from "path";
import mkdirp from "mkdirp";

const workflowDir = path.resolve(".github/workflows/");
const template = await fs.readFile("_ci-template.yml", "utf-8");
const files = await fg(["*/**/*Dockerfile", "!bin/**"]);

await mkdirp(workflowDir);

let markdown = '';

for (const file of files) {
  const code = await fs.readFile(file, 'utf-8');
  const p = path.parse(file);
  const projectId = p.dir;
  const rendered = template
    .replace(/__PROJECT_ID__/gm, projectId)
    .replace(/__PATH__/gm, file);

  const filename = `${projectId}.yml`;
  const outputPath = path.join(workflowDir, filename);
  await fs.writeFile(outputPath, rendered);
  console.log(`Generated workflow in ${JSON.stringify(path.relative(process.cwd(), outputPath))}`)

  let block = '';

  block += `## \`${projectId}\`\n\n`
  block += `\n[![${projectId}](https://github.com/seanghay/dockerfile/actions/workflows/${projectId}.yml/badge.svg)](https://github.com/seanghay/dockerfile/actions/workflows/${projectId}.yml)\n`

  block += `__LINK__`

  block += "\n#### Download via npm\n"
  block += `\n\`\`\`\nnpm init dockerfile@latest ${projectId}\n\`\`\`\n\n`;

  block += "\n#### Dockerfile\n\n"
  block += '```dockerfile\n'
  block += code
  block += '\n\n```\n'
  block += '\n\n'
  block += '---\n\n'

  markdown += block.replace(/__LINK__/gm, "\n[View](./vite-html/)\n\n");

  const readmeFile = path.join(path.resolve(p.dir), 'readme.md');

  await fs.writeFile(readmeFile, block.replace(/__LINK__/gm, ''))


}

await fs.writeFile('all-dockerfile.md', markdown);