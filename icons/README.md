# Stockifi Icons

Raw SVG files for the Stockifi design system. These are the canonical source files — use these when implementing icons in Flutter or any other platform.

## Color

All icons use `currentColor` (or `fill="currentColor"` / `stroke="currentColor"`). Set color at the element level in your implementation — do not hardcode hex values here.

Token reference for each context:

| Usage | Token | Hex |
|---|---|---|
| Status — Info | — | `#4781C4` |
| Status — Success | — | `#0C9D61` |
| Status — Warning | — | `#FF863B` |
| Status — Error | — | `#BA4C4E` |
| Person icon (on dark bg) | `Base/White` | `#FFFFFF` |
| Person icon (brand color) | `Purple/Primary 700` | `#BB86FC` |

## Files

### Status icons (`20×20`, `viewBox="0 0 20 20"`)

Used in `toast.notif` and any contextual feedback UI.

| File | Usage |
|---|---|
| `status-info.svg` | Info state — circle with i |
| `status-success.svg` | Success state — circle with checkmark |
| `status-warning.svg` | Warning state — circle with ! |
| `status-error.svg` | Error state — circle with × |

### Person icon (`256×256`, `viewBox="0 0 256 256"`)

Source: [Phosphor Icons](https://phosphoricons.com) — Regular weight.

| File | Usage |
|---|---|
| `person.svg` | Placeholder state in Avatar component |

Scale to display size at implementation time (15px / 20px / 28px / 40px depending on avatar size — see Avatar component doc).

## Figma source

All icons live in the **Component Library** Figma file under the **Icons** page.

- Status icons: `base icon=[type], semantic=[type], size=medium-20x20`
- Person icon set: `icon-person` — node `1807:1136` — 8 variants (`semantic` × `size`)

## Updating icons

1. Fix the icon in Figma first (source of truth)
2. Export the updated SVG from Figma (or copy the vector path)
3. Replace the file here — keep `currentColor`, strip any hardcoded fills
4. Update the relevant Confluence component page changelog

If the path geometry changes in a way that affects rendered output, note it in the commit message so devs know to re-implement.
