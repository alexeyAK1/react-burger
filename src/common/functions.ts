import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";

require("dayjs/locale/ru");

dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(utc);
dayjs.locale("ru");

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

export function getFormattedDate(date: string) {
  const formatDate = dayjs(date).format("YYYY-MM-DD");

  if (dayjs(formatDate).isToday()) {
    return "Сегодня";
  }
  if (dayjs(formatDate).isYesterday()) {
    return "Вчера";
  }

  return dayjs(formatDate).fromNow();
}
export function getFormattedDateWithTime(date: string) {
  const firstPart = getFormattedDate(date);
  const secondPart = dayjs(date).utc().local().format("HH:mm");
  const lastPart = dayjs(date).utc().local().format("Z");

  return `${firstPart}, ${secondPart} i-GMT${lastPart.split(":")[0]}`;
}
