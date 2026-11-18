"use client"

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react"
import { useInView, useMotionValue, useReducedMotion, useSpring } from "motion/react"

import { cn } from "@/lib/utils"

interface NumberTickerProps extends ComponentPropsWithoutRef<"span"> {
  value: number
  startValue?: number
  direction?: "up" | "down"
  delay?: number
  decimalPlaces?: number
}

function formatear(n: number, decimalPlaces: number) {
  return Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(Number(n.toFixed(decimalPlaces)))
}

/**
 * Contador animado. El HTML del servidor ya trae el número final (lo ven Google,
 * las vistas previas de enlaces y quien no tiene JavaScript); al entrar en pantalla,
 * el contador arranca desde startValue y sube hasta el número final.
 */
export function NumberTicker({
  value,
  startValue = 0,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
  ...props
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const final = direction === "down" ? startValue : value
  const inicio = direction === "down" ? value : startValue
  const motionValue = useMotionValue(final)
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  })
  const isInView = useInView(ref, { once: true, margin: "0px" })
  const reducido = useReducedMotion()

  useEffect(() => {
    if (!isInView || reducido) return
    // Vuelve al inicio sin animar y luego cuenta hasta el número final.
    motionValue.jump(inicio)
    springValue.jump(inicio)
    const timer = setTimeout(() => {
      motionValue.set(final)
    }, delay * 1000)
    return () => clearTimeout(timer)
  }, [motionValue, springValue, isInView, reducido, delay, inicio, final])

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = formatear(latest, decimalPlaces)
        }
      }),
    [springValue, decimalPlaces]
  )

  return (
    <span
      ref={ref}
      className={cn(
        "inline-block tracking-wider text-black tabular-nums dark:text-white",
        className
      )}
      {...props}
    >
      {formatear(final, decimalPlaces)}
    </span>
  )
}
