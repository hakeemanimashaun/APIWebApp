

export const FetchState = {
    DEFAULT: "DEFAULT",
    LOADING: "LOADING",
    SUCCESS: "SUCCESS",
    ERROR: "ERROR",
}

export type PostData = {
    id: number
    login: string
    avatar_url: string
    type: string
}