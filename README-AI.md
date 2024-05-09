##  Quick Links

> - [ Overview](#-overview)
> - [ Repository Structure](#-repository-structure)
> - [ Modules](#-modules)
> - [ Getting Started](#-getting-started)
>   - [ Installation](#-installation)
>   - [ Running ](#-running-)
>   - [ Tests](#-tests)
> - [ Project Roadmap](#-project-roadmap)
> - [ Contributing](#-contributing)
> - [ License](#-license)
> - [ Acknowledgments](#-acknowledgments)

---

##  Overview

This is a simple python script that sends CleverHug to a specified email address at a specified time. The affirmations are stored in a text file and are sent in the body of the email. It uses rrule format to schedule the emails and UpStash/QStash to schedule the emails.

---

##  Repository Structure

```sh
└── /
    ├── .github
    │   ├── PULL_REQUEST_TEMPLATE.md
    │   └── workflows
    │       ├── ci.yml
    │       ├── deploy-backend.yml
    │       └── deploy-frontend.yml
    ├── CleverHug-Backend
    │   ├── .gitignore
    │   ├── __init__.py
    │   ├── app.py
    │   ├── endpoints
    │   │   ├── __init__.py
    │   │   ├── auth.py
    │   │   └── scheduler.py
    │   ├── poetry.lock
    │   ├── pyproject.toml
    │   ├── recurrent
    │   │   ├── .gitignore
    │   │   ├── README.md
    │   │   ├── __init__.py
    │   │   ├── constants.py
    │   │   ├── event_parser.py
    │   │   ├── setup.py
    │   │   └── test.py
    │   ├── requirements.txt
    │   └── vercel.json
    ├── CleverHug-Frontend
    │   ├── .gitignore
    │   ├── .prettierignore
    │   ├── .prettierrc
    │   ├── .vscode
    │   │   └── settings.json
    │   ├── package.json
    │   ├── pnpm-lock.yaml
    │   ├── public
    │   │   ├── assets
    │   │   │   ├── app-logo.png
    │   │   │   ├── custom.png
    │   │   │   ├── info.png
    │   │   │   ├── landing_banner.jpg
    │   │   │   ├── message.png
    │   │   │   ├── predefined.png
    │   │   │   └── settings.png
    │   │   ├── favicon.ico
    │   │   ├── index.html
    │   │   ├── logo192.png
    │   │   ├── logo512.png
    │   │   ├── manifest.json
    │   │   └── robots.txt
    │   ├── src
    │   │   ├── App.tsx
    │   │   ├── components
    │   │   │   ├── Layout
    │   │   │   │   ├── AppBar.tsx
    │   │   │   │   ├── Footer.tsx
    │   │   │   │   ├── Sidebar.tsx
    │   │   │   │   └── index.tsx
    │   │   │   └── UI
    │   │   │       └── Loading.tsx
    │   │   ├── contexts
    │   │   │   └── AuthProvider.tsx
    │   │   ├── index.css
    │   │   ├── index.tsx
    │   │   ├── logo.svg
    │   │   ├── pages
    │   │   │   ├── Affirmation.tsx
    │   │   │   ├── Landing.tsx
    │   │   │   └── Login.tsx
    │   │   ├── react-app-env.d.ts
    │   │   ├── reportWebVitals.ts
    │   │   ├── types
    │   │   │   └── user.ts
    │   │   └── utils
    │   │       ├── auth.ts
    │   │       └── rrule.ts
    │   ├── tailwind.config.js
    │   └── tsconfig.json
    ├── README-AI.md
    ├── README.md
    └── images
        ├── dashboard.png
        ├── landing.png
        ├── login.png
        ├── processed_time.png
        └── scheduled.png
```

---

##  Modules

<details closed><summary>CleverHug-Backend</summary>

| File                                                                                                     | Summary                                                      |
| ---                                                                                                      | ---                                                          |
| [poetry.lock](https://github.com/pratyush1712/cleverHug/blob/master/CleverHug-Backend/poetry.lock)       | HTTP error 401 for prompt `CleverHug-Backend/poetry.lock`    |
| [pyproject.toml](https://github.com/pratyush1712/cleverHug/blob/master/CleverHug-Backend/pyproject.toml) | HTTP error 401 for prompt `CleverHug-Backend/pyproject.toml` |
| [app.py](https://github.com/pratyush1712/cleverHug/blob/master/CleverHug-Backend/app.py)                 | HTTP error 401 for prompt `CleverHug-Backend/app.py`         |
| [vercel.json](https://github.com/pratyush1712/cleverHug/blob/master/CleverHug-Backend/vercel.json)       | HTTP error 401 for prompt `CleverHug-Backend/vercel.json`    |

</details>

<details closed><summary>CleverHug-Backend.endpoints</summary>

| File                                                                                                           | Summary                                                              |
| ---                                                                                                            | ---                                                                  |
| [scheduler.py](https://github.com/pratyush1712/cleverHug/blob/master/CleverHug-Backend/endpoints/scheduler.py) | HTTP error 401 for prompt `CleverHug-Backend/endpoints/scheduler.py` |
| [auth.py](https://github.com/pratyush1712/cleverHug/blob/master/CleverHug-Backend/endpoints/auth.py)           | HTTP error 401 for prompt `CleverHug-Backend/endpoints/auth.py`      |

</details>

<details closed><summary>CleverHug-Backend.recurrent</summary>

| File                                                                                                                 | Summary                                                                 |
| ---                                                                                                                  | ---                                                                     |
| [setup.py](https://github.com/pratyush1712/cleverHug/blob/master/CleverHug-Backend/recurrent/setup.py)               | HTTP error 401 for prompt `CleverHug-Backend/recurrent/setup.py`        |
| [event_parser.py](https://github.com/pratyush1712/cleverHug/blob/master/CleverHug-Backend/recurrent/event_parser.py) | HTTP error 401 for prompt `CleverHug-Backend/recurrent/event_parser.py` |
| [constants.py](https://github.com/pratyush1712/cleverHug/blob/master/CleverHug-Backend/recurrent/constants.py)       | HTTP error 401 for prompt `CleverHug-Backend/recurrent/constants.py`    |
| [test.py](https://github.com/pratyush1712/cleverHug/blob/master/CleverHug-Backend/recurrent/test.py)                 | HTTP error 401 for prompt `CleverHug-Backend/recurrent/test.py`         |

</details>

<details closed><summary>CleverHug-Frontend</summary>

| File                                                                                                              | Summary                                                           |
| ---                                                                                                               | ---                                                               |
| [.prettierignore](https://github.com/pratyush1712/cleverHug/blob/master/CleverHug-Frontend/.prettierignore)       | HTTP error 401 for prompt `CleverHug-Frontend/.prettierignore`    |
| [tsconfig.json](https://github.com/pratyush1712/cleverHug/blob/master/CleverHug-Frontend/tsconfig.json)           | HTTP error 401 for prompt `CleverHug-Frontend/tsconfig.json`      |
| [package.json](https://github.com/pratyush1712/cleverHug/blob/master/CleverHug-Frontend/package.json)             | HTTP error 401 for prompt `CleverHug-Frontend/package.json`       |
| [tailwind.config.js](https://github.com/pratyush1712/cleverHug/blob/master/CleverHug-Frontend/tailwind.config.js) | HTTP error 401 for prompt `CleverHug-Frontend/tailwind.config.js` |
| [pnpm-lock.yaml](https://github.com/pratyush1712/cleverHug/blob/master/CleverHug-Frontend/pnpm-lock.yaml)         | HTTP error 401 for prompt `CleverHug-Frontend/pnpm-lock.yaml`     |

</details>

<details closed><summary>CleverHug-Frontend.public</summary>

| File                                                                                                           | Summary                                                             |
| ---                                                                                                            | ---                                                                 |
| [index.html](https://github.com/pratyush1712/cleverHug/blob/master/CleverHug-Frontend/public/index.html)       | HTTP error 401 for prompt `CleverHug-Frontend/public/index.html`    |
| [manifest.json](https://github.com/pratyush1712/cleverHug/blob/master/CleverHug-Frontend/public/manifest.json) | HTTP error 401 for prompt `CleverHug-Frontend/public/manifest.json` |
| [robots.txt](https://github.com/pratyush1712/cleverHug/blob/master/CleverHug-Frontend/public/robots.txt)       | HTTP error 401 for prompt `CleverHug-Frontend/public/robots.txt`    |

</details>

<details closed><summary>CleverHug-Frontend.src</summary>

| File                                                                                                                  | Summary                                                               |
| ---                                                                                                                   | ---                                                                   |
| [react-app-env.d.ts](https://github.com/pratyush1712/cleverHug/blob/master/CleverHug-Frontend/src/react-app-env.d.ts) | HTTP error 401 for prompt `CleverHug-Frontend/src/react-app-env.d.ts` |
| [index.tsx](https://github.com/pratyush1712/cleverHug/blob/master/CleverHug-Frontend/src/index.tsx)                   | HTTP error 401 for prompt `CleverHug-Frontend/src/index.tsx`          |
| [App.tsx](https://github.com/pratyush1712/cleverHug/blob/master/CleverHug-Frontend/src/App.tsx)                       | HTTP error 401 for prompt `CleverHug-Frontend/src/App.tsx`            |
| [index.css](https://github.com/pratyush1712/cleverHug/blob/master/CleverHug-Frontend/src/index.css)                   | HTTP error 401 for prompt `CleverHug-Frontend/src/index.css`          |
| [reportWebVitals.ts](https://github.com/pratyush1712/cleverHug/blob/master/CleverHug-Frontend/src/reportWebVitals.ts) | HTTP error 401 for prompt `CleverHug-Frontend/src/reportWebVitals.ts` |

</details>

<details closed><summary>CleverHug-Frontend.src.types</summary>

| File                                                                                                  | Summary                                                          |
| ---                                                                                                   | ---                                                              |
| [user.ts](https://github.com/pratyush1712/cleverHug/blob/master/CleverHug-Frontend/src/types/user.ts) | HTTP error 401 for prompt `CleverHug-Frontend/src/types/user.ts` |

</details>

<details closed><summary>CleverHug-Frontend.src.utils</summary>

| File                                                                                                    | Summary                                                           |
| ---                                                                                                     | ---                                                               |
| [rrule.ts](https://github.com/pratyush1712/cleverHug/blob/master/CleverHug-Frontend/src/utils/rrule.ts) | HTTP error 401 for prompt `CleverHug-Frontend/src/utils/rrule.ts` |
| [auth.ts](https://github.com/pratyush1712/cleverHug/blob/master/CleverHug-Frontend/src/utils/auth.ts)   | HTTP error 401 for prompt `CleverHug-Frontend/src/utils/auth.ts`  |

</details>

<details closed><summary>CleverHug-Frontend.src.pages</summary>

| File                                                                                                                  | Summary                                                                  |
| ---                                                                                                                   | ---                                                                      |
| [Landing.tsx](https://github.com/pratyush1712/cleverHug/blob/master/CleverHug-Frontend/src/pages/Landing.tsx)         | HTTP error 401 for prompt `CleverHug-Frontend/src/pages/Landing.tsx`     |
| [Affirmation.tsx](https://github.com/pratyush1712/cleverHug/blob/master/CleverHug-Frontend/src/pages/Affirmation.tsx) | HTTP error 401 for prompt `CleverHug-Frontend/src/pages/Affirmation.tsx` |
| [Login.tsx](https://github.com/pratyush1712/cleverHug/blob/master/CleverHug-Frontend/src/pages/Login.tsx)             | HTTP error 401 for prompt `CleverHug-Frontend/src/pages/Login.tsx`       |

</details>

<details closed><summary>CleverHug-Frontend.src.components.Layout</summary>

| File                                                                                                                      | Summary                                                                          |
| ---                                                                                                                       | ---                                                                              |
| [Footer.tsx](https://github.com/pratyush1712/cleverHug/blob/master/CleverHug-Frontend/src/components/Layout/Footer.tsx)   | HTTP error 401 for prompt `CleverHug-Frontend/src/components/Layout/Footer.tsx`  |
| [index.tsx](https://github.com/pratyush1712/cleverHug/blob/master/CleverHug-Frontend/src/components/Layout/index.tsx)     | HTTP error 401 for prompt `CleverHug-Frontend/src/components/Layout/index.tsx`   |
| [AppBar.tsx](https://github.com/pratyush1712/cleverHug/blob/master/CleverHug-Frontend/src/components/Layout/AppBar.tsx)   | HTTP error 401 for prompt `CleverHug-Frontend/src/components/Layout/AppBar.tsx`  |
| [Sidebar.tsx](https://github.com/pratyush1712/cleverHug/blob/master/CleverHug-Frontend/src/components/Layout/Sidebar.tsx) | HTTP error 401 for prompt `CleverHug-Frontend/src/components/Layout/Sidebar.tsx` |

</details>

<details closed><summary>CleverHug-Frontend.src.components.UI</summary>

| File                                                                                                                  | Summary                                                                      |
| ---                                                                                                                   | ---                                                                          |
| [Loading.tsx](https://github.com/pratyush1712/cleverHug/blob/master/CleverHug-Frontend/src/components/UI/Loading.tsx) | HTTP error 401 for prompt `CleverHug-Frontend/src/components/UI/Loading.tsx` |

</details>

<details closed><summary>CleverHug-Frontend.src.contexts</summary>

| File                                                                                                                       | Summary                                                                      |
| ---                                                                                                                        | ---                                                                          |
| [AuthProvider.tsx](https://github.com/pratyush1712/cleverHug/blob/master/CleverHug-Frontend/src/contexts/AuthProvider.tsx) | HTTP error 401 for prompt `CleverHug-Frontend/src/contexts/AuthProvider.tsx` |

</details>

<details closed><summary>.github.workflows</summary>

| File                                                                                                               | Summary                                                           |
| ---                                                                                                                | ---                                                               |
| [deploy-frontend.yml](https://github.com/pratyush1712/cleverHug/blob/master/.github/workflows/deploy-frontend.yml) | HTTP error 401 for prompt `.github/workflows/deploy-frontend.yml` |
| [ci.yml](https://github.com/pratyush1712/cleverHug/blob/master/.github/workflows/ci.yml)                           | HTTP error 401 for prompt `.github/workflows/ci.yml`              |
| [deploy-backend.yml](https://github.com/pratyush1712/cleverHug/blob/master/.github/workflows/deploy-backend.yml)   | HTTP error 401 for prompt `.github/workflows/deploy-backend.yml`  |

</details>

---

##  Getting Started

## ➤ Installation

1. Clone the repository

   ```bash
   git clone
   ```

### Frontend

1. Navigate to the `frontend` directory

   ```bash
   cd frontend
   ```

2. Set the environment variables

   ```bash
   cp .env.local
   ```

3. Install the dependencies

   ```bash
    pnpm install
   ```

4. Start the development server
   ```bash
   pnpm start
   ```

The frontend should now be running on `http://localhost:3000`

### Backend

1. Navigate to the `backend` directory

   ```bash
   cd backend

   ```

2. Set the environment variables

   ```bash
   cp .env
   ```

3. Install the dependencies

   ```bash
    pip install -r requirements.txt
   ```

4. Start the development server
   ```bash
    python server.py
   ```

The backend should now be running on `http://localhost:3001`

##  Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Submit Pull Requests](https://github.com/pratyush1712/cleverHug/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/pratyush1712/cleverHug/discussions)**: Share your insights, provide feedback, or ask questions.
- **[Report Issues](https://github.com/pratyush1712/cleverHug/issues)**: Submit bugs found or log feature requests for .

<details closed>
    <summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your GitHub account.
2. **Clone Locally**: Clone the forked repository to your local machine using a Git client.
   ```sh
   git clone https://github.com/pratyush1712/cleverHug/
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to GitHub**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.

Once your PR is reviewed and approved, it will be merged into the main branch.

</details>
