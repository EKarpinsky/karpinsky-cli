export interface BlogPost {
  title: string;
  body: {
    markDefs: [];
    children: { text: string }[];
    style: string;
    _type: string;
    _key: string;
  }[];
  slug: { current: string };
  mainImage: { asset: { url: string } };
  _createdAt: string;
  _updatedAt: string;
  _id: string;
  _type: string;
  _rev: string;
  author: { _ref: string; _type: string };
}
