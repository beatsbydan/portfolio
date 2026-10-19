'use client'

import {
  OverlayScrollbarsComponent,
  OverlayScrollbarsComponentRef
} from "overlayscrollbars-react"
import "overlayscrollbars/overlayscrollbars.css"
import { ReactNode, forwardRef } from "react"

interface ScrollableProps {
  children: ReactNode
}

const Scrollable = forwardRef<
  OverlayScrollbarsComponentRef,
  ScrollableProps
>(({ children }, ref) => {
  return (
    <OverlayScrollbarsComponent
      ref={ref}
      defer
      options={{
        scrollbars: {
          autoHide: "leave",
          autoHideDelay: 500,
        },
      }}
      className="h-full w-full"
    >
      {children}
    </OverlayScrollbarsComponent>
  )
})

Scrollable.displayName = "Scrollable"
export default Scrollable
