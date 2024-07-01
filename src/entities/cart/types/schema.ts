import { z } from "zod";
import { CreateCartParams } from "./typings";

export const CreateCartSchema: z.ZodType<CreateCartParams> = z.object({
  session_id: z.string(),
  cloth_id: z.number(),
});
