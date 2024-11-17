export interface Pokemon {
    id: number;
    name: string;
    imgs: {
        artwork: string,
        home: string,
        animated: string
    };
    types: string[];
    weight: string;
    height: string;
    abilities: string[];
}

export interface Ability {
    ability: {
        name: string;
    };
}

export interface Type {
    type: {
        name: string;
    };
}
