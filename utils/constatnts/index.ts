export enum ENUM_USER_ROLE {
    ADMIN = 'admin',
    CUSTOMER = 'customer',
}

// pagination props
export const paginationProps: string[] = ['page', 'limit', 'sortBy', 'sortOrder'];

export const bookFilterableFields: string[] = ['searchTerm', 'title', 'author'];
export const bookSearchableFields: string[] = ['title', 'author', 'genre']