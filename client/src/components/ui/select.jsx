import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { useState, useRef, useEffect } from "react"

function Select({ value, onValueChange, children }) {
  const [open, setOpen] = useState(false)
  const [displayLabel, setDisplayLabel] = useState("")
  return (
    <SelectContext.Provider value={{ value, onValueChange, open, setOpen, displayLabel, setDisplayLabel }}>
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  )
}

import { createContext, useContext } from "react"
const SelectContext = createContext({})

function SelectTrigger({ className, children, ...props }) {
  const { open, setOpen } = useContext(SelectContext)
  return (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className={cn(
        "flex h-9 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-slate-900 disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown size={14} className="opacity-50" />
    </button>
  )
}

function SelectValue({ placeholder }) {
  const { value, displayLabel } = useContext(SelectContext)
  return <span className={value ? "" : "text-slate-400"}>{displayLabel || value || placeholder}</span>
}

function SelectContent({ className, children, ...props }) {
  const { open, setOpen } = useContext(SelectContext)
  const ref = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    if (open) document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open, setOpen])

  if (!open) return null
  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-50 mt-1 w-full rounded-md border border-slate-200 bg-white shadow-lg",
        className
      )}
      {...props}
    >
      <div className="p-1">{children}</div>
    </div>
  )
}

function SelectItem({ value, children, className, ...props }) {
  const { onValueChange, setOpen, value: selectedValue, setDisplayLabel } = useContext(SelectContext)
  return (
    <div
      onClick={() => {
        onValueChange(value)
        setDisplayLabel(children)
        setOpen(false)
      }}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm hover:bg-slate-100",
        selectedValue === value && "bg-slate-100 font-medium",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem }