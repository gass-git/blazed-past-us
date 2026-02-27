interface PostMetadata {
  slug: string;
  filename: string;
  title: string;
  brief: string;
  tags: string[];
  created: Date;
  modified: Date;
}

interface PostsPaths {
  input: string;
  output: string;
}

interface ParsedPostData {
  html: string;
  tags: string[];
}

interface Config {
  base_url: string;
  subtitle: string;
  tags: {
    default: { color: string };
  } & Record<string, { color: string }>;
}

interface PostHTML {
  slug: string;
  html: string | void;
}

type PostDataType = keyof PostMetadata;
type Views = Record<string, function>;
type MsgColor = 'yellow' | 'green' | 'red';
type PostsRegistry = { slug: string; created: Date }[];

export {
  PostsRegistry,
  PostMetadata,
  PostsPaths,
  Config,
  PostDataType,
  Views,
  MsgColor,
  ParsedPostData,
  PostHTML,
};
