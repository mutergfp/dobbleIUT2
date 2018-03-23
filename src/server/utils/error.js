export const isRequired = fieldName => {
    throw new Error(`${fieldName} param is required`);
}