

export interface User {
    userName: string,
    email: string
}

export interface UserAttribute {
    name: string,
    value: string
}

export interface Space {
    spaceId: string,
    name: string,
    location: string,
    photoUrl?: string
}