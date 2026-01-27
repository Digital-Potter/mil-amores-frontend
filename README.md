# Starter boiler plate Next.JS for new projects by Digital Potter

We use this boiler plate at Digital Potter to start new projects, it saves us a lot of time so we can get to code ASAP having all important settings for a clean and tested code. Now we are sharing it with you, I hope you enjoy it and make sure you star this repo for future use. We promise we will keep updating it as libraries and dependencies evolve.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## How can I edit this code?

**Use your preferred IDE**

Work locally using your own IDE, if you have any update worth to share, make sure you open a PR and will gladly revise your contribution.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone git@github.com:Digital-Potter/digital-potter-starter.git

# Step 2: Navigate to the project directory.
cd digital-potter-starter

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The project contains the basic kit that comes from a first installation plus some tweaks we use at Digital Potter.

- Tailwinds with some changes in how to load fonts. The setup includes the new Tailwind so you don't need the tailwind.config.js file.
- Some Global CSS pre-setup as we like to use in almost all of our projects. We usually define root variables with our names, but you can modify this as you feel more comfortable.
- Some TS tweaks and we are including husky for pre-commit check.

## Important things to customize from the beginning.

- Check `git remote -v`. If the remote still has our repo, remember to change it to yours.
- Change the name and port (if needed) of the project in the `package.json`, For example `"dev": "next dev -p 3007"` if you want the project to run on port 3007,
- Use your favorite fonts by modifying `FontSettings.ts` in the helpers function, make sure you make the changes in `global.css` of variable and colors too.
- Folder customization for components and other utilities

## What technologies are used for this project?

This project is built with:

- Next.JS
- TypeScript
- React
- Jest
- Tailwind CSS
- Lint
- Husky

## How can I deploy this project?

You can deploy this work in AWS, DigitalOcean, Heroku, etc. If you need help, we can help you launch your project in our servers for a small fee, and if need a headless CMS, we offer that too. Just send us a message via GitHub, LinkedIn or our website DigitalPotter.io.
