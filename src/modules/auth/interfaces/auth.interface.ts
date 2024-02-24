export type AccessToken = {
  access_token: string;
};

export type AccessTokenPayload = {
  sub: string;
  email: string;
  iat: number;
  exp: number;
};
