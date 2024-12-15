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

export interface newCategoryProps{
    categNameRus: string;
    categNameUzb: string;
    categDescRus: string;
    categDescUzb: string;
    categSlug: string;
    categStatus: boolean;
    created_at?: string;
    modified_at?: string;
}

export interface ProductFormValues {
    productNameRu: string;
    productNameUz: string;
    descriptionRu: string;
    descriptionUz: string;
    price: string | number;
    slug: string;
    category: number;
    available_volumes: {
      volume: number;
      unit: string;
    }[];
    is_active: boolean;
    productImage: File | null;
}

export interface ProductProps{
    productNameRu: string;
    productNameUz: string;
    descriptionRu: string;
    descriptionUz: string;
    available_volumes: {
        volume: number;
        unit: string;
    }[]
    productPrice: number;
    category: number;
    productSlug: string;
    is_active: boolean;
    image: string;
}