import { ToolCardLink } from "@/components/app/ToolCardLink";
import { TOOL_CATEGORIES, getToolsByCategory } from "@/lib/app/tools";

export function AllToolsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
      {TOOL_CATEGORIES.map((category) => {
        const tools = getToolsByCategory(category.id);

        if (tools.length === 0) {
          return null;
        }

        return (
          <section key={category.id} className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">{category.label}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {tools.map((tool) => (
                <ToolCardLink key={tool.id} tool={tool} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
