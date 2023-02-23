import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/supabase-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data } = await supabase.from("comments").select();
  res.status(200).json(data);
}
