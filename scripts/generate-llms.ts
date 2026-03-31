/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ensureDir, readdirSync, readFileSync, writeFile } from 'fs-extra';
import { glob } from 'glob';

import { dirname, join, resolve } from 'path';

interface DocItem {
  title: string;
  url: string;
  mdUrl: string; // URL for individual .md file
  category: 'docs' | 'components';
  componentName?: string; // For components, the component folder name
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

  // Generate individual .md files for each component/doc
  await generateIndividualFiles(englishResult, siteDir, 'en', cwd);
  await generateIndividualFiles(chineseResult, siteDir, 'cn', cwd);

  // Generate llms.txt (navigation)
  const llmsNavContent = generateNavigationContent(englishResult, chineseResult);

  // Generate llms-full.txt (English content)
  const englishFullContent = generateFullContent(englishResult, 'en');

  // Generate llms-full-cn.txt (Chinese content)
  const chineseFullContent = generateFullContent(chineseResult, 'cn');

  // Add BOM to all files to help browser recognize UTF-8 encoding regardless of Content-Type header
  // eslint-disable-next-line prefer-template
  await writeFile(join(siteDir, 'llms.txt'), '\ufeff' + llmsNavContent, 'utf-8');
  // eslint-disable-next-line prefer-template
  await writeFile(join(siteDir, 'llms-full.txt'), '\ufeff' + englishFullContent, 'utf-8');
  // eslint-disable-next-line prefer-template
  await writeFile(join(siteDir, 'llms-full-cn.txt'), '\ufeff' + chineseFullContent, 'utf-8');
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
  const langSuffix = lang === 'en' ? 'en' : 'cn';

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

    // Generate URL for web page
    let url = `https://ng.ant.design/${markdown.replace(matchSuffix, '')}/${langSuffix}`;
    if (url.includes('/components/')) {
      url = url.replace('/doc/index', '');
    }

    // Generate URL for individual .md file
    // e.g., components/button/doc/index.en-US.md -> components/button.en.md
    // e.g., docs/getting-started.en-US.md -> docs/getting-started.en.md
    let mdUrl: string;
    if (markdown.startsWith('components/')) {
      // Extract component name from path like "components/button/doc/index.en-US.md"
      const match = markdown.match(/^components\/([^/]+)\//);
      const componentName = match ? match[1] : 'unknown';
      mdUrl = `https://ng.ant.design/components/${componentName}.${langSuffix}.md`;
    } else {
      // For docs, just replace suffix
      mdUrl = `https://ng.ant.design/${markdown.replace(matchSuffix, `.${langSuffix}.md`)}`;
    }

    // Keep frontmatter, just trim whitespace
    const parsedContent = fsContent.trim();

    // Extract component name for demo lookup
    const componentNameMatch = markdown.match(/^components\/([^/]+)\//);
    const componentName = componentNameMatch ? componentNameMatch[1] : undefined;

    const docItem: DocItem = {
      title,
      url,
      mdUrl,
      category: markdown.startsWith('components/') ? 'components' : 'docs',
      componentName,
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
    ...englishResult.docs.map(({ title, url, mdUrl }) => `- [${title}](${url}) | [.md](${mdUrl})`),
    '',
    '## Docs (CN)',
    '',
    ...chineseResult.docs.map(({ title, url, mdUrl }) => `- [${title}](${url}) | [.md](${mdUrl})`),
    '',
    '## Components (EN)',
    '',
    ...englishResult.components.map(({ title, url, mdUrl }) => `- [${title}](${url}) | [.md](${mdUrl})`),
    '',
    '## Components (CN)',
    '',
    ...chineseResult.components.map(({ title, url, mdUrl }) => `- [${title}](${url}) | [.md](${mdUrl})`),
    ''
  ].join('\n');
}

async function generateIndividualFiles(
  result: ProcessResult,
  siteDir: string,
  lang: 'en' | 'cn',
  cwd: string
): Promise<void> {
  const allItems = [...result.docs, ...result.components];

  for (const item of allItems) {
    // Extract path from mdUrl: https://ng.ant.design/components/button.en.md -> components/button.en.md
    const mdPath = item.mdUrl.replace('https://ng.ant.design/', '');

    // Get demo code for components
    let demoSection = '';
    if (item.componentName) {
      demoSection = getDemoCode(item.componentName, lang, cwd);
    }

    const content = [item.content, demoSection].filter(Boolean).join('\n');

    const outputPath = join(siteDir, mdPath);
    await ensureDir(dirname(outputPath));
    // Add BOM to help browser recognize UTF-8 encoding regardless of Content-Type header
    // eslint-disable-next-line prefer-template
    await writeFile(outputPath, '\ufeff' + content, 'utf-8');
  }
}

function getDemoCode(componentName: string, lang: 'en' | 'cn', cwd: string): string {
  const demoDir = join(cwd, 'components', componentName, 'demo');
  const demoCode: string[] = [];
  const langKey = lang === 'en' ? 'en-US' : 'zh-CN';

  try {
    // Find all .ts demo files
    const demoFiles = readdirSync(demoDir).filter((f: string) => f.endsWith('.ts'));

    for (const demoFile of demoFiles) {
      const demoName = demoFile.replace('.ts', '');
      const tsPath = join(demoDir, demoFile);
      const mdPath = join(demoDir, `${demoName}.md`);

      // Read demo code
      const tsContent = readFileSync(tsPath, 'utf-8');

      // Read demo title from .md file frontmatter
      let title = '';
      let description = '';
      try {
        const mdContent = readFileSync(mdPath, 'utf-8');

        // Extract title from frontmatter (priority)
        // Format: title:\n   zh-CN: 标题\n   en-US: Title
        const titleRegex = new RegExp(`title:[\\s\\S]*?${langKey}:\\s*(.+?)(?:\\n|\\s*$)`, 'm');
        const titleMatch = mdContent.match(titleRegex);
        if (titleMatch) {
          title = titleMatch[1].trim();
        }

        // Extract description from language section (secondary)
        const langSectionRegex = new RegExp(`## ${langKey}\\s*\\n([\\s\\S]*?)(?=## |$)`, 'i');
        const descMatch = mdContent.match(langSectionRegex);
        if (descMatch) {
          description = descMatch[1].trim();
        }
      } catch {
        // If .md file doesn't exist, use demo name as title
      }

      const demoParts = [`### ${title || demoName}`, ''];
      if (description) {
        demoParts.push(description, '');
      }
      demoParts.push('```typescript', tsContent.trim(), '```', '');
      demoCode.push(demoParts.join('\n'));
    }

    if (demoCode.length > 0) {
      return ['', '---', '', `## ${lang === 'en' ? 'Examples' : '代码示例'}`, '', ...demoCode].join('\n');
    }
  } catch {
    // Demo directory doesn't exist or can't be read
  }

  return '';
}

function generateFullContent(result: ProcessResult, lang: 'en' | 'cn'): string {
  const langLabel = lang === 'en' ? 'English' : '中文';

  const docsContent = result.docs.map(doc => [doc.content, '', '---', ''].join('\n')).join('\n');

  const componentsContent = result.components
    .map(component => [component.content, '', '---', ''].join('\n'))
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

// Run if executed directly
generateLLms().catch(e => {
  console.error(e);
  process.exit(1);
});
