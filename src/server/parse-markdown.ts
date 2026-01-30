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

  const markdown = await readFile(_path, { encoding: 'utf8' }).then((str) =>
    // remove "**tags:**" string
    str.split('**tags:**').splice(1).join()
  );

  // PENDING: use userConfig to color tags
  const userConfig = await readFile(path.join(root, 'src/config.json'), {
    encoding: 'utf8',
  });

  const result = await remark()
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

  return result.value as string;
}

export { parseMarkdown };
