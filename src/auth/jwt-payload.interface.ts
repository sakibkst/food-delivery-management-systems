export interface JwtPayload {
    sub: string; // User ID
    username: string; // Username
    roles?: string[]; // Optional: Roles if you're adding them to the JWT
    email?: string; // Optional: Email if you need it
}
