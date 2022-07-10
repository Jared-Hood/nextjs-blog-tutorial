import { getAllPostIds } from "../../util/posts";

export default function handler(req, res) {
  const postIds = getAllPostIds();
  res.status(200).json({
    text: 'Hello',
    postIds: postIds
  });
}
