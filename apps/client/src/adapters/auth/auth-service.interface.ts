export interface AuthService {
  login(oidcToken: string): Promise<void>;
  logout(): void;
  token: string;
  authUser: any;
  loggedIn: boolean;
}
