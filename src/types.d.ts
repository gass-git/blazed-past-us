interface PostData {
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
  posts_data_path: string;
  root_id: string;
  header_id: string;
  speed_element_id: string;
}

interface ParsedPostData {
  html: string;
  tags: string[];
}

type PostDataType = 'title' | 'created' | 'modified' | 'brief';

type View = 'home' | 'post' | '404';

type MsgColor = 'yellow' | 'green' | 'red';

interface Views {
  home: (tag: string | undefined) => string;
  post: (slug: string) => Promise<string>;
  notFound: () => string;
}

type ConsumerConfig = {
  posts_data_path: string;
  title_id: string;
  root_id: string;
  header_id: string;
  speed_element_id: string;
  tags: {
    default: { color: string };
  } & Record<string, { color: string }>;
};

export {
  PostData,
  PostsPaths,
  Config,
  PostDataType,
  View,
  Views,
  MsgColor,
  ConsumerConfig,
  ParsedPostData,
};
