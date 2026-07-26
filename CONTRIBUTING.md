# Contributing

Thanks for taking a look. Issues and pull requests are both very welcome.

## Getting set up

You need **Node 18** — SharePoint Framework 1.20 does not run on newer versions.
If you have a different Node installed, [nvm](https://github.com/nvm-sh/nvm)
(or [nvm-windows](https://github.com/coreybutler/nvm-windows)) lets you switch
per project:

```bash
nvm install 18
nvm use 18
```

Then:

```bash
git clone https://github.com/jgalili/sharepoint-image-editor.git
cd sharepoint-image-editor
npm install
```

## Running it locally

The SharePoint workbench needs a real tenant to host it, because the web part
loads inside SharePoint's own page shell.

1. Open `config/serve.json` and replace `enter-your-SharePoint-site` with your
   own tenant, e.g. `contoso.sharepoint.com`. **Please don't commit that change** —
   it's your tenant address, and the placeholder is what belongs in the repo.
2. Trust the local development certificate once per machine:
   ```bash
   npx gulp trust-dev-cert
   ```
3. Start it:
   ```bash
   npm run serve
   ```

The hosted workbench opens; add the web part from the toolbox and edit away.
Changes rebuild and reload automatically.

## Before you open a pull request

```bash
npx gulp lint      # ESLint, via the SPFx rig
npm run package    # proves it still produces a .sppkg
```

Both of these also run in CI on every pull request, so it saves a round trip
to run them first.

## House style

- **TypeScript, strict.** No `any` unless there's a comment explaining why.
- **Keep the render path pure.** All state lives in the web part's `properties`;
  the React component only reads props. That's what makes the property pane and
  the rendered output stay in sync.
- **Styling goes in `ImageEditor.module.scss`,** using SharePoint theme tokens
  (`"[theme:bodyText, default: #323130]"`) rather than hard-coded colours, so
  the web part follows whatever theme the site is using.
- **No new runtime dependencies** without a good reason. The whole thing is
  CSS filters and 250 lines of TypeScript; keeping it that way is the point.

## Ideas that would be genuinely useful

- A picker that browses images already in the site's document libraries,
  instead of only accepting a pasted URL
- Preset looks (black and white, warm, faded, high contrast) as one-click buttons
- Alt text as a configurable property — right now it's a fixed string, which
  isn't good enough for accessibility
- Crop and rotate
- Localisation: `src/webparts/imageEditor/loc/` currently has `en-us` only

## Reporting a bug

Please say which SharePoint environment you're on (SharePoint Online or a
particular Server version), what you configured, what you expected and what
happened instead. A screenshot of the web part plus the property pane usually
explains it faster than words do.
