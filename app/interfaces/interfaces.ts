export interface Song {
  duration: Number;
  id: String;
  image: String;
  title: String;
}
export interface RootState {
  io: String;
  songs: Array<Song>;
  currentSong: Song;
}
