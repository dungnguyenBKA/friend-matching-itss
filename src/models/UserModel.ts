export default interface UserModel {
  email: string;
  name?: string;
  image?: string;
  passwd?: string;
  fav?: number[];
  about?: string;
  bookmarks?: string[];
  isLock?: boolean;
}
