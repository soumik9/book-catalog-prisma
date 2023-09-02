export enum ENUM_USER_ROLE {
    ADMIN = 'admin',
    CUSTOMER = 'customer',
}

// pagination props
export const paginationProps: string[] = ['page', 'size', 'sortBy', 'sortOrder'];

// book search and filter
export const bookFilterableFields: string[] = ['searchTerm', 'minPrice', 'maxPrice', 'title', 'author'];
export const bookSearchableFields: string[] = ['title', 'author', 'genre',];

export const bookRelationalFields: string[] = ['categoryId'];
export const bookRelationalFieldsMapper: { [key: string]: string } = {
    categoryId: 'category',
};