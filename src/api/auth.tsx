export interface FormData {
    responseMessage?: string;
    profileComplete?: boolean;
    success?: boolean;
    userId?: number;
    session?: string;
    email: string;
    pass: string;
    lat: string;
    long: string;
}

export type CreateProfileData = {
    firstName: string;
    lastName: string;
    dob: string;
    gender: number;
    interestedIn: number;
    fromAge: number;
    toAge: number;
    info: string;
    interest: number[];
    session: string;
    email: string;
    userId: number;
    // key?: any;
}

export interface IdValue {
    id: number;
    value: string;
}

export interface Local {
    userId: number;
    session: string;
    email: string;
}

export interface Picture {
    session: string;
    email: string;
    imageBase64: string;
}