interface PostMetaData {
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
  posts_data_path: string;
  title_id: string;
  root_id: string;
  logo_wrapper_id: string;
  tags: {
    default: { color: string };
  } & Record<string, { color: string }>;
}

type PostDataType = keyof PostMetaData;
type Views = Record<string, function>;
type MsgColor = 'yellow' | 'green' | 'red';

export {
  PostMetaData,
  PostsPaths,
  Config,
  PostDataType,
  Views,
  MsgColor,
  ParsedPostData,
};
