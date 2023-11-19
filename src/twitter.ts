import { YABCounts } from "./api";
import { Paths, PickByDotNotation } from "./types/fields";

export interface TwitterUser {
  username: string;
  name: string;
  handle: string;
  url: string;
  thumbnail: string;
  banner: string;
  description: string;
  statistics: {
    followerCount: number;
    followingCount: number;
    postCount: number;
  };
}

export class X {
  constructor(private readonly yabcounts: YABCounts) {}

  async user<K extends Paths<TwitterUser>>(
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

    const data = await this.yabcounts.get<PickByDotNotation<TwitterUser, K>>(
      `/twitter/user/${username}?${params}`
    );
    return data;
  }
}

export class Twitter extends X {}
