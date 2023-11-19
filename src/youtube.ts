import type { YABCounts } from "./api";
import { Paths, PickByDotNotation } from "./types/fields";

export interface YouTubeChannel {
  id: string;
  name: string;
  handle: `@${string}`;
  url: string;
  thumbnail: string;
  banner: string;
  statistics: {
    subscriberCount: number;
    publicSubscriberCount: number;
    viewCount: number;
  };
}

export interface YouTubeVideo {
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
    commentCount: number;
  };
}

export class YouTube {
  constructor(private readonly yabcounts: YABCounts) {}

  async channel<K extends Paths<YouTubeChannel>>(
    idOrOptions: string | { id: string; fields?: K[] }
  ) {
    const id = typeof idOrOptions === "object" ? idOrOptions.id : idOrOptions;
    const fields =
      typeof idOrOptions === "object" ? idOrOptions.fields : undefined;

    const params = new URLSearchParams({
      key: this.yabcounts.key,
    });
    if (fields) params.set("fields", fields.join(","));

    const data = await this.yabcounts.get<PickByDotNotation<YouTubeChannel, K>>(
      `/youtube/channel/${id}?${params}`
    );
    return data;
  }

  async video<K extends Paths<YouTubeVideo>>(
    idOrOptions: string | { id: string; fields?: K[] }
  ) {
    const id = typeof idOrOptions === "object" ? idOrOptions.id : idOrOptions;
    const fields =
      typeof idOrOptions === "object" ? idOrOptions.fields : undefined;

    const params = new URLSearchParams({
      key: this.yabcounts.key,
    });
    if (fields) params.set("fields", fields.join(","));

    const data = await this.yabcounts.get<PickByDotNotation<YouTubeVideo, K>>(
      `/youtube/video/${id}?${params}`
    );
    return data;
  }
}
