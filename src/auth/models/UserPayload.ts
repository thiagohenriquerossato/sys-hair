export interface UserPayload {
  sub: string;
  email: string;
  name: string;
  is_admin: boolean;
  company_id: string;
  iat?: number;
  exp?: number;
}
