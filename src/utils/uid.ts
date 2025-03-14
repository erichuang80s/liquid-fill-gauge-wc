let n = 0
export function uid(prifix: string = 'liquid-fill-gauge'): string {
  return `${prifix}-${n++}`
}
