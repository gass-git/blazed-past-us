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

export { PostData, PostsPaths, Config, PostDataType };
