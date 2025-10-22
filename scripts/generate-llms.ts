/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ensureDir, readFile, writeFile } from 'fs-extra';
import { glob } from 'glob';

import { resolve, join } from 'path';

/**
 * @see https://github.com/ant-design/ant-design/blob/master/scripts/generate-llms.ts
 */
export async function generateLLms(): Promise<void> {
  const cwd = process.cwd();
  const siteDir = resolve(cwd, 'site', 'doc');
  const docsDir = ['components', 'docs'];

  const matchSuffix = '.en-US.md';

  // Ensure siteDir
  await ensureDir(siteDir);

  const docs = await glob(`{${docsDir.join(',')}}/**/*.md`);
  const ignoreDocs = ['changelog', 'join', 'migration', 'recommendation'];
  const filteredDocs = docs.filter(doc => doc.includes(matchSuffix) && !ignoreDocs.some(title => doc.includes(title)));

  const docsIndex: Array<{ title: string; url: string }> = [];
  const docsBody: string[] = [];

  for (const markdown of filteredDocs) {
    const mdPath = join(cwd, markdown);

    const fsContent = (await readFile(mdPath, 'utf-8')).trim();

    // e.g. title: Button -> Button
    const title = fsContent.match(/title:\s*(.*)/)?.[1].trim();

    if (!title) {
      console.log('MISS title, ignore:', mdPath);
      continue;
    }

    // URL
    let url = `https://ng.ant.design/${markdown.replace(matchSuffix, '')}/en`;
    if (url.includes('/components/')) {
      url = url.replace('/doc/index', '');
    }

    // Docs: title
    docsIndex.push({
      title,
      url
    });

    // Docs: content
    const parsedContent = fsContent.replace(/^---[\s\S]*?---\n/, '').trim();

    const fullContent = [
      // Title
      '---',
      `Title: ${title}`,
      `URL: ${url}`,
      '---',
      '',
      // Content
      parsedContent,
      ''
    ].join('\n');

    docsBody.push(fullContent);
  }
  const docsIndexContent = [
    '# ng-zorro-antd - Ant Design of Angular',
    '',
    '- An enterprise-class Angular UI component library based on Ant Design, which aims to provide a high-quality design language and development framework for enterprise-level backend management systems. It offers a rich set of components and design guidelines, helping developers build modern, responsive, and high-performance web applications.\n' +
      '',
    '## Docs',
    '',
    ...docsIndex.map(({ title, url }) => `- [${title}](${url})`),
    ''
  ].join('\n');

  const docsBodyContent = docsBody.join('\n');

  await writeFile(join(siteDir, 'llms.txt'), docsIndexContent);
  await writeFile(join(siteDir, 'llms-full.txt'), docsBodyContent);
  console.log('Generated llms.txt and llms-full.txt');
}

(async () => {
  if (require.main === module) {
    await generateLLms();
  }
})().catch(e => {
  console.error(e);
  process.exit(1);
});
