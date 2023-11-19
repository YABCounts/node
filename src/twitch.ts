import { YABCounts } from "./api";
import { Paths, PickByDotNotation } from "./types/fields";

export interface TwitchChannel {
  username: string;
  name: string;
  handle: string;
  url: string;
  thumbnail: string;
  banner: string;
  description: string;
  statistics: {
    followerCount: number;
  };
}

export class Twitch {
  constructor(private readonly yabcounts: YABCounts) {}

  async channel<K extends Paths<TwitchChannel>>(
    usernameOrOptions: string | { username: string; fields?: K[] }
  ) {
    const username =
      typeof usernameOrOptions === "object"
        ? usernameOrOptions.username
        : usernameOrOptions;
    const fields =
      typeof usernameOrOptions === "object"
        ? usernameOrOptions.fields
        : undefined;

    const params = new URLSearchParams({
      key: this.yabcounts.key,
    });
    if (fields) params.set("fields", fields.join(","));

    const data = await this.yabcounts.get<PickByDotNotation<TwitchChannel, K>>(
      `/twitch/channel/${username}?${params}`
    );
    return data;
  }
}
