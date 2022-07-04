#!/usr/bin/env node
import fg from "fast-glob";
import fs from "fs/promises";
import path from "path";
import mkdirp from "mkdirp";

const workflowDir = path.resolve(".github/workflows/");
const template = await fs.readFile("_ci-template.yml", "utf-8");
const files = await fg("**/*/*Dockerfile");

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

  markdown += `## \`${projectId}\`\n\n`
  markdown += `\n[![${projectId}](https://github.com/seanghay/dockerfile/actions/workflows/${projectId}.yml/badge.svg)](https://github.com/seanghay/dockerfile/actions/workflows/${projectId}.yml)\n`
  markdown += '```dockerfile\n'
  markdown += code
  markdown += '\n\n```\n'
  markdown += '\n\n'
  markdown += '---\n\n'
}

await fs.writeFile('all-dockerfile.md', markdown);

