Look at the Chef Tool in this codebase (src/pages/Translator.jsx and src/components/ScannerPanel.jsx). It currently has three modes: Transform a recipe, Fridge Raid (find recipes from ingredients), and a Food Scanner (barcode → health report).

Redesign the Chef Tool from the ground up. Keep the three modes and all existing functionality, but rethink the layout, visual hierarchy, interactions, and overall feel. The current site uses vanilla React loaded via CDN with no build step — if it makes sense for the redesign, migrate it to a proper React app with Vite, npm, and component files.

The rest of the site (design tokens, color palette, typography) is in styles.css — stay consistent with it, but feel free to push it further for the Chef Tool since it's the most interactive part of the site.

Short, gives it the right scope, and lets Claude Design make its own decisions from the actual code rather than a spec it might contradict.