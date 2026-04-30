import { describe, expect, it } from "vitest";
import {
  ACTION_ROW_CLASSNAME,
  CLUSTER_MD_CLASSNAME,
  CLUSTER_SM_CLASSNAME,
  STACK_LG_CLASSNAME,
  STACK_MD_CLASSNAME,
  STACK_SM_CLASSNAME,
  STANDARD_BORDER_CLASSNAME,
  STANDARD_BORDER_STRONG_CLASSNAME,
  STYLE_CLASS_NAMES,
  SURFACE_CARD_CLASSNAME,
  SURFACE_PANEL_CLASSNAME,
} from "./classNames";

describe("style class names", () => {
  it("exposes reusable layout class names", () => {
    expect(ACTION_ROW_CLASSNAME).toBe("action-row");
    expect(CLUSTER_MD_CLASSNAME).toBe("cluster-md");
    expect(CLUSTER_SM_CLASSNAME).toBe("cluster-sm");
    expect(STACK_LG_CLASSNAME).toBe("stack-lg");
    expect(STACK_MD_CLASSNAME).toBe("stack-md");
    expect(STACK_SM_CLASSNAME).toBe("stack-sm");
    expect(STANDARD_BORDER_CLASSNAME).toBe("standard-border");
    expect(STANDARD_BORDER_STRONG_CLASSNAME).toBe("standard-border-strong");
    expect(SURFACE_CARD_CLASSNAME).toBe("surface-card");
    expect(SURFACE_PANEL_CLASSNAME).toBe("surface-panel");
    expect(STYLE_CLASS_NAMES.actionRow).toBe(ACTION_ROW_CLASSNAME);
  });
});
