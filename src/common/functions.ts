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
  props = {
    path: "/",
    ...props,
  };

  if (props.expires instanceof Date) {
    props.expires = props.expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in props) {
    updatedCookie += "; " + optionKey;
    let optionValue = props[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}
export function getCookie(name: string) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        // eslint-disable-next-line no-useless-escape
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
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
