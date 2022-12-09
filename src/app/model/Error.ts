export interface ErrorException {
  headers: Headers;
  status: number;
  statusText: string;
  url: string;
  ok: boolean;
  name: string;
  message: string;
  error: Error;
}

export interface Headers {
  normalizedNames: NormalizedNames;
  lazyUpdate: any;
}

export interface NormalizedNames {}

export interface Error {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}
