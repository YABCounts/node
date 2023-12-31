import { Rumble } from "./rumble";
import { Twitch } from "./twitch";
import { Twitter, X } from "./twitter";
import { YouTube } from "./youtube";

const baseUrl = "https://api.yabcounts.com/public";

interface RequestOptions {
  query?: Record<string, any>;
}

export class YABCounts {
  /**
   * Your API key. Get one at https://yabcounts.com/api.
   */
  readonly key: string;
  readonly youtube = new YouTube(this);
  readonly rumble = new Rumble(this);
  readonly x = new X(this);
  readonly twitter = new Twitter(this);
  readonly twitch = new Twitch(this);

  /**
   * @param apiKey Your API key. Get one at https://yabcounts.com/api.
   */
  constructor(readonly apiKey?: string) {
    if (!apiKey) {
      this.key = process.env.YABCOUNTS_API_KEY!;

      if (!this.key)
        throw new Error(
          'Missing API key. Pass an API key into the constructor: `new YABCounts("123")`'
        );
    } else {
      this.key = apiKey;
    }
  }

  async fetchRequest<T>(path: string, options = {}): Promise<T> {
    const response = await fetch(`${baseUrl}${path}`, options);

    const data = await response.json();
    return data;
  }

  async get<T>(path: string, options: RequestOptions = {}) {
    const requestOptions = {
      method: "GET",
      ...options,
    };

    return this.fetchRequest<T>(path, requestOptions);
  }
}
