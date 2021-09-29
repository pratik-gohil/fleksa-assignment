<div align="center">
 <h1> FLEKSA WEBSITE RESTAURANT </h1>
</div>

## Installation

- Step 1 : Make sure that you're already installed [NODE JS](https://nodejs.org) on your system.
- Step 2 : If not click the link and downloaded [LTS](https://nodejs.org/dist/v14.15.0/node-v14.15.0-x64.msi) version of Nodejs.
- Step 3 : Open your terminal and then type

```cmd
mkdir web
cd web
```

- Step 4 : Type following commands to initialize the git and set remote origin(for updated package in future).

```cmd
git init
git remote add origin https://code.fleksa.com/root/webv2.git
```

> Note : Make sure that you've correct rights of this repository because this is private organization repo. If you're not please contact your manager.

- Step 5 : Clone the repo by using following command.

```cmd
git pull origin main
```

> DANGER :
>
> 1. Don't use `git push` command.
> 2. Don't modify any files by yourself without contact mainteners even is single dot.

- Step 7 : Get `.env` file from maintainer and put that file in root directory.

- Step 8 : Type in the terminal.

```cmd
npm install
npm run dev
```

- Step 9 : In future would you like to update your local package just type in the terminal.

```cmd
git pull origin <branch_name>
```

🎉🎉 tada 🎉🎉

#### Change Logs of Merge request #80

1. Bottom space issue on reservation and menu.
2. Offer default setting change.
3. Added discount field on profile order view by id.
4. Fixed footer links not working issue.
5. When change on my.fleksa.com order type front end user facing some type mismatch selection issue fix.
6. Menu add side ,(comma) issue.
7. Issue on address model in checkout page with constant.
8. Translation issue on mobile view checkout -> cart.
