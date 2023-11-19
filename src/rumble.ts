import { YABCounts } from "./api";
import { Paths, PickByDotNotation } from "./types/fields";

export interface RumbleChannel {
  id: string;
  name: string;
  handle: string;
  url: string;
  thumbnail: string;
  banner: string;
  description: string;
  statistics: {
    followerCount: number;
    videoCount: number;
    likeCount: number;
  };
}

export interface RumbleVideo {
  id: string;
  name: string;
  description: string;
  publishedAt: string;
  thumbnail: string;
  url: string;
  creatorName: string;
  statistics: {
    viewCount: number;
    likeCount: number;
    dislikeCount: number;
    commentCount: number;
  };
}

export class Rumble {
  constructor(private readonly yabcounts: YABCounts) {}

  async channel<K extends Paths<RumbleChannel>>(
    idOrOptions: string | { id: string; fields?: K[] }
  ) {
    const id = typeof idOrOptions === "object" ? idOrOptions.id : idOrOptions;
    const fields =
      typeof idOrOptions === "object" ? idOrOptions.fields : undefined;

    const params = new URLSearchParams({
      key: this.yabcounts.key,
    });
    if (fields) params.set("fields", fields.join(","));

    const data = await this.yabcounts.get<PickByDotNotation<RumbleChannel, K>>(
      `/rumble/channel/${id}?${params}`
    );
    return data;
  }

  async video<K extends Paths<RumbleVideo>>(
    idOrOptions: string | { id: string; fields?: K[] }
  ) {
    const id = typeof idOrOptions === "object" ? idOrOptions.id : idOrOptions;
    const fields =
      typeof idOrOptions === "object" ? idOrOptions.fields : undefined;

    const params = new URLSearchParams({
      key: this.yabcounts.key,
    });
    if (fields) params.set("fields", fields.join(","));

    const data = await this.yabcounts.get<PickByDotNotation<RumbleVideo, K>>(
      `/rumble/video/${id}?${params}`
    );
    return data;
  }
}
