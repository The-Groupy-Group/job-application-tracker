import { JwtPayload } from "jwt-decode";

export interface JwtPayLoad extends JwtPayload {
  email: string;
}
