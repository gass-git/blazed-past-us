import { readFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { remark } from 'remark';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';
import path from 'node:path';

/**
 * Converts a Markdown file to HTML with syntax highlighting.
 *
 * Uses remark and rehype to parse Markdown, transform it to HTML,
 * and apply pretty code highlighting.
 */
async function parseMarkdown(_path: string): Promise<string> {
  const root = process.cwd();
  const markdown = await readFile(_path, { encoding: 'utf8' });

  const remarkResult = await remark()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      theme: JSON.parse(
        readFileSync(path.join(root, 'src/moonlight-li.json'), 'utf-8')
      ),
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(markdown);

  const result = await colorTags(root, remarkResult.value as string);

  return result;
}

async function colorTags(root: string, str: string): Promise<string> {
  const userConfig = await readFile(path.join(root, 'src/config.json'), {
    encoding: 'utf8',
  }).then((jsonData) => JSON.parse(jsonData.toLowerCase()));

  const A = str.split('<p>').splice(1).join('').split('</p>');

  const coloredTagsHTML = A[0]
    .replace(/\s/g, '')
    .toLowerCase()
    .split(',')
    .map((key) => {
      return `<span class="tag" style="--tag-color: ${userConfig.tags[key]?.color || userConfig.tags.default.color}">${key}</span>`;
    })
    .join(`<span class="tag-separator">, </span>`);

  const preTagsHTML = `<span class="tag-emoji">🏷️ </span>`;

  return (
    preTagsHTML + coloredTagsHTML + str.split('</p>').splice(1).join('</p>')
  );
}

export { parseMarkdown };
