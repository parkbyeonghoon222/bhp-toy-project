import { Cloth, ClothesParams } from "../types";
import { compact, entries, map, pipe, reduceLazy } from "@fxts/core";
import { match, P } from "ts-pattern";
import { EQ, IN, QUERY, SQL } from "../../../app/server/db";

// @ts-ignore
import * as changeKeys from "change-case/keys";
import * as changeCase from "change-case";

const createClothesWhereQuery = (
  whereCondition: Omit<ClothesParams, "sortColumn" | "skip" | "limit">,
) =>
  pipe(
    whereCondition,
    entries,
    map(([key, value]) =>
      match({ key, value })
        .with(
          {
            key: "search",
            value: P.when((value) => typeof value === "string" && !!value),
          },
          ({ value }) => SQL`tsv_content @@ plainto_tsquery(${value})`,
        )
        .with(
          { value: P.string },
          ({ key, value }) =>
            SQL`${EQ(changeKeys.snakeCase({ [key]: value }))}`,
        )
        .with(
          { value: P.array(P.string) },
          ({ key, value }) => SQL`${IN(changeCase.snakeCase(key), value)}`,
        )
        .with(P._, () => null)
        .run(),
    ),
    compact,
    reduceLazy((prev, curr) => SQL`${prev} AND ${curr}`, SQL`WHERE true`),
  );

export const getClothes = async ({
  sortColumn = "id",
  limit = 20,
  skip = 0,
  ...whereCondition
}: ClothesParams): Promise<Cloth[]> => {
  const whereQuery = createClothesWhereQuery(whereCondition);

  const rows =
    await QUERY`SELECT * FROM byeongpple_shop.cloth ${whereQuery} ORDER BY ${sortColumn} LIMIT ${limit} OFFSET ${skip}`;
  return rows.map((cloth: any) => changeKeys.camelCase(cloth));
};

export const getClothesCount = async (
  whereCondition: Pick<
    ClothesParams,
    "masterCategory" | "subCategory" | "articleType" | "search"
  >,
): Promise<number> => {
  const whereQuery = createClothesWhereQuery(whereCondition);

  const rows =
    await QUERY`SELECT COUNT(id) as count FROM byeongpple_shop.cloth ${whereQuery}`;
  return rows.length ? rows[0].count : 0;
};

export const getCloth = async (id: number): Promise<Cloth> => {
  const rows =
    await QUERY`SELECT * FROM byeongpple_shop.cloth WHERE id = ${id}`;
  return rows.length > 0 ? changeKeys.camelCase(rows[0]) : null;
};
