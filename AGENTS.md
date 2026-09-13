## Agent skills

### Package manager

Bun only. Use `bun`, `bunx`, and `bun run` for every command —
never `npm`/`npx`, `pnpm`, or `yarn`. The only lockfile is `bun.lock`;
do not create `package-lock.json`, `pnpm-lock.yaml`, or `yarn.lock`.

### Issue tracker

Issues live in GitHub Issues (`warrior-pk/portfolio`) via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Default five-label vocabulary (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Interaction / question UX

Always ask questions interactively via the question tool where the user can
select single or multiple options (where applicable) using space, use arrows
to switch questions, and enter to confirm. Never ask for decisions in plain
text when a selectable UI is possible. Batch the full frontier in one round.

### Domain docs

Single-context layout: root `CONTEXT.md` + `docs/adr/`. See `docs/agents/domain.md`.
