export interface login{
    email: string;
    password: string;
}

export interface IconsProp{
    type: "fill" | "stroke";
    name: string;
}


export interface User{
    _id: string;
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

export interface userDetails{
    decoded: User
    valid: boolean;
    expired: boolean;
}

export interface AuthContextProps {
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
    login: (token: string) => void;
    logout: () => void;
    user: User | null | undefined;
    isAuthenticated: boolean | null;
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

export interface Product{
    title: string;
    description: string;
    price: number;
    image: File | null;
}