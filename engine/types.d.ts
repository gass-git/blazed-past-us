interface PostData {
  id: string;
  filename: string;
  title: string;
  brief: string;
  tags: Array<string>;
  created: Date;
  modified: Date;
}

export { PostData };
