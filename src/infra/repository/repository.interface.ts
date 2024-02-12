/**
 * @interface RepositoryInterface
 * @description Contract interface for Repository.
 * */
export default interface RepositoryInterface<EntityPropsType, UpdatePropsType>{
    create(data: EntityPropsType): Promise<EntityPropsType>;
    update(data: UpdatePropsType): Promise<EntityPropsType>;
    delete(id: string): Promise<boolean>;
    findById(id: string): Promise<(EntityPropsType) | null>;
    findAll(): Promise<EntityPropsType[]>;
    findByEmail(email: string): Promise<(EntityPropsType) | null>;
}