import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabase-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await supabase.from("comments").delete().gte("id", 0);
  res.redirect("/");
}
