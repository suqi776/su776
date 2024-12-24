export interface Post {
  path: string
  title: string
  date: string
  desc?: string
  tags?: string[]
  layout?: string
  category?: string[]
  type?: string
  imgURL?: string
}
