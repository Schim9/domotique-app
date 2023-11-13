export class Config {
  serverUrl: string
  username: string
  password: string
  homepage: string

  constructor(
    serverUrl: string = '',
    username: string = '',
    password: string = '',
    homepage: string = ''
  ) {
    this.serverUrl = serverUrl;
    this.username = username;
    this.password = password;
    this.homepage = homepage;

  }
}
