export interface login{
    email: string;
    password: string;
}

export interface IconsProp{
    type: "fill" | "stroke";
    name: string;
}

export interface AuthContextProps {
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
    login: (token: string) => void;
    logout: () => void;
    user: User | null | undefined;
}

export interface User{
    _id: number;
    __v: number;
    name: string;
    email: string;
    session: string;
    createdAt: string;
    updatedAt: string;
    image: string;
    iat: number;
    exp: number;
}

export interface Users{
    data: Users[]
}

export interface NewUser{
    name: string;
    email: string;
    password: string;
    verifyPassword: string;
    image: File | null;
}

export interface NewUserImage{
    image: File | null;
}