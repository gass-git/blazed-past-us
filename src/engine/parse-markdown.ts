import { readFile } from 'node:fs/promises';
import { remark } from 'remark';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';

async function parseMarkdown(path: string): Promise<string> {
  const markdown = await readFile(path);

  /**
   * 1) remark --- to ---> markdown syntax tree.
   * 2) markdoun syntax tree --- to ---> HTML syntax tree.
   * 3) HTML syntax tree --- to ---> HTML syntax tree with prettier highlighter.
   * 4) HTML syntax tree --- to ---> HTML.
   */
  const result = await remark()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, { theme: 'github-dark' })
    .use(rehypeStringify)
    .process(markdown);

  return result.value as string;
}

export { parseMarkdown };
