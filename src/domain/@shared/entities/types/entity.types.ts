export type EntityPropsType = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | undefined | null;
};

export type EntityConstructorDto<U> = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | undefined | null;
    props: U;
};
