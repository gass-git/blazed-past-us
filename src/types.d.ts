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

export { PostData, PostsPaths };
