interface PostMetaData {
  slug: string;
  filename: string;
  title: string;
  brief: string;
  tags: Array<string>;
  created: Date;
  modified: Date;
}

interface PostsPaths {
  input: string;
  output: string;
}

interface Config {
  base_url: string;
  posts_data_path: string;
  title_id: string;
  root_id: string;
  header_id: string;
  speed_element_id: string;
  logo_wrapper_id: string;
  tags: {
    default: { color: string };
  } & Record<string, { color: string }>;
}

interface ParsedPostData {
  html: string;
  tags: string[];
}

type PostDataType = 'title' | 'created' | 'modified' | 'brief';
type MsgColor = 'yellow' | 'green' | 'red';
type Views = Record<string, function>;

export { PostMetaData, PostsPaths, Config, PostDataType, Views, MsgColor, ParsedPostData };
