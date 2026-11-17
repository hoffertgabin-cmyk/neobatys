/**
 * Limites partagées entre le navigateur et le serveur, sans dépendance :
 * un composant client qui importe lib/schemas.ts embarque toute la bibliothèque zod (~30 Ko compressés).
 */
export const QUESTION_MAX = 500;
