import { removeBothToken } from "./cookies";

export async function logout(): Promise<void> {
  await removeBothToken();
}
