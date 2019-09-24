export interface Song {
  duration?: Number;
  id?: String;
  image?: String;
  title?: String;
  titulo?: String;
}
export interface RootState {
  io: String;
  songs: Array<Song>;
  currentSong: Song;
}
