// Mock jsCookie implementation
export const COOKIES = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  ACCESS_TOKEN: 'access_token'  // הוסף את זה
};

export const jsCookie = {
  get: (name: string) => {
    try {
      return document.cookie
        .split('; ')
        .find(row => row.startsWith(`${name}=`))
        ?.split('=')[1];
    } catch {
      return undefined;
    }
  },
  set: (name: string, value: string, options: any = {}) => {
    let cookieString = `${name}=${value}`;
    if (options.expires) {
      cookieString += `; expires=${options.expires.toUTCString()}`;
    }
    if (options.path) {
      cookieString += `; path=${options.path}`;
    }
    document.cookie = cookieString;
  },
  remove: (name: string, options: any = {}) => {
    const opts = { ...options, expires: new Date(0) };
    jsCookie.set(name, '', opts);
  }
};
