export interface Design {
  metadata: {
    _userId: string
    createdAt: string
    creatorImageSource: string
    creatorName: string
    hasAccess: boolean
  }
  _id: string
  caption: string
  description: string
  views: number
  likes: number
  coverImageSource: string
  tags: string[]
}
