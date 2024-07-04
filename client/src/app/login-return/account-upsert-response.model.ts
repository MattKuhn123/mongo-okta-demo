export type AccountUpsertResponse = {
    sub: string,
    alreadyInSystem: boolean,
    firstName: string,
    lastName: string,
    picture: string | null,
};