export {};

// Create a type for the roles
export type Roles = "admin" | "moderator";

// Declare module for pdfjs-dist worker
declare module "pdfjs-dist/build/pdf.worker.min.mjs" {
  const workerSrc: string;
  export default workerSrc;
}

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role: Roles;
      approved: boolean;
      departmentId?: string;
    };
  }
}
