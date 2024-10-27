export interface ITokenPayload {
    userId: string;
    iat?: number;
    exp?: number;
}

export interface IToken {
    accessToken: string;
}

export interface ITokenSchema {
    accessToken: string;
    userId: string
}
