export interface AuthService {
  login(oidcToken: string): Promise<void>;
  logout(): void;
  token: string;
  user: any;
  loggedIn: boolean;
}
