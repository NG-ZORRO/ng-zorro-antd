/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ensureDir, readFileSync, writeFile } from 'fs-extra';
import { glob } from 'glob';

import { resolve, join } from 'path';

interface DocItem {
  title: string;
  url: string;
  category: 'docs' | 'components';
  content?: string;
}

interface ProcessResult {
  docs: DocItem[];
  components: DocItem[];
}

/**
 * @see https://github.com/ant-design/ant-design/blob/master/.dumi/theme/plugins/llms.ts
 */
export async function generateLLms(): Promise<void> {
  const cwd = process.cwd();
  const siteDir = resolve(cwd, 'site');
  const docsDir = ['components', 'docs'];

  const ignoreDocs = ['changelog', 'join', 'migration', 'recommendation'];

  // Ensure siteDir
  await ensureDir(siteDir);

  // Process English docs
  const englishDocs = await glob(`{${docsDir.join(',')}}/**/*.en-US.md`);
  const englishResult: ProcessResult = processDocs(englishDocs, ignoreDocs, cwd, 'en');

  // Process Chinese docs
  const chineseDocs = await glob(`{${docsDir.join(',')}}/**/*.zh-CN.md`);
  const chineseResult: ProcessResult = processDocs(chineseDocs, ignoreDocs, cwd, 'cn');

  // Sort by title
  englishResult.docs.sort((a, b) => a.title.localeCompare(b.title));
  englishResult.components.sort((a, b) => a.title.localeCompare(b.title));
  chineseResult.docs.sort((a, b) => a.title.localeCompare(b.title));
  chineseResult.components.sort((a, b) => a.title.localeCompare(b.title));

  // Generate llms.txt (navigation)
  const llmsNavContent = generateNavigationContent(englishResult, chineseResult);

  // Generate llms-full.txt (English content)
  const englishFullContent = generateFullContent(englishResult, 'en');

  // Generate llms-full-cn.txt (Chinese content)
  const chineseFullContent = generateFullContent(chineseResult, 'cn');

  await writeFile(join(siteDir, 'llms.txt'), llmsNavContent);
  await writeFile(join(siteDir, 'llms-full.txt'), englishFullContent);
  await writeFile(join(siteDir, 'llms-full-cn.txt'), chineseFullContent);
  console.log(
    `Generated llms.txt, llms-full.txt (${englishResult.components.length} components), llms-full-cn.txt (${chineseResult.components.length} components)`
  );
}

function processDocs(docs: string[], ignoreDocs: string[], cwd: string, lang: 'en' | 'cn'): ProcessResult {
  const result: ProcessResult = {
    docs: [],
    components: []
  };

  const matchSuffix = lang === 'en' ? '.en-US.md' : '.zh-CN.md';

  for (const markdown of docs) {
    if (ignoreDocs.some(title => markdown.includes(title))) {
      continue;
    }

    const mdPath = join(cwd, markdown);
    const fsContent = readFileSync(mdPath, 'utf-8').trim();

    // For Chinese docs, use subtitle field; for English docs, use title field
    let title: string | undefined;
    if (lang === 'cn') {
      title = fsContent.match(/subtitle:\s*(.*)/)?.[1].trim();
    }
    // Fallback to title if subtitle not found
    if (!title) {
      title = fsContent.match(/title:\s*(.*)/)?.[1].trim();
    }

    if (!title) {
      continue;
    }

    // Check if experimental component
    const isExperimental = /experimental:\s*true/.test(fsContent);
    if (isExperimental) {
      title = lang === 'cn' ? `${title}（实验性）` : `${title} (Experimental)`;
    }

    // Generate URL
    let url = `https://ng.ant.design/${markdown.replace(matchSuffix, '')}/${lang === 'en' ? 'en' : 'cn'}`;
    if (url.includes('/components/')) {
      url = url.replace('/doc/index', '');
    }

    // Parse content (remove frontmatter)
    const parsedContent = fsContent.replace(/^---[\s\S]*?---\n/, '').trim();

    const docItem: DocItem = {
      title,
      url,
      category: markdown.startsWith('components/') ? 'components' : 'docs',
      content: parsedContent
    };

    // Categorize
    if (markdown.startsWith('components/')) {
      result.components.push(docItem);
    } else {
      result.docs.push(docItem);
    }
  }

  return result;
}

function generateNavigationContent(englishResult: ProcessResult, chineseResult: ProcessResult): string {
  return [
    '# ng-zorro-antd - Ant Design of Angular',
    '',
    '- An enterprise-class Angular UI component library based on Ant Design, which aims to provide a high-quality design language and development framework for enterprise-level backend management systems. It offers a rich set of components and design guidelines, helping developers build modern, responsive, and high-performance web applications.',
    '',
    '## Navigation',
    '',
    '- [Full Documentation (EN)](./llms-full.txt)',
    '- [Full Documentation (CN)](./llms-full-cn.txt)',
    '',
    '## Docs (EN)',
    '',
    ...englishResult.docs.map(({ title, url }) => `- [${title}](${url})`),
    '',
    '## Docs (CN)',
    '',
    ...chineseResult.docs.map(({ title, url }) => `- [${title}](${url})`),
    '',
    '## Components (EN)',
    '',
    ...englishResult.components.map(({ title, url }) => `- [${title}](${url})`),
    '',
    '## Components (CN)',
    '',
    ...chineseResult.components.map(({ title, url }) => `- [${title}](${url})`),
    ''
  ].join('\n');
}

function generateFullContent(result: ProcessResult, lang: 'en' | 'cn'): string {
  const langLabel = lang === 'en' ? 'English' : '中文';

  const docsContent = result.docs
    .map(doc => [`## ${doc.title}`, '', `Source: ${doc.url}`, '', doc.content || '', '', '---', ''].join('\n'))
    .join('\n');

  const componentsContent = result.components
    .map(component =>
      [`## ${component.title}`, '', `Source: ${component.url}`, '', component.content || '', '', '---', ''].join('\n')
    )
    .join('\n');

  return [
    `# ng-zorro-antd Component Documentation (${langLabel})`,
    '',
    lang === 'en'
      ? `This file contains aggregated content from all component docs. Total ${result.components.length} components.`
      : `本文件包含所有组件文档的聚合内容。总计 ${result.components.length} 个组件。`,
    '',
    '---',
    '',
    '# Documentation',
    '',
    docsContent,
    '# Components',
    '',
    componentsContent
  ].join('\n');
}

(async () => {
  if (require.main === module) {
    await generateLLms();
  }
})().catch(e => {
  console.error(e);
  process.exit(1);
});
