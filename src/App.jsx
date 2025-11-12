import * as Tooltip from "@radix-ui/react-tooltip"
import { Rocket } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"

function App() {
  const [clicks, setClicks] = useState(0)

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-secondary/30 to-background/80 px-6 py-16 text-center">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-6">
        <div className="space-y-3">
          <p className="text-sm font-medium uppercase text-muted-foreground tracking-[0.35em]">
            Shadcn UI Smoke Test
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground">
            Radix-powered button with animated entrance
          </h1>
          <p className="text-balance text-base text-muted-foreground">
            Click to make sure the generated `Button` component renders correctly and responds to interaction while using Radix Tooltip primitives and Tailwind animations.
          </p>
        </div>

        <Tooltip.Provider delayDuration={150}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Button
                size="lg"
                className="animate-in zoom-in-95 fade-in duration-300 shadow-lg hover:translate-y-[1px] focus-visible:scale-[1.01] transition-transform"
                onClick={() => setClicks((prev) => prev + 1)}
              >
                Launch Test
                <Rocket className="size-4" />
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                side="top"
                sideOffset={10}
                className="animate-in fade-in slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:slide-out-to-bottom-2 duration-200 rounded-md bg-popover px-3 py-2 text-sm text-popover-foreground shadow-md"
              >
                Button clicked {clicks} time{clicks === 1 ? "" : "s"}
                <Tooltip.Arrow className="fill-popover" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </div>
    </div>
  )
}

export default App
