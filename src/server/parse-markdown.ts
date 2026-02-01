import { readFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { remark } from 'remark';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeStringify from 'rehype-stringify';
import path from 'node:path';
import { getColoredTagsHTML } from '../engine/getters.js';

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
      theme: JSON.parse(readFileSync(path.join(root, 'src/moonlight-li.json'), 'utf-8')),
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(markdown);

  const result = await customizeHTML(root, remarkResult.value as string);

  return result;
}

/**
 * This function allows the HTML of the post to be modified before being output to the
 * users bundle.
 *
 * @param root consumers root folder
 * @param postHTMLString post HTML string output after being parsed from Markdown
 * @returns customized HTML
 */
async function customizeHTML(root: string, postHTMLString: string): Promise<string> {
  const consumerConfig = await readFile(path.join(root, 'src/config.json'), {
    encoding: 'utf8',
  }).then((jsonData) => JSON.parse(jsonData.toLowerCase()));

  // Get the HTML chunk containing the tags, split them into an array and assign it to tags.
  const tags = postHTMLString.split('<p>').splice(1).join('').split('</p>');

  // Post HTML string without the tags HTML chunk.
  const postHTMLStringWithoutTags = postHTMLString.split('</p>').splice(1).join('</p>');

  // Processes the tags array and returns the HTML with colored tags.
  const coloredTagsHTML = getColoredTagsHTML(tags, consumerConfig);

  return `<span class="tag-emoji">🏷️ </span>` + coloredTagsHTML + postHTMLStringWithoutTags;
}

export { parseMarkdown };
