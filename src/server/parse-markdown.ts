import { readFile } from 'node:fs/promises';
import { remark } from 'remark';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';

/**
 * Converts a Markdown file to HTML with syntax highlighting.
 *
 * Uses remark and rehype to parse Markdown, transform it to HTML,
 * and apply pretty code highlighting.
 */
async function parseMarkdown(path: string): Promise<string> {
  const markdown = await readFile(path);

  const result = await remark()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, { theme: 'dark-plus', keepBackground: false })
    .use(rehypeStringify)
    .process(markdown);

  return result.value as string;
}

export { parseMarkdown };
