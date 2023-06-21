export interface FormData {
    responseMessage?: string;
    profileComplete?: boolean;
    pixUpload?: boolean;
    success?: boolean;
    userId?: number;
    session?: string;
    email: string;
    pass: string;
    lat: string;
    long: string;
    id?: number;
}

export type CreateProfileData = {
    firstName: string;
    surname: string;
    dob: string;
    gender: number;
    interestedIn: number;
    fromAge: number;
    toAge: number;
    info: string;
    interest: number[];
    attributes: [
        {
            attributeId: number,
            attributeValue: number,
        }
    ]
    session: string;
    email: string;
    userId: number;
}

export type updateInterestData = {
    session: "",
    email: "",
    id: 0,
    interest: number[];
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
export interface Local2 {
    session: string;
    email: string;
}

export interface Picture {
    session: string;
    email: string;
    imageBase64: string;
}

export interface LogOutForm {
    session: string;
    email: string;
    id: number;
    success?: boolean;
}