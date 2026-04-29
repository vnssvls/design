# Stockifi App Icons — SVG

Raw SVG exports from the Figma component library. Use these as the canonical source for icon implementation in Flutter and other targets.

## Folder structure

```
icons/svg/
  action/   — interactive action icons (scan, download, eye, attach, search, share, edit, add, filter, ellipsis, sync)
  metric/   — metric card icons (variance, wastage, cogs, link-broken)
  nav/      — navigation icons (chevrons, arrows, trend indicators)
  status/   — state and feedback icons (warning, check, cross, sync, question, face-smile, face-neutral, face-sad)
  ui/       — utility UI icons (load-item, pencil, trash, person)
```

## Color

All icons use `currentColor` for fills and strokes. Apply the correct color token at implementation:

| Context | Token | Hex |
|---------|-------|-----|
| Primary / interactive | `Purple/Primary 700` | `#BB86FC` |
| Success / positive | `Semantics/Success` | `#47B881` |
| Warning / caution | `Semantics/Warning` | `#FF863B` |
| Error / critical | `Semantics/Error` | `#BA4C4E` |
| Default (white) | `Base/White` | `#FFFFFF` |
| Muted | `Text/Muted` | `#9898B0` |

Note: `ui/load-item.svg`, `ui/pencil.svg`, and `ui/trash.svg` include `fill-opacity="0.7"` or `stroke-opacity="0.7"` — this matches the design intent for those icons in their original context (secondary UI actions).

## Figma source

**File:** Design Components (`KuL3n9S8FiZuvD6F7P6Lv5`)  
**Page:** Icons

| Icon group | Component set node |
|---|---|
| action-icons | `138:928` |
| status-icons | `138:924` |
| nav-chevrons | `138:934` |
| nav-arrows | `138:938` |
| icon-variance | `138:942` |
| icon-wastage | `138:950` |
| icon-cogs | `138:954` |
| icon-link-broken (metric) | `138:958` |
| icon.load-item | `1003:4902` |
| icon-pencil2 | `1003:4910` |
| icon-trash | `1003:4918` |

Person icon (`ui/person.svg`, `256×256`): Phosphor Icons Regular weight. Used in Avatar component — scale to 15/20/28/40px at implementation depending on avatar size.

## Update workflow

When an icon changes in Figma:
1. Export the updated node via `node.exportAsync({ format: 'SVG_STRING' })`
2. Replace the fill/stroke color with `currentColor`
3. Update the file in this folder
4. Commit with `chore: update [icon-name] SVG`

Devs pull from `main` on the `vnssvls/design` repo.
