interface PostData {
  id: string;
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

type PostDataType = 'title' | 'created' | 'modified' | 'brief';

type View = 'home' | 'post' | '404';

type MsgColor = 'yellow' | 'green' | 'red';

interface Views {
  home: () => string;
  post: (id: string) => Promise<string>;
  notFound: () => string;
}

export { PostData, PostsPaths, Config, PostDataType, View, Views, MsgColor };
