export interface UserAuthDto {
  firstname: string
  lastname: string
  username: string
  email: string
  avatar: File | null
  password: string
  bio: string
}
