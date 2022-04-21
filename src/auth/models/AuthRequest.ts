import { Request } from 'express';

export interface AuthRequest extends Request {
  user: {
    id: string;
    name: string;
    email: string;
    company_id: string;
    is_admin: boolean;
  };
}
