import type { Html } from "rune-ts";
import { Lang } from "../common/typography";

export const classes = (...classes) => {
  return classes
    .map((cls) => {
      const _type = typeof cls;
      const is_array = Array.isArray(cls);
      if (_type === "string") return cls;
      if (_type === "object" && !is_array) {
        const _cs: string[] = [];
        for (const key in cls) {
          if (cls[key]) {
            _cs.push(key);
          }
        }
        return _cs.join(" ");
      }
      if (Array.isArray(cls)) {
        return cls.join(" ");
      }

      return "";
    })
    .join(" ");
};

export const htmlIf = (html: string | Html, condition: boolean) => {
  return condition ? html : "";
};

export const changeUrlLang = (url: string, lang: Lang) => {
  const received_url = new URL(url);
  // slash(/) 로 시작하고 en kr jp 중에 하나를 가지고 / 가 붙거나 끝나거나
  const lang_regex = /^(\/(en|kr|jp))(?=\/|$)/;
  received_url.pathname = received_url.pathname.replace(lang_regex, `/${lang}`);
  return received_url.toString();
};

export const ptr = (size: number) => {
  return size / 16 + "rem";
};

export const validateEmail = (email: string) => {
  // 이메일 형식에 대한 정규식
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !!email && emailRegex.test(email);
};

export const validatePassword = (password: string) => {
  // 비밀번호 형식에 대한 정규식
  const passwordRegex =
    /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return !!password && passwordRegex.test(password);
};
