export class PlayList {
  constructor(index, song, url = '', id) {
    this.index = index;
    this.title = song.name;
    this.artist = song.song;
    this.src = url;
    this.pic = song.pic;
    this.id = id;
  }
}

export class LyricItem {
  constructor(time, lyric) {
    this.time = time;
    this.lyric = lyric;
  }
}
