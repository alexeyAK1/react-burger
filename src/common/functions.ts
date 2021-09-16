export const getNElementArr = (n: number, element?: string) =>
  new Array(n).fill(element);

export function enumKeys<O extends object, K extends keyof O = keyof O>(
  obj: O
): K[] {
  return Object.keys(obj).filter((k) => Number.isNaN(+k)) as K[];
}

export function setCookie(
  name: string,
  value: string | number,
  props?: { [key: string]: number | Date | any }
) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}
export function getCookie(name: string) {
  // eslint-disable-next-line no-useless-escape
  const re = /([\.$?*|{}\(\)\[\]\\\/\+^])/g;
  const matches = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(re, "\\$1") + "=([^;]*)")
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string) {
  if (getCookie(name)) {
    setCookie(name, "", {
      "max-age": -1,
    });
  }
}

export function getAuthToken(res: Response): string | null {
  let authToken;

  res.headers.forEach((header) => {
    if (header.indexOf("Bearer") === 0) {
      authToken = header.split("Bearer ")[1];
    }
  });
  if (authToken) {
    return authToken;
  }

  return null;
}
