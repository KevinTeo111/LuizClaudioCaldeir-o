import type { ComponentType } from "react";
import type { SceneKey } from "@/data/projects";
import { AIScene } from "./AIScene";
import { CommerceScene } from "./CommerceScene";
import { DashboardScene } from "./DashboardScene";
import { EditorialScene } from "./EditorialScene";
import { MobileScene } from "./MobileScene";
import { RealtimeScene } from "./RealtimeScene";

export type SceneProps = { active?: boolean };

/** Live-coded product demos, keyed by the `scene` field on a project. */
export const scenes: Record<SceneKey, ComponentType<SceneProps>> = {
  dashboard: DashboardScene,
  commerce: CommerceScene,
  realtime: RealtimeScene,
  mobile: MobileScene,
  ai: AIScene,
  editorial: EditorialScene,
};
