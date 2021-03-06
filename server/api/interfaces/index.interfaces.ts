import User from "@entities/User"

export interface TokenData {
    access_token: string
    token_type: string
    expiresIn: number
    user?: User
}

export interface MessageDataDto {
    senderId: number
    participantId: number
    conversationIdentifier: string
    body?: string
    type: 'text' | 'image' | 'emoji'
    base64Image?: string
    imageName?: string
}

export interface ReactionDataDto {
    senderId: number
    name: string
    messageId: number
}

export interface PaginateMeta {
    count: number,
    currentPage: number,
    nextPage: number,
    prevPage: number,
    lastPage: number,
}