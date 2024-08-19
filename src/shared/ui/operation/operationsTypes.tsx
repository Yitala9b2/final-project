export interface CategoryType {
    id: string;
    name: string;
    photo?: string;
};


//commandId: "Vitala"
//createdAt: "2024-08-17T21:19:41.529Z"
//id: "66c113ed8e877ac8a95448cd"
//name: "erg"
//photo: ""
//updatedAt: "2024-08-17T21:19:41.529Z"

export interface Category extends CategoryType {
    commandId? :string
    createdAt?: Date
    updatedAt?: Date
}

interface IOperation {
    commandId: string;
    createdAt: Date;
    updatedAt: Date;
    id: string;
    name: string;
    desc?: string;
    date: Date;
    amount: number | null;
    category: Category;
}
interface ICost extends IOperation {
    type: 'Cost';
}
interface IProfit extends IOperation {
    type: 'Profit';
}

export type Operation = ICost | IProfit;



export interface ShortOperationTypes {
    id:number
    amount: number;
    categoryName: string;
    name: string;
    shortDescription?: string | null;
}